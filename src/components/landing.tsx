import { CaPanel } from "@/components/ca-panel";
import { HippoTint } from "@/components/hippo-tint";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { Wordmark } from "@/components/wordmark";
import { Button } from "@/components/ui/button";
import { useCoin } from "@/lib/coin";
import { isLiveMint, pumpUrl } from "@/lib/token";
import { useLiveToken, useTokenStore } from "@/lib/token-store";
import { ArrowDown, Ban, ChevronDown, Droplets, ShieldCheck } from "lucide-react";

const ICONS = [Droplets, Ban, ShieldCheck];

function TickerTape() {
  const coin = useCoin();
  const line = coin.tickerBits.join("  ·  ");
  const doubled = `${line}  ·  ${line}  ·  `;
  const loud = coin.tone === "loud";
  const cream = coin.tone === "cream";
  return (
    <div
      className={
        cream
          ? "overflow-hidden border-y border-ink/10 bg-gold text-paper"
          : loud
            ? "overflow-hidden border-y border-ink/10 bg-ink text-gold"
            : "overflow-hidden border-y border-paper/10 bg-gold text-ink"
      }
    >
      <div className="marquee-track flex w-max gap-0 py-3 font-display text-sm uppercase tracking-wide sm:text-base">
        <span className="px-4">{doubled}</span>
        <span className="px-4" aria-hidden="true">
          {doubled}
        </span>
      </div>
    </div>
  );
}

function ActionTap() {
  const coin = useCoin();
  const n = useTokenStore((s) => s.coins[coin.id]?.taps ?? 0);
  const add = useTokenStore((s) => s.addTap);
  return (
    <button
      type="button"
      onClick={() => add(coin.id)}
      className={
        coin.tone === "cream"
          ? "inline-flex items-center gap-2 rounded-md bg-red px-3 py-2 font-display text-xs uppercase text-ink"
          : "inline-flex items-center gap-2 rounded-md bg-red px-3 py-2 font-display text-xs uppercase text-paper"
      }
    >
      {coin.action}
      <span className="tabular-nums text-gold">{n}</span>
    </button>
  );
}

function Hero() {
  const coin = useCoin();
  const live = useLiveToken();
  const on = isLiveMint(live.mint);
  const loud = coin.tone === "loud";
  const cream = coin.tone === "cream";

  return (
    <section className="mx-auto grid max-w-6xl items-center gap-8 px-4 py-10 sm:px-6 sm:py-16 lg:grid-cols-[1.05fr_0.95fr] lg:gap-12 lg:py-20">
      <div>
        <p
          className={
            loud
              ? "mb-4 inline-flex items-center gap-2 rounded-md bg-ink px-2.5 py-1 font-display text-xs uppercase text-gold"
              : cream
                ? "mb-4 inline-flex items-center gap-2 rounded-md bg-gold px-2.5 py-1 font-display text-xs uppercase text-paper"
                : "mb-4 inline-flex items-center gap-2 rounded-md bg-gold px-2.5 py-1 font-display text-xs uppercase text-ink"
          }
        >
          unofficial meme · ${coin.ticker}
        </p>
        <div>
          <Wordmark size="lg" className="block" />
          <h1 className="mt-3 font-display text-4xl uppercase leading-[0.9] tracking-tight text-ink sm:text-6xl">
            {coin.headline}
          </h1>
        </div>
        <p className="mt-5 max-w-md text-lg leading-relaxed text-muted">{coin.blurb}</p>
        <div className="mt-8 flex flex-wrap items-center gap-3">
          {on ? (
            <Button
              size="lg"
              variant={loud ? "invert" : "default"}
              className={cream ? "text-paper" : undefined}
              asChild
            >
              <a href={pumpUrl(live.mint)} target="_blank" rel="noreferrer">
                buy on pump.fun
              </a>
            </Button>
          ) : (
            <Button
              size="lg"
              variant={loud ? "invert" : "default"}
              className={cream ? "text-paper" : undefined}
              asChild
            >
              <a href="#ca">watch the ca</a>
            </Button>
          )}
          <Button size="lg" variant="outline" asChild>
            <a href="#how">
              how to buy
              <ArrowDown />
            </a>
          </Button>
          {live.telegramUrl ? (
            <Button size="lg" variant="outline" asChild>
              <a href={live.telegramUrl} target="_blank" rel="noreferrer">
                telegram
              </a>
            </Button>
          ) : null}
          <ActionTap />
        </div>
      </div>
      <HippoTint src={coin.heroStill ?? coin.kit} alt={coin.kitAlt} />
    </section>
  );
}

function Lore() {
  const coin = useCoin();
  return (
    <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
      <div className="grid items-center gap-10 lg:grid-cols-2">
        <img
          src={coin.second}
          alt={coin.secondAlt}
          width={1792}
          height={1008}
          className="mx-auto w-full rounded-xl outline outline-1 -outline-offset-1 outline-current/15"
        />
        <div>
          <h2 className="font-display text-4xl uppercase tracking-tight sm:text-5xl">
            {coin.loreTitle}
          </h2>
          <p className="mt-3 max-w-md text-lg text-muted">{coin.loreBody}</p>
          <ul className="mt-8 grid gap-4">
            {coin.pillars.map((item, i) => {
              const Icon = ICONS[i] ?? ShieldCheck;
              return (
                <li key={item.title} className="rounded-xl bg-current/5 p-4 sm:p-5">
                  <p className="flex items-center gap-2 font-display text-sm uppercase text-red">
                    <Icon className="size-4" />
                    {item.title}
                  </p>
                  <p className="mt-1.5 text-muted">{item.body}</p>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}

function HowToBuy() {
  const cream = useCoin().tone === "cream";
  const steps = [
    "grab a solana wallet you actually control.",
    "open pump.fun — not a lookalike, not a dm.",
    "paste the ca from this page. only this page.",
    "swap a little sol. first buy is small and public.",
  ];
  return (
    <section id="how" className={cream ? "bg-surface text-ink" : "bg-paper text-ink"}>
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
        <h2 className="font-display text-4xl uppercase tracking-tight sm:text-5xl">how to buy</h2>
        <p className="mt-3 max-w-lg text-lg text-muted">
          four steps. if a stranger skips the ca on this page, leave.
        </p>
        <ol className="mt-10 grid gap-4 sm:grid-cols-2">
          {steps.map((step, i) => (
            <li key={step} className="rounded-xl bg-surface p-5 shadow-card sm:p-6">
              <p className="font-display text-sm uppercase text-red">0{i + 1}</p>
              <p className="mt-2 text-lg leading-snug">{step}</p>
            </li>
          ))}
        </ol>
        <div className="mt-10">
          <CaPanel />
        </div>
      </div>
    </section>
  );
}

function Faq() {
  const coin = useCoin();
  return (
    <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
      <h2 className="font-display text-4xl uppercase tracking-tight sm:text-5xl">questions</h2>
      <div className="mt-8 divide-y divide-current/10 rounded-xl bg-current/5">
        {coin.faq.map((item) => (
          <details key={item.q} className="group px-5 py-2 sm:px-6">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-4 font-display text-base uppercase tracking-tight">
              {item.q}
              <ChevronDown className="size-5 shrink-0 text-muted transition-transform duration-150 group-open:rotate-180" />
            </summary>
            <p className="pb-4 text-muted">{item.a}</p>
          </details>
        ))}
      </div>
    </section>
  );
}

export function Landing() {
  const coin = useCoin();
  const loud = coin.tone === "loud";
  const cream = coin.tone === "cream";
  return (
    <div id="top">
      <SiteHeader />
      <main>
        <Hero />
        <TickerTape />
        <Lore />
        <HowToBuy />
        <Faq />
        <section className="px-4 pb-16 sm:px-6">
          <div
            className={
              loud
                ? "mx-auto max-w-6xl rounded-xl bg-ink px-6 py-12 text-center text-gold sm:px-10"
                : cream
                  ? "mx-auto max-w-6xl rounded-xl bg-gold px-6 py-12 text-center text-paper sm:px-10"
                  : "mx-auto max-w-6xl rounded-xl bg-gold px-6 py-12 text-center text-ink sm:px-10"
            }
          >
            <Wordmark size="md" inverse />
            <p className="mx-auto mt-4 max-w-md text-lg">{coin.close}</p>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
