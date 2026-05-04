"use client";

import { FormEvent, useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";

type AuthUser = { uid: string; email: string; role: "admin" };

export function AdminAuthGuard({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const loadSession = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      let response = await fetch("/api/auth/me", { credentials: "include", cache: "no-store" });
      if (response.status === 401) {
        await fetch("/api/auth/refresh", { method: "POST", credentials: "include", cache: "no-store" });
        response = await fetch("/api/auth/me", { credentials: "include", cache: "no-store" });
      }

      if (!response.ok) {
        setUser(null);
        return;
      }

      const data = (await response.json()) as { user: AuthUser };
      setUser(data.user);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void loadSession();
  }, [loadSession]);

  async function handleLogin(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      });
      const data = (await response.json().catch(() => ({}))) as { user?: AuthUser; error?: string };
      if (!response.ok || !data.user) {
        setError(data.error || "Login failed. Check credentials.");
        return;
      }
      setUser(data.user);
      setPassword("");
    } catch {
      setError("Login failed. Please check your connection and try again.");
    }
  }

  async function handleLogout() {
    await fetch("/api/auth/logout", { method: "POST", credentials: "include" }).catch(() => undefined);
    setUser(null);
  }

  if (loading) {
    return <Card>Checking admin session...</Card>;
  }

  if (!user) {
    return (
      <Card className="mx-auto max-w-md space-y-3">
        <div>
          <h2 className="text-lg font-semibold text-slate-950 dark:text-white">Admin login</h2>
          <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">Sign in to manage bookings, routes, vehicles, and pricing.</p>
        </div>
        <form onSubmit={handleLogin} className="space-y-3">
          <Input value={email} onChange={(e) => setEmail(e.target.value)} type="email" autoComplete="username" placeholder="Admin email" required />
          <Input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
            placeholder="Password"
            required
          />
          <Button className="w-full">Login</Button>
        </form>
        {error ? <p className="text-sm text-red-600">{error}</p> : null}
        <p className="text-xs text-slate-500">
          Sessions use secure HTTP-only JWT and refresh cookies. For local setup, `ALLOW_DEV_ADMIN_BYPASS=true` opens the dashboard without credentials.
        </p>
        <Link href="/" className="text-sm text-blue-700">
          Back to site
        </Link>
      </Card>
    );
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm dark:border-slate-800 dark:bg-slate-900">
        <span>Signed in as {user.email}</span>
        <Button variant="outline" size="sm" onClick={handleLogout}>
          Logout
        </Button>
      </div>
      {children}
    </div>
  );
}
