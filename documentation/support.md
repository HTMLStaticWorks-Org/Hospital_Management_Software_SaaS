# MediCore HMS — Support & Troubleshooting

## 1. Common Questions

### Q: Why do the dashboard pages work without a backend database?
All 9 dashboard modules (`dashboard.html`, `patients.html`, `beds.html`, `billing.html`, `staff-schedule.html`, `appointments.html`, `messages.html`, `reports.html`, `settings.html`) load structured clinical mock data from `assets/js/data/*.json` with an embedded fallback in `assets/js/dashboard.js` so the dashboard functions both over `http://` and `file://` protocols. Interactive mutations (adding patients, updating bed status, creating invoices, assigning shifts, switching hospital roles) persist in `localStorage` during your session.

### Q: How do I reset the demo dashboard state?
Click **Reset Demo Data** in `dashboard/settings.html` or run `localStorage.clear()` in the browser console.

### Q: How do I test Role-Based Access Control (RBAC)?
Use the **Role Switcher** pill in the top bar of any dashboard page (`Admin`, `Doctor`, `Nurse`, `Billing`). Watch the left sidebar menu items and quick-action permissions dynamically adapt to the selected clinical role.

## 2. Accessibility & Browser Support
- Tested on latest Chrome, Edge, Firefox, and Safari (macOS / iOS / Android).
- Full WCAG 2.1 AA keyboard navigation (`Tab`, `Shift+Tab`, `Escape` to close modals/drawers, `Arrow` keys for tabs).
- Respects `prefers-reduced-motion: reduce`.

