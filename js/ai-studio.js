/**
 * Eventexo - AI Design Studio & Generative Event Architect Engine
 * Powers multi-vibe aesthetic generation, dynamic budget allocations,
 * 1-click PDF/Print export, and optional live Gemini API generation.
 */

function generateAIEventBlueprint() {
  const eventType = document.getElementById('ai-event-type')?.value || 'Luxury Destination Wedding';
  const vibe = document.getElementById('ai-event-vibe')?.value || 'Royal Rajasthani Heritage';
  const guests = parseInt(document.getElementById('ai-guests')?.value) || 200;
  const budget = parseInt(document.getElementById('ai-budget')?.value) || 1200000;
  const notes = document.getElementById('ai-notes')?.value || '';
  const apiKey = document.getElementById('ai-gemini-key')?.value.trim();

  const outputContainer = document.getElementById('ai-results-container');
  const loadingState = document.getElementById('ai-loading-state');
  const loadingText = document.getElementById('ai-loading-text');

  if (!outputContainer || !loadingState) return;

  // Show loading animation
  outputContainer.classList.add('hidden');
  loadingState.classList.remove('hidden');
  if (loadingText) {
    loadingText.innerText = apiKey ? "Synthesizing custom concept via Gemini 1.5 Flash..." : "Eventexo Neural Architect is designing your blueprint...";
  }

  // If user provided a Gemini API Key, attempt live API generation
  if (apiKey) {
    callGeminiAPI(apiKey, eventType, vibe, guests, budget, notes)
      .then(geminiData => {
        loadingState.classList.add('hidden');
        outputContainer.classList.remove('hidden');
        renderAIGeneratedPlan(eventType, vibe, guests, budget, notes, geminiData);
        if (window.lucide) lucide.createIcons();
        if (typeof showToast === 'function') {
          showToast("Gemini 1.5 Generated", "Live AI strategy crafted successfully!", "sparkles");
        }
      })
      .catch(err => {
        console.warn("Gemini API call failed, falling back to built-in architect:", err);
        loadingState.classList.add('hidden');
        outputContainer.classList.remove('hidden');
        renderAIGeneratedPlan(eventType, vibe, guests, budget, notes);
        if (window.lucide) lucide.createIcons();
        if (typeof showToast === 'function') {
          showToast("Built-in Architect Fallback", "Loaded bespoke Eventexo blueprint.", "sparkles");
        }
      });
  } else {
    // Instant simulation with built-in architect
    setTimeout(() => {
      loadingState.classList.add('hidden');
      outputContainer.classList.remove('hidden');
      renderAIGeneratedPlan(eventType, vibe, guests, budget, notes);
      if (window.lucide) lucide.createIcons();
    }, 800);
  }
}

// Live Google Gemini API Integration Handler
async function callGeminiAPI(apiKey, type, vibe, guests, budget, notes) {
  const prompt = `You are a world-class luxury event producer and creative director for Eventexo. 
Create an executive event strategy for:
- Event Type: ${type}
- Aesthetic Vibe: ${vibe}
- Guest Count: ${guests} attendees
- Budget in INR: ₹${budget.toLocaleString('en-IN')}
- Special Client Notes: ${notes || "None"}

Respond strictly with a JSON object with this exact schema:
{
  "title": "A poetic, grand luxury concept title",
  "narrative": "A 2-3 sentence immersive creative description of the atmosphere, scents, and production design.",
  "schedule": [
    {"time": "04:30 PM", "title": "Guest Arrival & Welcome", "desc": "Atmospheric acoustic instruments and passed artisanal mocktails."},
    {"time": "06:00 PM", "title": "Main Ceremony / Keynote", "desc": "Grand entrance and feature program."},
    {"time": "07:45 PM", "title": "Gourmet Banquet", "desc": "Multi-course feast and toast celebrations."},
    {"time": "09:30 PM", "title": "Celebration & Dance Floor", "desc": "Live entertainment and dessert lounge."}
  ]
}`;

  const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents: [{ parts: [{ text: prompt }] }],
      generationConfig: { responseMimeType: "application/json" }
    })
  });

  if (!res.ok) throw new Error(`Gemini API error: ${res.statusText}`);
  const json = await res.json();
  const text = json.candidates[0].content.parts[0].text;
  return JSON.parse(text);
}

function renderAIGeneratedPlan(type, vibe, guests, budget, notes, geminiData = null) {
  const container = document.getElementById('ai-results-content');
  if (!container) return;

  // Aesthetic presets
  const vibeConfigs = {
    "Royal Rajasthani Heritage": {
      title: "Imperial Mewar: Velvet & Palace Gold Grandeur",
      palette: [
        { name: "Burgundy Velvet", hex: "#4A0E17" },
        { name: "Imperial Gold", hex: "#D4AF37" },
        { name: "Champagne Silk", hex: "#F5F5DC" },
        { name: "Forest Slate", hex: "#2F3E46" }
      ],
      decorStyle: "Carved Jharokha stage arches, antique brass candelabras, heavy crimson velvet drapery, and Marigold & Red Rose floral sculptures.",
      recommendedInventory: ["Vintage Crystal Chandelier Cascades", "Gold Chiavari Chairs with Ivory Cushions"],
      vibeNarrative: "A timeless royal celebration characterized by palace candlelight, regal textures, royal boat processionals, and classical Indian sitar melodies."
    },
    "Bollywood Glam & Sangeet": {
      title: "Bollywood Luminescence: Starlight Sangeet",
      palette: [
        { name: "Peacock Blue", hex: "#004958" },
        { name: "Sunset Marigold", hex: "#FF9933" },
        { name: "Rani Pink", hex: "#E0115F" },
        { name: "Shimmer Gold", hex: "#F1C40F" }
      ],
      decorStyle: "Mirror mosaic dance floors, suspended floral wisteria ceilings, dynamic moving laser heads, and interactive cocktail mixology counters.",
      recommendedInventory: ["Curved 4K Ultra-HD LED Video Wall", "Wireless RGB Up-Lighting Fixtures"],
      vibeNarrative: "High-octane glamour and celebratory energy featuring choreographed performances, Punjabi Dhol artists, and cinematic stage lighting."
    },
    "Cyberpunk Neon": {
      title: "Synthetix Horizon: Cybernetic Luxe",
      palette: [
        { name: "Deep Obsidian", hex: "#0B0F19" },
        { name: "Cyan Luminescence", hex: "#06B6D4" },
        { name: "Electric Ultraviolet", hex: "#8B5CF6" },
        { name: "Neon Magenta", hex: "#F43F5E" }
      ],
      decorStyle: "RGB LED pixel tubes, matte black staging, holographic projection backdrops, and interactive ambient glow bars.",
      recommendedInventory: ["Curved 4K Ultra-HD LED Video Wall", "Wireless RGB Up-Lighting Fixtures"],
      vibeNarrative: "An electrifying, forward-looking sensory experience designed to captivate tech innovators, founders, and trendsetters."
    },
    "Goa Sunset Coastal Chic": {
      title: "Golden Hour Solstice: Coastal Bohemian Chic",
      palette: [
        { name: "Terracotta Earth", hex: "#D97706" },
        { name: "Desert Ochre", hex: "#F97316" },
        { name: "Warm Flax", hex: "#FEF08A" },
        { name: "Raw Umber", hex: "#78350F" }
      ],
      decorStyle: "Circular pampas grass arches, rattan lanterns, low reclaimed wood banquet feasting tables, and textured linen runners.",
      recommendedInventory: ["Circular Gold Floral Archway & Base", "Solid Oak Rustic Farm Banquet Tables"],
      vibeNarrative: "Free-spirited coastal celebration filled with earthy natural textures, ocean breezes, acoustic melodies, and sunset warmth."
    },
    "Modern Minimalist": {
      title: "Monochrome Precision & Architectural Grace",
      palette: [
        { name: "Pure Arctic White", hex: "#F8FAFC" },
        { name: "Steel Graphite", hex: "#334155" },
        { name: "Brushed Champagne", hex: "#CBD5E1" },
        { name: "Charcoal Shadow", hex: "#0F172A" }
      ],
      decorStyle: "Clean geometric pedestals, single-stem calla lily arrangements, recessed pin-spot lighting, and sleek acrylic elements.",
      recommendedInventory: ["Gold Chiavari Chairs with Ivory Cushions", "Curved 4K Ultra-HD LED Video Wall"],
      vibeNarrative: "Understated luxury where architectural negative space, precision lighting, and tailored elements create effortless sophistication."
    }
  };

  const selectedVibe = vibeConfigs[vibe] || vibeConfigs["Royal Rajasthani Heritage"];
  const conceptTitle = geminiData?.title || selectedVibe.title;
  const conceptNarrative = geminiData?.narrative || selectedVibe.vibeNarrative;

  // Dynamic budget calculation using EventDataStore multi-currency formatter
  const venueBudget = Math.round(budget * 0.35);
  const cateringBudget = Math.round(budget * 0.30);
  const decorBudget = Math.round(budget * 0.15);
  const photoBudget = Math.round(budget * 0.10);
  const avBudget = Math.round(budget * 0.10);
  const perGuest = Math.round(budget / guests);

  const scheduleItems = geminiData?.schedule || [
    { time: "04:30 PM", title: "Guest Arrival & Welcome Refreshments", desc: "Ambient acoustic shehnai & sitar duo, artisanal passed canapes." },
    { time: "05:30 PM", title: "Main Ceremony / Keynote Session", desc: "Ceremonial procession, cinematic grand entrance, featured speeches." },
    { time: "07:30 PM", title: "Royal Gourmet Feast Banquet", desc: "Curated multi-course live counters (Pure Veg, Non-Veg, Jain specialties)." },
    { time: "09:15 PM", title: "Sangeet Dance Floor & Dessert Lounge", desc: "Live percussionists, DJ celebration set, late-night artisanal desserts." }
  ];

  container.innerHTML = `
    <!-- Print Header (Visible only when printed) -->
    <div class="print-banner hidden">
      <h1 style="font-size: 24pt; font-weight: 800; margin: 0;">Eventexo</h1>
      <p style="font-size: 11pt; color: #475569; margin-top: 4px;">Executive Event Blueprint & Production Plan • Generated for ${type}</p>
    </div>

    <!-- Concept Header Banner -->
    <div class="p-6 rounded-2xl bg-gradient-to-r from-indigo-950/80 via-purple-950/60 to-slate-900 border border-indigo-500/30 mb-8">
      <div class="flex items-center justify-between gap-4 mb-2">
        <div class="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-indigo-400">
          <i data-lucide="sparkles" class="w-4 h-4 text-indigo-400"></i>
          <span>${geminiData ? 'Gemini 1.5 Live AI Generated Concept' : 'Eventexo Neural Event Strategy'}</span>
        </div>
        <button onclick="printAIBlueprint()" class="no-print px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-xs font-bold text-white flex items-center gap-1.5 transition-all">
          <i data-lucide="printer" class="w-3.5 h-3.5 text-cyan-400"></i>
          <span>Export Blueprint (PDF / Print)</span>
        </button>
      </div>
      <h3 class="font-heading text-2xl sm:text-3xl font-extrabold text-white mb-2">
        ${conceptTitle}
      </h3>
      <p class="text-sm text-slate-300 leading-relaxed mb-4">
        ${conceptNarrative}
      </p>
      <div class="flex flex-wrap items-center gap-3 text-xs font-semibold">
        <span class="px-3 py-1 rounded-full bg-white/10 text-slate-200 border border-white/10">Type: ${type}</span>
        <span class="px-3 py-1 rounded-full bg-white/10 text-slate-200 border border-white/10">Guests: ${guests} Attendees</span>
        <span class="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
          Total: ${EventDataStore.formatCurrency(budget)} (~${EventDataStore.formatCurrency(perGuest)}/guest)
        </span>
      </div>
    </div>

    <!-- 1. Color Palette Generator -->
    <div class="mb-8">
      <h4 class="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-1.5">
        <i data-lucide="palette" class="w-4 h-4 text-purple-400"></i>
        <span>Curated Color Palette & Material Styling</span>
      </h4>
      <div class="grid grid-cols-2 sm:grid-cols-4 gap-3">
        ${selectedVibe.palette.map(color => `
          <div class="p-3 rounded-xl bg-slate-900/80 border border-white/10 flex flex-col items-center text-center group cursor-pointer hover:border-indigo-500/50 transition-colors" onclick="copyColorCode('${color.hex}')">
            <div class="w-full h-14 rounded-lg mb-2 shadow-inner border border-white/10 group-hover:scale-105 transition-transform" style="background-color: ${color.hex}"></div>
            <span class="text-xs font-bold text-white">${color.name}</span>
            <span class="text-[11px] font-mono text-slate-400 uppercase mt-0.5">${color.hex}</span>
          </div>
        `).join('')}
      </div>
    </div>

    <!-- 2. Budget Allocation Breakdown -->
    <div class="mb-8">
      <h4 class="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-1.5">
        <i data-lucide="pie-chart" class="w-4 h-4 text-cyan-400"></i>
        <span>Optimized Budget Breakdown (${EventDataStore.formatCurrency(budget)})</span>
      </h4>
      <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div class="p-4 rounded-xl bg-slate-900/60 border border-white/10">
          <div class="text-[11px] text-slate-400 font-semibold uppercase">Venue & Facility (35%)</div>
          <div class="text-lg font-bold text-white mt-1">${EventDataStore.formatCurrency(venueBudget)}</div>
          <div class="text-[11px] text-slate-400 mt-0.5">Palace lawns, ballroom, permits</div>
        </div>
        <div class="p-4 rounded-xl bg-slate-900/60 border border-white/10">
          <div class="text-[11px] text-slate-400 font-semibold uppercase">Catering & Bar (30%)</div>
          <div class="text-lg font-bold text-white mt-1">${EventDataStore.formatCurrency(cateringBudget)}</div>
          <div class="text-[11px] text-slate-400 mt-0.5">Live gourmet stalls, cocktail bar</div>
        </div>
        <div class="p-4 rounded-xl bg-slate-900/60 border border-white/10">
          <div class="text-[11px] text-slate-400 font-semibold uppercase">Decor & Florals (15%)</div>
          <div class="text-lg font-bold text-white mt-1">${EventDataStore.formatCurrency(decorBudget)}</div>
          <div class="text-[11px] text-slate-400 mt-0.5">Mandap, centerpieces, lighting</div>
        </div>
        <div class="p-4 rounded-xl bg-slate-900/60 border border-white/10">
          <div class="text-[11px] text-slate-400 font-semibold uppercase">Photo & Cinema (10%)</div>
          <div class="text-lg font-bold text-white mt-1">${EventDataStore.formatCurrency(photoBudget)}</div>
          <div class="text-[11px] text-slate-400 mt-0.5">Full coverage + 4K drone reel</div>
        </div>
        <div class="p-4 rounded-xl bg-slate-900/60 border border-white/10">
          <div class="text-[11px] text-slate-400 font-semibold uppercase">AV & Music (10%)</div>
          <div class="text-lg font-bold text-white mt-1">${EventDataStore.formatCurrency(avBudget)}</div>
          <div class="text-[11px] text-slate-400 mt-0.5">DJ, live sound, stage rig, Dhol</div>
        </div>
        <div class="p-4 rounded-xl bg-indigo-950/40 border border-indigo-500/30 flex flex-col justify-center items-center text-center">
          <div class="text-xs text-indigo-300 font-bold">Projected Cost / Guest</div>
          <div class="text-xl font-extrabold text-white mt-0.5">${EventDataStore.formatCurrency(perGuest)}</div>
        </div>
      </div>
    </div>

    <!-- 3. Run-of-Show Schedule -->
    <div class="mb-8">
      <h4 class="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-1.5">
        <i data-lucide="clock" class="w-4 h-4 text-emerald-400"></i>
        <span>AI Generated Run-of-Show Schedule</span>
      </h4>
      <div class="space-y-2.5">
        ${scheduleItems.map(item => `
          <div class="flex items-center gap-4 p-3 rounded-xl bg-slate-900/40 border border-white/5">
            <span class="font-mono text-xs font-bold text-indigo-400 w-24 flex-shrink-0">${item.time}</span>
            <div class="text-xs text-slate-200">
              <span class="font-bold text-white">${item.title}</span> — ${item.desc}
            </div>
          </div>
        `).join('')}
      </div>
    </div>

    <!-- Quick Action: Apply to Event Wizard -->
    <div class="no-print p-5 rounded-2xl bg-indigo-950/60 border border-indigo-500/40 flex flex-col sm:flex-row items-center justify-between gap-4">
      <div>
        <h4 class="font-bold text-white text-sm">Love this event strategy?</h4>
        <p class="text-xs text-indigo-300 mt-0.5">Transfer this blueprint directly into the Event Creation Wizard or export to PDF.</p>
      </div>
      <div class="flex items-center gap-3">
        <button onclick="printAIBlueprint()" class="px-4 py-2.5 rounded-xl text-xs font-bold bg-white/10 hover:bg-white/20 text-white flex items-center gap-1.5 transition-all">
          <i data-lucide="printer" class="w-4 h-4 text-cyan-400"></i>
          <span>Print / PDF</span>
        </button>
        <button onclick="applyBlueprintToWizard('${type}', '${conceptTitle.replace(/'/g, "\\'")}', ${budget}, ${guests})" class="px-5 py-2.5 rounded-xl text-xs font-bold bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-500/30 flex items-center gap-2 transition-all">
          <span>Apply to Wizard</span>
          <i data-lucide="arrow-right" class="w-4 h-4"></i>
        </button>
      </div>
    </div>
  `;
}

function printAIBlueprint() {
  window.print();
}

function copyColorCode(hex) {
  navigator.clipboard.writeText(hex).then(() => {
    if (typeof showToast === 'function') {
      showToast("Color Swatch Copied", `Hex code ${hex} copied to clipboard!`, "palette");
    } else {
      alert(`Copied ${hex} to clipboard!`);
    }
  });
}

function applyBlueprintToWizard(type, title, budget, guests) {
  switchView('create-event');
  setTimeout(() => {
    const elTitle = document.getElementById('wiz-title');
    const elType = document.getElementById('wiz-type');
    const elBudget = document.getElementById('wiz-budget');
    const elGuests = document.getElementById('wiz-guests');
    if (elTitle) elTitle.value = title;
    if (elType) elType.value = type;
    if (elBudget) elBudget.value = budget;
    if (elGuests) elGuests.value = guests;
  }, 100);
}
