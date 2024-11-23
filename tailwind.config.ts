import type { Config } from "tailwindcss";
import daisyui from "daisyui";

const config: Config = {
 content: [
  "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
  "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
  "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
 ],
 theme: {
  extend: {
   colors: {
    cosmos: {
      primary: '#1B1E36',
      secondary: '#6F7390',
      accent: '#5EE2E7',
      background: {
        start: '#080A17',
        end: '#000000',
      },
      text: {
        light: '#FFFFFF',
        gray: '#8D8FA8',
      },
    },
   },
   fontFamily: {
    sans: ["Gotham", "sans-serif"],
   },
  },
 },
 plugins: [daisyui],
 daisyui: {
  themes: [
    {
      light: {
        ...require("daisyui/src/theming/themes")["light"],
        "base-200": "#1B1E36", // Using your cosmos primary color
      },
      dark: {
        ...require("daisyui/src/theming/themes")["dark"],
        "base-200": "#1B1E36", // Using your cosmos primary color
      }
    }
  ],
 },
};

// Ensure plugins is an array
if (!config.plugins) {
  config.plugins = [];
}

const {
 default: flattenColorPalette,
} = require("tailwindcss/lib/util/flattenColorPalette");

config.plugins.push(function ({ addBase, theme }: any) {
 let allColors = flattenColorPalette(theme("colors"));
 let newVars = Object.fromEntries(
  Object.entries(allColors).map(([key, val]) => [`--${key}`, val])
 );

 addBase({
  ":root": newVars,
 });
});

// Type assertion to ensure TypeScript knows plugins is defined
(config.plugins as any[]).push(function ({ addBase, theme }: any) {
 let allColors = flattenColorPalette(theme("colors"));
 let newVars = Object.fromEntries(
  Object.entries(allColors).map(([key, val]) => [`--${key}`, val])
 );

 addBase({
  ":root": newVars,
 });
});

export default config;
