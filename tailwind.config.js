/** @type {import('tailwindcss').Config} */
export default {
    content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
      extend: {
        colors: {
          earth: { 900: '#1a1814', 800: '#2c2520' },
          spore: { light: '#d4ff00', DEFAULT: '#88cc00' },
          fungi: { red: '#ff4d4d', purple: '#9d00ff' }
        },
        fontFamily: { sans: ['Inter', 'sans-serif'] },
      },
    },
    plugins: [],
  }