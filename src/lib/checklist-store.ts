import { create } from "zustand";
import { persist } from "zustand/middleware";
import { useCoin } from "@/lib/coin";
import type { CoinId } from "@/lib/coins";

type CheckState = {
  byCoin: Record<CoinId, Record<string, boolean>>;
  toggle: (id: CoinId, item: string) => void;
  reset: (id: CoinId) => void;
};

export const useChecklistStore = create<CheckState>()(
  persist(
    (set, get) => ({
      byCoin: { alig: {}, booya: {}, hippo: {} },
      toggle: (id, item) => {
        const current = get().byCoin[id] ?? {};
        set({
          byCoin: {
            ...get().byCoin,
            [id]: { ...current, [item]: !current[item] },
          },
        });
      },
      reset: (id) =>
        set({
          byCoin: { ...get().byCoin, [id]: {} },
        }),
    }),
    { name: "two-coins-checklist" },
  ),
);

export function useChecklist() {
  const coin = useCoin();
  const done = useChecklistStore((s) => s.byCoin[coin.id] ?? {});
  const toggleItem = useChecklistStore((s) => s.toggle);
  const resetCoin = useChecklistStore((s) => s.reset);
  return {
    done,
    toggle: (item: string) => toggleItem(coin.id, item),
    reset: () => resetCoin(coin.id),
  };
}
