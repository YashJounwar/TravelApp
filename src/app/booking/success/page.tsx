import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export default function BookingSuccessPage() {
  return (
    <Card className="space-y-3 text-center">
      <h1 className="text-2xl font-bold">Request received</h1>
      <p className="text-sm text-slate-600">
        Thank you. Our team has received your booking/callback request and will contact you shortly.
      </p>
      <Button asChild>
        <Link href="/">Back to home</Link>
      </Button>
    </Card>
  );
}
