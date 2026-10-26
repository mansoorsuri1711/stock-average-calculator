"use client";

import { useId, useMemo, useState } from "react";
import { formatMoney, formatNumber, planBreakEvenBuy } from "@/lib/stockAverageMath";

function parsePositive(raw: string): number | null {
  const n = Number(raw.replace(/,/g, ""));
  if (!Number.isFinite(n) || n <= 0) return null;
  return n;
}

export default function BreakEvenCalculator() {
  const formId = useId();
  const [shares, setShares] = useState("100");
  const [avg, setAvg] = useState("50");
  const [buyPrice, setBuyPrice] = useState("40");
  const [buyShares, setBuyShares] = useState("50");

  const plan = useMemo(() => {
    const s = parsePositive(shares);
    const a = parsePositive(avg);
    const b = parsePositive(buyPrice);
    const q = parsePositive(buyShares);
    if (s === null || a === null || b === null || q === null) return null;
    return planBreakEvenBuy({
      currentShares: s,
      currentAvg: a,
      buyPrice: b,
      sharesToBuy: q,
    });
  }, [shares, avg, buyPrice, buyShares]);

  const fieldClass =
    "w-full rounded-xl border border-white/15 bg-[#0c1428] px-3 py-2.5 text-white outline-none transition placeholder:text-white/35 focus:border-violet/60 focus:bg-[#101a32] focus:ring-2 focus:ring-violet/30";
  const labelClass = "mb-1.5 block text-sm font-medium text-white/80";

  return (
    <div className="grid gap-6 lg:grid-cols-5 lg:gap-8">
      <form className="space-y-4 lg:col-span-2" onSubmit={(e) => e.preventDefault()}>
        <div>
          <label htmlFor={`${formId}-shares`} className={labelClass}>
            Shares owned
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
            Current average / cost basis ($)
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
            Next buy price ($)
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
          <label htmlFor={`${formId}-qty`} className={labelClass}>
            Shares you plan to buy
          </label>
          <input
            id={`${formId}-qty`}
            type="number"
            min={0}
            step="any"
            value={buyShares}
            onChange={(e) => setBuyShares(e.target.value)}
            className={fieldClass}
          />
        </div>
      </form>

      <div className="lg:col-span-3">
        {plan ? (
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="rounded-xl border border-violet/30 bg-violet/10 p-4 sm:col-span-2">
              <p className="text-[11px] uppercase tracking-wide text-white/55">
                New break-even price
              </p>
              <p className="mt-1 font-display text-3xl font-bold text-violet-soft">
                {formatMoney(plan.newAvg)}
              </p>
              <p className="mt-1 text-sm text-white/60">
                The stock must return to this average (before fees/taxes) for you to break even on
                the full position.
              </p>
            </div>
            <div className="rounded-xl border border-white/10 bg-white/[0.04] p-4">
              <p className="text-[11px] uppercase tracking-wide text-white/55">Capital needed</p>
              <p className="mt-1 text-xl font-bold text-gold">{formatMoney(plan.capitalNeeded)}</p>
            </div>
            <div className="rounded-xl border border-white/10 bg-white/[0.04] p-4">
              <p className="text-[11px] uppercase tracking-wide text-white/55">New total shares</p>
              <p className="mt-1 text-xl font-bold text-white">{formatNumber(plan.newShares, 4)}</p>
            </div>
            <div className="rounded-xl border border-white/10 bg-white/[0.04] p-4 sm:col-span-2">
              <p className="text-[11px] uppercase tracking-wide text-white/55">New total invested</p>
              <p className="mt-1 text-xl font-bold text-white">{formatMoney(plan.newCost)}</p>
            </div>
          </div>
        ) : (
          <p className="rounded-xl border border-dashed border-white/15 p-6 text-sm text-white/55">
            Enter your position and next purchase to see the new break-even average.
          </p>
        )}
      </div>
    </div>
  );
}
