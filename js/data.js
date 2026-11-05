/**
 * Eventexo - Central Data Engine (v4)
 * Multi-Currency Store (INR / USD) with Guests, Vendors, Inventory & Event Pipelines
 * Reactive LocalStorage persistence
 */

const STORAGE_KEYS = {
  VERSION: 'eventexo_v4',
  EVENTS: 'eventexo_events_v4',
  VENDORS: 'eventexo_vendors_v4',
  INVENTORY: 'eventexo_inventory_v4',
  DECOR: 'eventexo_decor_v4',
  CLIENT_TASKS: 'eventexo_client_tasks_v4',
  GUESTS: 'eventexo_guests_v4',
  CURRENCY: 'eventexo_currency_v4'
};

// 1. Initial Master Events (Weddings, Tech Summits, Sangeet, Galas) - In Indian Rupees (Base: INR)
const DEFAULT_EVENTS = [
  {
    id: "EVT-2027-01",
    title: "Sophia & Aryan Royal Lake Palace Wedding",
    clientName: "Sophia Montgomery & Aryan Kapoor",
    type: "Wedding",
    date: "2027-05-22",
    time: "04:30 PM",
    venue: "Taj Lake Palace & Jagmandir Island, Udaipur",
    guests: 280,
    budget: 1850000,
    spent: 1420000,
    status: "Confirmed",
    theme: "Royal Rajasthani Heritage & Gold Grandeur",
    assignedVendors: ["VND-02", "VND-03", "VND-06"],
    description: "Multi-day luxury destination palace wedding featuring royal boat arrivals, lakeside mandap, and grand chandelier banquet."
  },
  {
    id: "EVT-2027-02",
    title: "Bollywood Sangeet & Cocktail Gala",
    clientName: "Pooja & Rohan Singhania",
    type: "Wedding",
    date: "2027-06-18",
    time: "07:30 PM",
    venue: "The St. Regis Astor Ballroom, Mumbai",
    guests: 350,
    budget: 850000,
    spent: 720000,
    status: "Confirmed",
    theme: "Bollywood Glam & Ambient Starlight",
    assignedVendors: ["VND-04", "VND-05"],
    description: "High-voltage Sangeet night with celebrity DJ, Punjabi Dhol collective, moving laser head arrays, and cocktail mixology."
  },
  {
    id: "EVT-2027-03",
    title: "Bengaluru DeepTech & AI Global Conclave",
    clientName: "Nexus AI Ventures",
    type: "Corporate",
    date: "2027-07-14",
    time: "09:00 AM",
    venue: "ITC Gardenia & Convention Pavilion, Bengaluru",
    guests: 500,
    budget: 1200000,
    spent: 890000,
    status: "In Progress",
    theme: "Cyberpunk Neon & Modern Minimalist",
    assignedVendors: ["VND-01", "VND-04"],
    description: "Premier AI tech summit hosting 500+ global founders, featuring curved 4K LED keynotes, startup pitches, and investor lounges."
  },
  {
    id: "EVT-2027-04",
    title: "Goa Sunset Coastal Beach Reception",
    clientName: "Meera & Siddharth Roy",
    type: "Wedding",
    date: "2027-08-20",
    time: "05:00 PM",
    venue: "Taj Holiday Village Beachfront, Candolim, Goa",
    guests: 140,
    budget: 650000,
    spent: 310000,
    status: "In Progress",
    theme: "Bohemian Sunset Chic & Pampas Florals",
    assignedVendors: ["VND-02", "VND-06"],
    description: "Sunset beach wedding reception with bare-foot bohemian chic decor, fairy lights, acoustic musicians, and coastal gourmet grills."
  },
  {
    id: "EVT-2027-05",
    title: "Grand 50th Golden Jubilee Anniversary Gala",
    clientName: "Dr. Vikram & Sunita Mehra",
    type: "Birthday",
    date: "2027-09-12",
    time: "07:00 PM",
    venue: "The Oberoi Grand Pavilion, New Delhi",
    guests: 120,
    budget: 500000,
    spent: 125000,
    status: "Budgeting",
    theme: "Imperial Gold & Classical Floral",
    assignedVendors: ["VND-01", "VND-03"],
    description: "Intimate family golden anniversary gala with string quartet, archival family photo exhibits, and bespoke 5-course dining."
  },
  {
    id: "EVT-2027-06",
    title: "Fintech Frontier Leadership Summit",
    clientName: "PayMatrix Global",
    type: "Corporate",
    date: "2027-10-05",
    time: "08:30 AM",
    venue: "Grand Hyatt Mumbai Exhibition Hall",
    guests: 400,
    budget: 950000,
    spent: 0,
    status: "Budgeting",
    theme: "Futuristic Glass & Monochromatic",
    assignedVendors: ["VND-04"],
    description: "National financial technology forum bringing together banking leaders, fintech pioneers, and regulatory executives."
  }
];

// 2. Curated Decoration Themes Catalog - In Indian Rupees (Base: INR)
const DEFAULT_DECOR = [
  {
    id: "DEC-01",
    name: "Royal Rajasthani & Vintage Grandeur",
    category: "Luxury Wedding & Heritage Gala",
    palette: ["#4A0E17", "#D4AF37", "#F5F5DC", "#2F3E46"],
    paletteNames: ["Deep Burgundy", "Imperial Gold", "Champagne Silk", "Forest Slate"],
    priceRange: "₹75,000 - ₹1,80,000",
    image: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80",
    inclusions: [
      "Cascading Crystal Chandeliers & Brass Urns",
      "Marigold & Red Rose Floral Sculptures",
      "Royal Carved Jharokha Photo Backdrops",
      "Heavy Crimson Velvet Stage Drapes"
    ]
  },
  {
    id: "DEC-02",
    name: "Cyberpunk Neon & Modern Minimalist",
    category: "Tech Summit & Brand Activations",
    palette: ["#0B0F19", "#06B6D4", "#8B5CF6", "#F43F5E"],
    paletteNames: ["Deep Obsidian", "Cyan Luminescence", "Electric Purple", "Neon Magenta"],
    priceRange: "₹50,000 - ₹1,35,000",
    image: "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=800&q=80",
    inclusions: [
      "Programmable Pixel LED Light Tubes",
      "Matte Black Geometric Stage Risers",
      "3D Holographic Projector Screens",
      "Custom Neon Acrylic Brand Signage"
    ]
  },
  {
    id: "DEC-03",
    name: "Bohemian Sunset Coastal Chic",
    category: "Beach Wedding & Sunset Soirée",
    palette: ["#D97706", "#F97316", "#FEF08A", "#78350F"],
    paletteNames: ["Terracotta Earth", "Sunset Ochre", "Warm Flax", "Raw Umber"],
    priceRange: "₹45,000 - ₹95,000",
    image: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=800&q=80",
    inclusions: [
      "Circular Pampas Grass & Rose Arches",
      "Rattan Lanterns & Fairy String Lights",
      "Low Reclaimed Teak Banquet Feasting Tables",
      "Handcrafted Macramé & Textured Linen Runners"
    ]
  },
  {
    id: "DEC-04",
    name: "Enchanted Botanical Garden Floral",
    category: "Open-Air Gala & Sangeet",
    palette: ["#166534", "#E2E8F0", "#EC4899", "#854D0E"],
    paletteNames: ["Emerald Forest", "Pure Marble", "Blush Lotus", "Antique Bronze"],
    priceRange: "₹65,000 - ₹1,50,000",
    image: "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?auto=format&fit=crop&w=800&q=80",
    inclusions: [
      "Suspended Foliage & Wisteria Canopies",
      "Hydrangea & Orchid Centerpiece Trees",
      "Mirrored Glass Walkway Platforms",
      "Warm Amber Pin-Spot Table Illumination"
    ]
  }
];

// 3. Verified Event Vendors & Partners - In Indian Rupees (Base: INR)
const DEFAULT_VENDORS = [
  {
    id: "VND-01",
    name: "Saffron & Spice Gourmet Catering",
    category: "Catering & Bar",
    rating: 4.9,
    priceRange: "₹₹₹",
    contact: "chef.saffron@eventexo.in",
    phone: "+91 98201 44521",
    status: "Contract Signed",
    description: "Luxury Indian and international catering offering specialized Pure Veg, Jain, and Continental banquet menus with live culinary counters."
  },
  {
    id: "VND-02",
    name: "Lumière Cinematics India",
    category: "Photography & Cinema",
    rating: 5.0,
    priceRange: "₹₹₹₹",
    contact: "booking@lumierecinematics.in",
    phone: "+91 98330 87112",
    status: "Confirmed",
    description: "Award-winning wedding & gala cinema team equipped with Sony FX9 cinema rigs, 4K drones, and same-day highlight editing."
  },
  {
    id: "VND-03",
    name: "Botanica Floral Sculptors",
    category: "Florist & Decor",
    rating: 4.8,
    priceRange: "₹₹₹",
    contact: "orders@botanicaindia.in",
    phone: "+91 98112 34189",
    status: "Confirmed",
    description: "Master floral sculptors specializing in suspended botanical ceilings, royal mandap designs, and exotic imported florals."
  },
  {
    id: "VND-04",
    name: "Apex Sound & Stage AV",
    category: "Audio & Lighting",
    rating: 4.9,
    priceRange: "₹₹₹₹",
    contact: "events@apexsoundstage.in",
    phone: "+91 98450 55178",
    status: "Contract Signed",
    description: "Concert-grade line arrays, intelligent moving heads, laser shows, and 4K curved LED walls for conventions and galas."
  },
  {
    id: "VND-05",
    name: "DJ Nova & The Dhol Collective",
    category: "Entertainment",
    rating: 4.8,
    priceRange: "₹₹",
    contact: "booking@djnovalive.in",
    phone: "+91 98210 91233",
    status: "In Progress",
    description: "Celebrity wedding and gala entertainer blending live Punjabi Dhol, saxophone melodies, and international dance hits."
  },
  {
    id: "VND-06",
    name: "Heritage Royal Seating Rentals",
    category: "Furniture & Decor",
    rating: 4.8,
    priceRange: "₹₹",
    contact: "rentals@heritageseating.in",
    phone: "+91 98765 43122",
    status: "Pending Deposit",
    description: "Extensive collection of carved royal thrones, gold Chiavari chairs, rustic banquet tables, and luxury lounge sets."
  }
];

// 4. Equipment & Inventory Rental Catalog - In Indian Rupees (Base: INR)
const DEFAULT_INVENTORY = [
  {
    id: "INV-01",
    name: "Gold Chiavari Chairs with Ivory Cushions",
    category: "Seating & Furniture",
    totalStock: 600,
    inUse: 420,
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
    totalStock: 5,
    inUse: 4,
    available: 1,
    pricePerDay: 35000.00,
    status: "Low Stock"
  },
  {
    id: "INV-04",
    name: "Vintage Crystal Chandelier Cascades (Set of 6)",
    category: "Lighting & Decor",
    totalStock: 16,
    inUse: 12,
    available: 4,
    pricePerDay: 7500.00,
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
    totalStock: 50,
    inUse: 42,
    available: 8,
    pricePerDay: 2500.00,
    status: "In Stock"
  },
  {
    id: "INV-07",
    name: "Low-Lying Heavy Dry Ice Fog Machine",
    category: "Special Effects",
    totalStock: 8,
    inUse: 3,
    available: 5,
    pricePerDay: 5000.00,
    status: "In Stock"
  }
];

// 5. Client Planning Checklist & Milestones
const DEFAULT_CLIENT_TASKS = [
  { id: "TSK-01", title: "Confirm Palace / Venue & Sign Rental Contract", deadline: "8 Months Out", completed: true, category: "Venue" },
  { id: "TSK-02", title: "Theme Color Palette & Mandap Approval", deadline: "6 Months Out", completed: true, category: "Design" },
  { id: "TSK-03", title: "Catering Menu Tasting (Veg, Non-Veg, Jain)", deadline: "4 Months Out", completed: true, category: "Catering" },
  { id: "TSK-04", title: "Send Digital Invitations & RSVP Portal Launch", deadline: "3 Months Out", completed: true, category: "Guests" },
  { id: "TSK-05", title: "Finalize Table Seating Chart & Dietary Counts", deadline: "3 Weeks Out", completed: false, category: "Operations" },
  { id: "TSK-06", title: "Sangeet Dance Rehearsal & AV Tech Run", deadline: "1 Week Out", completed: false, category: "Day-of" },
  { id: "TSK-07", title: "Vendor Final Invoices & Security Handover", deadline: "3 Days Out", completed: false, category: "Finance" }
];

// 6. Guest List & RSVP Management Initial Dataset
const DEFAULT_GUESTS = [
  { id: "GST-01", name: "Vikramaditya Singhania", email: "vikram@singhaniagroup.com", phone: "+91 98200 11223", rsvp: "Confirmed", diet: "Pure Veg", table: "Table 1 (Family VIP)", plusOne: true },
  { id: "GST-02", name: "Ananya Deshmukh", email: "ananya.d@techventures.in", phone: "+91 98451 99882", rsvp: "Confirmed", diet: "Jain", table: "Table 1 (Family VIP)", plusOne: false },
  { id: "GST-03", name: "Marcus Sterling", email: "marcus.s@sterlingcapital.com", phone: "+1 415 555 0192", rsvp: "Confirmed", diet: "Non-Veg", table: "Table 2 (Global Partners)", plusOne: true },
  { id: "GST-04", name: "Dr. Rohini Ramanathan", email: "dr.rohini@aims-health.org", phone: "+91 98110 44556", rsvp: "Awaiting", diet: "Pure Veg", table: "Table 3 (Colleagues)", plusOne: false },
  { id: "GST-05", name: "Kabir Malhotra", email: "kabir@malhotramedia.in", phone: "+91 98330 77114", rsvp: "Confirmed", diet: "Non-Veg", table: "Table 4 (Friends & Sangeet)", plusOne: true },
  { id: "GST-06", name: "Sunaina Bajaj", email: "sunaina.bajaj@heritagecrafts.in", phone: "+91 98760 33211", rsvp: "Declined", diet: "Pure Veg", table: "Unassigned", plusOne: false },
  { id: "GST-07", name: "Devendra & Shreya Shah", email: "shah.dev@zenithfin.com", phone: "+91 98920 66789", rsvp: "Confirmed", diet: "Jain", table: "Table 2 (Global Partners)", plusOne: true },
  { id: "GST-08", name: "Natasha Romanova", email: "natasha@nordicaudio.se", phone: "+46 8 123 4567", rsvp: "Awaiting", diet: "Non-Veg", table: "Table 3 (Colleagues)", plusOne: false }
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

// Clear obsolete storage keys automatically on major bumps
(function migrateOldStorage() {
  const oldKeys = [
    'eventflow_events', 'eventflow_events_v2', 'eventflow_events_v3',
    'eventflow_vendors', 'eventflow_vendors_v2', 'eventflow_vendors_v3',
    'eventflow_inventory', 'eventflow_inventory_v2', 'eventflow_inventory_v3',
    'eventflow_decor', 'eventflow_decor_v2', 'eventflow_decor_v3',
    'eventflow_client_tasks', 'eventflow_client_tasks_v2', 'eventflow_client_tasks_v3',
    'nexus_attendees'
  ];
  oldKeys.forEach(k => localStorage.removeItem(k));
})();

// Master Public Data API
const EventDataStore = {
  // Currency Engine
  getCurrency: () => {
    return localStorage.getItem(STORAGE_KEYS.CURRENCY) || 'INR';
  },
  setCurrency: (currency) => {
    localStorage.setItem(STORAGE_KEYS.CURRENCY, currency);
    window.dispatchEvent(new CustomEvent('currencyChanged', { detail: { currency } }));
  },
  toggleCurrency: () => {
    const current = EventDataStore.getCurrency();
    const next = current === 'INR' ? 'USD' : 'INR';
    EventDataStore.setCurrency(next);
    return next;
  },
  formatCurrency: (amountInINR) => {
    const currency = EventDataStore.getCurrency();
    if (currency === 'USD') {
      const usdAmount = Math.round(amountInINR / 83);
      return `$${usdAmount.toLocaleString('en-US')}`;
    }
    return `₹${amountInINR.toLocaleString('en-IN')}`;
  },
  getCurrencySymbol: () => {
    return EventDataStore.getCurrency() === 'USD' ? '$' : '₹';
  },

  // Events API
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

  // Vendors API
  getVendors: () => getData(STORAGE_KEYS.VENDORS, DEFAULT_VENDORS),
  saveVendor: (vendor) => {
    const list = EventDataStore.getVendors();
    list.unshift(vendor);
    setData(STORAGE_KEYS.VENDORS, list);
    return list;
  },

  // Inventory API
  getInventory: () => getData(STORAGE_KEYS.INVENTORY, DEFAULT_INVENTORY),
  saveInventoryItem: (item) => {
    const list = EventDataStore.getInventory();
    list.unshift(item);
    setData(STORAGE_KEYS.INVENTORY, list);
    return list;
  },

  // Decor Themes API
  getDecorThemes: () => getData(STORAGE_KEYS.DECOR, DEFAULT_DECOR),

  // Client Tasks API
  getClientTasks: () => getData(STORAGE_KEYS.CLIENT_TASKS, DEFAULT_CLIENT_TASKS),
  toggleClientTask: (id) => {
    const list = EventDataStore.getClientTasks();
    const task = list.find(t => t.id === id);
    if (task) {
      task.completed = !task.completed;
      setData(STORAGE_KEYS.CLIENT_TASKS, list);
    }
    return list;
  },

  // Guest List & RSVP API
  getGuests: () => getData(STORAGE_KEYS.GUESTS, DEFAULT_GUESTS),
  saveGuest: (guest) => {
    const list = EventDataStore.getGuests();
    list.unshift(guest);
    setData(STORAGE_KEYS.GUESTS, list);
    return list;
  },
  deleteGuest: (id) => {
    let list = EventDataStore.getGuests();
    list = list.filter(g => g.id !== id);
    setData(STORAGE_KEYS.GUESTS, list);
    return list;
  },
  updateGuestRSVP: (id, newRSVP) => {
    const list = EventDataStore.getGuests();
    const guest = list.find(g => g.id === id);
    if (guest) {
      guest.rsvp = newRSVP;
      setData(STORAGE_KEYS.GUESTS, list);
    }
    return list;
  }
};
