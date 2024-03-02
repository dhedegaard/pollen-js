/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {},
  },
  plugins: [require('daisyui')],
  /** @type {import('daisyui').Config} */
  daisyui: {
    logs: false,
    themes: ['light'],
  },
}
