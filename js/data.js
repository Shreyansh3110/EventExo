/**
 * EventFlow AI & EventrixControl - Central Data Engine
 * Synchronized with LocalStorage for all 12 platform modules.
 */

const STORAGE_KEYS = {
  EVENTS: 'eventflow_events',
  VENDORS: 'eventflow_vendors',
  INVENTORY: 'eventflow_inventory',
  DECOR: 'eventflow_decor',
  CLIENT_TASKS: 'eventflow_client_tasks',
  ANALYTICS: 'eventflow_analytics'
};

// 1. Initial Mock Events (Weddings, Corporate, Birthdays, Galas)
const DEFAULT_EVENTS = [
  {
    id: "EVT-2027-01",
    title: "Aura Tech Global Summit 2027",
    clientName: "Nexus Digital Corp",
    type: "Corporate",
    date: "2027-04-18",
    time: "09:00 AM",
    venue: "Metropolitan Grand Ballroom, SF",
    guests: 450,
    budget: 65000,
    spent: 58200,
    status: "Confirmed",
    theme: "Cyberpunk Neon & Modern Minimalist",
    assignedVendors: ["VND-01", "VND-04", "VND-05"],
    description: "Multi-track tech conference with keynotes, VIP dinner, and product demo pods."
  },
  {
    id: "EVT-2027-02",
    title: "Sophia & Lucas Royal Wedding",
    clientName: "Sophia Montgomery",
    type: "Wedding",
    date: "2027-05-22",
    time: "04:30 PM",
    venue: "Rosewood Heritage Estate, Napa",
    guests: 220,
    budget: 48000,
    spent: 44500,
    status: "Confirmed",
    theme: "Royal Vintage & Grand Floral",
    assignedVendors: ["VND-02", "VND-03", "VND-06"],
    description: "Luxury outdoor vineyard ceremony followed by a black-tie ballroom banquet."
  },
  {
    id: "EVT-2027-03",
    title: "Luminescence 30th Birthday Gala",
    clientName: "Elena Rostova",
    type: "Birthday",
    date: "2027-06-12",
    time: "07:00 PM",
    venue: "Skyline Penthouse Terrace",
    guests: 110,
    budget: 18500,
    spent: 12000,
    status: "In Progress",
    theme: "Bohemian Chic & Ambient Starlight",
    assignedVendors: ["VND-01", "VND-05"],
    description: "Exclusive rooftop birthday gala with craft cocktail bars and ambient acoustic sets."
  },
  {
    id: "EVT-2027-04",
    title: "VentureFront Annual Investor Dinner",
    clientName: "VentureFront Partners",
    type: "Corporate",
    date: "2027-07-08",
    time: "06:30 PM",
    venue: "SF Modern Art Museum Pavilion",
    guests: 85,
    budget: 25000,
    spent: 15400,
    status: "In Progress",
    theme: "Contemporary Luxury & Art Deco",
    assignedVendors: ["VND-01", "VND-03"],
    description: "Intimate curated dinner for top tech executives, angel syndicates, and founders."
  },
  {
    id: "EVT-2027-05",
    title: "Maya & Ethan Coastal Elopement",
    clientName: "Maya Lin",
    type: "Wedding",
    date: "2027-08-14",
    time: "05:00 PM",
    venue: "Carmel Oceanfront Bluffs",
    guests: 60,
    budget: 16000,
    spent: 6200,
    status: "Budgeting",
    theme: "Ethereal Sunset & Coastal Pampas",
    assignedVendors: ["VND-02", "VND-06"],
    description: "Intimate seaside ceremony with driftwoods, custom acoustic duo, and candlelit pergola."
  },
  {
    id: "EVT-2027-06",
    title: "Quantum Leap Product Launch",
    clientName: "Synthetix Inc",
    type: "Corporate",
    date: "2027-09-10",
    time: "10:00 AM",
    venue: "City Center Exhibition Center",
    guests: 350,
    budget: 38000,
    spent: 0,
    status: "Budgeting",
    theme: "Futuristic Glass & Holographic",
    assignedVendors: ["VND-04"],
    description: "Interactive keynote staging, hands-on developer experience labs, and live stream."
  }
];

// 2. Curated Decoration Themes Catalog
const DEFAULT_DECOR = [
  {
    id: "DEC-01",
    name: "Royal Vintage Grandeur",
    category: "Luxury Wedding & Gala",
    palette: ["#4A0E17", "#D4AF37", "#F5F5DC", "#2F3E46"],
    paletteNames: ["Deep Burgundy", "Warm Gold", "Champagne Cream", "Forest Slate"],
    priceRange: "$6,500 - $14,000",
    image: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80",
    inclusions: [
      "Crystal Chandelier Cascades",
      "Antique Brass Candelabras",
      "Velvet Draping & Vintage Urns",
      "Garden Rose & Peony Centerpieces"
    ]
  },
  {
    id: "DEC-02",
    name: "Cyberpunk Neon & Modern Minimalist",
    category: "Tech Summit & Brand Activations",
    palette: ["#0B0F19", "#06B6D4", "#8B5CF6", "#F43F5E"],
    paletteNames: ["Obsidian Black", "Cyan Neon", "Electric Purple", "Laser Pink"],
    priceRange: "$5,000 - $12,500",
    image: "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=800&q=80",
    inclusions: [
      "Programmable RGB LED Accent Tubes",
      "Custom Acrylic Glow Signage",
      "Geometric Matte Black Staging",
      "Holographic Projection Backdrops"
    ]
  },
  {
    id: "DEC-03",
    name: "Bohemian Sunset Chic",
    category: "Birthdays & Outdoor Weddings",
    palette: ["#D97706", "#F97316", "#FEF08A", "#78350F"],
    paletteNames: ["Terracotta", "Sunset Ochre", "Warm Flax", "Desert Clay"],
    priceRange: "$3,800 - $8,500",
    image: "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?auto=format&fit=crop&w=800&q=80",
    inclusions: [
      "Natural Pampas Grass Floral Arches",
      "Handwoven Rattan Pendant Lanterns",
      "Persian Style Rug Aisle Runners",
      "Low Wood Feasting Tables & Moroccan Cushions"
    ]
  },
  {
    id: "DEC-04",
    name: "Enchanted Garden Floral",
    category: "Weddings & Anniversaries",
    palette: ["#15803D", "#F472B6", "#E0E7FF", "#FAF5FF"],
    paletteNames: ["Emerald Ivy", "Blush Petal", "Mist Lavender", "Porcelain White"],
    priceRange: "$7,000 - $16,000",
    image: "https://images.unsplash.com/photo-1519225424980-496057d07817?auto=format&fit=crop&w=800&q=80",
    inclusions: [
      "Suspended Greenery & Wisteria Ceiling Canopy",
      "Mirror-Top Banquet Tables",
      "Delphinium & White Hydrangea Pillars",
      "Fairy Light Waterfall Wall"
    ]
  }
];

// 3. Verified Vendors Directory
const DEFAULT_VENDORS = [
  {
    id: "VND-01",
    name: "Epicurean Elite Catering",
    category: "Catering & Bar",
    rating: 4.9,
    priceRange: "$$$$",
    contact: "chef.antoine@epicurean.com",
    phone: "+1 (415) 890-4122",
    status: "Contract Signed",
    description: "Michelin-experienced culinary team specializing in farm-to-table tasting menus and artisanal cocktails."
  },
  {
    id: "VND-02",
    name: "Lumiere Fine Art Photography",
    category: "Photography & Cinema",
    rating: 5.0,
    priceRange: "$$$",
    contact: "hello@lumierecinema.com",
    phone: "+1 (415) 762-9011",
    status: "Confirmed",
    description: "Documentary-style cinematic wedding and corporate gala photography with drone coverage."
  },
  {
    id: "VND-03",
    name: "Botanica Artisans",
    category: "Florist & Decor",
    rating: 4.8,
    priceRange: "$$$",
    contact: "orders@botanicafloral.com",
    phone: "+1 (415) 341-8977",
    status: "Confirmed",
    description: "Master floral sculptors creating breathtaking suspended installations and botanical arches."
  },
  {
    id: "VND-04",
    name: "Apex Sound & Stage AV",
    category: "Audio & Lighting",
    rating: 4.9,
    priceRange: "$$$$",
    contact: "events@apexsoundstage.com",
    phone: "+1 (415) 551-7890",
    status: "Contract Signed",
    description: "Full-service concert-grade line arrays, theatrical moving heads, and 4K LED video walls."
  },
  {
    id: "VND-05",
    name: "DJ Nova & The Brass Collective",
    category: "Entertainment",
    rating: 4.7,
    priceRange: "$$",
    contact: "booking@djnovalive.com",
    phone: "+1 (415) 912-3344",
    status: "In Progress",
    description: "High-energy hybrid live band + DJ blending modern remixes with live horn sections."
  },
  {
    id: "VND-06",
    name: "Napa Valley Vintage Rentals",
    category: "Furniture & Decor",
    rating: 4.8,
    priceRange: "$$",
    contact: "rentals@napavintage.com",
    phone: "+1 (707) 431-2299",
    status: "Pending Deposit",
    description: "Curated collection of Louis XVI chairs, rustic farm tables, and vintage lounge sets."
  }
];

// 4. Equipment & Inventory Rental Catalog
const DEFAULT_INVENTORY = [
  {
    id: "INV-01",
    name: "Gold Chiavari Chairs with Ivory Cushions",
    category: "Seating & Furniture",
    totalStock: 500,
    inUse: 320,
    available: 180,
    pricePerDay: 8.50,
    status: "In Stock"
  },
  {
    id: "INV-02",
    name: "Solid Oak Rustic Farm Banquet Tables (8ft)",
    category: "Seating & Furniture",
    totalStock: 60,
    inUse: 45,
    available: 15,
    pricePerDay: 45.00,
    status: "In Stock"
  },
  {
    id: "INV-03",
    name: "Curved 4K Ultra-HD LED Video Wall (16x9 ft)",
    category: "AV & Lighting",
    totalStock: 4,
    inUse: 3,
    available: 1,
    pricePerDay: 2400.00,
    status: "Low Stock"
  },
  {
    id: "INV-04",
    name: "Vintage Crystal Chandelier Cascades (36-inch)",
    category: "Lighting & Decor",
    totalStock: 24,
    inUse: 18,
    available: 6,
    pricePerDay: 180.00,
    status: "In Stock"
  },
  {
    id: "INV-05",
    name: "Circular Gold Floral Archway & Base",
    category: "Stage & Arch",
    totalStock: 12,
    inUse: 10,
    available: 2,
    pricePerDay: 220.00,
    status: "Low Stock"
  },
  {
    id: "INV-06",
    name: "Wireless RGB Up-Lighting Fixtures (Pack of 12)",
    category: "AV & Lighting",
    totalStock: 40,
    inUse: 35,
    available: 5,
    pricePerDay: 150.00,
    status: "Low Stock"
  },
  {
    id: "INV-07",
    name: "Low-Lying Heavy Dry Ice Fog Machine",
    category: "Special Effects",
    totalStock: 6,
    inUse: 2,
    available: 4,
    pricePerDay: 350.00,
    status: "In Stock"
  }
];

// 5. Client Planning Checklist & Milestones
const DEFAULT_CLIENT_TASKS = [
  { id: "TSK-01", title: "Confirm Venue & Sign Rental Contract", deadline: "8 Months Out", completed: true, category: "Venue" },
  { id: "TSK-02", title: "Design Palette & Floral Concept Approval", deadline: "6 Months Out", completed: true, category: "Design" },
  { id: "TSK-03", title: "Tasting Session & Menu Selection", deadline: "4 Months Out", completed: true, category: "Catering" },
  { id: "TSK-04", title: "Send Save-The-Dates & RSVP Portal Launch", deadline: "3 Months Out", completed: true, category: "Guests" },
  { id: "TSK-05", title: "Final Seating Chart & Dietary Submissions", deadline: "3 Weeks Out", completed: false, category: "Operations" },
  { id: "TSK-06", title: "Rehearsal Walkthrough & Vendor Handover", deadline: "1 Week Out", completed: false, category: "Day-of" },
  { id: "TSK-07", title: "Final Invoice Settlement", deadline: "3 Days Out", completed: false, category: "Finance" }
];

// LocalStorage Helper Getters / Setters
function getData(key, defaultVal) {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) {
      localStorage.setItem(key, JSON.stringify(defaultVal));
      return defaultVal;
    }
    return JSON.parse(raw);
  } catch(e) {
    console.error(`Error reading ${key}`, e);
    return defaultVal;
  }
}

function setData(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch(e) {
    console.error(`Error writing ${key}`, e);
  }
}

// Public API
const EventDataStore = {
  getEvents: () => getData(STORAGE_KEYS.EVENTS, DEFAULT_EVENTS),
  saveEvent: (evt) => {
    const list = EventDataStore.getEvents();
    list.unshift(evt);
    setData(STORAGE_KEYS.EVENTS, list);
    return list;
  },
  updateEventStatus: (id, newStatus) => {
    const list = EventDataStore.getEvents();
    const target = list.find(e => e.id === id);
    if (target) {
      target.status = newStatus;
      setData(STORAGE_KEYS.EVENTS, list);
    }
    return list;
  },
  getVendors: () => getData(STORAGE_KEYS.VENDORS, DEFAULT_VENDORS),
  saveVendor: (vendor) => {
    const list = EventDataStore.getVendors();
    list.unshift(vendor);
    setData(STORAGE_KEYS.VENDORS, list);
    return list;
  },
  getInventory: () => getData(STORAGE_KEYS.INVENTORY, DEFAULT_INVENTORY),
  saveInventoryItem: (item) => {
    const list = EventDataStore.getInventory();
    list.unshift(item);
    setData(STORAGE_KEYS.INVENTORY, list);
    return list;
  },
  getDecorThemes: () => getData(STORAGE_KEYS.DECOR, DEFAULT_DECOR),
  getClientTasks: () => getData(STORAGE_KEYS.CLIENT_TASKS, DEFAULT_CLIENT_TASKS),
  toggleClientTask: (id) => {
    const list = EventDataStore.getClientTasks();
    const task = list.find(t => t.id === id);
    if (task) {
      task.completed = !task.completed;
      setData(STORAGE_KEYS.CLIENT_TASKS, list);
    }
    return list;
  }
};
