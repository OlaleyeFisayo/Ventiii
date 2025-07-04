import tailwindcss from "@tailwindcss/vite";

import "./lib/env";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-05-15",
  devtools: {
    enabled: true,
  },
  modules: [
    "@nuxt/fonts",
    "@nuxt/eslint",
    "@nuxt/ui",
    "@pinia/nuxt",
    "@nuxt/image",
    "nuxt-csurf",
  ],
  eslint: {
    config: {
      standalone: false,
    },
  },
  vite: {
    plugins: [tailwindcss()],
    esbuild: {
      target: "es2022",
    },
    build: {
      target: "es2022",
    },
  },
  css: ["~/assets/css/main.css"],
  ui: {
    colorMode: false,
  },
  app: {
    head: {
      title: "Ventiii",
      link: [
        {
          rel: "icon",
          href: "/logo.png",
        },
      ],
    },
  },
  csurf: {
    cookie: {
      httpOnly: true,
      sameSite: "strict",
    },
    headerName: "csrf-token",
  },
});
