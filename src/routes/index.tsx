import { createFileRoute } from "@tanstack/react-router";
import { FlunoApp } from "@/components/fluno/FlunoApp";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Fluno — App prototype" },
      { name: "description", content: "Interactive Fluno prototype: splash, onboarding, sign up and tab navigation." },
      { property: "og:title", content: "Fluno — App prototype" },
      { property: "og:description", content: "Interactive Fluno prototype: splash, onboarding, sign up and tab navigation." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: FlunoApp,
});
