# MediCore HMS — Customization Guide

## 1. Color System & Clinical-Tech Design Tokens

All visual tokens are centralized in `assets/css/style.css` (under `:root`) and `assets/css/dark-mode.css` (`[data-theme="dark"]`).

```css
:root {
  --ink: #06232B;           /* Deep midnight teal */
  --primary: #0FA3A3;       /* Surgical teal */
  --primary-600: #0B7F86;   /* Pressed/hover surgical teal */
  --accent: #3EF2C0;        /* Electric mint */
  --signal: #FF5C6C;        /* Coral alert (critical status, occupied ICU beds, overdue bills) */
  --amber: #FFB84D;         /* Clinical warning / pending TPA pre-auth */
  --surface: #F3FAFA;       /* Cool clinical off-white */
  --surface-2: #E4F2F2;     /* Secondary surface container */
}
```

To rebrand the palette, update these variables in `assets/css/style.css` and regenerate `assets/css/style.min.css`.

---

## 2. Self-Hosted Typography

Fonts are stored locally inside `assets/fonts/` as `.woff2` files and declared via `@font-face` in `assets/css/style.css`:
- **Headings (`--font-heading`):** `Sora` (weights 500, 600, 700, 800)
- **Body (`--font-body`):** `Inter` (weights 400, 500, 600, 700)
- **Telemetry / Code / IDs (`--font-mono`):** `JetBrains Mono` (weights 400, 500, 600)

---

## 3. RTL (Arabic / Hebrew) & Dark Mode

- **Dark Mode:** Controlled via `data-theme="dark"` on `<html>` and persisted in `localStorage.getItem('medicore_theme')`. Respects `prefers-color-scheme: dark` by default.
- **RTL Mode:** Controlled via `dir="rtl"` on `<html>` and persisted in `localStorage.getItem('medicore_dir')`. Styling overrides and logical layout rules live in `assets/css/rtl.css`.

---

## 4. Third-Party Integration Hooks (`TODO:` markers)

Search the codebase for `TODO:` comments to wire live production endpoints:
- **Contact Form (`contact.html`):** Formspree / Netlify Forms endpoint in `<form data-form-type="contact">`.
- **Newsletter (`home-2.html`):** Mailchimp / ConvertKit action URL.
- **Demo Booking (`demo-request.html`):** Calendar webhook / Cal.com API endpoint.
- **Checkout & Billing (`pricing.html`, `dashboard/billing.html`):** Stripe Checkout session / PayPal order handler.
- **Hospital SSO (`login.html`):** SAML 2.0 / OIDC identity provider redirect URL.

