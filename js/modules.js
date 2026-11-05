/**
 * EventFlow AI - Extended Business Modules
 * Powers: Budget Planner, Vendor Hub, Inventory Tracker, Customer Portal, and Create Event Wizard
 */

// 1. BUDGET PLANNER MODULE
function initBudgetModule() {
  const events = EventDataStore.getEvents();
  const select = document.getElementById('budget-event-select');
  if (select) {
    select.innerHTML = events.map(e => `
      <option value="${e.id}">${e.title} ($${e.budget.toLocaleString()})</option>
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

  const totalBudget = evt.budget || 50000;
  const spent = evt.spent || 0;
  const remaining = totalBudget - spent;
  const percentUsed = Math.min(Math.round((spent / totalBudget) * 100), 100);

  document.getElementById('budget-total-display').innerText = `$${totalBudget.toLocaleString()}`;
  document.getElementById('budget-spent-display').innerText = `$${spent.toLocaleString()}`;
  document.getElementById('budget-remaining-display').innerText = `$${remaining.toLocaleString()}`;
  
  const progressBar = document.getElementById('budget-progress-bar');
  const percentLabel = document.getElementById('budget-percent-label');
  if (progressBar) progressBar.style.width = `${percentUsed}%`;
  if (percentLabel) percentLabel.innerText = `${percentUsed}% Used`;

  // Dynamic Category breakdown
  const categories = [
    { name: "Venue & Permits", allocated: Math.round(totalBudget * 0.35), spent: Math.round(spent * 0.38) },
    { name: "Catering & Beverages", allocated: Math.round(totalBudget * 0.30), spent: Math.round(spent * 0.30) },
    { name: "Decor & Floral Styling", allocated: Math.round(totalBudget * 0.15), spent: Math.round(spent * 0.16) },
    { name: "Photography & Cinema", allocated: Math.round(totalBudget * 0.10), spent: Math.round(spent * 0.10) },
    { name: "AV, Stage & Lighting", allocated: Math.round(totalBudget * 0.10), spent: Math.round(spent * 0.06) }
  ];

  const catContainer = document.getElementById('budget-category-list');
  if (catContainer) {
    catContainer.innerHTML = categories.map(cat => {
      const catPercent = Math.min(Math.round((cat.spent / cat.allocated) * 100), 100);
      return `
        <div class="p-4 rounded-xl bg-slate-900/60 border border-white/5 space-y-2">
          <div class="flex items-center justify-between text-xs">
            <span class="font-bold text-white">${cat.name}</span>
            <span class="font-mono text-slate-300">$${cat.spent.toLocaleString()} / $${cat.allocated.toLocaleString()}</span>
          </div>
          <div class="w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
            <div class="bg-indigo-500 h-full rounded-full" style="width: ${catPercent}%"></div>
          </div>
        </div>
      `;
    }).join('');
  }
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
      renderDashboardKPIs();
      alert(`Added $${amount.toLocaleString()} for "${desc}"`);
      e.target.reset();
    }
  }
}

// 2. VENDOR MANAGEMENT MODULE
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
    <div class="saas-card p-6 flex flex-col justify-between group hover:border-indigo-500/40">
      <div>
        <div class="flex items-start justify-between gap-2 mb-3">
          <div>
            <span class="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-white/5 text-indigo-400 border border-white/10">
              ${v.category}
            </span>
            <h3 class="font-bold text-white text-base mt-2 group-hover:text-indigo-300 transition-colors">${v.name}</h3>
          </div>
          <span class="px-2.5 py-0.5 rounded-full text-[11px] font-semibold ${
            v.status === 'Contract Signed' ? 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/30' :
            v.status === 'Confirmed' ? 'bg-indigo-500/15 text-indigo-300 border border-indigo-500/30' :
            'bg-amber-500/15 text-amber-300 border border-amber-500/30'
          }">
            ${v.status}
          </span>
        </div>

        <p class="text-xs text-slate-400 leading-relaxed mb-4">${v.description}</p>
        
        <div class="flex items-center gap-4 text-xs text-slate-300 border-t border-white/5 pt-3 mb-4">
          <div class="flex items-center gap-1 text-amber-400 font-bold">
            <i data-lucide="star" class="w-3.5 h-3.5 fill-amber-400"></i>
            <span>${v.rating}</span>
          </div>
          <span class="text-slate-500">•</span>
          <span class="font-mono font-bold text-slate-200">${v.priceRange}</span>
        </div>
      </div>

      <div class="pt-3 border-t border-white/5 flex items-center justify-between text-xs text-slate-400">
        <span class="truncate">${v.contact}</span>
        <a href="mailto:${v.contact}" class="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-white font-semibold flex items-center gap-1 transition-colors">
          <i data-lucide="mail" class="w-3.5 h-3.5 text-indigo-400"></i>
          <span>Email</span>
        </a>
      </div>
    </div>
  `).join('');

  if (window.lucide) lucide.createIcons();
}

// 3. INVENTORY MANAGEMENT MODULE
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
      <td class="px-6 py-4 font-mono font-bold text-slate-200">$${item.pricePerDay.toFixed(2)}/day</td>
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

// 4. CUSTOMER CLIENT PORTAL MODULE
function initClientPortal() {
  const tasksContainer = document.getElementById('portal-tasks-list');
  if (!tasksContainer) return;

  const tasks = EventDataStore.getClientTasks();

  tasksContainer.innerHTML = tasks.map(t => `
    <div class="flex items-center justify-between p-3.5 rounded-xl bg-slate-900/50 border border-white/5 hover:border-indigo-500/30 transition-colors">
      <div class="flex items-center gap-3">
        <input 
          type="checkbox" 
          ${t.completed ? 'checked' : ''} 
          onchange="EventDataStore.toggleClientTask('${t.id}'); initClientPortal();"
          class="w-4 h-4 rounded text-indigo-600 focus:ring-0 cursor-pointer"
        />
        <div>
          <span class="text-xs sm:text-sm font-semibold ${t.completed ? 'line-through text-slate-500' : 'text-white'}">
            ${t.title}
          </span>
          <div class="text-[10px] font-semibold uppercase tracking-wider text-indigo-400 mt-0.5">
            ${t.category} • Due ${t.deadline}
          </div>
        </div>
      </div>
      <span class="text-[11px] font-semibold px-2 py-0.5 rounded-full ${t.completed ? 'bg-emerald-500/15 text-emerald-300' : 'bg-slate-800 text-slate-400'}">
        ${t.completed ? 'Complete' : 'Pending'}
      </span>
    </div>
  `).join('');
}

// 5. CREATE NEW EVENT WIZARD HANDLER
function handleCreateEventSubmit(e) {
  e.preventDefault();

  const title = document.getElementById('wiz-title').value.trim();
  const clientName = document.getElementById('wiz-client').value.trim() || 'Valued Client';
  const type = document.getElementById('wiz-type').value;
  const date = document.getElementById('wiz-date').value || '2027-10-15';
  const venue = document.getElementById('wiz-venue').value.trim() || 'Grand Horizon Venue';
  const guests = parseInt(document.getElementById('wiz-guests').value) || 100;
  const budget = parseInt(document.getElementById('wiz-budget').value) || 25000;
  const theme = document.getElementById('wiz-theme')?.value || 'Modern Minimalist';

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
    confetti({ particleCount: 100, spread: 60 });
  }

  alert(`Event "${title}" successfully registered in EventrixControl!`);

  // Switch to Dashboard view
  switchView('dashboard');
  initDashboardModule();
}
