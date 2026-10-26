"use client";

import { useId, useMemo, useState } from "react";
import { formatMoney, formatNumber, planAverageDown } from "@/lib/stockAverageMath";

function parsePositive(raw: string): number | null {
  const n = Number(raw.replace(/,/g, ""));
  if (!Number.isFinite(n) || n <= 0) return null;
  return n;
}

export default function AverageDownCalculator() {
  const formId = useId();
  const [shares, setShares] = useState("100");
  const [avg, setAvg] = useState("50");
  const [buyPrice, setBuyPrice] = useState("40");
  const [target, setTarget] = useState("45");

  const plan = useMemo(() => {
    const s = parsePositive(shares);
    const a = parsePositive(avg);
    const b = parsePositive(buyPrice);
    const t = parsePositive(target);
    if (s === null || a === null || b === null || t === null) return null;
    return planAverageDown({
      currentShares: s,
      currentAvg: a,
      buyPrice: b,
      targetAvg: t,
    });
  }, [shares, avg, buyPrice, target]);

  const fieldClass =
    "w-full rounded-xl border border-white/15 bg-[#0c1428] px-3 py-2.5 text-white outline-none transition placeholder:text-white/35 focus:border-violet/60 focus:bg-[#101a32] focus:ring-2 focus:ring-violet/30";
  const labelClass = "mb-1.5 block text-sm font-medium text-white/80";

  return (
    <div className="grid gap-6 lg:grid-cols-5 lg:gap-8">
      <form className="space-y-4 lg:col-span-2" onSubmit={(e) => e.preventDefault()}>
        <div>
          <label htmlFor={`${formId}-shares`} className={labelClass}>
            Shares you already own
          </label>
          <input
            id={`${formId}-shares`}
            type="number"
            min={0}
            step="any"
            value={shares}
            onChange={(e) => setShares(e.target.value)}
            className={fieldClass}
          />
        </div>
        <div>
          <label htmlFor={`${formId}-avg`} className={labelClass}>
            Current average price ($)
          </label>
          <input
            id={`${formId}-avg`}
            type="number"
            min={0}
            step="any"
            value={avg}
            onChange={(e) => setAvg(e.target.value)}
            className={fieldClass}
          />
        </div>
        <div>
          <label htmlFor={`${formId}-buy`} className={labelClass}>
            Planned buy price ($)
          </label>
          <input
            id={`${formId}-buy`}
            type="number"
            min={0}
            step="any"
            value={buyPrice}
            onChange={(e) => setBuyPrice(e.target.value)}
            className={fieldClass}
          />
        </div>
        <div>
          <label htmlFor={`${formId}-target`} className={labelClass}>
            Target average price ($)
          </label>
          <input
            id={`${formId}-target`}
            type="number"
            min={0}
            step="any"
            value={target}
            onChange={(e) => setTarget(e.target.value)}
            className={fieldClass}
          />
        </div>
      </form>

      <div className="lg:col-span-3">
        {!plan ? (
          <p className="rounded-xl border border-dashed border-white/15 p-6 text-sm text-white/55">
            Enter positive values to plan an average-down purchase.
          </p>
        ) : plan.error ? (
          <p className="rounded-xl border border-red-400/30 bg-red-400/10 p-5 text-sm text-red-200">
            {plan.error}
          </p>
        ) : (
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="rounded-xl border border-violet/30 bg-violet/10 p-4 sm:col-span-2">
              <p className="text-[11px] uppercase tracking-wide text-white/55">
                Shares to buy
              </p>
              <p className="mt-1 font-display text-3xl font-bold text-violet-soft">
                {formatNumber(plan.sharesToBuy ?? 0, 4)}
              </p>
              <p className="mt-1 text-sm text-white/60">
                Capital needed: {formatMoney(plan.costToBuy ?? 0)}
              </p>
            </div>
            <div className="rounded-xl border border-white/10 bg-white/[0.04] p-4">
              <p className="text-[11px] uppercase tracking-wide text-white/55">New average</p>
              <p className="mt-1 text-xl font-bold text-white">
                {formatMoney(plan.newAvg ?? 0)}
              </p>
            </div>
            <div className="rounded-xl border border-white/10 bg-white/[0.04] p-4">
              <p className="text-[11px] uppercase tracking-wide text-white/55">New total shares</p>
              <p className="mt-1 text-xl font-bold text-white">
                {formatNumber(plan.newShares ?? 0, 4)}
              </p>
            </div>
            <div className="rounded-xl border border-white/10 bg-white/[0.04] p-4 sm:col-span-2">
              <p className="text-[11px] uppercase tracking-wide text-white/55">New total cost</p>
              <p className="mt-1 text-xl font-bold text-gold">
                {formatMoney(plan.newCost ?? 0)}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
