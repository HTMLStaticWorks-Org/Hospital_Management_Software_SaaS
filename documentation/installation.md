# MediCore HMS — Installation & Deployment Guide

**MediCore HMS** ("One platform. Every ward. Zero friction.") is a zero-dependency, W3C-valid, self-contained HTML5 / CSS3 / Vanilla ES6+ SaaS Marketing Website and Clinical Admin Dashboard.

## 1. Quick Start (Local Development)

Because all fonts, SVG icons, stylesheets, scripts, mock JSON datasets, and WebP/JPEG photographs are bundled locally under `assets/`, no external package manager or build step is required to preview or run the site.

### Option A: Python HTTP Server
```bash
python -m http.server 8080
```
Then open `http://localhost:8080/index.html` for the marketing site or `http://localhost:8080/dashboard/dashboard.html` for the Hospital Admin Dashboard.

### Option B: Node.js `npx serve`
```bash
npx serve .
```

### Option C: VS Code Live Server
Open the project root folder in VS Code and click **Go Live** on `index.html`.

---

## 2. Production Deployment

All production-minified CSS and JavaScript bundles (`*.min.css` and `*.min.js`) are pre-built alongside their readable source counterparts:

- `assets/css/style.min.css`
- `assets/css/dark-mode.min.css`
- `assets/css/rtl.min.css`
- `assets/css/dashboard.min.css`
- `assets/js/main.min.js`
- `assets/js/dashboard.min.js`
- `assets/js/plugins/tilt.min.js`
- `assets/js/plugins/countup.min.js`
- `assets/js/plugins/charts.min.js`

### Static Hosting Providers (Netlify, Vercel, Cloudflare Pages, AWS S3)
1. Upload the repository root as-is.
2. Configure `404.html` as the custom error document.
3. Ensure `.webp` and `.woff2` MIME types are served with `Cache-Control: public, max-age=31536000, immutable`.
4. Update canonical domain URLs in `sitemap.xml` and `robots.txt`.

