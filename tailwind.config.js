/** @type {import('tailwindcss').Config} */
export default {
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    theme: {
      extend: {
        keyframes: {
          motion: {
            '0%, 100%': { transform: 'translateX(0)' },
            '50%': { transform: 'translateX(10px)' },
          },
          roadAnimation: {
            '0%': { transform: 'translateX(0)' },
            '100%': { transform: 'translateX(-100%)' },
          },
        },
        animation: {
          motion: 'motion 1s linear infinite',
          roadAnimation: 'roadAnimation 1.4s linear infinite',
        },
      },
    },
    plugins: [],
  };