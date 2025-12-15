/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'wedding-cream': '#FDFBF7',
        'wedding-green': '#4A5D45',
        'wedding-gold': '#C5A065',
        'wedding-pink': '#E8B4B8',
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'serif'],
      },
      zIndex: {
        '5': '5',
        '15': '15',
      },
    },
  },
  plugins: [],
}
