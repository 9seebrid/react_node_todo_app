/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {},
    fontFamily: {
      customFontEN: ['IBM Plex Mono', 'monospace'],
      customFontKR: ['IBM Plex Sans KR', 'sans-serif'],
    },
  },
  plugins: [],
};
