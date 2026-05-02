import { FareBreakdown } from "@/lib/types/domain";

export function FareBreakdownView({ fare }: { fare: FareBreakdown }) {
  const rows: [string, number][] = [
    ["Base fare", fare.baseFare],
    ["Distance charge", fare.distanceCharge],
    ["Time charge", fare.timeCharge],
    ["Tolls & parking", fare.tollsAndParking],
    ["Night charge", fare.nightCharge],
    ["Surge", fare.surgeCharge],
    ["GST", fare.gst]
  ];
  return (
    <div className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <div className="mb-3 flex items-end justify-between gap-3">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-blue-700 dark:text-blue-400">Pricing</p>
          <h3 className="text-xl font-bold text-slate-950 dark:text-white">Fare breakdown</h3>
        </div>
        <p className="text-right text-sm font-bold text-slate-950 dark:text-white">INR {fare.total.toLocaleString("en-IN")}</p>
      </div>
      <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-300">
        {rows.map(([label, value]) => (
          <li className="flex justify-between" key={label}>
            <span>{label}</span>
            <span>INR {value.toLocaleString("en-IN")}</span>
          </li>
        ))}
      </ul>
      <div className="mt-3 flex justify-between border-t border-slate-200 pt-3 text-sm font-bold text-slate-950 dark:border-slate-800 dark:text-white">
        <span>Total</span>
        <span>INR {fare.total.toLocaleString("en-IN")}</span>
      </div>
      <p className="mt-3 text-xs leading-5 text-slate-500 dark:text-slate-400">
        This is an estimated fare for comparison. Final operator confirmation can adjust route-specific tolls, parking, or extra stops.
      </p>
    </div>
  );
}
