import { config, fields, collection } from "@keystatic/core";

type GhRepo = `${string}/${string}`;

function storage():
  | { kind: "local" }
  | { kind: "github"; repo: GhRepo; branchPrefix?: string } {
  if (
    process.env.KEYSTATIC_STORAGE === "github" &&
    process.env.KEYSTATIC_GITHUB_REPO
  ) {
    return {
      kind: "github",
      repo: process.env.KEYSTATIC_GITHUB_REPO as GhRepo,
      ...(process.env.KEYSTATIC_GITHUB_BRANCH_PREFIX
        ? { branchPrefix: process.env.KEYSTATIC_GITHUB_BRANCH_PREFIX }
        : {}),
    };
  }
  return { kind: "local" };
}

export default config({
  storage: storage(),
  collections: {
    news: collection({
      label: "News & Press Releases",
      slugField: "title",
      path: "content/news/*/",
      format: { contentField: "content" },
      schema: {
        title: fields.slug({ name: { label: "Headline" } }),
        subtitle: fields.text({ label: "Subheadline", multiline: true }),
        publishedDate: fields.date({ label: "Date" }),
        kind: fields.text({ label: "Kind", defaultValue: "Press release" }),
        excerpt: fields.text({ label: "Excerpt (listing and share text)", multiline: true }),
        ogImage: fields.text({ label: "Share image path (optional, e.g. /og/og-news-x.png)" }),
        content: fields.document({ label: "Body" }),
      },
    }),
    posts: collection({
      label: "Blog Posts",
      slugField: "title",
      /* Trailing `/` = one folder per slug with `index.mdoc` inside (not flat `slug.mdoc`). */
      path: "content/posts/*/",
      format: { contentField: "content" },
      schema: {
        title: fields.slug({ name: { label: "Title" } }),
        publishedDate: fields.date({ label: "Published Date" }),
        tag: fields.text({ label: "Tag", defaultValue: "Insights" }),
        excerpt: fields.text({
          label: "Excerpt",
          multiline: true,
        }),
        readTime: fields.text({
          label: "Read Time",
          defaultValue: "5 min read",
        }),
        /* `document` → reader uses fromMarkdoc + deserializeFiles (DocumentRenderer format).
           `fields.markdoc` reader returns `{ node: raw AST }` only suited to the Prose editor. */
        content: fields.document({
          label: "Content",
        }),
      },
    }),
  },
});
