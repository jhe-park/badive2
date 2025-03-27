const { heroui } = require("@heroui/react");

import type { Config } from "tailwindcss";

const config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx,js,jsx}",
    "./components/**/*.{ts,tsx,js,jsx}",
    "./app/**/*.{ts,tsx,js,jsx}",
    "./src/**/*.{ts,tsx,js,jsx}",
    "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  prefix: "",
  theme: {
    extend: {
      colors: {
        primary: "#0077B6"
      },
      keyframes: {
        'scale-fade-in': {
          '0%': {
            opacity: '0',
            transform: 'scale(0.5)'
          },
          '100%': {
            opacity: '1',
            transform: 'scale(1)'
          },
        }
      },
      animation: {
        'scale-fade-in': 'scale-fade-in 0.5s ease-out forwards'
      },
      screens: {
        sm: '768px',    // 태블릿
        md: '1280px',   // 노트북
        lg: '1920px',   // 데스크탑
      },
    },
  },
  plugins: [heroui()],
};

export default config;
