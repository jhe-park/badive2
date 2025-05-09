const { heroui } = require('@heroui/react');
import type { Config } from 'tailwindcss';

const config = {
  // darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx,js,jsx}',
    './components/**/*.{ts,tsx,js,jsx}',
    './app/**/*.{ts,tsx,js,jsx}',
    './src/**/*.{ts,tsx,js,jsx}',
    './node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}',
  ],
  prefix: '',
  theme: {
    extend: {
      colors: {
        primary: '#0077B6',
        btnActive: '#0077B6',
      },
      zIndex: {
        '100': '100',
        '1000': '1000',
      },
      keyframes: {
        'fade-in': {
          '0%': {
            transform: 'translateY(100px)',
            opacity: '0',
          },
          '100%': {
            transform: 'translateY(0)',
            opacity: '1',
          },
        },
        'scale-fade-in': {
          '0%': {
            opacity: '0',
            transform: 'scale(0.5)',
          },
          '100%': {
            opacity: '1',
            transform: 'scale(1)',
          },
        },
        'slide-in-bottom': {
          '0%': {
            transform: 'translateY(100px)',
            opacity: '0',
          },
          '100%': {
            transform: 'translateY(0)',
            opacity: '1',
          },
        },
      },
      animation: {
        'scale-fade-in': 'scale-fade-in 0.5s ease-out forwards',
        'slide-in-bottom': 'slide-in-bottom 0.8s cubic-bezier(0.250, 0.460, 0.450, 0.940) both',
        'fade-in-up': 'fade-in 1s ease-out forwards',
      },
      screens: {
        xs: '480px', // 휴대폰
        sm: '768px', // 태블릿
        md: '1280px', // 노트북
        lg: '1920px', // 데스크탑
      },
      fontFamily: {
        eland: ['ELAND_Choice_M', 'sans-serif'],
        freesentation400: ['Freesentation-4Regular', 'sans-serif'],
        freesentation500: ['Freesentation-5Medium', 'sans-serif'],
        freesentation600: ['Freesentation-6SemiBold', 'sans-serif'],
        freesentation700: ['Freesentation-7Bold', 'sans-serif'],
        freesentation800: ['Freesentation-8ExtraBold', 'sans-serif'],        
        freesentation: ['Freesentation-9Black', 'sans-serif'],
        freesentationVF: ['FreesentationVF', 'sans-serif'],
        miceGothic: ['MICE Gothic', 'sans-serif'],
      },
    },
  },
  plugins: [heroui()],
};

export default config;
