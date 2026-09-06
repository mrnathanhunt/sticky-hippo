import { createFileRoute, Outlet } from "@tanstack/react-router";
import { CoinProvider } from "@/lib/coin";

export const Route = createFileRoute("/booya")({
  component: BooyaLayout,
  head: () => ({
    meta: [
      { title: "Booyakasha — the shout" },
      {
        name: "description",
        content: "Booyakasha ($BOOYA). The shout. Unofficial solana meme. Not the film.",
      },
    ],
  }),
});

function BooyaLayout() {
  return (
    <CoinProvider id="booya">
      <Outlet />
    </CoinProvider>
  );
}
