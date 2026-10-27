/**
 * HD artwork — full-resolution PNGs served as-is from public/images (not processed by the bundler).
 * Every image on the page comes from this list.
 */

const dir = `${import.meta.env.BASE_URL}images/`

/** Hero photo on the right of the first screen. */
export const heroImage = {
  src: `${dir}hero-farm-to-global-market.png`,
  width: 1536,
  height: 1024,
}

/** Learning Path cards, keyed by phase id. */
export const phaseCardImages = {
  1: `${dir}program-phase-1-foundations.png`,
  2: `${dir}program-phase-2-readiness.png`,
  3: `${dir}program-phase-3-documents.png`,
  4: `${dir}phase-4-payments-protection.png`,
}

/** Banner behind the "Export Program" heading. */
export const programBannerImage = {
  src: `${dir}program-banner-global-trade.png`,
  width: 2170,
  height: 725,
}

/** Learner-at-laptop illustration in the closing "Ready to make your first shipment?" card. */
export const ctaIllustration = {
  src: `${dir}cta-learning-journey.png`,
  width: 710,
  height: 503,
}

/** Art in each Export Program phase column; Phase 4 shares its Learning Path card image. */
export const programPhaseImages = {
  1: `${dir}phase-1-export-foundations.png`,
  2: `${dir}phase-2-market-readiness.png`,
  3: `${dir}phase-3-documents-delivery.png`,
  4: phaseCardImages[4],
}
