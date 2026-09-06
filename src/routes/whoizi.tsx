import { createFileRoute } from "@tanstack/react-router";
import { Hub } from "@/components/hub";

export const Route = createFileRoute("/whoizi")({
  component: Hub,
  head: () => ({
    meta: [
      { title: "ALIG + BOOYA — who iz i" },
      {
        name: "description",
        content: "Two unofficial solana memes: Ali G ($ALIG) and Booyakasha ($BOOYA). Not the film.",
      },
    ],
  }),
});
