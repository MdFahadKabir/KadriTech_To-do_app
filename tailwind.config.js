/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        gray_light: "#f7f7f7",
        blue: "#1668BD",
        orange: "#FFB318",
        green: "#349C55",
      },
    },
  },
  plugins: [require("tailwind-scrollbar-hide")],
};
