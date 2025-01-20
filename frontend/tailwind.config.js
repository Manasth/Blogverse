/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "medium-home": "rgba(246, 244, 238, 1)"
      }
    },
  },
  plugins: [],
}