/** @type {import('tailwindcss').Config} */
module.exports = {
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'dark-main': '#0F172A',
        'accent-primary': '#8F0808'
      }
    }
  },
  plugins: []
};
