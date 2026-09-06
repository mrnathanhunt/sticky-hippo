import { CopyButton } from "@/components/copy-button";
import { Button } from "@/components/ui/button";
import { useCoin } from "@/lib/coin";
import { isLiveMint, pumpUrl, shortMint, solscanUrl } from "@/lib/token";
import { useLiveToken } from "@/lib/token-store";
import { ExternalLink, ShieldCheck } from "lucide-react";

export function CaPanel() {
  const coin = useCoin();
  const live = useLiveToken();
  const mint = live.mint;
  const on = isLiveMint(mint);
  const pump = pumpUrl(mint);
  const scan = solscanUrl(mint);

  return (
    <section id="ca" className="rounded-xl bg-surface p-5 text-ink shadow-card sm:p-7">
      <div className="flex flex-wrap items-center gap-2">
        <span className="rounded-md bg-ink px-2 py-1 font-display text-xs uppercase text-gold">
          ${coin.ticker.toLowerCase()}
        </span>
        <span className="flex items-center gap-1.5 text-sm text-muted">
          <ShieldCheck className="size-4 text-red" />
          {on ? "verify this mint" : "mint not live yet"}
        </span>
      </div>

      <p className="mt-4 font-display text-xl uppercase tracking-tight sm:text-2xl">
        {on ? "the only real ca" : "the ca lives here first"}
      </p>
      <p className="mt-1 max-w-prose text-muted">
        same name + different mint = fake. never trust a dm. only this page.
      </p>

      <div className="mt-5 rounded-lg bg-paper p-3 sm:p-4">
        <p className="text-xs font-semibold uppercase tracking-widest text-muted">
          contract
        </p>
        {on ? (
          <p className="mt-2 break-all font-mono text-sm text-ink sm:text-base">{mint}</p>
        ) : (
          <p className="mt-2 font-mono text-sm text-muted">
            awaiting mint — first buy will be small and public
          </p>
        )}
        <div className="mt-3 flex flex-wrap gap-2">
          <CopyButton
            value={mint}
            label={on ? `copy ${shortMint(mint)}` : "copy ca"}
            disabled={!on}
            className="text-ink shadow-[0_0_0_1px_color-mix(in_oklab,var(--color-ink)_16%,transparent)] hover:bg-paper-deep"
          />
          {on ? (
            <>
              <Button variant="red" size="sm" asChild>
                <a href={pump} target="_blank" rel="noreferrer">
                  pump.fun
                  <ExternalLink />
                </a>
              </Button>
              {scan ? (
                <Button
                  variant="outline"
                  size="sm"
                  asChild
                  className="text-ink shadow-[0_0_0_1px_color-mix(in_oklab,var(--color-ink)_16%,transparent)] hover:bg-paper-deep"
                >
                  <a href={scan} target="_blank" rel="noreferrer">
                    solscan
                    <ExternalLink />
                  </a>
                </Button>
              ) : null}
            </>
          ) : (
            <Button variant="outline" size="sm" disabled className="text-ink">
              pump.fun soon
            </Button>
          )}
        </div>
      </div>
    </section>
  );
}
