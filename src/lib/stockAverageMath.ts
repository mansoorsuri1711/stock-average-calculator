export type PurchaseLot = {
  price: number;
  shares: number;
};

export type AverageResult = {
  totalShares: number;
  totalCost: number;
  averagePrice: number;
  lots: Array<PurchaseLot & { cost: number; weightPct: number }>;
  currentPrice: number | null;
  marketValue: number | null;
  unrealizedPnL: number | null;
  unrealizedPnLPct: number | null;
  breakEvenPrice: number;
};

export type AverageDownPlan = {
  currentShares: number;
  currentAvg: number;
  currentCost: number;
  buyPrice: number;
  targetAvg: number | null;
  sharesToBuy: number | null;
  costToBuy: number | null;
  newShares: number | null;
  newAvg: number | null;
  newCost: number | null;
  error: string | null;
};

export type BreakEvenPlan = {
  currentShares: number;
  currentAvg: number;
  buyPrice: number;
  sharesToBuy: number;
  newAvg: number;
  newShares: number;
  newCost: number;
  capitalNeeded: number;
};

export type ProfitLossResult = {
  totalShares: number;
  totalCost: number;
  averagePrice: number;
  currentPrice: number;
  marketValue: number;
  unrealizedPnL: number;
  unrealizedPnLPct: number;
  breakEvenPrice: number;
};

export function formatMoney(n: number, digits = 2): string {
  if (!Number.isFinite(n)) return "—";
  return n.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
  });
}

export function formatNumber(n: number, digits = 2): string {
  if (!Number.isFinite(n)) return "—";
  return n.toLocaleString("en-US", {
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
  });
}

export function formatPercent(n: number, digits = 2): string {
  if (!Number.isFinite(n)) return "—";
  const sign = n > 0 ? "+" : "";
  return `${sign}${n.toFixed(digits)}%`;
}

/** Weighted average cost basis across purchase lots. */
export function calculateStockAverage(
  lots: PurchaseLot[],
  currentPrice?: number | null
): AverageResult | null {
  const valid = lots.filter((l) => l.price > 0 && l.shares > 0);
  if (!valid.length) return null;

  const totalShares = valid.reduce((s, l) => s + l.shares, 0);
  const totalCost = valid.reduce((s, l) => s + l.price * l.shares, 0);
  if (totalShares <= 0) return null;

  const averagePrice = totalCost / totalShares;
  const price =
    currentPrice != null && Number.isFinite(currentPrice) && currentPrice > 0
      ? currentPrice
      : null;

  const marketValue = price != null ? price * totalShares : null;
  const unrealizedPnL = marketValue != null ? marketValue - totalCost : null;
  const unrealizedPnLPct =
    unrealizedPnL != null && totalCost > 0 ? (unrealizedPnL / totalCost) * 100 : null;

  return {
    totalShares,
    totalCost,
    averagePrice,
    breakEvenPrice: averagePrice,
    currentPrice: price,
    marketValue,
    unrealizedPnL,
    unrealizedPnLPct,
    lots: valid.map((l) => ({
      ...l,
      cost: l.price * l.shares,
      weightPct: (l.shares / totalShares) * 100,
    })),
  };
}

/**
 * Shares needed at buyPrice to reach targetAvg.
 * Formula: (currentCost + buyPrice * x) / (currentShares + x) = targetAvg
 * => x = (currentCost - targetAvg * currentShares) / (targetAvg - buyPrice)
 */
export function planAverageDown(input: {
  currentShares: number;
  currentAvg: number;
  buyPrice: number;
  targetAvg: number;
}): AverageDownPlan {
  const { currentShares, currentAvg, buyPrice, targetAvg } = input;
  const currentCost = currentShares * currentAvg;
  const base: AverageDownPlan = {
    currentShares,
    currentAvg,
    currentCost,
    buyPrice,
    targetAvg,
    sharesToBuy: null,
    costToBuy: null,
    newShares: null,
    newAvg: null,
    newCost: null,
    error: null,
  };

  if (currentShares <= 0 || currentAvg <= 0 || buyPrice <= 0 || targetAvg <= 0) {
    return { ...base, error: "Enter positive values for shares, prices, and target average." };
  }
  if (targetAvg >= currentAvg) {
    return {
      ...base,
      error:
        "Target average must be below your current average to average down. Raise buy size or lower buy price instead.",
    };
  }
  if (buyPrice >= targetAvg) {
    return {
      ...base,
      error:
        "Buy price must be below your target average. You cannot lower the average by buying at or above the target.",
    };
  }

  const sharesToBuy =
    (currentCost - targetAvg * currentShares) / (targetAvg - buyPrice);
  if (!Number.isFinite(sharesToBuy) || sharesToBuy <= 0) {
    return { ...base, error: "No positive share quantity solves for that target." };
  }

  const costToBuy = sharesToBuy * buyPrice;
  const newShares = currentShares + sharesToBuy;
  const newCost = currentCost + costToBuy;
  const newAvg = newCost / newShares;

  return {
    ...base,
    sharesToBuy,
    costToBuy,
    newShares,
    newAvg,
    newCost,
    error: null,
  };
}

/** New average (and capital) after buying a fixed number of shares at buyPrice. */
export function planBreakEvenBuy(input: {
  currentShares: number;
  currentAvg: number;
  buyPrice: number;
  sharesToBuy: number;
}): BreakEvenPlan | null {
  const { currentShares, currentAvg, buyPrice, sharesToBuy } = input;
  if (
    currentShares <= 0 ||
    currentAvg <= 0 ||
    buyPrice <= 0 ||
    sharesToBuy <= 0
  ) {
    return null;
  }
  const currentCost = currentShares * currentAvg;
  const capitalNeeded = sharesToBuy * buyPrice;
  const newCost = currentCost + capitalNeeded;
  const newShares = currentShares + sharesToBuy;
  const newAvg = newCost / newShares;
  return {
    currentShares,
    currentAvg,
    buyPrice,
    sharesToBuy,
    newAvg,
    newShares,
    newCost,
    capitalNeeded,
  };
}

export function calculateProfitLoss(input: {
  lots: PurchaseLot[];
  currentPrice: number;
}): ProfitLossResult | null {
  const avg = calculateStockAverage(input.lots, input.currentPrice);
  if (!avg || avg.currentPrice == null || avg.marketValue == null || avg.unrealizedPnL == null) {
    return null;
  }
  return {
    totalShares: avg.totalShares,
    totalCost: avg.totalCost,
    averagePrice: avg.averagePrice,
    currentPrice: avg.currentPrice,
    marketValue: avg.marketValue,
    unrealizedPnL: avg.unrealizedPnL,
    unrealizedPnLPct: avg.unrealizedPnLPct ?? 0,
    breakEvenPrice: avg.breakEvenPrice,
  };
}
