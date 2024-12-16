/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ['./projects/showcase/src/**/*.{html,ts}'],
  theme: {
    extend: {
      spacing: {
        'header-height': 'var(--header-height)',
        'content-begin': 'calc(var(--header-height) + var(--content-padding-top))',
      },
      height: {
        'vh-content': 'calc(100vh - var(--header-height) - var(--content-padding-top)',
      },
      colors: {
        primary: {
          light: 'hsl(193,100%,25%)',
          hover: 'hsla(193,100%,25%, 30%)',
          variant: {
            light: 'hsl(183,100%,18%)',
            hover: 'hsla(183,100%,18%, 30%)',
          },
        },
        secondary: {
          light: 'hsl(163,100%,25%)',
          hover: 'hsla(163,100%,25%, 30%)',
          variant: {
            light: 'hsl(153,100%,18%)',
            hover: 'hsla(153,100%,18%, 30%)',
          },
        },
        background: 'hsl(183,40%,98%)',
        surface: 'hsl(0,0%,100%)',
        error: {
          light: 'hsl(0,83%,35%)',
        },
        highlight: {
          grey: 'hsl(193,30%,90%)',
        },
        on: {
          primary: {
            light: 'hsl(0,0%,99%)',
            hover: 'hsl(0,0%,0%)',
          },
          secondary: {
            light: 'hsl(0,0%,99%)',
            hover: 'hsl(0,0%,99%)',
          },
          background: 'hsl(0,0%,0%)',
          surface: 'hsl(0,0%,0%)',
          error: 'hsl(0,0%,99%)',
          highlight: {
            grey: 'hsl(0,0%,0%)',
          },
        },
      },
    },
  },
  plugins: [],
};
