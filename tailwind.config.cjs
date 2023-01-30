/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{js,jsx,ts,tsx}"],
    darkMode: 'class',
    theme: {
        extend: {
            colors: {
                "poke-blue": "#385faa",
                "poke-dark": "#1d2c5e",
                "poke-yellow": "#ffcb05",
                "poke-yellow-dark": "#c7a008",

                //  types
                "grass": "#5FBD58",
                "bug": "#92BC2C",
                "dark": "#595761",
                "dragon": "#0C69C8",
                "electric": "#F2D94E",
                "fairy": "#EE90E6",
                "fighting": "#D3425F",
                "fire": "#dc872f",
                "flying": "#A1BBEC",
                "ghost": "#5F6DBC",
                "ground": "#DA7C4D",
                "ice": "#75D0C1",
                "normal": "#A0A29F",
                "poison": "#B763CF",
                "psychic": "#ff2ca8",
                "rock": "#a38c21",
                "steel": "#5695A3",
                "water": "#539DDF",
            },
        },
    },
    plugins: [],
};
