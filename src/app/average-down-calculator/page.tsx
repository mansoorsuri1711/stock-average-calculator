import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";
import AverageDownCalculator from "@/components/AverageDownCalculator";
import Breadcrumbs from "@/components/Breadcrumbs";
import FaqSection from "@/components/FaqSection";
import { BRAND_FEATURE_2, OG_IMAGE, SITE_NAME, SITE_ORIGIN } from "@/lib/siteConfig";

export const metadata: Metadata = {
  title: "Average Down Stock Calculator — Hit a Target Average",
  description:
    "Free average down stock calculator: enter current shares, average price, and buy price to see how many shares you need to reach a target average cost.",
  alternates: { canonical: `${SITE_ORIGIN}/average-down-calculator` },
  openGraph: {
    title: "Average Down Stock Calculator — Hit a Target Average",
    description: "Plan the next buy so your blended stock average hits a target price.",
    url: `${SITE_ORIGIN}/average-down-calculator`,
    siteName: SITE_NAME,
    type: "website",
    images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: "Average down stock calculator" }],
  },
};

const faqs = [
  {
    question: "How does an average down calculator work?",
    answer:
      "It solves for how many shares to buy at a lower price so your new weighted average equals a target you set. Buy price must stay below the target average for a solution to exist.",
  },
  {
    question: "Does averaging down guarantee a profit?",
    answer:
      "No. It only lowers your break-even. The stock still has to recover, and adding size increases capital at risk if the decline continues.",
  },
];

export default function AverageDownPage() {
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
            name: "Average Down Stock Calculator",
            item: `${SITE_ORIGIN}/average-down-calculator`,
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
          { label: "Average Down Stock Calculator", href: "/average-down-calculator" },
        ]}
      />
      <div className="container mx-auto max-w-6xl px-4 pb-12 pt-6">
        <h1 className="mb-2 font-display text-3xl font-bold text-white md:text-4xl">
          Average down stock calculator
        </h1>
        <p className="mb-8 max-w-2xl text-lg text-white/75">
          Find how many shares to buy at a lower price to reach a target average cost — then confirm
          with the{" "}
          <Link href="/" className="text-violet-soft underline">
            stock average calculator
          </Link>
          .
        </p>
        <AverageDownCalculator />
        <div className="mt-12 grid gap-8 md:grid-cols-2 md:items-center">
          <div>
            <h2 className="mb-3 font-display text-2xl font-bold text-white">
              When to use this tool
            </h2>
            <p className="leading-relaxed text-white/75">
              Use it after a decline when you still believe in the position and want a concrete share
              count — not a guess. Pair results with our{" "}
              <Link href="/blog/averaging-down-stocks" className="text-violet-soft underline">
                averaging down guide
              </Link>{" "}
              and{" "}
              <Link href="/break-even-calculator" className="text-violet-soft underline">
                break-even calculator
              </Link>
              .
            </p>
          </div>
          <div className="relative aspect-video overflow-hidden rounded-2xl border border-white/10">
            <Image
              src={BRAND_FEATURE_2}
              alt="Average down calculator planning shares needed for a target average"
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
