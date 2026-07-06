/** @typedef {{ name: string; rating: number; text: string; relativeTime?: string; location?: string; photoUrl?: string; source: 'static' }} NormalizedReview */

/** @typedef {{ reviews: NormalizedReview[]; source: 'static' }} ReviewsPayload */

/**
 * Curated customer reviews (i18n-backed).
 * @param {import('@/i18n/LocaleProvider').TranslateFn} t
 * @returns {ReviewsPayload}
 */
export function getStaticReviews(t) {
  return {
    source: 'static',
    reviews: [
      { name: 'Sarah M.', location: t('home.reviews.review1Location'), rating: 5, text: t('home.reviews.review1Text'), source: 'static' },
      { name: 'James T.', location: t('home.reviews.review2Location'), rating: 5, text: t('home.reviews.review2Text'), source: 'static' },
      { name: 'Lisa K.', location: t('home.reviews.review3Location'), rating: 5, text: t('home.reviews.review3Text'), source: 'static' },
      { name: 'Omar Mohammed', location: t('home.reviews.review4Location'), rating: 5, text: t('home.reviews.review4Text'), source: 'static' },
    ],
  }
}
