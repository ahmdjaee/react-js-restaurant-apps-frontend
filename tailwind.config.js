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
      width: {
        '84': '22rem',
        '88': '24rem',
      },
      animation: {
        'spin-slow': 'spin 15s linear infinite',
      },
      backgroundImage: {
        'about-us' : "url('https://images.pexels.com/photos/262978/pexels-photo-262978.jpeg')",
      }
      ,
      container: {
        center: true,
        screens: {
          sm: '640px',
          md: '768px',
          lg: '1024px',
          xl: '1200px',
        }
      }
    },
  },
  plugins: [],
}

