import { defineConfig } from "astro/config";

export default defineConfig({
  site: process.env.SITE_URL || "https://feniks-transfers.vercel.app",
  output: "static",
  trailingSlash: "never",
});
