// The standing announcement pill in the hero. Shown when no live event pill
// takes the slot, and only until `until`, so it cannot go stale.
export const ANNOUNCEMENT = {
  label: "News",
  text: "Sterling Trading Tech and Atlas announce a technology collaboration",
  cta: "Read the release",
  href: "/news/sterling-trading-tech-and-atlas-digital-markets-turn-order-data-into-best-execution-evidence",
  until: Date.parse("2027-01-15T00:00:00-05:00"),
};

export function isAnnouncementLive(now = Date.now()) {
  return now < ANNOUNCEMENT.until;
}
