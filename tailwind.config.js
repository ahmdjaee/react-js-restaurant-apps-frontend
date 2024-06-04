/** @type {import('tailwindcss').Config} */
// const withMT = require("@material-tailwind/react/utils/withMT");
import withMT from "@material-tailwind/react/utils/withMT";

export default withMT({
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1200px',
    },
    container: {
      center: true,
      screens: {
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1200px',
      }
    },
    extend: {
      fontFamily: {
        'poppins': ['Poppins', 'sans-serif'],
      },
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
      width: {
        '84': '22rem',
        '88': '24rem',
      },
      animation: {
        'spin-slow': 'spin 15s linear infinite',
        'right-slide-in': 'right-slide-in 1s ease-in-out',
        'right-slide-in-fast': 'right-slide-in 0.3s ease-in-out',
        'left-slide-in': 'left-slide-in 1s ease-in-out',
        'bottom-slide-in': 'bottom-slide-in 1s ease-out',
      },
      backgroundImage: {
        'about-us': "url('https://images.pexels.com/photos/262978/pexels-photo-262978.jpeg')",
      },
      keyframes: {
        'right-slide-in': {
          '0%': { transform: 'translateX(40%)' },
          '100%': { transform: 'translateX(0)' },
        },
        'left-slide-in': {
          '0%': { transform: 'translateX(-40%)' },
          '100%': { transform: 'translateX(0)' },
        },
      },
    },
  },
  plugins: [],
})
