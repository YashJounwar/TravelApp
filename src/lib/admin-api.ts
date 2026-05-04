"use client";

async function request<T>(url: string, init?: RequestInit): Promise<Response> {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...((init?.headers as Record<string, string> | undefined) || {})
  };
  return fetch(url, { ...init, headers, credentials: "include", cache: "no-store" });
}

export async function adminApi<T>(url: string, init?: RequestInit): Promise<T> {
  let res = await request<T>(url, init);
  if (res.status === 401) {
    const refresh = await fetch("/api/auth/refresh", {
      method: "POST",
      credentials: "include",
      cache: "no-store"
    });
    if (refresh.ok) {
      res = await request<T>(url, init);
    }
  }

  if (!res.ok) {
    const payload = await res.json().catch(() => ({}));
    throw new Error(payload.error || `Request failed (${res.status})`);
  }
  return (await res.json()) as T;
}
