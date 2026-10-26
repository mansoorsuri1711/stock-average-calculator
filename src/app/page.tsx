import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";
import FaqSection from "@/components/FaqSection";
import StockAverageCalculator from "@/components/StockAverageCalculator";
import { WEB_APPLICATION_JSON_LD } from "@/lib/appFacts";
import { imageObjectLicensing } from "@/lib/schemaImageLicensing";
import {
  BRAND_FEATURE_2,
  BRAND_FEATURE_3,
  BRAND_FEATURE_4,
  BRAND_HERO,
  OG_IMAGE,
  SITE_NAME,
  SITE_ORIGIN,
  SITE_RATING,
} from "@/lib/siteConfig";

export const metadata: Metadata = {
  title: {
    default: "Free Stock Average Calculator — Cost Basis & Avg Price",
    template: `%s | ${SITE_NAME}`,
  },
  description:
    "Free stock average calculator to find your weighted average share price, total cost basis, break-even, and unrealized profit or loss across multiple buys.",
  alternates: { canonical: SITE_ORIGIN },
  openGraph: {
    title: "Free Stock Average Calculator — Cost Basis & Avg Price",
    description:
      "Calculate average stock price and cost basis from multiple purchases in seconds.",
    url: SITE_ORIGIN,
    siteName: SITE_NAME,
    type: "website",
    images: [
      {
        url: OG_IMAGE,
        width: 1200,
        height: 630,
        alt: "Stock Average Calculator homepage — free average share price tool",
      },
    ],
  },
};

const faqs = [
  {
    question: "What is a stock average calculator?",
    answer:
      "A stock average calculator finds your weighted average cost per share when you buy the same stock more than once. It divides total money invested by total shares owned so you know your true cost basis and break-even price.",
  },
  {
    question: "How do I calculate the average price of a stock?",
    answer:
      "Multiply each purchase price by shares bought, add those costs together, then divide by total shares. Example: 50 shares at $100 ($5,000) plus 30 shares at $80 ($2,400) = $7,400 ÷ 80 shares = $92.50 average.",
  },
  {
    question: "What is cost basis for stocks?",
    answer:
      "Cost basis is what you paid for your shares, usually expressed as the average price per share after all buys (and adjusted for some corporate actions). Brokers and tax software use it to measure capital gains or losses when you sell.",
  },
  {
    question: "What does averaging down mean?",
    answer:
      "Averaging down means buying more shares after the price falls so your blended average cost drops. It can lower the break-even price, but it also increases capital at risk if the stock keeps falling. Use our average down calculator to plan the next buy.",
  },
  {
    question: "What is the break-even price after averaging?",
    answer:
      "After multiple purchases, break-even (before fees and taxes) is your new weighted average cost. The market price must return to that average for the full position to show neither gain nor loss.",
  },
  {
    question: "Is averaging down the same as dollar-cost averaging?",
    answer:
      "No. Dollar-cost averaging invests fixed amounts on a schedule regardless of price. Averaging down is a discretionary response to a decline in a stock you already own. Read our DCA vs averaging down guide for the full comparison.",
  },
  {
    question: "Can I use this calculator for multiple stocks?",
    answer:
      "Calculate one ticker at a time. Mix purchases of the same stock in one run. Start a fresh set of rows for a different stock so averages stay accurate.",
  },
  {
    question: "Is Stock Average Calculator free?",
    answer:
      "Yes. The full tool on stockaveragecalc.com is free — no account required. It is an educational calculator, not a brokerage and not personalized investment or tax advice.",
  },
];

export default function Home() {
  const schemaData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${SITE_ORIGIN}/#website`,
        url: `${SITE_ORIGIN}/`,
        name: SITE_NAME,
        description:
          "Free stock average calculator for weighted average share price, cost basis, break-even, and P/L.",
        inLanguage: "en-US",
        publisher: { "@id": `${SITE_ORIGIN}/#organization` },
      },
      {
        "@type": "WebPage",
        "@id": `${SITE_ORIGIN}/#webpage`,
        url: `${SITE_ORIGIN}/`,
        name: "Free Stock Average Calculator — Cost Basis & Avg Price",
        isPartOf: { "@id": `${SITE_ORIGIN}/#website` },
        primaryImageOfPage: {
          "@type": "ImageObject",
          url: `${SITE_ORIGIN}${BRAND_HERO}`,
          width: 1200,
          height: 630,
          ...imageObjectLicensing,
        },
      },
      {
        ...WEB_APPLICATION_JSON_LD,
        "@id": `${SITE_ORIGIN}/#software`,
        description:
          "Web-based stock average and cost basis calculator with multi-purchase rows, break-even, and unrealized P/L.",
      },
      {
        "@type": "HowTo",
        name: "How to use the free stock average calculator",
        description: "Find your average stock price in four steps.",
        step: [
          {
            "@type": "HowToStep",
            name: "Enter the first purchase",
            text: "Type the share price and number of shares for your first buy.",
          },
          {
            "@type": "HowToStep",
            name: "Add more purchases",
            text: "Click add purchase for every later buy of the same stock at different prices.",
          },
          {
            "@type": "HowToStep",
            name: "Optional: add current price",
            text: "Enter today’s market price to see market value and unrealized profit or loss.",
          },
          {
            "@type": "HowToStep",
            name: "Read average and break-even",
            text: "Review average price, total shares, total invested, and the purchase breakdown table.",
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />

      <section id="calculator" className="relative overflow-hidden scroll-mt-16">
        <div className="pointer-events-none absolute inset-0" aria-hidden="true">
          <div className="hero-glow absolute -left-20 top-0 h-48 w-48 rounded-full bg-violet/20 blur-3xl" />
          <div
            className="hero-glow absolute -right-10 top-20 h-56 w-56 rounded-full bg-teal/15 blur-3xl"
            style={{ animationDelay: "1.5s" }}
          />
        </div>

        <div className="relative z-10 mx-auto max-w-6xl px-4 pb-8 pt-5 sm:px-6 sm:pb-12 sm:pt-8 lg:px-8">
          <h1 className="mb-2 font-display text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
            <span className="brand-gradient-text">Calculate Your Average Stock Price Instantly</span>
          </h1>
          <p className="mb-6 max-w-2xl font-display text-lg font-semibold leading-snug text-white sm:text-xl md:text-2xl">
            Weighted cost basis, break-even, and P/L from every purchase you make
          </p>

          <StockAverageCalculator showHeader={false} />

          <p className="mt-6 max-w-2xl text-base leading-relaxed text-white/80 sm:text-lg">
            Free stock average calculator for investors who buy the same ticker more than once —
            clear average price, total cost, and optional unrealized gain or loss.
          </p>

          <div className="mt-4 flex flex-wrap items-center gap-2 text-sm text-white/70 sm:gap-3">
            <span
              className="inline-flex items-center gap-1.5"
              aria-label={`Rated ${SITE_RATING.ratingValue} out of 5`}
            >
              <span className="font-semibold text-gold">{SITE_RATING.ratingValue}</span>
              <span className="tracking-tight text-gold" aria-hidden="true">
                ★★★★★
              </span>
              <span>({Number(SITE_RATING.ratingCount).toLocaleString()})</span>
            </span>
            <span className="text-white/40">·</span>
            <span>Free</span>
            <span className="text-white/40">·</span>
            <span>Web</span>
            <span className="text-white/40">·</span>
            <span>Finance tool</span>
          </div>
        </div>
      </section>

      <div className="container mx-auto max-w-6xl px-4 py-12">
        <section className="mb-16 grid gap-10 md:grid-cols-2 md:items-center">
          <div>
            <h2 className="mb-4 font-display text-2xl font-bold text-white md:text-3xl">
              Free stock average calculator for real portfolios
            </h2>
            <p className="mb-4 text-lg leading-relaxed text-white/80">
              A <strong className="text-white">stock average calculator</strong> answers one question
              every multi-buy investor asks: what did I actually pay per share? Brokers show fills;
              this tool blends them into one weighted average so you know your cost basis before you
              average up, average down, or sell.
            </p>
            <p className="mb-4 leading-relaxed text-white/75">
              Top ranking pages from MarketBeat, Groww, Omni Calculator, and Share Predictions all
              center on the same formula — total cost ÷ total shares. We match that intent and go
              further: unlimited purchase rows, optional current price for unrealized P/L, and linked
              tools for average-down planning and break-even math.
            </p>
            <p className="leading-relaxed text-white/75">
              No account. No brokerage soft-sell. Enter purchases, read the average, and keep planning
              with{" "}
              <Link href="/average-down-calculator" className="text-violet-soft underline">
                average down
              </Link>
              ,{" "}
              <Link href="/break-even-calculator" className="text-violet-soft underline">
                break-even
              </Link>
              , and{" "}
              <Link href="/profit-loss-calculator" className="text-violet-soft underline">
                profit/loss
              </Link>{" "}
              calculators when you need them.
            </p>
          </div>
          <div className="relative aspect-video overflow-hidden rounded-2xl border border-white/10">
            <Image
              src={BRAND_HERO}
              alt="Stock Average Calculator tool showing weighted average share price across purchases"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              quality={70}
              priority
              className="object-cover"
            />
          </div>
        </section>

        <section className="mb-16">
          <h2 className="mb-4 font-display text-2xl font-bold text-white md:text-3xl">
            How to calculate average stock price
          </h2>
          <p className="mb-6 max-w-3xl leading-relaxed text-white/80">
            The stock average formula is a weighted average — larger buys pull the blended price more
            than small ones.
          </p>
          <ol className="mb-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                n: "01",
                t: "List each buy",
                d: "Note share price and quantity for every purchase of the same stock.",
              },
              {
                n: "02",
                t: "Multiply to get cost",
                d: "Cost of a lot = price × shares. Add every lot for total invested.",
              },
              {
                n: "03",
                t: "Sum your shares",
                d: "Add quantities across all purchases for total shares owned.",
              },
              {
                n: "04",
                t: "Divide for average",
                d: "Average price = total cost ÷ total shares. That is also your break-even before fees.",
              },
            ].map((step) => (
              <li key={step.n} className="border-t border-violet/40 pt-4">
                <span className="font-display text-sm font-bold text-teal">{step.n}</span>
                <h3 className="mt-2 font-display text-xl font-semibold text-white">{step.t}</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/70">{step.d}</p>
              </li>
            ))}
          </ol>
          <div className="rounded-xl border border-white/10 bg-white/[0.03] p-5 sm:p-6">
            <h3 className="mb-2 font-display text-lg font-semibold text-white">
              Example: 50 shares at $100 + 30 shares at $80
            </h3>
            <p className="mb-3 leading-relaxed text-white/75">
              First buy costs $5,000. Second buy costs $2,400. Together you invested{" "}
              <strong className="text-white">$7,400</strong> for{" "}
              <strong className="text-white">80 shares</strong>. Average price ={" "}
              <strong className="text-teal">$92.50</strong>. If the stock trades at $90, you show a
              small unrealized loss; above $92.50 you are in profit before fees and taxes.
            </p>
            <p className="leading-relaxed text-white/75">
              Change the inputs in the calculator above to match your fills. Add as many purchases as
              you need — the table updates weight and cost for each lot.
            </p>
          </div>
        </section>

        <section className="mb-16 max-w-3xl">
          <h2 className="mb-4 font-display text-2xl font-bold text-white md:text-3xl">
            Average stock, share, and cost basis searches — one tool
          </h2>
          <p className="mb-4 leading-relaxed text-white/80">
            People search <strong className="text-white">average stock calculator</strong>,{" "}
            <strong className="text-white">average share calculator</strong>,{" "}
            <strong className="text-white">share average calculator</strong>,{" "}
            <strong className="text-white">average stock price calculator</strong>, and{" "}
            <strong className="text-white">stock price average calculator</strong> for the same job:
            a weighted average share price. US investors often say{" "}
            <Link href="/stock-cost-basis-calculator" className="text-violet-soft underline">
              stock cost basis calculator
            </Link>{" "}
            or cost average calculator; India and UAE traffic skews toward share-average wording.
            Calculate average share price above, then use companion tools when you need more.
          </p>
        </section>

        <section className="mb-16 max-w-3xl">
          <h2 className="mb-4 font-display text-2xl font-bold text-white md:text-3xl">
            Why investors use an average stock price calculator
          </h2>
          <ul className="space-y-4 text-white/80">
            <li>
              <h3 className="mb-1 font-display text-lg font-semibold text-white">Know true cost basis</h3>
              <p className="text-sm leading-relaxed text-white/70">
                Partial fills and drip buys scatter prices. A blended average is the number that
                matters for break-even and rough gain/loss checks.
              </p>
            </li>
            <li>
              <h3 className="mb-1 font-display text-lg font-semibold text-white">
                Plan averaging down or up
              </h3>
              <p className="text-sm leading-relaxed text-white/70">
                Before you add size, see how the next buy moves your average. Pair this page with the{" "}
                <Link href="/average-down-calculator" className="text-violet-soft underline">
                  average down calculator
                </Link>{" "}
                when you have a target cost in mind.
              </p>
            </li>
            <li>
              <h3 className="mb-1 font-display text-lg font-semibold text-white">
                Check unrealized P/L quickly
              </h3>
              <p className="text-sm leading-relaxed text-white/70">
                Optional current price shows market value versus invested capital — useful between
                brokerage app refreshes.
              </p>
            </li>
          </ul>
        </section>

        <section className="mb-16">
          <h2 className="mb-4 font-display text-2xl font-bold text-white md:text-3xl">
            Average up vs average down
          </h2>
          <div className="grid gap-6 md:grid-cols-2">
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
              <h3 className="mb-2 font-display text-xl font-semibold text-white">Averaging down</h3>
              <p className="text-sm leading-relaxed text-white/75">
                Buying more after a decline lowers your average cost and break-even. It also raises
                capital at risk if the thesis was wrong. See our{" "}
                <Link href="/blog/averaging-down-stocks" className="text-violet-soft underline">
                  averaging down guide
                </Link>{" "}
                before you size in.
              </p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
              <h3 className="mb-2 font-display text-xl font-semibold text-white">Averaging up</h3>
              <p className="text-sm leading-relaxed text-white/75">
                Buying more as price rises lifts your average but can confirm strength. Your blended
                cost still matters for risk and position sizing — run the same calculator either way.
              </p>
            </div>
          </div>
        </section>

        <section className="mb-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {[
            {
              href: "/stock-cost-basis-calculator",
              title: "Cost basis calculator",
              text: "Average cost basis per share for tax and break-even planning.",
              img: BRAND_FEATURE_4,
              alt: "Stock cost basis calculator for average cost per share",
            },
            {
              href: "/average-down-calculator",
              title: "Average down calculator",
              text: "Find how many shares to buy at today’s price to hit a target average.",
              img: BRAND_FEATURE_2,
              alt: "Average down stock calculator planning next purchase",
            },
            {
              href: "/break-even-calculator",
              title: "Break-even calculator",
              text: "See the new break-even average after a planned add-on buy.",
              img: BRAND_FEATURE_3,
              alt: "Break-even price calculator after averaging stock purchases",
            },
            {
              href: "/profit-loss-calculator",
              title: "Profit & loss calculator",
              text: "Compare total cost to current market value for unrealized P/L.",
              img: BRAND_FEATURE_2,
              alt: "Stock profit and loss calculator with current market price",
            },
          ].map((card) => (
            <Link
              key={card.href}
              href={card.href}
              className="group overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] transition hover:border-violet/40"
            >
              <div className="relative aspect-video">
                <Image
                  src={card.img}
                  alt={card.alt}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover"
                />
              </div>
              <div className="p-5">
                <h3 className="font-display text-lg font-semibold text-white group-hover:text-violet-soft">
                  {card.title}
                </h3>
                <p className="mt-2 text-sm text-white/70">{card.text}</p>
              </div>
            </Link>
          ))}
        </section>

        <section className="mb-8">
          <h2 className="mb-6 font-display text-2xl font-bold text-white md:text-3xl">
            Stock average calculator FAQs
          </h2>
          <FaqSection items={faqs} includeSchema={false} />
        </section>

        <section className="rounded-2xl border border-violet/30 bg-gradient-to-br from-violet/15 to-transparent p-8 text-center">
          <h2 className="mb-3 font-display text-2xl font-bold text-white">
            Ready to check your average?
          </h2>
          <p className="mx-auto mb-6 max-w-xl text-white/75">
            Scroll up, add your purchases, and get a clear cost basis in seconds on{" "}
            {SITE_NAME}.
          </p>
          <Link
            href="/#calculator"
            className="inline-flex rounded-xl bg-gradient-to-r from-violet to-teal px-6 py-3 text-sm font-bold text-brand-deep"
          >
            Open calculator
          </Link>
        </section>
      </div>
    </>
  );
}
