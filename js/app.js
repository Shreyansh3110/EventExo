/**
 * NEXUS Tech Summit 2027 - Main Application Logic
 */

document.addEventListener('DOMContentLoaded', () => {
  // Initialize Lucide icons
  if (window.lucide) {
    lucide.createIcons();
  }

  initCountdown();
  renderStats();
  renderSpeakers();
  renderSchedule();
  renderSponsors();
  renderFaqs();
  initCalendarGenerator();
  initMobileMenu();
});

// 1. Live Countdown Timer
function initCountdown() {
  const targetTime = new Date(EVENT_CONFIG.targetDate).getTime();

  function update() {
    const now = new Date().getTime();
    const difference = targetTime - now;

    if (difference <= 0) {
      document.getElementById('countdown-days').innerText = '00';
      document.getElementById('countdown-hours').innerText = '00';
      document.getElementById('countdown-minutes').innerText = '00';
      document.getElementById('countdown-seconds').innerText = '00';
      return;
    }

    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);

    const pad = (n) => (n < 10 ? '0' + n : n);

    const elDays = document.getElementById('countdown-days');
    const elHours = document.getElementById('countdown-hours');
    const elMinutes = document.getElementById('countdown-minutes');
    const elSeconds = document.getElementById('countdown-seconds');

    if (elDays) elDays.innerText = pad(days);
    if (elHours) elHours.innerText = pad(hours);
    if (elMinutes) elMinutes.innerText = pad(minutes);
    if (elSeconds) elSeconds.innerText = pad(seconds);
  }

  update();
  setInterval(update, 1000);
}

// 2. Render Hero Key Metrics
function renderStats() {
  const container = document.getElementById('stats-grid');
  if (!container) return;

  container.innerHTML = EVENT_CONFIG.stats.map(stat => `
    <div class="glass-panel rounded-2xl p-6 text-center border border-white/5 relative overflow-hidden group hover:border-indigo-500/30 transition-all duration-300">
      <div class="absolute inset-0 bg-gradient-to-b from-indigo-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
      <div class="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-300 to-cyan-300 mb-1">
        ${stat.value}
      </div>
      <div class="text-xs sm:text-sm font-medium text-slate-400 uppercase tracking-wider">
        ${stat.label}
      </div>
    </div>
  `).join('');
}

// 3. Render Speakers Grid & Modal
let currentSpeakerFilter = 'all';

function renderSpeakers() {
  const container = document.getElementById('speakers-grid');
  if (!container) return;

  const filteredSpeakers = currentSpeakerFilter === 'featured'
    ? EVENT_CONFIG.speakers.filter(s => s.featured)
    : EVENT_CONFIG.speakers;

  container.innerHTML = filteredSpeakers.map(speaker => `
    <div class="glass-panel glass-panel-hover rounded-2xl overflow-hidden cursor-pointer flex flex-col group" onclick="openSpeakerModal(${speaker.id})">
      <div class="relative aspect-square overflow-hidden bg-slate-900">
        <img 
          src="${speaker.image}" 
          alt="${speaker.name}" 
          class="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        <div class="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-80"></div>
        <div class="absolute top-3 right-3">
          <span class="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-indigo-500/80 backdrop-blur-md text-white shadow-sm">
            ${speaker.tag}
          </span>
        </div>
        <div class="absolute bottom-3 left-3 right-3">
          <h3 class="text-lg font-bold text-white group-hover:text-indigo-300 transition-colors">${speaker.name}</h3>
          <p class="text-xs text-indigo-200 font-medium">${speaker.role}</p>
          <p class="text-xs text-slate-400">${speaker.company}</p>
        </div>
      </div>
      <div class="p-4 flex-1 flex flex-col justify-between border-t border-white/5 bg-slate-900/40">
        <p class="text-xs font-medium text-slate-300 line-clamp-2 mb-3">
          <i data-lucide="sparkles" class="w-3.5 h-3.5 inline text-indigo-400 mr-1"></i>
          "${speaker.topic}"
        </p>
        <div class="flex items-center justify-between text-xs text-indigo-400 font-semibold group-hover:translate-x-1 transition-transform">
          <span>View Bio & Session</span>
          <i data-lucide="arrow-right" class="w-4 h-4"></i>
        </div>
      </div>
    </div>
  `).join('');

  if (window.lucide) lucide.createIcons();
}

function openSpeakerModal(speakerId) {
  const speaker = EVENT_CONFIG.speakers.find(s => s.id === speakerId);
  if (!speaker) return;

  const modal = document.getElementById('speaker-modal');
  const modalContent = document.getElementById('speaker-modal-content');
  if (!modal || !modalContent) return;

  modalContent.innerHTML = `
    <div class="flex flex-col md:flex-row gap-6 items-start">
      <div class="w-full md:w-48 flex-shrink-0">
        <img src="${speaker.image}" alt="${speaker.name}" class="w-full h-56 md:h-60 object-cover rounded-2xl shadow-xl border border-white/10" />
        <div class="flex gap-2 mt-4 justify-center">
          <a href="${speaker.linkedin}" target="_blank" rel="noopener noreferrer" class="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white transition-colors" title="LinkedIn">
            <i data-lucide="linkedin" class="w-4 h-4"></i>
          </a>
          <a href="${speaker.twitter}" target="_blank" rel="noopener noreferrer" class="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white transition-colors" title="Twitter/X">
            <i data-lucide="twitter" class="w-4 h-4"></i>
          </a>
        </div>
      </div>
      <div class="flex-1">
        <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 mb-2">
          ${speaker.tag}
        </span>
        <h2 class="text-2xl font-bold text-white mb-1">${speaker.name}</h2>
        <p class="text-indigo-400 font-medium text-sm mb-4">${speaker.role} • <span class="text-slate-300">${speaker.company}</span></p>
        
        <div class="mb-5">
          <h4 class="text-xs uppercase font-bold text-slate-400 tracking-wider mb-2">About Speaker</h4>
          <p class="text-slate-300 text-sm leading-relaxed">${speaker.bio}</p>
        </div>

        <div class="p-4 rounded-xl bg-indigo-950/40 border border-indigo-500/30">
          <h4 class="text-xs uppercase font-bold text-indigo-300 tracking-wider mb-1">Keynote / Session Title</h4>
          <p class="text-white font-semibold text-base">${speaker.topic}</p>
        </div>
      </div>
    </div>
  `;

  modal.classList.remove('hidden');
  modal.classList.add('flex');
  document.body.classList.add('overflow-hidden');
  if (window.lucide) lucide.createIcons();
}

function closeSpeakerModal() {
  const modal = document.getElementById('speaker-modal');
  if (!modal) return;
  modal.classList.add('hidden');
  modal.classList.remove('flex');
  document.body.classList.remove('overflow-hidden');
}

// 4. Interactive Schedule & Agendas
let selectedDay = 'day1';
let selectedTrack = 'all';
let bookmarkedSessions = JSON.parse(localStorage.getItem('nexus_bookmarks') || '[]');

function selectDay(dayKey) {
  selectedDay = dayKey;
  document.querySelectorAll('.day-tab-btn').forEach(btn => {
    if (btn.dataset.day === dayKey) {
      btn.className = 'day-tab-btn px-6 py-3 rounded-xl font-bold text-sm bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg shadow-indigo-500/25 transition-all';
    } else {
      btn.className = 'day-tab-btn px-6 py-3 rounded-xl font-bold text-sm text-slate-400 hover:text-white hover:bg-white/5 transition-all';
    }
  });
  renderSchedule();
}

function filterTrack(trackName) {
  selectedTrack = trackName;
  document.querySelectorAll('.track-filter-btn').forEach(btn => {
    if (btn.dataset.track === trackName) {
      btn.className = 'track-filter-btn px-3.5 py-1.5 rounded-full text-xs font-semibold bg-indigo-500 text-white shadow transition-all';
    } else {
      btn.className = 'track-filter-btn px-3.5 py-1.5 rounded-full text-xs font-semibold bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 transition-all';
    }
  });
  renderSchedule();
}

function toggleBookmark(sessionId) {
  if (bookmarkedSessions.includes(sessionId)) {
    bookmarkedSessions = bookmarkedSessions.filter(id => id !== sessionId);
  } else {
    bookmarkedSessions.push(sessionId);
  }
  localStorage.setItem('nexus_bookmarks', JSON.stringify(bookmarkedSessions));
  renderSchedule();
  updateBookmarkBadge();
}

function updateBookmarkBadge() {
  const badge = document.getElementById('saved-sessions-count');
  if (badge) {
    badge.innerText = bookmarkedSessions.length;
    badge.classList.toggle('hidden', bookmarkedSessions.length === 0);
  }
}

function renderSchedule() {
  const container = document.getElementById('schedule-timeline');
  const dayMetaContainer = document.getElementById('day-meta-info');
  if (!container) return;

  const dayData = EVENT_CONFIG.schedule[selectedDay];
  if (!dayData) return;

  if (dayMetaContainer) {
    dayMetaContainer.innerHTML = `
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/10 pb-4 mb-6">
        <div>
          <span class="text-xs font-bold uppercase tracking-wider text-indigo-400">${dayData.date}</span>
          <h3 class="text-xl font-bold text-white mt-0.5">${dayData.theme}</h3>
        </div>
        <div class="text-xs text-slate-400 flex items-center gap-1.5">
          <i data-lucide="clock" class="w-4 h-4 text-indigo-400"></i>
          <span>Sessions run from 08:30 AM to 07:30 PM PST</span>
        </div>
      </div>
    `;
  }

  let sessions = dayData.sessions;
  if (selectedTrack !== 'all') {
    sessions = sessions.filter(s => s.track.toLowerCase() === selectedTrack.toLowerCase());
  }

  if (sessions.length === 0) {
    container.innerHTML = `
      <div class="text-center py-12 glass-panel rounded-2xl">
        <i data-lucide="calendar-x" class="w-10 h-10 text-slate-500 mx-auto mb-3"></i>
        <p class="text-slate-300 font-medium">No sessions found matching this track.</p>
        <button onclick="filterTrack('all')" class="mt-3 text-xs text-indigo-400 hover:underline font-semibold">View all tracks</button>
      </div>
    `;
    if (window.lucide) lucide.createIcons();
    return;
  }

  container.innerHTML = sessions.map(session => {
    const isSaved = bookmarkedSessions.includes(session.id);
    return `
      <div class="glass-panel glass-panel-hover rounded-2xl p-5 sm:p-6 transition-all duration-300 relative border-l-4 ${
        session.track === 'Keynote' ? 'border-l-purple-500' :
        session.track === 'Workshop' ? 'border-l-emerald-500' :
        session.track === 'Security' ? 'border-l-rose-500' :
        session.track === 'Infrastructure' ? 'border-l-cyan-500' :
        'border-l-indigo-500'
      }">
        <div class="flex flex-col md:flex-row md:items-start justify-between gap-4">
          <div class="md:w-44 flex-shrink-0">
            <span class="inline-flex items-center gap-1 text-xs font-mono font-bold text-indigo-300 bg-indigo-950/60 px-2.5 py-1 rounded-lg border border-indigo-800/40">
              <i data-lucide="clock" class="w-3.5 h-3.5"></i>
              ${session.time}
            </span>
            <div class="text-xs text-slate-400 mt-2 flex items-center gap-1">
              <i data-lucide="map-pin" class="w-3.5 h-3.5 text-slate-500"></i>
              <span>${session.stage}</span>
            </div>
          </div>

          <div class="flex-1">
            <div class="flex items-center gap-2 mb-2">
              <span class="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-white/5 text-slate-300 border border-white/10">
                ${session.track}
              </span>
            </div>
            <h4 class="text-lg font-bold text-white mb-1.5">${session.title}</h4>
            <p class="text-sm text-slate-300 leading-relaxed mb-3">${session.description}</p>

            ${session.speaker ? `
              <div class="flex items-center gap-2 text-xs font-medium text-slate-300">
                <i data-lucide="user" class="w-3.5 h-3.5 text-indigo-400"></i>
                <span class="text-white font-semibold">${session.speaker}</span>
                <span class="text-slate-500">•</span>
                <span class="text-slate-400">${session.company}</span>
              </div>
            ` : ''}
          </div>

          <div class="flex items-center md:flex-col justify-end gap-2">
            <button 
              onclick="toggleBookmark('${session.id}')" 
              class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                isSaved 
                  ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 shadow-sm' 
                  : 'bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white border border-white/5'
              }"
              title="${isSaved ? 'Remove from My Schedule' : 'Add to My Schedule'}"
            >
              <i data-lucide="star" class="w-3.5 h-3.5 ${isSaved ? 'fill-amber-400 text-amber-400' : ''}"></i>
              <span class="hidden sm:inline">${isSaved ? 'Saved' : 'Save'}</span>
            </button>
          </div>
        </div>
      </div>
    `;
  }).join('');

  if (window.lucide) lucide.createIcons();
  updateBookmarkBadge();
}

// 5. Sponsors Section
function renderSponsors() {
  const container = document.getElementById('sponsors-container');
  if (!container) return;

  const tiers = ['Platinum', 'Gold', 'Silver', 'Community'];
  
  container.innerHTML = tiers.map(tier => {
    const list = EVENT_CONFIG.sponsors.filter(s => s.tier === tier);
    if (list.length === 0) return '';
    
    return `
      <div class="mb-10 last:mb-0">
        <h4 class="text-center text-xs uppercase font-extrabold tracking-widest text-slate-400 mb-6">
          <span class="px-3 py-1 rounded-full bg-white/5 border border-white/10">${tier} Partners</span>
        </h4>
        <div class="flex flex-wrap items-center justify-center gap-6 sm:gap-10">
          ${list.map(sponsor => `
            <div class="glass-panel rounded-xl px-6 py-4 flex items-center justify-center h-16 w-44 hover:border-indigo-500/40 transition-all duration-300 group">
              <span class="font-heading font-bold text-slate-300 group-hover:text-white transition-colors text-base text-center">${sponsor.name}</span>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  }).join('');
}

// 6. Interactive FAQ Accordion
function renderFaqs() {
  const container = document.getElementById('faq-accordion');
  if (!container) return;

  container.innerHTML = EVENT_CONFIG.faqs.map((faq, index) => `
    <div class="glass-panel rounded-2xl overflow-hidden border border-white/5 transition-colors">
      <button 
        onclick="toggleFaq(${index})" 
        class="w-full px-6 py-5 text-left flex items-center justify-between gap-4 font-bold text-white hover:text-indigo-300 transition-colors"
      >
        <span class="text-base sm:text-lg">${faq.q}</span>
        <i data-lucide="chevron-down" id="faq-icon-${index}" class="w-5 h-5 text-indigo-400 transition-transform duration-300"></i>
      </button>
      <div id="faq-answer-${index}" class="px-6 pb-6 text-sm sm:text-base text-slate-300 leading-relaxed hidden">
        ${faq.a}
      </div>
    </div>
  `).join('');

  if (window.lucide) lucide.createIcons();
}

function toggleFaq(index) {
  const answer = document.getElementById(`faq-answer-${index}`);
  const icon = document.getElementById(`faq-icon-${index}`);
  if (!answer || !icon) return;

  const isHidden = answer.classList.contains('hidden');
  answer.classList.toggle('hidden', !isHidden);
  icon.style.transform = isHidden ? 'rotate(180deg)' : 'rotate(0deg)';
}

// 7. Add to Calendar (.ics Generator & Google Calendar)
function initCalendarGenerator() {
  const btnGoogle = document.getElementById('btn-add-google-cal');
  const btnIcs = document.getElementById('btn-download-ics');

  const title = encodeURIComponent(EVENT_CONFIG.name);
  const details = encodeURIComponent(`${EVENT_CONFIG.tagline}\n\nVenue: ${EVENT_CONFIG.venue.name}, ${EVENT_CONFIG.venue.address}`);
  const location = encodeURIComponent(`${EVENT_CONFIG.venue.name}, ${EVENT_CONFIG.venue.address}`);

  // Format dates: 20271014T160000Z / 20271017T020000Z
  const startDate = "20271014T160000Z";
  const endDate = "20271017T020000Z";

  if (btnGoogle) {
    btnGoogle.href = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${startDate}/${endDate}&details=${details}&location=${location}`;
  }

  if (btnIcs) {
    btnIcs.addEventListener('click', (e) => {
      e.preventDefault();
      const icsData = [
        "BEGIN:VCALENDAR",
        "VERSION:2.0",
        "PRODID:-//NEXUS Summit//NONSGML v1.0//EN",
        "BEGIN:VEVENT",
        `UID:${Date.now()}@nexussummit.io`,
        `DTSTAMP:${new Date().toISOString().replace(/[-:]/g, "").split(".")[0]}Z`,
        `DTSTART:${startDate}`,
        `DTEND:${endDate}`,
        `SUMMARY:${EVENT_CONFIG.name}`,
        `DESCRIPTION:${EVENT_CONFIG.tagline}`,
        `LOCATION:${EVENT_CONFIG.venue.name}, ${EVENT_CONFIG.venue.address}`,
        "END:VEVENT",
        "END:VCALENDAR"
      ].join("\r\n");

      const blob = new Blob([icsData], { type: "text/calendar;charset=utf-8" });
      const link = document.createElement("a");
      link.href = window.URL.createObjectURL(blob);
      link.setAttribute("download", "nexus-summit-2027.ics");
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    });
  }
}

// 8. Mobile Navigation Drawer
function initMobileMenu() {
  const menuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  const closeBtn = document.getElementById('close-mobile-menu');

  if (!menuBtn || !mobileMenu) return;

  menuBtn.addEventListener('click', () => {
    mobileMenu.classList.remove('hidden');
  });

  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      mobileMenu.classList.add('hidden');
    });
  }

  // Close when clicking nav links
  mobileMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu.classList.add('hidden');
    });
  });
}
