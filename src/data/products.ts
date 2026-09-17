import type { PoultryProduct } from '../types.ts';

export const INITIAL_PRODUCTS: PoultryProduct[] = [
  // Chicken Accessories
  {
    id: 'prod-feeder-25',
    name: 'AutoFeeder-Pro 25lb Gravity Feeder',
    category: 'chicken_accessories',
    price: 48.99,
    stock: 45,
    rating: 4.9,
    badge: 'Best Seller',
    description: 'Rainproof, rat-proof automatic gravity poultry feeder with 4 contoured anti-spill feeding ports.',
    specifications: [
      '25 lb feed capacity (lasts 10 hens ~12 days)',
      'Weatherproof overhang prevents wet moldy feed',
      'Food-grade BPA-free heavy wall polypropylene',
      'Anti-scratch baffles prevent feed flinging waste'
    ],
    recommendedFlockSize: '6 - 20 birds',
    inStock: true,
    iconType: 'feeder'
  },
  {
    id: 'prod-waterer-heated',
    name: 'FrostGuard 5-Gal Heated Nipple Drinker',
    category: 'chicken_accessories',
    price: 59.99,
    stock: 28,
    rating: 4.8,
    badge: 'Anti-Freeze 120V',
    description: 'Sub-zero thermostatically controlled heated waterer with 4 horizontal freeze-proof brass nipples.',
    specifications: [
      'Built-in 60W thermostat turns on at 35°F (2°C)',
      '5-gallon high-capacity reservoir with easy top-fill lid',
      'Clean closed-system prevents droppings and debris in water',
      'Tested to -15°F (-26°C) continuous cold'
    ],
    recommendedFlockSize: '10 - 30 birds',
    inStock: true,
    iconType: 'waterer'
  },
  {
    id: 'prod-nest-rollaway',
    name: 'RollAway 4-Bay Aluminum Nesting Box',
    category: 'chicken_accessories',
    price: 89.50,
    stock: 19,
    rating: 4.9,
    badge: 'Egg Protection',
    description: 'Sloped floor design gently rolls fresh eggs into a protected front collection tray, preventing egg eating and manure stains.',
    specifications: [
      '4 spacious private compartments (12" x 12" each)',
      'Rust-proof galvanized steel and rust-resistant aluminum',
      'Hinged collection lid for easy, clean egg harvesting',
      'Includes 4 washable synthetic nesting pads'
    ],
    recommendedFlockSize: '12 - 24 laying hens',
    inStock: true,
    iconType: 'nest'
  },
  {
    id: 'prod-brooder-plate',
    name: 'ThermaBrood Digital Chick Brooder Plate',
    category: 'chicken_accessories',
    price: 44.00,
    stock: 35,
    rating: 4.7,
    badge: 'Safe Heating',
    description: 'Fire-safe radiant heating plate mimicking a mother hen with adjustable height legs and precision thermostat.',
    specifications: [
      '12" x 12" heating surface warms up to 25 chicks',
      'Low 22W energy consumption (zero fire hazard vs heat lamps)',
      'Adjustable 4-post leg height from 1.5" to 7"',
      'Cone top guard prevents chicks from perching and pooping on top'
    ],
    recommendedFlockSize: 'Up to 25 chicks',
    inStock: true,
    iconType: 'heater'
  },
  {
    id: 'prod-solar-door',
    name: 'SolarCluck Automatic Coop Door Opener',
    category: 'chicken_accessories',
    price: 95.00,
    stock: 14,
    rating: 4.9,
    badge: 'Predator-Proof',
    description: 'Solar-powered automatic coop door with light-sensor and digital timer to secure flock against foxes, raccoons, and hawks.',
    specifications: [
      'Dual power: High-efficiency solar panel + backup USB-C rechargeable battery',
      'Self-locking anti-pinch safety sensor re-opens if a hen is under door',
      'Heavy-duty all-aluminum door frame and runner tracks',
      'Operates seamlessly in rain, snow, and extreme heat'
    ],
    recommendedFlockSize: 'All coop types',
    inStock: true,
    iconType: 'door'
  },
  {
    id: 'prod-perch-ladder',
    name: 'Multi-Tier Hardwood Roosting Perch Ladder',
    category: 'chicken_accessories',
    price: 36.50,
    stock: 22,
    rating: 4.6,
    badge: 'Natural Wood',
    description: 'Sturdy 4-tier rounded hardwood roosting ladder designed for optimal foot grip and nighttime warmth aggregation.',
    specifications: [
      'Rounded 2" wide roosting bars prevent bumblefoot and foot sores',
      'Staggered tiers reduce nighttime pecking order conflicts',
      'Smooth sanded cedar wood resistant to moisture and mites',
      'Foldable design for quick coop wall cleaning access'
    ],
    recommendedFlockSize: '8 - 18 birds',
    inStock: true,
    iconType: 'perch'
  },
  {
    id: 'prod-hen-saddles',
    name: 'HenGuard Feather Protective Saddles (Pack of 5)',
    category: 'chicken_accessories',
    price: 22.00,
    stock: 50,
    rating: 4.8,
    badge: 'Hen Protection',
    description: 'Breathable canvas hen aprons protecting backs and wings from aggressive roosters, feather pecking, and talon scratches.',
    specifications: [
      'Pack of 5 durable cotton-canvas saddles with elastic wing loops',
      'Allows feathers to regrow without isolating the hen',
      'Integrated reflective strip for predator visibility',
      'Machine washable and rot-resistant'
    ],
    recommendedFlockSize: 'Any flock with active roosters',
    inStock: true,
    iconType: 'bundle'
  },
  {
    id: 'prod-grit-dispenser',
    name: 'DualPort Oyster Shell & Grit Gravity Dispenser',
    category: 'chicken_accessories',
    price: 19.99,
    stock: 40,
    rating: 4.7,
    description: 'Wall-mounted partitioned gravity feeder ensuring laying hens always have access to free-choice insoluble grit and calcium.',
    specifications: [
      'Split 8 lb dual chamber for calcium oyster shell & granite grit',
      'Wall-mount bracket keeps mineral supplements clean and off bedding',
      'Weather-tight lid protects from rain and debris'
    ],
    recommendedFlockSize: '5 - 30 birds',
    inStock: true,
    iconType: 'feeder'
  },

  // Cleaning Instruments
  {
    id: 'prod-scraper-hd',
    name: 'Heavy-Duty Stainless Coop Manure Scraper',
    category: 'cleaning_instruments',
    price: 34.99,
    stock: 38,
    rating: 5.0,
    badge: 'Pro Grade Tool',
    description: 'Ergonomic 45-degree angled stainless steel blade specifically engineered to strip hardened droppings from roosts and drop-boards.',
    specifications: [
      'Thick 2.5mm hardened stainless steel scraper head with bevel edge',
      'Telescoping aircraft aluminum handle extends from 36" to 60"',
      'Non-slip ergonomic rubberized dual-grip handles',
      'Rust-proof and resistant to harsh chemical disinfectants'
    ],
    recommendedFlockSize: 'All coop sizes',
    inStock: true,
    iconType: 'scraper'
  },
  {
    id: 'prod-pressure-foamer',
    name: 'BioFoam High-Pressure Coop Sanitizer Wand',
    category: 'cleaning_instruments',
    price: 42.50,
    stock: 24,
    rating: 4.8,
    badge: 'Biosecurity Wash',
    description: 'Adjustable chemical foam applicator connects to garden hose or pressure washer to blast disinfecting lather into coop wall cracks.',
    specifications: [
      'Dense clinging foam clings to vertical coop walls and nesting cracks',
      'Adjustable 0-5 ratio metering dial for sanitizers and degreasers',
      'Brass quick-connect fittings and wide-fan spray nozzle',
      'Translucent 1-liter chemical reservoir with measurement marks'
    ],
    recommendedFlockSize: 'Medium to large barns & coops',
    inStock: true,
    iconType: 'sprayer'
  },
  {
    id: 'prod-boot-bath',
    name: 'BioGuard Biosecurity Boot Dip Wash Station',
    category: 'cleaning_instruments',
    price: 38.00,
    stock: 30,
    rating: 4.9,
    badge: 'Disease Prevention',
    description: 'Essential poultry farm biosecurity station with thousands of rubber scrub fingers that scrape boot soles while immersing in disinfectant.',
    specifications: [
      'Deep 2.5" liquid reservoir holds 2.5 gallons of disinfectant bath',
      'Dense rubber scrub fingers dislodge manure from boot treads',
      'Thick vulcanized rubber base prevents tipping and slipping',
      'Stops avian flu, salmonella, and coccidiosis transfer between coops'
    ],
    recommendedFlockSize: 'Recommended for all poultry keepers',
    inStock: true,
    iconType: 'bootbath'
  },
  {
    id: 'prod-wire-brush',
    name: 'SteelBristle Roost & Dropping Scrub Brush',
    category: 'cleaning_instruments',
    price: 18.50,
    stock: 65,
    rating: 4.7,
    description: 'Hard tempered-carbon steel bristle scrubbing brush with integrated steel chisel scraper for tight corners and perch crevices.',
    specifications: [
      'Heavy-duty carbon wire bristles break up dried organic matter',
      'Heavy cast chisel tip chips off stubborn dried droppings',
      'Molded comfort grip with knuckle guard'
    ],
    recommendedFlockSize: 'Essential cleaning accessory',
    inStock: true,
    iconType: 'brush'
  },
  {
    id: 'prod-sift-rake',
    name: 'ErgoSift Deep-Bedding Poop Rake & Scoop',
    category: 'cleaning_instruments',
    price: 29.99,
    stock: 27,
    rating: 4.8,
    badge: 'Sand & Shaving Sifter',
    description: 'Precision wire-sifting rake that separates chicken droppings from sand, hemp bedding, or pine shavings in seconds without back strain.',
    specifications: [
      '5mm stainless steel mesh sifts clean bedding while retaining manure',
      'Extra-wide 10" scoop mouth cuts daily coop cleaning time in half',
      'Lightweight reinforced aluminum shaft with D-handle grip'
    ],
    recommendedFlockSize: 'Ideal for sand, hemp & shaving coops',
    inStock: true,
    iconType: 'rake'
  },
  {
    id: 'prod-fogger-ulv',
    name: 'AviFog Ultra-Low Volume Biosecurity Sanitizing Fogger',
    category: 'cleaning_instruments',
    price: 129.00,
    stock: 12,
    rating: 4.9,
    badge: 'Commercial Grade',
    description: 'Electric cold mist fogger dispersing micro-droplets (20-50 microns) to sanitize entire poultry coops, killing airborne mites and bacteria.',
    specifications: [
      '1200W high-speed motor throws disinfectant mist up to 25 feet',
      'Penetrates deep into feather dust, roof rafters, and wall crevices',
      '4.5-liter tank capacity with adjustable flow rate regulator',
      'Essential for end-of-season deep sanitization and mite control'
    ],
    recommendedFlockSize: 'Homesteads & Commercial Poultry Barns',
    inStock: true,
    iconType: 'fogger'
  },
  {
    id: 'prod-cleaner-gallon',
    name: 'EcoCluck Enzymatic Coop Sanitizer & Ammonia Neutralizer (1 Gal)',
    category: 'cleaning_instruments',
    price: 32.00,
    stock: 45,
    rating: 4.9,
    badge: '100% Bio-Safe',
    description: 'Bio-enzymatic poultry-safe cleaning solution that dissolves uric acid, removes ammonia smell, and eliminates respiratory irritants.',
    specifications: [
      'Concentrated formula makes up to 16 gallons of cleaning solution',
      'Safe around chicks and laying hens - non-toxic, bleach-free',
      'Naturally breaks down dried manure and organic stains',
      'Pleasant natural eucalyptus and peppermint scent deters pests'
    ],
    recommendedFlockSize: 'All coops & runs',
    inStock: true,
    iconType: 'sprayer'
  },

  // Bundle Kits
  {
    id: 'bundle-homestead-starter',
    name: 'Complete Homestead Poultry & Coop Care Kit',
    category: 'bundle_kits',
    price: 199.00,
    stock: 15,
    rating: 5.0,
    badge: 'Save $28 • Starter Pack',
    description: 'Everything needed to feed, water, and sanitize a flock: 25lb AutoFeeder + 5-Gal Heated Drinker + Stainless Scraper + 1 Gal EcoCluck Sanitizer.',
    specifications: [
      'Includes AutoFeeder-Pro 25lb with 4 ports',
      'Includes FrostGuard 5-Gal Heated Waterer',
      'Includes Heavy-Duty Stainless Steel Manure Scraper',
      'Includes 1 Gallon EcoCluck Bio-Safe Cleaner'
    ],
    recommendedFlockSize: '10 - 25 birds',
    inStock: true,
    iconType: 'bundle'
  },
  {
    id: 'bundle-biosecurity-station',
    name: 'Complete BioSecurity Farm Sanitization Station',
    category: 'bundle_kits',
    price: 119.00,
    stock: 20,
    rating: 4.9,
    badge: 'Save $18 • Health Shield',
    description: 'Comprehensive coop bio-sanitation kit: BioGuard Boot Dip Station + BioFoam Pressure Wand + SteelBristle Brush + 1 Gal Sanitizer concentrate.',
    specifications: [
      'Stop avian illnesses from entering the coop',
      'Covers boot disinfection, wall foam cleaning, and perch scrubbing',
      'Recommended by avian veterinarians and biosecurity inspectors'
    ],
    recommendedFlockSize: 'Any flock requiring biosecurity protocol',
    inStock: true,
    iconType: 'bundle'
  }
];
