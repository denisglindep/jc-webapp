/** @type {import('tailwindcss').Config} */
export default {
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      textColor: {
        darkMode: 'white'
      },
      colors: {
        accent: '#8F0808'
      }
    }
  },
  plugins: []
};
