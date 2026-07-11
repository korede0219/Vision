/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Product } from './types';

// Curated pool of high-quality Unsplash interior/furniture photo IDs (100% free under the Unsplash Open License)
const PHOTO_POOL = {
  sofa: [
    'photo-1555041469-a586c61ea9bc', // green velvet
    'photo-1493663284031-b7e3aefcae8e', // gray minimal
    'photo-1484101403633-562f891dc89a', // beige cozy
    'photo-1502672260266-1c1ef2d93688', // modern loft sofa
    'photo-1501183007986-d0d080b147f9', // white linen cream
    'photo-1586023492125-27b2c045efd7', // minimal warm room accent chair/sofa setup
    'photo-1550254478-ead40cd825c0', // chic white sofa
    'photo-1499955085172-a104c9463ece'  // cozy armchair
  ],
  chair: [
    'photo-1567538096630-e0c55bd6374c', // yellow molded chair
    'photo-1598300042247-d088f8ab3a91', // saddle leather chair
    'photo-1580481072645-022f9a6dbf27', // pink accent
    'photo-1592078615290-033ee584e267', // wooden shell chairs
    'photo-1544457193-39531789b943', // mid-century lounge
    'photo-1503602642458-232111445657', // high bar stool
    'photo-1538688525198-9b88f6f53126', // vintage wood chair
    'photo-1595428774223-ef52624120d2'  // sculptural wood chair
  ],
  table: [
    'photo-1577140917170-285929fb55b7', // solid oak table
    'photo-1533090161767-e6ffed986c88', // carrara marble top
    'photo-1530018607912-eff2df114f11', // luxurious marble tabletop
    'photo-1449247709967-d4461a6a6103', // minimalist desk table
    'photo-1565793298595-6a879b1d9492', // modern round table
    'photo-1604014237800-1c9102c219da', // spacious oak dining table
    'photo-1532372320978-9a4d1a386c49', // artisan side table with ceramics
    'photo-1519710164239-da123dc03ef4'  // minimal workspace wood table
  ],
  bedroom: [
    'photo-1505693416388-ac5ce068fe85', // minimal bed linen
    'photo-1540518614846-7eded433c457', // warm sunlit bedroom duvet bed
    'photo-1522771739844-6a9f6d5f14af', // editorial white bedroom
    'photo-1505693395321-883724634266', // aesthetic white bed frame and pillows
    'photo-1582719508461-905c673771fd', // luxury hotel suite master bed with headboard
    'photo-1513694203232-719a280e022f', // boho sunlit bedroom
    'photo-1560448204-e02f11c3d0e2', // luxurious apartment master bed
    'photo-1544816155-12df9643f363'  // cozy reading bed corner
  ],
  office: [
    'photo-1524758631624-e2822e304c36', // mid-century modern office, desk, chair, shelves
    'photo-1517806128475-1101867a5b9e', // minimal home desk table
    'photo-1493934558415-9d19f0b2b4d2', // cozy book library/shelves
    'photo-1507537297725-24a1c029d3ca', // organized modern office study
    'photo-1585776245991-cf89dd7fc73a', // beautiful wooden console bookshelf
    'photo-1501504905252-473c47e087f8', // modern computer workspace desk
    'photo-1513519245088-0e12902e5a38', // vintage desk setup with gold mirror
    'photo-1499955085172-a104c9463ece'  // cozy study lounge armchair
  ],
  lighting: [
    'photo-1507473885765-e6ed057f782c', // brass pendant lamp
    'photo-1513506003901-1e6a229e2d15', // minimalist floor lamp
    'photo-1565814329452-e1efa11c5b89', // sculptural retro desk lamp
    'photo-1543051975-c2f02d53fe3b', // pendant hanging light bulb lamp
    'photo-1505693395321-883724634266', // soft sunlit bedside lamp
    'photo-1513694203232-719a280e022f', // boho rattan pendant light
    'photo-1493663284031-b7e3aefcae8e', // modern standing desk/floor light
    'photo-1533090161767-e6ffed986c88'  // geometric table light pedestal
  ],
  decor: [
    'photo-1513519245088-0e12902e5a38', // sleek gold round mirror
    'photo-1532372320978-9a4d1a386c49', // artisan ceramic vase
    'photo-1533090161767-e6ffed986c88', // alabaster/marble vessels
    'photo-1578500494198-246f612d3b3d', // beautiful framed abstract art
    'photo-1583847268964-b28dc8f51f92', // chic accent shelf styling
    'photo-1544816155-12df9643f363', // soft cozy hand-woven rug/blanket
    'photo-1532372320978-9a4d1a386c49', // artisan hand-shaped ceramic pitchers
    'photo-1554995207-c18c203602cb'  // cozy fireplace and shelves
  ]
};

// Helper to construct Unsplash image URLs
function getUnsplashUrl(photoId: string, width = 800, height = 1000): string {
  return `https://images.unsplash.com/${photoId}?auto=format&fit=crop&w=${width}&h=${height}&q=80`;
}

// Collection definitions
const COLLECTIONS = [
  { id: 'ethos', description: 'Warm cream and walnut tones. Calm, architectural, and minimal.' },
  { id: 'heritage', description: 'Dark marble and brass tones. Rich, traditional, and timeless.' },
  { id: 'atelier', description: 'Black steel and leather. Sharp, modern, and editorial.' },
  { id: 'natura', description: 'Natural wood and linen. Organic, warm, and earthy.' }
] as const;

// Raw metadata for constructing 125 items precisely.
// Category counts: Living Room (25), Bedroom (25), Dining (25), Office (15), Outdoor (15), Lighting (10), Accessories (10)
const RAW_METADATA: {
  category: Product['category'];
  subcategory: string;
  count: number;
  prefixes: string[];
  materials: { collection: Product['collection']; mat: string; hex: string[] }[];
}[] = [
  {
    category: 'living-room',
    subcategory: 'Sofas',
    count: 8,
    prefixes: ['Lagos', 'Ikoyi', 'Lekki', 'Eko', 'Zaria', 'Obudu', 'Kano', 'Calabar'],
    materials: [
      { collection: 'ethos', mat: 'Bouclé & Walnut', hex: ['#f4ece1', '#543c23', '#2a1d0f'] },
      { collection: 'heritage', mat: 'Royal Velvet & Gold Brass', hex: ['#1e293b', '#c29f6d', '#0f172a'] },
      { collection: 'atelier', mat: 'Saddle Leather & Steel', hex: ['#451a03', '#1e293b', '#000000'] },
      { collection: 'natura', mat: 'Belgian Linen & Teak', hex: ['#f8fafc', '#78350f', '#e2e8f0'] }
    ]
  },
  {
    category: 'living-room',
    subcategory: 'Lounge Chairs',
    count: 7,
    prefixes: ['Oshodi', 'Marina', 'Yaba', 'Victoria', 'Apapa', 'Ikeja', 'Sheraton'],
    materials: [
      { collection: 'ethos', mat: 'Premium Shearling', hex: ['#f8f6f0', '#7c2d12'] },
      { collection: 'atelier', mat: 'Nappa Leather & Matte Black Steel', hex: ['#111827', '#374151'] },
      { collection: 'heritage', mat: 'Brocade Silk & Antique Brass', hex: ['#450a0a', '#b45309'] },
      { collection: 'natura', mat: 'Woven Rattan & Ashwood', hex: ['#fef3c7', '#d97706'] }
    ]
  },
  {
    category: 'living-room',
    subcategory: 'Coffee Tables',
    count: 5,
    prefixes: ['Asaba', 'Enugu', 'Uyo', 'Warri', 'Benin'],
    materials: [
      { collection: 'heritage', mat: 'Nero Marquina Marble & Brass', hex: ['#111827', '#fbbf24'] },
      { collection: 'ethos', mat: 'Travertine Stone & Smoked Glass', hex: ['#e5e7eb', '#6b7280'] },
      { collection: 'natura', mat: 'Reclaimed Iroko Wood', hex: ['#78350f', '#b45309'] },
      { collection: 'atelier', mat: 'Brushed Charcoal Steel & Glass', hex: ['#1f2937', '#9ca3af'] }
    ]
  },
  {
    category: 'living-room',
    subcategory: 'Side Tables',
    count: 3,
    prefixes: ['Jos', 'Jalingo', 'Lokoja'],
    materials: [
      { collection: 'ethos', mat: 'Polished Walnut & Ivory Stone', hex: ['#451a03', '#f9fafb'] },
      { collection: 'heritage', mat: 'Marquina Marble & Gold Foil', hex: ['#111827', '#fbbf24'] },
      { collection: 'natura', mat: 'Sculptural Solid Teak', hex: ['#78350f', '#d97706'] }
    ]
  },
  {
    category: 'living-room',
    subcategory: 'TV Units',
    count: 2,
    prefixes: ['Ibadan', 'Owerri'],
    materials: [
      { collection: 'atelier', mat: 'Fluted Walnut & Matte Metal', hex: ['#27272a', '#52525b'] },
      { collection: 'heritage', mat: 'Smoked Oak & Polished Brass', hex: ['#1c1917', '#eab308'] }
    ]
  },
  {
    category: 'bedroom',
    subcategory: 'Beds & Headboards',
    count: 8,
    prefixes: ['Tarkwa', 'Eleko', 'Oniru', 'La Campagne', 'Whispering', 'Atican', 'Ilashe', 'Kuramo'],
    materials: [
      { collection: 'ethos', mat: 'Cream Bouclé & Walnut Frame', hex: ['#fefefe', '#3f220f'] },
      { collection: 'natura', mat: 'Organic Linen & Raw Oak', hex: ['#fafaf9', '#a21caf'] },
      { collection: 'heritage', mat: 'Deep Velvet & Tufted Brass Accent', hex: ['#0f172a', '#fbbf24'] },
      { collection: 'atelier', mat: 'Full Grain Leather & Iron Frame', hex: ['#1e1b4b', '#111827'] }
    ]
  },
  {
    category: 'bedroom',
    subcategory: 'Wardrobes',
    count: 5,
    prefixes: ['Kwara', 'Bauchi', 'Sokoto', 'Katsina', 'Gombe'],
    materials: [
      { collection: 'atelier', mat: 'Tinted Glass & Anodized Aluminum', hex: ['#18181b', '#3f3f46'] },
      { collection: 'heritage', mat: 'Carved Mahogany & Brass Knobs', hex: ['#451a03', '#d97706'] },
      { collection: 'ethos', mat: 'Matte Lacquer & Walnut Interiors', hex: ['#f4f4f5', '#71717a'] }
    ]
  },
  {
    category: 'bedroom',
    subcategory: 'Dressers',
    count: 4,
    prefixes: ['Makurdi', 'Minna', 'Dutse', 'Damaturu'],
    materials: [
      { collection: 'ethos', mat: 'Cream Lacquer & Walnut Drawers', hex: ['#fafaf9', '#78350f'] },
      { collection: 'heritage', mat: 'Dark Emperador Marble & Gold Drawer Pulls', hex: ['#2d1500', '#f59e0b'] },
      { collection: 'atelier', mat: 'Blackened Steel & Ribbed Oak', hex: ['#09090b', '#27272a'] }
    ]
  },
  {
    category: 'bedroom',
    subcategory: 'Nightstands',
    count: 4,
    prefixes: ['Yola', 'Jalingo', 'Gombe', 'Birnin Kebbi'],
    materials: [
      { collection: 'ethos', mat: 'Travertine Stone & Oak Drawer', hex: ['#f5f5f4', '#d97706'] },
      { collection: 'heritage', mat: 'Satin Brass & Dark Walnut', hex: ['#fbbf24', '#451a03'] },
      { collection: 'natura', mat: 'Raw Cedar & Linen Top', hex: ['#d97706', '#fcf8f2'] }
    ]
  },
  {
    category: 'bedroom',
    subcategory: 'Bedroom Benches',
    count: 4,
    prefixes: ['Abeokuta', 'Akure', 'Ado Ekiti', 'Osogbo'],
    materials: [
      { collection: 'natura', mat: 'Woven Cane & Solid Ash', hex: ['#fef3c7', '#ca8a04'] },
      { collection: 'ethos', mat: 'Shearling & Walnut Legs', hex: ['#fafaf6', '#451a03'] },
      { collection: 'atelier', mat: 'Saddle Leather & Black Steel Frame', hex: ['#7c2d12', '#09090b'] }
    ]
  },
  {
    category: 'dining',
    subcategory: 'Dining Tables',
    count: 8,
    prefixes: ['Lekki Grand', 'Ikoyi Sovereign', 'Victoria Monarch', 'Eko Royal', 'Calabar Duke', 'Abuja Executive', 'Port Harcourt Prestige', 'Enugu Crest'],
    materials: [
      { collection: 'heritage', mat: 'White Arabescato Marble & Brass Base', hex: ['#ffffff', '#fbbf24', '#000000'] },
      { collection: 'natura', mat: 'Solid Raw French Oak & Linen Seal', hex: ['#fefaf4', '#b45309'] },
      { collection: 'ethos', mat: 'Warm Walnut Architectural Pedestal', hex: ['#451a03', '#1c1917'] },
      { collection: 'atelier', mat: 'Black Concrete & Matte Iron Frame', hex: ['#18181b', '#27272a'] }
    ]
  },
  {
    category: 'dining',
    subcategory: 'Dining Chairs',
    count: 8,
    prefixes: ['Sabo', 'Alaba', 'Oyingbo', 'Idumota', 'Balogun', 'Mile 12', 'Jankara', 'Oja Oba'],
    materials: [
      { collection: 'ethos', mat: 'Bouclé Cushion & Walnut Back', hex: ['#f5f5f4', '#451a03'] },
      { collection: 'atelier', mat: 'Distressed Saddle Leather & Iron Slats', hex: ['#7c2d12', '#09090b'] },
      { collection: 'heritage', mat: 'Silk Brocade & Gold Brass Legs', hex: ['#450a0a', '#ca8a04'] },
      { collection: 'natura', mat: 'Natural Linen & Sanded Beechwood', hex: ['#fcf6f0', '#ca8a04'] }
    ]
  },
  {
    category: 'dining',
    subcategory: 'Sideboards',
    count: 5,
    prefixes: ['Sapele', 'Ogbomoso', 'Ilorin', 'Zaria', 'Bauchi'],
    materials: [
      { collection: 'ethos', mat: 'Fluted American Walnut & Ivory Travertine', hex: ['#3b1901', '#fafaf5'] },
      { collection: 'heritage', mat: 'Smoked Oak, Rosewood & Polished Brass', hex: ['#1c1917', '#eab308'] },
      { collection: 'atelier', mat: 'Industrial Steel & Textured Obsidian', hex: ['#09090b', '#27272a'] }
    ]
  },
  {
    category: 'dining',
    subcategory: 'Bar Carts',
    count: 2,
    prefixes: ['Club Ikoyi', 'Capital Lounge'],
    materials: [
      { collection: 'heritage', mat: 'Tempered Ribbed Glass & Mirror Brass', hex: ['#fef08a', '#27272a'] },
      { collection: 'atelier', mat: 'Brushed Gunmetal & Saddle Leather Handles', hex: ['#1e293b', '#451a03'] }
    ]
  },
  {
    category: 'dining',
    subcategory: 'Wine Racks',
    count: 2,
    prefixes: ['Bacchus', 'Lagos Cellar'],
    materials: [
      { collection: 'heritage', mat: 'Walnut Wood & Polished Brass Pegs', hex: ['#451a03', '#fbbf24'] },
      { collection: 'atelier', mat: 'Matte Charcoal Steel & Dark Oak Rails', hex: ['#111827', '#3f2105'] }
    ]
  },
  {
    category: 'office',
    subcategory: 'Executive Desks',
    count: 5,
    prefixes: ['Presidential', 'Governor', 'Chancellor', 'Ambassador', 'Senator'],
    materials: [
      { collection: 'heritage', mat: 'Chesterfield Leather & Inlaid Mahogany', hex: ['#451a03', '#111827'] },
      { collection: 'ethos', mat: 'Minimal Cream Lacquer & Floating Walnut Drawer', hex: ['#fafaf9', '#27272a'] },
      { collection: 'atelier', mat: 'Acid-Etched Steel & Black Obsidian Stone', hex: ['#0c0a09', '#44403c'] },
      { collection: 'natura', mat: 'Earthy Wild Oak & Solid Linseed Base', hex: ['#ca8a04', '#fafaf9'] }
    ]
  },
  {
    category: 'office',
    subcategory: 'Office Chairs',
    count: 4,
    prefixes: ['Chairman', 'Directeur', 'Adviser', 'Partner'],
    materials: [
      { collection: 'atelier', mat: 'Ergonomic Premium Nappa Leather & Polished Aluminum', hex: ['#111827', '#d1d5db'] },
      { collection: 'ethos', mat: 'Molded Oak Plywood & Belgian Linen Wrap', hex: ['#78350f', '#f5f5f4'] },
      { collection: 'heritage', mat: 'Deep Burgundy Velvet & Brass Rolling Base', hex: ['#4c0519', '#fbbf24'] }
    ]
  },
  {
    category: 'office',
    subcategory: 'Bookshelves',
    count: 4,
    prefixes: ['Alexandrian', 'Nobel', 'Heirloom', 'Scribe'],
    materials: [
      { collection: 'heritage', mat: 'Solid Walnut Shelves & Sand-Cast Brass Supports', hex: ['#451a03', '#fbbf24'] },
      { collection: 'atelier', mat: 'Brushed Steel Grid & Dark Smoked Glass', hex: ['#1f2937', '#111827'] },
      { collection: 'natura', mat: 'Natural Sanded Ash & Organic Rope Knots', hex: ['#fef3c7', '#78350f'] }
    ]
  },
  {
    category: 'office',
    subcategory: 'Filing Cabinets',
    count: 2,
    prefixes: ['Archivist', 'Registry'],
    materials: [
      { collection: 'atelier', mat: 'Perforated Iron Plates & Brushed Steel', hex: ['#1c1917', '#78716c'] },
      { collection: 'ethos', mat: 'Oiled Oak Fronts & Recessed Walnut Handles', hex: ['#ca8a04', '#451a03'] }
    ]
  },
  {
    category: 'outdoor',
    subcategory: 'Outdoor Sofas',
    count: 5,
    prefixes: ['Bahia', 'Azure', 'Hermosa', 'Oasis', 'Solana'],
    materials: [
      { collection: 'natura', mat: 'Weatherproof Teak & Off-White Sunbrella Fabric', hex: ['#d97706', '#f8fafc'] },
      { collection: 'atelier', mat: 'Marine Grade Powdercoated Aluminum & Charcoal Mesh', hex: ['#1e293b', '#475569'] },
      { collection: 'ethos', mat: 'Organic Stone Concrete Frame & Sand Linen Cushions', hex: ['#cbd5e1', '#f5f5f4'] }
    ]
  },
  {
    category: 'outdoor',
    subcategory: 'Outdoor Dining',
    count: 5,
    prefixes: ['Lagoon Lounge', 'Villas', 'Tropicana', 'Breeze', 'Sahara'],
    materials: [
      { collection: 'natura', mat: 'Slatted Teak Table & Hand-Woven Rope Chairs', hex: ['#b45309', '#fef3c7'] },
      { collection: 'atelier', mat: 'Tempered Glass Top & Slate Aluminum Frames', hex: ['#0f172a', '#64748b'] },
      { collection: 'ethos', mat: 'Honed Lava Stone Table & Cream Cane Weave', hex: ['#475569', '#fefaf0'] }
    ]
  },
  {
    category: 'outdoor',
    subcategory: 'Sun Loungers',
    count: 3,
    prefixes: ['Ibiza', 'Saint-Tropez', 'Mykonos'],
    materials: [
      { collection: 'natura', mat: 'Reclining Grade Teak Wood & Quick-Dry Mesh', hex: ['#78350f', '#f1f5f9'] },
      { collection: 'atelier', mat: 'Slim Metal Frame & Blackened Leather Slings', hex: ['#09090b', '#3f3f46'] },
      { collection: 'ethos', mat: 'Chunky Clay Pedestal & Soft Terrazzo Headrest', hex: ['#e2e8f0', '#f4ece1'] }
    ]
  },
  {
    category: 'outdoor',
    subcategory: 'Outdoor Chairs',
    count: 2,
    prefixes: ['Breezy', 'Patio King'],
    materials: [
      { collection: 'natura', mat: 'Natural Teak & Woven Synthetic Straw', hex: ['#d97706', '#fef3c7'] },
      { collection: 'atelier', mat: 'Coated Zinc Wire & Weatherproof Pads', hex: ['#18181b', '#ef4444'] }
    ]
  },
  {
    category: 'lighting',
    subcategory: 'Floor Lamps',
    count: 4,
    prefixes: ['Obelisk', 'Helios', 'Aura', 'Glow'],
    materials: [
      { collection: 'ethos', mat: 'Honed Travertine Base & Ribbed Linen Shade', hex: ['#fafaf9', '#fefcbf'] },
      { collection: 'heritage', mat: 'Satin Brass Stem & Nero Marquina Globe Holder', hex: ['#fbbf24', '#111827'] },
      { collection: 'atelier', mat: 'Industrial Matte Black Arch & Steel Grid Dome', hex: ['#0c0a09', '#a8a29e'] }
    ]
  },
  {
    category: 'lighting',
    subcategory: 'Table Lamps',
    count: 3,
    prefixes: ['Beacon', 'Orbital', 'Dusk'],
    materials: [
      { collection: 'ethos', mat: 'Alabaster Stone & Matte Brass Accents', hex: ['#ffffff', '#fbbf24'] },
      { collection: 'heritage', mat: 'Green Malachite Faux Inlay & Velvet Shade', hex: ['#064e3b', '#f97316'] },
      { collection: 'natura', mat: 'Terracotta Hand-thrown Clay & Oatmeal Flax Shade', hex: ['#c2410c', '#fef3c7'] }
    ]
  },
  {
    category: 'lighting',
    subcategory: 'Pendant Lights',
    count: 3,
    prefixes: ['Constellation', 'Eclipse', 'Cascade'],
    materials: [
      { collection: 'heritage', mat: 'Tiered Brushed Brass Chandelier & Hand-blown Glass', hex: ['#eab308', '#ffffff'] },
      { collection: 'atelier', mat: 'Sculptural Raw Iron Ring & Exposed Filament Bulbs', hex: ['#1c1917', '#e2e8f0'] },
      { collection: 'ethos', mat: 'Suspended Washi Paper Lanterns & Delicate Wood Ring', hex: ['#fffbeb', '#7c2d12'] }
    ]
  },
  {
    category: 'accessories',
    subcategory: 'Rugs',
    count: 3,
    prefixes: ['Zaria', 'Kano', 'Sokoto'],
    materials: [
      { collection: 'natura', mat: 'Undyed Hand-Spun Tibetan Wool & Natural Jute Core', hex: ['#f5f5f4', '#d97706'] },
      { collection: 'ethos', mat: 'High-Low Pile Silk Blend in Minimalist Grid Lines', hex: ['#fafaf6', '#cbd5e1'] },
      { collection: 'heritage', mat: 'Rich Crimson Indigo Wool & Golden Weave Fringe', hex: ['#7f1d1d', '#fbbf24'] }
    ]
  },
  {
    category: 'accessories',
    subcategory: 'Mirrors',
    count: 3,
    prefixes: ['Eclipse', 'Monolith', 'Portal'],
    materials: [
      { collection: 'ethos', mat: 'Arched Floating Glass & Thin Oak Bevel', hex: ['#ffffff', '#d97706'] },
      { collection: 'heritage', mat: 'Grand Floor Mirror with Hand-carved Baroque Brass Frame', hex: ['#fbbf24', '#ffffff'] },
      { collection: 'atelier', mat: 'Triptych Industrial Dark Mirror Panels in Blackened Iron', hex: ['#18181b', '#000000'] }
    ]
  },
  {
    category: 'accessories',
    subcategory: 'Decorative Objects',
    count: 4,
    prefixes: ['Benin Crown', 'Ife Head', 'Nok Figurine', 'Lagos Vessel'],
    materials: [
      { collection: 'heritage', mat: 'Lost-Wax Cast Bronze Sculptures & Marble Plinth', hex: ['#78350f', '#0f172a'] },
      { collection: 'ethos', mat: 'Sculptural White Ceramic Vessels & Sand finish', hex: ['#faf9f5', '#cbd5e1'] },
      { collection: 'natura', mat: 'Petrified Wood Slice on Metal Stand', hex: ['#451a03', '#1e293b'] }
    ]
  }
];

function getPrestigiousName(category: string, subcategory: string, index: number): string {
  const sofaNames = [
    'The Oduduwa Crescent Sofa',
    'The Obudu Sanctuary Sectional',
    'The Eko Arc Tuxedo Sofa',
    'The Lekki Dune Slipcover Sofa',
    'The Zaria Velvet Lounge Sofa',
    'The Lagosian Tailored Chesterfield',
    'The Idanre Cliffside Sectional',
    'The Niger Curve Daybed'
  ];

  const loungeChairNames = [
    'The Ile-Ife Sculptural Armchair',
    'The Osun Lotus Lounge Chair',
    'The Alaafin Throne Chair',
    'The Gidi Slung-Leather Lounge',
    'The Asoke Tailored Occasional Chair',
    'The Jakande Rattan Accent Chair',
    'The Sango High-Back Lounge'
  ];

  const coffeeTableNames = [
    'The Olumo Travertine Coffee Table',
    'The Ogbunike Carved Stone Table',
    'The Benin Bronze Plinth Table',
    'The Nok Terra Coffee Table',
    'The Agba Jointed Timber Table'
  ];

  const sideTableNames = [
    'The Gbegiri Faceted Side Table',
    'The Erelu Fluted Pedestal',
    'The Osborne Travertine Cantilever'
  ];

  const tvUnitNames = [
    'The Gbagada Ribbed Credenza',
    'The Ibadan Slatted Media Console'
  ];

  const bedNames = [
    'The Ilashe Canopy Bed',
    'The Kuramo Low-slung Platform Bed',
    'The Lekki Sand Dune Bed',
    'The Oniru Wavehead Bed',
    'The Eleko Upholstered Bed',
    'The Tarkwa Sanctuary Headboard Bed',
    'The Atican Floating Teak Bed',
    'The Whispering Palms Retreat Bed'
  ];

  const wardrobeNames = [
    'The Kano Fluted Wardrobe',
    'The Bauchi Glass-Front Armoire',
    'The Sokoto Hand-Carved Wardrobe',
    'The Katsina Imperial Wardrobe',
    'The Gombe Minimalist Closet'
  ];

  const dresserNames = [
    'The Makurdi Ivory Lacquer Dresser',
    'The Minna Brass-Bound Chest',
    'The Dutse Obsidian Dresser',
    'The Damaturu Travertine Credenza'
  ];

  const nightstandNames = [
    'The Yola Travertine Nightstand',
    'The Jalingo Slatted Bedside Table',
    'The Gombe Floating Shelf',
    'The Birnin Kebbi Oiled Teak Drawer'
  ];

  const benchNames = [
    'The Abeokuta Carved Wood Bench',
    'The Akure Woven Cane Bench',
    'The Ado Ekiti Saddle Leather Bench',
    'The Osogbo Shearling Daybench'
  ];

  const diningTableNames = [
    'The Lekki Sovereign Pedestal Table',
    'The Ikoyi Cathedral Pillar Table',
    'The Victoria Monarch Live-Edge Table',
    'The Eko Grand Colonnade Table',
    'The Calabar Duke Oval Dining Table',
    'The Abuja Executive Travertine Table',
    'The Port Harcourt Prestige Walnut Table',
    'The Enugu Crested Arabescato Table'
  ];

  const diningChairNames = [
    'The Alara Shield-Back Dining Chair',
    'The Osun Woven-Sling Chair',
    'The Marina Sculptured Dining Chair',
    'The Yaba Cantilevered Chair',
    'The Balogun Tufted Chair',
    'The Mile 12 Rush-Seat Chair',
    'The Jankara Slatted-Back Chair',
    'The Oja Oba Brocade Dining Chair'
  ];

  const sideboardNames = [
    'The Sapele Tambour Sideboard',
    'The Ogbomoso Reeded Console',
    'The Ilorin Relief-Carved Sideboard',
    'The Zaria Leather-Wrapped Buffet',
    'The Bauchi Slate Credenza'
  ];

  const barCartNames = [
    'The Club Ikoyi Brass Bar Cart',
    'The Capital Lounge Gunmetal Trolley'
  ];

  const wineRackNames = [
    'The Bacchus Walnut Wine Pillar',
    'The Lagos Cellar Grid Wine Rack'
  ];

  const executiveDeskNames = [
    'The Broad Street Scribe Desk',
    'The Governor Leather-Inlaid Desk',
    'The Chancellor Fluted Executive Desk',
    'The Ambassador Travertine-Slab Desk',
    'The Senator Walnut-Joinery Desk'
  ];

  const officeChairNames = [
    'The Chairman Executive Tilt Chair',
    'The Directeur Ergonomic Nappa Chair',
    'The Adviser Slung-Linen Office Chair',
    'The Partner Brass-Rolling Chair'
  ];

  const bookshelfNames = [
    'The Alexandrian Pillar Library Shelves',
    'The Nobel Brass-Frame Bookshelf',
    'The Heirloom Solid Walnut Bookshelf',
    'The Scribe Minimalist Steel Bookcase'
  ];

  const filingCabinetNames = [
    'The Archivist Perforated Steel File',
    'The Registry Solid Oak Office Cabinet'
  ];

  const outdoorSofaNames = [
    'The Bahia Woven Teak Sofa',
    'The Azure Marine Lounge Sofa',
    'The Hermosa Sandstone Sectional',
    'The Oasis Slatted Patio Sofa',
    'The Solana Rope Lounge Sofa'
  ];

  const outdoorDiningNames = [
    'The Lagoon Slatted Teak Table',
    'The Villas Woven Rope Dining Set',
    'The Tropicana Lava Stone Table',
    'The Breeze Outdoor Dining Table',
    'The Sahara Clay Pedestal Set'
  ];

  const sunLoungerNames = [
    'The Ibiza Adjustable Teak Lounger',
    'The Saint-Tropez Sling Lounger',
    'The Mykonos Terrazzo-Pedestal Lounger'
  ];

  const outdoorChairNames = [
    'The Breezy Rope Sling Chair',
    'The Patio King Teak Armchair'
  ];

  const floorLampNames = [
    'The Obelisk Travertine Floor Lamp',
    'The Helios Satin Brass Floor Lamp',
    'The Aura Minimalist Arch Lamp',
    'The Glow Matte Charcoal Floor Lamp'
  ];

  const tableLampNames = [
    'The Beacon Alabaster Table Lamp',
    'The Orbital Green Malachite Lamp',
    'The Dusk Terracotta Clay Lamp'
  ];

  const pendantLightNames = [
    'The Constellation Brass Chandelier',
    'The Eclipse Raw Iron Pendant',
    'The Cascade Washi Lantern Pendant'
  ];

  const rugNames = [
    'The Zaria Hand-Spun Woolen Rug',
    'The Kano Minimalist Silk-blend Rug',
    'The Sokoto Indigo Fringe Rug'
  ];

  const mirrorNames = [
    'The Eclipse Floating Arch Mirror',
    'The Monolith Grand Brass Mirror',
    'The Portal Triptych Iron Mirror'
  ];

  const decorativeNames = [
    'The Benin Crown Lost-Wax Bronze',
    'The Ife Head Terracotta Sculpture',
    'The Nok Figurine Museum Replica',
    'The Lagos Vessel Ceramic Trio'
  ];

  if (subcategory === 'Sofas') return sofaNames[index % sofaNames.length];
  if (subcategory === 'Lounge Chairs') return loungeChairNames[index % loungeChairNames.length];
  if (subcategory === 'Coffee Tables') return coffeeTableNames[index % coffeeTableNames.length];
  if (subcategory === 'Side Tables') return sideTableNames[index % sideTableNames.length];
  if (subcategory === 'TV Units') return tvUnitNames[index % tvUnitNames.length];
  
  if (subcategory === 'Beds & Headboards') return bedNames[index % bedNames.length];
  if (subcategory === 'Wardrobes') return wardrobeNames[index % wardrobeNames.length];
  if (subcategory === 'Dressers') return dresserNames[index % dresserNames.length];
  if (subcategory === 'Nightstands') return nightstandNames[index % nightstandNames.length];
  if (subcategory === 'Bedroom Benches') return benchNames[index % benchNames.length];

  if (subcategory === 'Dining Tables') return diningTableNames[index % diningTableNames.length];
  if (subcategory === 'Dining Chairs') return diningChairNames[index % diningChairNames.length];
  if (subcategory === 'Sideboards') return sideboardNames[index % sideboardNames.length];
  if (subcategory === 'Bar Carts') return barCartNames[index % barCartNames.length];
  if (subcategory === 'Wine Racks') return wineRackNames[index % wineRackNames.length];

  if (subcategory === 'Executive Desks') return executiveDeskNames[index % executiveDeskNames.length];
  if (subcategory === 'Office Chairs') return officeChairNames[index % officeChairNames.length];
  if (subcategory === 'Bookshelves') return bookshelfNames[index % bookshelfNames.length];
  if (subcategory === 'Filing Cabinets') return filingCabinetNames[index % filingCabinetNames.length];

  if (subcategory === 'Outdoor Sofas') return outdoorSofaNames[index % outdoorSofaNames.length];
  if (subcategory === 'Outdoor Dining') return outdoorDiningNames[index % outdoorDiningNames.length];
  if (subcategory === 'Sun Loungers') return sunLoungerNames[index % sunLoungerNames.length];
  if (subcategory === 'Outdoor Chairs') return outdoorChairNames[index % outdoorChairNames.length];

  if (subcategory === 'Floor Lamps') return floorLampNames[index % floorLampNames.length];
  if (subcategory === 'Table Lamps') return tableLampNames[index % tableLampNames.length];
  if (subcategory === 'Pendant Lights') return pendantLightNames[index % pendantLightNames.length];

  if (subcategory === 'Rugs') return rugNames[index % rugNames.length];
  if (subcategory === 'Mirrors') return mirrorNames[index % mirrorNames.length];
  if (subcategory === 'Decorative Objects') return decorativeNames[index % decorativeNames.length];

  return `The Bespoke ${subcategory.replace(/s$/, '')}`;
}

// Compile raw metadata into the CATALOGUE array
export const CATALOGUE: Product[] = (() => {
  const catalogue: Product[] = [];
  let globalId = 1;

  RAW_METADATA.forEach((meta) => {
    for (let i = 0; i < meta.count; i++) {
      const idStr = String(globalId).padStart(3, '0');
      
      // Determine prestigious luxurious name
      const name = getPrestigiousName(meta.category, meta.subcategory, i);

      // Pick a material combination based on index to distribute evenly among collections
      const matCombo = meta.materials[i % meta.materials.length];
      const collection = matCombo.collection;
      const material = matCombo.mat;
      const colors = matCombo.hex;

      // Base price variations based on subcategory
      let basePrice = 1200;
      if (meta.subcategory.includes('Sofas')) basePrice = 6500 + (i * 800);
      else if (meta.subcategory.includes('Lounge Chairs')) basePrice = 2400 + (i * 350);
      else if (meta.subcategory.includes('Coffee Tables')) basePrice = 1800 + (i * 250);
      else if (meta.subcategory.includes('Side Tables')) basePrice = 850 + (i * 150);
      else if (meta.subcategory.includes('TV Units')) basePrice = 3200 + (i * 600);
      else if (meta.subcategory.includes('Beds')) basePrice = 4500 + (i * 600);
      else if (meta.subcategory.includes('Wardrobes')) basePrice = 7500 + (i * 1200);
      else if (meta.subcategory.includes('Dressers')) basePrice = 2800 + (i * 400);
      else if (meta.subcategory.includes('Nightstands')) basePrice = 950 + (i * 150);
      else if (meta.subcategory.includes('Benches')) basePrice = 1200 + (i * 200);
      else if (meta.subcategory.includes('Dining Tables')) basePrice = 5500 + (i * 900);
      else if (meta.subcategory.includes('Dining Chairs')) basePrice = 750 + (i * 100);
      else if (meta.subcategory.includes('Sideboards')) basePrice = 3500 + (i * 500);
      else if (meta.subcategory.includes('Bar Carts')) basePrice = 1400 + (i * 300);
      else if (meta.subcategory.includes('Wine Racks')) basePrice = 1800 + (i * 400);
      else if (meta.subcategory.includes('Desks')) basePrice = 4200 + (i * 700);
      else if (meta.subcategory.includes('Office Chairs')) basePrice = 1500 + (i * 250);
      else if (meta.subcategory.includes('Bookshelves')) basePrice = 2800 + (i * 400);
      else if (meta.subcategory.includes('Filing Cabinets')) basePrice = 1800 + (i * 200);
      else if (meta.subcategory.includes('Outdoor Sofas')) basePrice = 5200 + (i * 700);
      else if (meta.subcategory.includes('Outdoor Dining')) basePrice = 4800 + (i * 600);
      else if (meta.subcategory.includes('Loungers')) basePrice = 1800 + (i * 300);
      else if (meta.subcategory.includes('Outdoor Chairs')) basePrice = 850 + (i * 150);
      else if (meta.subcategory.includes('Floor Lamps')) basePrice = 1100 + (i * 200);
      else if (meta.subcategory.includes('Table Lamps')) basePrice = 650 + (i * 100);
      else if (meta.subcategory.includes('Pendant')) basePrice = 1800 + (i * 400);
      else if (meta.subcategory.includes('Rugs')) basePrice = 2200 + (i * 500);
      else if (meta.subcategory.includes('Mirrors')) basePrice = 1100 + (i * 300);
      else if (meta.subcategory.includes('Decorative')) basePrice = 450 + (i * 120);

      // Distribute tags nicely
      let tag: Product['tag'] = '';
      if (globalId % 13 === 0) tag = 'limited';
      else if (globalId % 7 === 0) tag = 'new';
      else if (globalId % 5 === 0) tag = 'bestseller';

      // Pick unique working images from pools based on subcategory or seed logic
      let photoCategory: keyof typeof PHOTO_POOL = 'decor';
      if (meta.category === 'living-room') {
        photoCategory = meta.subcategory.includes('Sofas') ? 'sofa' : (meta.subcategory.includes('Chairs') ? 'chair' : 'table');
      } else if (meta.category === 'bedroom') {
        photoCategory = 'bedroom';
      } else if (meta.category === 'dining') {
        photoCategory = meta.subcategory.includes('Table') ? 'table' : (meta.subcategory.includes('Chair') ? 'chair' : 'decor');
      } else if (meta.category === 'office') {
        photoCategory = 'office';
      } else if (meta.category === 'lighting') {
        photoCategory = 'lighting';
      } else if (meta.category === 'outdoor') {
        photoCategory = meta.subcategory.includes('Sofa') ? 'sofa' : (meta.subcategory.includes('Dining') ? 'table' : 'chair');
      } else {
        photoCategory = 'decor';
      }

      const pool = PHOTO_POOL[photoCategory];
      const imgSeed1 = pool[i % pool.length];
      const imgSeed2 = pool[(i + 1) % pool.length];
      const imgSeed3 = pool[(i + 2) % pool.length];
      const imgSeed4 = pool[(i + 3) % pool.length];
      const imgSeed5 = pool[(i + 4) % pool.length];

      const image = getUnsplashUrl(imgSeed1, 600, 800);
      const hoverImage = getUnsplashUrl(imgSeed2, 600, 800);

      const gallery = [
        getUnsplashUrl(imgSeed1, 1200, 1600),
        getUnsplashUrl(imgSeed2, 1200, 1600),
        getUnsplashUrl(imgSeed3, 1200, 1600),
        getUnsplashUrl(imgSeed4, 1200, 1600),
        getUnsplashUrl(imgSeed5, 1200, 1600)
      ];

      const leadTime = `${8 + (globalId % 3) * 2}-${10 + (globalId % 3) * 2} weeks`;
      const description = `An exquisite example of ${collection === 'natura' ? 'organic' : collection === 'ethos' ? 'architectural' : collection === 'atelier' ? 'sharp editorial' : 'timeless traditional'} form. Fully handcrafted to absolute perfection.`;

      // Spec details
      const dimensions = `W: ${80 + (globalId % 8) * 25}cm x D: ${50 + (globalId % 6) * 10}cm x H: ${40 + (globalId % 4) * 15}cm`;
      const weight = `${15 + (globalId % 10) * 8} kg`;
      const origin = 'Lagos, Nigeria';

      const colorNames = colors.map((col, idx) => {
        if (col === '#ffffff' || col === '#f9fafb' || col === '#fafaf9' || col === '#fafaf5') return 'Ivory Linen';
        if (col === '#451a03' || col === '#3b1901' || col === '#543c23' || col === '#2d1500') return 'Smoked Walnut';
        if (col === '#111827' || col === '#000000' || col === '#09090b' || col === '#18181b') return 'Nero Obsidian';
        if (col === '#fbbf24' || col === '#eab308' || col === '#ca8a04' || col === '#b45309') return 'Brushed Gold';
        if (col === '#f4ece1' || col === '#e7d8c1' || col === '#fafaf6') return 'Cream Bouclé';
        if (col === '#78350f' || col === '#d97706') return 'Natural Teak';
        if (col === '#1e293b' || col === '#475569' || col === '#3f3f46') return 'Slate Steel';
        return 'Bespoke Finish';
      });

      catalogue.push({
        id: idStr,
        name,
        category: meta.category,
        subcategory: meta.subcategory,
        collection,
        price: basePrice,
        tag,
        material,
        leadTime,
        image,
        hoverImage,
        description,
        dimensions,
        weight,
        origin,
        colors,
        colorNames,
        gallery,
        fullDescription: `The ${name} is a masterwork of modern African luxury, representing a striking conversation between ancestral woodcraft and international contemporary silhouettes. Each solid frame is hand-chiseled by local Guild Artisans in our Lagos atelier, using timber sustainably harvested from regional reserves. Every seam is sewn with heavy-duty sail thread and upholstered in curated textiles from prestigious Belgian and Italian mills. Designed not just to occupy space, but to anchor it with quiet authority and physical luxury.`,
        materialsCraftsmanship: `Crafted from premium ${material}, selected for its structural durability, grain integrity, and visual complexity. The wood is naturally dried for twelve months to adapt perfectly to temperature fluctuations, preventing split or warp. Upholstered parts feature multi-density ergonomic latex foam core wrapped in pure goose down for an initial cloud-like sink-in feeling that maintains crisp structural lines forever. Frame joints are dual-doweled, glued, and corner-blocked with solid iroko hardware to endure generations of use.`,
        deliveryLeadTime: `This piece is meticulously handcrafted-to-order in our central Lagos atelier. Handwork requires high patience and precise execution: our standard production window is ${leadTime}. Shipping is securely crated in bespoke heat-treated plywood crates to prevent shipping friction or temperature shocks. White-glove installation is fully included with all global orders. Our logistics concierge will contact you within 24 hours of purchase to coordinate site access, doorway clearance measurements, and delivery window schedules.`,
        careInstructions: `To preserve the natural oil depth of the timber and the weave integrity of the fabric, we recommend placing this piece away from prolonged direct Equatorial sunlight and active heat sources. For wood surfaces, dust weekly with a dry lint-free microfiber cloth; do not use commercial silicon-heavy aerosol polishers. For upholstered fabrics, light vacuuming once every two weeks using a brush attachment is recommended. Professional upholstery cleaners should handle liquid spills immediately by blotting gently (never rubbing) with an un-dyed, damp cloth.`
      });

      globalId++;
    }
  });

  return catalogue;
})();

export function getProductById(id: string): Product | undefined {
  return CATALOGUE.find(p => p.id === id);
}

export function getCollections() {
  return COLLECTIONS;
}
