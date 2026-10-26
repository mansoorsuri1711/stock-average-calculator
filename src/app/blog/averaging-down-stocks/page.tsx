import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";
import BlogPostSchema from "@/components/BlogPostSchema";
import FaqSection from "@/components/FaqSection";
import CtaButton from "@/components/CtaButton";
import { BRAND_HERO, OG_IMAGE, SITE_NAME, SITE_ORIGIN } from "@/lib/siteConfig";

const TITLE = "Averaging Down Stocks: Meaning, Pros, Cons & Examples";
const DESC =
  "Learn what averaging down means, how it lowers your average cost and break-even, with a worked example plus risks to weigh before you buy more.";
const SLUG = "averaging-down-stocks";
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
    question: "What does averaging down mean in stocks?",
    answer:
      "Averaging down means buying more shares of a stock you already own after its price has fallen, so your blended average purchase price decreases.",
  },
  {
    question: "Is averaging down a good strategy?",
    answer:
      "It can make sense when your long-term thesis is intact and you can afford more risk. It is dangerous when you are doubling down on a broken thesis or using money you cannot lose.",
  },
  {
    question: "How do I calculate my new average after averaging down?",
    answer:
      "Add total dollars invested across all buys and divide by total shares. Or use the free stock average calculator on this site to do it instantly.",
  },
];

export default function AveragingDownPage() {
  return (
    <>
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Blog", href: "/blog" },
          { label: "Averaging Down Stocks", href: `/blog/${SLUG}` },
        ]}
      />
      <article className="container mx-auto max-w-3xl px-4 pb-10 pt-8">
        <BlogPostSchema
          title={TITLE}
          description={DESC}
          slug={SLUG}
          datePublished={DATE}
          image={`${SITE_ORIGIN}${BRAND_HERO}`}
        />
        <h1 className="mb-4 font-display text-3xl font-bold text-white md:text-4xl">{TITLE}</h1>
        <p className="mb-6 text-sm text-white/50">Updated October 26, 2026 · 9 min read</p>

        <div className="relative mb-8 aspect-video overflow-hidden rounded-2xl border border-white/10">
          <Image
            src={BRAND_HERO}
            alt="Illustration of averaging down on a stock by buying more shares at a lower price"
            fill
            sizes="(max-width: 768px) 100vw, 768px"
            className="object-cover"
            priority
          />
        </div>

        <div className="space-y-6 text-base leading-relaxed text-white/85">
          <p>
            Averaging down is one of the most searched ideas next to a{" "}
            <Link href="/" className="text-violet-soft underline">
              stock average calculator
            </Link>
            . Investors want to know whether buying more after a drop will help — and what it does to
            their true cost per share.
          </p>

          <h2 className="font-display text-2xl font-bold text-white">What averaging down means</h2>
          <p>
            Averaging down means purchasing additional shares of a stock you already hold after the
            market price has declined. Because the new shares cost less than your earlier buys, the
            weighted average cost of the whole position falls. Your break-even price before fees also
            moves lower.
          </p>
          <p>
            The tactic is not the same as dollar-cost averaging. DCA invests on a schedule whether
            price is up or down. Averaging down is a discretionary response to a decline. Compare both
            in our{" "}
            <Link href="/blog/dca-vs-averaging-down" className="text-violet-soft underline">
              DCA vs averaging down
            </Link>{" "}
            guide.
          </p>

          <h2 className="font-display text-2xl font-bold text-white">Worked example</h2>
          <p>
            Suppose you own 100 shares bought at $50 ($5,000 invested). The stock falls to $40 and you
            buy 100 more shares ($4,000). You now own 200 shares for $9,000. Average price = $9,000 ÷
            200 = <strong className="text-white">$45</strong>.
          </p>
          <p>
            Before the second buy, the stock had to climb back to $50 for a flat exit. After averaging
            down, break-even is $45 — still not a guaranteed win, but a clearer target. Run your own
            numbers with the{" "}
            <Link href="/average-down-calculator" className="text-violet-soft underline">
              average down calculator
            </Link>{" "}
            or the{" "}
            <Link href="/break-even-calculator" className="text-violet-soft underline">
              break-even calculator
            </Link>
            .
          </p>

          <h2 className="font-display text-2xl font-bold text-white">Potential benefits</h2>
          <ul className="list-disc space-y-2 pl-5 text-white/80">
            <li>Lower average cost and break-even if the recovery thesis is correct.</li>
            <li>Ability to size into a high-conviction name at better levels.</li>
            <li>Clarity when you measure the new average before committing capital.</li>
          </ul>

          <h2 className="font-display text-2xl font-bold text-white">Risks to respect</h2>
          <ul className="list-disc space-y-2 pl-5 text-white/80">
            <li>More capital is at risk if the decline continues.</li>
            <li>Emotional doubling-down can ignore a broken business thesis.</li>
            <li>Concentration risk rises when one ticker becomes a larger share of your portfolio.</li>
          </ul>

          <h2 className="font-display text-2xl font-bold text-white">When investors consider it</h2>
          <p>
            Thoughtful investors usually require a thesis check first: Has the story changed, or only
            the price? Can you afford the extra cash without threatening other goals? Have you modeled
            the new average and the capital required? If those answers are unclear, averaging down is
            often postponed — not forced.
          </p>

          <h2 className="font-display text-2xl font-bold text-white">How to check the math fast</h2>
          <p>
            List every purchase (price × shares), sum costs, sum shares, and divide. That weighted
            average is your cost basis for planning. {SITE_NAME} automates the arithmetic so you can
            focus on whether adding size still fits your risk limits.
          </p>
        </div>

        <div className="my-10">
          <CtaButton href="/#calculator" ariaLabel="Open stock average calculator">
            OPEN STOCK AVERAGE CALCULATOR
          </CtaButton>
        </div>

        <h2 className="mb-4 font-display text-2xl font-bold text-white">FAQs</h2>
        <FaqSection items={faqs} />
      </article>
    </>
  );
}
