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
      fontFamily: {
        sans: ["SF Pro Display"],
      },
      colors: {
        primary: "#1E1E1E",
        secondary: "#079C4E",
        yellow: "#FFA500",
        "background-green": "#013115",
        gray: {
          1: "#F4F4F4",
          2: "#D9D9D9",
          3: "#5B5B5B",
        },
        background: {
          1: "#F6F5F7",
          2: "#F2F1F6",
        },
      },
    },
  },
  plugins: [],
};
export default config;
