/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./daily.html", "./src/**/*.{js,ts,jsx,tsx,html}"],
  theme: {
    extend: {
      keyframes: {
        fadeGlow: {
          '0%': { opacity: '0', color: '#a855f7', transform:'translateY(6px)' },
          '50%': { opacity: '1', textShadow: '0 0 14px #c084fc', transform:'translateY(0)' },
          '100%': { opacity: '1', color: '#fff' },
        },
        buttonPulse: {
          '0%': { boxShadow: '0 0 0px #a855f7', transform: 'scale(1)' },
          '50%': { boxShadow: '0 0 18px #a855f7', transform: 'scale(1.03)' },
          '100%': { boxShadow: '0 0 0px #a855f7', transform: 'scale(1)' }
        },
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' }
        }
      },
      animation: {
        fadeGlow: 'fadeGlow 900ms ease-in-out',
        buttonPulse: 'buttonPulse 700ms ease-in-out',
        fadeIn: 'fadeIn 800ms ease-out both'
      }
    }
  },
  plugins: []
}





