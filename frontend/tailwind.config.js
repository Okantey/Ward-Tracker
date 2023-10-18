/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./App.{js,jsx,ts,tsx}", "./src/components/**/*.{js,jsx,ts,tsx}", "./src/screens/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#4CE5B1",
        secondary: "#4252FF",
        white: "#fff",
        black: "#242E42",
        grey: "#F1F1F1",
        lightgrey: "#EFEFF4",
        darkgrey: "#C8C7CC"
      }
    },
  },
  plugins: [],
}

