import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#09090B",
        "background-secondary": "#18181B",
        primary: "#C082FF",
        secondary: "#7967FF",
        tertiary: "#A1A1AA",
      },
    },
  },
  daisyui: {
    base: false,
    logs: false,
    prefix: "daisy-",
    themes: [
      {
        panel: {
          primary: "#C082FF",
          secondary: "#7967FF",
          accent: "#1fb2a6",
          neutral: "#18181B",
          "base-100": "#09090B",
          info: "#C082FF",
          success: "#36d399",
          warning: "#fbbd23",
          error: "#f87272",
        },
      },
    ],
  },
  plugins: [require("daisyui")],
};
export default config;
