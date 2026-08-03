/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        netflix: {
          black: '#141414',
          red: '#E50914',
          darkGray: '#181818',
          gray: '#2F2F2F',
        }
      }
    },
  },
  plugins: [],
}
