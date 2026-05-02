import { Card } from "@/components/ui/card";

export default function PoliciesPage() {
  return (
    <Card className="space-y-2">
      <h1 className="text-xl font-bold">Policies</h1>
      <p className="text-sm text-slate-700">Cancellation policy: fair slab-based refunds depending on notice period.</p>
      <p className="text-sm text-slate-700">Safety policy: all rides are assigned to verified drivers only.</p>
      <p className="text-sm text-slate-700">Support policy: 24x7 support for active trips.</p>
    </Card>
  );
}
