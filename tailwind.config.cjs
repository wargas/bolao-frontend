const colors = require('tailwindcss/colors')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html",
  "./src/**/*.{js,ts,jsx,tsx}",],
  theme: {
    extend: {
      fontFamily: {
        'sans': ['Inter', 'sans-serif'],
        'logo': ['Bebas Neue', 'sans-serif']
      },
      colors: {
        primary: colors.slate
      },
      spacing: {
        sidebar: '280px'
      },
      
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}
