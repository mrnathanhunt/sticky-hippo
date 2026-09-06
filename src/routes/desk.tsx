import { createFileRoute } from "@tanstack/react-router";
import { Desk } from "@/components/desk";
import { CoinProvider } from "@/lib/coin";

export const Route = createFileRoute("/desk")({
  component: HippoDesk,
  head: () => ({
    meta: [{ title: "Sticky Hippo — launch desk" }],
  }),
});

function HippoDesk() {
  return (
    <CoinProvider id="hippo">
      <Desk />
    </CoinProvider>
  );
}
