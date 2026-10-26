import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";
import { BRAND_FEATURE_2, BRAND_FEATURE_3, BRAND_FEATURE_4, OG_IMAGE, SITE_NAME, SITE_ORIGIN } from "@/lib/siteConfig";

export const metadata: Metadata = {
  title: "Features — Multi-Buy Average, Break-Even & P/L",
  description:
    "Explore Stock Average Calculator features: unlimited purchase rows, weighted average cost, optional market P/L, average-down planning, and break-even tools.",
  alternates: { canonical: `${SITE_ORIGIN}/features` },
  openGraph: {
    title: "Features — Multi-Buy Average, Break-Even & P/L",
    description: "Everything built into Stock Average Calculator for cost basis clarity.",
    url: `${SITE_ORIGIN}/features`,
    siteName: SITE_NAME,
    type: "website",
    images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: "Stock Average Calculator features" }],
  },
};

const features = [
  {
    title: "Unlimited purchase rows",
    text: "Add every fill — not just two buys — so your weighted average matches real brokerage activity.",
    img: BRAND_FEATURE_2,
    alt: "Multiple stock purchase rows in Stock Average Calculator",
  },
  {
    title: "Optional current price",
    text: "Mark the position to market for unrealized profit or loss without leaving the page.",
    img: BRAND_FEATURE_3,
    alt: "Current market price and unrealized P/L feature",
  },
  {
    title: "Planning companions",
    text: "Jump to average-down, break-even, and P/L tools when you need a decision, not just a number.",
    img: BRAND_FEATURE_4,
    alt: "Related stock average planning calculators",
  },
];

export default function FeaturesPage() {
  return (
    <>
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Features", href: "/features" }]} />
      <div className="container mx-auto max-w-6xl px-4 pb-12 pt-6">
        <h1 className="mb-3 font-display text-3xl font-bold text-white md:text-4xl">
          Features built for multi-buy investors
        </h1>
        <p className="mb-10 max-w-2xl text-lg text-white/75">
          {SITE_NAME} focuses on cost basis clarity — weighted averages, break-even, and planning —
          without brokerage clutter.
        </p>
        <div className="grid gap-8 md:grid-cols-3">
          {features.map((f) => (
            <article key={f.title} className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03]">
              <div className="relative aspect-video">
                <Image src={f.img} alt={f.alt} fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover" />
              </div>
              <div className="p-5">
                <h2 className="font-display text-xl font-semibold text-white">{f.title}</h2>
                <p className="mt-2 text-sm leading-relaxed text-white/70">{f.text}</p>
              </div>
            </article>
          ))}
        </div>
        <div className="mt-12 rounded-2xl border border-violet/30 bg-violet/10 p-8 text-center">
          <p className="mb-4 text-white/80">Ready to run your numbers?</p>
          <Link
            href="/#calculator"
            className="inline-flex rounded-xl bg-gradient-to-r from-violet to-teal px-6 py-3 text-sm font-bold text-brand-deep"
          >
            Open stock average calculator
          </Link>
        </div>
      </div>
    </>
  );
}
