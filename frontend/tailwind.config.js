/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        background: '#0D0D12',
      },
      fontFamily: {
        mono: ['"JetBrains Mono"', 'monospace'],
      },
    },
  },
  plugins: [],
}
