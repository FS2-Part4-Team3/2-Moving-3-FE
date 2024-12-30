import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./.storybook/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    screens: {
      sm: "375px",
      md: "744px",
      lg: "1200px",
    },
    colors: {
      "black-100": "#6B6B6B",
      "black-200": "#525252",
      "black-300": "#373737",
      "black-400": "#1F1F1F",
      "black-500": "#040404",
      "gray-50": "#FFFFFF",
      "gray-100": "#DEDEDE",
      "gray-200": "#C4C4C4",
      "gray-300": "#ABABAB",
      "gray-400": "#999999",
      "gray-500": "#808080",
      "blue-50": "#F5FAFF",
      "blue-100": "#E9F4FF",
      "blue-200": "#4DA9FF",
      "blue-300": "#1B92FF",
      "blue-400": "#242945",
      "yellow-100": "#FFC149",
      "background-100": "#FAFAFA",
      "background-200": "#F7F7F7",
      "background-300": "#EFEFEF",
      "background-400": "#F4F7FB",
      "line-100": "#F2F2F2",
      "line-200": "#E6E6E6",
    },
    extend: {
      textColor: {
        DEFAULT: "#1F1F1F",
      },
    },
  },
};

export default config;
