# Atlas Digital Trading — Website deployment guide

This repository is the **marketing site** for **Atlas Digital Trading** (`www.atlasdigitaltrading.com`). It is **separate** from the Atlas **trading platform** repo (e.g. `AtlasTrading` on EC2 / `mainnet.atlasdigitalmarkets.xyz`).

---

## Architecture summary

| Piece | Role |
|--------|------|
| **DreamHost** | Domain registrar for `atlasdigitaltrading.com` — renew/own the domain |
| **Cloudflare** | DNS + CDN + SSL edge (recommended) in front of Vercel |
| **Vercel** | Hosts this Next.js app; Git-connected builds |
| **GitHub** | Source of truth; every push to `main` deploys |

**Trading platform (unchanged):** `mainnet.atlasdigitalmarkets.xyz` → Cloudflare → AWS EC2 (Docker/nginx), deployed via that repo’s GitHub Actions — **not** this project.

---

## One-time: GitHub

1. Create a **new** GitHub repository (e.g. `your-org/atlas-website`). Do **not** mix this with the trading codebase.
2. From your machine:
   ```bash
   cd /path/to/atlas-website
   git remote rename origin old-origin  # only if create-next-app added a remote you want to replace
   git remote add origin git@github.com:YOUR_ORG/atlas-website.git
   git branch -M main
   git push -u origin main
   ```
3. Branch protection (optional): require PR reviews for `main`.

---

## One-time: Vercel

1. Sign in at [vercel.com](https://vercel.com) (GitHub SSO).
2. **Add New Project** → Import the `atlas-website` GitHub repo.
3. Framework: **Next.js** (auto-detected). Root directory: repo root.
4. **Environment variables** (Project → Settings → Environment Variables), at least for **Production**:
   - `RESEND_API_KEY` — from [resend.com](https://resend.com)
   - `DEMO_EMAIL_RECIPIENT` — where demo form notifications go  
   Optional:
   - `DEMO_EMAIL_FROM` — e.g. `Atlas Demo Request <noreply@atlasdigitaltrading.com>` after you verify the domain in Resend
5. Deploy. Vercel assigns a `*.vercel.app` URL for smoke tests.

---

## One-time: Resend (demo form email)

1. Create account / API key.
2. **Verify** `atlasdigitaltrading.com` in Resend and add the DNS records they show (you can add these in **Cloudflare** while managing DNS there).
3. Until the domain is verified, you can use [Resend’s testing domain](https://resend.com/docs) constraints — see Resend docs for `from` addresses.

---

## DreamHost → Cloudflare

1. In [Cloudflare](https://dash.cloudflare.com), **Add site**: `atlasdigitaltrading.com`.
2. Cloudflare will give you **two nameservers** (e.g. `xxx.ns.cloudflare.com`).
3. In **DreamHost** domain / DNS settings, set **custom nameservers** to Cloudflare’s (not DreamHost’s default DNS).
4. After propagation, **all DNS records** are managed in Cloudflare, not DreamHost.

---

## Cloudflare → Vercel

In **Cloudflare → DNS** for `atlasdigitaltrading.com`:

1. **www** (recommended primary host for marketing):  
   - Type **CNAME**  
   - Name `www`  
   - Target: `cname.vercel-dns.com` (or the exact target shown in Vercel → Project → **Domains** after you add `www.atlasdigitaltrading.com`).
2. **Apex** `atlasdigitaltrading.com`:  
   - Either use **CNAME flattening** / **ALIAS** to the same Vercel target if your plan supports it, **or**  
   - Add the **A record** to Vercel’s documented IPv4 (see [Vercel domain docs](https://vercel.com/docs/concepts/projects/domains)) — values can change; always copy from the Vercel dashboard.

In **Vercel → Project → Domains**:

- Add `www.atlasdigitaltrading.com` and `atlasdigitaltrading.com`.
- Set **redirect** apex → `www` (or the reverse), so there is only one canonical URL.

### Proxy status (orange cloud)

- Many teams set the **www** CNAME to **DNS only** (grey cloud) when Vercel serves HTTPS directly, to avoid double-proxy issues.  
- If you **proxy** through Cloudflare, use SSL mode **Full (strict)** and follow Vercel’s guidance for Cloudflare.

---

## Keystatic CMS (`/keystatic`)

- **Local development:** With default `storage: { kind: 'local' }`, open [http://localhost:3000/keystatic](http://localhost:3000/keystatic), edit posts; files are written under `content/posts/`. Commit and push.
- **Production on Vercel:** Serverless disks are **ephemeral**. To use the admin UI **in production** and have saves land in Git, configure **GitHub storage** for Keystatic (set `KEYSTATIC_GITHUB_REPO`, `KEYSTATIC_STORAGE=github`, and the GitHub App / OAuth env vars per [Keystatic × GitHub](https://keystatic.com/docs/github-mode)).  
- **Simple alternative:** Edit `content/posts/**` in Cursor, commit, push — Vercel redeploys; no CMS UI required.

Blog URLs:

- Index: `/blog`
- Post: `/blog/[slug]` (slug comes from the post’s title field / folder name in `content/posts`)

---

## Screenshots (platform section)

Replace the placeholder files (or add your PNGs) here:

```text
public/screenshots/trading.png
public/screenshots/pre-trade.png
public/screenshots/post-trade-tca.png
public/screenshots/orders.png
public/screenshots/venue-analytics.png
```

Commit and push; the next deploy will show the new images.

---

## How to change the site and redeploy

### Marketing copy, layout, sections

1. Edit components under `components/` or `app/` locally.
2. `npm run dev` to preview.
3. `git add` / `git commit` / `git push` to `main`.  
4. Vercel builds in roughly **under a minute**; check the **Deployments** tab.

### Blog posts

- **Option A:** `/keystatic` locally (or with GitHub mode in production) → save → `git push`.  
- **Option B:** Add or edit `content/posts/<slug>/index.mdoc` in the repo → push.

### Environment / API keys

- Update variables in **Vercel → Settings → Environment Variables**, then **Redeploy** the latest deployment (or push an empty commit).

---

## Local development

```bash
cd atlas-website
npm install
cp .env.example .env.local
# fill RESEND_* if testing the demo form
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## Quick CLI deploy (optional)

After linking the project once:

```bash
npx vercel --prod
```

Ongoing work normally uses **Git push**; CLI is optional.

---

## Reference docs

- Full product/build spec: [Atlas-Website-Deployment-PRD.md](./Atlas-Website-Deployment-PRD.md)
- Original single-file React prototype (pre–Next.js): [reference/atlas-website-v2.jsx](./reference/atlas-website-v2.jsx)

---

## Checklist before launch

- [ ] GitHub repo created; this code pushed to `main`
- [ ] Vercel project connected; production deploy green
- [ ] `RESEND_API_KEY` + `DEMO_EMAIL_RECIPIENT` set; test **Book a demo**
- [ ] DreamHost nameservers → Cloudflare
- [ ] Cloudflare DNS → Vercel (`www` + apex / redirect)
- [ ] Domains added in Vercel; HTTPS valid on `https://www.atlasdigitaltrading.com`
- [ ] Replace `public/screenshots/*.png` with real product screenshots
- [ ] Optional: custom `public/og-image.png` for social sharing
- [ ] Optional: Keystatic GitHub mode for in-browser editing on production
