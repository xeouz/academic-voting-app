/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors:{
        'nred': '#D31327',
        'nblu': '#487FC2',
        'ngrn': '#5EAB5E',
        'nyel': '#FFB000',
      },
      transitionProperty: {
        'width': 'width'
      },
    },
  },
  plugins: [],
}