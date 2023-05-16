/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        customColor: "#723B6A",
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
