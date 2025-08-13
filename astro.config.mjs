// @ts-check
import { defineConfig } from 'astro/config';
import tailwind from "@astrojs/tailwind";
import react from "@astrojs/react";
import icon from "astro-icon";

// https://astro.build/config
export default defineConfig({
  integrations: [
    tailwind({
      applyBaseStyles: false,
    }), 
    react(),
    icon()
  ],
  // --- CAMBIO: Añade este bloque de configuración de Vite ---
  vite: {
    build: {
      cssCodeSplit: true, // Asegúrate de que esto esté activado
    },
    experimental: {
      inlineCriticalCss: true,
    },
  },
});