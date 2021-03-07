const colors = require('tailwindcss/colors');

module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      backgroundImage: (theme) => ({
        'login-image': 'url(\'https://pbs.twimg.com/media/Do73TSDU4AEgQLr.jpg:large\')',
        'drink-image': 'url(https://i.pinimg.com/originals/31/43/3e/31433ef5b0cff94064107635ef567dea.png)',
      }),
      height: (theme) => ({
        'screen/80': '80vh',
        'screen/2': '50vh',
        'screen/3': 'calc(100vh / 3)',
        'screen/4': 'calc(100vh / 4)',
        'screen/5': 'calc(100vh / 5)',
      }),
    },

    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      trueGray: colors.trueGray,
      lightBlue: colors.lightBlue,
      blue: colors.blue,
      amber: colors.amber,
      green: colors.green,
      white: colors.white,
      red: colors.red,
      indigo: colors.indigo,
      pink: colors.pink,
    },
  },
  variants: {
    extend: {},
    textColor: ['visited', 'hover'],
    animation: ['responsive', 'motion-safe', 'motion-reduce'],
    plugins: [],
  },
};
