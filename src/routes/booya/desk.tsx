import { createFileRoute } from "@tanstack/react-router";
import { Desk } from "@/components/desk";

export const Route = createFileRoute("/booya/desk")({
  component: Desk,
  head: () => ({
    meta: [{ title: "Booyakasha — launch desk" }],
  }),
});
