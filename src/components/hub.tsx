import { Link } from "@tanstack/react-router";
import { Wordmark } from "@/components/wordmark";
import { COINS } from "@/lib/coins";

export function Hub() {
  return (
    <div className="min-h-dvh bg-ink text-paper">
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-16">
        <p className="font-display text-xs uppercase tracking-widest text-muted">
          two unofficial memes · not the film
        </p>
        <Wordmark coinId="alig" size="lg" className="mt-4 block" />
        <h1 className="mt-3 font-display text-4xl uppercase leading-[0.9] tracking-tight sm:text-6xl">
          who iz i?
        </h1>
        <p className="mt-5 max-w-lg text-lg text-muted">
          $ALIG is the tracksuit. $BOOYA is the shout. two coins, two mints.
        </p>
        <div className="mt-12 grid gap-5 lg:grid-cols-2">
          <Link
            to="/alig"
            className="group overflow-hidden rounded-xl bg-ink outline outline-1 -outline-offset-1 outline-paper/15"
          >
            <img
              src={COINS.alig.kit}
              alt={COINS.alig.kitAlt}
              width={1408}
              height={1408}
              className="aspect-square w-full object-cover"
            />
            <div className="p-6">
              <Wordmark coinId="alig" size="md" />
              <p className="mt-3 text-muted">{COINS.alig.tagline} unofficial. not the film.</p>
              <p className="mt-4 font-display text-sm uppercase text-gold group-hover:underline">
                open $ALIG
              </p>
            </div>
          </Link>
          <Link
            to="/booya"
            className="group overflow-hidden rounded-xl bg-gold text-ink"
          >
            <img
              src={COINS.booya.kit}
              alt={COINS.booya.kitAlt}
              width={1408}
              height={1408}
              className="aspect-square w-full object-cover"
            />
            <div className="p-6">
              <Wordmark coinId="booya" size="md" />
              <p className="mt-3 text-muted">{COINS.booya.tagline} unofficial. not the film.</p>
              <p className="mt-4 font-display text-sm uppercase group-hover:underline">
                open $BOOYA
              </p>
            </div>
          </Link>
        </div>
        <p className="mt-10 max-w-xl text-sm text-muted">
          neither is affiliated with sacha baron cohen, four by two, or amazon
          mgm. ali g: who iz i? is 23 oct 2026. this is not that. verify each
          ca. same name + different mint = fake.
        </p>
      </div>
    </div>
  );
}
