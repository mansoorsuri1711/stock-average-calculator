import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";
import { BRAND_FEATURE_3, OG_IMAGE, SITE_NAME, SITE_ORIGIN } from "@/lib/siteConfig";

export const metadata: Metadata = {
  title: "How It Works — Stock Average Formula & Steps",
  description:
    "Learn how Stock Average Calculator computes weighted average share price: total cost ÷ total shares, with optional P/L from a current market price.",
  alternates: { canonical: `${SITE_ORIGIN}/how-it-works` },
  openGraph: {
    title: "How It Works — Stock Average Formula & Steps",
    description: "Step-by-step weighted average cost basis on stockaveragecalc.com.",
    url: `${SITE_ORIGIN}/how-it-works`,
    siteName: SITE_NAME,
    type: "website",
    images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: "How stock average calculator works" }],
  },
};

const steps = [
  {
    n: "1",
    title: "Enter each purchase",
    text: "For every buy of the same stock, type the share price and quantity. Add rows until every fill is listed.",
  },
  {
    n: "2",
    title: "We weight by shares",
    text: "Each lot’s cost is price × shares. Larger lots pull the blended average more than small ones.",
  },
  {
    n: "3",
    title: "Average = total cost ÷ shares",
    text: "That weighted average is your cost basis per share and your break-even before fees and taxes.",
  },
  {
    n: "4",
    title: "Optional market mark",
    text: "Add today’s price to see market value and unrealized profit or loss versus total invested.",
  },
];

export default function HowItWorksPage() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "How to calculate stock average price",
    description: "Use Stock Average Calculator to find weighted average cost basis.",
    step: steps.map((s) => ({
      "@type": "HowToStep",
      name: s.title,
      text: s.text,
    })),
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
          { label: "How It Works", href: "/how-it-works" },
        ]}
      />
      <div className="container mx-auto max-w-6xl px-4 pb-12 pt-6">
        <h1 className="mb-3 font-display text-3xl font-bold text-white md:text-4xl">
          How Stock Average Calculator works
        </h1>
        <p className="mb-10 max-w-2xl text-lg text-white/75">
          Simple weighted-average math — the same formula brokers use for average cost — explained
          in plain English.
        </p>
        <div className="mb-12 grid gap-8 md:grid-cols-2 md:items-center">
          <ol className="space-y-6">
            {steps.map((s) => (
              <li key={s.n} className="border-l-2 border-violet/50 pl-4">
                <span className="text-sm font-bold text-teal">Step {s.n}</span>
                <h2 className="mt-1 font-display text-xl font-semibold text-white">{s.title}</h2>
                <p className="mt-2 text-sm leading-relaxed text-white/70">{s.text}</p>
              </li>
            ))}
          </ol>
          <div className="relative aspect-video overflow-hidden rounded-2xl border border-white/10">
            <Image
              src={BRAND_FEATURE_3}
              alt="Illustration of how weighted average stock price is calculated"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
        </div>
        <p className="text-white/75">
          Prefer a worked strategy example? Read{" "}
          <Link href="/blog/averaging-down-stocks" className="text-violet-soft underline">
            averaging down stocks
          </Link>{" "}
          or open the{" "}
          <Link href="/#calculator" className="text-violet-soft underline">
            calculator
          </Link>
          .
        </p>
      </div>
    </>
  );
}
