"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Bot, CalendarCheck2, Headphones, Loader2, MessageCircle, Search, Send, ShieldCheck, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type ChatRole = "assistant" | "user";

interface ChatMessage {
  id: string;
  role: ChatRole;
  content: string;
}

const initialMessages: ChatMessage[] = [
  {
    id: "welcome",
    role: "assistant",
    content:
      "Namaste. I am the Shanvi Travels support assistant. I can help with bookings, fare estimates, vehicle selection, cancellation terms, safety checks, and support contacts based on the official website information."
  }
];

const suggestedPrompts = ["Suggest a cab for 6 passengers", "How is fare calculated?", "Need airport pickup help"];

function createMessage(role: ChatRole, content: string): ChatMessage {
  return {
    id: `${role}-${Date.now()}-${Math.random().toString(36).slice(2)}`,
    role,
    content
  };
}

export function AiChatbot() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>(initialMessages);
  const [input, setInput] = useState("");
  const [isSending, setIsSending] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!isOpen) return;
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [isOpen, messages, isSending]);

  async function sendMessage(messageText = input) {
    const content = messageText.trim();
    if (!content || isSending) return;

    const userMessage = createMessage("user", content);
    const nextMessages = [...messages, userMessage];
    setMessages(nextMessages);
    setInput("");
    setIsSending(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          context: { path: pathname },
          messages: nextMessages.map((message) => ({
            role: message.role,
            content: message.content
          }))
        })
      });
      const data = (await response.json().catch(() => ({}))) as { reply?: string; error?: string };

      if (!response.ok || !data.reply) {
        throw new Error(data.error || "AI support is unavailable. Please contact Shanvi Travels by phone or WhatsApp.");
      }

      setMessages([...nextMessages, createMessage("assistant", data.reply)]);
    } catch (error) {
      setMessages([
        ...nextMessages,
        createMessage(
          "assistant",
          error instanceof Error
            ? error.message
            : "AI support is unavailable. Please contact Shanvi Travels by phone or WhatsApp at +91-90000-00000."
        )
      ]);
    } finally {
      setIsSending(false);
    }
  }

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    void sendMessage();
  }

  return (
    <div className="fixed bottom-4 right-4 z-[60] sm:bottom-6 sm:right-6">
      {isOpen ? (
        <section
          aria-label="Shanvi Travels AI support chat"
          className="mb-3 flex h-[min(620px,calc(100vh-7rem))] w-[calc(100vw-2rem)] max-w-[380px] flex-col overflow-hidden rounded-lg border border-slate-200 bg-white shadow-2xl shadow-slate-950/20 dark:border-slate-800 dark:bg-slate-950"
        >
          <div className="flex items-center justify-between border-b border-slate-200 bg-slate-950 px-4 py-3 text-white dark:border-slate-800">
            <div className="flex min-w-0 items-center gap-3">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-blue-600">
                <Bot className="h-5 w-5" aria-hidden="true" />
              </span>
              <div className="min-w-0">
                <h2 className="truncate text-sm font-bold">Shanvi AI Support</h2>
                <p className="flex items-center gap-1 text-xs text-slate-300">
                  <ShieldCheck className="h-3.5 w-3.5 text-emerald-300" aria-hidden="true" />
                  Website policy based
                </p>
              </div>
            </div>
            <button
              type="button"
              aria-label="Close AI support chat"
              title="Close chat"
              onClick={() => setIsOpen(false)}
              className="flex h-9 w-9 items-center justify-center rounded-md text-slate-200 transition hover:bg-white/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
            >
              <X className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>

          <div className="flex-1 space-y-3 overflow-y-auto bg-slate-50 p-3 dark:bg-slate-900">
            {messages.map((message) => (
              <div key={message.id} className={cn("flex", message.role === "user" ? "justify-end" : "justify-start")}>
                <div
                  className={cn(
                    "max-w-[86%] rounded-lg px-3 py-2 text-sm leading-6 shadow-sm",
                    message.role === "user"
                      ? "bg-blue-700 text-white"
                      : "border border-slate-200 bg-white text-slate-700 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-200"
                  )}
                >
                  {message.content}
                </div>
              </div>
            ))}
            {isSending ? (
              <div className="flex justify-start">
                <div className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-600 shadow-sm dark:border-slate-800 dark:bg-slate-950 dark:text-slate-300">
                  <Loader2 className="h-4 w-4 animate-spin text-blue-700" aria-hidden="true" />
                  Preparing a verified answer...
                </div>
              </div>
            ) : null}
            <div ref={messagesEndRef} />
          </div>

          <div className="border-t border-slate-200 bg-white p-3 dark:border-slate-800 dark:bg-slate-950">
            <div className="mb-3 grid grid-cols-3 gap-2">
              <Link
                href="/"
                className="flex h-9 items-center justify-center gap-1 rounded-md border border-slate-200 bg-white text-xs font-semibold text-slate-700 transition hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800"
              >
                <Search className="h-3.5 w-3.5" aria-hidden="true" /> Search
              </Link>
              <Link
                href="/booking"
                className="flex h-9 items-center justify-center gap-1 rounded-md border border-slate-200 bg-white text-xs font-semibold text-slate-700 transition hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800"
              >
                <CalendarCheck2 className="h-3.5 w-3.5" aria-hidden="true" /> Book
              </Link>
              <Link
                href="/contact"
                className="flex h-9 items-center justify-center gap-1 rounded-md border border-slate-200 bg-white text-xs font-semibold text-slate-700 transition hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800"
              >
                <Headphones className="h-3.5 w-3.5" aria-hidden="true" /> Help
              </Link>
            </div>
            {messages.length === initialMessages.length ? (
              <div className="mb-3 flex flex-wrap gap-2">
                {suggestedPrompts.map((prompt) => (
                  <button
                    key={prompt}
                    type="button"
                    disabled={isSending}
                    onClick={() => void sendMessage(prompt)}
                    className="rounded-md border border-slate-200 bg-slate-50 px-2.5 py-1.5 text-left text-xs font-semibold text-slate-700 transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700 disabled:opacity-60 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200 dark:hover:border-blue-900 dark:hover:bg-blue-950"
                  >
                    {prompt}
                  </button>
                ))}
              </div>
            ) : null}
            <form onSubmit={onSubmit} className="flex items-end gap-2">
              <label htmlFor="shanvi-ai-chat-input" className="sr-only">
                Type your message
              </label>
              <textarea
                id="shanvi-ai-chat-input"
                value={input}
                onChange={(event) => setInput(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === "Enter" && !event.shiftKey) {
                    event.preventDefault();
                    void sendMessage();
                  }
                }}
                rows={1}
                maxLength={1000}
                placeholder="Ask about fares, vehicles, policies, or support"
                className="max-h-28 min-h-11 flex-1 resize-none rounded-md border border-slate-300 bg-white px-3 py-2 text-sm leading-6 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-700 focus:ring-2 focus:ring-blue-700/20 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:placeholder:text-slate-500"
              />
              <Button type="submit" size="sm" disabled={!input.trim() || isSending} className="h-11 w-11 px-0" aria-label="Send message">
                {isSending ? <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" /> : <Send className="h-4 w-4" aria-hidden="true" />}
              </Button>
            </form>
          </div>
        </section>
      ) : null}

      <button
        type="button"
        aria-label="Open Shanvi Travels AI support chat"
        title="Open AI support chat"
        onClick={() => setIsOpen(true)}
        className={cn(
          "flex h-14 items-center gap-2 rounded-full bg-blue-700 px-4 text-sm font-bold text-white shadow-xl shadow-blue-950/20 transition hover:bg-blue-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-700 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-950",
          isOpen && "hidden"
        )}
      >
        <MessageCircle className="h-5 w-5" aria-hidden="true" />
        AI Support
      </button>
    </div>
  );
}
