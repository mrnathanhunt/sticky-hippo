import { createServerFn } from "@tanstack/react-start";
import { COINS, isCoinId, type CoinId } from "@/lib/coins";
import { isSolanaMint } from "@/lib/token";

export type HolderRow = {
  address: string;
  amount: number;
  pct: number | null;
  tag: "bonding curve" | "lp" | "wallet";
};

export type Warning = {
  level: "danger" | "warn" | "info";
  text: string;
};

export type CloneHit = {
  mint: string;
  name: string;
  symbol: string;
  url?: string;
};

export type MintReport = {
  mint: string;
  found: boolean;
  error?: string;
  name?: string;
  symbol?: string;
  description?: string;
  image?: string;
  website?: string;
  twitter?: string;
  telegram?: string;
  creator?: string;
  createdAt?: string;
  complete?: boolean;
  marketCapUsd?: number;
  liquidityUsd?: number;
  priceUsd?: number;
  volume24h?: number;
  pairUrl?: string;
  dexId?: string;
  supply?: number;
  decimals?: number;
  mintAuthority?: string | null;
  freezeAuthority?: string | null;
  holders: HolderRow[];
  clones: CloneHit[];
  warnings: Warning[];
};

type PumpCoin = {
  mint?: string;
  name?: string;
  symbol?: string;
  description?: string;
  image_uri?: string;
  website?: string;
  twitter?: string;
  telegram?: string;
  creator?: string;
  created_timestamp?: number;
  complete?: boolean;
  usd_market_cap?: number;
  bonding_curve?: string;
  associated_bonding_curve?: string;
};

type DexPair = {
  chainId?: string;
  dexId?: string;
  url?: string;
  pairAddress?: string;
  baseToken?: { address?: string; name?: string; symbol?: string };
  quoteToken?: { address?: string; name?: string; symbol?: string };
  priceUsd?: string;
  fdv?: number;
  marketCap?: number;
  liquidity?: { usd?: number };
  volume?: { h24?: number };
};

async function fetchJson(url: string, init?: RequestInit) {
  const res = await fetch(url, {
    ...init,
    headers: { accept: "application/json", ...(init?.headers ?? {}) },
    signal: AbortSignal.timeout(8000),
  });
  if (!res.ok) throw new Error(`${res.status}`);
  return res.json();
}

async function fetchOk(url: string) {
  try {
    return await fetchJson(url);
  } catch {
    return null;
  }
}

async function solanaRpc(method: string, params: unknown[]) {
  const endpoints = [
    "https://solana-rpc.publicnode.com",
    "https://api.mainnet-beta.solana.com",
  ];
  let lastError: unknown;
  for (const url of endpoints) {
    try {
      const json = await fetchJson(url, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ jsonrpc: "2.0", id: 1, method, params }),
      });
      if (json?.error) throw new Error(json.error.message ?? "rpc error");
      return json.result;
    } catch (err) {
      lastError = err;
    }
  }
  throw lastError instanceof Error ? lastError : new Error("rpc failed");
}

function num(value: unknown): number | undefined {
  if (typeof value === "number" && Number.isFinite(value)) return value;
  if (typeof value === "string" && value && Number.isFinite(Number(value))) {
    return Number(value);
  }
  return undefined;
}

function sameAddr(a?: string, b?: string) {
  return Boolean(a && b && a.toLowerCase() === b.toLowerCase());
}

function buildWarnings(
  report: MintReport,
  pump: PumpCoin | null,
  coinId: CoinId,
): Warning[] {
  const warnings: Warning[] = [];
  const name = (report.name ?? "").trim();
  const symbol = (report.symbol ?? "").trim();
  const coin = COINS[coinId];

  if (!report.found) {
    warnings.push({
      level: "danger",
      text: "nothing found on pump.fun or dexscreener for this mint. do not treat it as live.",
    });
    return warnings;
  }

  const nameOk = name.toLowerCase() === coin.name.toLowerCase();
  const tickerOk = symbol.toUpperCase() === coin.ticker;
  if (!nameOk || !tickerOk) {
    warnings.push({
      level: "danger",
      text: `this mint is “${name || "unknown"}” / $${symbol || "?"} — not ${coin.name} / $${coin.ticker}. do not set it as official.`,
    });
  } else {
    warnings.push({
      level: "info",
      text: `name and ticker match ${coin.name.toLowerCase()} / $${coin.ticker}.`,
    });
  }

  if (report.mintAuthority) {
    warnings.push({
      level: "danger",
      text: "mint authority is still set. someone can print more tokens.",
    });
  }
  if (report.freezeAuthority) {
    warnings.push({
      level: "danger",
      text: "freeze authority is still set. someone can freeze wallets.",
    });
  }

  const fatWallets = report.holders.filter(
    (h) => h.tag === "wallet" && h.pct != null && h.pct >= 10,
  );
  if (fatWallets.some((h) => (h.pct ?? 0) >= 20)) {
    warnings.push({
      level: "danger",
      text: "one wallet holds 20%+ of supply (excluding lp / curve). that looks bundled.",
    });
  } else if (fatWallets.length) {
    warnings.push({
      level: "warn",
      text: "a non-lp wallet holds 10%+. check it isn’t a bundle.",
    });
  }

  if (pump?.creator) {
    const creatorHold = report.holders.find((h) => sameAddr(h.address, pump.creator));
    if (creatorHold && (creatorHold.pct ?? 0) >= 5) {
      warnings.push({
        level: "warn",
        text: `creator still holds ~${creatorHold.pct?.toFixed(1)}%. first buy should stay small and public.`,
      });
    }
  }

  if (report.liquidityUsd != null && report.liquidityUsd < 1000) {
    warnings.push({
      level: "warn",
      text: "liquidity is very thin. easy to move, easy to dump.",
    });
  }

  if (report.complete === false) {
    warnings.push({
      level: "info",
      text: "still on the pump.fun bonding curve (not graduated).",
    });
  } else if (report.complete) {
    warnings.push({
      level: "info",
      text: "bonding curve complete / graduated.",
    });
  }

  if (report.clones.length) {
    warnings.push({
      level: "warn",
      text: `${report.clones.length} other solana token${report.clones.length === 1 ? "" : "s"} using a similar name. clones will spike around the film. this mint is the source of truth.`,
    });
  }

  warnings.push({
    level: "info",
    text: "verify the ca. same name + different mint = fake.",
  });

  return warnings;
}

async function runAnalysis(mint: string, coinId: CoinId): Promise<MintReport> {
  const report: MintReport = { mint, found: false, holders: [], clones: [], warnings: [] };
  const coin = COINS[coinId];
  const q1 = encodeURIComponent(coin.searchQueries[0] ?? coin.name);
  const q2 = encodeURIComponent(coin.searchQueries[1] ?? coin.ticker);

  const [pumpRaw, pumpRaw2, dexLatest, dexV1, mintInfo, largest, searchName, searchTicker] =
    await Promise.all([
      fetchOk(`https://frontend-api-v3.pump.fun/coins/${mint}`),
      fetchOk(`https://frontend-api.pump.fun/coins/${mint}`),
      fetchOk(`https://api.dexscreener.com/latest/dex/tokens/${mint}`),
      fetchOk(`https://api.dexscreener.com/token-pairs/v1/solana/${mint}`),
      solanaRpc("getAccountInfo", [mint, { encoding: "jsonParsed" }]).catch(() => null),
      solanaRpc("getTokenLargestAccounts", [mint]).catch(() => null),
      fetchOk(`https://api.dexscreener.com/latest/dex/search?q=${q1}`),
      fetchOk(`https://api.dexscreener.com/latest/dex/search?q=${q2}`),
    ]);

  const pump = (pumpRaw ?? pumpRaw2) as PumpCoin | null;
  if (pump && typeof pump === "object" && (pump.name || pump.symbol || pump.mint)) {
    report.found = true;
    report.name = pump.name;
    report.symbol = pump.symbol;
    report.description = pump.description;
    report.image = pump.image_uri;
    report.website = pump.website;
    report.twitter = pump.twitter;
    report.telegram = pump.telegram;
    report.creator = pump.creator;
    report.complete = pump.complete;
    report.marketCapUsd = num(pump.usd_market_cap);
    if (pump.created_timestamp) {
      const ms =
        pump.created_timestamp > 1e12
          ? pump.created_timestamp
          : pump.created_timestamp * 1000;
      report.createdAt = new Date(ms).toISOString();
    }
  }

  const pairs: DexPair[] = [];
  if (Array.isArray(dexV1)) pairs.push(...(dexV1 as DexPair[]));
  const latestPairs = (dexLatest as { pairs?: DexPair[] } | null)?.pairs;
  if (Array.isArray(latestPairs)) pairs.push(...latestPairs);

  const solPairs = pairs.filter(
    (p) =>
      (p.chainId ?? "solana") === "solana" &&
      (sameAddr(p.baseToken?.address, mint) || sameAddr(p.quoteToken?.address, mint)),
  );
  const withLiq = solPairs.filter((p) => (p.liquidity?.usd ?? 0) > 0);
  const ranked = (withLiq.length ? withLiq : solPairs).sort(
    (a, b) => (b.liquidity?.usd ?? 0) - (a.liquidity?.usd ?? 0),
  );
  const best = ranked[0];

  if (best) {
    report.found = true;
    if (sameAddr(best.baseToken?.address, mint)) {
      report.name = report.name ?? best.baseToken?.name;
      report.symbol = report.symbol ?? best.baseToken?.symbol;
      report.priceUsd = num(best.priceUsd);
    } else if (sameAddr(best.quoteToken?.address, mint)) {
      report.name = report.name ?? best.quoteToken?.name;
      report.symbol = report.symbol ?? best.quoteToken?.symbol;
    }
    report.liquidityUsd = num(best.liquidity?.usd);
    report.volume24h = num(best.volume?.h24);
    report.marketCapUsd = report.marketCapUsd ?? num(best.marketCap) ?? num(best.fdv);
    report.pairUrl = best.url;
    report.dexId = best.dexId;
  }

  const parsed = mintInfo?.value?.data?.parsed?.info;
  if (parsed) {
    report.found = true;
    report.decimals = num(parsed.decimals);
    report.supply = parsed.supply ? Number(parsed.supply) : undefined;
    if (report.supply != null && report.decimals != null) {
      report.supply = report.supply / 10 ** report.decimals;
    }
    report.mintAuthority = parsed.mintAuthority ?? null;
    report.freezeAuthority = parsed.freezeAuthority ?? null;
  }

  const largestValue = largest?.value as
    | { address: string; uiAmount: number | null }[]
    | undefined;
  if (Array.isArray(largestValue)) {
    const poolAddrs = [pump?.bonding_curve, pump?.associated_bonding_curve, best?.pairAddress]
      .filter(Boolean)
      .map((s) => String(s));
    report.holders = largestValue.slice(0, 8).map((row) => {
      const amount = row.uiAmount ?? 0;
      const pct =
        report.supply && report.supply > 0 ? (amount / report.supply) * 100 : null;
      const tag: HolderRow["tag"] = poolAddrs.some((p) => sameAddr(p, row.address))
        ? report.complete
          ? "lp"
          : "bonding curve"
        : "wallet";
      return { address: row.address, amount, pct, tag };
    });
  }

  const clonePairs: DexPair[] = [];
  for (const blob of [searchName, searchTicker]) {
    const list = (blob as { pairs?: DexPair[] } | null)?.pairs;
    if (Array.isArray(list)) clonePairs.push(...list);
  }
  const seen = new Set<string>([mint.toLowerCase()]);
  for (const pair of clonePairs) {
    if (pair.chainId && pair.chainId !== "solana") continue;
    const addr = pair.baseToken?.address;
    const name = pair.baseToken?.name ?? "";
    const symbol = pair.baseToken?.symbol ?? "";
    if (!addr || seen.has(addr.toLowerCase())) continue;
    const n = name.toLowerCase();
    const s = symbol.toLowerCase();
    const looksLike = coin.cloneNeedles.some(
      (needle) => n.includes(needle) || s === needle || s.includes(needle),
    );
    if (!looksLike) continue;
    seen.add(addr.toLowerCase());
    report.clones.push({ mint: addr, name, symbol, url: pair.url });
    if (report.clones.length >= 6) break;
  }

  report.warnings = buildWarnings(
    report,
    pump && typeof pump === "object" ? pump : null,
    coinId,
  );
  return report;
}

export const analyzeMint = createServerFn({ method: "POST" })
  .validator((input: unknown) => {
    const mint =
      typeof input === "object" && input && "mint" in input
        ? String((input as { mint: unknown }).mint).trim()
        : "";
    const coinIdRaw =
      typeof input === "object" && input && "coinId" in input
        ? String((input as { coinId: unknown }).coinId)
        : "alig";
    if (!isSolanaMint(mint)) {
      throw new Error("that doesn’t look like a solana mint.");
    }
    if (!isCoinId(coinIdRaw)) {
      throw new Error("unknown coin.");
    }
    return { mint, coinId: coinIdRaw };
  })
  .handler(async ({ data }): Promise<MintReport> => {
    try {
      return await runAnalysis(data.mint, data.coinId);
    } catch (err) {
      return {
        mint: data.mint,
        found: false,
        error: err instanceof Error ? err.message : "lookup failed",
        holders: [],
        clones: [],
        warnings: [
          {
            level: "danger",
            text: "couldn’t reach pump.fun / dexscreener / rpc. try again, or paste the ca in chat.",
          },
        ],
      };
    }
  });
