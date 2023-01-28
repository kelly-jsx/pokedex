/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "poke-blue": "#385faa",
        "poke-dark": "#1d2c5e",
        "poke-yellow": "#ffcb05",
      },
    },
  },
  plugins: [],
};
