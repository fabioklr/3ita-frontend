/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {}
  },
  daisyui: {
    themes: [
      {
        standard: {
          "primary": "#007cbe",
          "secondary": "#d10019",
          "accent": "#e7e6e6",
          "neutral": "#44546a",
          "base-100": "#ffffff",
          "info": "#e9b400",
          "success": "#ee7f00",
          "warning": "#97a619",
        },
      },
    ],
  },
  plugins: [require("daisyui")]
};