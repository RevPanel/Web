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
        background: "#1B1C31",
        "background-secondary": "#212237",
        primary: "#52459F",
        secondary: "#84E9F5",
      },
    },
  },
  plugins: [],
};
export default config;
