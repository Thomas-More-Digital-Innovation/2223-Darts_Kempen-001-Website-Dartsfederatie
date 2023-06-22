/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "background": "#404040",
        "nav-background": "#4A4A4A",
        "footer-background": "#4A4A4A",
        "accent": "#174DAF",
        "trophy-0": "#AE8625",
        "trophy-1": "#8B8B8B",
        "trophy-2": "#967444",
        "edit-button": "#95A4F3",
        "delete-button": "#FF4E4E",
        "add-button": "#15803D",
        "light-gray": "#676767",
        "blacktext": "#000000",
      },
    },
  },
  safelist: [
    {
      pattern: /text-trophy-[0-9]+/
    }
  ],
  plugins: [
    require('tailwind-children'),
  ],
}
