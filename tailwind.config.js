/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#EA6D27',
        'dark': '#101A24',
        'secondary': '#101A24'
      },
      borderRadius: {
        '4xl': '3rem',
      },
      height: {
        '84': '22rem',
      },
      container: {
        center: true,
        screens: {
          lg: "1124px",
        }
      }
    },
  },
  plugins: [],
}

