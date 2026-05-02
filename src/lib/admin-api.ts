"use client";

import { auth } from "@/lib/firebase/client";

async function getAuthHeader() {
  const user = auth.currentUser;
  if (!user) return {} as Record<string, string>;
  const token = await user.getIdToken();
  return { Authorization: `Bearer ${token}` } as Record<string, string>;
}

export async function adminApi<T>(url: string, init?: RequestInit): Promise<T> {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...(await getAuthHeader()),
    ...((init?.headers as Record<string, string> | undefined) || {})
  };
  const res = await fetch(url, { ...init, headers });
  if (!res.ok) {
    const payload = await res.json().catch(() => ({}));
    throw new Error(payload.error || `Request failed (${res.status})`);
  }
  return (await res.json()) as T;
}
