/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Roboto', 'sans-serif'],
        'open-sans': ['Open Sans', 'sans-serif'],
        serif: ['Lora', 'serif'],
        // Add more font families as needed
      },
    },
  },
  plugins: [],
};
