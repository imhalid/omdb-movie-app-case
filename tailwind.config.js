/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      aspectRatio: {
        "3/4": "3 / 4",
      },
      backgroundImage: {
        "hero-pattern": "url('/Background.svg')",
      },
    },
  },
  plugins: [],
};
