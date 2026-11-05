# EventFlow AI & EventrixControl SaaS Platform

> **Plan. Manage. Celebrate.**  
> An enterprise-grade, AI-powered event management and business automation platform built for luxury weddings, corporate summits, birthday galas, and bespoke decoration styling.

---

## 🌟 The 12 Integrated Modules

1. **Home (`index.html`)**: High-converting flagship landing page matching the EventFlow AI reference, with SaaS previews, services catalog, and direct entry points.
2. **Dashboard (`EventrixControl` in `app.html`)**:
   - 4 Primary KPIs: Active Events (24), Total Revenue ($148,250 / R$ 128.450), Active Budgets (56), Lead Conversion Rate (32%).
   - Interactive SVG Monthly Revenue Area Chart.
   - Status Distribution Donut Chart (Confirmed, In Progress, Budgeting, Cancelled).
   - Upcoming Events pipeline and interactive monthly Agenda calendar widget.
3. **Our Events Portfolio**: Filterable showcases for Weddings, Corporate Summits, and Private Celebrations with status badges and budgets.
4. **Decoration Gallery**: Signature styling themes (Royal Vintage Grandeur, Cyberpunk Neon, Bohemian Sunset, Enchanted Garden) with interactive color swatches.
5. **AI Design Studio & Blueprint Generator**: Enter event type, vibe, guests, and budget to generate a custom concept title, aesthetic narrative, 4-tone color palette, run-of-show schedule, and automated budget allocation with 1-click wizard import.
6. **Create New Event Wizard**: Multi-step booking and project initialization workflow.
7. **Interactive Budget Planner**: Dynamic expense tracking, category breakdowns (Venue, Catering, Florals, AV, Photo), spend progress bar, and quick expense ledger.
8. **Vendor Management Hub**: Verified directory of caterers, photographers, florists, and AV teams with rating stars, price levels, and contract statuses.
9. **Inventory & Equipment Tracker**: Real-time rental stock tracking for Chiavari chairs, banquet tables, 4K curved LED walls, chandeliers, arches, and fog machines.
10. **Customer Client Portal**: Dedicated client interface with live countdown, milestone checklist (venue contracts, menu tastings, seating charts), and RSVP tracking.
11. **Reports & Financial Analytics**: Profit margin metrics, lead conversion statistics, and client satisfaction (NPS) tracking.
12. **About Us**: Company mission, production team credentials, and event expertise.

---

## 🚀 How to Run the Platform

### Option 1: Direct in Browser (No setup required)
- Open [`index.html`](index.html) for the public landing page.
- Open [`app.html`](app.html) to directly access the **EventrixControl** SaaS Suite with all 12 modules.

### Option 2: Python Local Server
Run the local server script:
```powershell
python start_server.py
```
Then visit [http://localhost:8000](http://localhost:8000) in your web browser.

---

## 🐙 How to Push to Your GitHub Repository

Follow these simple steps in your terminal to publish this project to GitHub:

### Step 1: Initialize Git and Stage Files
```powershell
git init
git add .
git commit -m "feat: initial commit - EventFlow AI 12-module event management & EventrixControl SaaS platform"
git branch -M main
```

### Step 2: Create a New Repository on GitHub
1. Go to [github.com/new](https://github.com/new).
2. Enter repository name: `eventflow-ai` (or `event-management-platform`).
3. Leave "Initialize this repository with a README" **unchecked** (we already created one).
4. Click **Create repository**.

### Step 3: Link and Push
Run the following commands (replace `<YOUR_GITHUB_USERNAME>` with your GitHub account name):
```powershell
git remote add origin https://github.com/<YOUR_GITHUB_USERNAME>/eventflow-ai.git
git push -u origin main
```

---

## 📁 File Structure

```
├── index.html              # Flagship public landing page (Plan. Manage. Celebrate.)
├── app.html                # Unified EventrixControl SaaS platform (all 12 views)
├── start_server.py         # Zero-dependency Python HTTP server runner
├── .gitignore              # Git ignore rules
├── README.md               # Documentation & GitHub setup guide
├── css/
│   ├── styles.css          # Core design system & glow effects
│   └── dashboard.css       # EventrixControl SaaS styling & SVG chart themes
└── js/
    ├── data.js             # Central data engine (events, decor, vendors, inventory)
    ├── ai-studio.js        # AI event blueprint and color palette generator
    ├── dashboard.js        # EventrixControl KPI analytics, area & donut charts, calendar
    └── modules.js          # Budget planner, vendor hub, inventory, and event wizard
```
