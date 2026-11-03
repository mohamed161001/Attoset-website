import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Attoset — Intelligent Work Platform",
    short_name: "Attoset",
    description:
      "The intelligent Work Platform where companies build their own operations systems, execute work with people and agents, and scale with full traceability.",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#ff512a",
    icons: [
      {
        src: "/icon.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
