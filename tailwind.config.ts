import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/layout/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/ui/**/*.{js,ts,jsx,tsx,mdx}",
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
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        "primary-2": "#1E1E1E",
        secondary: {
          DEFAULT: "#079C4E",
          foreground: "hsl(var(--secondary-foreground))",
          "2": "#14CF3D",
        },
        yellow: "#FFA500",
        neon: "#D6AB27",
        red: "#EB4E4E",
        "dark-red": "#FF0000",
        gray: {
          "1": "#F4F4F4",
          "2": "#D9D9D9",
          "3": "#5B5B5B",
          "4": "#333333",
          "5": "#858585",
          "6": "#848484",
          "7": "#444444CC",
          "8": "#404040",
          "9": "#626262",
          "10": "#F5F5F5",
          "11": "#F2F1F6",
          "12": "#585858",
          "13": "#AAAAAA",
          light: "#EBEBEB",
          "light-2": "#ECECEC",
        },
        brown: "#9C3407",
        "brown-1": "#696969",
        green: {
          DEFAULT: "#087D40",
          dark: "#013115",
          1: "#079C4E",
          2: "#207C4C",
        },
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        chart: {
          "1": "hsl(var(--chart-1))",
          "2": "hsl(var(--chart-2))",
          "3": "hsl(var(--chart-3))",
          "4": "hsl(var(--chart-4))",
          "5": "hsl(var(--chart-5))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      spacing: {
        "7.5": "30px",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
export default config;
