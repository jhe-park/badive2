const {heroui} = require("@heroui/react");

import type { Config } from "tailwindcss";

const config = {
  // darkMode: ["class"],
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
      zIndex: {
        '100': '100',
        '1000': '1000',
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
      }
    },
  },
  plugins: [heroui()],
};

export default config;
