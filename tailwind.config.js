module.exports = {
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false,
  theme: {
    extend: {
      boxShadow: {
        DEFAULT: '0px 4px 10px rgba(0, 0, 0, 0.1);',
        none: 'none'
      },
      width: {
        150: '150px'
      },
      inset: {
        '-105': '-105px'
      }
    }
  },
  variants: {
    extend: {}
  },
  plugins: []
}
