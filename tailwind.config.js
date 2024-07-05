/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        customBlue: '#161C60',
        secondBlue: '#132554',
        customCyan: '#23BDD6',
        secondCyan: '#0B568D',
        customGray: '#cbcbcb',
      },
      fontFamily: {
        sans: ['Wotfard', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
