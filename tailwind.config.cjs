/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
    'node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      height: {
        '95v': '95vh',
      },
      colors: {
        'login-card': '#1f2937',
      },
    },
  },
  plugins: [require('@tailwindcss/forms', 'flowbite/plugin')],
};
