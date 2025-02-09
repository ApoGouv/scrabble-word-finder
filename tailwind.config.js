/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      zIndex: {
       '60': 60,
       '70': 70,
       '80': 80,
       '90': 90,
       '100': 100,
      },
      spacing: {
        '80': '80px', // Add 80px as a reusable spacing value
      },
    },
  },
  plugins: [],
}

