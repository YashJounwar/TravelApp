import { Card } from "@/components/ui/card";
import { Accordion } from "@/components/ui/accordion";

const faqs = [
  ["How is fare calculated?", "Fare includes base, distance/time, toll estimates, taxes, and applicable surcharges."],
  ["Can I cancel a booking?", "Yes, cancellation terms are shown before payment confirmation."],
  ["Is driver verified?", "Yes, we assign verified and trained drivers."],
  ["Do you support WhatsApp updates?", "Yes, trip updates and support are available through WhatsApp and call support."],
  ["Can I book group travel?", "Yes, choose group travel and select tempo traveller, urbania, or minibus options."]
];

export default function FaqsPage() {
  return (
    <Card className="space-y-3">
      <h1 className="text-xl font-bold">FAQs</h1>
      <Accordion items={faqs.map(([title, content]) => ({ title, content }))} />
    </Card>
  );
}
