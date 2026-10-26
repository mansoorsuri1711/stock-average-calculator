import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";
import { BRAND_LOGO, CONTACT_EMAIL, OG_IMAGE, SITE_DOMAIN, SITE_NAME, SITE_ORIGIN } from "@/lib/siteConfig";

export const metadata: Metadata = {
  title: "About Us — Stock Average Calculator",
  description:
    "About Stock Average Calculator on stockaveragecalc.com: a free educational tool for weighted average share price, cost basis, and break-even planning.",
  alternates: { canonical: `${SITE_ORIGIN}/about-us` },
  openGraph: {
    title: "About Us — Stock Average Calculator",
    description: "Who we are and why we built a focused stock average calculator.",
    url: `${SITE_ORIGIN}/about-us`,
    siteName: SITE_NAME,
    type: "website",
    images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: "About Stock Average Calculator" }],
  },
};

export default function AboutPage() {
  return (
    <>
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "About Us", href: "/about-us" }]} />
      <div className="container mx-auto max-w-3xl px-4 pb-12 pt-6">
        <div className="mb-8 flex items-center gap-4">
          <div className="relative h-16 w-16 overflow-hidden rounded-xl border border-white/10">
            <Image src={BRAND_LOGO} alt="Stock Average Calculator logo" fill sizes="64px" className="object-contain p-1" />
          </div>
          <div>
            <h1 className="font-display text-3xl font-bold text-white">About {SITE_NAME}</h1>
            <p className="text-sm text-white/55">{SITE_DOMAIN}</p>
          </div>
        </div>
        <div className="space-y-5 text-base leading-relaxed text-white/80">
          <p>
            {SITE_NAME} is a free web tool that helps investors find their weighted average share
            price when they buy the same stock more than once. We built it because most people need a
            clear cost basis and break-even number — not another brokerage marketing page.
          </p>
          <p>
            The site focuses on one job: accurate average-cost math, plus companion tools for
            averaging down, break-even planning, and unrealized profit or loss. Educational articles
            cover strategies people actually search for alongside the calculator.
          </p>
          <p>
            We do not execute trades, hold funds, or give personalized investment advice. Numbers are
            estimates before fees and taxes. For questions, email{" "}
            <a href={`mailto:${CONTACT_EMAIL}`} className="text-violet-soft underline">
              {CONTACT_EMAIL}
            </a>{" "}
            or use our{" "}
            <Link href="/contact-us" className="text-violet-soft underline">
              contact form
            </Link>
            .
          </p>
        </div>
      </div>
    </>
  );
}
