import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";
import {
  BRAND_FEATURE_2,
  BRAND_FEATURE_3,
  BRAND_FEATURE_4,
  BRAND_HERO,
  SITE_NAME,
  SITE_ORIGIN,
} from "@/lib/siteConfig";

export const metadata: Metadata = {
  title: "Stock Average Blog — Averaging Down, DCA & Cost Basis",
  description:
    "SERP-backed guides: averaging down stocks, DCA vs averaging down, break-even after averaging, and stock cost basis explained.",
  alternates: { canonical: `${SITE_ORIGIN}/blog` },
  openGraph: {
    title: "Stock Average Blog — Averaging Down, DCA & Cost Basis",
    description: `Practical stock average articles from ${SITE_NAME}.`,
    url: `${SITE_ORIGIN}/blog`,
    siteName: SITE_NAME,
    type: "website",
  },
};

const posts = [
  {
    href: "/blog/averaging-down-stocks",
    title: "Averaging Down Stocks: Meaning, Pros, Cons & Examples",
    excerpt:
      "What averaging down means, how it changes your average cost, and the risks before you buy more.",
    date: "October 2026",
    read: "9 min read",
    image: BRAND_HERO,
    alt: "Averaging down stocks strategy overview",
  },
  {
    href: "/blog/dca-vs-averaging-down",
    title: "Dollar-Cost Averaging vs Averaging Down",
    excerpt:
      "Scheduled investing versus buying the dip on a stock you already own — when each approach fits.",
    date: "October 2026",
    read: "8 min read",
    image: BRAND_FEATURE_3,
    alt: "Comparing dollar-cost averaging and averaging down",
  },
  {
    href: "/blog/break-even-after-averaging-down",
    title: "Break-Even Price After Averaging Down",
    excerpt:
      "How your break-even changes when you add shares, with a clear worked example.",
    date: "October 2026",
    read: "7 min read",
    image: BRAND_FEATURE_2,
    alt: "Break-even price after averaging down explanation",
  },
  {
    href: "/blog/stock-cost-basis-explained",
    title: "Stock Cost Basis Explained for Investors",
    excerpt:
      "What cost basis is, how average cost relates, and why it matters for gains and taxes.",
    date: "October 2026",
    read: "8 min read",
    image: BRAND_FEATURE_4,
    alt: "Stock cost basis explained for investors",
  },
];

export default function BlogPage() {
  return (
    <>
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Blog", href: "/blog" }]} />
      <div className="container mx-auto max-w-5xl px-4 pb-10 pt-8">
        <h1 className="mb-3 font-display text-3xl font-bold text-white md:text-4xl">
          Stock average calculator blog
        </h1>
        <p className="mb-10 text-lg text-white/80">
          Only topics people search alongside a stock average calculator — averaging down, DCA
          comparisons, break-even, and cost basis. No filler posts.
        </p>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {posts.map((post) => (
            <Link
              key={post.href}
              href={post.href}
              className="group block overflow-hidden border border-white/10 bg-white/5 transition-colors hover:border-violet/50 hover:bg-white/[0.07] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet"
            >
              <article>
                <div className="relative aspect-video">
                  <Image
                    src={post.image}
                    alt={post.alt}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <h2 className="mb-3 font-display text-xl font-bold text-white group-hover:text-violet-soft">
                    {post.title}
                  </h2>
                  <p className="mb-4 text-white/75">{post.excerpt}</p>
                  <div className="mb-4 flex items-center gap-2 text-sm text-white/55">
                    <span>{post.date}</span>
                    <span>•</span>
                    <span>{post.read}</span>
                  </div>
                  <span className="font-semibold text-violet-soft group-hover:underline">
                    Read more →
                  </span>
                </div>
              </article>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
