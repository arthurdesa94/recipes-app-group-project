const colors = require('tailwindcss/colors');

module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      backgroundImage: theme => ({
        'login-image': "url('https://pbs.twimg.com/media/Do73TSDU4AEgQLr.jpg:large')",
      }),
    },
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      trueGray: colors.trueGray,
      lightBlue: colors.lightBlue,
      amber: colors.amber,
      green: colors.green,
    },
  },
  variants: {
    extend: {},
    animation: ['responsive', 'motion-safe', 'motion-reduce'],
    plugins: [],
  },
};
