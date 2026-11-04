/**
 * NEXUS Tech Summit 2027 - Organizer & Check-in Dashboard
 */

let attendeesList = [];
let searchQuery = '';
let filterTier = 'all';
let filterStatus = 'all';

document.addEventListener('DOMContentLoaded', () => {
  if (window.lucide) lucide.createIcons();

  attendeesList = getStoredAttendees();
  
  // Check if URL contains ?scan=NEX-XXXXXX
  const urlParams = new URLSearchParams(window.location.search);
  const scanId = urlParams.get('scan');
  if (scanId) {
    handleQuickScan(scanId);
  }

  initAdminControls();
  renderDashboard();
});

function initAdminControls() {
  const searchInput = document.getElementById('admin-search');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      searchQuery = e.target.value.toLowerCase().trim();
      renderAttendeesTable();
    });
  }

  const tierFilter = document.getElementById('admin-tier-filter');
  if (tierFilter) {
    tierFilter.addEventListener('change', (e) => {
      filterTier = e.target.value;
      renderAttendeesTable();
    });
  }

  const statusFilter = document.getElementById('admin-status-filter');
  if (statusFilter) {
    statusFilter.addEventListener('change', (e) => {
      filterStatus = e.target.value;
      renderAttendeesTable();
    });
  }

  const exportBtn = document.getElementById('btn-export-csv');
  if (exportBtn) {
    exportBtn.addEventListener('click', exportToCSV);
  }

  const scanForm = document.getElementById('scanner-form');
  if (scanForm) {
    scanForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const input = document.getElementById('scan-ticket-id');
      if (input && input.value.trim()) {
        handleQuickScan(input.value.trim());
        input.value = '';
      }
    });
  }
}

function renderDashboard() {
  renderMetrics();
  renderAttendeesTable();
}

// 1. Render Metrics Cards
function renderMetrics() {
  const total = attendeesList.length;
  const checkedIn = attendeesList.filter(a => a.checkedIn).length;
  const totalRevenue = attendeesList.reduce((acc, curr) => acc + (curr.amountPaid || 0), 0);
  const checkInRate = total > 0 ? Math.round((checkedIn / total) * 100) : 0;

  const vipCount = attendeesList.filter(a => a.ticketTier === 'vip').length;
  const standardCount = attendeesList.filter(a => a.ticketTier === 'general').length;
  const virtualCount = attendeesList.filter(a => a.ticketTier === 'virtual').length;

  document.getElementById('metric-total-attendees').innerText = total;
  document.getElementById('metric-checked-in').innerText = `${checkedIn} (${checkInRate}%)`;
  document.getElementById('metric-revenue').innerText = `$${totalRevenue.toLocaleString()}`;
  document.getElementById('metric-tier-breakdown').innerText = `VIP: ${vipCount} • Std: ${standardCount} • Virt: ${virtualCount}`;
}

// 2. Render Attendee Roster Table
function renderAttendeesTable() {
  const tbody = document.getElementById('attendees-table-body');
  const countDisplay = document.getElementById('table-results-count');
  if (!tbody) return;

  let filtered = attendeesList.filter(a => {
    const matchSearch = 
      a.fullName.toLowerCase().includes(searchQuery) ||
      a.email.toLowerCase().includes(searchQuery) ||
      a.company.toLowerCase().includes(searchQuery) ||
      a.id.toLowerCase().includes(searchQuery);

    const matchTier = filterTier === 'all' || a.ticketTier === filterTier;
    
    let matchStatus = true;
    if (filterStatus === 'checked_in') matchStatus = a.checkedIn === true;
    if (filterStatus === 'pending') matchStatus = a.checkedIn === false;

    return matchSearch && matchTier && matchStatus;
  });

  if (countDisplay) {
    countDisplay.innerText = `Showing ${filtered.length} of ${attendeesList.length} attendees`;
  }

  if (filtered.length === 0) {
    tbody.innerHTML = `
      <tr>
        <td colspan="6" class="px-6 py-12 text-center text-slate-400">
          <i data-lucide="users" class="w-8 h-8 text-slate-600 mx-auto mb-2"></i>
          <p class="font-medium">No attendees found matching your search or filters.</p>
        </td>
      </tr>
    `;
    if (window.lucide) lucide.createIcons();
    return;
  }

  tbody.innerHTML = filtered.map(attendee => `
    <tr class="border-b border-white/5 hover:bg-white/[0.02] transition-colors">
      <td class="px-6 py-4">
        <div class="flex items-center gap-3">
          <div class="w-9 h-9 rounded-full bg-gradient-to-tr from-indigo-600 to-purple-600 flex items-center justify-center text-white font-bold text-xs uppercase shadow-sm">
            ${attendee.fullName.split(' ').map(n=>n[0]).join('').slice(0, 2)}
          </div>
          <div>
            <div class="font-bold text-white text-sm">${attendee.fullName}</div>
            <div class="text-xs text-slate-400">${attendee.email}</div>
          </div>
        </div>
      </td>

      <td class="px-6 py-4 text-xs">
        <div class="text-slate-200 font-semibold">${attendee.jobTitle}</div>
        <div class="text-indigo-400">${attendee.company}</div>
      </td>

      <td class="px-6 py-4">
        <span class="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold ${
          attendee.ticketTier === 'vip' ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30' :
          attendee.ticketTier === 'virtual' ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30' :
          'bg-indigo-500/20 text-indigo-300 border border-indigo-500/30'
        }">
          ${attendee.ticketName}
        </span>
      </td>

      <td class="px-6 py-4 font-mono text-xs font-bold text-slate-300">
        ${attendee.id}
      </td>

      <td class="px-6 py-4">
        <button 
          onclick="toggleCheckIn('${attendee.id}')"
          class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold transition-all ${
            attendee.checkedIn 
              ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 hover:bg-emerald-500/30' 
              : 'bg-white/5 text-slate-400 border border-white/10 hover:border-indigo-400 hover:text-white'
          }"
        >
          <i data-lucide="${attendee.checkedIn ? 'check-circle' : 'circle'}" class="w-3.5 h-3.5 ${attendee.checkedIn ? 'text-emerald-400' : 'text-slate-500'}"></i>
          <span>${attendee.checkedIn ? 'Checked In' : 'Mark Checked'}</span>
        </button>
      </td>

      <td class="px-6 py-4 text-right">
        <a 
          href="pass.html?id=${attendee.id}" 
          target="_blank"
          class="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-semibold bg-white/5 hover:bg-white/10 text-indigo-300 hover:text-white transition-colors"
          title="View Digital QR Badge"
        >
          <i data-lucide="qr-code" class="w-3.5 h-3.5"></i>
          <span>Pass</span>
        </a>
      </td>
    </tr>
  `).join('');

  if (window.lucide) lucide.createIcons();
}

// 3. Toggle Attendee Check-In
function toggleCheckIn(ticketId) {
  const attendee = attendeesList.find(a => a.id.toLowerCase() === ticketId.toLowerCase());
  if (!attendee) return;

  attendee.checkedIn = !attendee.checkedIn;
  attendee.checkedInAt = attendee.checkedIn ? new Date().toISOString() : null;

  localStorage.setItem('nexus_attendees', JSON.stringify(attendeesList));
  renderDashboard();
}

// 4. Quick Scan Check-in Verification
function handleQuickScan(ticketId) {
  const attendee = attendeesList.find(a => a.id.toLowerCase() === ticketId.toLowerCase());
  const alertBox = document.getElementById('scan-result-alert');

  if (!alertBox) return;

  if (attendee) {
    attendee.checkedIn = true;
    attendee.checkedInAt = new Date().toISOString();
    localStorage.setItem('nexus_attendees', JSON.stringify(attendeesList));
    renderDashboard();

    alertBox.className = "mb-6 p-4 rounded-2xl bg-emerald-950/60 border border-emerald-500/40 flex items-center justify-between";
    alertBox.innerHTML = `
      <div class="flex items-center gap-3">
        <div class="w-10 h-10 rounded-full bg-emerald-500/20 text-emerald-300 flex items-center justify-center">
          <i data-lucide="check" class="w-5 h-5"></i>
        </div>
        <div>
          <h4 class="font-bold text-white text-sm">Checked In: ${attendee.fullName} (${attendee.id})</h4>
          <p class="text-xs text-emerald-300">${attendee.ticketName} • ${attendee.company}</p>
        </div>
      </div>
      <a href="pass.html?id=${attendee.id}" target="_blank" class="text-xs text-indigo-300 hover:underline font-semibold">View Badge</a>
    `;
  } else {
    alertBox.className = "mb-6 p-4 rounded-2xl bg-rose-950/60 border border-rose-500/40 flex items-center gap-3";
    alertBox.innerHTML = `
      <div class="w-10 h-10 rounded-full bg-rose-500/20 text-rose-300 flex items-center justify-center">
        <i data-lucide="alert-circle" class="w-5 h-5"></i>
      </div>
      <div>
        <h4 class="font-bold text-white text-sm">Scan Error: Ticket ID '${ticketId}' Not Found</h4>
        <p class="text-xs text-rose-300">Please verify ticket reference number.</p>
      </div>
    `;
  }

  alertBox.classList.remove('hidden');
  if (window.lucide) lucide.createIcons();

  setTimeout(() => {
    alertBox.classList.add('hidden');
  }, 6000);
}

// 5. Export Attendees to CSV
function exportToCSV() {
  if (attendeesList.length === 0) {
    alert("No attendee records available to export.");
    return;
  }

  const headers = ["Ticket ID", "Full Name", "Email", "Company", "Job Title", "Tier", "Amount Paid", "Checked In", "Registration Date"];
  const rows = attendeesList.map(a => [
    `"${a.id}"`,
    `"${a.fullName}"`,
    `"${a.email}"`,
    `"${a.company}"`,
    `"${a.jobTitle}"`,
    `"${a.ticketName}"`,
    `"${a.amountPaid}"`,
    `"${a.checkedIn ? 'Yes' : 'No'}"`,
    `"${a.registeredAt}"`
  ]);

  const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map(r => r.join(","))].join("\n");
  const encodedUri = encodeURI(csvContent);
  const link = document.createElement("a");
  link.setAttribute("href", encodedUri);
  link.setAttribute("download", `nexus-attendees-${new Date().toISOString().slice(0, 10)}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
