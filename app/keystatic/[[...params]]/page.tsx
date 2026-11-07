import { notFound } from "next/navigation";
import { makePage } from "@keystatic/next/ui/app";
import keystaticConfig from "../../../keystatic.config";

// Content is edited locally and committed; the admin UI has no business on
// the public site. Keystatic runs in local storage mode, so on Vercel it
// could not write anyway, but it should not be served at all.
const KeystaticPage = makePage(keystaticConfig);

export default function Page() {
  if (process.env.VERCEL) notFound();
  return <KeystaticPage />;
}
