import sitemap from "@astrojs/sitemap";
import editableRegions from "@cloudcannon/editable-regions/astro-integration";
import postcssGlobalData from "@csstools/postcss-global-data";
import icon from "astro-icon";
import { defineConfig } from "astro/config";
import autoprefixer from "autoprefixer";
import path from "node:path";
import { fileURLToPath } from "node:url";
import postcssCustomMedia from "postcss-custom-media";
import postcssEach from "postcss-each";
import postcssImport from "postcss-import";
import postcssNested from "postcss-nested";


const __dirname = path.dirname(fileURLToPath(import.meta.url));

// https://astro.build/config
export default defineConfig({
  site: "https://example.com",
  devToolbar: {
    enabled: false,
  },
  server: {
    port: 4321,
  },
  image: {
    domains: ["picsum.photos"],
  },
  integrations: [
    editableRegions(),
    icon({
      iconDir: path.resolve(__dirname, "src/icons"),
    }),
    sitemap({
      filter: (page) => !page.includes("/component-library"),
    }),
  ],
  vite: {
    css: {
      devSourcemap: true,
      postcss: {
        plugins: [
          postcssImport,
          postcssGlobalData({
            files: [path.resolve(__dirname, "./src/styles/variables/_media.pcss")],
          }),
          postcssCustomMedia,
          postcssNested,
          postcssEach,
          autoprefixer,
        ],
      },
    },
    resolve: {
      alias: {
        "@components": path.resolve(__dirname, "src/components"),
        "@data": path.resolve(__dirname, "src/data"),
        "@content": path.resolve(__dirname, "src/content"),
        "@assets": path.resolve(__dirname, "src/assets"),
        "@component-library": path.resolve(__dirname, "src/component-library"),
        "@layouts": path.resolve(__dirname, "src/layouts"),
        "@styles": path.resolve(__dirname, "src/styles"),
      },
    },
  },
});
