import { Link, useRouterState } from "@tanstack/react-router";
import { Wordmark } from "@/components/wordmark";
import { Button } from "@/components/ui/button";
import { useCoin } from "@/lib/coin";
import { isLiveMint, pumpUrl } from "@/lib/token";
import { useLiveToken } from "@/lib/token-store";
import { cn } from "@/lib/utils";

export function SiteHeader() {
  const coin = useCoin();
  const live = useLiveToken();
  const liveNow = isLiveMint(live.mint);
  const path = useRouterState({ select: (s) => s.location.pathname });
  const onDesk = path.endsWith("/desk");
  const loud = coin.tone === "loud";
  const cream = coin.tone === "cream";

  return (
    <header
      className={cn(
        "sticky top-0 z-40 border-b backdrop-blur-md",
        cream
          ? "border-ink/10 bg-paper/92"
          : loud
            ? "border-ink/10 bg-gold/92"
            : "border-paper/10 bg-ink/92",
      )}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-3 px-4 sm:h-[4.5rem] sm:px-6">
        {coin.id === "hippo" ? (
          <span className="hidden w-10 sm:block" />
        ) : (
          <Link
            to="/whoizi"
            className="hidden min-w-0 font-display text-xs uppercase text-muted sm:inline"
          >
            both
          </Link>
        )}
        <Link to={coin.path} className="min-w-0" aria-label={`${coin.name} home`}>
          <Wordmark size="sm" />
        </Link>
        <nav className="flex items-center gap-1 sm:gap-2">
          <Link
            to={coin.path}
            className={cn(
              "hidden rounded-md px-2.5 py-1.5 font-display text-xs uppercase sm:inline",
              onDesk
                ? "text-muted hover:bg-current/8"
                : loud
                  ? "bg-ink text-gold"
                  : cream
                    ? "bg-gold text-paper"
                    : "bg-gold text-ink",
            )}
          >
            site
          </Link>
          {coin.id === "hippo" ? (
            <Link
              to="/picks"
              className={cn(
                "rounded-md px-2.5 py-1.5 font-display text-xs uppercase",
                path === "/picks"
                  ? "bg-gold text-paper"
                  : "text-muted hover:bg-current/8",
              )}
            >
              picks
            </Link>
          ) : null}
          <Link
            to={coin.deskPath}
            className={cn(
              "rounded-md px-2.5 py-1.5 font-display text-xs uppercase",
              onDesk
                ? loud
                  ? "bg-ink text-gold"
                  : cream
                    ? "bg-gold text-paper"
                    : "bg-gold text-ink"
                : "text-muted hover:bg-current/8",
            )}
          >
            desk
          </Link>
          <span
            className={cn(
              "hidden rounded-md px-2 py-1 font-display text-xs uppercase md:inline",
              loud ? "bg-ink text-gold" : cream ? "bg-ink text-lime" : "bg-red text-paper",
            )}
          >
            ${coin.ticker}
          </span>
          <Button
            asChild
            size="sm"
            variant={loud ? "invert" : "default"}
            className={cream ? "text-paper" : undefined}
          >
            {liveNow ? (
              <a href={pumpUrl(live.mint)} target="_blank" rel="noreferrer">
                buy
              </a>
            ) : onDesk ? (
              <a href="#now">ca</a>
            ) : (
              <a href="#ca">ca</a>
            )}
          </Button>
        </nav>
      </div>
    </header>
  );
}
