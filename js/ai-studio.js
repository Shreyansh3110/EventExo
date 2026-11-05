/**
 * EventFlow AI - AI Design Studio & Event Generator Engine
 */

function generateAIEventBlueprint() {
  const eventType = document.getElementById('ai-event-type').value;
  const vibe = document.getElementById('ai-event-vibe').value;
  const guests = parseInt(document.getElementById('ai-guests').value) || 120;
  const budget = parseInt(document.getElementById('ai-budget').value) || 30000;
  const notes = document.getElementById('ai-notes')?.value || '';

  const outputContainer = document.getElementById('ai-results-container');
  const loadingState = document.getElementById('ai-loading-state');

  if (!outputContainer || !loadingState) return;

  // Show loading animation
  outputContainer.classList.add('hidden');
  loadingState.classList.remove('hidden');

  // Simulated AI reasoning latency
  setTimeout(() => {
    loadingState.classList.add('hidden');
    outputContainer.classList.remove('hidden');
    renderAIGeneratedPlan(eventType, vibe, guests, budget, notes);
    if (window.lucide) lucide.createIcons();
  }, 1000);
}

function renderAIGeneratedPlan(type, vibe, guests, budget, notes) {
  const container = document.getElementById('ai-results-content');
  if (!container) return;

  // Aesthetic presets based on vibe
  const vibeConfigs = {
    "Royal Vintage": {
      title: "Imperial Heritage & Velvet Elegance",
      palette: [
        { name: "Burgundy Velvet", hex: "#4A0E17" },
        { name: "Imperial Gold", hex: "#D4AF37" },
        { name: "Champagne Silk", hex: "#F5F5DC" },
        { name: "Antique Slate", hex: "#2F3E46" }
      ],
      decorStyle: "Brass candelabras, heavy velvet drapery, cascading garden roses, and vintage crystal chandeliers.",
      recommendedInventory: ["Vintage Crystal Chandelier Cascades", "Gold Chiavari Chairs with Ivory Cushions"],
      vibeNarrative: "A timeless, stately aesthetic characterized by warm candlelight, regal textures, and classical floral architecture."
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
      vibeNarrative: "An electrifying, forward-looking sensory experience designed to captivate tech innovators and trendsetters."
    },
    "Bohemian Sunset": {
      title: "Golden Hour Solstice: Organic Chic",
      palette: [
        { name: "Terracotta Earth", hex: "#D97706" },
        { name: "Desert Ochre", hex: "#F97316" },
        { name: "Warm Flax", hex: "#FEF08A" },
        { name: "Raw Umber", hex: "#78350F" }
      ],
      decorStyle: "Plumed pampas grass arches, rattan lanterns, low reclaimed wood feasting tables, and textured linen table runners.",
      recommendedInventory: ["Circular Gold Floral Archway & Base", "Solid Oak Rustic Farm Banquet Tables"],
      vibeNarrative: "Free-spirited, warm, and intimate celebration filled with earthy natural textures, gentle breezes, and sunset warmth."
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

  const selectedVibe = vibeConfigs[vibe] || vibeConfigs["Royal Vintage"];

  // Dynamic budget calculation
  const venueBudget = Math.round(budget * 0.35);
  const cateringBudget = Math.round(budget * 0.30);
  const decorBudget = Math.round(budget * 0.15);
  const photoBudget = Math.round(budget * 0.10);
  const avBudget = Math.round(budget * 0.10);
  const perGuest = Math.round(budget / guests);

  container.innerHTML = `
    <!-- Concept Header Banner -->
    <div class="p-6 rounded-2xl bg-gradient-to-r from-indigo-950/80 via-purple-950/60 to-slate-900 border border-indigo-500/30 mb-8">
      <div class="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-indigo-400 mb-2">
        <i data-lucide="sparkles" class="w-4 h-4 text-indigo-400"></i>
        <span>AI Generated Concept & Event Strategy</span>
      </div>
      <h3 class="font-heading text-2xl sm:text-3xl font-extrabold text-white mb-2">
        ${selectedVibe.title}
      </h3>
      <p class="text-sm text-slate-300 leading-relaxed mb-4">
        ${selectedVibe.vibeNarrative}
      </p>
      <div class="flex flex-wrap items-center gap-3 text-xs font-semibold">
        <span class="px-3 py-1 rounded-full bg-white/10 text-slate-200 border border-white/10">Type: ${type}</span>
        <span class="px-3 py-1 rounded-full bg-white/10 text-slate-200 border border-white/10">Guests: ${guests} Attendees</span>
        <span class="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">Total: $${budget.toLocaleString()} (~$${perGuest}/guest)</span>
      </div>
    </div>

    <!-- 1. Color Palette Generator -->
    <div class="mb-8">
      <h4 class="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-1.5">
        <i data-lucide="palette" class="w-4 h-4 text-purple-400"></i>
        <span>Curated Color Palette</span>
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
        <span>Optimized Budget Breakdown ($${budget.toLocaleString()})</span>
      </h4>
      <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div class="p-4 rounded-xl bg-slate-900/60 border border-white/10">
          <div class="text-[11px] text-slate-400 font-semibold uppercase">Venue & Facility (35%)</div>
          <div class="text-lg font-bold text-white mt-1">$${venueBudget.toLocaleString()}</div>
          <div class="text-[11px] text-slate-400 mt-0.5">Ballroom, terrace, security</div>
        </div>
        <div class="p-4 rounded-xl bg-slate-900/60 border border-white/10">
          <div class="text-[11px] text-slate-400 font-semibold uppercase">Catering & Bar (30%)</div>
          <div class="text-lg font-bold text-white mt-1">$${cateringBudget.toLocaleString()}</div>
          <div class="text-[11px] text-slate-400 mt-0.5">3-course dinner, open bar</div>
        </div>
        <div class="p-4 rounded-xl bg-slate-900/60 border border-white/10">
          <div class="text-[11px] text-slate-400 font-semibold uppercase">Decor & Florals (15%)</div>
          <div class="text-lg font-bold text-white mt-1">$${decorBudget.toLocaleString()}</div>
          <div class="text-[11px] text-slate-400 mt-0.5">Centerpieces, lighting, arches</div>
        </div>
        <div class="p-4 rounded-xl bg-slate-900/60 border border-white/10">
          <div class="text-[11px] text-slate-400 font-semibold uppercase">Photo & Cinema (10%)</div>
          <div class="text-lg font-bold text-white mt-1">$${photoBudget.toLocaleString()}</div>
          <div class="text-[11px] text-slate-400 mt-0.5">8hr coverage + highlight reel</div>
        </div>
        <div class="p-4 rounded-xl bg-slate-900/60 border border-white/10">
          <div class="text-[11px] text-slate-400 font-semibold uppercase">AV & Music (10%)</div>
          <div class="text-lg font-bold text-white mt-1">$${avBudget.toLocaleString()}</div>
          <div class="text-[11px] text-slate-400 mt-0.5">DJ / Live horn, staging, mic</div>
        </div>
        <div class="p-4 rounded-xl bg-indigo-950/40 border border-indigo-500/30 flex flex-col justify-center items-center text-center">
          <div class="text-xs text-indigo-300 font-bold">Projected Cost / Guest</div>
          <div class="text-xl font-extrabold text-white mt-0.5">$${perGuest}</div>
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
        <div class="flex items-center gap-4 p-3 rounded-xl bg-slate-900/40 border border-white/5">
          <span class="font-mono text-xs font-bold text-indigo-400 w-20 flex-shrink-0">04:30 PM</span>
          <div class="text-xs text-slate-200"><span class="font-bold text-white">Guest Arrival & Welcome Cocktails</span> — Ambient acoustic music, artisanal passed canapes.</div>
        </div>
        <div class="flex items-center gap-4 p-3 rounded-xl bg-slate-900/40 border border-white/5">
          <span class="font-mono text-xs font-bold text-indigo-400 w-20 flex-shrink-0">05:30 PM</span>
          <div class="text-xs text-slate-200"><span class="font-bold text-white">Main Ceremony / Keynote Address</span> — Program staging, cinematic entrance, featured speeches.</div>
        </div>
        <div class="flex items-center gap-4 p-3 rounded-xl bg-slate-900/40 border border-white/5">
          <span class="font-mono text-xs font-bold text-indigo-400 w-20 flex-shrink-0">07:00 PM</span>
          <div class="text-xs text-slate-200"><span class="font-bold text-white">Gourmet Dinner Banquet</span> — Plated service, sommelier wine pairing, toast celebrations.</div>
        </div>
        <div class="flex items-center gap-4 p-3 rounded-xl bg-slate-900/40 border border-white/5">
          <span class="font-mono text-xs font-bold text-indigo-400 w-20 flex-shrink-0">08:45 PM</span>
          <div class="text-xs text-slate-200"><span class="font-bold text-white">Dessert Bar & Dance Floor Opening</span> — Dynamic lighting transition, DJ live set, late-night bites.</div>
        </div>
      </div>
    </div>

    <!-- Quick Action: Apply to Event Wizard -->
    <div class="p-5 rounded-2xl bg-indigo-950/60 border border-indigo-500/40 flex flex-col sm:flex-row items-center justify-between gap-4">
      <div>
        <h4 class="font-bold text-white text-sm">Love this event strategy?</h4>
        <p class="text-xs text-indigo-300 mt-0.5">Transfer this blueprint directly into the Event Creation Wizard.</p>
      </div>
      <button onclick="applyBlueprintToWizard('${type}', '${selectedVibe.title}', ${budget}, ${guests})" class="px-5 py-2.5 rounded-xl text-xs font-bold bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-500/30 flex items-center gap-2 transition-all">
        <span>Apply to Create Event Wizard</span>
        <i data-lucide="arrow-right" class="w-4 h-4"></i>
      </button>
    </div>
  `;
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
  // Navigate to create-event tab and fill inputs
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
