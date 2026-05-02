import { Card } from "@/components/ui/card";

export default function AdminPage() {
  return (
    <div className="grid gap-3 md:grid-cols-3">
      <Card>
        <p className="text-sm text-slate-500">Active bookings</p>
        <p className="text-2xl font-bold">128</p>
      </Card>
      <Card>
        <p className="text-sm text-slate-500">Available vehicles</p>
        <p className="text-2xl font-bold">67</p>
      </Card>
      <Card>
        <p className="text-sm text-slate-500">Pending callbacks</p>
        <p className="text-2xl font-bold">14</p>
      </Card>
    </div>
  );
}
