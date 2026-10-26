import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";
import ProfitLossCalculator from "@/components/ProfitLossCalculator";
import Breadcrumbs from "@/components/Breadcrumbs";
import FaqSection from "@/components/FaqSection";
import { BRAND_FEATURE_4, OG_IMAGE, SITE_NAME, SITE_ORIGIN } from "@/lib/siteConfig";

export const metadata: Metadata = {
  title: "Stock Profit & Loss Calculator — Unrealized P/L",
  description:
    "Free stock profit and loss calculator: add purchases, enter the current price, and see unrealized gain or loss versus your average cost.",
  alternates: { canonical: `${SITE_ORIGIN}/profit-loss-calculator` },
  openGraph: {
    title: "Stock Profit & Loss Calculator — Unrealized P/L",
    description: "Compare total cost basis to current market value for unrealized P/L.",
    url: `${SITE_ORIGIN}/profit-loss-calculator`,
    siteName: SITE_NAME,
    type: "website",
    images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: "Stock profit loss calculator" }],
  },
};

const faqs = [
  {
    question: "Does this include fees and taxes?",
    answer:
      "No. Results are pre-fee and pre-tax estimates based on purchase prices and the current market price you enter.",
  },
  {
    question: "Is unrealized P/L the same as locked-in profit?",
    answer:
      "No. Unrealized means you still hold the shares. Gains or losses become realized when you sell (subject to your broker’s cost-basis method and tax rules).",
  },
];

export default function ProfitLossPage() {
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
            name: "Profit & Loss Calculator",
            item: `${SITE_ORIGIN}/profit-loss-calculator`,
          },
        ],
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
          { label: "Profit & Loss Calculator", href: "/profit-loss-calculator" },
        ]}
      />
      <div className="container mx-auto max-w-6xl px-4 pb-12 pt-6">
        <h1 className="mb-2 font-display text-3xl font-bold text-white md:text-4xl">
          Stock profit &amp; loss calculator
        </h1>
        <p className="mb-8 max-w-2xl text-lg text-white/75">
          Blend your buys into an average cost, then mark the position to a current price. Learn more
          about{" "}
          <Link href="/blog/stock-cost-basis-explained" className="text-violet-soft underline">
            cost basis
          </Link>
          .
        </p>
        <ProfitLossCalculator />
        <div className="mt-12 grid gap-8 md:grid-cols-2 md:items-center">
          <div>
            <h2 className="mb-3 font-display text-2xl font-bold text-white">
              Average first, then mark to market
            </h2>
            <p className="leading-relaxed text-white/75">
              Accurate P/L starts with a correct average. If you only need cost basis without a mark
              price, use the main{" "}
              <Link href="/" className="text-violet-soft underline">
                stock average calculator
              </Link>
              .
            </p>
          </div>
          <div className="relative aspect-video overflow-hidden rounded-2xl border border-white/10">
            <Image
              src={BRAND_FEATURE_4}
              alt="Stock profit and loss calculator comparing cost basis to market value"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
        </div>
        <div className="mt-12">
          <h2 className="mb-4 font-display text-2xl font-bold text-white">FAQs</h2>
          <FaqSection items={faqs} includeSchema={false} />
        </div>
      </div>
    </>
  );
}
