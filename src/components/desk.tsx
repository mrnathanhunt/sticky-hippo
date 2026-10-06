import { useEffect, useMemo, useState, type ReactNode } from "react";
import { toast } from "sonner";
import { AlertTriangle, Ban, Check, LoaderCircle, ShieldCheck } from "lucide-react";
import { CopyBlock } from "@/components/copy-block";
import { CopyButton } from "@/components/copy-button";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { analyzeMint, type MintReport } from "@/lib/analyze-mint";
import { useChecklist } from "@/lib/checklist-store";
import { useCoin } from "@/lib/coin";
import {
  CHECK_GROUPS,
  checklistFor,
  pumpFields,
  tgCaPin,
  tgDescription,
  tgRules,
  tgWelcome,
  xBio,
  xCloneReply,
  xLaunchPost,
  xShopReply,
  xPin,
  xThread,
} from "@/lib/launch-copy";
import { isSolanaMint, pumpUrl, shortMint, solscanUrl } from "@/lib/token";
import { useLiveToken, useTokenStore } from "@/lib/token-store";
import { cn } from "@/lib/utils";

const NAV = [
  { href: "#now", label: "ca" },
  { href: "#checklist", label: "checklist" },
  { href: "#pump", label: "pump.fun" },
  { href: "#x", label: "x" },
  { href: "#telegram", label: "telegram" },
  { href: "#images", label: "images" },
  { href: "#legal", label: "legal" },
] as const;

function usd(n?: number) {
  if (n == null) return "—";
  if (n >= 10_000) {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      notation: "compact",
      maximumFractionDigits: 1,
    }).format(n);
  }
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: n >= 100 ? 0 : n >= 1 ? 2 : 6,
  }).format(n);
}

function compact(n?: number) {
  if (n == null) return "—";
  return new Intl.NumberFormat("en-US", {
    notation: "compact",
    maximumFractionDigits: 1,
  }).format(n);
}

function normalizeX(value: string) {
  const v = value.trim();
  if (!v) return "";
  if (v.startsWith("http")) return v;
  return `https://x.com/${v.replace(/^@/, "")}`;
}

function normalizeTg(value: string) {
  const v = value.trim();
  if (!v) return "";
  if (v.startsWith("http")) return v;
  return `https://t.me/${v.replace(/^@/, "").replace(/^t\.me\//, "")}`;
}

function Section({
  id,
  title,
  lede,
  children,
}: {
  id: string;
  title: string;
  lede: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-40">
      <h2 className="font-display text-3xl uppercase tracking-tight sm:text-4xl">{title}</h2>
      <p className="mt-2 max-w-xl text-muted">{lede}</p>
      <div className="mt-6 grid gap-4">{children}</div>
    </section>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg bg-paper p-3">
      <p className="text-xs font-semibold uppercase tracking-widest text-muted">{label}</p>
      <p className="mt-1 font-display text-lg uppercase tracking-tight text-ink">{value}</p>
    </div>
  );
}

function CaDesk() {
  const coin = useCoin();
  const live = useLiveToken();
  const setMint = useTokenStore((s) => s.setMint);
  const setXUrl = useTokenStore((s) => s.setXUrl);
  const setTelegramUrl = useTokenStore((s) => s.setTelegramUrl);
  const [draft, setDraft] = useState(live.mint);
  const [xDraft, setXDraft] = useState(live.xUrl);
  const [tgDraft, setTgDraft] = useState(live.telegramUrl);
  const [report, setReport] = useState<MintReport | null>(null);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (!live.hydrated) return;
    setDraft((d) => d || live.mint);
    setXDraft((d) => d || live.xUrl);
    setTgDraft((d) => d || live.telegramUrl);
  }, [live.hydrated, live.mint, live.xUrl, live.telegramUrl]);

  async function runCheck(mint = draft.trim()) {
    if (!isSolanaMint(mint)) {
      toast("that doesn’t look like a solana mint.");
      return;
    }
    setBusy(true);
    try {
      const next = await analyzeMint({ data: { mint, coinId: coin.id } });
      setReport(next);
      toast(next.found ? "got the chart. look before you stick it." : "nothing on this mint.");
    } catch (err) {
      toast("lookup failed.", {
        description: err instanceof Error ? err.message : "try again",
      });
    } finally {
      setBusy(false);
    }
  }

  function stickOfficial() {
    const mint = (report?.mint || draft).trim();
    if (!isSolanaMint(mint)) {
      toast("paste a real mint first.");
      return;
    }
    setMint(coin.id, mint);
    setDraft(mint);
    setXUrl(coin.id, normalizeX(xDraft));
    setTelegramUrl(coin.id, normalizeTg(tgDraft));
    toast("stuck. site, pins, and copy now use this ca.");
  }

  const nameMismatch =
    report &&
    report.found &&
    ((report.name && report.name.toLowerCase() !== coin.name.toLowerCase()) ||
      (report.symbol && report.symbol.toUpperCase() !== coin.ticker));

  return (
    <div className="grid gap-4">
      <article className="rounded-xl bg-surface p-5 text-ink shadow-card sm:p-6">
        <p className="flex items-center gap-1.5 text-sm text-muted">
          <ShieldCheck className="size-4 text-red" />
          {live.mint ? `official ca ${shortMint(live.mint)}` : "no official ca yet"}
        </p>
        <p className="mt-3 font-display text-2xl uppercase tracking-tight">
          paste a mint. we check it.
        </p>
        <p className="mt-2 max-w-prose text-muted">
          after pump.fun mints, paste the ca here. this desk rewrites every block below. verify the
          ca. same name + different mint = fake.
        </p>
        <label className="mt-5 block text-xs font-semibold uppercase tracking-widest text-muted">
          contract
        </label>
        <div className="mt-2 flex flex-col gap-2 sm:flex-row">
          <Input
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            spellCheck={false}
            autoCapitalize="off"
            autoCorrect="off"
            placeholder="solana mint address"
            className="bg-paper font-mono text-xs text-ink sm:text-sm"
            onKeyDown={(e) => {
              if (e.key === "Enter") void runCheck();
            }}
          />
          <Button type="button" onClick={() => void runCheck()} disabled={busy} className="sm:w-36">
            {busy ? <LoaderCircle className="animate-spin" /> : null}
            {busy ? "checking" : "check"}
          </Button>
        </div>
        <div className="mt-3 flex flex-wrap gap-2">
          <Button type="button" variant="red" onClick={stickOfficial}>
            stick as official ca
          </Button>
          {live.mint ? (
            <Button
              type="button"
              variant="outline"
              className="text-ink shadow-[0_0_0_1px_color-mix(in_oklab,var(--color-ink)_16%,transparent)] hover:bg-paper-deep"
              onClick={() => {
                setMint(coin.id, "");
                setDraft("");
                setReport(null);
                toast("ca cleared on this preview.");
              }}
            >
              clear ca
            </Button>
          ) : null}
        </div>
        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          <div>
            <label className="text-xs font-semibold uppercase tracking-widest text-muted">
              x url
            </label>
            <Input
              className="mt-2 bg-paper text-ink"
              value={xDraft}
              placeholder="https://x.com/handle"
              onChange={(e) => setXDraft(e.target.value)}
              onBlur={() => setXUrl(coin.id, normalizeX(xDraft))}
            />
          </div>
          <div>
            <label className="text-xs font-semibold uppercase tracking-widest text-muted">
              telegram url
            </label>
            <Input
              className="mt-2 bg-paper text-ink"
              value={tgDraft}
              placeholder="https://t.me/handle"
              onChange={(e) => setTgDraft(e.target.value)}
              onBlur={() => setTelegramUrl(coin.id, normalizeTg(tgDraft))}
            />
          </div>
        </div>
      </article>

      {report ? (
        <article className="rounded-xl bg-surface p-5 text-ink shadow-card sm:p-6">
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-md bg-ink px-2 py-1 font-display text-xs uppercase text-gold">
              {report.found ? "lookup" : "no hit"}
            </span>
            {nameMismatch ? (
              <span className="flex items-center gap-1 text-sm text-danger">
                <AlertTriangle className="size-4" />
                name mismatch
              </span>
            ) : null}
          </div>
          <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <Stat label="name" value={(report.name || "—").toLowerCase()} />
            <Stat label="ticker" value={report.symbol ? `$${report.symbol}` : "—"} />
            <Stat label="mcap" value={usd(report.marketCapUsd)} />
            <Stat label="liquidity" value={usd(report.liquidityUsd)} />
            <Stat label="price" value={usd(report.priceUsd)} />
            <Stat label="24h vol" value={usd(report.volume24h)} />
            <Stat
              label="created"
              value={report.createdAt ? new Date(report.createdAt).toLocaleString() : "—"}
            />
            <Stat
              label="dex"
              value={report.dexId || (report.complete === false ? "pump.fun curve" : "—")}
            />
          </div>
          <p className="mt-4 break-all font-mono text-xs text-muted">{report.mint}</p>
          <div className="mt-4 flex flex-wrap gap-2">
            <CopyButton
              value={report.mint}
              label={`copy ${shortMint(report.mint)}`}
              className="text-ink shadow-[0_0_0_1px_color-mix(in_oklab,var(--color-ink)_16%,transparent)] hover:bg-paper-deep"
            />
            {report.mint ? (
              <Button
                variant="outline"
                size="sm"
                asChild
                className="text-ink shadow-[0_0_0_1px_color-mix(in_oklab,var(--color-ink)_16%,transparent)] hover:bg-paper-deep"
              >
                <a href={pumpUrl(report.mint)} target="_blank" rel="noreferrer">
                  pump.fun
                </a>
              </Button>
            ) : null}
            {solscanUrl(report.mint) ? (
              <Button
                variant="outline"
                size="sm"
                asChild
                className="text-ink shadow-[0_0_0_1px_color-mix(in_oklab,var(--color-ink)_16%,transparent)] hover:bg-paper-deep"
              >
                <a href={solscanUrl(report.mint)} target="_blank" rel="noreferrer">
                  solscan
                </a>
              </Button>
            ) : null}
          </div>
          {report.warnings.length ? (
            <ul className="mt-5 grid gap-2">
              {report.warnings.map((w) => (
                <li
                  key={w.text}
                  className={cn(
                    "rounded-lg px-3 py-2 text-sm",
                    w.level === "danger" && "bg-danger/10 text-danger",
                    w.level === "warn" && "bg-paper-deep text-ink",
                    w.level === "info" && "bg-paper text-muted",
                  )}
                >
                  {w.text}
                </li>
              ))}
            </ul>
          ) : null}
          {report.holders.length ? (
            <div className="mt-6">
              <p className="font-display text-sm uppercase">top holders</p>
              <ul className="mt-2 divide-y divide-ink/10">
                {report.holders.map((h) => (
                  <li
                    key={h.address}
                    className="flex flex-wrap items-baseline justify-between gap-2 py-2 font-mono text-xs"
                  >
                    <span className="break-all">
                      {shortMint(h.address)} <span className="font-sans text-muted">{h.tag}</span>
                    </span>
                    <span className="text-muted">
                      {compact(h.amount)}
                      {h.pct != null ? ` · ${h.pct.toFixed(1)}%` : ""}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
        </article>
      ) : null}
    </div>
  );
}

function ChecklistDesk() {
  const coin = useCoin();
  const items = checklistFor(coin);
  const done = useChecklist().done;
  const toggle = useChecklist().toggle;
  const reset = useChecklist().reset;
  const total = items.length;
  const complete = items.filter((i) => done[i.id]).length;

  return (
    <div className="grid gap-4">
      <p className="text-sm text-muted">
        {complete}/{total} done. stays on this device.
      </p>
      {CHECK_GROUPS.map((group) => (
        <div key={group.id} className="rounded-xl bg-surface p-4 text-ink shadow-card sm:p-5">
          <p className="font-display text-sm uppercase">{group.title}</p>
          <ul className="mt-3 grid gap-2">
            {items
              .filter((i) => i.group === group.id)
              .map((item) => {
                const on = Boolean(done[item.id]);
                return (
                  <li key={item.id}>
                    <button
                      type="button"
                      onClick={() => toggle(item.id)}
                      className="flex w-full items-start gap-3 rounded-lg p-2 text-left hover:bg-paper"
                    >
                      <span
                        className={cn(
                          "mt-0.5 grid size-5 shrink-0 place-items-center rounded-sm",
                          on ? "bg-gold text-ink" : "bg-paper text-transparent",
                        )}
                        aria-hidden
                      >
                        <Check className="size-3.5" />
                      </span>
                      <span className={cn("text-sm sm:text-base", on && "text-muted")}>
                        {item.label}
                      </span>
                    </button>
                  </li>
                );
              })}
          </ul>
        </div>
      ))}
      <Button type="button" variant="ghost" className="justify-self-start" onClick={reset}>
        reset checklist
      </Button>
    </div>
  );
}

export function Desk() {
  const coin = useCoin();
  const live = useLiveToken();
  const loud = coin.tone === "loud";
  const cream = coin.tone === "cream";
  const ctx = useMemo(
    () => ({ mint: live.mint, xUrl: live.xUrl, telegramUrl: live.telegramUrl }),
    [live.mint, live.xUrl, live.telegramUrl],
  );
  const pump = pumpFields(coin, ctx);
  const thread = xThread(coin, ctx);

  return (
    <div id="top">
      <SiteHeader />
      <div
        className={
          loud
            ? "sticky top-16 z-30 border-b border-ink/10 bg-gold/92 backdrop-blur-md sm:top-[4.5rem]"
            : cream
              ? "sticky top-16 z-30 border-b border-ink/10 bg-paper/92 backdrop-blur-md sm:top-[4.5rem]"
              : "sticky top-16 z-30 border-b border-paper/10 bg-ink/92 backdrop-blur-md sm:top-[4.5rem]"
        }
      >
        <nav className="mx-auto flex max-w-6xl gap-1 overflow-x-auto px-4 py-2 sm:px-6">
          {NAV.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="shrink-0 rounded-md px-3 py-2 font-display text-xs uppercase text-muted hover:bg-current/8"
            >
              {item.label}
            </a>
          ))}
        </nav>
      </div>
      <main className="mx-auto grid max-w-6xl gap-16 px-4 py-10 sm:px-6 sm:py-14">
        <header>
          <p
            className={
              loud
                ? "mb-4 inline-flex items-center gap-2 rounded-md bg-ink px-2.5 py-1 font-display text-xs uppercase text-gold"
                : cream
                  ? "mb-4 inline-flex items-center gap-2 rounded-md bg-gold px-2.5 py-1 font-display text-xs uppercase text-paper"
                  : "mb-4 inline-flex items-center gap-2 rounded-md bg-gold px-2.5 py-1 font-display text-xs uppercase text-ink"
            }
          >
            founder desk · ${coin.ticker} · not public copy
          </p>
          <h1 className="font-display text-4xl uppercase leading-[0.95] tracking-tight sm:text-6xl">
            launch desk
          </h1>
          <p className="mt-4 max-w-xl text-lg text-muted">
            copy-paste for pump.fun, x, and telegram. paste the mint after it lives — every block
            rewrites. this desk does not log into anything or touch a wallet.
          </p>
        </header>

        <Section id="now" title="the ca" lede="small first buy, public. then paste the mint.">
          <CaDesk />
        </Section>
        <Section id="checklist" title="checklist" lede="legal first. then assets. then mint.">
          <ChecklistDesk />
        </Section>
        <Section
          id="pump"
          title="pump.fun"
          lede="type these exactly. first buy stays small and public."
        >
          <CopyBlock title="name" value={pump.name} />
          <CopyBlock title="ticker" value={pump.ticker} />
          <CopyBlock title="description" value={pump.description} />
          <CopyBlock title="twitter field" value={pump.twitter} />
          <CopyBlock title="telegram field" value={pump.telegram} />
          <CopyBlock title="token image" hint={pump.image} value={pump.image} />
          <CopyBlock title="first buy reminder" value={pump.firstBuy} />
        </Section>
        <Section id="x" title="x" lede="say unofficial. pin the ca. no 100x.">
          <CopyBlock title="display name" value={coin.xName} />
          <CopyBlock title="bio" hint="fits 160." value={xBio(coin, ctx)} />
          <CopyBlock title="pin" value={xPin(coin, ctx)} />
          <CopyBlock title="launch post" value={xLaunchPost(coin, ctx)} />
          {thread.map((post, i) => (
            <CopyBlock key={post} title={`thread ${i + 1}/${thread.length}`} value={post} />
          ))}
          <CopyBlock title="reply: is this the sticker shop?" value={xShopReply()} />
          <CopyBlock title="reply: clone ca" value={xCloneReply(ctx)} />
        </Section>
        <Section id="telegram" title="telegram" lede="three pins: welcome, rules, ca.">
          <CopyBlock title="group description" value={tgDescription(coin, ctx)} />
          <CopyBlock title="pin — welcome" value={tgWelcome(coin, ctx)} />
          <CopyBlock title="pin — rules" value={tgRules(coin)} />
          <CopyBlock title="pin — ca" value={tgCaPin(coin, ctx)} />
        </Section>
        <Section id="images" title="image prompts" lede="original art only. no shop photos.">
          <CopyBlock title="token icon" value={coin.imageIcon} />
          <CopyBlock title="x banner 1500×500" value={coin.imageBanner} />
        </Section>
        <Section
          id="legal"
          title="name / likeness"
          lede="not legal advice. read it before you mint."
        >
          <article className="rounded-xl bg-surface p-5 text-ink shadow-card sm:p-6">
            <p className="flex items-center gap-2 font-display text-sm uppercase">
              <Ban className="size-4 text-danger" />
              this name is someone else’s
            </p>
            <ul className="mt-4 grid gap-3 text-sm leading-relaxed text-muted sm:text-base">
              {coin.legal.map((line) => (
                <li key={line}>{line}</li>
              ))}
            </ul>
          </article>
        </Section>
      </main>
      <SiteFooter />
    </div>
  );
}
