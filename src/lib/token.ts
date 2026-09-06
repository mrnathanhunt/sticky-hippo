const BASE58 = /^[1-9A-HJ-NP-Za-km-z]{32,44}$/;

export function isSolanaMint(value: string) {
  return BASE58.test(value.trim());
}

export function isLiveMint(mint: string) {
  return isSolanaMint(mint);
}

export function pumpUrl(mint: string) {
  return mint ? `https://pump.fun/coin/${mint}` : "https://pump.fun";
}

export function solscanUrl(mint: string) {
  return mint ? `https://solscan.io/token/${mint}` : "";
}

export function shortMint(mint: string) {
  const value = mint.trim();
  if (!value) return "";
  if (value.length < 12) return value;
  return `${value.slice(0, 4)}…${value.slice(-4)}`;
}

export function handleFromUrl(url: string) {
  try {
    const parsed = new URL(url);
    const part = parsed.pathname.replace(/^\//, "").split("/")[0];
    return part || "";
  } catch {
    return "";
  }
}
