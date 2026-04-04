# Atlas Digital Trading — Website Deployment PRD

## Document Purpose
This PRD is designed for direct consumption by AI-assisted coding tools (Cursor, Claude Code) to scaffold and deploy the Atlas Digital Trading website. No additional external context is required.

---

## 1. Project Overview

**Product:** Marketing website for Atlas Digital Trading (atlasdigitaltrading.com)
**Company:** Atlas Digital Markets LLC (Jersey City, NJ)
**Operator:** TELK Group
**Launch Target:** Monday, April 7, 2026 (LinkedIn announcement)

**Stack:**
- **Framework:** Next.js 14+ (App Router)
- **Styling:** Tailwind CSS v4
- **CMS:** Keystatic (file-based, Git-backed, built-in admin UI)
- **Hosting:** Vercel (free tier)
- **Domain:** atlasdigitaltrading.com
- **Form handling:** Vercel Serverless Function → email notification
- **Analytics:** Vercel Analytics (built-in)

**Why this stack:**
- Keystatic provides a browser-based editor for blog posts (Wix-like editing experience) without requiring a separate hosted CMS service
- Keystatic stores content as Markdown files in the Git repo — every blog post is a commit
- Vercel deploys automatically on every push to `main`
- Total cost: $0/month on free tier (custom domain supported)

---

## 2. Brand System

### Colors (Electric Blue palette)
```
--bg:           #09090b
--bg-alt:       #0f0f12
--card:         #18181b
--card-hover:   #1f1f23
--border:       #27272a
--border-hover: rgba(59,130,246,0.35)
--accent:       #3b82f6
--accent-light: #60a5fa
--accent-dim:   rgba(59,130,246,0.12)
--accent-glow:  rgba(59,130,246,0.25)
--white:        #f1f5f9
--offwhite:     #e2e8f0
--gray:         #94a3b8
--gray-dark:    #64748b
--gray-darker:  #475569
--green:        #22c55e
--red:          #ef4444
--orange:       #f59e0b
--purple:       #a78bfa
--cyan:         #06b6d4
```

### Typography
- **Display / Headings:** Instrument Sans (Google Fonts) — weight 700-800
- **Body / UI:** DM Sans (Google Fonts) — weight 400-700
- **Monospace (data tables):** JetBrains Mono or system monospace

### Logo
SVG triangle mark + "ATLAS" wordmark in Instrument Sans, uppercase, letter-spacing 0.12em. Accent color for the triangle stroke, 20% opacity accent fill for inner triangle.

---

## 3. Site Architecture

### Pages

```
/                     → Home (single-page landing)
/blog                 → Blog index (list of posts)
/blog/[slug]          → Individual blog post
```

### Home Page Sections (scroll order)

1. **Hero** — Tagline, sub-copy, dual CTA, animated stats
2. **Platform** — Tabbed showcase with 5 platform screenshots
3. **Solutions** — 6-card grid of capabilities
4. **Clients** — 3-column Buy Side / Sell Side / Service Providers
5. **Why Atlas** — Founder bio + 4 differentiator cards
6. **Blog** — Latest 3 posts (pulled from Keystatic)
7. **Demo Form** — Contact form with email delivery
8. **Footer** — Logo, links, copyright

### Navigation
Fixed top navbar with smooth-scroll anchors to each section. "Book a Demo" CTA button always visible. Mobile: hamburger menu.

---

## 4. Content Specification

### 4.1 Hero Section

**Headline:**
```
Institutional Execution
for Digital Assets
```
"Execution" rendered in accent color (#3b82f6).

**Sub-headline:**
```
The institutional execution infrastructure for digital assets:
Smart Order Routing, Execution Algorithms, and Pre-trade/Post-Trade
Transaction Cost Analysis (TCA) — unified in a single platform.
```

**CTAs:**
- Primary: "Book a Demo →" (scrolls to #demo)
- Secondary: "See the Platform" (scrolls to #platform)

**Badge:** "Now Live — Design Partner Program" with pulsing green dot

**Stats row (animated counters on scroll-into-view):**
- 10+ Connected Exchanges
- 3 Execution Modes
- 25+ Years TradFi Expertise

### 4.2 Platform Section

**Tab structure (5 tabs):**

| Tab | Title | Key Features |
|-----|-------|-------------|
| Trading | Multi-venue price charts, CLOB, SOR, order ticket | 5 venue charts, order books, SOR with 3 modes, Standard & TWAP |
| Pre-Trade Analytics | Almgren-Chriss cost estimation | Cost decomposition table, per-venue ADV, execution schedule chart |
| Post-Trade TCA | Strategy comparison & slippage | Venue donut chart, strategy table, slippage bar chart |
| Orders & Execution | Fill tracking blotter | Multi-exchange execution, parent/child orders, audit trail |
| Venue Analytics | Exchange-level detail | Volume distribution, per-instrument metrics, avg price comparison |

Each tab displays:
- Left column: title, description paragraph, feature checklist with checkmarks
- Right column: platform screenshot (actual PNG from /public/screenshots/)

**Screenshots to include in /public/screenshots/:**
1. `trading.png` — Full trading view with 5 venue charts + order books + CLOB
2. `pre-trade.png` — Pre-trade analytics with cost estimator + execution schedule
3. `post-trade-tca.png` — Post-trade TCA with strategy comparison + slippage chart
4. `orders.png` — Orders & Executions blotter with fill detail
5. `venue-analytics.png` — Exchange information with venue volume donut

### 4.3 Solutions Section

6-card grid (3×2), each card with:
- Emoji icon in accent-dim container
- Title (Instrument Sans, 18px, bold)
- Description paragraph (DM Sans, 14px, gray)

Cards:
1. ⚡ Smart Order Routing
2. 📊 Execution Algorithms
3. 🔍 Pre-Trade Analytics
4. 📈 Post-Trade TCA
5. 🏦 Order Management
6. 🛡️ Margin & Collateral

### 4.4 Clients Section

3-column layout with colored top borders:
- Buy Side (accent blue): Asset Managers, ETF Issuers, Hedge Funds, Crypto Funds, Proprietary Trading Firms, Token Holders & Projects
- Sell Side (cyan): Banks, Retail Investment Platforms, OTC Desks, Broker-Dealers, Prime Brokers
- Service Providers (purple): Custodians, Payment Service Providers

### 4.5 Why Atlas Section

2-column layout:
- Left: Section intro, founder bio, credentials
- Right: 4 differentiator cards (hover effect on border)

Founder card includes:
- Name: Kiran Pingali
- Credentials: Cornell M.Eng · Columbia MBA · CFA
- Experience: Ex-Citigroup · Ex-Thomson Reuters/Refinitiv · Ex-Bloomberg
- LinkedIn link: https://www.linkedin.com/in/kiran-pingali/

### 4.6 Blog Section

Displays latest 3 posts from Keystatic. Placeholder cards for empty slots (dashed border, "More insights coming soon"). First post: "Why We Built Atlas" (tag: Founding Story).

### 4.7 Demo Form

Fields:
- First Name * (required)
- Last Name
- Work Email * (required)
- Company
- Role
- Message (textarea, optional)

Submit button: "Request Demo"
Footer text: "We'll respond within 24 hours. No spam, no sales automation."

Success state: Checkmark + "Thank you, {firstName}" + confirmation message.

**Backend:** Vercel Serverless Function at `/api/demo-request` that:
1. Validates required fields
2. Sends email via Resend API (free tier, 100 emails/day) to the configured recipient
3. Returns success/error JSON

### 4.8 Footer

- Logo (small)
- "Atlas Digital Markets LLC · Jersey City, NJ"
- Links: LinkedIn, Contact (mailto)
- Copyright: "© 2026 Atlas Digital Markets LLC. All rights reserved."

---

## 5. Keystatic CMS Configuration

### Setup

```bash
npm install @keystatic/core @keystatic/next
```

### keystatic.config.ts

```typescript
import { config, fields, collection } from '@keystatic/core';

export default config({
  storage: { kind: 'local' },  // Git-backed, stores as files
  collections: {
    posts: collection({
      label: 'Blog Posts',
      slugField: 'title',
      path: 'content/posts/*',
      format: { contentField: 'content' },
      schema: {
        title: fields.slug({ name: { label: 'Title' } }),
        publishedDate: fields.date({ label: 'Published Date' }),
        tag: fields.text({ label: 'Tag', defaultValue: 'Insights' }),
        excerpt: fields.text({ label: 'Excerpt', multiline: true }),
        readTime: fields.text({ label: 'Read Time', defaultValue: '5 min read' }),
        content: fields.markdoc({ label: 'Content' }),
      },
    }),
  },
});
```

### Admin Route

Create `app/keystatic/[[...params]]/page.tsx` to mount the Keystatic admin UI.

**Access:** Navigate to `atlasdigitaltrading.com/keystatic` to write/edit blog posts in a visual editor. No login required in local mode; for production, configure GitHub storage mode for authenticated access.

### Blog Workflow

1. Go to `/keystatic` in browser
2. Click "Blog Posts" → "Create"
3. Write title, tag, excerpt, body (rich text with formatting)
4. Click "Save" → creates a Markdown file in `content/posts/`
5. Push to GitHub → Vercel auto-deploys → post is live

---

## 6. Project Structure

```
atlas-website/
├── app/
│   ├── layout.tsx              # Root layout with fonts, metadata
│   ├── page.tsx                # Home page (imports all sections)
│   ├── blog/
│   │   ├── page.tsx            # Blog index
│   │   └── [slug]/
│   │       └── page.tsx        # Individual post
│   ├── keystatic/
│   │   └── [[...params]]/
│   │       └── page.tsx        # Keystatic admin UI
│   └── api/
│       └── demo-request/
│           └── route.ts        # Form submission handler
├── components/
│   ├── NavBar.tsx
│   ├── Hero.tsx
│   ├── Platform.tsx
│   ├── Solutions.tsx
│   ├── Clients.tsx
│   ├── WhyAtlas.tsx
│   ├── BlogSection.tsx
│   ├── DemoForm.tsx
│   ├── Footer.tsx
│   ├── Logo.tsx
│   ├── SectionLabel.tsx
│   ├── SectionHeading.tsx
│   └── Counter.tsx
├── content/
│   └── posts/                  # Keystatic blog posts (Markdown)
│       └── why-we-built-atlas/
│           └── index.mdoc
├── public/
│   ├── screenshots/
│   │   ├── trading.png
│   │   ├── pre-trade.png
│   │   ├── post-trade-tca.png
│   │   ├── orders.png
│   │   └── venue-analytics.png
│   ├── og-image.png            # Open Graph image for social sharing
│   └── favicon.svg
├── keystatic.config.ts
├── tailwind.config.ts
├── next.config.js
├── package.json
└── .env.local                  # RESEND_API_KEY, DEMO_EMAIL_RECIPIENT
```

---

## 7. SEO & Meta

### Head metadata (app/layout.tsx)

```typescript
export const metadata = {
  title: 'Atlas Digital Trading | Institutional Execution for Digital Assets',
  description: 'Smart Order Routing, Execution Algorithms, and Pre-trade/Post-Trade TCA — the institutional execution infrastructure for digital assets.',
  openGraph: {
    title: 'Atlas Digital Trading',
    description: 'Institutional Execution for Digital Assets',
    url: 'https://atlasdigitaltrading.com',
    siteName: 'Atlas Digital Trading',
    images: [{ url: '/og-image.png', width: 1200, height: 630 }],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Atlas Digital Trading',
    description: 'Institutional Execution for Digital Assets',
  },
};
```

---

## 8. Domain & DNS Configuration

### Primary domain: atlasdigitaltrading.com

**Vercel DNS setup:**
1. In Vercel dashboard → Project Settings → Domains → Add `atlasdigitaltrading.com`
2. At your domain registrar, set:
   - A record: `76.76.21.21`
   - CNAME for www: `cname.vercel-dns.com`

### Redirect domains (set up at each registrar):
- `atlasdigitalmarkets.xyz` → 301 redirect to `atlasdigitaltrading.com`
- `atlasmarkets.xyz` → 301 redirect to `atlasdigitaltrading.com`
- `atlascryptotrading.com` → 301 redirect to `atlasdigitaltrading.com`

---

## 9. Deployment Pipeline

### Initial setup (one-time):

```bash
# 1. Create Next.js project
npx create-next-app@latest atlas-website --typescript --tailwind --app --src-dir=false

# 2. Install dependencies
cd atlas-website
npm install @keystatic/core @keystatic/next resend

# 3. Set up environment variables
echo "RESEND_API_KEY=re_xxxxx" >> .env.local
echo "DEMO_EMAIL_RECIPIENT=kiran@atlasdigitaltrading.com" >> .env.local

# 4. Initialize Git and push to GitHub
git init
git add .
git commit -m "Initial Atlas website"
git remote add origin git@github.com:YOUR_ORG/atlas-website.git
git push -u origin main

# 5. Connect to Vercel
npx vercel --prod
```

### Ongoing workflow:

```
Edit code in Cursor → git push → Vercel auto-deploys (< 60 seconds)
Write blog post in /keystatic → save → git push → auto-deploys
```

---

## 10. Form Submission API

### /app/api/demo-request/route.ts

```typescript
import { Resend } from 'resend';
import { NextResponse } from 'next/server';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { firstName, lastName, email, company, role, message } = body;

    if (!firstName || !email) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    await resend.emails.send({
      from: 'Atlas Demo Request <noreply@atlasdigitaltrading.com>',
      to: process.env.DEMO_EMAIL_RECIPIENT!,
      subject: `Demo Request: ${firstName} ${lastName || ''} — ${company || 'No company'}`,
      html: `
        <h2>New Demo Request</h2>
        <p><strong>Name:</strong> ${firstName} ${lastName || ''}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Company:</strong> ${company || 'Not provided'}</p>
        <p><strong>Role:</strong> ${role || 'Not provided'}</p>
        <p><strong>Message:</strong> ${message || 'None'}</p>
        <hr>
        <p><em>Submitted via atlasdigitaltrading.com</em></p>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to send' }, { status: 500 });
  }
}
```

### Resend setup:
1. Sign up at resend.com (free: 100 emails/day)
2. Verify domain: add DNS records for atlasdigitaltrading.com
3. Get API key → add to .env.local

---

## 11. Implementation Phases

### Phase 1: Launch (Friday Apr 4 → Sunday Apr 6)
- [ ] Scaffold Next.js project with Tailwind
- [ ] Port all React components from the prototype artifact
- [ ] Add actual platform screenshots to /public/screenshots/
- [ ] Replace mock platform UI with <Image> components showing real screenshots
- [ ] Set up Keystatic CMS
- [ ] Create first blog post: "Why We Built Atlas"
- [ ] Set up Resend for demo form emails
- [ ] Deploy to Vercel
- [ ] Configure DNS for atlasdigitaltrading.com
- [ ] Test demo form end-to-end
- [ ] Test mobile responsiveness

### Phase 2: Post-Launch (Week of Apr 7)
- [ ] Set up redirect domains
- [ ] Add Vercel Analytics
- [ ] Create OG image for social sharing
- [ ] Write 2nd blog post
- [ ] Set up Google Search Console
- [ ] Add structured data (Organization schema)

### Phase 3: Enhancements (Weeks 2-4)
- [ ] Add individual /solutions pages if needed
- [ ] Add /about page with full founder story
- [ ] Integrate Calendly for direct demo booking
- [ ] Add testimonial section (once design partners are active)
- [ ] Performance optimization (image lazy loading, font subsetting)

---

## 12. Key Technical Notes for Cursor

### Converting the prototype to Next.js components:
- The prototype artifact (`atlas-website-v2.jsx`) contains the complete UI as a single React component
- Split each section function into its own file in `/components/`
- Replace inline styles with Tailwind utility classes
- Replace the mock platform screenshots with `<Image>` components pointing to `/screenshots/*.png`
- Use `next/image` with `priority` on hero images, `loading="lazy"` on below-fold images

### Tailwind custom config:
```typescript
// tailwind.config.ts
export default {
  theme: {
    extend: {
      colors: {
        atlas: {
          bg: '#09090b',
          card: '#18181b',
          border: '#27272a',
          accent: '#3b82f6',
        }
      },
      fontFamily: {
        display: ['Instrument Sans', 'sans-serif'],
        body: ['DM Sans', 'sans-serif'],
      }
    }
  }
}
```

### Critical: Platform screenshots
The prototype currently renders mock UIs built from React components. In production, replace these with the actual platform screenshots (PNG files). Use `next/image` with appropriate sizing:

```tsx
<Image
  src="/screenshots/trading.png"
  alt="Atlas EMS Trading View"
  width={800}
  height={500}
  className="rounded-lg border border-atlas-border"
  priority={activeTab === 0}
/>
```

### Mobile responsiveness priorities:
- Navbar: collapse to hamburger at < 900px
- Hero: stack CTAs vertically at < 640px
- Platform tabs: horizontal scroll at < 768px
- Solutions grid: 1 column at < 640px, 2 columns at < 1024px
- Clients grid: stack vertically at < 768px
- Why Atlas: stack vertically at < 1024px
- Demo form: full-width fields at < 640px
