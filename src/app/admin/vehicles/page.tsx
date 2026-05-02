"use client";

import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { adminApi } from "@/lib/admin-api";

type VehicleRow = { id: string; name: string; baseFare: number; category: string; seats: number; active?: boolean };

const defaultVehicle = {
  slug: "",
  name: "",
  category: "economy-sedan",
  seats: 4,
  luggage: 2,
  baseFare: 2000,
  rating: 4.5,
  reviewCount: 0,
  image: "https://images.unsplash.com/photo-1550355291-bbee04a92027",
  amenities: ["AC"],
  verifiedDriver: true,
  active: true
};

export default function AdminVehiclesPage() {
  const [vehicles, setVehicles] = useState<VehicleRow[]>([]);
  const [form, setForm] = useState(defaultVehicle);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  async function loadVehicles() {
    setLoading(true);
    setMessage("");
    try {
      const data = await adminApi<{ items: VehicleRow[] }>("/api/admin/vehicles");
      setVehicles(data.items);
    } catch (e) {
      setMessage((e as Error).message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadVehicles();
  }, []);

  async function createVehicle() {
    setSaving(true);
    setMessage("");
    try {
      await adminApi<{ id: string }>("/api/admin/vehicles", {
        method: "POST",
        body: JSON.stringify(form)
      });
      setForm(defaultVehicle);
      setMessage("Vehicle created successfully.");
      await loadVehicles();
    } catch (e) {
      setMessage((e as Error).message);
    } finally {
      setSaving(false);
    }
  }

  async function toggleActive(vehicle: VehicleRow) {
    setMessage("");
    try {
      await adminApi<{ ok: boolean }>("/api/admin/vehicles", {
        method: "PUT",
        body: JSON.stringify({ id: vehicle.id, active: !vehicle.active })
      });
      await loadVehicles();
    } catch (e) {
      setMessage((e as Error).message);
    }
  }

  async function removeVehicle(id: string) {
    setMessage("");
    try {
      await adminApi<{ ok: boolean }>(`/api/admin/vehicles?id=${id}`, { method: "DELETE" });
      await loadVehicles();
    } catch (e) {
      setMessage((e as Error).message);
    }
  }

  return (
    <div className="grid gap-4 md:grid-cols-2">
      <Card className="space-y-3">
        <h1 className="text-lg font-semibold">Vehicle management</h1>
        <Input placeholder="Slug" value={form.slug} onChange={(e) => setForm((s) => ({ ...s, slug: e.target.value }))} />
        <Input placeholder="Name" value={form.name} onChange={(e) => setForm((s) => ({ ...s, name: e.target.value }))} />
        <Input
          placeholder="Category"
          value={form.category}
          onChange={(e) => setForm((s) => ({ ...s, category: e.target.value }))}
        />
        <Input
          type="number"
          placeholder="Seats"
          value={form.seats}
          onChange={(e) => setForm((s) => ({ ...s, seats: Number(e.target.value || 1) }))}
        />
        <Input
          type="number"
          placeholder="Base fare"
          value={form.baseFare}
          onChange={(e) => setForm((s) => ({ ...s, baseFare: Number(e.target.value || 0) }))}
        />
        <Button onClick={createVehicle} disabled={saving}>
          {saving ? "Saving..." : "Create vehicle"}
        </Button>
        {message ? <p className="text-sm text-slate-600">{message}</p> : null}
      </Card>
      <Card>
        <h2 className="mb-3 text-lg font-semibold">Existing vehicles</h2>
        {loading ? <p className="text-sm text-slate-600">Loading vehicles...</p> : null}
        <ul className="space-y-2 text-sm">
          {vehicles.map((v) => (
            <li key={v.id} className="flex justify-between rounded border p-2">
              <span className={v.active === false ? "text-slate-400" : ""}>
                {v.name} ({v.category})
              </span>
              <div className="flex items-center gap-2">
                <span>INR {v.baseFare}</span>
                <Button size="sm" variant="outline" onClick={() => toggleActive(v)}>
                  {v.active === false ? "Activate" : "Deactivate"}
                </Button>
                <Button size="sm" variant="outline" onClick={() => removeVehicle(v.id)}>
                  Delete
                </Button>
              </div>
            </li>
          ))}
        </ul>
      </Card>
    </div>
  );
}
