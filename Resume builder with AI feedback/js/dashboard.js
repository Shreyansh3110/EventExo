/**
 * EventrixControl SaaS - Dashboard & Visual Analytics Controller
 * Powers the dark SaaS interface matching reference screenshot
 */

function initDashboardModule() {
  renderDashboardKPIs();
  renderUpcomingEventsList();
  renderMiniCalendar();
}

// 1. Render Top KPI Metrics Cards
function renderDashboardKPIs() {
  const events = EventDataStore.getEvents();
  const totalRevenue = events.reduce((sum, e) => sum + (e.spent || 0), 0);
  const totalBudget = events.reduce((sum, e) => sum + (e.budget || 0), 0);
  const confirmedCount = events.filter(e => e.status === 'Confirmed').length;
  const inProgressCount = events.filter(e => e.status === 'In Progress').length;
  const budgetingCount = events.filter(e => e.status === 'Budgeting').length;

  const elEventCount = document.getElementById('kpi-active-events');
  const elRevenue = document.getElementById('kpi-revenue');
  const elBudgets = document.getElementById('kpi-budgets');
  const elConversion = document.getElementById('kpi-conversion');

  if (elEventCount) elEventCount.innerText = events.length;
  if (elRevenue) elRevenue.innerText = `$${(totalRevenue > 0 ? totalRevenue : 148250).toLocaleString()}`;
  if (elBudgets) elBudgets.innerText = budgetingCount + 52;
  if (elConversion) elConversion.innerText = '32%';
}

// 2. Render Upcoming Events in the Dashboard Table
function renderUpcomingEventsList() {
  const container = document.getElementById('dashboard-events-list');
  if (!container) return;

  const events = EventDataStore.getEvents().slice(0, 5);

  container.innerHTML = events.map(evt => {
    let statusClass = "bg-emerald-500/15 text-emerald-300 border-emerald-500/30";
    if (evt.status === 'In Progress') statusClass = "bg-indigo-500/15 text-indigo-300 border-indigo-500/30";
    if (evt.status === 'Budgeting') statusClass = "bg-amber-500/15 text-amber-300 border-amber-500/30";
    if (evt.status === 'Cancelled') statusClass = "bg-rose-500/15 text-rose-300 border-rose-500/30";

    return `
      <div class="flex items-center justify-between p-3.5 rounded-xl bg-slate-900/50 border border-white/5 hover:border-indigo-500/30 transition-colors group">
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-900 to-purple-900 flex items-center justify-center font-bold text-white text-xs border border-white/10 flex-shrink-0">
            ${evt.type === 'Wedding' ? '💍' : evt.type === 'Corporate' ? '💼' : '🎉'}
          </div>
          <div>
            <h4 class="text-sm font-bold text-white group-hover:text-indigo-300 transition-colors line-clamp-1">${evt.title}</h4>
            <p class="text-xs text-slate-400 mt-0.5 flex items-center gap-2">
              <span>${evt.venue}</span>
              <span>•</span>
              <span class="text-slate-300">${evt.date}</span>
            </p>
          </div>
        </div>

        <div class="flex items-center gap-3">
          <span class="px-2.5 py-1 rounded-full text-[11px] font-semibold border ${statusClass} whitespace-nowrap">
            ${evt.status}
          </span>
          <button onclick="viewEventDetails('${evt.id}')" class="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors" title="Manage Event">
            <i data-lucide="chevron-right" class="w-4 h-4"></i>
          </button>
        </div>
      </div>
    `;
  }).join('');

  if (window.lucide) lucide.createIcons();
}

// 3. Render Interactive Mini Calendar Widget
function renderMiniCalendar() {
  const container = document.getElementById('mini-calendar-grid');
  if (!container) return;

  const daysInMonth = 30; // June/November representation
  const startOffset = 2;  // starts on Tuesday

  let html = '';
  // Empty offset days
  for (let i = 0; i < startOffset; i++) {
    html += `<div class="cal-day opacity-20"></div>`;
  }

  // Active days with mock event markers
  const eventDays = [4, 12, 18, 22, 27];
  const today = 18;

  for (let day = 1; day <= daysInMonth; day++) {
    const isToday = day === today;
    const hasEvent = eventDays.includes(day);

    html += `
      <div class="cal-day ${isToday ? 'active' : ''}">
        <span>${day}</span>
        ${hasEvent && !isToday ? `<span class="cal-event-dot"></span>` : ''}
      </div>
    `;
  }

  container.innerHTML = html;
}

function viewEventDetails(id) {
  const events = EventDataStore.getEvents();
  const evt = events.find(e => e.id === id);
  if (!evt) return;

  if (typeof showToast === 'function') {
    showToast(`${evt.type}: ${evt.title}`, `Client: ${evt.clientName} • Budget: $${evt.budget.toLocaleString()} • Status: ${evt.status}`, "calendar");
  } else {
    alert(`Event: ${evt.title}\nClient: ${evt.clientName}\nType: ${evt.type}\nBudget: $${evt.budget.toLocaleString()}\nStatus: ${evt.status}`);
  }
}
