# Claude Code Instructions — New Blog Post

## What to do

Add a new blog post to the Atlas website. The post is named **"Tokenization: The $191 Trillion Market"** and is the first in a 3-part series.

## The file

The blog post is the attached `index.mdoc` file. It already has the correct Keystatic frontmatter format matching the existing schema in `keystatic.config.ts`:

```yaml
---
title: "Tokenization: The $191 Trillion Market"
publishedDate: 2026-05-06
tag: Insights
excerpt: "..."
readTime: "6 min read"
---
```

## Where it goes

Per the existing project structure (`content/posts/<slug>/index.mdoc`), create:

```
content/posts/tokenization-the-191-trillion-market/index.mdoc
```

The folder name (`tokenization-the-191-trillion-market`) becomes the URL slug, so the post will live at:

```
https://atlasdigitaltrading.com/blog/tokenization-the-191-trillion-market
```

## Tasks

1. **Create the folder** `content/posts/tokenization-the-191-trillion-market/`
2. **Place the attached `index.mdoc`** inside that folder.
3. **Verify the blog index page** (`/blog`) picks up the new post automatically. If the existing blog index has a hardcoded list, update it to include the new post (it should be reading from Keystatic dynamically — check `app/blog/page.tsx`).
4. **Verify the markdown table renders correctly** in the blog post page (`app/blog/[slug]/page.tsx`). Markdoc supports tables natively, but the rendering may need explicit table styling. See "Table styling" below.
5. **Verify the typography matches the rest of the site.** The blog post page should already use Instrument Sans for headings and DM Sans for body text via Tailwind config. If not, ensure the blog post container inherits these.
6. **Run locally**, navigate to the new post URL, and confirm everything renders correctly.
7. **Commit and push** to trigger the Vercel auto-deploy.

## Table styling

The post contains a 13-row markdown table (the GMP composition). The default Tailwind reset removes table borders and padding, so unstyled tables look bad.

If table styling isn't already in place, add to the blog post page (`app/blog/[slug]/page.tsx`) using Tailwind's `prose` classes from `@tailwindcss/typography`, or add explicit table styles. Recommended approach:

```tsx
<article className="prose prose-invert prose-blue max-w-3xl mx-auto
  prose-table:border-collapse
  prose-th:border prose-th:border-atlas-border prose-th:px-4 prose-th:py-2 prose-th:text-left
  prose-td:border prose-td:border-atlas-border prose-td:px-4 prose-td:py-2
  prose-tr:even:bg-atlas-card-hover">
  {/* Markdoc rendered content */}
</article>
```

If `@tailwindcss/typography` isn't installed yet:

```bash
npm install -D @tailwindcss/typography
```

Then add to `tailwind.config.ts`:

```typescript
plugins: [require('@tailwindcss/typography')],
```

## Other formatting to verify

- **Italics** (used in source citations and the byline) — should render as italic text.
- **Bold** (used for the table totals row and Part 2/Part 3 headers) — should render bold.
- **Em dashes** (—) — should render as em dashes, not double hyphens. UTF-8 encoding throughout.
- **Horizontal rules** (`---`) — should render as visible separator lines, especially the one before the author bio at the bottom.
- **Headers** — Single `##` for section headers (the post uses 4 of these). They should match the styling of headers on existing blog posts.

## Excerpt and read time

Both fields are populated in the frontmatter. The blog index card on the home page will use:

- `tag: Insights` → small accent-colored label
- `title` → main card title
- `excerpt` → preview text (will be displayed on the homepage blog section and `/blog` index)
- `readTime: "6 min read"` → secondary metadata
- `publishedDate: 2026-05-06` → date display

## After deployment

The post will be accessible at:

- `https://atlasdigitaltrading.com/blog/tokenization-the-191-trillion-market` (full post)
- `https://atlasdigitaltrading.com/blog` (post should appear in the index)
- `https://atlasdigitaltrading.com/#blog` (post should appear in the home page blog section if it pulls the latest post)

## Note for future posts (Parts 2 and 3)

This is Part 1 of a 3-part series. Parts 2 and 3 will follow the same format and slug pattern:

- `content/posts/tokenized-equities-the-slowest-case/index.mdoc` (Part 2 — coming ~2 weeks)
- `content/posts/the-execution-layer/index.mdoc` (Part 3 — coming ~4 weeks)

When Parts 2 and 3 land, the `tag` field can change from `Insights` to `Series: Tokenization` if useful for grouping, but no schema changes are required.
