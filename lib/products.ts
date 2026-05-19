export type CategoryId = 'power' | 'broadcast' | 'precision';

export type Category = {
  id: CategoryId;
  name: string;
  shortName: string;
  description: string;
};

export type StockStatus = 'in_stock' | 'low_stock' | 'preorder';

export type Product = {
  id: string;
  slug: string;
  name: string;
  category: CategoryId;
  price: number;
  description: string;
  highlights: string[];
  specs: { label: string; value: string }[];
  stock: StockStatus;
  unitsLeft: number;
  weightLbs: number;
  image: string;
  imageAlt: string;
};

export const CATEGORIES: Category[] = [
  {
    id: 'power',
    name: 'Off-Grid Industrial Power & Generators',
    shortName: 'Industrial Power',
    description:
      'Heavy inverters, dual-fuel generators, and ballistic solar arrays engineered for extreme base-camp operations.',
  },
  {
    id: 'broadcast',
    name: 'Broadcast-Grade Remote Field Streaming',
    shortName: 'Field Broadcast Tech',
    description:
      'Encrypted cellular/sat bonding rigs, thermal tracking drones, and weatherized audio for continuous 4K live broadcast from anywhere.',
  },
  {
    id: 'precision',
    name: 'Precision Archery & Expedition Weaponry',
    shortName: 'Elite Precision Tools',
    description:
      'Custom carbon-weave bows, Damascus field-dressing kits, and titanium-cased game tools for committed expedition operators.',
  },
];

export const PRODUCTS: Product[] = [
  {
    id: 'wt-001',
    slug: 'gigavolt-titan-5000w-inverter-generator',
    name: 'GigaVolt Titan 5000W Inverter Generator',
    category: 'power',
    price: 4850.0,
    description:
      'Dual-fuel silent military-grade smart inverter for extreme base-camp powering.',
    highlights: [
      'Dual-fuel (gasoline + propane) cold-weather start at -22°F',
      'Sub-58 dB acoustic signature at full load',
      'Pure-sine inverter — safe for satellite uplinks and broadcast gear',
      'WiFi + LTE telemetry, remote start, parallel-link ready',
    ],
    specs: [
      { label: 'Continuous Output', value: '5,000 W' },
      { label: 'Peak Surge', value: '6,250 W' },
      { label: 'Runtime @ 25% load', value: '17.4 hours' },
      { label: 'Fuel Type', value: 'Gasoline / Propane' },
      { label: 'Weight', value: '142 lbs' },
    ],
    stock: 'in_stock',
    unitsLeft: 7,
    weightLbs: 142,
    image:
      'https://images.unsplash.com/photo-1607400201515-c2c41c07d307?auto=format&fit=crop&w=1600&q=80',
    imageAlt: 'Heavy-duty industrial inverter generator under shop light',
  },
  {
    id: 'wt-002',
    slug: 'solaris-pro-off-grid-solar-array-400w',
    name: 'Solaris Pro Off-Grid Solar Array (400W Pack)',
    category: 'power',
    price: 1999.0,
    description:
      'Carbon-reinforced ballistic folding solar harvest array with smart charge controllers.',
    highlights: [
      '400 W folding panel set, IP67 carbon-reinforced backing',
      'MPPT smart charge controller with Bluetooth telemetry',
      'Hot-swap MC4 quick connectors for field reconfiguration',
      'Compatible with all 12V / 24V / 48V battery banks',
    ],
    specs: [
      { label: 'Peak Output', value: '400 W' },
      { label: 'Panels', value: '4 × 100W foldable' },
      { label: 'Conversion Efficiency', value: '23.4%' },
      { label: 'Folded Footprint', value: '24" × 21" × 3"' },
      { label: 'Weight', value: '28 lbs' },
    ],
    stock: 'in_stock',
    unitsLeft: 14,
    weightLbs: 28,
    image:
      'https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&w=1600&q=80',
    imageAlt: 'Folding solar panel array deployed at remote camp',
  },
  {
    id: 'wt-003',
    slug: 'apexstream-live-pack-pro-bonded-cellular-sat',
    name: 'ApexStream Live-Pack Pro (Bonded Cellular/Sat Setup)',
    category: 'broadcast',
    price: 8500.0,
    description:
      'Encrypted multi-network bonding field streaming rig for continuous 4K broadcast from deep woods.',
    highlights: [
      'Bonds 6 cellular modems + Starlink uplink with sub-frame jitter',
      'AES-256 hardware encryption at the bonding layer',
      'Mil-spec Pelican case, sealed connector ring',
      'Hot-swap battery sled, 9-hour field endurance',
    ],
    specs: [
      { label: 'Uplink', value: '6× LTE/5G + 1× Sat' },
      { label: 'Max Bitrate', value: '120 Mbps bonded' },
      { label: 'Encoding', value: 'H.264 / H.265 / AV1' },
      { label: 'Operating Range', value: '-30°F to 140°F' },
      { label: 'Weight', value: '34 lbs' },
    ],
    stock: 'low_stock',
    unitsLeft: 3,
    weightLbs: 34,
    image:
      'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1600&q=80',
    imageAlt: 'Tactical bonded streaming case with antennas deployed',
  },
  {
    id: 'wt-004',
    slug: 'phantom-eye-4k-thermal-tracking-drone',
    name: 'Phantom-Eye 4K Thermal Tracking Drone',
    category: 'broadcast',
    price: 6200.0,
    description:
      'Weatherproof night-vision drone with automated follow-me telemetry for live-stream feeds.',
    highlights: [
      '4K visible + 640×512 thermal sensor, gimbal-stabilized',
      'Auto follow-me with RTK-precision telemetry',
      'IP54 weatherproof, 41-minute flight endurance',
      'Live HDMI/SDI output for broadcast integration',
    ],
    specs: [
      { label: 'Sensors', value: '4K visible + LWIR thermal' },
      { label: 'Flight Time', value: '41 min' },
      { label: 'Top Speed', value: '49 mph' },
      { label: 'Range', value: '7.5 mi (FCC)' },
      { label: 'Weight', value: '4.4 lbs' },
    ],
    stock: 'in_stock',
    unitsLeft: 9,
    weightLbs: 4.4,
    image:
      'https://images.unsplash.com/photo-1473968512647-3e447244af8f?auto=format&fit=crop&w=1600&q=80',
    imageAlt: 'Professional quadcopter drone hovering above tree line at dusk',
  },
  {
    id: 'wt-005',
    slug: 'rodecaster-ultra-field-studio-bundle',
    name: 'RodeCaster Ultra Field Studio Bundle',
    category: 'broadcast',
    price: 2400.0,
    description:
      'All-weather multi-channel audio mixer paired with dual professional sound-isolated shotgun mics.',
    highlights: [
      '8-channel touch-screen mixer, all-weather chassis',
      '2× sound-isolated shotgun mics with shock mounts',
      'On-board recording to redundant SSD/SD card',
      'Bluetooth + USB-C + SMPTE timecode lock',
    ],
    specs: [
      { label: 'Channels', value: '8 in / 4 out' },
      { label: 'Sample Rate', value: '96 kHz / 24-bit' },
      { label: 'Mics Included', value: '2× shotgun + 1× lav' },
      { label: 'Power', value: 'V-mount + USB-C PD' },
      { label: 'Weight (mixer)', value: '5.8 lbs' },
    ],
    stock: 'in_stock',
    unitsLeft: 6,
    weightLbs: 18,
    image:
      'https://images.unsplash.com/photo-1598653222000-6b7b7a552625?auto=format&fit=crop&w=1600&q=80',
    imageAlt: 'Professional audio mixer with shotgun microphones',
  },
  {
    id: 'wt-006',
    slug: 'elite-carbon-enkore-tactical-bow-kit',
    name: 'Elite Carbon EnKore Tactical Bow Custom Kit',
    category: 'precision',
    price: 2150.0,
    description:
      'Custom 70lb draw weight carbon-weave hunting bow with digital tracking sight lines.',
    highlights: [
      'Custom-tuned 70 lb draw weight, carbon-weave riser',
      'Integrated digital sight with windage compensation',
      'Sub-340 fps arrow velocity, IBO certified',
      'Comes with 6 carbon arrows, broadheads, and field case',
    ],
    specs: [
      { label: 'Draw Weight', value: '70 lb (custom)' },
      { label: 'Axle-to-Axle', value: '32"' },
      { label: 'Arrow Speed', value: '340 fps' },
      { label: 'Brace Height', value: '6.5"' },
      { label: 'Weight (bow)', value: '4.6 lbs' },
    ],
    stock: 'preorder',
    unitsLeft: 0,
    weightLbs: 12,
    image:
      'https://images.unsplash.com/photo-1568098143009-fc23df27e88f?auto=format&fit=crop&w=1600&q=80',
    imageAlt: 'High-end carbon compound bow at draw',
  },
  {
    id: 'wt-007',
    slug: 'vosteed-damascus-master-forge-cleaver-game-set',
    name: 'Vosteed Damascus Master-Forge Cleaver & Game Set',
    category: 'precision',
    price: 1250.0,
    description:
      '67-layer custom Damascus steel field-dressing kit inside a titanium case.',
    highlights: [
      '67-layer Damascus folded steel, Rockwell 61 HRC',
      'Cleaver, boning blade, caping knife, sharpener, honing stone',
      'Titanium hard-shell case with shock-mount foam',
      'Lifetime sharpening service included',
    ],
    specs: [
      { label: 'Steel', value: '67-layer Damascus' },
      { label: 'Hardness', value: '61 HRC' },
      { label: 'Pieces', value: '4 blades + 2 tools' },
      { label: 'Case', value: 'Titanium hard-shell' },
      { label: 'Weight', value: '6.2 lbs' },
    ],
    stock: 'in_stock',
    unitsLeft: 5,
    weightLbs: 6.2,
    image:
      'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=1600&q=80',
    imageAlt: 'Damascus steel blade with patterned forging',
  },
];

export function getProduct(slug: string): Product | undefined {
  return PRODUCTS.find((p) => p.slug === slug);
}

export function getCategory(id: CategoryId): Category {
  return CATEGORIES.find((c) => c.id === id)!;
}

export function productsByCategory(id: CategoryId): Product[] {
  return PRODUCTS.filter((p) => p.category === id);
}
