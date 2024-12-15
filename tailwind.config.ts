import type { Config } from 'tailwindcss'
import daisyui, { type Config as DaisyUIConfig } from 'daisyui'

export default {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {},
  },
  plugins: [daisyui],
  daisyui: {
    logs: false,
    themes: ['light'],
  } satisfies DaisyUIConfig,
} satisfies Config
