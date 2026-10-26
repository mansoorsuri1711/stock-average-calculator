import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";
import BlogPostSchema from "@/components/BlogPostSchema";
import FaqSection from "@/components/FaqSection";
import CtaButton from "@/components/CtaButton";
import { BRAND_FEATURE_2, OG_IMAGE, SITE_NAME, SITE_ORIGIN } from "@/lib/siteConfig";

const TITLE = "Break-Even Price After Averaging Down Explained";
const DESC =
  "Understand how your stock break-even price changes after averaging down, with a clear formula, example, and links to free calculators.";
const SLUG = "break-even-after-averaging-down";
const DATE = "2026-10-26";

export const metadata: Metadata = {
  title: TITLE,
  description: DESC,
  alternates: { canonical: `${SITE_ORIGIN}/blog/${SLUG}` },
  openGraph: {
    title: TITLE,
    description: DESC,
    url: `${SITE_ORIGIN}/blog/${SLUG}`,
    siteName: SITE_NAME,
    type: "article",
    images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: TITLE }],
  },
};

const faqs = [
  {
    question: "What is the break-even price after averaging?",
    answer:
      "It is your new weighted average cost per share. Before commissions and taxes, the market price must return to that average for the full position to show neither gain nor loss.",
  },
  {
    question: "Does buying more always lower break-even?",
    answer:
      "Only if the new purchase price is below your current average. Buying above your average raises break-even (averaging up).",
  },
];

export default function BreakEvenBlogPage() {
  return (
    <>
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Blog", href: "/blog" },
          { label: "Break-Even After Averaging", href: `/blog/${SLUG}` },
        ]}
      />
      <article className="container mx-auto max-w-3xl px-4 pb-10 pt-8">
        <BlogPostSchema
          title={TITLE}
          description={DESC}
          slug={SLUG}
          datePublished={DATE}
          image={`${SITE_ORIGIN}${BRAND_FEATURE_2}`}
        />
        <h1 className="mb-4 font-display text-3xl font-bold text-white md:text-4xl">{TITLE}</h1>
        <p className="mb-6 text-sm text-white/50">Updated October 26, 2026 · 7 min read</p>

        <div className="relative mb-8 aspect-video overflow-hidden rounded-2xl border border-white/10">
          <Image
            src={BRAND_FEATURE_2}
            alt="Chart-style illustration of break-even price falling after averaging down"
            fill
            sizes="(max-width: 768px) 100vw, 768px"
            className="object-cover"
            priority
          />
        </div>

        <div className="space-y-6 text-base leading-relaxed text-white/85">
          <p>
            After you average down, the price you need for a flat exit changes. That new level is your
            break-even — and it is exactly the weighted average your{" "}
            <Link href="/" className="text-violet-soft underline">
              stock average calculator
            </Link>{" "}
            reports.
          </p>

          <h2 className="font-display text-2xl font-bold text-white">The break-even formula</h2>
          <p>
            Break-even (pre-fee) = total dollars invested ÷ total shares owned. Every new purchase
            updates both the numerator and the denominator. If the added shares are cheaper than your
            old average, break-even falls. If they are more expensive, break-even rises.
          </p>

          <h2 className="font-display text-2xl font-bold text-white">Example</h2>
          <p>
            You hold 80 shares with a $92.50 average ($7,400 invested). You buy 40 more at $80 ($3,200).
            New invested capital = $10,600. New shares = 120. New break-even = $10,600 ÷ 120 ={" "}
            <strong className="text-white">$88.33</strong>.
          </p>
          <p>
            The stock no longer needs $92.50 to get you flat — but you also put another $3,200 at risk.
            Model planned buys with the{" "}
            <Link href="/break-even-calculator" className="text-violet-soft underline">
              break-even calculator
            </Link>{" "}
            before you click buy.
          </p>

          <h2 className="font-display text-2xl font-bold text-white">Fees, taxes, and “true” flat</h2>
          <p>
            Broker commissions, spreads, and taxes mean real-world break-even sits a bit above the
            pure average. Treat the calculator output as a planning floor, then add a buffer for costs.
            For mark-to-market P/L versus that average, use the{" "}
            <Link href="/profit-loss-calculator" className="text-violet-soft underline">
              profit &amp; loss calculator
            </Link>
            .
          </p>

          <h2 className="font-display text-2xl font-bold text-white">Planning tip</h2>
          <p>
            If you have a target average in mind, solve for shares with the{" "}
            <Link href="/average-down-calculator" className="text-violet-soft underline">
              average down calculator
            </Link>
            . If you already know how many shares you will buy, use break-even to see where the
            average lands. Both answers should match the main average tool when you re-enter all lots.
          </p>
          <p>
            For strategy context beyond the math, read{" "}
            <Link href="/blog/averaging-down-stocks" className="text-violet-soft underline">
              averaging down stocks
            </Link>
            .
          </p>
        </div>

        <div className="my-10">
          <CtaButton href="/break-even-calculator" ariaLabel="Open break-even calculator">
            OPEN BREAK-EVEN CALCULATOR
          </CtaButton>
        </div>

        <h2 className="mb-4 font-display text-2xl font-bold text-white">FAQs</h2>
        <FaqSection items={faqs} />
      </article>
    </>
  );
}
