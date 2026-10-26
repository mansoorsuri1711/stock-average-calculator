"use client";

import { useId, useMemo, useState } from "react";
import {
  calculateProfitLoss,
  formatMoney,
  formatNumber,
  formatPercent,
} from "@/lib/stockAverageMath";

type LotInput = { id: string; price: string; shares: string };

function newLot(price = "", shares = ""): LotInput {
  return {
    id:
      typeof crypto !== "undefined" && "randomUUID" in crypto
        ? crypto.randomUUID()
        : `lot-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    price,
    shares,
  };
}

function parsePositive(raw: string): number | null {
  const n = Number(raw.replace(/,/g, ""));
  if (!Number.isFinite(n) || n <= 0) return null;
  return n;
}

export default function ProfitLossCalculator() {
  const formId = useId();
  const [lots, setLots] = useState<LotInput[]>([newLot("100", "40"), newLot("85", "60")]);
  const [currentPrice, setCurrentPrice] = useState("95");

  const result = useMemo(() => {
    const parsed = lots
      .map((l) => {
        const price = parsePositive(l.price);
        const shares = parsePositive(l.shares);
        if (price === null || shares === null) return null;
        return { price, shares };
      })
      .filter((l): l is { price: number; shares: number } => l !== null);
    const cp = parsePositive(currentPrice);
    if (cp === null) return null;
    return calculateProfitLoss({ lots: parsed, currentPrice: cp });
  }, [lots, currentPrice]);

  const fieldClass =
    "w-full rounded-xl border border-white/15 bg-[#0c1428] px-3 py-2.5 text-white outline-none transition placeholder:text-white/35 focus:border-violet/60 focus:bg-[#101a32] focus:ring-2 focus:ring-violet/30";
  const labelClass = "mb-1.5 block text-sm font-medium text-white/80";

  const updateLot = (id: string, key: "price" | "shares", value: string) => {
    setLots((prev) => prev.map((l) => (l.id === id ? { ...l, [key]: value } : l)));
  };

  const pnlPositive = (result?.unrealizedPnL ?? 0) >= 0;

  return (
    <div className="grid gap-6 lg:grid-cols-5 lg:gap-8">
      <form className="space-y-4 lg:col-span-2" onSubmit={(e) => e.preventDefault()}>
        {lots.map((lot, index) => (
          <div key={lot.id} className="rounded-xl border border-white/10 bg-brand-soft/40 p-3">
            <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-violet-soft">
              Purchase {index + 1}
            </p>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label htmlFor={`${formId}-p-${lot.id}`} className={labelClass}>
                  Price ($)
                </label>
                <input
                  id={`${formId}-p-${lot.id}`}
                  type="number"
                  min={0}
                  step="any"
                  value={lot.price}
                  onChange={(e) => updateLot(lot.id, "price", e.target.value)}
                  className={fieldClass}
                />
              </div>
              <div>
                <label htmlFor={`${formId}-s-${lot.id}`} className={labelClass}>
                  Shares
                </label>
                <input
                  id={`${formId}-s-${lot.id}`}
                  type="number"
                  min={0}
                  step="any"
                  value={lot.shares}
                  onChange={(e) => updateLot(lot.id, "shares", e.target.value)}
                  className={fieldClass}
                />
              </div>
            </div>
          </div>
        ))}
        <button
          type="button"
          onClick={() => setLots((prev) => [...prev, newLot()])}
          className="w-full rounded-xl border border-dashed border-violet/50 bg-violet/10 px-4 py-2.5 text-sm font-semibold text-violet-soft"
        >
          + Add purchase
        </button>
        <div>
          <label htmlFor={`${formId}-current`} className={labelClass}>
            Current market price ($)
          </label>
          <input
            id={`${formId}-current`}
            type="number"
            min={0}
            step="any"
            value={currentPrice}
            onChange={(e) => setCurrentPrice(e.target.value)}
            className={fieldClass}
          />
        </div>
      </form>

      <div className="lg:col-span-3">
        {result ? (
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="rounded-xl border border-white/10 bg-white/[0.04] p-4">
              <p className="text-[11px] uppercase tracking-wide text-white/55">Average price</p>
              <p className="mt-1 text-xl font-bold text-white">{formatMoney(result.averagePrice)}</p>
            </div>
            <div className="rounded-xl border border-white/10 bg-white/[0.04] p-4">
              <p className="text-[11px] uppercase tracking-wide text-white/55">Total shares</p>
              <p className="mt-1 text-xl font-bold text-white">
                {formatNumber(result.totalShares, 4)}
              </p>
            </div>
            <div className="rounded-xl border border-white/10 bg-white/[0.04] p-4">
              <p className="text-[11px] uppercase tracking-wide text-white/55">Total cost</p>
              <p className="mt-1 text-xl font-bold text-gold">{formatMoney(result.totalCost)}</p>
            </div>
            <div className="rounded-xl border border-white/10 bg-white/[0.04] p-4">
              <p className="text-[11px] uppercase tracking-wide text-white/55">Market value</p>
              <p className="mt-1 text-xl font-bold text-white">{formatMoney(result.marketValue)}</p>
            </div>
            <div className="rounded-xl border border-violet/30 bg-violet/10 p-4 sm:col-span-2">
              <p className="text-[11px] uppercase tracking-wide text-white/55">Unrealized P/L</p>
              <p
                className={`mt-1 font-display text-3xl font-bold ${
                  pnlPositive ? "text-violet-soft" : "text-red-400"
                }`}
              >
                {formatMoney(result.unrealizedPnL)}{" "}
                <span className="text-lg">({formatPercent(result.unrealizedPnLPct)})</span>
              </p>
              <p className="mt-2 text-sm text-white/60">
                Break-even (average cost): {formatMoney(result.breakEvenPrice)}
              </p>
            </div>
          </div>
        ) : (
          <p className="rounded-xl border border-dashed border-white/15 p-6 text-sm text-white/55">
            Add purchases and a current price to see profit or loss.
          </p>
        )}
      </div>
    </div>
  );
}
