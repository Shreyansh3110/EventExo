# NEXUS Tech Summit 2027 — Event Website

A modern, responsive, and feature-complete event website built for conferences, summits, hackathons, and festivals. Built with modern HTML5, Tailwind CSS, Lucide icons, and Vanilla JavaScript with zero external build dependencies.

---

## 🚀 Quick Start

### Option 1: Direct in Browser
Double-click `index.html` in your file explorer to open it directly in any modern browser (Chrome, Edge, Firefox, Safari).

### Option 2: Python Local Server
Run the included Python launcher to serve the site locally:
```bash
python start_server.py
```
Then visit:
- **Main Event Landing Page**: [http://localhost:8000](http://localhost:8000)
- **Digital Attendee Pass & QR Badge**: [http://localhost:8000/pass.html](http://localhost:8000/pass.html)
- **Organizer Check-in Dashboard**: [http://localhost:8000/admin.html](http://localhost:8000/admin.html)

---

## 🌟 Key Features

### 1. High-Impact Landing Page (`index.html`)
- **Live Countdown Timer**: Real-time days, hours, minutes, and seconds countdown to the event.
- **Calendar Integration**: 1-click **Add to Google Calendar** and downloadable **`.ics` file** for Apple/Outlook calendar.
- **Key Metrics & Statistics**: Showcase attendee count, speaker count, event tracks, and days.
- **Speaker Showcase**:
  - Filter by "All Speakers" or "Keynotes".
  - Interactive profile cards with speaker avatar, company, role, and talk topic.
  - Interactive modal dialog with detailed bio and social media links (LinkedIn, X).
- **Interactive Multi-Day Schedule**:
  - Day switcher tabs (Day 1: Foundations & AI, Day 2: Architecture & Scale, Day 3: Frontier).
  - Category / track filter pills (Keynote, Infrastructure, Product & UX, Workshops, Security, Social).
  - **"Save to My Schedule"**: Bookmark sessions with saved counter badge.
- **Ticket Tiers & Registration**:
  - Pricing comparison cards (Virtual Pass, Standard Pass, VIP Executive).
  - Feature lists and remaining pass availability indicators.
  - Interactive registration checkout modal:
    - Quantity selector and dynamic total price calculation.
    - Promo code engine (try `SUMMIT20` for 20% off!).
    - Form validation (Full Name, Work Email, Company, Job Title).
    - Confetti celebration explosion upon successful registration.
    - Instant generation of a unique reference number (e.g. `NEX-884920`).
- **Venue & Google Maps**: Location details, transit guidelines, partner hotels, and embedded interactive map.
- **Sponsor Showcase**: Multi-tier sponsor logo grid (Platinum, Gold, Silver, Community).
- **Interactive FAQ Accordion**: Expandable answers to common questions.

### 2. Digital Attendee Pass & QR Badge (`pass.html`)
- Displays unique Attendee Reference ID, Name, Role, Company, and Pass Tier.
- **Dynamic QR Code**: Encodes attendee ticket verification data and contactless check-in link.
- **Print & PDF Ready**: Formatted with dedicated `@media print` styles for clean paper badges.
- **Shareable Link**: Instant copy-to-clipboard for attendee access.

### 3. Organizer & Gate Check-in Dashboard (`admin.html`)
- **Live Event Analytics**:
  - Total registered attendees count.
  - Real-time gate check-in rate and counter.
  - Gross ticket sales revenue.
  - Tier breakdown distribution (VIP vs. Standard vs. Virtual).
- **Gate Check-in Scanner**:
  - Input or scan any ticket ID (e.g. `NEX-884920`) for immediate check-in status verification.
- **Attendee Directory Table**:
  - Search by Name, Email, Company, or Ticket ID.
  - Filter by pass tier and check-in status.
  - 1-click check-in toggle button with live timestamp.
  - Direct link to inspect any attendee's digital badge.
- **Export to CSV**: Export attendee roster into a `.csv` file for badging kiosks or CRM integration.

---

## 🎨 How to Customize Your Event

All event content is centralized in **`js/data.js`**:
- **Event Name & Dates**: Modify `EVENT_CONFIG.name`, `EVENT_CONFIG.targetDate`, and `EVENT_CONFIG.dateDisplay`.
- **Venue**: Update address and Google Maps embed URL in `EVENT_CONFIG.venue`.
- **Speakers**: Add or update names, avatars, bios, and talk titles in `EVENT_CONFIG.speakers`.
- **Schedule**: Add, edit, or reorder sessions in `EVENT_CONFIG.schedule`.
- **Ticket Tiers**: Adjust prices, benefits, and tier names in `EVENT_CONFIG.ticketTiers`.
- **Sponsors & FAQs**: Add partners in `EVENT_CONFIG.sponsors` and FAQ items in `EVENT_CONFIG.faqs`.

---

## 📁 File Structure

```
├── index.html          # Main event landing page
├── pass.html           # Digital attendee badge & QR pass
├── admin.html          # Organizer management & gate scanner dashboard
├── start_server.py     # Local Python server launcher
├── README.md           # Documentation & customization guide
├── css/
│   └── styles.css      # Custom styling, glow gradients, glassmorphism, print CSS
└── js/
    ├── data.js         # Centralized event data & mock database
    ├── app.js          # Countdown, schedule filters, speaker modals, calendar generator
    ├── tickets.js      # Ticket calculation, promo codes, checkout modal, local storage
    └── admin.js        # Analytics metrics, attendee roster table, scanner, CSV export
```
