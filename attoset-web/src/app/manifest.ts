import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Attoset — AI-powered Work OS",
    short_name: "Attoset",
    description:
      "The AI-powered Work OS that lets organizations build, manage, automate, and scale operations in one unified platform.",
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
