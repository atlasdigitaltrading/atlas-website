// Time-boxed event presence. The TOKEN2049 banner and hero pill render only
// while the event is upcoming or in progress, then disappear on their own so
// nothing goes stale if nobody removes it.
export const EVENT = {
  id: "token2049",
  name: "TOKEN2049 Singapore",
  dates: "7 to 8 October 2026",
  venue: "Marina Bay Sands",
  booth: "Booth SS29, Startup Village",
  stage: "Pitching on the Startup Stage",
  // Singapore midnight after the last day (UTC+8).
  endsAt: Date.parse("2026-10-09T00:00:00+08:00"),
  image: "/events/token2049-singapore-2026.png",
};

export function isEventLive(now = Date.now()) {
  return now < EVENT.endsAt;
}
