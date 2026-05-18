/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#39ff14',
        secondary: '#7cff00',
        dark: '#020202',
        card: '#111111',
        accent: '#39ff14',
      },
    },
  },
  plugins: [],
}
