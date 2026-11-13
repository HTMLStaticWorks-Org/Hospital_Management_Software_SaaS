# MediCore HMS — Page Structure & Section Architecture

Every page in **MediCore HMS** follows a strict **Zero-Repeated-Sections Rule**: no testimonial block, FAQ, metrics band, logo strip, or CTA is duplicated across pages. Only the global navigation header and footer are shared across marketing pages, and only the sidebar + topbar are shared across dashboard pages.

## 1. Marketing Pages (15 Pages at Root)

| File | Title / Purpose | Unique Section Architecture |
|---|---|---|
| `index.html` | **Home 1** — Benefits-Led Split Cinematic Hero | 1. Split Hero + Floating Glass Telemetry Cards · 2. Hospital Wordmark Marquee · 3. 6-Card Benefits Grid · 4. "A Day in Your Hospital" 6-Step Horizontal Timeline · 5. Count-Up Impact Metrics · 6. Role-Based Value Tabs (Admin/Doctors/Nurses/Billing/IT) · 7. Customer Success Testimonials Carousel · 8. Outcome-Led Final CTA |
| `home-2.html` | **Home 2** — Product-Led Immersive Dark Hero | 1. Full-Screen Dark Hero + 3D Tilting Dashboard Preview & SVG ECG Line · 2. "Modules at a Glance" 8-Tile Asymmetrical Bento Grid · 3. Sticky-Scroll Interactive Product Walkthrough · 4. Security & Compliance Band · 5. Hospital Case Study Showcase (Before/After) · 6. 4-Step Legacy Migration Path · 7. Technical FAQ Accordion · 8. Clinical Informatics Newsletter Signup |
| `features.html` | **Features** — Deep Clinical & Operational Modules | 1. Breadcrumb Hero · 2. Category Filter Tabs (Clinical, Operations, Finance, Administration) · 3. 10 Alternating Feature Rows (EMR, OPD/IPD, Bed/Ward, Billing/TPA, Pharmacy, Lab/Radiology, Staff Roster, Appointments, Telemedicine, Analytics) · 4. Comparison Table (MediCore vs Traditional HMS vs Paper) · 5. Security Features Grid · 6. Feature Sandbox Mini-CTA |
| `pricing.html` | **Pricing** — Transparent Bed-Tiered SaaS Plans | 1. Billing Cycle + INR/USD Currency Switcher Hero · 2. 3 Tiered Plans (Clinic, Hospital, Enterprise) · 3. Sticky-Header Full Feature Comparison Table · 4. Add-On Modules Grid · 5. Licensing & Billing FAQ · 6. Custom Quote & Stripe/PayPal Checkout Strip |
| `demo-request.html` | **Request a Demo** — 30-Minute Personalized Walkthrough | 1. Promise Hero · 2. 4-Step Validated Booking Wizard · 3. "What Happens in Your Demo" 3-Step Explainer · 4. Demo Deliverables + Video Walkthrough Preview · 5. SLA Response-Time & HIPAA Privacy Assurance |
| `about.html` | **About Us** — Clinical Mission & Leadership | 1. Founding Story & Campus · 2. Mission, Vision & Core Clinical Values · 3. Milestone Timeline (2019–2026) · 4. Executive Leadership Team · 5. Clinical Advisory Board · 6. NABH / JCI / ISO Awards & Certifications · 7. Healthcare Technologist Careers Strip |
| `contact.html` | **Contact Us** — Global Support & Regional Hubs | 1. Validated Contact Form (Formspree/Netlify ready) · 2. Global Offices Directory · 3. Interactive Map Container · 4. Multi-Channel Support Matrix · 5. 24/7 Priority Code-Blue Support Card · 6. Social & Clinical Community Channels |
| `docs.html` | **Documentation** — HL7 FHIR R4 & Module Docs | 1. Searchable Docs Header · 2. Sticky Left Sidebar Navigation · 3. Quickstart & Deployment Guide · 4. Core Modules Configuration · 5. REST & FHIR R4 API Reference (with Copy-Code Buttons) · 6. Webhook Event Payloads · 7. Security & RBAC Scopes · 8. Video Architecture Tutorial |
| `integrations.html` | **Integrations** — Connected Healthcare Ecosystem | 1. Live Search & Category Filter Bar · 2. Categorized Integration Cards (Payment Gateways, Insurance/TPA, LIS Analyzers, PACS/DICOM, SMS/WhatsApp, ABDM/Gov Health IDs, ERP/Accounting) · 3. Custom HL7/MLLP Connector CTA |
| `changelog.html` | **Changelog** — Product Releases & Patch Notes | 1. Release Filter Bar · 2. Chronological Version Timeline (`v4.8` to `v4.2`) with `New`, `Improved`, and `Fixed` badges |
| `status.html` | **System Status** — Real-Time Telemetry & Uptime | 1. Live Global Operational Banner · 2. Component Status Matrix (EMR Core, ADT Engine, TPA Gateway, DICOM Relay, FHIR API) · 3. 90-Day SVG Uptime Bars (99.99%) · 4. Historical Incident Log |
| `login.html` | **Hospital Login Portal** — Role-Aware Clinical Auth | Split-Screen Layout: Branded Security Photo Panel + Role Selector (Admin / Doctor / Nurse / Billing), Hospital ID, Password Toggle, SAML SSO, Redirect to `dashboard/dashboard.html` |
| `signup.html` | **Hospital Sign Up** — New Facility Registration | Split-Screen Layout: Hospital Registration Form (Facility Name, NABH/License ID, Bed Count, Admin Credentials, Tier Selection) + Onboarding Benefits Side Panel |
| `404.html` | **404 Error** — Lost Ward / Route Not Found | Clinical ECG Flatline Recovery Screen + Instant Page Search & Quick Navigation |
| `coming-soon.html` | **Coming Soon** — MediCore AI Ambient Scribe | Live Countdown Timer + Early-Access Waitlist Form |

---

## 2. Admin Dashboard Pages (9 Pages in `dashboard/`)

| File | Module | Key Interactive Capabilities |
|---|---|---|
| `dashboard/dashboard.html` | **Overview** | 6 KPI Cards, Admissions Trend Chart, Department Load Chart, Revenue vs Collections Chart, Bed Occupancy Donut, Recent Admissions Table, Clinical Alerts Panel |
| `dashboard/patients.html` | **Patient Records** | Searchable, Sortable, Filterable, Paginated EMR Table; Multi-Section "Add Patient" Modal; Slide-Out Patient Detail Drawer with 6 Tabs (Overview, Vitals, Prescriptions, Lab Reports, Billing, Documents) |
| `dashboard/beds.html` | **Bed & Ward Status** | Ward-Wise Interactive Bed Board (ICU, General, Private, Maternity, Pediatrics, Emergency), Color-Coded Status Tiles, Click-to-Assign / Discharge / Transfer Modal, Live Counters |
| `dashboard/billing.html` | **Billing & TPA Claims** | Invoice Ledger, Dynamic Create-Invoice Modal with Line Items & GST/Tax Calculator, Insurance TPA Claim Tracker, Print-Friendly Invoice View, Stripe/PayPal Checkout Placeholders |
| `dashboard/staff-schedule.html` | **Staff Schedule** | Weekly/Monthly Shift Roster Calendar by Department, Shift Type Badges (Morning/Evening/Night/On-Call), Click-to-Assign Shift Modal, Leave Requests & Conflict Highlighting |
| `dashboard/appointments.html` | **Appointments** | OPD/Telemedicine Slot Scheduler, Doctor Filter, Status Transitions (Checked-In, In Consultation, Completed, Cancelled), New Appointment Modal |
| `dashboard/messages.html` | **Messages & Alerts** | Inter-Department Clinical Inbox (ICU, Pharmacy, Pathology, TPA Desk), Priority Tagging, Live Reply Composer, Notification Filter |
| `dashboard/reports.html` | **Reports & Analytics** | NABH Quality Indicators, Average Length of Stay (ALOS), Departmental Revenue Breakdown, CSV/PDF Report Generator |
| `dashboard/settings.html` | **Hospital Settings** | Hospital Profile & NABH License Config, Role-Based Access Control (RBAC) Matrix, Notification Preferences, Security & Audit Log Policy |

