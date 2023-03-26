/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{ts,tsx,jsx,js}"],
  theme: {
    colors: {
      black: "#01161E",
      white: "#EFF6E0",
      gray: "#C4D4C5",
      blue: "#598392",
      "light-blue": "#A6C0C9",
      "dark-blue": "#124559",
      red: "#990F02",
      green: "#3CB043",
    },
    extend: {
      minHeight: {
        40: "10rem",
      },
    },
  },
  plugins: [],
};
