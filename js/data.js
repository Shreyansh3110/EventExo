/**
 * EventFlow Studio & EventrixControl - Central Data Engine (v3 - INR Edition)
 * Indian Rupee (INR / ₹) Master Store with reactive LocalStorage persistence.
 */

const STORAGE_KEYS = {
  VERSION: 'eventflow_v3_inr',
  EVENTS: 'eventflow_events_v3',
  VENDORS: 'eventflow_vendors_v3',
  INVENTORY: 'eventflow_inventory_v3',
  DECOR: 'eventflow_decor_v3',
  CLIENT_TASKS: 'eventflow_client_tasks_v3'
};

// 1. Initial Master Events (Weddings, Corporate, Birthdays, Galas) - In Indian Rupees (₹)
const DEFAULT_EVENTS = [
  {
    id: "EVT-2027-01",
    title: "Aura Tech Global Summit 2027",
    clientName: "Nexus Digital Corp",
    type: "Corporate",
    date: "2027-04-18",
    time: "09:00 AM",
    venue: "Metropolitan Grand Ballroom, Mumbai",
    guests: 450,
    budget: 650000,
    spent: 582000,
    status: "Confirmed",
    theme: "Cyberpunk Neon & Modern Minimalist",
    assignedVendors: ["VND-01", "VND-04", "VND-05"],
    description: "Flagship global tech summit featuring keynote stages, developer pods, and VIP investor salons."
  },
  {
    id: "EVT-2027-02",
    title: "Sophia & Lucas Royal Palace Wedding",
    clientName: "Sophia Montgomery",
    type: "Wedding",
    date: "2027-05-22",
    time: "04:30 PM",
    venue: "Taj Heritage Palace & Lawns, Udaipur",
    guests: 250,
    budget: 1450000,
    spent: 1280000,
    status: "Confirmed",
    theme: "Royal Vintage & Grand Floral",
    assignedVendors: ["VND-02", "VND-03", "VND-06"],
    description: "Luxury royal palace wedding ceremony followed by a grand chandelier banquet."
  },
  {
    id: "EVT-2027-03",
    title: "Luminescence 30th Rooftop Gala",
    clientName: "Elena Rostova",
    type: "Birthday",
    date: "2027-06-12",
    time: "07:00 PM",
    venue: "Skyline Penthouse Terrace, Bengaluru",
    guests: 110,
    budget: 250000,
    spent: 185000,
    status: "In Progress",
    theme: "Bohemian Chic & Ambient Starlight",
    assignedVendors: ["VND-01", "VND-05"],
    description: "Exclusive rooftop birthday gala featuring artisanal mixology and ambient acoustic musicians."
  },
  {
    id: "EVT-2027-04",
    title: "VentureFront Annual Partner Dinner",
    clientName: "VentureFront Partners",
    type: "Corporate",
    date: "2027-07-08",
    time: "06:30 PM",
    venue: "The Oberoi Grand Pavilion, New Delhi",
    guests: 85,
    budget: 350000,
    spent: 280000,
    status: "In Progress",
    theme: "Contemporary Luxury & Art Deco",
    assignedVendors: ["VND-01", "VND-03"],
    description: "Curated executive dinner for top venture capitalists, tech executives, and startup founders."
  },
  {
    id: "EVT-2027-05",
    title: "Maya & Ethan Seaside Coastal Wedding",
    clientName: "Maya Lin",
    type: "Wedding",
    date: "2027-08-14",
    time: "05:00 PM",
    venue: "Goa Beachfront Palms Resort",
    guests: 90,
    budget: 450000,
    spent: 160000,
    status: "Budgeting",
    theme: "Ethereal Sunset & Coastal Pampas",
    assignedVendors: ["VND-02", "VND-06"],
    description: "Intimate seaside sunset ceremony with floral canopy arches, live violin duo, and beachfront dining."
  },
  {
    id: "EVT-2027-06",
    title: "Synthetix AI Foundation Product Launch",
    clientName: "Synthetix Inc",
    type: "Corporate",
    date: "2027-09-10",
    time: "10:00 AM",
    venue: "ITC Convention Centre, Hyderabad",
    guests: 350,
    budget: 850000,
    spent: 0,
    status: "Budgeting",
    theme: "Futuristic Glass & Holographic",
    assignedVendors: ["VND-04"],
    description: "Interactive keynote staging, hands-on developer experience labs, and live stream."
  }
];

// 2. Curated Decoration Themes Catalog - In Indian Rupees (₹)
const DEFAULT_DECOR = [
  {
    id: "DEC-01",
    name: "Royal Vintage Grandeur",
    category: "Luxury Wedding & Gala",
    palette: ["#4A0E17", "#D4AF37", "#F5F5DC", "#2F3E46"],
    paletteNames: ["Deep Burgundy", "Imperial Gold", "Champagne Silk", "Forest Slate"],
    priceRange: "₹65,000 - ₹1,40,000",
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
    paletteNames: ["Deep Obsidian", "Cyan Luminescence", "Electric Purple", "Neon Magenta"],
    priceRange: "₹50,000 - ₹1,25,000",
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
    paletteNames: ["Terracotta Earth", "Sunset Ochre", "Warm Flax", "Raw Umber"],
    priceRange: "₹38,000 - ₹85,000",
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
    priceRange: "₹70,000 - ₹1,60,000",
    image: "https://images.unsplash.com/photo-1519225424980-496057d07817?auto=format&fit=crop&w=800&q=80",
    inclusions: [
      "Suspended Greenery & Wisteria Ceiling Canopy",
      "Mirror-Top Banquet Tables",
      "Delphinium & White Hydrangea Pillars",
      "Fairy Light Waterfall Wall"
    ]
  }
];

// 3. Verified Vendors Directory - In Indian Rupees (₹)
const DEFAULT_VENDORS = [
  {
    id: "VND-01",
    name: "Epicurean Elite Catering",
    category: "Catering & Bar",
    rating: 4.9,
    priceRange: "₹₹₹₹",
    contact: "chef.antoine@epicurean.com",
    phone: "+91 98201 44122",
    status: "Contract Signed",
    description: "Michelin-experienced culinary team specializing in multi-course gourmet tasting menus and live culinary counters."
  },
  {
    id: "VND-02",
    name: "Lumiere Fine Art Photography",
    category: "Photography & Cinema",
    rating: 5.0,
    priceRange: "₹₹₹",
    contact: "hello@lumierecinema.com",
    phone: "+91 98334 76290",
    status: "Confirmed",
    description: "Documentary-style cinematic wedding and corporate gala photography with 4K drone cinematography."
  },
  {
    id: "VND-03",
    name: "Botanica Artisans",
    category: "Florist & Decor",
    rating: 4.8,
    priceRange: "₹₹₹",
    contact: "orders@botanicafloral.com",
    phone: "+91 98112 34189",
    status: "Confirmed",
    description: "Master floral sculptors creating breathtaking suspended floral ceilings, stage mandaps, and botanical arches."
  },
  {
    id: "VND-04",
    name: "Apex Sound & Stage AV",
    category: "Audio & Lighting",
    rating: 4.9,
    priceRange: "₹₹₹₹",
    contact: "events@apexsoundstage.com",
    phone: "+91 98450 55178",
    status: "Contract Signed",
    description: "Concert-grade line arrays, intelligent moving heads, laser shows, and 4K curved LED walls."
  },
  {
    id: "VND-05",
    name: "DJ Nova & The Brass Collective",
    category: "Entertainment",
    rating: 4.7,
    priceRange: "₹₹",
    contact: "booking@djnovalive.com",
    phone: "+91 98210 91233",
    status: "In Progress",
    description: "High-energy live percussionists, Dhol artists, and live horn section blending Bollywood, EDM, and Top 40."
  },
  {
    id: "VND-06",
    name: "Heritage Vintage Furniture Rentals",
    category: "Furniture & Decor",
    rating: 4.8,
    priceRange: "₹₹",
    contact: "rentals@heritagefurniture.com",
    phone: "+91 98765 43122",
    status: "Pending Deposit",
    description: "Curated collection of carved royal chairs, gold Chiavari seating, rustic banquet tables, and luxury lounge sets."
  }
];

// 4. Equipment & Inventory Rental Catalog - In Indian Rupees (₹)
const DEFAULT_INVENTORY = [
  {
    id: "INV-01",
    name: "Gold Chiavari Chairs with Ivory Cushions",
    category: "Seating & Furniture",
    totalStock: 500,
    inUse: 320,
    available: 180,
    pricePerDay: 150.00,
    status: "In Stock"
  },
  {
    id: "INV-02",
    name: "Solid Oak Rustic Farm Banquet Tables (8ft)",
    category: "Seating & Furniture",
    totalStock: 60,
    inUse: 45,
    available: 15,
    pricePerDay: 850.00,
    status: "In Stock"
  },
  {
    id: "INV-03",
    name: "Curved 4K Ultra-HD LED Video Wall (16x9 ft)",
    category: "AV & Lighting",
    totalStock: 4,
    inUse: 3,
    available: 1,
    pricePerDay: 35000.00,
    status: "Low Stock"
  },
  {
    id: "INV-04",
    name: "Vintage Crystal Chandelier Cascades (36-inch)",
    category: "Lighting & Decor",
    totalStock: 24,
    inUse: 18,
    available: 6,
    pricePerDay: 3500.00,
    status: "In Stock"
  },
  {
    id: "INV-05",
    name: "Circular Gold Floral Archway & Base",
    category: "Stage & Arch",
    totalStock: 12,
    inUse: 10,
    available: 2,
    pricePerDay: 4500.00,
    status: "Low Stock"
  },
  {
    id: "INV-06",
    name: "Wireless RGB Up-Lighting Fixtures (Pack of 12)",
    category: "AV & Lighting",
    totalStock: 40,
    inUse: 35,
    available: 5,
    pricePerDay: 2500.00,
    status: "Low Stock"
  },
  {
    id: "INV-07",
    name: "Low-Lying Heavy Dry Ice Fog Machine",
    category: "Special Effects",
    totalStock: 6,
    inUse: 2,
    available: 4,
    pricePerDay: 5000.00,
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

// Clean LocalStorage Helper Getters / Setters
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

// Clear any old obsolete keys automatically
(function migrateOldStorage() {
  const oldKeys = ['eventflow_events', 'eventflow_events_v2', 'eventflow_vendors', 'eventflow_vendors_v2', 'eventflow_inventory', 'eventflow_inventory_v2', 'eventflow_decor', 'eventflow_decor_v2', 'eventflow_client_tasks', 'eventflow_client_tasks_v2', 'nexus_attendees'];
  oldKeys.forEach(k => localStorage.removeItem(k));
})();

// Master Public Data API
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
