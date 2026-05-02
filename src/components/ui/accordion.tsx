"use client";

import { useState } from "react";

export function Accordion({
  items
}: {
  items: Array<{ title: string; content: string }>;
}) {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <div className="space-y-2">
      {items.map((item, i) => (
        <div key={item.title} className="rounded-lg border bg-white dark:bg-slate-900">
          <button
            className="flex w-full items-center justify-between px-4 py-3 text-left text-sm font-semibold"
            onClick={() => setOpen(open === i ? null : i)}
            type="button"
          >
            <span>{item.title}</span>
            <span>{open === i ? "-" : "+"}</span>
          </button>
          {open === i ? <div className="border-t px-4 py-3 text-sm text-slate-600 dark:text-slate-300">{item.content}</div> : null}
        </div>
      ))}
    </div>
  );
}
