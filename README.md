# MediCore HMS — Enterprise Hospital Management Software (SaaS) & Clinical Admin Dashboard

> **"One platform. Every ward. Zero friction."**

**MediCore HMS** is a complete, production-quality, multi-page HTML5/CSS3/ES6 Hospital Management SaaS marketing website and interactive front-end **Clinical Admin Dashboard**. Engineered for hospital owners, medical directors, nursing heads, RCM/TPA billing desks, and healthcare IT architects, the package runs 100% self-hosted with zero external runtime dependencies.

---

## 1. Complete Page Inventory (24 Pages)

### Marketing Website (15 Pages at Root)
1. [`index.html`](index.html) — **Home 1**: Benefits-led split cinematic hero, hospital wordmark marquee, 6 clinical benefit cards, 6-stage horizontal hospital timeline, animated count-up metrics, 5-role value tabs, customer testimonials carousel, and tailored CTA.
2. [`home-2.html`](home-2.html) — **Home 2**: Full-screen dark clinical-tech hero with interactive 3D-tilting HTML/CSS dashboard mockup & SVG ECG pulse, 8-module bento grid, sticky-scroll product walkthrough, security & compliance matrix, 2 hospital before/after case studies, 4-step legacy migration timeline, FAQ accordion, and newsletter signup.
3. [`features.html`](features.html) — Category filter tabs, 10 alternating deep-dive feature rows (EMR, OPD/IPD, Bed Telemetry, Billing/TPA, Pharmacy, LIS/PACS, Staff Roster, Appointments, Telemedicine, BI Analytics), comparison table, and security grid.
4. [`pricing.html`](pricing.html) — Monthly/Yearly billing toggle (20% discount), INR (`₹`) / USD (`$`) currency switcher, 3 plans (*Clinic*, *Hospital*, *Enterprise*), sticky-header feature comparison table, 4 add-on modules, pricing FAQ, and custom quote strip.
5. [`demo-request.html`](demo-request.html) — 4-step interactive demo booking wizard with full validation, 3-step demo explainer, walkthrough video preview with local poster, and privacy assurance.
6. [`about.html`](about.html) — Origin story, mission/vision, core values, 2019–2026 milestone timeline, 4 leadership profiles, 3 clinical advisory board members, certifications, and careers strip.
7. [`contact.html`](contact.html) — Validated contact form, global offices, interactive hospital campus SVG map, priority support channels, 24×7 severity-1 escalation card, and social links.
8. [`docs.html`](docs.html) — Sticky sidebar documentation portal, live search filter, quickstart guide, HL7 FHIR R4 / Webhook payloads with one-click copy buttons, and video tutorials.
9. [`integrations.html`](integrations.html) — Searchable and category-filterable directory of 21 healthcare integrations across Payment Gateways, TPA/NHCX, Lab Analyzers, DICOM PACS, Messaging, ABDM/Gov Health IDs, and ERP.
10. [`changelog.html`](changelog.html) — Version release timeline (`v4.8` to `v4.4`) with interactive `New`, `Improved`, and `Fixed` tag filters.
11. [`status.html`](status.html) — Live cluster status indicators, 90-day SVG uptime bars across 6 subsystems, latency telemetry, and past incident post-mortems.
12. [`login.html`](login.html) — Split-screen hospital portal login with photo security panel, role selector (`Admin` / `Doctor` / `Nurse` / `Billing`), password visibility toggle, and instant demo redirect to `dashboard/dashboard.html`.
13. [`signup.html`](signup.html) — Hospital tenant provisioning form with facility license number, bed capacity, tier selection, and onboarding checklist panel.
14. [`404.html`](404.html) — Clinical "Code 404: Ward Not Found" error page with quick module search and navigation links.
15. [`coming-soon.html`](coming-soon.html) — Live countdown timer to `MediCore AI Scribe 5.0` launch with early-access waitlist form.

### Interactive Admin Dashboard (9 Pages in `dashboard/`)
16. [`dashboard/dashboard.html`](dashboard/dashboard.html) — Real-time KPI cards, 7-day IPD/OPD/Discharge SVG chart, ward occupancy donut chart, 6-month revenue chart, recent admissions table, and dismissible ICU/Lab alerts.
17. [`dashboard/patients.html`](dashboard/patients.html) — Searchable & filterable EMR patient table, **+ Admit New Patient** modal (live DOM insertion), and slide-over **Patient Clinical Chart Drawer** (vitals, allergies, prescriptions, labs, invoices).
18. [`dashboard/beds.html`](dashboard/beds.html) — Interactive color-coded ward & ICU bed board (`Available`, `Occupied`, `Cleaning`, `Reserved`, `Maintenance`) with click-to-assign/discharge modal.
19. [`dashboard/billing.html`](dashboard/billing.html) — Invoices & TPA insurance claims ledger, status filter chips, **+ Create Invoice** modal with live tax/total calculation, and print-formatted receipt support.
20. [`dashboard/staff-schedule.html`](dashboard/staff-schedule.html) — Weekly doctor & nurse shift matrix (`Morning`, `Evening`, `Night`, `On-Call`), fatigue turnaround conflict detection, shift assignment modal, and leave approval.
21. [`dashboard/appointments.html`](dashboard/appointments.html) — Active OPD consultant chambers, master OPD/Telemedicine queue, one-click status advancement (`Call Next Token` / `Start Consult`), and slot booking modal.
22. [`dashboard/messages.html`](dashboard/messages.html) — Priority clinical department cards (`STAT ICU`, `Pharmacy Cold-Chain`, `Lab Panic Value`, `TPA Pre-Auth`) and live SBAR reply composer.
23. [`dashboard/reports.html`](dashboard/reports.html) — NABH 5th Edition quality indicator cards (ALOS, ARPOB, HAI rate, TPA realization), revenue & utilization charts, departmental matrix, and CSV/PDF export actions.
24. [`dashboard/settings.html`](dashboard/settings.html) — Medical Superintendent profile card, Hospital Tenant & NABH license form, RBAC permission matrix, and demo state reset.

---

## 2. Architecture & Design Highlights

- **Clinical-Tech Color System**: Deep Midnight Teal (`#06232B`), Surgical Teal (`#0FA3A3`), Electric Mint (`#3EF2C0`), Coral Signal Alert (`#FF5C6C`), and Amber Warning (`#FFB84D`), with full **Dark Mode** (`assets/css/dark-mode.css`) and **RTL (Right-to-Left)** (`assets/css/rtl.css`) support persisted via `localStorage`.
- **Card Ergonomics & Healthcare Animations**: Every `.mc-card` / `.card` features centered icon and text alignment across all viewports, 3D mouse-tracking perspective tilt (`assets/js/plugins/tilt.js`), and subtle clinical animations (`.card-anim-pulse`, `.card-anim-ecg`, `.card-anim-scan`, `.card-anim-ring`, `.card-anim-cross`, `.card-anim-shimmer`).
- **54 Unique Real Photographs (Zero Repeats)**: All 54 clinical, hospital, and portrait photographs are stored locally in `assets/images/` in WebP (`1200w`/`400w` + `-640w.webp` responsive `srcset`) and JPEG fallback formats. Every photograph is used **strictly once** across the entire 24-page project. Full attribution is documented in [`documentation/image-credits.md`](documentation/image-credits.md).
- **Self-Hosted Fonts & Minified Bundles**: Self-hosted `.woff2` fonts (`Sora`, `Inter`, `JetBrains Mono`) in `assets/fonts/`, plus both readable source files and minified `.min.css` / `.min.js` bundles.

---

## 3. Documentation Index

- [`documentation/installation.md`](documentation/installation.md) — Local preview and production deployment guide
- [`documentation/customization.md`](documentation/customization.md) — CSS tokens, dark mode, RTL, and branding guide
- [`documentation/page-structure.md`](documentation/page-structure.md) — Section-by-section blueprint for all 24 pages
- [`documentation/image-credits.md`](documentation/image-credits.md) — Complete 54-image manifest with file paths, pages, and photographers
- [`documentation/credits.md`](documentation/credits.md) — Typography, icons, and architecture credits
- [`documentation/changelog.md`](documentation/changelog.md) — Template release notes
- [`documentation/support.md`](documentation/support.md) — SLA and customization support guide

