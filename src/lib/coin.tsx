import { createContext, useContext, type ReactNode } from "react";
import { COINS, type Coin, type CoinId } from "@/lib/coins";
import { cn } from "@/lib/utils";

const CoinContext = createContext<Coin>(COINS.alig);

export function CoinProvider({
  id,
  children,
}: {
  id: CoinId;
  children: ReactNode;
}) {
  const coin = COINS[id];
  return (
    <CoinContext.Provider value={coin}>
      <div
        data-theme={coin.id}
        className={cn(
          "min-h-dvh",
          coin.tone === "loud"
            ? "bg-gold text-ink"
            : coin.tone === "cream"
              ? "bg-paper text-ink"
              : "bg-ink text-paper",
        )}
      >
        {children}
      </div>
    </CoinContext.Provider>
  );
}

export function useCoin() {
  return useContext(CoinContext);
}
