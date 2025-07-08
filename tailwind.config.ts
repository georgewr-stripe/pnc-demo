import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        "pnc-blue": "#004990",
        "pnc-light-blue": "#0077B5",
        "pnc-orange": "#FF6600",
        "pnc-dark-blue": "#002D62",
        "pnc-light-gray": "#414e58",
        "pnc-dark-gray": "#2d3943",
      },
      fontFamily: {
        sans: ["Nunito Sans", "sans-serif"],
        mono: ["Nunito Sans", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;
