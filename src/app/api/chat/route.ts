import { NextResponse } from "next/server";
import { z } from "zod";
import { getLocalSupportReply, getSupportSystemPrompt } from "@/lib/support/knowledge";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const chatMessageSchema = z.object({
  role: z.enum(["user", "assistant"]),
  content: z.string().trim().min(1).max(2000)
});

const chatRequestSchema = z.object({
  messages: z.array(chatMessageSchema).min(1).max(12),
  context: z
    .object({
      path: z.string().max(200).optional()
    })
    .optional()
});

type ChatMessage = z.infer<typeof chatMessageSchema>;

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function extractOutputText(payload: unknown) {
  if (!isRecord(payload)) return "";

  if (typeof payload.output_text === "string") {
    return payload.output_text.trim();
  }

  const output = payload.output;
  if (!Array.isArray(output)) return "";

  return output
    .flatMap((item) => {
      if (!isRecord(item) || !Array.isArray(item.content)) return [];
      return item.content.flatMap((contentItem) => {
        if (!isRecord(contentItem)) return [];
        if (typeof contentItem.text === "string") return [contentItem.text];
        if (typeof contentItem.output_text === "string") return [contentItem.output_text];
        return [];
      });
    })
    .join("\n")
    .trim();
}

function formatConversation(messages: ChatMessage[]) {
  return messages
    .slice(-12)
    .map((message) => `${message.role === "user" ? "Customer" : "Assistant"}: ${message.content}`)
    .join("\n\n");
}

function formatInput(messages: ChatMessage[], path?: string) {
  const pageContext = path ? `Current website path: ${path}\n\n` : "";
  return `${pageContext}${formatConversation(messages)}`;
}

export async function POST(request: Request) {
  const parsed = chatRequestSchema.safeParse(await request.json().catch(() => null));

  if (!parsed.success) {
    return NextResponse.json({ error: "Please send a valid customer support message." }, { status: 400 });
  }

  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    return NextResponse.json({
      reply: getLocalSupportReply(parsed.data.messages, parsed.data.context),
      model: "shanvi-verified-local-support"
    });
  }

  const model = process.env.OPENAI_CHAT_MODEL || "gpt-5.1";
  const body: Record<string, unknown> = {
    model,
    instructions: getSupportSystemPrompt(),
    input: formatInput(parsed.data.messages, parsed.data.context?.path),
    max_output_tokens: 550
  };

  if (model.startsWith("gpt-5")) {
    body.reasoning = { effort: "none" };
    body.text = { verbosity: "low" };
  }

  const response = await fetch("https://api.openai.com/v1/responses", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify(body)
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error("Shanvi support chat failed", response.status, errorText);
    return NextResponse.json({
      reply: getLocalSupportReply(parsed.data.messages, parsed.data.context),
      model: "shanvi-verified-local-support"
    });
  }

  const data: unknown = await response.json();
  const reply = extractOutputText(data);

  if (!reply) {
    return NextResponse.json({
      reply: getLocalSupportReply(parsed.data.messages, parsed.data.context),
      model: "shanvi-verified-local-support"
    });
  }

  return NextResponse.json({ reply, model });
}
