// The three info panels below the header, in tab order. The id doubles as the panel's
// element id (the header tabs' aria-controls). The selected panel is kept in FeedCard's state
// only - not in the URL hash, which the site's App.jsx reads as page navigation.
export const SECTIONS = [
  {
    id: 'what-is-feed-card',
    eyebrow: 'What is',
    title: 'FEED CARD?',
    text: 'Overview and key features',
  },
  {
    id: 'benefits',
    eyebrow: 'Benefits of',
    title: 'FEED CARD',
    text: 'Rewards, discounts and services',
  },
  {
    id: 'beneficiaries',
    eyebrow: 'Who are',
    title: 'Beneficiaries?',
    text: 'Eligible users and stakeholders',
  },
]

export const DEFAULT_SECTION = SECTIONS[0].id
