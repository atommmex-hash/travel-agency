# Travel Agency Website

A fast, accessible, static website for a regional travel agency, designed for high conversion on mobile devices over 4G connections. Built according to [`design.md`](./design.md) and [`instructions.md`](./instructions.md).

## Features

- **Static Generation (Astro 5)**: Zero runtime framework overhead, ultra-fast TTFB, full pre-rendering for SEO.
- **Topographic Contour Design System**: Programmatically generated SVG elevation contours, alpenglow summit animation, and altitude markers.
- **Direct WhatsApp Conversion Engine**:
  - One-tap general inquiry
  - Per-trip quotes pre-populated with package title, guest count, and stay tier
  - Shortlist sharing: sends all saved trips in one WhatsApp message
  - Inquiry form: builds personalized travel prompt and opens `wa.me`
- **Interactive Trip Estimator**: Dynamic guest count stepper (1–12) and stay tier multipliers (Comfort 1.0x, Premium 1.35x, Luxury 1.8x).
- **Interactive Trip Filters**: Instant client-side filtering by destination, length of stay, and budget range slider.
- **Saved Trips**: Client-side shortlisting stored in `localStorage` inside defensive `try/catch` with live badge counter.
- **Decap CMS**: Visual, non-developer CMS interface for adding trips, adjusting prices, and updating FAQs without touching code.
- **Strict Content Validation**: Zod schema enforcement across all trip files and site configuration.

---

## Directory Map

```text
├── public/
│   ├── admin/               # Decap CMS visual editor (index.html, config.yml)
│   ├── images/              # Media uploads directory
│   ├── _headers             # Security headers (CSP, nosniff, Referrer-Policy)
│   └── robots.txt           # Search engine crawling rules
├── src/
│   ├── components/          # Semantic Astro components
│   │   ├── Header.astro     # Fixed header with blur backdrop and mobile overlay
│   │   ├── Hero.astro       # MMT-style floating search card & destination filter controls
│   │   ├── TripCard.astro   # Card with elevation bar, highlights, and price
│   │   ├── TripDialog.astro # Accessible <dialog> sheet with day-by-day accordion & estimator
│   │   ├── SavedDialog.astro# Shortlist modal with WhatsApp sharing
│   │   ├── BookingAndWhy.astro # 3 numbered booking steps & 4 core value props
│   │   ├── Stories.astro    # Testimonials with mobile touch swipe
│   │   ├── Faq.astro        # FAQ native <details>/<summary> accordion
│   │   ├── EnquiryForm.astro# Dynamic 7-month selector & WhatsApp form generator
│   │   ├── MobileDock.astro # Fixed bottom thumb dock (Call, WhatsApp, Saved)
│   │   ├── Footer.astro     # Semantic footer with safe-area padding
│   │   ├── Toast.astro      # Toast notifications
│   │   └── Icons.astro      # Inline SVG icon sprite
│   ├── content/             # Structured JSON data files
│   │   ├── site.json        # Agency contact details, brand name, hero peak
│   │   ├── stories.json     # Traveller stories & Google reviews
│   │   ├── faq.json         # Frequently asked questions
│   │   └── trips/           # Individual trip JSON packages
│   ├── lib/                 # Pure TypeScript math and utility modules
│   │   ├── contours.ts      # Topographic ring generator & SVG math
│   │   ├── whatsapp.ts      # Click-to-chat URL & message builders
│   │   ├── estimator.ts     # Pricing tier math
│   │   ├── schemas.ts       # Zod validation schemas
│   │   └── content.ts       # Type-safe data loaders
│   ├── styles/              # Design tokens and global CSS
│   │   ├── tokens.css       # Design tokens (colors, radii, spacing, fonts)
│   │   └── base.css         # Typography, reset, focus rings, buttons
│   └── pages/               # Static pages
│       ├── index.astro      # Main landing page
│       ├── privacy.astro    # Privacy policy
│       └── 404.astro        # Branded 404 error page
├── tests/                   # Vitest unit test suite (pure math & schemas)
├── docs/                    # Client handoff documentation
│   ├── OWNER-GUIDE.md       # Owner guide for Decap CMS
│   ├── MAINTENANCE.md       # Monthly maintenance checklist
│   └── PRIVACY.md           # Data handling explanation
└── package.json
```

---

## Getting Started

### Prerequisites

- Node.js `v18.17.0` or higher (tested on `v24.15.0`)
- npm `v9+`

### Installation

```bash
npm install
```

### Local Development

Run the Astro development server:

```bash
npm run dev
```

Visit `http://localhost:4321` in your browser.

### Running Unit Tests

Run the Vitest test suite (contours, estimator math, WhatsApp links, and Zod schemas):

```bash
npm test
```

### Production Build

Verify types and generate the production static build in `dist/`:

```bash
npm run build
```

Preview the static production build locally:

```bash
npm run preview
```

---

## Content Management (Decap CMS)

To run the Decap CMS locally with a local git backend proxy:

```bash
npx decap-server
```

Then visit `http://localhost:4321/admin/`.

For production deployment on Netlify or Cloudflare Pages, Decap CMS connects seamlessly via Netlify Identity or GitHub OAuth. Refer to [`docs/OWNER-GUIDE.md`](./docs/OWNER-GUIDE.md).

---

## Deployment

The static output is in the `dist/` directory.

### Netlify
1. Connect repository in Netlify.
2. Build command: `npm run build`
3. Publish directory: `dist`
4. Enable Netlify Identity under Site Settings > Identity.

### Cloudflare Pages
1. Connect repository in Cloudflare Pages dashboard.
2. Framework preset: `Astro`
3. Build command: `npm run build`
4. Output directory: `dist`
