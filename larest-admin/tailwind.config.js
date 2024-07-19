/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary': 'rgb(29 78 216)',
        'danger': 'rgb(185 28 28)',
        'success': 'rgb(21 128 61)',
        'warning': 'rgb(161 98 7)',
      }
    },
  },
  plugins: [],
}