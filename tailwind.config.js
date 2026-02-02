/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      "./src/**/*.{js,jsx,ts,tsx}",
    ],
    theme: {
      extend: {
        colors: {
          'concentrix-dark': '#041E32',
          'concentrix-cyan': '#24E2CB',
          'concentrix-teal': '#007380',
        }
      },
    },
    plugins: [],
  }