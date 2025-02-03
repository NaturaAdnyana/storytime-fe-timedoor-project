/** @type {import('tailwindcss').Config} */
export default {
  content: [],
  theme: {
    extend: {
      colors: {
        "gray-asparagus-tr": "#466543",
        "kombu-green": "#31472F",
        "raisin-black": "#222222",
        "isabelline-sc": "#F0F5ED",
        quartz: "#4B4B4B",
        gainsboro: "#d5e6d4",
      },
      fontFamily: {
        "dm-sans": ["DM Sans", "sans-serif"],
        "playfair-display": ["Playfair Display", "serif"],
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
