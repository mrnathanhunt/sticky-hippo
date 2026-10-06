export type CoinId = "hippo";

export type Pillar = { title: string; body: string };
export type FaqItem = { q: string; a: string };

export type Coin = {
  id: CoinId;
  name: string;
  ticker: string;
  path: "/";
  deskPath: "/desk";
  tagline: string;
  headline: string;
  blurb: string;
  disclaimer: string;
  tone: "dark" | "loud" | "cream";
  kit: string;
  kitAlt: string;
  heroVideo?: string;
  heroPoster?: string;
  heroStill?: string;
  second: string;
  secondAlt: string;
  loreTitle: string;
  loreBody: string;
  close: string;
  action: string;
  mint: string;
  xUrl: string;
  telegramUrl: string;
  tickerBits: string[];
  pillars: Pillar[];
  faq: FaqItem[];
  legal: string[];
  pumpDescription: string;
  pumpImage: string;
  xName: string;
  imageIcon: string;
  imageBanner: string;
  cloneNeedles: string[];
  searchQueries: string[];
};

export const COINS: Record<CoinId, Coin> = {
  hippo: {
    id: "hippo",
    name: "Sticky Hippo",
    ticker: "HIPPO",
    path: "/",
    deskPath: "/desk",
    tagline: "the hippo that sticks.",
    headline: "the hippo that sticks",
    blurb:
      "once it attaches, it doesn’t let go. unofficial solana meme. no 100x pitch. no fake utility. just a cocky blue hippo that knows it.",
    disclaimer:
      "$HIPPO is an unofficial solana meme. not a product, not the sticker shop, not financial advice. it can go to zero. “sticky hippo” is a registered canadian trademark (TMA1329602) for stickers/printing. stickyhippo.net is an existing shop. launching a coin under this name may get a c&d.",
    tone: "cream",
    kit: "/hippo-coin.jpg",
    kitAlt: "bright blue hippo stuck to glass, $hippo across the bottom",
    heroStill: "/hippo-coin.jpg",
    second: "/hippo-stuck.jpg",
    secondAlt: "blue hippo stuck to glass, cream background",
    loreTitle: "once it attaches",
    loreBody:
      "it doesn’t let go. suction jokes welcome. 100x promises are not. this is a meme, not a protocol.",
    close: "if it isn’t this mint, it isn’t this hippo.",
    action: "unstick",
    mint: "",
    xUrl: "",
    telegramUrl: "",
    tickerBits: [
      "$HIPPO",
      "the hippo that sticks",
      "once it attaches",
      "it doesn’t let go",
      "unofficial",
      "verify the ca",
      "same name + different mint = fake",
      "stickyhippo.com",
    ],
    pillars: [
      {
        title: "it sticks",
        body: "the joke is suction. the hippo attaches. that’s the whole bit. no roadmap theater.",
      },
      {
        title: "no fake utility",
        body: "no staking. no game. no 100x pitch. if someone dms you a different story, leave.",
      },
      {
        title: "verify",
        body: "the real mint lives on this page. same name + different mint = fake. never from a dm.",
      },
    ],
    faq: [
      {
        q: "is this the sticker shop?",
        a: "no. stickyhippo.net / etsy stickyhippoCA is a real sticker shop. this is an unofficial solana meme. not affiliated.",
      },
      {
        q: "is the name taken?",
        a: "yes as a canadian trademark (TMA1329602) for stickers/printing. launching a coin under this name may get a cease and desist. we say that here so nobody is surprised.",
      },
      {
        q: "is there utility?",
        a: "no. if someone pitches a game, staking, or a merch empire as “the utility,” they’re making it up.",
      },
      {
        q: "how do i not buy a fake?",
        a: "copy the contract from this page. same name + different mint = fake. never from a dm.",
      },
      {
        q: "will this 100x?",
        a: "we will not promise that. meme coins can go to zero. don’t buy more than you’re willing to lose.",
      },
    ],
    legal: [
      "stickyhippo.net is an existing sticker shop (etsy stickyhippoCA).",
      "“sticky hippo” is a registered canadian trademark (TMA1329602) for stickers/printing.",
      "launching a coin under this name may get a cease and desist. this coin is unofficial and is not that shop.",
      "do not claim they stole the logo without side-by-side proof. the hippo file here is original generated art (not their product photos).",
      "do not harass the shop. a lawyer / dmca is the path only if the exact image was copied.",
      "this desk will not help with volume bots, bundlers, fake holders, rugs, or impersonation.",
    ],
    pumpDescription:
      "the hippo that sticks. once it attaches, it doesn’t let go. unofficial solana meme. stickyhippo.com. verify the ca. same name + different mint = fake.",
    pumpImage:
      "square hippo-coin.jpg: blue waving hippo, cream, $hippo across the bottom. that is the token image.",
    xName: "sticky hippo",
    imageIcon:
      "Square 1:1 token icon already on this site (hippo-coin.jpg). Blue 3D hippo, $hippo across the bottom, cream background.",
    imageBanner:
      "X profile banner 1500x500. Cream studio. Blue hippo on the right, waving. Keep ALL text out of the bottom-left 420x180px. Optional wordmark on the left: “sticky” in blue, “hippo.com” in lime green.",
    cloneNeedles: ["sticky hippo", "stickyhippo", "hippo"],
    searchQueries: ["Sticky Hippo", "HIPPO"],
  },
};

export const COIN_LIST: Coin[] = [COINS.hippo];

export function isCoinId(value: string): value is CoinId {
  return value === "hippo";
}
