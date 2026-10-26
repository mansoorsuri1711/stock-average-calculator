import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";
import BlogPostSchema from "@/components/BlogPostSchema";
import FaqSection from "@/components/FaqSection";
import CtaButton from "@/components/CtaButton";
import { BRAND_FEATURE_3, OG_IMAGE, SITE_NAME, SITE_ORIGIN } from "@/lib/siteConfig";

const TITLE = "Dollar-Cost Averaging vs Averaging Down";
const DESC =
  "Compare dollar-cost averaging and averaging down: how each changes your average stock price, when investors use them, and how to check the math.";
const SLUG = "dca-vs-averaging-down";
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
    question: "What is the difference between DCA and averaging down?",
    answer:
      "Dollar-cost averaging invests fixed amounts on a schedule. Averaging down is buying extra shares after a decline in a position you already own to lower the blended average.",
  },
  {
    question: "Do both lower my average cost?",
    answer:
      "DCA can raise or lower your average depending on whether later buys are cheaper or more expensive. Averaging down specifically aims to lower the average by buying after a drop.",
  },
];

export default function DcaVsAvgDownPage() {
  return (
    <>
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Blog", href: "/blog" },
          { label: "DCA vs Averaging Down", href: `/blog/${SLUG}` },
        ]}
      />
      <article className="container mx-auto max-w-3xl px-4 pb-10 pt-8">
        <BlogPostSchema
          title={TITLE}
          description={DESC}
          slug={SLUG}
          datePublished={DATE}
          image={`${SITE_ORIGIN}${BRAND_FEATURE_3}`}
        />
        <h1 className="mb-4 font-display text-3xl font-bold text-white md:text-4xl">{TITLE}</h1>
        <p className="mb-6 text-sm text-white/50">Updated October 26, 2026 · 8 min read</p>

        <div className="relative mb-8 aspect-video overflow-hidden rounded-2xl border border-white/10">
          <Image
            src={BRAND_FEATURE_3}
            alt="Comparison of dollar-cost averaging schedule versus averaging down after a price drop"
            fill
            sizes="(max-width: 768px) 100vw, 768px"
            className="object-cover"
            priority
          />
        </div>

        <div className="space-y-6 text-base leading-relaxed text-white/85">
          <p>
            Searchers who land on a stock average tool often ask whether they are dollar-cost
            averaging or averaging down. The labels sound similar; the decisions are not. {SITE_NAME}{" "}
            helps with the shared math — your weighted average — while this guide separates the
            strategies.
          </p>

          <h2 className="font-display text-2xl font-bold text-white">Dollar-cost averaging (DCA)</h2>
          <p>
            DCA means investing a fixed dollar amount at regular intervals — weekly, monthly, or each
            payday — regardless of price. Some buys occur higher, some lower. Over time you own more
            shares when prices were cheap and fewer when prices were expensive, without trying to time
            a bottom.
          </p>
          <p>
            Your average cost is still a weighted average of every purchase. Track it anytime with the{" "}
            <Link href="/" className="text-violet-soft underline">
              stock average calculator
            </Link>
            .
          </p>

          <h2 className="font-display text-2xl font-bold text-white">Averaging down</h2>
          <p>
            Averaging down is reactive: the stock you already own drops, and you choose to buy more so
            the blended cost falls. It concentrates risk in a single name and requires conviction that
            the thesis still holds. See{" "}
            <Link href="/blog/averaging-down-stocks" className="text-violet-soft underline">
              averaging down stocks
            </Link>{" "}
            for pros, cons, and examples.
          </p>

          <h2 className="font-display text-2xl font-bold text-white">Side-by-side</h2>
          <div className="overflow-x-auto rounded-xl border border-white/10">
            <table className="min-w-full text-left text-sm">
              <thead className="bg-white/[0.04] text-white/60">
                <tr>
                  <th className="px-3 py-2">Factor</th>
                  <th className="px-3 py-2">DCA</th>
                  <th className="px-3 py-2">Averaging down</th>
                </tr>
              </thead>
              <tbody className="text-white/80">
                <tr className="border-t border-white/10">
                  <td className="px-3 py-2">Trigger</td>
                  <td className="px-3 py-2">Calendar / paycheck</td>
                  <td className="px-3 py-2">Price decline</td>
                </tr>
                <tr className="border-t border-white/10">
                  <td className="px-3 py-2">Goal</td>
                  <td className="px-3 py-2">Remove timing stress</td>
                  <td className="px-3 py-2">Lower break-even on a held stock</td>
                </tr>
                <tr className="border-t border-white/10">
                  <td className="px-3 py-2">Risk shape</td>
                  <td className="px-3 py-2">Spread over time</td>
                  <td className="px-3 py-2">Adds size to one position</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h2 className="font-display text-2xl font-bold text-white">Which fits which investor?</h2>
          <p>
            Long-term savers funding broad index or diversified holdings often prefer DCA for
            discipline. Concentrated stock pickers who believe a sell-off is temporary may consider
            averaging down — after checking capital needs with an{" "}
            <Link href="/average-down-calculator" className="text-violet-soft underline">
              average down calculator
            </Link>{" "}
            and break-even with our{" "}
            <Link href="/break-even-calculator" className="text-violet-soft underline">
              break-even tool
            </Link>
            .
          </p>
          <p>
            Neither approach removes market risk. Both change your average cost over time — which is
            why measuring that average clearly matters before either habit becomes automatic.
          </p>
        </div>

        <div className="my-10">
          <CtaButton href="/#calculator" ariaLabel="Open stock average calculator">
            CHECK YOUR AVERAGE PRICE
          </CtaButton>
        </div>

        <h2 className="mb-4 font-display text-2xl font-bold text-white">FAQs</h2>
        <FaqSection items={faqs} />
      </article>
    </>
  );
}
