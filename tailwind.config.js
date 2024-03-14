module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Roboto']
      }
    }
  },
  daisyui: {
    themes: ['light']
  },
  plugins: [require('daisyui')]
};
