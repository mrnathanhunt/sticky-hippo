import { createFileRoute } from "@tanstack/react-router";
import { CoinProvider } from "@/lib/coin";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

export const Route = createFileRoute("/picks")({
  component: PicksPage,
  head: () => ({
    meta: [{ title: "Sticky Hippo — pose picks" }],
  }),
});

const PICKS = [
  { n: 1, file: "1-guns.jpg", label: "guns" },
  { n: 2, file: "2-chair.jpg", label: "chair" },
  { n: 3, file: "3-walk.jpg", label: "walk" },
  { n: 4, file: "4-salute.jpg", label: "salute" },
  { n: 5, file: "5-lean.jpg", label: "lean" },
  { n: 6, file: "6-kiss.jpg", label: "kiss" },
  { n: 7, file: "7-crossed.jpg", label: "crossed (live now)" },
  { n: 8, file: "8-point.jpg", label: "point" },
  { n: 9, file: "9-peace.jpg", label: "peace" },
  { n: 10, file: "10-over-shoulder.jpg", label: "over-shoulder" },
  { n: 11, file: "11-thumbs.jpg", label: "thumbs" },
  { n: 12, file: "12-lounge.jpg", label: "lounge" },
  { n: 13, file: "13-fist.jpg", label: "fist" },
  { n: 14, file: "14-shrug.jpg", label: "shrug" },
];

function PicksPage() {
  return (
    <CoinProvider id="hippo">
      <div id="top">
        <SiteHeader />
        <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14">
          <p className="mb-4 inline-flex items-center gap-2 rounded-md bg-gold px-2.5 py-1 font-display text-xs uppercase text-paper">
            pick a pose
          </p>
          <h1 className="font-display text-4xl uppercase leading-[0.9] tracking-tight sm:text-6xl">
            cocky hippo picks
          </h1>
          <p className="mt-4 max-w-lg text-lg text-muted">
            tap a number in chat (1–14). we’ll stamp $hippo on it and make it
            the coin. 7 is live right now.
          </p>
          <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {PICKS.map((pick) => (
              <li
                key={pick.n}
                className="overflow-hidden rounded-xl bg-surface outline outline-1 -outline-offset-1 outline-ink/10"
              >
                <img
                  src={`/picks/${pick.file}`}
                  alt={`pose ${pick.n} ${pick.label}`}
                  width={1408}
                  height={1408}
                  className="aspect-square w-full object-cover"
                />
                <p className="px-4 py-3 font-display text-sm uppercase">
                  {pick.n} · {pick.label}
                </p>
              </li>
            ))}
          </ul>
        </main>
        <SiteFooter />
      </div>
    </CoinProvider>
  );
}
