import { Card } from "@/components/ui/card";

export default async function SeoLandingPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return (
    <Card className="space-y-2">
      <h1 className="text-xl font-bold">{slug.replaceAll("-", " ")}</h1>
      <p className="text-sm text-slate-700">
        SEO landing template for city/service combinations. Content can be managed from admin.
      </p>
    </Card>
  );
}
