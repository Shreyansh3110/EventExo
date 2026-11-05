# Eventexo — AI-Powered Event Management Platform

> **Plan. Manage. Celebrate.**  
> An enterprise-grade, multi-currency AI event management and business operations platform built for luxury weddings, corporate conclaves, birthday galas, and bespoke decoration styling.
> Deployed on Vercel at [**eventexo.vercel.app**](https://eventexo.vercel.app).

---

## 🌟 The Complete Integrated Module Suite

1. **Home (`index.html`)**: High-converting flagship landing page matching the Eventexo brand, featuring SaaS preview mockups, service catalogs, social proof metrics, and direct entry points.
2. **Dashboard Overview (`app.html`)**:
   - 4 Primary KPIs: Active Events (6), Gross Revenue (₹33,40,000 / $40,240), Active Budgets (56), Lead Conversion Rate (34.8%).
   - Interactive SVG Monthly Revenue Area Chart.
   - Status Distribution Donut Chart (Confirmed, In Progress, Budgeting).
   - Upcoming Events pipeline and interactive monthly Agenda calendar widget.
3. **Guest List & RSVP Manager (`#view-guests`)**:
   - Live invitation stats: Total Invited, Confirmed RSVPs, Awaiting, Declined.
   - Dietary verification: Real-time counts for **Pure Veg**, **Non-Veg**, and **Jain** dining.
   - Table seating assignments and plus-one (+1) tracking.
   - Quick Add Guest form with instant LocalStorage sync.
4. **AI Design Studio & Blueprint Generator (`#view-ai-studio`)**:
   - Select event type, budget, guest count, and vibe (Royal Rajasthani Heritage, Bollywood Glam & Sangeet, Cyberpunk Neon, Goa Sunset Coastal Chic).
   - Instant 4-tone color swatches, run-of-show timeline, and auto-computed budget allocations.
   - **1-Click PDF/Print Export** to generate client pitch decks.
   - **Optional Google Gemini 1.5 Flash API** integration for custom prompt engineering.
5. **Multi-Currency Budget Planner (`#view-budget`)**:
   - Instant 1-click toggle between **Indian Rupees (₹)** and **US Dollars ($)** in top navbar.
   - Category breakdowns (Palace Lawns & Venue, Gourmet Catering, Florals & Mandap, 4K Cinema, Stage AV).
   - Real-time spend progress visualizer and quick expense ledger.
   - 1-Click PDF/Print summary export.
6. **Our Events Portfolio (`#view-events`)**: Filterable showcases for destination weddings, AI summits, and celebrations with status badges and budgets.
7. **Create New Event Wizard (`#view-create-event`)**: Multi-step booking and project initialization workflow with confetti launch.
8. **Vendor Management Hub (`#view-vendors`)**: Curated directory of caterers, photographers, florists, and AV teams with rating stars, price levels (₹₹ - ₹₹₹₹), and direct contact actions.
9. **Inventory & Equipment Tracker (`#view-inventory`)**: Real-time rental stock tracking for royal Chiavari chairs, banquet tables, 4K curved LED walls, chandeliers, arches, and fog machines.
10. **Decoration Gallery (`#view-decor`)**: Signature styling themes (Royal Rajasthani Grandeur, Cyberpunk Neon, Bohemian Sunset, Enchanted Botanical) with interactive color swatches.
11. **Customer Client Portal (`#view-portal`)**: Dedicated client interface with live countdown, milestone checklist (venue contracts, menu tastings, seating charts), and RSVP tracking.
12. **Reports & Financial Analytics (`#view-analytics`)**: Profit margin metrics, lead conversion statistics, and verified client satisfaction (NPS) tracking.

---

## 💱 Multi-Currency Engine (₹ INR ⇄ $ USD)

- **Default Currency:** Indian Rupees (**INR / ₹**), using standard Indian numbering formatting (`en-IN`).
- **Global Currency:** Click the **`₹ INR`** pill in the top header to seamlessly switch all figures to **`$ USD`** with live currency conversion (1 USD = 83 INR).

---

## 🚀 How to Run Locally

### Option 1: Direct in Browser (No setup required)
- Open [`index.html`](index.html) for the public landing page.
- Open [`app.html`](app.html) to directly access the **Eventexo** SaaS Management Suite.

### Option 2: Python Local Server
Run the local server script:
```powershell
python start_server.py
```
Then visit [http://localhost:8000](http://localhost:8000) in your web browser.

---

## 🐙 Files to Upload to Your GitHub Repository (Manual Upload)

When updating your GitHub repository (**`Shreyansh3110/Eventexo`**) on [github.com](https://github.com), upload the following files and folders:

```
├── index.html              # Main public landing page (Eventexo)
├── app.html                # Unified Eventexo SaaS platform (all views)
├── vercel.json             # Vercel deployment configuration
├── start_server.py         # Local Python preview server
├── README.md               # Documentation & repository overview
├── .gitignore              # Git ignore configuration
├── css/
│   ├── styles.css          # Core animations, glows & typography
│   └── dashboard.css       # Eventexo SaaS dark theme & print engine
└── js/
    ├── data.js             # Central store (v4) with guests, events & currency engine
    ├── ai-studio.js        # AI design studio, print export & Gemini API
    ├── dashboard.js        # KPIs & visual analytics
    └── modules.js          # Guest RSVP manager, budget planner & vendors
```

---

## ☁️ Automatic Vercel Deployment

Since your Vercel project (**`eventexo.vercel.app`**) is linked to your GitHub repository (**`Shreyansh3110/Eventexo`**), uploading these files to GitHub will automatically trigger a new production build within seconds!
