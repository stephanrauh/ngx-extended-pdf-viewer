/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ['./projects/showcase/src/**/*.{html,ts}'],
  theme: {
    extend: {
      spacing: {
        'header-height': 'var(--header-height)',
      },
      height: {
        'vh-wo-header': 'calc(100vh - var(--header-height))',
      },
      colors: {
        primary: {
          light: 'hsl(0,96%,89%)',
          variant: {
            light: 'hsl(329,46%,78%)',
          },
        },
        secondary: {
          light: 'hsl(193,100%,32%)',
          variant: {
            light: 'hsl(183,100%,23%)',
          },
        },
        background: '#ffffff',
        surface: '#ffffff',
        error: {
          light: 'hsl(0,83%,35%)',
        },
        on: {
          primary: {
            light: 'hsl(0,0%,12%)',
          },
          secondary: {
            light: 'hsl(0,0%,99%)',
          },
          background: 'hsl(0,0%,99%)',
          surface: 'hsl(0,0%,99%)',
          error: 'hsl(0,0%,99%)',
        },
      },
    },
  },
  plugins: [],
};
