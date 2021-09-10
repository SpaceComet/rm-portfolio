const colors = require('tailwindcss/colors')

module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
        colors: {
            gray: colors.trueGray,
        },
        fontFamily: {
            'simplifica': ['Simplifica']
        }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
