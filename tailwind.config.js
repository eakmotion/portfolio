/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        'float': 'float 5s ease-in-out infinite',
        'pulse': 'pulse 3s ease-in-out infinite',
        'slideInLeft': 'slideInLeft 0.8s ease forwards',
        'slideInRight': 'slideInRight 0.8s ease forwards',
        'fadeInUp': 'fadeInUp 0.5s ease forwards',
      },
    },
  },
  plugins: [],
} 