/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ['./projects/showcase/src/**/*.{html,ts}'],
  darkMode: 'selector',
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
          dark: 'hsl(193,50%,60%)',
          hover: {
            DEFAULT: 'hsla(193,100%,25%, 30%)',
            dark: 'hsla(193,100%,20%, 90%)',
          },
          variant: {
            light: 'hsl(183,100%,18%)',
            dark: 'hsl(183,100%,36%)',
            hover: {
              DEFAULT: 'hsla(183,100%,18%, 30%)',
              dark: 'hsla(183,100%,18%, 90%)',
            },
          },
        },
        secondary: {
          light: 'hsl(163,100%,25%)',
          dark: 'hsl(163,100%,50%)',
          hover: {
            DEFAULT: 'hsla(163,100%,25%, 30%)',
            dark: 'hsla(163,100%,15%, 90%)',
          },
          variant: {
            light: 'hsl(153,100%,18%)',
            dark: 'hsl(153,100%,36%)',
            hover: {
              DEFAULT: 'hsla(153,100%,18%, 30%)',
              dark: 'hsla(153,100%,14%, 90%)',
            },
          },
        },
        background: {
          DEFAULT: 'hsl(183,40%,98%)',
          dark: 'hsl(183,5%,10%)',
        },
        surface: {
          DEFAULT: 'hsl(0,0%,100%)',
          dark: 'hsl(0,0%,12%)',
        },
        error: {
          light: 'hsl(0,83%,35%)',
        },
        highlight: {
          grey: {
            DEFAULT: 'hsl(193,30%,90%)',
            dark: 'hsl(193,5%,20%)',
          },
        },
        on: {
          primary: {
            light: 'hsl(0,0%,99%)',
            dark: 'hsl(0,0%,0%)',
            hover: {
              DEFAULT: 'hsl(0,0%,0%)',
              dark: 'hsl(0,0%,100%)',
            },
          },
          secondary: {
            light: 'hsl(0,0%,99%)',
            dark: 'hsl(0,0%,0%)',
            hover: {
              DEFAULT: 'hsl(0,0%,99%)',
              dark: 'hsl(0,0%,100%)',
            },
          },
          background: {
            DEFAULT: 'hsl(0,0%,0%)',
            dark: 'hsl(0,0%,100%)',
          },
          surface: {
            DEFAULT: 'hsl(0,0%,0%)',
            dark: 'hsl(0,0,100%)',
          },
          error: 'hsl(0,0%,99%)',
          highlight: {
            grey: {
              DEFAULT: 'hsl(0,0%,0%)',
              dark: 'hsl(0,0%,100%)',
            },
          },
        },
      },
    },
  },
  plugins: [],
};
