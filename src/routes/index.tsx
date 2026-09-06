import { createFileRoute } from "@tanstack/react-router";
import { Landing } from "@/components/landing";
import { CoinProvider } from "@/lib/coin";

export const Route = createFileRoute("/")({
  component: Home,
  head: () => ({
    meta: [
      { title: "Sticky Hippo — the hippo that sticks" },
      {
        name: "description",
        content:
          "Sticky Hippo ($HIPPO). The hippo that sticks. Unofficial solana meme. Verify the CA.",
      },
    ],
  }),
});

function Home() {
  return (
    <CoinProvider id="hippo">
      <Landing />
    </CoinProvider>
  );
}
