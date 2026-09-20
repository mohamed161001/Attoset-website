import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Attoset — Intelligent Work Platform",
    short_name: "Attoset",
    description:
      "The intelligent Work Platform that lets organizations build, manage, automate, and scale operations in one unified system.",
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
