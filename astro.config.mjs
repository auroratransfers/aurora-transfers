import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";

export default defineConfig({
  site: "https://aurora-transfers.vercel.app",
  output: "static",
  trailingSlash: "always",
  integrations: [sitemap()]
});
