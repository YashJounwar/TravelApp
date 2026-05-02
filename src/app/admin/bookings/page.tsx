"use client";

import { useEffect, useMemo, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { adminApi } from "@/lib/admin-api";

const stages = ["new", "confirmed", "assigned", "in-progress", "completed", "cancelled"] as const;
type Stage = (typeof stages)[number];
type BookingRow = { id: string; name?: string; phone?: string; status?: Stage };

export default function AdminBookingsPage() {
  const [bookings, setBookings] = useState<BookingRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  const grouped = useMemo(() => {
    const out: Record<Stage, BookingRow[]> = {
      new: [],
      confirmed: [],
      assigned: [],
      "in-progress": [],
      completed: [],
      cancelled: []
    };
    bookings.forEach((b) => out[(b.status as Stage) || "new"].push(b));
    return out;
  }, [bookings]);

  async function load() {
    setLoading(true);
    setMessage("");
    try {
      const data = await adminApi<{ items: BookingRow[] }>("/api/admin/bookings");
      setBookings(data.items);
    } catch (e) {
      setMessage((e as Error).message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []);

  async function moveStage(id: string, status: Stage) {
    setMessage("");
    try {
      await adminApi<{ ok: boolean }>("/api/admin/bookings", {
        method: "PATCH",
        body: JSON.stringify({ id, status })
      });
      await load();
    } catch (e) {
      setMessage((e as Error).message);
    }
  }

  return (
    <div className="grid gap-3 md:grid-cols-3">
      {stages.map((stage) => (
        <Card key={stage}>
          <h2 className="mb-2 font-semibold capitalize">{stage}</h2>
          {loading ? <p className="text-sm text-slate-600">Loading...</p> : null}
          <div className="space-y-2">
            {grouped[stage].map((booking) => (
              <div key={booking.id} className="rounded border p-2 text-sm">
                <p className="font-medium">{booking.name || "Customer"}</p>
                <p className="text-slate-600">{booking.phone || "-"}</p>
                <div className="mt-2 flex flex-wrap gap-1">
                  {stages.map((nextStage) => (
                    <Button
                      key={nextStage}
                      size="sm"
                      variant={nextStage === stage ? "default" : "outline"}
                      onClick={() => moveStage(booking.id, nextStage)}
                    >
                      {nextStage}
                    </Button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Card>
      ))}
      {message ? <p className="text-sm text-slate-600">{message}</p> : null}
    </div>
  );
}
