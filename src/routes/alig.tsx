import { createFileRoute, Outlet } from "@tanstack/react-router";
import { CoinProvider } from "@/lib/coin";

export const Route = createFileRoute("/alig")({
  component: AliGLayout,
  head: () => ({
    meta: [
      { title: "Ali G — who iz i" },
      {
        name: "description",
        content: "Ali G ($ALIG). Who iz i. Unofficial solana meme. Not the film.",
      },
    ],
  }),
});

function AliGLayout() {
  return (
    <CoinProvider id="alig">
      <Outlet />
    </CoinProvider>
  );
}
