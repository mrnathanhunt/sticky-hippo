import { createFileRoute } from "@tanstack/react-router";
import { Desk } from "@/components/desk";

export const Route = createFileRoute("/alig/desk")({
  component: Desk,
  head: () => ({
    meta: [{ title: "Ali G — launch desk" }],
  }),
});
