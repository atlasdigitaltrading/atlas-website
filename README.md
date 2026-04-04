# Atlas Digital Trading — marketing website

Next.js (App Router) + Tailwind CSS v4 + [Keystatic](https://keystatic.com/) (Git-backed blog) + Vercel.

This repo is **only** the public marketing site (`www.atlasdigitaltrading.com`). The trading application lives in a **separate** repository and infrastructure.

## Quick start

```bash
npm install
cp .env.example .env.local   # optional: Resend keys for demo form
npm run dev
```

- Site: [http://localhost:3000](http://localhost:3000)  
- CMS (local): [http://localhost:3000/keystatic](http://localhost:3000/keystatic)

## Deploy & DNS

See **[docs/WEBSITE-DEPLOYMENT.md](docs/WEBSITE-DEPLOYMENT.md)** for DreamHost, Cloudflare, Vercel, GitHub, Resend, and how to edit content and redeploy.

## Product / design spec

- **[docs/Atlas-Website-Deployment-PRD.md](docs/Atlas-Website-Deployment-PRD.md)**

## Build

```bash
npm run build
```
