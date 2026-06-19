/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        xs: "350px",
        ssm: "400px",
        laptop: "1536px",
      },
      colors: {
        background: {
          primary: '#0A0A1F',
          secondary: '#0E0E24',
        },
        accent: {
          red: {
            DEFAULT: '#E50914',
            light: '#FF1A25',
            dark: '#B20710',
          },
          orange: '#F97316',
          green: '#10B981',
          yellow: '#F59E0B',
        },
        glass: {
          card: 'rgba(255, 255, 255, 0.04)',
          'card-hover': 'rgba(255, 255, 255, 0.06)',
          border: 'rgba(255, 255, 255, 0.08)',
          'border-hover': 'rgba(255, 255, 255, 0.12)',
        },
      },
      fontFamily: {
        display: ['Righteous', 'cursive'],
        body: ['Poppins', 'sans-serif'],
      },
      boxShadow: {
        card: '0 4px 24px rgba(0, 0, 0, 0.4)',
        glow: '0 0 60px rgba(229, 9, 20, 0.15)',
      },
      transitionTimingFunction: {
        out: 'cubic-bezier(0.23, 1, 0.32, 1)',
        'in-out-custom': 'cubic-bezier(0.77, 0, 0.175, 1)',
        snappy: 'cubic-bezier(0.16, 1, 0.3, 1)',
        bounce: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'shimmer': 'shimmer 2s infinite linear',
        'fade-in-up': 'fadeInUp 0.8s ease-out',
        'stagger-fade': 'staggerFade 0.6s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        shimmer: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        staggerFade: {
          '0%': { opacity: '0', transform: 'translateY(10px) scale(0.95)' },
          '100%': { opacity: '1', transform: 'translateY(0) scale(1)' },
        }
      }
    },
  },
  plugins: [],
}
