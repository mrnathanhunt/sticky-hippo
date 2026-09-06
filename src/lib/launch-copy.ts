import type { Coin } from "@/lib/coins";
import { handleFromUrl, pumpUrl, shortMint, solscanUrl } from "@/lib/token";

export type CopyCtx = {
  mint: string;
  xUrl: string;
  telegramUrl: string;
};

const PLACEHOLDER = "PASTE_CA_HERE";
const VERIFY = "verify the ca. same name + different mint = fake.";

function ca(ctx: CopyCtx) {
  return ctx.mint || PLACEHOLDER;
}

function pump(ctx: CopyCtx) {
  return pumpUrl(ctx.mint);
}

function scan(ctx: CopyCtx) {
  return solscanUrl(ctx.mint) || "https://solscan.io";
}

function tgHandle(ctx: CopyCtx) {
  const h = handleFromUrl(ctx.telegramUrl);
  return h ? `t.me/${h}` : "";
}

export function pumpFields(coin: Coin, ctx: CopyCtx) {
  return {
    name: coin.name,
    ticker: coin.ticker,
    description: coin.pumpDescription,
    website: ctx.xUrl || "(add after you make the x)",
    twitter: ctx.xUrl || "(add after you make the x)",
    telegram: ctx.telegramUrl || "(add after you make the group)",
    image: coin.pumpImage,
    firstBuy: "small and public. no stealth bundle.",
  };
}

export function xBio(coin: Coin, ctx: CopyCtx) {
  const tg = tgHandle(ctx);
  const extra =
    coin.id === "hippo" ? " not the sticker shop." : " not the film.";
  return `${coin.tagline} unofficial $${coin.ticker} meme.${extra}${tg ? ` ${tg}.` : ""} verify ca · same name + different mint = fake`;
}

export function xPin(coin: Coin, ctx: CopyCtx) {
  return `official $${coin.ticker} ca (unofficial coin)

${ca(ctx)}

pump: ${pump(ctx)}
${ctx.mint ? `solscan: ${scan(ctx)}` : ""}
${ctx.telegramUrl ? `tg: ${ctx.telegramUrl}` : ""}

${VERIFY}
${coin.id === "hippo" ? "not the sticker shop. not affiliated." : "not the movie. not affiliated."}`.replace(/\n{3,}/g, "\n\n");
}

export function xLaunchPost(coin: Coin, ctx: CopyCtx) {
  return `${coin.tagline}

$${coin.ticker} is live.

the only real ca:
${ca(ctx)}

${VERIFY}

unofficial meme. not affiliated.`;
}

export function xThread(coin: Coin, ctx: CopyCtx) {
  if (coin.id === "hippo") {
    return [
      `1/ ${coin.tagline}

$${coin.ticker}
unofficial solana meme.`,
      `2/ stickyhippo.net is a sticker shop. “sticky hippo” is a canadian trademark (TMA1329602) for stickers/printing.

this coin is not that shop. unofficial. a c&d is possible. we say that up front.`,
      `3/ this is a meme. not a product. not a protocol. no fake utility. no 100x promises.`,
      `4/ how to not get mugged
• wallet you control
• pump.fun — not a lookalike, not a dm
• paste the ca from this site
• swap a little sol

first buy is small and public.`,
      `5/ the only real ca

${ca(ctx)}

pump: ${pump(ctx)}
site: stickyhippo.com

${VERIFY}`,
      `6/ clones will use the name. they won’t use this mint.

if a stranger sends a different ca, leave.`,
      `7/ not financial advice. meme coins can go to zero.

don’t buy more than you’re willing to lose.`,
    ];
  }
  return [
    `1/ ${coin.tagline}

$${coin.ticker}
unofficial solana meme.`,
    `2/ there is a film. Ali G: Who Iz I? 23 oct 2026. amazon mgm.

this coin is not that film. we don’t speak for him. we don’t speak for the studio.`,
    `3/ this is a meme. not a product. not a protocol. no fake utility. no 100x promises.`,
    `4/ how to not get mugged
• wallet you control
• pump.fun — not a lookalike, not a dm
• paste the ca from this site
• swap a little sol

first buy is small and public.`,
    `5/ the only real ca

${ca(ctx)}

pump: ${pump(ctx)}

${VERIFY}`,
    `6/ clones will use the name. they won’t use this mint.

if a stranger sends a different ca, leave.`,
    `7/ not financial advice. meme coins can go to zero.

don’t buy more than you’re willing to lose.`,
  ];
}

export function xMovieReply() {
  return `nah. Ali G: Who Iz I? is the film (23 oct 2026). this is an unofficial meme coin. not affiliated. we don’t have the poster, the trailer, or his blessing.`;
}

export function xShopReply() {
  return `nah. stickyhippo.net is a sticker shop. this is an unofficial solana meme. not affiliated. trademark TMA1329602 is theirs for stickers/printing.`;
}

export function xCloneReply(ctx: CopyCtx) {
  return `that mint isn’t this one. ca:

${ca(ctx)}

same name + different mint = fake.`;
}

export function tgDescription(coin: Coin, ctx: CopyCtx) {
  const note = coin.id === "hippo" ? "not the sticker shop." : "not the film.";
  return `${coin.tagline} $${coin.ticker} unofficial meme. ${note} ca pinned.${ctx.mint ? ` · ${shortMint(ctx.mint)}` : ""}`;
}

export function tgWelcome(coin: Coin, ctx: CopyCtx) {
  return `you made it.

this is $${coin.ticker} — unofficial. ${coin.id === "hippo" ? "not the sticker shop." : "not the movie."}

the only ca is pinned. if someone dms you a different one, they’re a clone.

pump: ${pump(ctx)}
${ctx.xUrl ? `x: ${ctx.xUrl}` : ""}

rules are pinned. keep it a joke, not a mug.`.replace(/\n{3,}/g, "\n\n");
}

export function tgRules(coin: Coin) {
  if (coin.id === "hippo") {
    return `house rules.

1. the pinned ca is the only ca. same name + different mint = fake.
2. no dms with “alpha”, fake pump links, or impersonation.
3. no pretending this is the sticker shop or the canadian trademark owner.
4. no 100x promises. it’s a meme. it can go to zero.
5. no volume-bot / bundler / fake-holder talk.
6. mods will remove you for scams.
7. not financial advice.
8. don’t harass stickyhippo.net.`;
  }
  return `house rules.

1. the pinned ca is the only ca. same name + different mint = fake.
2. no dms with “alpha”, fake pump links, or impersonation.
3. no pretending this is the film, the studio, or sacha baron cohen.
4. no official posters, stills, or trailers. ${coin.id === "alig" ? "costume jokes only." : "boombox jokes only."}
5. no 100x promises. it’s a meme. it can go to zero.
6. no volume-bot / bundler / fake-holder talk.
7. mods will remove you for scams.
8. not financial advice.
9. $ALIG and $BOOYA are sister coins with different mints. don’t mix them.`;
}

export function tgCaPin(coin: Coin, ctx: CopyCtx) {
  return `official $${coin.ticker} ca (unofficial coin)

${ca(ctx)}

pump: ${pump(ctx)}
solscan: ${ctx.mint ? scan(ctx) : "(after mint)"}

verify this mint. same name + different mint = fake.
${coin.id === "hippo" ? "not the sticker shop." : "not the film."}`;
}

export type CheckItem = {
  id: string;
  group: "legal" | "before" | "mint" | "after";
  label: string;
};

export function checklistFor(coin: Coin): CheckItem[] {
  const legal: CheckItem[] =
    coin.id === "hippo"
      ? [
          {
            id: "legal-read",
            group: "legal",
            label:
              "read the name note. sticky hippo is a canadian trademark (TMA1329602). stickyhippo.net is a sticker shop. c&d risk is real.",
          },
          {
            id: "legal-unofficial",
            group: "legal",
            label: "every bio, pin, and the site say unofficial / not the sticker shop.",
          },
          {
            id: "legal-no-claim",
            group: "legal",
            label: "do not claim the shop stole the logo without side-by-side proof.",
          },
          {
            id: "legal-no-harass",
            group: "legal",
            label: "do not harass the shop. lawyer/dmca only if the exact image was copied.",
          },
        ]
      : [
          {
            id: "legal-read",
            group: "legal",
            label:
              "read the name/likeness note. a theatrical ali g film is 23 oct 2026. c&d risk is high.",
          },
          {
            id: "legal-unofficial",
            group: "legal",
            label: "every bio, pin, and the site say unofficial / not the film / not affiliated.",
          },
          {
            id: "legal-no-face",
            group: "legal",
            label: "no photos of sacha baron cohen. no official posters, stills, or trailers.",
          },
          {
            id: "legal-no-impersonate",
            group: "legal",
            label: "do not impersonate official film or baron cohen accounts.",
          },
        ];

  return [
    ...legal,
    {
      id: "icon",
      group: "before",
      label: `token icon: ${coin.pumpImage}`,
    },
    {
      id: "banner",
      group: "before",
      label: "x banner 1500×500. text off the bottom-left overlay.",
    },
    {
      id: "x-profile",
      group: "before",
      label: "x profile live. paste the x url in this desk.",
    },
    {
      id: "tg",
      group: "before",
      label: "telegram created. paste welcome, rules, placeholder ca pin.",
    },
    {
      id: "pump-fields",
      group: "before",
      label: `pump.fun fields: ${coin.name} / ${coin.ticker} / unofficial description.`,
    },
    {
      id: "wallet",
      group: "before",
      label: "first-buy wallet funded. small and public.",
    },
    {
      id: "no-bots",
      group: "before",
      label: "no volume bots, bundlers, fake holders, or impersonation.",
    },
    {
      id: "create",
      group: "mint",
      label: "create on pump.fun with the exact name, ticker, description, and icon.",
    },
    {
      id: "first-buy",
      group: "mint",
      label: "first buy: small and public. no stealth.",
    },
    {
      id: "paste-ca",
      group: "mint",
      label: "paste the mint here. confirm name + ticker. stick it as official.",
    },
    {
      id: "x-pin",
      group: "after",
      label: "pin the ca on x. tweet launch + thread. say unofficial.",
    },
    {
      id: "tg-pin",
      group: "after",
      label: "pin ca + rules + welcome in telegram.",
    },
    {
      id: "clones",
      group: "after",
      label: "watch clones. same name + different mint = fake.",
    },
  ];
}

export const CHECK_GROUPS: { id: CheckItem["group"]; title: string }[] = [
  { id: "legal", title: "legal first" },
  { id: "before", title: "before mint" },
  { id: "mint", title: "mint day" },
  { id: "after", title: "after it is live" },
];
