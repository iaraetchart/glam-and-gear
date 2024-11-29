const plugin = require('tailwindcss/plugin');

module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        inter: ['Inter', 'system-ui', 'Avenir', 'Helvetica', 'Arial', 'sans-serif'],
        redHatDisplay: ['Red Hat Display', 'sans-serif'],
      },
      colors: {
        primary: '#b19cd9',
        variant: '#a084ca'
      },
      lineHeight: {
        normal: '1.5',
        tight: '1.1',
      },
    },
  },
  plugins: [
    require('@tailwindcss/line-clamp'),
    plugin(function ({ addBase, theme }) {
      addBase({
        ':root': {
          fontFamily: theme('fontFamily.inter'),
          lineHeight: theme('lineHeight.normal'),
          fontWeight: theme('fontWeight.normal'),
          fontSynthesis: 'none',
          textRendering: 'optimizeLegibility',
          '-webkit-font-smoothing': 'antialiased',
          '-moz-osx-font-smoothing': 'grayscale',
        },
        h1: {
          fontFamily: theme('fontFamily.redHatDisplay'),
          fontSize: theme('fontSize.h1'),
          lineHeight: theme('lineHeight.tight'),
        },
        h2: {
          fontFamily: theme('fontFamily.redHatDisplay'),
          fontSize: theme('fontSize.h2'),
          lineHeight: theme('lineHeight.normal'),
        },
        body: {
          margin: '0',
          display: 'flex',
          placeItems: 'center',
          minWidth: '320px',
          minHeight: '100vh',
          overflowX: 'hidden',
        },
        button: {
          fontFamily: theme('fontFamily.redHatDisplay'),
          border: '1px solid transparent',
          padding: '0.6em 1.2em',
          fontSize: '1em',
          fontWeight: theme('fontWeight.medium'),
          cursor: 'pointer',
          transition: 'border-color 0.25s',
        }
      });
    }),
  ],
};