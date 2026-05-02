"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { onAuthStateChanged, signInWithEmailAndPassword, signOut, User } from "firebase/auth";
import { auth } from "@/lib/firebase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";

export function AdminAuthGuard({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    return onAuthStateChanged(auth, (u) => {
      setUser(u);
      setLoading(false);
    });
  }, []);

  async function handleLogin() {
    setError("");
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch {
      setError("Login failed. Check credentials.");
    }
  }

  if (loading) {
    return <Card>Checking admin session...</Card>;
  }

  if (!user) {
    return (
      <Card className="space-y-3">
        <h2 className="text-lg font-semibold">Admin login</h2>
        <Input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Admin email" />
        <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
        {error ? <p className="text-sm text-red-600">{error}</p> : null}
        <Button onClick={handleLogin}>Login</Button>
        <p className="text-xs text-slate-500">
          For local setup without auth, enable `ALLOW_DEV_ADMIN_BYPASS=true` and use API tools directly.
        </p>
        <Link href="/" className="text-sm text-blue-700">
          Back to site
        </Link>
      </Card>
    );
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between rounded-lg border bg-white px-3 py-2 text-sm">
        <span>Signed in as {user.email}</span>
        <Button variant="outline" size="sm" onClick={() => signOut(auth)}>
          Logout
        </Button>
      </div>
      {children}
    </div>
  );
}
