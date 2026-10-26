"use client";

import { useId, useMemo, useState } from "react";
import {
  calculateStockAverage,
  formatMoney,
  formatNumber,
  formatPercent,
} from "@/lib/stockAverageMath";

type LotInput = { id: string; price: string; shares: string };

type StockAverageCalculatorProps = {
  title?: string;
  subtitle?: string;
  titleAs?: "h1" | "h2";
  showHeader?: boolean;
};

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

export default function StockAverageCalculator({
  title = "Stock average calculator",
  subtitle = "Add each purchase — share price and quantity — to get your weighted average cost basis.",
  titleAs = "h2",
  showHeader = true,
}: StockAverageCalculatorProps) {
  const formId = useId();
  const [lots, setLots] = useState<LotInput[]>([
    newLot("100", "50"),
    newLot("80", "30"),
  ]);
  const [currentPrice, setCurrentPrice] = useState("90");

  const TitleTag = titleAs;

  const result = useMemo(() => {
    const parsed = lots
      .map((l) => {
        const price = parsePositive(l.price);
        const shares = parsePositive(l.shares);
        if (price === null || shares === null) return null;
        return { price, shares };
      })
      .filter((l): l is { price: number; shares: number } => l !== null);

    const cp = currentPrice.trim() === "" ? null : parsePositive(currentPrice);
    return calculateStockAverage(parsed, cp);
  }, [lots, currentPrice]);

  const fieldClass =
    "w-full rounded-xl border border-white/15 bg-[#0c1428] px-3 py-2.5 text-white outline-none transition placeholder:text-white/35 focus:border-violet/60 focus:bg-[#101a32] focus:ring-2 focus:ring-violet/30";
  const labelClass = "mb-1.5 block text-sm font-medium text-white/80";

  const updateLot = (id: string, key: "price" | "shares", value: string) => {
    setLots((prev) => prev.map((l) => (l.id === id ? { ...l, [key]: value } : l)));
  };

  const removeLot = (id: string) => {
    setLots((prev) => (prev.length <= 1 ? prev : prev.filter((l) => l.id !== id)));
  };

  const pnlPositive = (result?.unrealizedPnL ?? 0) >= 0;

  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 sm:p-6">
      {showHeader && (
        <div className="mb-5">
          <TitleTag className="font-display text-xl font-bold text-white sm:text-2xl">
            {title}
          </TitleTag>
          <p className="mt-1 text-sm text-white/65">{subtitle}</p>
        </div>
      )}

      <div className="grid gap-6 lg:grid-cols-5 lg:gap-8">
        <form className="space-y-4 lg:col-span-2" onSubmit={(e) => e.preventDefault()}>
          <div className="space-y-3">
            {lots.map((lot, index) => (
              <div
                key={lot.id}
                className="rounded-xl border border-white/10 bg-brand-soft/40 p-3"
              >
                <div className="mb-2 flex items-center justify-between gap-2">
                  <p className="text-xs font-semibold uppercase tracking-wide text-violet-soft">
                    Purchase {index + 1}
                  </p>
                  {lots.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeLot(lot.id)}
                      className="text-xs text-white/50 hover:text-white"
                      aria-label={`Remove purchase ${index + 1}`}
                    >
                      Remove
                    </button>
                  )}
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label htmlFor={`${formId}-price-${lot.id}`} className={labelClass}>
                      Share price ($)
                    </label>
                    <input
                      id={`${formId}-price-${lot.id}`}
                      type="number"
                      min={0}
                      step="any"
                      inputMode="decimal"
                      value={lot.price}
                      onChange={(e) => updateLot(lot.id, "price", e.target.value)}
                      className={fieldClass}
                    />
                  </div>
                  <div>
                    <label htmlFor={`${formId}-shares-${lot.id}`} className={labelClass}>
                      Shares
                    </label>
                    <input
                      id={`${formId}-shares-${lot.id}`}
                      type="number"
                      min={0}
                      step="any"
                      inputMode="decimal"
                      value={lot.shares}
                      onChange={(e) => updateLot(lot.id, "shares", e.target.value)}
                      className={fieldClass}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>

          <button
            type="button"
            onClick={() => setLots((prev) => [...prev, newLot()])}
            className="w-full rounded-xl border border-dashed border-violet/50 bg-violet/10 px-4 py-2.5 text-sm font-semibold text-violet-soft transition hover:bg-violet/20"
          >
            + Add another purchase
          </button>

          <div>
            <label htmlFor={`${formId}-current`} className={labelClass}>
              Current market price ($) <span className="text-white/45">(optional)</span>
            </label>
            <input
              id={`${formId}-current`}
              type="number"
              min={0}
              step="any"
              inputMode="decimal"
              value={currentPrice}
              onChange={(e) => setCurrentPrice(e.target.value)}
              placeholder="For P/L & market value"
              className={fieldClass}
            />
          </div>
        </form>

        <div className="lg:col-span-3">
          {result ? (
            <div className="space-y-4">
              <div className="grid gap-3 sm:grid-cols-3">
                <div className="rounded-xl border border-violet/30 bg-violet/10 p-4">
                  <p className="text-[11px] uppercase tracking-wide text-white/55">
                    Average price
                  </p>
                  <p className="mt-1 font-display text-2xl font-bold text-violet-soft">
                    {formatMoney(result.averagePrice)}
                  </p>
                  <p className="mt-1 text-xs text-white/50">Cost basis / break-even</p>
                </div>
                <div className="rounded-xl border border-white/10 bg-white/[0.04] p-4">
                  <p className="text-[11px] uppercase tracking-wide text-white/55">
                    Total shares
                  </p>
                  <p className="mt-1 font-display text-2xl font-bold text-white">
                    {formatNumber(result.totalShares, 4)}
                  </p>
                </div>
                <div className="rounded-xl border border-white/10 bg-white/[0.04] p-4">
                  <p className="text-[11px] uppercase tracking-wide text-white/55">
                    Total invested
                  </p>
                  <p className="mt-1 font-display text-2xl font-bold text-gold">
                    {formatMoney(result.totalCost)}
                  </p>
                </div>
              </div>

              {result.currentPrice != null &&
                result.marketValue != null &&
                result.unrealizedPnL != null && (
                  <div className="grid gap-3 sm:grid-cols-3">
                    <div className="rounded-xl border border-white/10 bg-white/[0.04] p-4">
                      <p className="text-[11px] uppercase tracking-wide text-white/55">
                        Market value
                      </p>
                      <p className="mt-1 text-xl font-bold text-white">
                        {formatMoney(result.marketValue)}
                      </p>
                    </div>
                    <div className="rounded-xl border border-white/10 bg-white/[0.04] p-4 sm:col-span-2">
                      <p className="text-[11px] uppercase tracking-wide text-white/55">
                        Unrealized P/L
                      </p>
                      <p
                        className={`mt-1 text-xl font-bold ${
                          pnlPositive ? "text-violet-soft" : "text-red-400"
                        }`}
                      >
                        {formatMoney(result.unrealizedPnL)}{" "}
                        <span className="text-base font-semibold">
                          ({formatPercent(result.unrealizedPnLPct ?? 0)})
                        </span>
                      </p>
                    </div>
                  </div>
                )}

              <div className="overflow-x-auto rounded-xl border border-white/10">
                <table className="min-w-full text-left text-sm">
                  <thead className="bg-white/[0.04] text-xs uppercase tracking-wide text-white/55">
                    <tr>
                      <th className="px-3 py-2.5 font-medium">#</th>
                      <th className="px-3 py-2.5 font-medium">Price</th>
                      <th className="px-3 py-2.5 font-medium">Shares</th>
                      <th className="px-3 py-2.5 font-medium">Cost</th>
                      <th className="px-3 py-2.5 font-medium">Weight</th>
                    </tr>
                  </thead>
                  <tbody>
                    {result.lots.map((lot, i) => (
                      <tr key={`${lot.price}-${lot.shares}-${i}`} className="border-t border-white/10">
                        <td className="px-3 py-2 text-white/70">{i + 1}</td>
                        <td className="px-3 py-2 text-white">{formatMoney(lot.price)}</td>
                        <td className="px-3 py-2 text-white">{formatNumber(lot.shares, 4)}</td>
                        <td className="px-3 py-2 text-white">{formatMoney(lot.cost)}</td>
                        <td className="px-3 py-2 text-white/70">
                          {formatNumber(lot.weightPct, 1)}%
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ) : (
            <div className="flex h-full min-h-[180px] items-center justify-center rounded-xl border border-dashed border-white/15 px-4 text-center text-sm text-white/55">
              Enter at least one purchase with a positive price and share count to see your
              average.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
