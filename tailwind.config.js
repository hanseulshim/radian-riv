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
        150: '150px',
        200: '200px',
        300: '300px',
        350: '350px',
        450: '450px'
      },
      inset: {
        '-105': '-105px'
      },
      colors: {
        patina: '#6a978e',
        'prussian-blue': '#002b49',
        'robins-egg': '#09b9b3',
        nebula: '#cddcda',
        'sidebar-0': '#0f3654',
        'sidebar-1': '#1f445f',
        'sidebar-2': '#33556d',
        'light-gray': 'rgba(61, 57, 53, 0.05)'
      }
    }
  },
  variants: {
    extend: {}
  },
  plugins: []
}
