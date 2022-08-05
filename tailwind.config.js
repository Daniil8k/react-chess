/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cell: {
          dark: '#d18b47',
          DEFAULT: '#ffce9e'
        },
        accent: '#3a38e4'
      }
    },
  },
  plugins: [],
}