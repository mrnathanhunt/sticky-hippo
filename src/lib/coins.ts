export type CoinId = "alig" | "booya" | "hippo";

export type Pillar = { title: string; body: string };
export type FaqItem = { q: string; a: string };

export type Coin = {
  id: CoinId;
  name: string;
  ticker: string;
  path: "/" | "/alig" | "/booya";
  deskPath: "/desk" | "/alig/desk" | "/booya/desk";
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

const FILM = "Ali G: Who Iz I?";
const FILM_DATE = "23 oct 2026";
const UNOFFICIAL =
  "unofficial solana meme. not the film. not affiliated with sacha baron cohen, four by two, or amazon mgm.";
const VERIFY = "verify the ca. same name + different mint = fake.";

export const COINS: Record<CoinId, Coin> = {
  alig: {
    id: "alig",
    name: "Ali G",
    ticker: "ALIG",
    path: "/alig",
    deskPath: "/alig/desk",
    tagline: "who iz i?",
    headline: "who iz i?",
    blurb: `${UNOFFICIAL} the film is ${FILM_DATE}. we are not that. no 100x pitch. just a tracksuit and a joke.`,
    disclaimer:
      "$ALIG is an unofficial solana meme. not a product, not the film, not financial advice. it can go to zero. not affiliated with sacha baron cohen, four by two films, amazon mgm studios, or ali g: who iz i?",
    tone: "dark",
    kit: "/portrait-sq.jpg",
    kitAlt: "unofficial stylized mascot. yellow tracksuit, red beanie, sunglasses. not a film still.",
    heroStill: "/portrait.jpg",
    second: "/portrait.jpg",
    secondAlt: "unofficial stylized mascot, wide. not a film still.",
    loreTitle: "unofficial",
    loreBody:
      "stylized mascot. not a film still, not a photo of him, not the studio. using a character look can still get a c&d — this coin is not affiliated.",
    close: "who iz i? if it isn’t this mint, it isn’t this joke.",
    action: "respect",
    mint: "",
    xUrl: "",
    telegramUrl: "",
    tickerBits: [
      "$ALIG",
      "who iz i?",
      "unofficial",
      "not the film",
      "verify the ca",
      "same name + different mint = fake",
      "booyakasha",
    ],
    pillars: [
      {
        title: "not the film",
        body: `${FILM.toLowerCase()} lands ${FILM_DATE}. this coin is a joke next to the news. not a premiere. not a studio drop.`,
      },
      {
        title: "no fake utility",
        body: "no roadmap theater. no 100x pitch. no “we spoke to him.” a meme. respect that.",
      },
      {
        title: "verify",
        body: "the real mint lives on this page. clones will use the name around october. they won’t use this ca.",
      },
    ],
    faq: [
      {
        q: "is this the movie?",
        a: `no. ${FILM} is a real film from amazon mgm, ${FILM_DATE}. this is an unofficial solana meme. not affiliated.`,
      },
      {
        q: "did he approve this?",
        a: "no. we don’t speak for sacha baron cohen, four by two, or the studio. if someone says otherwise, they’re lying.",
      },
      {
        q: "is there utility?",
        a: "no. if someone pitches staking, a game, or tickets to the premiere, they’re making it up.",
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
      "ali g is a character created and performed by sacha baron cohen (four by two films).",
      `${FILM.toLowerCase()} is scheduled ${FILM_DATE} from amazon mgm studios. using this name around a theatrical release can get a cease and desist fast.`,
      "this coin is not affiliated, not official, and does not fund the film. say that everywhere.",
      "do not use official posters, trailers, or photos of him. a stylized character portrait is still a likeness and can get a c&d.",
      "do not impersonate official film or baron cohen accounts.",
      "this desk will not help with volume bots, bundlers, fake holders, rugs, or impersonation.",
    ],
    pumpDescription: `Ali G. Who Iz I? ${UNOFFICIAL} ${VERIFY}`,
    pumpImage:
      "use the square unofficial mascot (portrait-sq). not a film still. not a photo of him. say unofficial on the page.",
    xName: "ali g",
    imageIcon:
      "Square unofficial mascot already on this site (portrait-sq.jpg). Do not use official posters, trailers, or photos of sacha baron cohen.",
    imageBanner:
      "X profile banner 1500x500. Off-white plaster wall. Yellow tracksuit jacket on a hanger, red beanie, black sunglasses. Keep ALL text out of the bottom-left 420x180px. Optional wordmark far right: “ali” in yellow, “g” in red, on black. No face. No film stills.",
    cloneNeedles: ["ali g", "alig", "who iz i"],
    searchQueries: ["Ali G", "ALIG"],
  },
  booya: {
    id: "booya",
    name: "Booyakasha",
    ticker: "BOOYA",
    path: "/booya",
    deskPath: "/booya/desk",
    tagline: "the shout.",
    headline: "booyakasha",
    blurb: `the yell, not the film. ${UNOFFICIAL} a boombox and a punchline. no 100x pitch.`,
    disclaimer:
      "$BOOYA is an unofficial solana meme. not a product, not the film, not financial advice. it can go to zero. not affiliated with sacha baron cohen, four by two films, amazon mgm studios, or ali g: who iz i?",
    tone: "loud",
    kit: "/boom.jpg",
    kitAlt: "gold boombox with a yellow sound burst. no face.",
    heroVideo: "/pixar-boom.mp4",
    heroPoster: "/pixar-boom.jpg",
    second: "/burst.jpg",
    secondAlt: "yellow comic burst and gold boombox, cassette tapes",
    loreTitle: "the shout",
    loreBody:
      "booyakasha is the noise. not a portrait. not a trailer. if it needs his face, it isn’t this coin.",
    close: "booyakasha. if it isn’t this mint, it isn’t this shout.",
    action: "booyakasha",
    mint: "",
    xUrl: "",
    telegramUrl: "",
    tickerBits: [
      "$BOOYA",
      "booyakasha",
      "the shout",
      "unofficial",
      "not the film",
      "verify the ca",
      "same name + different mint = fake",
    ],
    pillars: [
      {
        title: "not the film",
        body: `${FILM.toLowerCase()} is ${FILM_DATE}. this is a catchphrase meme. not the studio. not a soundtrack drop.`,
      },
      {
        title: "sister coin",
        body: "$ALIG is the tracksuit. $BOOYA is the shout. two jokes. two mints. don’t mix the cas.",
      },
      {
        title: "verify",
        body: "clones will yell the word with a different mint. only this page has the real one.",
      },
    ],
    faq: [
      {
        q: "is this ali g?",
        a: "same universe, different coin. $ALIG is the tracksuit. $BOOYA is the shout. two cas.",
      },
      {
        q: "is this the movie?",
        a: `no. ${FILM} is ${FILM_DATE}. this is an unofficial meme using a catchphrase. not affiliated.`,
      },
      {
        q: "is there utility?",
        a: "no. if someone pitches a speaker drop or premiere tickets, they’re making it up.",
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
      "booyakasha is a catchphrase from the ali g character created by sacha baron cohen.",
      `${FILM.toLowerCase()} is scheduled ${FILM_DATE}. launching a coin on a catchphrase around that date can still get a c&d.`,
      "this coin is not affiliated, not official, and does not fund the film. say that everywhere.",
      "do not use official posters, trailers, or photos of him. boombox / burst still life only.",
      "do not impersonate official film or baron cohen accounts.",
      "this desk will not help with volume bots, bundlers, fake holders, rugs, or impersonation.",
    ],
    pumpDescription: `booyakasha. the shout. ${UNOFFICIAL} ${VERIFY}`,
    pumpImage:
      "square still life: gold boombox, yellow comic burst, black background. no face. no film stills.",
    xName: "booyakasha",
    imageIcon:
      "Square 1:1 token icon. Gold-and-black 1980s boombox with a yellow comic sound burst, matte black background, NO person, NO face, no text, no logos.",
    imageBanner:
      "X profile banner 1500x500. Yellow comic burst and gold boombox on black. Keep ALL text out of the bottom-left 420x180px. Optional wordmark far right: BOOYAKASHA in black on yellow. No face. No film stills.",
    cloneNeedles: ["booya", "booyakasha"],
    searchQueries: ["Booyakasha", "BOOYA"],
  },
  hippo: {
    id: "hippo",
    name: "Sticky Hippo",
    ticker: "HIPPO",
    path: "/",
    deskPath: "/desk",
    tagline: "the hippo that sticks.",
    headline: "the hippo that sticks",
    blurb: "once it attaches, it doesn’t let go. unofficial solana meme. no 100x pitch. no fake utility. just a cocky blue hippo that knows it.",
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

export const COIN_LIST: Coin[] = [COINS.alig, COINS.booya];

export function isCoinId(value: string): value is CoinId {
  return value === "alig" || value === "booya" || value === "hippo";
}
