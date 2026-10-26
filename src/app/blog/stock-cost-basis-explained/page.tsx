import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";
import BlogPostSchema from "@/components/BlogPostSchema";
import FaqSection from "@/components/FaqSection";
import CtaButton from "@/components/CtaButton";
import { BRAND_FEATURE_4, OG_IMAGE, SITE_NAME, SITE_ORIGIN } from "@/lib/siteConfig";

const TITLE = "Stock Cost Basis Explained for Investors";
const DESC =
  "Learn what stock cost basis means, how average cost relates to gains and losses, and how a stock average calculator helps you track it.";
const SLUG = "stock-cost-basis-explained";
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
    question: "What is cost basis for stocks?",
    answer:
      "Cost basis is generally what you paid for your shares, including some purchase costs. For multiple buys, many investors track an average cost per share as a practical cost basis figure.",
  },
  {
    question: "Is average price the same as cost basis?",
    answer:
      "Average purchase price is the most common everyday expression of cost basis for a single ticker held in one account. Brokers may also support specific identification or other tax lot methods when you sell.",
  },
  {
    question: "Why does cost basis matter?",
    answer:
      "It determines taxable gain or loss when you sell and helps you judge unrealized profit or loss while you still hold the shares.",
  },
];

export default function CostBasisBlogPage() {
  return (
    <>
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Blog", href: "/blog" },
          { label: "Cost Basis Explained", href: `/blog/${SLUG}` },
        ]}
      />
      <article className="container mx-auto max-w-3xl px-4 pb-10 pt-8">
        <BlogPostSchema
          title={TITLE}
          description={DESC}
          slug={SLUG}
          datePublished={DATE}
          image={`${SITE_ORIGIN}${BRAND_FEATURE_4}`}
        />
        <h1 className="mb-4 font-display text-3xl font-bold text-white md:text-4xl">{TITLE}</h1>
        <p className="mb-6 text-sm text-white/50">Updated October 26, 2026 · 8 min read</p>

        <div className="relative mb-8 aspect-video overflow-hidden rounded-2xl border border-white/10">
          <Image
            src={BRAND_FEATURE_4}
            alt="Illustration explaining stock cost basis and average purchase price"
            fill
            sizes="(max-width: 768px) 100vw, 768px"
            className="object-cover"
            priority
          />
        </div>

        <div className="space-y-6 text-base leading-relaxed text-white/85">
          <p>
            Cost basis shows up whenever investors talk about average stock price, capital gains, or
            break-even. {SITE_NAME} exists to make the everyday average-cost version of that number
            easy to compute — without claiming to replace your broker’s official tax lots.
          </p>

          <h2 className="font-display text-2xl font-bold text-white">Cost basis in plain English</h2>
          <p>
            Cost basis is what you paid to acquire an investment. For a single buy, it is usually the
            share price (plus commissions in some tax systems). For many buys of the same stock, people
            track a weighted average: total invested ÷ total shares. That average is the figure our{" "}
            <Link href="/" className="text-violet-soft underline">
              stock average calculator
            </Link>{" "}
            returns.
          </p>

          <h2 className="font-display text-2xl font-bold text-white">How average cost is calculated</h2>
          <p>
            Multiply each purchase price by shares, add the costs, add the shares, then divide. Larger
            lots influence the average more than small ones. Optional current price then shows
            unrealized gain or loss versus that basis — also available on the{" "}
            <Link href="/profit-loss-calculator" className="text-violet-soft underline">
              profit &amp; loss calculator
            </Link>
            .
          </p>

          <h2 className="font-display text-2xl font-bold text-white">Why investors track it</h2>
          <ul className="list-disc space-y-2 pl-5 text-white/80">
            <li>Estimate unrealized P/L while shares are still held.</li>
            <li>Know an approximate break-even before adding size or trimming.</li>
            <li>Prepare questions for tax software or a CPA when selling (methods can differ).</li>
          </ul>

          <h2 className="font-display text-2xl font-bold text-white">Average cost vs tax lot methods</h2>
          <p>
            Brokers may let you sell specific lots (for example highest-cost shares first) instead of
            using a single average. Those choices affect reported gains. This site’s calculators teach
            and compute weighted average cost for planning — they are not a substitute for official
            1099-B figures or tax advice.
          </p>

          <h2 className="font-display text-2xl font-bold text-white">Connect the tools</h2>
          <p>
            Start with average cost on the homepage. If you plan to buy more after a decline, use{" "}
            <Link href="/average-down-calculator" className="text-violet-soft underline">
              average down
            </Link>{" "}
            and{" "}
            <Link href="/break-even-calculator" className="text-violet-soft underline">
              break-even
            </Link>{" "}
            planning. Strategy context lives in{" "}
            <Link href="/blog/averaging-down-stocks" className="text-violet-soft underline">
              averaging down stocks
            </Link>
            .
          </p>
        </div>

        <div className="my-10">
          <CtaButton
            href="/stock-cost-basis-calculator"
            ariaLabel="Open stock cost basis calculator"
          >
            CALCULATE YOUR COST BASIS
          </CtaButton>
        </div>

        <h2 className="mb-4 font-display text-2xl font-bold text-white">FAQs</h2>
        <FaqSection items={faqs} />
      </article>
    </>
  );
}
