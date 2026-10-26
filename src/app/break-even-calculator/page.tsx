import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";
import BreakEvenCalculator from "@/components/BreakEvenCalculator";
import Breadcrumbs from "@/components/Breadcrumbs";
import FaqSection from "@/components/FaqSection";
import { BRAND_FEATURE_3, OG_IMAGE, SITE_NAME, SITE_ORIGIN } from "@/lib/siteConfig";

export const metadata: Metadata = {
  title: "Break-Even Calculator — New Average After Buying More",
  description:
    "Free stock break-even calculator: see how a planned purchase changes your weighted average and break-even price.",
  alternates: { canonical: `${SITE_ORIGIN}/break-even-calculator` },
  openGraph: {
    title: "Break-Even Calculator — New Average After Buying More",
    description: "Model your new break-even average after adding shares.",
    url: `${SITE_ORIGIN}/break-even-calculator`,
    siteName: SITE_NAME,
    type: "website",
    images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: "Stock break-even calculator" }],
  },
};

const faqs = [
  {
    question: "What is break-even after averaging down?",
    answer:
      "It is your new weighted average cost. Before fees and taxes, the market price must return to that average for the full position to show neither gain nor loss.",
  },
  {
    question: "How is this different from the average down calculator?",
    answer:
      "Average down solves for shares needed to hit a target average. Break-even starts from a share count you choose and shows the resulting new average.",
  },
];

export default function BreakEvenPage() {
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
            name: "Break-Even Calculator",
            item: `${SITE_ORIGIN}/break-even-calculator`,
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
          { label: "Break-Even Calculator", href: "/break-even-calculator" },
        ]}
      />
      <div className="container mx-auto max-w-6xl px-4 pb-12 pt-6">
        <h1 className="mb-2 font-display text-3xl font-bold text-white md:text-4xl">
          Stock break-even calculator
        </h1>
        <p className="mb-8 max-w-2xl text-lg text-white/75">
          Enter your current average and a planned buy to see the new break-even price. Deep dive:{" "}
          <Link href="/blog/break-even-after-averaging-down" className="text-violet-soft underline">
            break-even after averaging down
          </Link>
          .
        </p>
        <BreakEvenCalculator />
        <div className="mt-12 grid gap-8 md:grid-cols-2 md:items-center">
          <div className="relative aspect-video overflow-hidden rounded-2xl border border-white/10">
            <Image
              src={BRAND_FEATURE_3}
              alt="Break-even calculator showing new average after buying more shares"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
          <div>
            <h2 className="mb-3 font-display text-2xl font-bold text-white">
              Why break-even matters
            </h2>
            <p className="leading-relaxed text-white/75">
              Averaging changes the price you need for a flat exit. Run numbers here before you
              commit capital, then verify the full position on the{" "}
              <Link href="/" className="text-violet-soft underline">
                stock average calculator
              </Link>
              .
            </p>
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
