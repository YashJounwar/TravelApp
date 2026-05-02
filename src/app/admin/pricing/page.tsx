"use client";

import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { defaultPricing } from "@/lib/pricing/rules";
import { adminApi } from "@/lib/admin-api";

export default function AdminPricingPage() {
  const [pricing, setPricing] = useState(defaultPricing);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    adminApi<{ rule: typeof defaultPricing }>("/api/admin/pricing")
      .then((data) => setPricing({ ...defaultPricing, ...data.rule }))
      .catch((e) => setMessage((e as Error).message))
      .finally(() => setLoading(false));
  }, []);

  async function save() {
    setSaving(true);
    setMessage("");
    try {
      await adminApi<{ ok: boolean }>("/api/admin/pricing", {
        method: "PUT",
        body: JSON.stringify(pricing)
      });
      setMessage("Pricing rules updated.");
    } catch (e) {
      setMessage((e as Error).message);
    } finally {
      setSaving(false);
    }
  }

  return (
    <Card className="space-y-3">
      <h1 className="mb-3 text-lg font-semibold">Pricing rules</h1>
      {loading ? <p className="text-sm text-slate-600">Loading pricing...</p> : null}
      <Input
        type="number"
        value={pricing.perKm}
        onChange={(e) => setPricing((s) => ({ ...s, perKm: Number(e.target.value || 0) }))}
        placeholder="Per km"
      />
      <Input
        type="number"
        value={pricing.perHour}
        onChange={(e) => setPricing((s) => ({ ...s, perHour: Number(e.target.value || 0) }))}
        placeholder="Per hour"
      />
      <Input
        type="number"
        step="0.01"
        value={pricing.gstRate}
        onChange={(e) => setPricing((s) => ({ ...s, gstRate: Number(e.target.value || 0) }))}
        placeholder="GST rate"
      />
      <Button onClick={save} disabled={saving}>
        {saving ? "Saving..." : "Save pricing"}
      </Button>
      {message ? <p className="text-sm text-slate-600">{message}</p> : null}
    </Card>
  );
}
