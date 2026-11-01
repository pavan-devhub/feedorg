// The cards on the Exporter Calculators page, in the order they appear (left to right).
//
// Each card:
//   id           - unique key
//   label        - the small heading at the top of the card, e.g. 'Exporter tools'
//   title        - the card's title
//   tools        - (optional) a short line under the title, e.g. which tools it covers
//   description  - the text under that
//   illustration - which picture to show (see EXPORTER_ILLUSTRATIONS in
//                  components/ExporterIcons.jsx)
//   href         - the website "View Details" opens, in a new tab
//
// To add a card, add another entry: cards sit side by side in the middle of the page, all the
// same size, and wrap onto a new row when there are more than fit.
export const EXPORTER_TOOLS = [
  {
    id: 'all-export-calculators',
    label: 'Exporter tools',
    title: 'All Export Calculators',
    tools: '(51 tools — DBK, RoDTEP, EPCG, IES)',
    description: 'Duty, incentives, export obligations — all here.',
    illustration: 'export-calculators',
    href: 'https://bharattrades.net/tools/',
  },
]
