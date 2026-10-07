import { Link } from "@tanstack/react-router";
import { Wordmark } from "@/components/wordmark";
import { useCoin } from "@/lib/coin";
import { useLiveToken } from "@/lib/token-store";
import { cn } from "@/lib/utils";

export function SiteFooter() {
  const coin = useCoin();
  const live = useLiveToken();
  const loud = coin.tone === "loud";
  const cream = coin.tone === "cream";
  return (
    <footer className={cn("border-t", loud || cream ? "border-ink/10" : "border-paper/10")}>
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-10 sm:px-6">
        <Wordmark size="sm" />
        <p className="max-w-xl text-sm leading-relaxed text-muted">{coin.disclaimer}</p>
        <p className="text-sm text-muted">
          verify the ca on this page. same name + different mint = fake.
        </p>
        <div className="flex flex-wrap gap-x-4 gap-y-2 text-sm text-muted">
          {live.xUrl ? (
            <a href={live.xUrl} target="_blank" rel="noreferrer" className="hover:text-gold">
              x
            </a>
          ) : null}
          {coin.telegramChannelUrl ? (
            <a
              href={coin.telegramChannelUrl}
              target="_blank"
              rel="noreferrer"
              className="hover:text-gold"
            >
              telegram channel
            </a>
          ) : null}
          {live.telegramUrl ? (
            <a href={live.telegramUrl} target="_blank" rel="noreferrer" className="hover:text-gold">
              {coin.telegramChannelUrl ? "telegram chat" : "telegram"}
            </a>
          ) : null}
          {coin.id === "hippo" ? (
            <a href="https://stickyhippo.com" className="hover:text-gold">
              stickyhippo.com
            </a>
          ) : null}
          <Link to={coin.deskPath} className="hover:text-gold">
            launch desk
          </Link>
        </div>
      </div>
    </footer>
  );
}
