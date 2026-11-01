import farmerImg from '../assets/home/farmer.webp'
import fpoImg from '../assets/home/fpo.webp'
import msmeImg from '../assets/home/msme.webp'
import shgImg from '../assets/home/shg.webp'
import exporterImg from '../assets/home/exporter.webp'

// Cards in the home page's "Explore all tools" row.
//
// Each card:
//   id          - also the anchor a link can jump to (#farmer, #fpo, ...)
//   title       - the card heading
//   description - the short line under it
//   icon        - which illustration to show (see USER_TYPE_ICONS in components/UserTypeIcons.jsx);
//                 or give `image` (an imported picture) and `imageAlt` instead
//   accent      - colour of the number, arrow and links
//   tint        - soft background colour of the card corner, number and arrow circles
//   to          - the page the card opens when clicked (leave out until that page exists)
//
// To add a card, add another entry: up to six share one row, and more wrap onto new rows.
export const CATEGORY_CARDS = [
  {
    id: 'farmer',
    title: 'Farmer',
    description: 'Tools, schemes and resources for individual farmers.',
    image: farmerImg,
    imageAlt: 'A smiling farmer in a green turban beside ears of wheat',
    accent: '#2f8a4f',
    tint: '#e3f5e9',
    to: '/farmer',
  },
  {
    id: 'fpo',
    title: 'FPO',
    description: 'Solutions for Farmer Producer Organisations.',
    image: fpoImg,
    imageAlt: 'Farmers of a producer organisation with paddy and a basket of vegetables',
    accent: '#e57a2c',
    tint: '#fdeee2',
    to: '/fpo',
  },
  {
    id: 'msme',
    title: 'MSME',
    description: 'Support for agri-based micro, small and medium enterprises.',
    image: msmeImg,
    imageAlt: 'A small workshop with a striped awning and a gear',
    accent: '#2563eb',
    tint: '#e2eefc',
    to: '/msme',
  },
  {
    id: 'shg',
    title: 'SHG',
    description: 'Resources for Self Help Groups and rural collectives.',
    image: shgImg,
    imageAlt: 'Three women of a self help group making pickles together',
    accent: '#9333ea',
    tint: '#f2e7fd',
    to: '/shg',
  },
  {
    id: 'exporter',
    title: 'Exporter',
    description: 'Information and tools for agri exporters.',
    image: exporterImg,
    imageAlt: 'A cargo ship loaded with containers',
    accent: '#d4900f',
    tint: '#fbf0d6',
    to: '/exporter',
  },
]
