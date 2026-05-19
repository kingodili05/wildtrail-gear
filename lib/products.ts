export type CategoryId =
  | 'cameras'
  | 'action-cameras'
  | 'drones'
  | 'fishing'
  | 'bowfishing'
  | 'hunting'
  | 'camping'
  | 'audio'
  | 'power'
  | 'connectivity'
  | 'kayaks'
  | 'storage'
  | 'mounts'
  | 'clothing'
  | 'knives'
  | 'lighting'
  | 'gps';

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
  origPrice?: number;
  mfr?: string;
  sku?: string;
  availability?: string;
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
    id: 'cameras',
    name: 'Cameras',
    shortName: 'Cameras',
    description:
      'Cinema bodies, mirrorless hybrids, and broadcast-grade sensors selected for narrative outdoor production.',
  },
  {
    id: 'action-cameras',
    name: 'Action Cameras',
    shortName: 'Action Cameras',
    description:
      'Rugged POV bodies built for water, mud, and high-impact mounts. Spare batteries and rigs included.',
  },
  {
    id: 'drones',
    name: 'Drones',
    shortName: 'Drones',
    description:
      'Compact travel drones to enterprise-grade thermal tracking platforms for follow-me broadcast work.',
  },
  {
    id: 'fishing',
    name: 'Fishing Gear',
    shortName: 'Fishing',
    description:
      'Forward-looking sonar, livescope rigs, and marine electronics that change how the water is read.',
  },
  {
    id: 'bowfishing',
    name: 'Bowfishing',
    shortName: 'Bowfishing',
    description:
      'Reel-mounted bows, fiberglass arrows, and lighted nocks engineered for shallow-water rough fish.',
  },
  {
    id: 'hunting',
    name: 'Hunting',
    shortName: 'Hunting',
    description:
      'Compound bows, optics, and field tools selected for serious deer and turkey work.',
  },
  {
    id: 'camping',
    name: 'Camping',
    shortName: 'Camping',
    description:
      'Ultralight shelter, sleep, and seat systems for multi-day expedition base-camping.',
  },
  {
    id: 'audio',
    name: 'Creator Audio',
    shortName: 'Creator Audio',
    description:
      'Lavalier kits, broadcast mixers, and wireless capture systems that separate amateur from professional.',
  },
  {
    id: 'power',
    name: 'Batteries & Power',
    shortName: 'Batteries & Power',
    description:
      'Industrial inverters, lithium power stations, and folding solar harvest arrays for off-grid base camps.',
  },
  {
    id: 'connectivity',
    name: 'Internet & Field Connectivity',
    shortName: 'Connectivity',
    description:
      'Bonded cellular routers, satellite kits, and broadcast uplinks for continuous 4K from anywhere.',
  },
  {
    id: 'kayaks',
    name: 'Kayaks & Boats',
    shortName: 'Kayaks & Boats',
    description:
      'Sit-on-top fishing kayaks and pedal-drive platforms built for skinny water and big catches.',
  },
  {
    id: 'storage',
    name: 'Storage & SSDs',
    shortName: 'Storage & SSDs',
    description:
      'Portable SSDs, ruggedized field drives, and offload solutions for broadcast-grade workflows.',
  },
  {
    id: 'mounts',
    name: 'Tripods & Mounts',
    shortName: 'Tripods & Mounts',
    description:
      'Carbon-fiber tripods, fluid heads, and clamp mounts engineered for broadcast camera weights.',
  },
  {
    id: 'knives',
    name: 'Knives & Tools',
    shortName: 'Knives & Tools',
    description:
      'Hand-forged blades, field-dressing kits, and titanium-cased game tools for committed operators.',
  },
  {
    id: 'clothing',
    name: 'Outdoor Clothing',
    shortName: 'Clothing',
    description:
      'Hardshell jackets, base layers, and weatherized field garments. Inventory dropping spring 2026.',
  },
  {
    id: 'lighting',
    name: 'Lighting',
    shortName: 'Lighting',
    description:
      'Field-grade LED panels, lanterns, and headlamps for continuous-shoot scenarios.',
  },
  {
    id: 'gps',
    name: 'GPS & Navigation',
    shortName: 'GPS & Navigation',
    description:
      'Satellite communicators, handheld GPS units, and inReach hardware for off-grid backup comms.',
  },
];

export const PRODUCTS: Product[] = [
  // ── Cameras ───────────────────────────────────────────────────
  // Pro broadcast camcorders sourced from Adorama Professional
  // Camcorders catalog (price + MFR + SKU verified against listing).
  {
    id: 'wt-c-sohdc3300r',
    slug: 'sony-hdc-3300r-2-3-ccd-hd-super-motion-camera',
    name: 'Sony HDC-3300R 2/3" CCD HD Super Motion Color Camera',
    category: 'cameras',
    price: 99999.99,
    sku: 'SOHDC3300R',
    mfr: 'HDC3300R',
    availability: 'Temporarily On Backorder',
    description:
      '1080p HD video capture with exceptional low-light sensitivity, advanced stabilization, XLR microphone inputs, and a 2/3" CCD sensor for professional broadcast image quality.',
    highlights: [
      '2/3" CCD sensor for professional broadcast image quality',
      'Super-Motion 1080p capture',
      'Exceptional low-light sensitivity',
      'XLR microphone inputs, advanced stabilization',
    ],
    specs: [
      { label: 'Sensor', value: '2/3" CCD' },
      { label: 'Resolution', value: '1080p HD' },
      { label: 'Audio', value: 'Dual XLR inputs' },
      { label: 'Mode', value: 'Super Motion HD' },
    ],
    stock: 'preorder',
    unitsLeft: 0,
    weightLbs: 11,
    image:
      'https://images.unsplash.com/photo-1517472292914-9570a594783b?auto=format&fit=crop&w=1600&q=80',
    imageAlt: 'Sony HDC-3300R broadcast camera body',
  },
  {
    id: 'wt-c-sohdc2000b',
    slug: 'sony-hdc-2000-multiformat-camera-system-black',
    name: 'Sony HDC-2000 Multiformat Camera System, 2/3" CCD, 1080p Resolution, Black',
    category: 'cameras',
    price: 96250.0,
    origPrice: 99999.99,
    sku: 'SOHDC2000B',
    mfr: 'HDC2000B',
    availability: 'Temporarily On Backorder',
    description:
      '1080p recording on a 2/3" CCD sensor, XLR audio inputs, multiformat support, certified operation from -4°F to 113°F.',
    highlights: [
      '2/3" CCD sensor, 1080p HD recording',
      'Multiformat compatibility (1080i / 1080p / 720p)',
      'XLR audio inputs, durable broadcast chassis',
      'Operating range -4°F to 113°F',
    ],
    specs: [
      { label: 'Sensor', value: '2/3" CCD' },
      { label: 'Resolution', value: '1080p HD' },
      { label: 'Audio', value: 'XLR multi-channel' },
      { label: 'Operating Temp', value: '-4°F to 113°F' },
    ],
    stock: 'preorder',
    unitsLeft: 0,
    weightLbs: 10.4,
    image:
      'https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&w=1600&q=80',
    imageAlt: 'Sony HDC-2000 black broadcast camera',
  },
  {
    id: 'wt-c-sohdc2000w',
    slug: 'sony-hdc-2000-multiformat-camera-system-white',
    name: 'Sony HDC-2000 Multiformat Camera System, 2/3" CCD, 1080p Resolution, White',
    category: 'cameras',
    price: 96250.0,
    origPrice: 99999.99,
    sku: 'SOHDC2000W',
    mfr: 'HDC2000W',
    availability: 'Temporarily On Backorder',
    description:
      '1080p HD capture on a 2/3" CCD imager. XLR microphone support, multiformat compatibility, durable professional build.',
    highlights: [
      '2/3" CCD imager, 1080p HD capture',
      'XLR microphone support',
      'Multiformat broadcast compatibility',
      'Durable broadcast chassis (white)',
    ],
    specs: [
      { label: 'Sensor', value: '2/3" CCD' },
      { label: 'Resolution', value: '1080p HD' },
      { label: 'Audio', value: 'XLR multi-channel' },
      { label: 'Body', value: 'White finish' },
    ],
    stock: 'preorder',
    unitsLeft: 0,
    weightLbs: 10.4,
    image:
      'https://images.unsplash.com/photo-1606983340126-99ab4feaa64a?auto=format&fit=crop&w=1600&q=80',
    imageAlt: 'Sony HDC-2000 white broadcast camera',
  },
  {
    id: 'wt-c-sohdc2500l',
    slug: 'sony-hdc-2500l-multiformat-camera-system',
    name: 'Sony HDC2500L Multiformat Camera System, 2/3" CCD, 1080p Effective Pixels',
    category: 'cameras',
    price: 74864.95,
    origPrice: 93000.0,
    sku: 'SOHDC2500L',
    mfr: 'HDC2500L',
    availability: 'Temporarily On Backorder',
    description:
      'HD clarity with image stabilization, XLR audio support, rugged field design, supports 1080i/p and 720p multiformat workflows.',
    highlights: [
      '2/3" CCD multiformat sensor',
      'Supports 1080i / 1080p / 720p',
      'XLR audio support, rugged field build',
      'Image stabilization included',
    ],
    specs: [
      { label: 'Sensor', value: '2/3" CCD' },
      { label: 'Formats', value: '1080i / 1080p / 720p' },
      { label: 'Audio', value: 'XLR multi-channel' },
      { label: 'Build', value: 'Broadcast field chassis' },
    ],
    stock: 'preorder',
    unitsLeft: 0,
    weightLbs: 10,
    image:
      'https://images.unsplash.com/photo-1576539486916-355a7b1ca09f?auto=format&fit=crop&w=1600&q=80',
    imageAlt: 'Sony HDC2500L broadcast camera body',
  },
  {
    id: 'wt-c-sohdc2400l',
    slug: 'sony-hdc-2400l-multiformat-camera-system',
    name: 'Sony HDC2400L Multiformat Camera System, 2/3" CCD, 1080p Resolution',
    category: 'cameras',
    price: 70000.0,
    sku: 'SOHDC2400L',
    mfr: 'HDC2400L',
    availability: 'Temporarily On Backorder',
    description:
      '2/3" CCD sensor, Full HD 1080p, dual XLR inputs, B4 lens mount, built-in ND filters for broadcast field work.',
    highlights: [
      '2/3" CCD sensor, Full HD 1080p',
      'Dual XLR audio inputs',
      'B4 broadcast lens mount',
      'Built-in ND filter wheel',
    ],
    specs: [
      { label: 'Sensor', value: '2/3" CCD' },
      { label: 'Resolution', value: '1080p HD' },
      { label: 'Lens Mount', value: 'B4' },
      { label: 'ND Filter', value: 'Built-in' },
    ],
    stock: 'preorder',
    unitsLeft: 0,
    weightLbs: 10,
    image:
      'https://images.unsplash.com/photo-1626025437432-8c9c8b22cabd?auto=format&fit=crop&w=1600&q=80',
    imageAlt: 'Sony HDC2400L multiformat broadcast camera',
  },
  {
    id: 'wt-c-sohdc2570',
    slug: 'sony-hdc-2570-multiformat-camera-system',
    name: 'Sony HDC-2570 Multiformat Camera System, 2/3" CCD, 1080p Effective Pixels',
    category: 'cameras',
    price: 69125.0,
    origPrice: 79000.0,
    sku: 'SOHDC2570',
    mfr: 'HDC2570',
    availability: 'Temporarily On Backorder',
    description:
      '1080p HD quality from a 2/3" CCD imager. XLR microphone inputs, enhanced stabilization, durable field-ready design.',
    highlights: [
      '2/3" CCD imager, 1080p HD quality',
      'XLR microphone inputs',
      'Enhanced image stabilization',
      'Durable field-ready broadcast chassis',
    ],
    specs: [
      { label: 'Sensor', value: '2/3" CCD' },
      { label: 'Resolution', value: '1080p HD' },
      { label: 'Audio', value: 'XLR multi-channel' },
      { label: 'Stabilization', value: 'Enhanced broadcast' },
    ],
    stock: 'preorder',
    unitsLeft: 0,
    weightLbs: 10.2,
    image:
      'https://images.unsplash.com/photo-1554080353-a576cf803bda?auto=format&fit=crop&w=1600&q=80',
    imageAlt: 'Sony HDC-2570 broadcast camera body',
  },
  {
    id: 'wt-c-sohdc1700l',
    slug: 'sony-hdc-1700l-multiformat-camera-system',
    name: 'Sony HDC1700L Multiformat Camera System, 2/3" CCD, 1080p Resolution',
    category: 'cameras',
    price: 60000.0,
    sku: 'SOHDC1700L',
    mfr: 'HDC1700L',
    availability: 'Temporarily On Backorder',
    description:
      'Full HD 1080p recording, strong low-light performance, 2/3" CCD sensor, stabilization system, B4 lens mount.',
    highlights: [
      '2/3" CCD sensor, Full HD 1080p',
      'Strong low-light performance',
      'B4 broadcast lens mount',
      'Broadcast stabilization system',
    ],
    specs: [
      { label: 'Sensor', value: '2/3" CCD' },
      { label: 'Resolution', value: '1080p HD' },
      { label: 'Lens Mount', value: 'B4' },
      { label: 'Audio', value: 'XLR multi-channel' },
    ],
    stock: 'preorder',
    unitsLeft: 0,
    weightLbs: 9.8,
    image:
      'https://images.unsplash.com/photo-1581590873671-49d83ec9faf6?auto=format&fit=crop&w=1600&q=80',
    imageAlt: 'Sony HDC1700L multiformat broadcast camera',
  },
  {
    id: 'wt-c-pcajcx4000gj',
    slug: 'panasonic-aj-cx4000-4k-hdr-eng-shoulder-camcorder',
    name: 'Panasonic AJ-CX4000 4K HDR ENG Shoulder-Mount Camcorder',
    category: 'cameras',
    price: 36915.95,
    sku: 'PCAJCX4000GJ',
    mfr: 'AJ-CX4000GJ',
    availability: 'Ships from Manufacturer',
    description:
      '4K HDR recording, image stabilization, professional XLR audio, long battery life, user-friendly shoulder-mount design for ENG production.',
    highlights: [
      '4K UHD HDR recording',
      'Shoulder-mount ENG design',
      'Professional XLR audio',
      'Long-endurance battery system',
    ],
    specs: [
      { label: 'Resolution', value: '4K UHD HDR' },
      { label: 'Form Factor', value: 'Shoulder-mount ENG' },
      { label: 'Audio', value: 'Dual XLR' },
      { label: 'Stabilization', value: 'In-body' },
    ],
    stock: 'in_stock',
    unitsLeft: 4,
    weightLbs: 9.6,
    image:
      'https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?auto=format&fit=crop&w=1600&q=80',
    imageAlt: 'Panasonic AJ-CX4000 ENG shoulder camcorder',
  },
  {
    id: 'wt-c-sopmwtd300',
    slug: 'sony-pmw-td300-3d-shoulder-camcorder',
    name: 'Sony PMW-TD300 3CMOS Solid-State Memory 3D Shoulder Camcorder',
    category: 'cameras',
    price: 33000.0,
    sku: 'SOPMWTD300',
    mfr: 'PMWTD300',
    availability: 'Temporarily On Backorder',
    description:
      'Full HD 3D recording with dual 7× optical zoom lenses, three Exmor CMOS sensors per eye, stereo shotgun microphone included.',
    highlights: [
      'Full HD 3D stereoscopic recording',
      'Dual 7× optical zoom lens system',
      'Three Exmor CMOS sensors per channel',
      'Stereo shotgun microphone included',
    ],
    specs: [
      { label: 'Sensor', value: '3CMOS Exmor (per eye)' },
      { label: 'Resolution', value: 'Full HD 3D' },
      { label: 'Zoom', value: 'Dual 7× optical' },
      { label: 'Audio', value: 'Stereo shotgun included' },
    ],
    stock: 'preorder',
    unitsLeft: 0,
    weightLbs: 11,
    image:
      'https://images.unsplash.com/photo-1606980625402-1efea2e4ae6b?auto=format&fit=crop&w=1600&q=80',
    imageAlt: 'Sony PMW-TD300 3D shoulder camcorder',
  },
  {
    id: 'wt-c-sohdc3100l',
    slug: 'sony-hdc-3100-fiber-portable-system-camera-head',
    name: 'Sony HDC-3100 Full HD 2/3" CMOS SMPTE Fiber Portable System Camera, Head Only',
    category: 'cameras',
    price: 27140.0,
    sku: 'SOHDC3100L',
    mfr: 'HDC-3100L',
    availability: 'Temporarily On Backorder',
    description:
      '2/3" CMOS sensor, Full HD recording, XLR audio support, professional stabilization, durable field operation design. Head only.',
    highlights: [
      '2/3" CMOS sensor, Full HD recording',
      'SMPTE fiber portable system camera (head only)',
      'XLR audio support',
      'Durable field operation chassis',
    ],
    specs: [
      { label: 'Sensor', value: '2/3" CMOS' },
      { label: 'Resolution', value: 'Full HD' },
      { label: 'Interface', value: 'SMPTE fiber' },
      { label: 'Build', value: 'Head only' },
    ],
    stock: 'preorder',
    unitsLeft: 0,
    weightLbs: 9,
    image:
      'https://images.unsplash.com/photo-1617005082134-5acba47b9bdb?auto=format&fit=crop&w=1600&q=80',
    imageAlt: 'Sony HDC-3100 SMPTE fiber portable system camera head',
  },
  {
    id: 'wt-c-sopxwz450',
    slug: 'sony-pxw-z450-4k-xdcam-shoulder-camcorder',
    name: 'Sony PXW-Z450 4K XDCAM Shoulder Mount Camcorder (Body Only)',
    category: 'cameras',
    price: 24995.0,
    origPrice: 27100.0,
    sku: 'SOPXWZ450',
    mfr: 'PXW-Z450',
    availability: 'Temporarily On Backorder',
    description:
      '4K XDCAM recording, image stabilization, XLR inputs, rugged professional build, extended battery life for ENG and broadcast.',
    highlights: [
      '4K UHD XDCAM recording',
      'Shoulder-mount ENG body',
      'Dual XLR inputs',
      'Extended battery endurance',
    ],
    specs: [
      { label: 'Resolution', value: '4K XDCAM' },
      { label: 'Form Factor', value: 'Shoulder-mount' },
      { label: 'Audio', value: 'Dual XLR' },
      { label: 'Body', value: 'Body only' },
    ],
    stock: 'preorder',
    unitsLeft: 0,
    weightLbs: 9.2,
    image:
      'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?auto=format&fit=crop&w=1600&q=80',
    imageAlt: 'Sony PXW-Z450 4K XDCAM shoulder camcorder body',
  },
  {
    id: 'wt-c-sopxwx400kc',
    slug: 'sony-pxw-x400kc-xdcam-camcorder-kit-20x-manual-lens',
    name: 'Sony PXW-X400KC XDCAM 2/3" Advanced Camcorder Kit, 20x Manual Focus Lens',
    category: 'cameras',
    price: 21630.0,
    sku: 'SOPXWX400KC',
    mfr: 'PXWX400KC',
    availability: 'Temporarily On Backorder',
    description:
      '2/3" CMOS sensor camcorder kit with 20× manual focus zoom lens, shotgun microphone included, stabilization, long battery life.',
    highlights: [
      '2/3" CMOS sensor',
      '20× manual focus zoom lens included',
      'Shotgun microphone included',
      'Long-endurance battery system',
    ],
    specs: [
      { label: 'Sensor', value: '2/3" CMOS' },
      { label: 'Lens', value: '20× manual focus zoom' },
      { label: 'Audio', value: 'Shotgun mic included' },
      { label: 'Form', value: 'Shoulder camcorder kit' },
    ],
    stock: 'preorder',
    unitsLeft: 0,
    weightLbs: 9.4,
    image:
      'https://images.unsplash.com/photo-1495707902641-75cac588d2e9?auto=format&fit=crop&w=1600&q=80',
    imageAlt: 'Sony PXW-X400KC XDCAM camcorder kit',
  },
  {
    id: 'wt-c-sopxwx400kf',
    slug: 'sony-pxw-x400kf-xdcam-camcorder-16x-af-lens',
    name: 'Sony PXW-X400KF XDCAM 2/3" Weight-Balanced Camcorder, 8-128mm f/1.9 16x AF Lens',
    category: 'cameras',
    price: 21220.0,
    sku: 'SOPXWX400KF',
    mfr: 'PXWX400KF',
    availability: 'Temporarily On Backorder',
    description:
      '2/3" CMOS sensor with 16× autofocus zoom lens (8-128mm f/1.9), stereo shotgun microphone, advanced stabilization, long endurance.',
    highlights: [
      '2/3" CMOS sensor',
      '16× AF zoom lens 8-128mm f/1.9 included',
      'Stereo shotgun microphone included',
      'Weight-balanced shoulder body',
    ],
    specs: [
      { label: 'Sensor', value: '2/3" CMOS' },
      { label: 'Lens', value: '8-128mm f/1.9 16× AF' },
      { label: 'Audio', value: 'Stereo shotgun included' },
      { label: 'Form', value: 'Weight-balanced shoulder' },
    ],
    stock: 'preorder',
    unitsLeft: 0,
    weightLbs: 9.4,
    image:
      'https://images.unsplash.com/photo-1610465299996-30f240ac2b1c?auto=format&fit=crop&w=1600&q=80',
    imageAlt: 'Sony PXW-X400KF XDCAM camcorder with 16x AF lens',
  },
  {
    id: 'wt-c-sopxwx400',
    slug: 'sony-pxw-x400-xdcam-shoulder-camcorder',
    name: 'Sony PXW-X400 XDCAM 2/3" Weight-Balanced Advanced Shoulder Camcorder',
    category: 'cameras',
    price: 16995.0,
    sku: 'SOPXWX400',
    mfr: 'PXWX400',
    availability: 'Temporarily On Backorder',
    description:
      '2/3" Exmor CMOS sensors with stabilization, XLR audio support, network connectivity, low-noise low-light shooting.',
    highlights: [
      '2/3" Exmor CMOS sensors',
      'Network connectivity for live workflows',
      'Low-noise low-light shooting',
      'Weight-balanced ENG shoulder body',
    ],
    specs: [
      { label: 'Sensor', value: '2/3" Exmor CMOS' },
      { label: 'Audio', value: 'Dual XLR' },
      { label: 'Network', value: 'Built-in connectivity' },
      { label: 'Form', value: 'Weight-balanced shoulder' },
    ],
    stock: 'preorder',
    unitsLeft: 0,
    weightLbs: 9.2,
    image:
      'https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&w=1600&q=80',
    imageAlt: 'Sony PXW-X400 XDCAM shoulder camcorder body',
  },
  {
    id: 'wt-c-sopxwz300',
    slug: 'sony-pxw-z300-3-cmos-xdcam-camcorder',
    name: 'Sony PXW-Z300 3-CMOS XDCAM Camcorder',
    category: 'cameras',
    price: 8299.0,
    origPrice: 9999.0,
    sku: 'SOPXWZ300',
    mfr: 'PXW-Z300',
    availability: 'Temporarily On Backorder',
    description:
      '4K recording, 17× optical zoom, advanced stabilization, dual CFexpress / SD card slots, professional XLR audio.',
    highlights: [
      '4K UHD recording',
      '17× optical zoom',
      'Dual CFexpress + SD card slots',
      'Professional XLR audio',
    ],
    specs: [
      { label: 'Sensor', value: '3-CMOS' },
      { label: 'Resolution', value: '4K UHD' },
      { label: 'Zoom', value: '17× optical' },
      { label: 'Media', value: 'CFexpress + SD' },
    ],
    stock: 'preorder',
    unitsLeft: 0,
    weightLbs: 6.5,
    image:
      'https://images.unsplash.com/photo-1576539486916-355a7b1ca09f?auto=format&fit=crop&w=1600&q=80',
    imageAlt: 'Sony PXW-Z300 3-CMOS XDCAM camcorder',
  },
  {
    id: 'wt-c-pcagcx370',
    slug: 'panasonic-ag-cx370-uhd-4k-pro-camcorder-ndi-hx2',
    name: 'Panasonic AG-CX370 UHD 4K Pro Camcorder with NDI|HX2 and Auto-Tracking',
    category: 'cameras',
    price: 5675.29,
    sku: 'PCAGCX370',
    mfr: 'AG-CX370PJ',
    availability: 'Temporarily On Backorder',
    description:
      'UHD 4K video, 20× optical zoom, low-light performance, image stabilization, XLR audio support, NDI|HX2 + auto-tracking.',
    highlights: [
      'UHD 4K video, 20× optical zoom',
      'NDI|HX2 networking + auto-tracking',
      'Strong low-light performance',
      'XLR audio support',
    ],
    specs: [
      { label: 'Resolution', value: 'UHD 4K' },
      { label: 'Zoom', value: '20× optical' },
      { label: 'Network', value: 'NDI|HX2' },
      { label: 'Audio', value: 'XLR' },
    ],
    stock: 'preorder',
    unitsLeft: 0,
    weightLbs: 5.1,
    image:
      'https://images.unsplash.com/photo-1626025437432-8c9c8b22cabd?auto=format&fit=crop&w=1600&q=80',
    imageAlt: 'Panasonic AG-CX370 NDI camcorder',
  },
  {
    id: 'wt-c-pcagcx350',
    slug: 'panasonic-ag-cx350-4k-camcorder',
    name: 'Panasonic AG-CX350 4K Camcorder',
    category: 'cameras',
    price: 5269.91,
    sku: 'PCAGCX350',
    mfr: 'AG-CX350PJ',
    availability: 'Special Order',
    description:
      '4K video capture, 20× zoom lens, XLR audio inputs, stabilization, long battery efficiency.',
    highlights: [
      '4K UHD video capture',
      '20× zoom lens',
      'Dual XLR audio inputs',
      'Smooth image stabilization',
    ],
    specs: [
      { label: 'Resolution', value: '4K UHD' },
      { label: 'Zoom', value: '20× optical' },
      { label: 'Audio', value: 'Dual XLR' },
      { label: 'Body', value: 'Handheld pro' },
    ],
    stock: 'preorder',
    unitsLeft: 0,
    weightLbs: 4.6,
    image:
      'https://images.unsplash.com/photo-1554080353-a576cf803bda?auto=format&fit=crop&w=1600&q=80',
    imageAlt: 'Panasonic AG-CX350 4K camcorder',
  },
  {
    id: 'wt-c-pcagcx350c',
    slug: 'panasonic-ag-cx350-4k-camcorder-bundle',
    name: 'Panasonic AG-CX350 4K Camcorder, Bundle with Included Value',
    category: 'cameras',
    price: 5269.91,
    origPrice: 5489.81,
    sku: 'PCAGCX350C',
    mfr: 'AG-CX350 C',
    availability: 'Temporarily On Backorder',
    description:
      '4K recording, strong low-light capability, 20× optical zoom, dual XLR inputs, smooth image stabilization. Bundle configuration with included accessories.',
    highlights: [
      '4K UHD recording, 20× optical zoom',
      'Strong low-light capability',
      'Dual XLR inputs',
      'Bundle with included accessories',
    ],
    specs: [
      { label: 'Resolution', value: '4K UHD' },
      { label: 'Zoom', value: '20× optical' },
      { label: 'Audio', value: 'Dual XLR' },
      { label: 'Bundle', value: 'Includes accessories' },
    ],
    stock: 'preorder',
    unitsLeft: 0,
    weightLbs: 4.6,
    image:
      'https://images.unsplash.com/photo-1581590873671-49d83ec9faf6?auto=format&fit=crop&w=1600&q=80',
    imageAlt: 'Panasonic AG-CX350 camcorder bundle',
  },
  {
    id: 'wt-c01',
    slug: 'red-digital-cinema-v-raptor-x-8k-vv-dsmc3-v-mount',
    name: 'RED Digital Cinema V-RAPTOR (X) 8K VV DSMC3 Cinema Camera, V Battery Mount',
    category: 'cameras',
    price: 29995.0,
    description:
      'Flagship 8K VistaVision full-frame cinema body with global shutter. 17+ stops dynamic range, internal R3D NE + ProRes RAW capture, V-mount battery plate.',
    highlights: [
      '8K VistaVision full-frame sensor with global shutter (V-RAPTOR X)',
      'Internal R3D NE + Apple ProRes RAW, simultaneous Proxy',
      'Up to 120fps at 8K VV, 240fps at 4K',
      'DSMC3 lens mount system (RF / EF / PL adapters)',
      'Integrated V-mount battery plate for broadcast power',
    ],
    specs: [
      { label: 'Sensor', value: '8K VV 40.96 × 21.60 mm global shutter' },
      { label: 'Max Frame Rate', value: '8K @ 120fps · 4K @ 240fps' },
      { label: 'Recording', value: 'R3D NE, ProRes RAW, simultaneous Proxy' },
      { label: 'Lens Mount', value: 'DSMC3 (RF / EF / PL via adapter)' },
      { label: 'Battery', value: 'V-mount integrated plate' },
      { label: 'Weight', value: '3.7 lbs body only' },
    ],
    stock: 'low_stock',
    unitsLeft: 2,
    weightLbs: 3.7,
    image: 'https://i.imgur.com/6DIUJ0f.jpeg',
    imageAlt: 'RED Digital Cinema V-RAPTOR X 8K VV cinema camera body with V-mount battery plate',
  },
  {
    id: 'wt-c02',
    slug: 'canon-eos-r5-mark-ii-mirrorless-body',
    name: 'Canon EOS R5 Mark II Mirrorless Body',
    category: 'cameras',
    price: 3800.0,
    description:
      'Full-frame mirrorless workhorse. 45 MP stacked sensor, internal 8K RAW, eye-control AF for live operator work.',
    highlights: [
      '45 MP stacked back-illuminated full-frame sensor',
      'Internal 8K RAW + 4K 120p with no record limit',
      'Dual Pixel AF II with eye-control focus selection',
      'IBIS up to 8.5 stops with compatible RF lenses',
    ],
    specs: [
      { label: 'Sensor', value: '45 MP stacked full-frame' },
      { label: 'Max Video', value: '8K30 RAW / 4K120' },
      { label: 'Stabilization', value: '8.5-stop IBIS' },
      { label: 'Lens Mount', value: 'Canon RF' },
      { label: 'Weight', value: '1.62 lbs body only' },
    ],
    stock: 'in_stock',
    unitsLeft: 5,
    weightLbs: 1.62,
    image:
      'https://images.unsplash.com/photo-1606980625402-1efea2e4ae6b?auto=format&fit=crop&w=1600&q=80',
    imageAlt: 'Mirrorless camera body with RF mount',
  },
  {
    id: 'wt-c03',
    slug: 'sony-fx3-cinema-line-body',
    name: 'Sony FX3 Cinema Line Full-Frame Body',
    category: 'cameras',
    price: 3200.0,
    description:
      'Compact cinema-line full-frame. 4K 120p, S-Cinetone, dual-base ISO for low-light field work.',
    highlights: [
      'Full-frame back-illuminated 12.1 MP sensor, dual-base ISO',
      'Internal 4K 120p 10-bit 4:2:2 with no record limit',
      'S-Cinetone, S-Log3, custom LUT load-in',
      'Active stabilization + 5-axis IBIS, top XLR handle',
    ],
    specs: [
      { label: 'Sensor', value: '12.1 MP full-frame BSI CMOS' },
      { label: 'Max Video', value: '4K120 10-bit 4:2:2' },
      { label: 'ISO Range', value: 'Dual base 800 / 12,800' },
      { label: 'Lens Mount', value: 'Sony E' },
      { label: 'Weight', value: '1.43 lbs body only' },
    ],
    stock: 'in_stock',
    unitsLeft: 6,
    weightLbs: 1.43,
    image:
      'https://images.unsplash.com/photo-1495707902641-75cac588d2e9?auto=format&fit=crop&w=1600&q=80',
    imageAlt: 'Compact cinema camera with cage and top handle',
  },
  {
    id: 'wt-c04',
    slug: 'sony-a7-iv-mirrorless-hybrid',
    name: 'Sony α7 IV Mirrorless Hybrid Body',
    category: 'cameras',
    price: 2600.0,
    description:
      'Hybrid creator workhorse. 33 MP stills, 4K60 10-bit video, dual card slots, eye-AF for moving subjects.',
    highlights: [
      '33 MP BSI Exmor R full-frame sensor',
      '4K 60p 10-bit 4:2:2 internally, S-Log3 / S-Cinetone',
      'Real-time eye AF for human, animal, and bird subjects',
      'Dual card slots (CFexpress Type A + SD UHS-II)',
    ],
    specs: [
      { label: 'Sensor', value: '33 MP BSI full-frame' },
      { label: 'Max Video', value: '4K60 10-bit 4:2:2' },
      { label: 'Stabilization', value: '5.5-stop IBIS' },
      { label: 'Lens Mount', value: 'Sony E' },
      { label: 'Weight', value: '1.45 lbs body only' },
    ],
    stock: 'in_stock',
    unitsLeft: 8,
    weightLbs: 1.45,
    image:
      'https://images.unsplash.com/photo-1617005082134-5acba47b9bdb?auto=format&fit=crop&w=1600&q=80',
    imageAlt: 'Mirrorless hybrid camera body with E-mount',
  },

  // ── Action Cameras ────────────────────────────────────────────
  {
    id: 'wt-a01',
    slug: 'gopro-hero-13-black-creator-edition',
    name: 'GoPro HERO13 Black Creator Edition',
    category: 'action-cameras',
    price: 400.0,
    description:
      'Flagship action camera bundle. HyperSmooth 6.0, 5.3K60, integrated front light, directional shotgun mic, Volta grip.',
    highlights: [
      '5.3K60 / 4K120 / 2.7K240 slow motion',
      'HyperSmooth 6.0 stabilization, horizon lock',
      'Includes Volta extender grip, Light Mod, Media Mod with shotgun mic',
      'Waterproof to 33 ft without housing',
    ],
    specs: [
      { label: 'Max Resolution', value: '5.3K60' },
      { label: 'Slow-mo', value: '2.7K @ 240fps' },
      { label: 'Stabilization', value: 'HyperSmooth 6.0' },
      { label: 'Waterproof', value: '33 ft (no housing)' },
      { label: 'Weight', value: '0.34 lbs' },
    ],
    stock: 'in_stock',
    unitsLeft: 14,
    weightLbs: 0.34,
    image:
      'https://images.unsplash.com/photo-1526110150287-94e23ed29f17?auto=format&fit=crop&w=1600&q=80',
    imageAlt: 'Action camera with mounting accessories',
  },
  {
    id: 'wt-a02',
    slug: 'dji-osmo-action-5-pro-adventure-combo',
    name: 'DJI Osmo Action 5 Pro Adventure Combo',
    category: 'action-cameras',
    price: 400.0,
    description:
      'Dual-screen action body with 1/1.3" sensor. 4K120, RockSteady 3.0, OLED touch screens front and rear.',
    highlights: [
      '1/1.3" CMOS sensor, 13.5 stops dynamic range',
      '4K 120fps, 10-bit D-Log M color',
      'Dual front + rear OLED touch screens',
      'Waterproof to 60 ft, magnetic quick-release',
    ],
    specs: [
      { label: 'Sensor', value: '1/1.3" CMOS' },
      { label: 'Max Resolution', value: '4K120' },
      { label: 'Stabilization', value: 'RockSteady 3.0 + HorizonSteady' },
      { label: 'Waterproof', value: '60 ft' },
      { label: 'Weight', value: '0.32 lbs' },
    ],
    stock: 'in_stock',
    unitsLeft: 11,
    weightLbs: 0.32,
    image:
      'https://images.unsplash.com/photo-1610465299996-30f240ac2b1c?auto=format&fit=crop&w=1600&q=80',
    imageAlt: 'Dual-screen action camera in protective case',
  },

  // ── Drones ────────────────────────────────────────────────────
  {
    id: 'wt-d01',
    slug: 'phantom-eye-4k-thermal-tracking-drone',
    name: 'Phantom-Eye 4K Thermal Tracking Drone',
    category: 'drones',
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
    id: 'wt-d02',
    slug: 'dji-air-3s-pro-drone-kit',
    name: 'DJI Air 3S Pro Drone Kit',
    category: 'drones',
    price: 600.0,
    description:
      'Dual-camera prosumer drone. 1" CMOS wide + 3× medium tele, omnidirectional obstacle sensing, 45-minute endurance.',
    highlights: [
      'Dual cameras: 1" CMOS wide + 70mm 1/1.3" telephoto',
      'Omnidirectional obstacle sensing with LiDAR',
      '45-minute flight time, OcuSync 4 transmission',
      'Includes 3 batteries, ND filters, charging hub',
    ],
    specs: [
      { label: 'Cameras', value: '1" wide + 70mm tele' },
      { label: 'Flight Time', value: '45 min' },
      { label: 'Top Speed', value: '47 mph' },
      { label: 'Range', value: '12.4 mi (OcuSync 4)' },
      { label: 'Weight', value: '1.7 lbs' },
    ],
    stock: 'in_stock',
    unitsLeft: 16,
    weightLbs: 1.7,
    image:
      'https://images.unsplash.com/photo-1508614589041-895b88991e3e?auto=format&fit=crop&w=1600&q=80',
    imageAlt: 'Compact quadcopter drone on landing pad',
  },
  {
    id: 'wt-d03',
    slug: 'dji-mini-4-pro-travel-drone',
    name: 'DJI Mini 4 Pro Travel Drone',
    category: 'drones',
    price: 220.0,
    description:
      'Sub-249g travel drone. 4K HDR video, vertical shooting, omnidirectional obstacle sensing, FAA registration-free.',
    highlights: [
      'Under 249g — no FAA registration in many regions',
      '4K HDR video with vertical shooting mode',
      'Tri-directional obstacle sensing',
      '34-minute flight time, 20km OcuSync transmission',
    ],
    specs: [
      { label: 'Weight', value: '248 g' },
      { label: 'Max Resolution', value: '4K100 HDR' },
      { label: 'Flight Time', value: '34 min' },
      { label: 'Top Speed', value: '36 mph' },
      { label: 'Range', value: '12.4 mi' },
    ],
    stock: 'in_stock',
    unitsLeft: 22,
    weightLbs: 0.55,
    image:
      'https://images.unsplash.com/photo-1579829366248-204fe8413f31?auto=format&fit=crop&w=1600&q=80',
    imageAlt: 'Compact folding travel drone in palm of hand',
  },

  // ── Fishing ───────────────────────────────────────────────────
  {
    id: 'wt-f01',
    slug: 'garmin-livescope-plus-lvs34-bundle',
    name: 'Garmin LiveScope Plus LVS34 Forward-Looking Sonar Bundle',
    category: 'fishing',
    price: 4200.0,
    description:
      'Real-time forward and down sonar with GLS 10 black box. Pictures actual fish movement in real time.',
    highlights: [
      'Real-time forward, down, and perspective sonar views',
      'GLS 10 black box with LVS34 ultra transducer',
      'Compatible with all Garmin echoMAP and GPSMAP plotters',
      'Mounted to bow with shaft and barrel mount included',
    ],
    specs: [
      { label: 'Sonar Modes', value: 'Forward / Down / Perspective' },
      { label: 'Frequency', value: '530 / 730 / 1000 kHz' },
      { label: 'Range', value: '200 ft forward, 125 ft down' },
      { label: 'Power Draw', value: '12V @ 1.2A typical' },
      { label: 'Includes', value: 'Transducer, GLS 10 box, shaft mount' },
    ],
    stock: 'in_stock',
    unitsLeft: 4,
    weightLbs: 14,
    image:
      'https://images.unsplash.com/photo-1545566239-0a30773d8479?auto=format&fit=crop&w=1600&q=80',
    imageAlt: 'Marine sonar transducer with bow mount',
  },

  // ── Bowfishing ────────────────────────────────────────────────
  {
    id: 'wt-bf01',
    slug: 'ams-bowfishing-hooligan-x-series-bow-kit',
    name: 'AMS Bowfishing Hooligan X-Series Bow Kit',
    category: 'bowfishing',
    price: 140.0,
    description:
      'Reel-mounted bowfishing kit. 30-50 lb adjustable draw weight, Retriever Pro reel, lighted nock fiberglass arrow.',
    highlights: [
      'Adjustable 30-50 lb draw weight',
      'AMS Retriever Pro reel with 350 lb braided line',
      'Includes one Cyclone fiberglass arrow with lighted nock',
      'Ambidextrous grip, weather-sealed cams',
    ],
    specs: [
      { label: 'Draw Weight', value: '30-50 lb adjustable' },
      { label: 'Reel', value: 'AMS Retriever Pro' },
      { label: 'Arrow Speed', value: '215 fps @ 50 lb' },
      { label: 'Includes', value: '1 arrow, line spool, sight pin' },
      { label: 'Weight', value: '3.4 lbs' },
    ],
    stock: 'in_stock',
    unitsLeft: 18,
    weightLbs: 3.4,
    image:
      'https://images.unsplash.com/photo-1622390903933-c5a3b1c14e07?auto=format&fit=crop&w=1600&q=80',
    imageAlt: 'Bowfishing bow with reel attached at riverbank',
  },
  {
    id: 'wt-bf02',
    slug: 'cajun-sucker-punch-pro-bowfishing-package',
    name: 'Cajun Sucker Punch Pro Bowfishing Package',
    category: 'bowfishing',
    price: 125.0,
    description:
      'Complete bowfishing package. Sucker Punch bow, Brush Fire arrow rest, drum-style winch reel, sealed bottle reel.',
    highlights: [
      '20-50 lb adjustable draw weight, 25" axle-to-axle',
      'Brush Fire arrow rest, fingers-free release',
      'Cajun winch-style drum reel with quick-release',
      'Includes Piranha Pro arrow with stinger barb tip',
    ],
    specs: [
      { label: 'Draw Weight', value: '20-50 lb' },
      { label: 'Axle-to-Axle', value: '25"' },
      { label: 'Arrow Speed', value: '195 fps @ 50 lb' },
      { label: 'Includes', value: '1 arrow, winch reel, rest' },
      { label: 'Weight', value: '3.1 lbs' },
    ],
    stock: 'in_stock',
    unitsLeft: 21,
    weightLbs: 3.1,
    image:
      'https://images.unsplash.com/photo-1622386218426-7d2ab8e7c1b6?auto=format&fit=crop&w=1600&q=80',
    imageAlt: 'Compound bowfishing bow with reel and arrow',
  },

  // ── Hunting ───────────────────────────────────────────────────
  {
    id: 'wt-h01',
    slug: 'elite-carbon-enkore-tactical-bow-kit',
    name: 'Elite Carbon EnKore Tactical Bow Custom Kit',
    category: 'hunting',
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
    id: 'wt-h02',
    slug: 'vortex-crossfire-hd-8x42-binoculars',
    name: 'Vortex Crossfire HD 8×42 Binoculars',
    category: 'hunting',
    price: 150.0,
    description:
      'Field-ready 8×42 binoculars with HD optical system, fully multi-coated lenses, argon-purged waterproof body.',
    highlights: [
      'HD optical system with fully multi-coated lenses',
      'Argon-purged waterproof and fogproof body',
      'Adjustable eyecups, 17mm eye relief',
      'Includes deluxe glasspak harness and rain guards',
    ],
    specs: [
      { label: 'Magnification', value: '8×' },
      { label: 'Objective', value: '42 mm' },
      { label: 'Field of View', value: '393 ft @ 1000 yd' },
      { label: 'Eye Relief', value: '17 mm' },
      { label: 'Weight', value: '1.55 lbs' },
    ],
    stock: 'in_stock',
    unitsLeft: 27,
    weightLbs: 1.55,
    image:
      'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1600&q=80',
    imageAlt: 'Hunting binoculars on rock at glass-up',
  },

  // ── Camping ───────────────────────────────────────────────────
  {
    id: 'wt-cp01',
    slug: 'trailhead-recon-ultralight-camp-stool',
    name: 'Trailhead Recon Ultralight Aluminum Camp Stool',
    category: 'camping',
    price: 50.0,
    description:
      'Sub-1.4 lb folding camp stool. 7075-T6 aluminum frame, 350 lb load capacity, packs to bottle size.',
    highlights: [
      '7075-T6 aluminum frame, 350 lb load capacity',
      '1.38 lbs, packs to 15" × 4" stuff bag',
      'Rip-stop polyester seat, mildew-resistant',
      'Tool-free shock-cord assembly',
    ],
    specs: [
      { label: 'Weight', value: '1.38 lbs' },
      { label: 'Load Rating', value: '350 lbs' },
      { label: 'Seat Height', value: '13.4"' },
      { label: 'Packed Size', value: '15" × 4"' },
      { label: 'Frame', value: '7075-T6 aluminum' },
    ],
    stock: 'in_stock',
    unitsLeft: 34,
    weightLbs: 1.4,
    image:
      'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?auto=format&fit=crop&w=1600&q=80',
    imageAlt: 'Folding aluminum camp stool at sunset campsite',
  },

  // ── Audio ─────────────────────────────────────────────────────
  {
    id: 'wt-au01',
    slug: 'rodecaster-ultra-field-studio-bundle',
    name: 'RodeCaster Ultra Field Studio Bundle',
    category: 'audio',
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
    id: 'wt-au02',
    slug: 'boya-by-m1-pro-lavalier-field-mic-set',
    name: 'Boya BY-M1 Pro Lavalier Field Mic Set',
    category: 'audio',
    price: 10.0,
    description:
      'Omnidirectional lavalier with 20-foot cable, TRRS/TRS toggle, foam windscreen. Plug-and-play for phone or DSLR.',
    highlights: [
      'Omnidirectional condenser capsule',
      'TRRS / TRS toggle for phone or DSLR input',
      '20 ft cable, no battery required',
      'Includes foam windscreen and lapel clip',
    ],
    specs: [
      { label: 'Polar Pattern', value: 'Omnidirectional' },
      { label: 'Connector', value: '3.5mm TRRS / TRS' },
      { label: 'Cable Length', value: '20 ft' },
      { label: 'Power', value: 'Plug-in (no battery)' },
      { label: 'Weight', value: '0.13 lbs' },
    ],
    stock: 'in_stock',
    unitsLeft: 88,
    weightLbs: 0.13,
    image:
      'https://images.unsplash.com/photo-1590602847861-f357a9332bbc?auto=format&fit=crop&w=1600&q=80',
    imageAlt: 'Compact lavalier microphone on collar',
  },

  // ── Batteries & Power ────────────────────────────────────────
  {
    id: 'wt-p01',
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
    id: 'wt-p02',
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
    id: 'wt-p03',
    slug: 'ecoflow-delta-2-max-portable-power-station',
    name: 'EcoFlow DELTA 2 Max Portable Power Station',
    category: 'power',
    price: 700.0,
    description:
      '2048 Wh LiFePO4 power station with 2400 W AC output, X-Stream fast charge, 0-80% in 43 minutes.',
    highlights: [
      '2048 Wh LiFePO4 battery (3000+ cycles to 80%)',
      '2400 W pure-sine AC output, 3100 W X-Boost mode',
      'X-Stream charging: 0-80% in 43 minutes via AC',
      'Solar input up to 1000 W, expandable to 6 kWh',
    ],
    specs: [
      { label: 'Capacity', value: '2048 Wh' },
      { label: 'AC Output', value: '2400 W (3100 W surge)' },
      { label: 'Battery Chemistry', value: 'LiFePO4' },
      { label: 'Solar Input', value: '1000 W max' },
      { label: 'Weight', value: '50.7 lbs' },
    ],
    stock: 'in_stock',
    unitsLeft: 9,
    weightLbs: 50.7,
    image:
      'https://images.unsplash.com/photo-1640792210470-c4e1cc01c9c1?auto=format&fit=crop&w=1600&q=80',
    imageAlt: 'Portable lithium power station with cables',
  },

  // ── Connectivity ──────────────────────────────────────────────
  {
    id: 'wt-cn01',
    slug: 'apexstream-live-pack-pro-bonded-cellular-sat',
    name: 'ApexStream Live-Pack Pro (Bonded Cellular/Sat Setup)',
    category: 'connectivity',
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
    id: 'wt-cn02',
    slug: 'starlink-mini-roam-travel-kit',
    name: 'Starlink Mini Roam Travel Kit',
    category: 'connectivity',
    price: 380.0,
    description:
      'Portable satellite kit. Built-in WiFi, sub-2.4 lb dish, 100 Mbps downloads, runs on 12-48V DC or USB-PD.',
    highlights: [
      'Backpack-portable phased-array dish, 2.4 lb',
      '50-100 Mbps download, 5-20 Mbps upload',
      'Powered via 12-48V DC or USB-PD (battery-friendly)',
      'Onboard WiFi 5 router, no separate hardware required',
    ],
    specs: [
      { label: 'Throughput', value: '50-100 Mbps down / 5-20 Mbps up' },
      { label: 'Latency', value: '~25 ms median' },
      { label: 'Power', value: '20-40 W typical' },
      { label: 'Weight', value: '2.4 lbs' },
      { label: 'Service Tier', value: 'Roam, $50-150/mo' },
    ],
    stock: 'in_stock',
    unitsLeft: 7,
    weightLbs: 2.4,
    image:
      'https://images.unsplash.com/photo-1614027164847-1b28cfe1df60?auto=format&fit=crop&w=1600&q=80',
    imageAlt: 'Compact satellite internet kit on tripod',
  },
  {
    id: 'wt-cn03',
    slug: 'peplink-br1-mini-lte-bonded-cellular-router',
    name: 'Peplink BR1 Mini LTE Bonded Cellular Router',
    category: 'connectivity',
    price: 210.0,
    description:
      'Single-modem CAT-7 LTE router with InControl 2 management. Bondable with multiple BR1s for redundant uplink.',
    highlights: [
      'CAT-7 LTE-A modem, dual SIM with auto-failover',
      'SpeedFusion-ready for site-to-site bonding',
      'WiFi 5 dual-band, GbE WAN + LAN',
      '12-30V DC input, ignition sense for vehicle install',
    ],
    specs: [
      { label: 'Modem', value: 'CAT-7 LTE-A (300 Mbps down)' },
      { label: 'SIM Slots', value: '2 (active + standby)' },
      { label: 'Power', value: '12-30V DC' },
      { label: 'WiFi', value: 'Dual-band 802.11ac' },
      { label: 'Weight', value: '0.99 lbs' },
    ],
    stock: 'in_stock',
    unitsLeft: 12,
    weightLbs: 0.99,
    image:
      'https://images.unsplash.com/photo-1605810230434-7631ac76ec81?auto=format&fit=crop&w=1600&q=80',
    imageAlt: 'Compact cellular router with antennas',
  },

  // ── Kayaks & Boats ────────────────────────────────────────────
  {
    id: 'wt-k01',
    slug: 'pelican-catch-mode-110-sit-on-top-fishing-kayak',
    name: 'Pelican Catch Mode 110 Sit-On-Top Fishing Kayak',
    category: 'kayaks',
    price: 430.0,
    description:
      '10\'8" sit-on-top fishing kayak. RAM-X impact-resistant hull, ERGOCAST seat, two rod holders, accessory rails.',
    highlights: [
      '10\'8" RAM-X hull, 350 lb load capacity',
      'ERGOCAST G2 elevated seat with mesh back',
      'Two flush rod holders, one rod tip protector',
      'Stand-up platform with pads, accessory rails port + starboard',
    ],
    specs: [
      { label: 'Length', value: "10' 8\"" },
      { label: 'Width', value: '34"' },
      { label: 'Weight (kayak)', value: '64 lbs' },
      { label: 'Capacity', value: '350 lbs' },
      { label: 'Hull', value: 'RAM-X impact polyethylene' },
    ],
    stock: 'in_stock',
    unitsLeft: 5,
    weightLbs: 64,
    image:
      'https://images.unsplash.com/photo-1502920514313-52581002a659?auto=format&fit=crop&w=1600&q=80',
    imageAlt: 'Fishing kayak with rod holders on water',
  },
  {
    id: 'wt-k02',
    slug: 'lifetime-tamarack-angler-pro-10-fishing-kayak',
    name: 'Lifetime Tamarack Angler Pro 10 ft Fishing Kayak',
    category: 'kayaks',
    price: 250.0,
    description:
      '10-ft sit-on-top fishing kayak. UV-protected high-density polyethylene hull, three rod holders, paddle clip.',
    highlights: [
      'UV-protected high-density polyethylene hull',
      'Three rod holders (2 flush, 1 swivel)',
      'Adjustable padded backrest, paddle keeper',
      'Front and rear T-handles for transport',
    ],
    specs: [
      { label: 'Length', value: "10' 0\"" },
      { label: 'Width', value: '31"' },
      { label: 'Weight (kayak)', value: '52 lbs' },
      { label: 'Capacity', value: '275 lbs' },
      { label: 'Hull', value: 'UV-treated HDPE' },
    ],
    stock: 'in_stock',
    unitsLeft: 11,
    weightLbs: 52,
    image:
      'https://images.unsplash.com/photo-1572125675722-238a4f1f8ea3?auto=format&fit=crop&w=1600&q=80',
    imageAlt: 'Sit-on-top fishing kayak on shore at dawn',
  },

  // ── Storage & SSDs ────────────────────────────────────────────
  {
    id: 'wt-s01',
    slug: 'samsung-t9-portable-ssd-2tb',
    name: 'Samsung T9 Portable SSD 2TB USB-C 20Gbps',
    category: 'storage',
    price: 160.0,
    description:
      'USB 3.2 Gen 2×2 SSD with sustained 2000 MB/s reads. AES-256 hardware encryption, 3 m drop rating.',
    highlights: [
      'USB 3.2 Gen 2×2 (20 Gbps), 2000 MB/s sequential read',
      'AES-256 hardware encryption with password protection',
      '3 m drop rating, rubberized chassis',
      'Compatible Windows / macOS / Android / iPad Pro',
    ],
    specs: [
      { label: 'Capacity', value: '2 TB' },
      { label: 'Interface', value: 'USB 3.2 Gen 2×2 (20 Gbps)' },
      { label: 'Read / Write', value: '2000 / 1950 MB/s' },
      { label: 'Drop Rating', value: '3 m' },
      { label: 'Weight', value: '0.27 lbs' },
    ],
    stock: 'in_stock',
    unitsLeft: 32,
    weightLbs: 0.27,
    image:
      'https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?auto=format&fit=crop&w=1600&q=80',
    imageAlt: 'Portable SSD on dark desk with USB-C cable',
  },

  // ── Mounts ────────────────────────────────────────────────────
  {
    id: 'wt-m01',
    slug: 'smallrig-ct-30-carbon-fiber-travel-tripod',
    name: 'SmallRig CT-30 Carbon Fiber Travel Tripod',
    category: 'mounts',
    price: 130.0,
    description:
      '5-section carbon-fiber travel tripod. 28.7 lb load rating, 65" max height, packs to 17.7" length.',
    highlights: [
      '10-layer carbon-fiber legs, 5-section quick-lock',
      '28.7 lb load capacity, 65" max height',
      'Reversible center column, monopod conversion',
      'Removable ball head with Arca-Swiss QR plate',
    ],
    specs: [
      { label: 'Material', value: '10-layer carbon fiber' },
      { label: 'Max Height', value: '65"' },
      { label: 'Folded Length', value: '17.7"' },
      { label: 'Load Capacity', value: '28.7 lbs' },
      { label: 'Weight', value: '3.1 lbs' },
    ],
    stock: 'in_stock',
    unitsLeft: 24,
    weightLbs: 3.1,
    image:
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=1600&q=80',
    imageAlt: 'Carbon-fiber travel tripod folded with ball head',
  },

  // ── Knives & Tools ────────────────────────────────────────────
  {
    id: 'wt-kn01',
    slug: 'vosteed-damascus-master-forge-cleaver-game-set',
    name: 'Vosteed Damascus Master-Forge Cleaver & Game Set',
    category: 'knives',
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

export function populatedCategories(): Category[] {
  return CATEGORIES.filter((c) => productsByCategory(c.id).length > 0);
}
