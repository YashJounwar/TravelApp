"use client";

import { SlidersHorizontal } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";

interface Props {
  onCategoryChange: (v: string) => void;
  onMaxFareChange: (v: number) => void;
}

export function ResultsFilters({ onCategoryChange, onMaxFareChange }: Props) {
  const content = (
    <div className="grid gap-3 md:grid-cols-2">
      <div>
        <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-slate-500">Vehicle category</label>
        <Select onChange={(e) => onCategoryChange(e.target.value)} defaultValue="">
          <option value="">All categories</option>
          <option value="economy-sedan">Economy sedan</option>
          <option value="comfort-sedan">Comfort sedan</option>
          <option value="suv-muv">SUV / MUV</option>
          <option value="premium-suv">Premium SUV</option>
          <option value="tempo-traveller">Tempo traveller</option>
          <option value="luxury-car">Luxury car</option>
          <option value="urbania-premium-van">Urbania / premium van</option>
          <option value="minibus">Minibus</option>
        </Select>
      </div>
      <div>
        <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-slate-500">Maximum fare</label>
        <Input type="number" min={0} placeholder="Max fare in INR" onChange={(e) => onMaxFareChange(Number(e.target.value || 0))} />
      </div>
    </div>
  );

  return (
    <>
      <details className="rounded-lg border border-slate-200 bg-white p-3 shadow-sm dark:border-slate-800 dark:bg-slate-900 md:hidden">
        <summary className="flex cursor-pointer items-center gap-2 text-sm font-semibold">
          <SlidersHorizontal className="h-4 w-4" aria-hidden="true" /> Filters
        </summary>
        <div className="mt-3">{content}</div>
      </details>
      <div className="hidden rounded-lg border border-slate-200 bg-white p-3 shadow-sm dark:border-slate-800 dark:bg-slate-900 md:block">{content}</div>
    </>
  );
}
