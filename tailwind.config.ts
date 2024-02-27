import type { Config } from "tailwindcss"

const config = {
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
	],
  theme:{
    extend:{

      fontFamily: {
        'Inknut': ['Inknut Antiqua', 'serif'],
        'Kadwa': ['Kadwa', 'serif'],
        'Inika': ['Inika', 'serif'],
      },
    }
  },
  plugins: [
    require("tailwindcss-animate"),
    require('@tailwindcss/typography'),
],
} satisfies Config

export default config