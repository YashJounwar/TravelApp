"use client";

import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { adminApi } from "@/lib/admin-api";

type RouteRow = { id: string; fromCity: string; toCity: string; tripType: string; active?: boolean };

export default function AdminRoutesPage() {
  const [routes, setRoutes] = useState<RouteRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [form, setForm] = useState({ fromCity: "", toCity: "", tripType: "one-way-outstation", active: true });

  async function loadRoutes() {
    setLoading(true);
    try {
      const data = await adminApi<{ items: RouteRow[] }>("/api/admin/routes");
      setRoutes(data.items);
    } catch (e) {
      setMessage((e as Error).message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadRoutes();
  }, []);

  async function createRoute() {
    setSaving(true);
    setMessage("");
    try {
      await adminApi<{ id: string }>("/api/admin/routes", {
        method: "POST",
        body: JSON.stringify(form)
      });
      setForm({ fromCity: "", toCity: "", tripType: "one-way-outstation", active: true });
      await loadRoutes();
      setMessage("Route added.");
    } catch (e) {
      setMessage((e as Error).message);
    } finally {
      setSaving(false);
    }
  }

  async function toggleRouteActive(route: RouteRow) {
    setMessage("");
    try {
      await adminApi<{ ok: boolean }>("/api/admin/routes", {
        method: "PUT",
        body: JSON.stringify({ id: route.id, active: !route.active })
      });
      await loadRoutes();
    } catch (e) {
      setMessage((e as Error).message);
    }
  }

  async function deleteRoute(id: string) {
    setMessage("");
    try {
      await adminApi<{ ok: boolean }>(`/api/admin/routes?id=${id}`, { method: "DELETE" });
      await loadRoutes();
    } catch (e) {
      setMessage((e as Error).message);
    }
  }

  return (
    <div className="grid gap-4 md:grid-cols-2">
      <Card className="space-y-3">
        <h1 className="text-lg font-semibold">Route availability</h1>
        <Input
          placeholder="From city"
          value={form.fromCity}
          onChange={(e) => setForm((s) => ({ ...s, fromCity: e.target.value }))}
        />
        <Input
          placeholder="To city"
          value={form.toCity}
          onChange={(e) => setForm((s) => ({ ...s, toCity: e.target.value }))}
        />
        <Input
          placeholder="Trip type"
          value={form.tripType}
          onChange={(e) => setForm((s) => ({ ...s, tripType: e.target.value }))}
        />
        <Button onClick={createRoute} disabled={saving}>
          {saving ? "Saving..." : "Add route"}
        </Button>
      </Card>
      <Card>
        <h2 className="mb-2 font-semibold">Configured routes ({routes.length})</h2>
        {loading ? <p className="text-sm text-slate-600">Loading routes...</p> : null}
        <ul className="space-y-2 text-sm">
          {routes.map((route) => (
            <li key={route.id} className="flex items-center justify-between rounded border p-2">
              <span className={route.active === false ? "text-slate-400" : ""}>
                {route.fromCity} {"->"} {route.toCity} ({route.tripType})
              </span>
              <span className="flex gap-2">
                <Button size="sm" variant="outline" onClick={() => toggleRouteActive(route)}>
                  {route.active === false ? "Activate" : "Deactivate"}
                </Button>
                <Button size="sm" variant="outline" onClick={() => deleteRoute(route.id)}>
                  Delete
                </Button>
              </span>
            </li>
          ))}
        </ul>
        {message ? <p className="mt-2 text-sm text-slate-600">{message}</p> : null}
      </Card>
    </div>
  );
}
