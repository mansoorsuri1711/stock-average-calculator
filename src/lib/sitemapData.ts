import { SITE_ORIGIN } from "@/lib/siteConfig";

function imageLoc(path: string): string {
  return `${SITE_ORIGIN}${path}`;
}

export type SitemapPage = {
  path: string;
  lastMod: string;
  changeFreq: "daily" | "weekly" | "monthly" | "yearly";
  priority: number;
  images?: Array<{ loc: string; title: string; caption: string }>;
};

const LASTMOD = "2026-10-26";

export const SITEMAP_PAGES: SitemapPage[] = [
  {
    path: "/",
    lastMod: LASTMOD,
    changeFreq: "daily",
    priority: 1,
    images: [
      {
        loc: imageLoc("/logo-icon.png"),
        title: "Stock Average Calculator logo",
        caption: "Brand mark for Stock Average Calculator on stockaveragecalc.com",
      },
      {
        loc: imageLoc("/stock-average-calculator.webp"),
        title: "Stock Average Calculator tool",
        caption: "Free stock average and cost basis calculator homepage",
      },
    ],
  },
  {
    path: "/features",
    lastMod: LASTMOD,
    changeFreq: "weekly",
    priority: 0.9,
    images: [
      {
        loc: imageLoc("/stock-average-calculator-tool.webp"),
        title: "Stock Average Calculator features",
        caption: "Multi-purchase average, break-even, and P/L features",
      },
    ],
  },
  {
    path: "/how-it-works",
    lastMod: LASTMOD,
    changeFreq: "weekly",
    priority: 0.9,
    images: [
      {
        loc: imageLoc("/stock-average-calculator-web.webp"),
        title: "How Stock Average Calculator works",
        caption: "Steps to calculate weighted average share price",
      },
    ],
  },
  {
    path: "/stock-cost-basis-calculator",
    lastMod: LASTMOD,
    changeFreq: "weekly",
    priority: 0.95,
    images: [
      {
        loc: imageLoc("/stock-average-calculator-app.webp"),
        title: "Stock Cost Basis Calculator",
        caption: "Calculate average stock cost basis per share",
      },
    ],
  },
  {
    path: "/average-down-calculator",
    lastMod: LASTMOD,
    changeFreq: "weekly",
    priority: 0.95,
    images: [
      {
        loc: imageLoc("/stock-average-calculator-tool.webp"),
        title: "Average Down Stock Calculator",
        caption: "Plan shares to buy to reach a target average price",
      },
    ],
  },
  {
    path: "/break-even-calculator",
    lastMod: LASTMOD,
    changeFreq: "weekly",
    priority: 0.95,
    images: [
      {
        loc: imageLoc("/stock-average-calculator-web.webp"),
        title: "Break-Even Calculator",
        caption: "Calculate new break-even average after buying more shares",
      },
    ],
  },
  {
    path: "/profit-loss-calculator",
    lastMod: LASTMOD,
    changeFreq: "weekly",
    priority: 0.95,
    images: [
      {
        loc: imageLoc("/stock-average-calculator-app.webp"),
        title: "Profit and Loss Calculator",
        caption: "Unrealized stock profit or loss vs current market price",
      },
    ],
  },
  {
    path: "/about-us",
    lastMod: LASTMOD,
    changeFreq: "monthly",
    priority: 0.7,
    images: [
      {
        loc: imageLoc("/logo-icon.png"),
        title: "About Stock Average Calculator",
        caption: "Brand logo used on the About page",
      },
    ],
  },
  {
    path: "/blog",
    lastMod: LASTMOD,
    changeFreq: "weekly",
    priority: 0.8,
  },
  {
    path: "/blog/averaging-down-stocks",
    lastMod: LASTMOD,
    changeFreq: "monthly",
    priority: 0.9,
    images: [
      {
        loc: imageLoc("/stock-average-calculator.webp"),
        title: "Averaging down stocks guide",
        caption: "Meaning, examples, pros and cons of averaging down",
      },
    ],
  },
  {
    path: "/blog/dca-vs-averaging-down",
    lastMod: LASTMOD,
    changeFreq: "monthly",
    priority: 0.85,
    images: [
      {
        loc: imageLoc("/stock-average-calculator-web.webp"),
        title: "DCA vs averaging down",
        caption: "Dollar-cost averaging compared with averaging down",
      },
    ],
  },
  {
    path: "/blog/break-even-after-averaging-down",
    lastMod: LASTMOD,
    changeFreq: "monthly",
    priority: 0.85,
    images: [
      {
        loc: imageLoc("/stock-average-calculator-tool.webp"),
        title: "Break-even after averaging down",
        caption: "How break-even price changes after buying more shares",
      },
    ],
  },
  {
    path: "/blog/stock-cost-basis-explained",
    lastMod: LASTMOD,
    changeFreq: "monthly",
    priority: 0.85,
    images: [
      {
        loc: imageLoc("/stock-average-calculator-app.webp"),
        title: "Stock cost basis explained",
        caption: "What cost basis means for stocks and average price",
      },
    ],
  },
  {
    path: "/contact-us",
    lastMod: LASTMOD,
    changeFreq: "yearly",
    priority: 0.6,
  },
  {
    path: "/privacy",
    lastMod: LASTMOD,
    changeFreq: "yearly",
    priority: 0.4,
  },
  {
    path: "/disclaimer",
    lastMod: LASTMOD,
    changeFreq: "yearly",
    priority: 0.4,
  },
];

export function absoluteUrl(path: string): string {
  if (path === "/") return `${SITE_ORIGIN}/`;
  return `${SITE_ORIGIN}${path}`;
}
