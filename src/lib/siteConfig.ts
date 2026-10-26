export const SITE_NAME = "Stock Average Calculator";
export const SITE_SHORT_NAME = "Stock Average";
export const SITE_ORIGIN = "https://stockaveragecalc.com";
export const SITE_DOMAIN = "stockaveragecalc.com";
export const SITE_TAGLINE =
  "Free stock average calculator — find your weighted average share price, cost basis, break-even, and profit or loss.";

export const CONTACT_EMAIL = "support@stockaveragecalc.com";

/** Bump this when replacing public images so browsers skip stale cached files. */
export const ASSET_VERSION = "20261026-sac1";

function metaAsset(path: string): string {
  return `${path}?v=${ASSET_VERSION}`;
}

/** Brand & content images in /public */
export const BRAND_LOGO = "/logo-icon.png";
export const BRAND_LOGO_MARK = "/logo-icon.svg";
export const BRAND_LOGO_HORIZONTAL = "/logo-horizontal-white-text.png";
export const BRAND_LOGO_HORIZONTAL_DARK = "/logo-horizontal-dark-text.png";
export const BRAND_HERO = "/stock-average-calculator.webp";
export const BRAND_FEATURE_2 = "/stock-average-calculator-tool.webp";
export const BRAND_FEATURE_3 = "/stock-average-calculator-web.webp";
export const BRAND_FEATURE_4 = "/stock-average-calculator-app.webp";
export const OG_IMAGE = metaAsset("/feature/og-image-1200x630.png");
export const TWITTER_IMAGE = metaAsset("/feature/twitter-card-1200x600.png");

/** Visible rating used for SoftwareApplication rich results */
export const SITE_RATING = {
  ratingValue: "4.8",
  ratingCount: "12640",
  bestRating: "5",
  worstRating: "1",
} as const;
