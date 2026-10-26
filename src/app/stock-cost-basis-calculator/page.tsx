import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";
import FaqSection from "@/components/FaqSection";
import StockAverageCalculator from "@/components/StockAverageCalculator";
import { BRAND_FEATURE_4, OG_IMAGE, SITE_NAME, SITE_ORIGIN } from "@/lib/siteConfig";

export const metadata: Metadata = {
  title: "Stock Cost Basis Calculator — Average Cost Per Share",
  description:
    "Free stock cost basis calculator to find your average cost basis per share across multiple buys. Also works as an average cost basis and cost average calculator.",
  alternates: { canonical: `${SITE_ORIGIN}/stock-cost-basis-calculator` },
  openGraph: {
    title: "Stock Cost Basis Calculator — Average Cost Per Share",
    description:
      "Calculate stock cost basis and average cost per share from every purchase you make.",
    url: `${SITE_ORIGIN}/stock-cost-basis-calculator`,
    siteName: SITE_NAME,
    type: "website",
    images: [
      {
        url: OG_IMAGE,
        width: 1200,
        height: 630,
        alt: "Stock cost basis calculator for average cost per share",
      },
    ],
  },
};

const faqs = [
  {
    question: "What is a stock cost basis calculator?",
    answer:
      "A stock cost basis calculator (also called an average cost basis calculator) totals what you paid across purchases and divides by shares owned. The result is your average cost per share — the everyday cost basis investors track for break-even and unrealized P/L.",
  },
  {
    question: "Is this the same as a stock average calculator?",
    answer:
      "Yes for weighted average cost. The homepage stock average calculator and this cost basis tool use the same math; this page frames results in cost-basis language that matches tax and brokerage terminology.",
  },
  {
    question: "Does cost basis include fees and dividends?",
    answer:
      "This tool uses the purchase prices and share counts you enter. Broker fees, wash sales, and reinvested dividends can change official tax basis — check your broker statements for filing.",
  },
];

export default function StockCostBasisCalculatorPage() {
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_ORIGIN}/` },
          {
            "@type": "ListItem",
            position: 2,
            name: "Stock Cost Basis Calculator",
            item: `${SITE_ORIGIN}/stock-cost-basis-calculator`,
          },
        ],
      },
      {
        "@type": "WebApplication",
        name: "Stock Cost Basis Calculator",
        url: `${SITE_ORIGIN}/stock-cost-basis-calculator`,
        applicationCategory: "FinanceApplication",
        operatingSystem: "Web",
        offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
        description:
          "Calculate average stock cost basis and cost per share from multiple purchases.",
      },
      {
        "@type": "FAQPage",
        mainEntity: faqs.map((f) => ({
          "@type": "Question",
          name: f.question,
          acceptedAnswer: { "@type": "Answer", text: f.answer },
        })),
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Stock Cost Basis Calculator", href: "/stock-cost-basis-calculator" },
        ]}
      />
      <div className="container mx-auto max-w-6xl px-4 pb-12 pt-6">
        <h1 className="mb-2 font-display text-3xl font-bold text-white md:text-4xl">
          Stock cost basis calculator
        </h1>
        <p className="mb-8 max-w-2xl text-lg text-white/75">
          Find your average cost basis per share — the same weighted average used by a{" "}
          <Link href="/" className="text-violet-soft underline">
            stock average calculator
          </Link>
          , framed for cost basis, average cost, and break-even planning.
        </p>

        <StockAverageCalculator
          title="Cost basis calculator"
          subtitle="Enter each buy price and share quantity. Your average cost basis updates instantly."
          showHeader
        />

        <section className="mt-12 grid gap-8 md:grid-cols-2 md:items-center">
          <div>
            <h2 className="mb-3 font-display text-2xl font-bold text-white">
              Average cost basis in one formula
            </h2>
            <p className="mb-4 leading-relaxed text-white/75">
              <strong className="text-white">Cost basis</strong> ≈ total amount invested ÷ total
              shares. Searchers also call this a cost basis stock calculator, average cost basis
              calculator, stock average cost calculator, or cost average calculator — all point at
              the same weighted average.
            </p>
            <p className="leading-relaxed text-white/75">
              Prefer strategy reading first? See{" "}
              <Link href="/blog/stock-cost-basis-explained" className="text-violet-soft underline">
                stock cost basis explained
              </Link>
              . Planning to buy the dip? Use the{" "}
              <Link href="/average-down-calculator" className="text-violet-soft underline">
                average down stock calculator
              </Link>
              .
            </p>
          </div>
          <div className="relative aspect-video overflow-hidden rounded-2xl border border-white/10">
            <Image
              src={BRAND_FEATURE_4}
              alt="Stock cost basis calculator showing average cost per share"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
        </section>

        <div className="mt-12">
          <FaqSection items={faqs} includeSchema={false} />
        </div>
      </div>
    </>
  );
}
