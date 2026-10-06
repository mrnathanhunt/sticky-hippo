import { useEffect, useState } from "react";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { useCoin } from "@/lib/coin";
import type { CoinId } from "@/lib/coins";

type Slot = {
  mint: string;
  xUrl: string;
  telegramUrl: string;
  taps: number;
};

type TokenState = {
  coins: Record<CoinId, Slot>;
  setMint: (id: CoinId, mint: string) => void;
  setXUrl: (id: CoinId, xUrl: string) => void;
  setTelegramUrl: (id: CoinId, telegramUrl: string) => void;
  addTap: (id: CoinId) => void;
};

const empty: Slot = { mint: "", xUrl: "", telegramUrl: "", taps: 0 };

export const useTokenStore = create<TokenState>()(
  persist(
    (set) => ({
      coins: { hippo: { ...empty } },
      setMint: (id, mint) =>
        set((s) => ({
          coins: { ...s.coins, [id]: { ...s.coins[id], mint: mint.trim() } },
        })),
      setXUrl: (id, xUrl) =>
        set((s) => ({
          coins: { ...s.coins, [id]: { ...s.coins[id], xUrl: xUrl.trim() } },
        })),
      setTelegramUrl: (id, telegramUrl) =>
        set((s) => ({
          coins: {
            ...s.coins,
            [id]: { ...s.coins[id], telegramUrl: telegramUrl.trim() },
          },
        })),
      addTap: (id) =>
        set((s) => ({
          coins: {
            ...s.coins,
            [id]: { ...s.coins[id], taps: s.coins[id].taps + 1 },
          },
        })),
    }),
    { name: "two-coins-live" },
  ),
);

export function useLiveToken() {
  const coin = useCoin();
  const slot = useTokenStore((s) => s.coins[coin.id] ?? empty);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
  }, []);

  const mint = coin.mint.length > 32 ? coin.mint : hydrated ? slot.mint : coin.mint;
  const xUrl = coin.xUrl || (hydrated ? slot.xUrl : coin.xUrl);
  const telegramUrl = coin.telegramUrl || (hydrated ? slot.telegramUrl : coin.telegramUrl);

  return {
    ...coin,
    mint,
    xUrl,
    telegramUrl,
    taps: hydrated ? slot.taps : 0,
    hydrated,
  };
}
