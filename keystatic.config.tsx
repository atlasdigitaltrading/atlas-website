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
    posts: collection({
      label: "Blog Posts",
      slugField: "title",
      path: "content/posts/*",
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
        content: fields.markdoc({
          label: "Content",
        }),
      },
    }),
  },
});
