/**
 * Eventexo - Extended Business & Operations Modules
 * Powers: Guest RSVP Manager, Budget Planner, Vendor Hub, Inventory Tracker, and Create Event Wizard
 */

// 1. GUEST LIST & RSVP MANAGEMENT MODULE
function initGuestModule() {
  renderGuestList('all', '');

  const searchInput = document.getElementById('guest-search-input');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      const activeFilter = document.querySelector('.guest-filter-btn.active')?.dataset.filter || 'all';
      renderGuestList(activeFilter, e.target.value);
    });
  }

  const addGuestForm = document.getElementById('add-guest-form');
  if (addGuestForm) {
    addGuestForm.addEventListener('submit', handleAddGuest);
  }
}

function renderGuestList(filter = 'all', search = '') {
  const container = document.getElementById('guests-table-body');
  if (!container) return;

  const guests = EventDataStore.getGuests();
  const query = search.toLowerCase().trim();

  // Summary Metrics
  const totalGuests = guests.length;
  const confirmed = guests.filter(g => g.rsvp === 'Confirmed').length;
  const awaiting = guests.filter(g => g.rsvp === 'Awaiting').length;
  const declined = guests.filter(g => g.rsvp === 'Declined').length;
  const vegCount = guests.filter(g => g.diet === 'Pure Veg').length;
  const nonVegCount = guests.filter(g => g.diet === 'Non-Veg').length;
  const jainCount = guests.filter(g => g.diet === 'Jain').length;

  const elTotal = document.getElementById('guest-stat-total');
  const elConfirmed = document.getElementById('guest-stat-confirmed');
  const elAwaiting = document.getElementById('guest-stat-awaiting');
  const elDiet = document.getElementById('guest-stat-diet');

  if (elTotal) elTotal.innerText = totalGuests;
  if (elConfirmed) elConfirmed.innerText = confirmed;
  if (elAwaiting) elAwaiting.innerText = awaiting;
  if (elDiet) elDiet.innerText = `${vegCount} Veg • ${nonVegCount} Non-Veg • ${jainCount} Jain`;

  let filtered = guests;
  if (filter !== 'all') {
    filtered = filtered.filter(g => g.rsvp.toLowerCase() === filter.toLowerCase());
  }
  if (query) {
    filtered = filtered.filter(g => 
      g.name.toLowerCase().includes(query) || 
      g.table.toLowerCase().includes(query) || 
      g.email.toLowerCase().includes(query)
    );
  }

  if (filtered.length === 0) {
    container.innerHTML = `
      <tr>
        <td colspan="6" class="px-6 py-8 text-center text-slate-400 text-xs">
          No guests found matching your criteria.
        </td>
      </tr>
    `;
    return;
  }

  container.innerHTML = filtered.map(g => {
    let rsvpClass = "rsvp-confirmed";
    if (g.rsvp === 'Awaiting') rsvpClass = "rsvp-awaiting";
    if (g.rsvp === 'Declined') rsvpClass = "rsvp-declined";

    let dietClass = "diet-badge-veg";
    if (g.diet === 'Non-Veg') dietClass = "diet-badge-nonveg";
    if (g.diet === 'Jain') dietClass = "diet-badge-jain";

    return `
      <tr class="border-b border-white/5 hover:bg-white/[0.02] transition-colors text-xs">
        <td class="px-6 py-4">
          <div class="font-bold text-white text-sm">${g.name}</div>
          <div class="text-[11px] text-slate-400 flex items-center gap-2 mt-0.5">
            <span>${g.email}</span>
            <span>•</span>
            <span>${g.phone}</span>
          </div>
        </td>
        <td class="px-6 py-4">
          <select onchange="handleGuestRSVPChange('${g.id}', this.value)" class="px-2.5 py-1 rounded-full text-[11px] font-semibold border ${rsvpClass} bg-slate-900 cursor-pointer focus:outline-none">
            <option value="Confirmed" ${g.rsvp === 'Confirmed' ? 'selected' : ''}>Confirmed</option>
            <option value="Awaiting" ${g.rsvp === 'Awaiting' ? 'selected' : ''}>Awaiting</option>
            <option value="Declined" ${g.rsvp === 'Declined' ? 'selected' : ''}>Declined</option>
          </select>
        </td>
        <td class="px-6 py-4">
          <span class="px-2.5 py-0.5 rounded-full text-[10px] font-bold ${dietClass}">
            ${g.diet}
          </span>
        </td>
        <td class="px-6 py-4 font-medium text-slate-300">
          ${g.table}
        </td>
        <td class="px-6 py-4">
          ${g.plusOne 
            ? '<span class="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-white/10 text-white border border-white/20">+1 Guest</span>' 
            : '<span class="text-zinc-500 text-[11px]">Single</span>'}
        </td>
        <td class="px-6 py-4 text-right">
          <button onclick="handleDeleteGuest('${g.id}')" class="p-1.5 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 transition-colors" title="Remove Guest">
            <i data-lucide="trash-2" class="w-4 h-4"></i>
          </button>
        </td>
      </tr>
    `;
  }).join('');

  if (window.lucide) lucide.createIcons();
}

function filterGuestsByRSVP(filter) {
  document.querySelectorAll('.guest-filter-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.filter === filter);
    if (btn.dataset.filter === filter) {
      btn.classList.add('bg-white', 'text-black', 'font-bold');
      btn.classList.remove('bg-white/5', 'text-zinc-400');
    } else {
      btn.classList.remove('bg-white', 'text-black', 'font-bold');
      btn.classList.add('bg-white/5', 'text-zinc-400');
    }
  });
  const search = document.getElementById('guest-search-input')?.value || '';
  renderGuestList(filter, search);
}

function handleGuestRSVPChange(id, status) {
  EventDataStore.updateGuestRSVP(id, status);
  const activeFilter = document.querySelector('.guest-filter-btn.active')?.dataset.filter || 'all';
  const search = document.getElementById('guest-search-input')?.value || '';
  renderGuestList(activeFilter, search);
  if (typeof showToast === 'function') {
    showToast("RSVP Updated", `Guest status updated to ${status}.`, "check-circle");
  }
}

function handleDeleteGuest(id) {
  if (confirm("Are you sure you want to remove this guest from the event roster?")) {
    EventDataStore.deleteGuest(id);
    const activeFilter = document.querySelector('.guest-filter-btn.active')?.dataset.filter || 'all';
    const search = document.getElementById('guest-search-input')?.value || '';
    renderGuestList(activeFilter, search);
    if (typeof showToast === 'function') {
      showToast("Guest Removed", "Guest has been deleted.", "trash-2");
    }
  }
}

function handleAddGuest(e) {
  e.preventDefault();
  const name = document.getElementById('new-guest-name').value.trim();
  const email = document.getElementById('new-guest-email').value.trim();
  const phone = document.getElementById('new-guest-phone').value.trim() || '+91 98000 00000';
  const rsvp = document.getElementById('new-guest-rsvp').value;
  const diet = document.getElementById('new-guest-diet').value;
  const table = document.getElementById('new-guest-table').value.trim() || 'Table 1 (Family VIP)';
  const plusOne = document.getElementById('new-guest-plusone').checked;

  if (!name || !email) return;

  const newGuest = {
    id: 'GST-' + Math.floor(100 + Math.random() * 900),
    name,
    email,
    phone,
    rsvp,
    diet,
    table,
    plusOne
  };

  EventDataStore.saveGuest(newGuest);
  e.target.reset();

  const activeFilter = document.querySelector('.guest-filter-btn.active')?.dataset.filter || 'all';
  renderGuestList(activeFilter, '');

  if (typeof showToast === 'function') {
    showToast("Guest Added", `${name} added to the invitation roster!`, "user-check");
  }
}

// 2. BUDGET PLANNER MODULE
function initBudgetModule() {
  const events = EventDataStore.getEvents();
  const select = document.getElementById('budget-event-select');
  if (select) {
    select.innerHTML = events.map(e => `
      <option value="${e.id}">${e.title} (${EventDataStore.formatCurrency(e.budget)})</option>
    `).join('');

    select.addEventListener('change', (e) => {
      renderBudgetForEvent(e.target.value);
    });
  }

  if (events.length > 0) {
    renderBudgetForEvent(events[0].id);
  }

  const addExpenseForm = document.getElementById('add-expense-form');
  if (addExpenseForm) {
    addExpenseForm.addEventListener('submit', handleAddExpense);
  }
}

function renderBudgetForEvent(eventId) {
  const events = EventDataStore.getEvents();
  const evt = events.find(e => e.id === eventId) || events[0];
  if (!evt) return;

  const totalBudget = evt.budget || 1200000;
  const spent = evt.spent || 0;
  const remaining = totalBudget - spent;
  const percentUsed = Math.min(Math.round((spent / totalBudget) * 100), 100);

  const elTotal = document.getElementById('budget-total-display');
  const elSpent = document.getElementById('budget-spent-display');
  const elRemaining = document.getElementById('budget-remaining-display');

  if (elTotal) elTotal.innerText = EventDataStore.formatCurrency(totalBudget);
  if (elSpent) elSpent.innerText = EventDataStore.formatCurrency(spent);
  if (elRemaining) elRemaining.innerText = EventDataStore.formatCurrency(remaining);
  
  const progressBar = document.getElementById('budget-progress-bar');
  const percentLabel = document.getElementById('budget-percent-label');
  if (progressBar) progressBar.style.width = `${percentUsed}%`;
  if (percentLabel) percentLabel.innerText = `${percentUsed}% Used`;

  // Dynamic Category breakdown
  const categories = [
    { name: "Venue & Palace Lawns", allocated: Math.round(totalBudget * 0.35), spent: Math.round(spent * 0.38) },
    { name: "Gourmet Catering & Live Bar", allocated: Math.round(totalBudget * 0.30), spent: Math.round(spent * 0.30) },
    { name: "Decor, Floral & Mandap", allocated: Math.round(totalBudget * 0.15), spent: Math.round(spent * 0.16) },
    { name: "Photography & 4K Cinema", allocated: Math.round(totalBudget * 0.10), spent: Math.round(spent * 0.10) },
    { name: "AV, Sound, DJ & Stage", allocated: Math.round(totalBudget * 0.10), spent: Math.round(spent * 0.06) }
  ];

  const catContainer = document.getElementById('budget-category-list');
  if (catContainer) {
    catContainer.innerHTML = categories.map(cat => {
      const catPercent = Math.min(Math.round((cat.spent / cat.allocated) * 100), 100);
      return `
        <div class="p-4 rounded-xl bg-slate-900/60 border border-white/5 space-y-2">
          <div class="flex items-center justify-between text-xs">
            <span class="font-bold text-white">${cat.name}</span>
            <span class="font-mono text-slate-300">${EventDataStore.formatCurrency(cat.spent)} / ${EventDataStore.formatCurrency(cat.allocated)}</span>
          </div>
          <div class="w-full bg-zinc-900 rounded-full h-1.5 overflow-hidden">
            <div class="bg-gradient-to-r from-zinc-300 to-emerald-400 h-full rounded-full" style="width: ${catPercent}%"></div>
          </div>
        </div>
      `;
    }).join('');
  }
}

function printBudgetReport() {
  window.print();
}

function handleAddExpense(e) {
  e.preventDefault();
  const select = document.getElementById('budget-event-select');
  const amount = parseInt(document.getElementById('exp-amount').value) || 0;
  const desc = document.getElementById('exp-desc').value;

  if (amount > 0 && select) {
    const events = EventDataStore.getEvents();
    const evt = events.find(ev => ev.id === select.value);
    if (evt) {
      evt.spent = (evt.spent || 0) + amount;
      EventDataStore.updateEventStatus(evt.id, evt.status);
      renderBudgetForEvent(evt.id);
      if (typeof renderDashboardKPIs === 'function') renderDashboardKPIs();
      if (typeof showToast === 'function') {
        showToast("Expense Recorded", `Added ${EventDataStore.formatCurrency(amount)} for "${desc}"`, "credit-card");
      } else {
        alert(`Added ${EventDataStore.formatCurrency(amount)} for "${desc}"`);
      }
      e.target.reset();
    }
  }
}

// 3. VENDOR MANAGEMENT MODULE
function initVendorModule() {
  renderVendorsList('all');
}

function renderVendorsList(category) {
  const container = document.getElementById('vendors-grid');
  if (!container) return;

  let list = EventDataStore.getVendors();
  if (category && category !== 'all') {
    list = list.filter(v => v.category.toLowerCase().includes(category.toLowerCase()));
  }

  container.innerHTML = list.map(v => `
    <div class="saas-card p-6 flex flex-col justify-between group hover:border-white/30">
      <div>
        <div class="flex items-start justify-between gap-2 mb-3">
          <div>
            <span class="px-2.5 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wider bg-white/5 text-zinc-300 border border-white/10">
              ${v.category}
            </span>
            <h3 class="font-bold text-white text-base mt-2 group-hover:text-zinc-200 transition-colors">${v.name}</h3>
          </div>
          <span class="px-2.5 py-0.5 rounded-full text-[11px] font-semibold ${
            v.status === 'Contract Signed' ? 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/30' :
            v.status === 'Confirmed' ? 'bg-white/10 text-white border border-white/20' :
            'bg-amber-500/15 text-amber-300 border border-amber-500/30'
          }">
            ${v.status}
          </span>
        </div>

        <p class="text-xs text-zinc-400 leading-relaxed mb-4">${v.description}</p>
        
        <div class="flex items-center gap-4 text-xs text-zinc-300 border-t border-white/[0.08] pt-3 mb-4">
          <div class="flex items-center gap-1 text-zinc-200 font-bold">
            <i data-lucide="star" class="w-3.5 h-3.5 fill-white text-white"></i>
            <span>${v.rating}</span>
          </div>
          <span class="text-zinc-600">•</span>
          <span class="font-mono font-bold text-zinc-200">${v.priceRange}</span>
        </div>
      </div>

      <div class="pt-3 border-t border-white/[0.08] flex items-center justify-between text-xs text-zinc-400">
        <span class="truncate">${v.phone}</span>
        <a href="mailto:${v.contact}" class="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-white font-semibold flex items-center gap-1 transition-colors">
          <i data-lucide="mail" class="w-3.5 h-3.5 text-zinc-300"></i>
          <span>Email</span>
        </a>
      </div>
    </div>
  `).join('');

  if (window.lucide) lucide.createIcons();
}

// 4. INVENTORY MANAGEMENT MODULE
function initInventoryModule() {
  const container = document.getElementById('inventory-table-body');
  if (!container) return;

  const items = EventDataStore.getInventory();

  container.innerHTML = items.map(item => `
    <tr class="border-b border-white/5 hover:bg-white/[0.02] transition-colors text-xs">
      <td class="px-6 py-4">
        <div class="font-bold text-white text-sm">${item.name}</div>
        <div class="text-[11px] font-mono text-slate-400">${item.id}</div>
      </td>
      <td class="px-6 py-4 text-slate-300">${item.category}</td>
      <td class="px-6 py-4 font-bold text-white">${item.totalStock}</td>
      <td class="px-6 py-4 text-amber-300 font-semibold">${item.inUse}</td>
      <td class="px-6 py-4 font-bold text-emerald-300">${item.available}</td>
      <td class="px-6 py-4 font-mono font-bold text-slate-200">${EventDataStore.formatCurrency(item.pricePerDay)}/day</td>
      <td class="px-6 py-4">
        <span class="px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
          item.status === 'In Stock' ? 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/30' :
          'bg-rose-500/15 text-rose-300 border border-rose-500/30'
        }">
          ${item.status}
        </span>
      </td>
    </tr>
  `).join('');
}

// 5. CUSTOMER CLIENT PORTAL MODULE
function initClientPortal() {
  const tasksContainer = document.getElementById('portal-tasks-list');
  if (!tasksContainer) return;

  const tasks = EventDataStore.getClientTasks();

  tasksContainer.innerHTML = tasks.map(t => `
    <div class="flex items-center justify-between p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.08] hover:border-white/20 transition-colors">
      <div class="flex items-center gap-3">
        <input 
          type="checkbox" 
          ${t.completed ? 'checked' : ''} 
          onchange="EventDataStore.toggleClientTask('${t.id}'); initClientPortal();"
          class="w-4 h-4 rounded text-white focus:ring-0 cursor-pointer accent-white"
        />
        <div>
          <span class="text-xs sm:text-sm font-semibold ${t.completed ? 'line-through text-zinc-500' : 'text-white'}">
            ${t.title}
          </span>
          <div class="text-[10px] font-semibold uppercase tracking-wider text-zinc-400 mt-0.5">
            ${t.category} • Due ${t.deadline}
          </div>
        </div>
      </div>
      <span class="text-[11px] font-semibold px-2 py-0.5 rounded-full ${t.completed ? 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/30' : 'bg-white/5 text-zinc-400 border border-white/10'}">
        ${t.completed ? 'Complete' : 'Pending'}
      </span>
    </div>
  `).join('');
}

// 6. CREATE NEW EVENT WIZARD HANDLER
function handleCreateEventSubmit(e) {
  e.preventDefault();

  const title = document.getElementById('wiz-title').value.trim();
  const clientName = document.getElementById('wiz-client').value.trim() || 'Valued Client';
  const type = document.getElementById('wiz-type').value;
  const date = document.getElementById('wiz-date').value || '2027-10-15';
  const venue = document.getElementById('wiz-venue').value.trim() || 'Grand Heritage Lawn, Jaipur';
  const guests = parseInt(document.getElementById('wiz-guests').value) || 200;
  const budget = parseInt(document.getElementById('wiz-budget').value) || 1200000;
  const theme = document.getElementById('wiz-theme')?.value || 'Royal Rajasthani & Vintage Grandeur';

  const newEvent = {
    id: 'EVT-' + Math.floor(1000 + Math.random() * 9000),
    title: title,
    clientName: clientName,
    type: type,
    date: date,
    venue: venue,
    guests: guests,
    budget: budget,
    spent: 0,
    status: 'In Progress',
    theme: theme,
    assignedVendors: ["VND-01", "VND-02"]
  };

  EventDataStore.saveEvent(newEvent);

  if (window.confetti) {
    confetti({ particleCount: 120, spread: 70, origin: { y: 0.6 } });
  }

  if (typeof showToast === 'function') {
    showToast("Event Created Successfully", `"${title}" has been launched into Eventexo!`, "sparkles");
  } else {
    alert(`Event "${title}" successfully registered in Eventexo!`);
  }

  switchView('dashboard');
  if (typeof initDashboardModule === 'function') initDashboardModule();
}

// Re-render when currency changes
window.addEventListener('currencyChanged', () => {
  const select = document.getElementById('budget-event-select');
  if (select && select.value) {
    renderBudgetForEvent(select.value);
  }
  initInventoryModule();
  if (typeof renderDashboardKPIs === 'function') renderDashboardKPIs();
  if (typeof renderEventsCatalog === 'function') renderEventsCatalog();
});
