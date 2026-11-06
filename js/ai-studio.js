/**
 * Eventexo — Minimalist Obsidian & Chrome AI Design Atelier & Generative Architect Engine
 * Powers multi-vibe aesthetic generation, dynamic budget allocations,
 * 1-click PDF/Print export, and optional live Gemini API generation.
 */

function generateAIEventBlueprint() {
  const eventType = document.getElementById('ai-event-type')?.value || 'Luxury Destination Wedding';
  const vibe = document.getElementById('ai-event-vibe')?.value || 'Modern Minimalist';
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
    loadingText.innerText = apiKey ? "Synthesizing custom concept via Gemini 1.5 Flash..." : "Harmonizing spatial aesthetics, stage architecture & budget velocity...";
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
          showToast("Architect Fallback", "Loaded bespoke Eventexo blueprint.", "sparkles");
        }
      });
  } else {
    // Instant simulation with built-in architect
    setTimeout(() => {
      loadingState.classList.add('hidden');
      outputContainer.classList.remove('hidden');
      renderAIGeneratedPlan(eventType, vibe, guests, budget, notes);
      if (window.lucide) lucide.createIcons();
    }, 600);
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
  "title": "A precise, elegant concept title",
  "narrative": "A 2-3 sentence immersive creative description of the atmosphere, materials, lighting, and production design.",
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
    "Modern Minimalist": {
      title: "Monochrome Precision & Architectural Grace",
      palette: [
        { name: "Arctic White", hex: "#FFFFFF" },
        { name: "Steel Silver", hex: "#E4E4E7" },
        { name: "Zinc Slate", hex: "#71717A" },
        { name: "Obsidian Pitch", hex: "#09090B" }
      ],
      decorStyle: "Clean geometric monoliths, pin-spot beam lighting, floating acrylic stages, and frosted glass centerpieces.",
      recommendedInventory: ["Curved 4K Ultra-HD LED Video Wall", "Wireless RGB Up-Lighting Fixtures"],
      vibeNarrative: "Precision-engineered minimalism where negative space, tailored lighting, and high-contrast monochrome textures create effortless sophistication."
    },
    "Royal Rajasthani Heritage": {
      title: "Mewar Imperial: Midnight & Regal Silver",
      palette: [
        { name: "Deep Charcoal", hex: "#18181B" },
        { name: "Pure Platinum", hex: "#E4E4E7" },
        { name: "Champagne Silver", hex: "#D4D4D8" },
        { name: "Royal Slate", hex: "#27272A" }
      ],
      decorStyle: "Carved stone arches, silver candelabras, heavy slate drapery, and white orchid floral sculptures.",
      recommendedInventory: ["Vintage Crystal Chandelier Cascades", "Curved 4K Ultra-HD LED Video Wall"],
      vibeNarrative: "A timeless heritage celebration characterized by palace moonlight, regal textures, royal processionals, and classical Indian sitar melodies."
    },
    "Bollywood Glam & Sangeet": {
      title: "Luminescence: Starlight Sangeet",
      palette: [
        { name: "Electric Cyan", hex: "#06B6D4" },
        { name: "Silver Star", hex: "#F4F4F5" },
        { name: "Velvet Plum", hex: "#581C87" },
        { name: "Carbon Black", hex: "#09090B" }
      ],
      decorStyle: "Mirror mosaic dance floors, suspended floral wisteria ceilings, dynamic moving laser heads, and interactive cocktail mixology counters.",
      recommendedInventory: ["Curved 4K Ultra-HD LED Video Wall", "Wireless RGB Up-Lighting Fixtures"],
      vibeNarrative: "High-octane glamour and celebratory energy featuring choreographed performances, live percussionists, and cinematic stage lighting."
    },
    "Cyberpunk Neon": {
      title: "Synthetix Horizon: Cybernetic Luxe",
      palette: [
        { name: "Deep Obsidian", hex: "#000000" },
        { name: "Cyan Luminescence", hex: "#06B6D4" },
        { name: "Electric Ultraviolet", hex: "#8B5CF6" },
        { name: "Platinum White", hex: "#FFFFFF" }
      ],
      decorStyle: "RGB LED pixel tubes, matte black staging, holographic projection backdrops, and interactive ambient glow bars.",
      recommendedInventory: ["Curved 4K Ultra-HD LED Video Wall", "Wireless RGB Up-Lighting Fixtures"],
      vibeNarrative: "An electrifying, forward-looking sensory experience designed to captivate tech innovators, founders, and trendsetters."
    },
    "Goa Sunset Coastal Chic": {
      title: "Solstice Horizon: Coastal Monochrome Chic",
      palette: [
        { name: "Bleached Sand", hex: "#F4F4F5" },
        { name: "Driftwood", hex: "#A1A1AA" },
        { name: "Sea Salt", hex: "#E4E4E7" },
        { name: "Midnight Tide", hex: "#09090B" }
      ],
      decorStyle: "Circular bleached floral arches, matte black lanterns, low natural banquet feasting tables, and textured linen runners.",
      recommendedInventory: ["Circular White Archway & Base", "Solid Oak Farm Banquet Tables"],
      vibeNarrative: "Free-spirited coastal celebration filled with earthy natural textures, ocean breezes, acoustic melodies, and sunset warmth."
    }
  };

  const selectedVibe = vibeConfigs[vibe] || vibeConfigs["Modern Minimalist"];
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
    { time: "04:30 PM", title: "Guest Arrival & Welcome Refreshments", desc: "Ambient acoustic duo, artisanal passed canapes." },
    { time: "05:30 PM", title: "Main Ceremony / Keynote Session", desc: "Ceremonial procession, cinematic grand entrance, featured speeches." },
    { time: "07:30 PM", title: "Gourmet Feast Banquet", desc: "Curated multi-course live counters (Pure Veg, Non-Veg, Jain specialties)." },
    { time: "09:15 PM", title: "Dance Floor & Dessert Lounge", desc: "Live percussionists, DJ celebration set, late-night artisanal desserts." }
  ];

  container.innerHTML = `
    <!-- Print Header (Visible only when printed) -->
    <div class="print-banner hidden">
      <h1 style="font-size: 24pt; font-weight: 800; margin: 0; color: #000000;">EVENTEXO</h1>
      <p style="font-size: 11pt; color: #52525b; margin-top: 4px; font-weight: 600;">Executive Event Blueprint & Strategic Production Plan • ${type}</p>
    </div>

    <!-- Concept Header Banner -->
    <div class="p-8 rounded-2xl bg-white/[0.03] border border-white/10 mb-8 relative">
      <div class="flex items-center justify-between gap-4 mb-3">
        <div class="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-zinc-400">
          <i data-lucide="sparkles" class="w-4 h-4 text-white"></i>
          <span>${geminiData ? 'Gemini 1.5 Live AI Generated Strategy' : 'Eventexo Neural Architecture'}</span>
        </div>
        <button onclick="printAIBlueprint()" class="no-print btn-chrome-outline px-3.5 py-1.5 text-xs font-semibold flex items-center gap-1.5">
          <i data-lucide="printer" class="w-3.5 h-3.5 text-zinc-300"></i>
          <span>Export Blueprint (PDF / Print)</span>
        </button>
      </div>
      <h3 class="text-2xl sm:text-3xl font-bold text-white mb-3 tracking-tight">
        ${conceptTitle}
      </h3>
      <p class="text-sm text-zinc-400 leading-relaxed mb-6">
        ${conceptNarrative}
      </p>
      <div class="flex flex-wrap items-center gap-3 text-xs font-medium">
        <span class="px-3.5 py-1 rounded-full bg-white/5 text-zinc-300 border border-white/10">Type: ${type}</span>
        <span class="px-3.5 py-1 rounded-full bg-white/5 text-zinc-300 border border-white/10">Guests: ${guests} Attendees</span>
        <span class="px-3.5 py-1 rounded-full bg-white/10 text-white border border-white/20 font-bold">
          Total Allocation: ${EventDataStore.formatCurrency(budget)} (~${EventDataStore.formatCurrency(perGuest)}/guest)
        </span>
      </div>
    </div>

    <!-- 1. Color Palette Generator -->
    <div class="mb-8">
      <h4 class="text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-3 flex items-center gap-1.5">
        <i data-lucide="palette" class="w-4 h-4 text-zinc-300"></i>
        <span>Curated Color Palette & Material Styling</span>
      </h4>
      <div class="grid grid-cols-2 sm:grid-cols-4 gap-3">
        ${selectedVibe.palette.map(color => `
          <div class="p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.08] flex flex-col items-center text-center group cursor-pointer hover:border-white/30 transition-all" onclick="copyColorCode('${color.hex}')">
            <div class="w-full h-14 rounded-lg mb-2 shadow-inner border border-white/10 group-hover:scale-105 transition-transform" style="background-color: ${color.hex}"></div>
            <span class="text-xs font-semibold text-white">${color.name}</span>
            <span class="text-[11px] font-mono text-zinc-400 uppercase mt-0.5">${color.hex}</span>
          </div>
        `).join('')}
      </div>
    </div>

    <!-- 2. Budget Allocation Breakdown -->
    <div class="mb-8">
      <h4 class="text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-3 flex items-center gap-1.5">
        <i data-lucide="pie-chart" class="w-4 h-4 text-zinc-300"></i>
        <span>Optimized Budget Breakdown (${EventDataStore.formatCurrency(budget)})</span>
      </h4>
      <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div class="p-4 rounded-xl bg-white/[0.02] border border-white/[0.08]">
          <div class="text-[11px] text-zinc-400 font-medium uppercase">Venue & Facility (35%)</div>
          <div class="text-lg font-bold text-white mt-1 font-mono">${EventDataStore.formatCurrency(venueBudget)}</div>
          <div class="text-[11px] text-zinc-500 mt-0.5">Palace lawns, ballroom, permits</div>
        </div>
        <div class="p-4 rounded-xl bg-white/[0.02] border border-white/[0.08]">
          <div class="text-[11px] text-zinc-400 font-medium uppercase">Catering & Bar (30%)</div>
          <div class="text-lg font-bold text-white mt-1 font-mono">${EventDataStore.formatCurrency(cateringBudget)}</div>
          <div class="text-[11px] text-zinc-500 mt-0.5">Live gourmet stalls, cocktail bar</div>
        </div>
        <div class="p-4 rounded-xl bg-white/[0.02] border border-white/[0.08]">
          <div class="text-[11px] text-zinc-400 font-medium uppercase">Decor & Staging (15%)</div>
          <div class="text-lg font-bold text-white mt-1 font-mono">${EventDataStore.formatCurrency(decorBudget)}</div>
          <div class="text-[11px] text-zinc-500 mt-0.5">Stage layout, lighting, floral installs</div>
        </div>
        <div class="p-4 rounded-xl bg-white/[0.02] border border-white/[0.08]">
          <div class="text-[11px] text-zinc-400 font-medium uppercase">Photo & Cinema (10%)</div>
          <div class="text-lg font-bold text-white mt-1 font-mono">${EventDataStore.formatCurrency(photoBudget)}</div>
          <div class="text-[11px] text-zinc-500 mt-0.5">Full coverage + 4K drone reel</div>
        </div>
        <div class="p-4 rounded-xl bg-white/[0.02] border border-white/[0.08]">
          <div class="text-[11px] text-zinc-400 font-medium uppercase">AV & Music (10%)</div>
          <div class="text-lg font-bold text-white mt-1 font-mono">${EventDataStore.formatCurrency(avBudget)}</div>
          <div class="text-[11px] text-zinc-500 mt-0.5">DJ, live sound, stage rig, acoustics</div>
        </div>
        <div class="p-4 rounded-xl bg-white/[0.03] border border-white/[0.15] flex flex-col justify-center items-center text-center">
          <div class="text-xs text-zinc-300 font-semibold">Projected Cost / Guest</div>
          <div class="text-xl font-bold text-white mt-0.5 font-mono">${EventDataStore.formatCurrency(perGuest)}</div>
        </div>
      </div>
    </div>

    <!-- 3. Run-of-Show Schedule -->
    <div class="mb-8">
      <h4 class="text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-3 flex items-center gap-1.5">
        <i data-lucide="clock" class="w-4 h-4 text-zinc-300"></i>
        <span>AI Generated Run-of-Show Schedule</span>
      </h4>
      <div class="space-y-2.5">
        ${scheduleItems.map(item => `
          <div class="flex items-center gap-4 p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.06]">
            <span class="font-mono text-xs font-bold text-white w-24 flex-shrink-0">${item.time}</span>
            <div class="text-xs text-zinc-300">
              <span class="font-bold text-white">${item.title}</span> — ${item.desc}
            </div>
          </div>
        `).join('')}
      </div>
    </div>

    <!-- Quick Action: Apply to Event Wizard -->
    <div class="no-print p-6 rounded-2xl bg-white/[0.03] border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
      <div>
        <h4 class="font-bold text-white text-base">Satisfied with this creative blueprint?</h4>
        <p class="text-xs text-zinc-400 mt-0.5">Transfer this strategy directly into the Event Creation Wizard or export to PDF.</p>
      </div>
      <div class="flex items-center gap-3">
        <button onclick="printAIBlueprint()" class="btn-chrome-outline px-4 py-2.5 text-xs font-semibold flex items-center gap-1.5">
          <i data-lucide="printer" class="w-4 h-4 text-zinc-300"></i>
          <span>Print / PDF</span>
        </button>
        <button onclick="applyBlueprintToWizard('${type}', '${conceptTitle.replace(/'/g, "\\'")}', ${budget}, ${guests})" class="btn-chrome px-6 py-2.5 text-xs font-bold flex items-center gap-2 shadow-lg">
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
