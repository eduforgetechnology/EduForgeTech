/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        'sm': '640px',
        'md': '768px',
        'tablet': '924px',  // Custom breakpoint for 767-924px range
        'lg': '1024px',
        'xl': '1280px',
        '2xl': '1536px',
      },
      colors: {
        primary: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          200: '#bae6fd',
          300: '#7dd3fc',
          400: '#38bdf8',
          500: '#0ea5e9',
          600: '#0284c7',
          700: '#0369a1',
          800: '#075985',
          900: '#0c4a6e',
          950: '#082f49',
        },
        secondary: {
          50: '#f5f3ff',
          100: '#ede9fe',
          200: '#ddd6fe',
          300: '#c4b5fd',
          400: '#a78bfa',
          500: '#8b5cf6',
          600: '#7c3aed',
          700: '#6d28d9',
          800: '#5b21b6',
          900: '#4c1d95',
          950: '#2e1065',
        },
      },
      keyframes: {
        float: {
          '0%, 100%': {
            transform: 'translateY(0)',
          },
          '50%': {
            transform: 'translateY(-10px)',
          },
        },
        shimmer: {
          '0%': {
            backgroundPosition: '200% 0'
          },
          '100%': {
            backgroundPosition: '-200% 0'
          },
        },
        glow: {
          '0%, 100%': {
            opacity: 1,
          },
          '50%': {
            opacity: 0.6,
          },
        },
        fadeIn: {
          '0%': {
            opacity: 0,
          },
          '100%': {
            opacity: 1,
          },
        },
        slideUp: {
          '0%': {
            transform: 'translateY(100px)',
            opacity: 0,
          },
          '100%': {
            transform: 'translateY(0)',
            opacity: 1,
          },
        },
        slideInLeft: {
          '0%': {
            transform: 'translateX(-100px)',
            opacity: 0,
          },
          '100%': {
            transform: 'translateX(0)',
            opacity: 1,
          },
        },
        slideInRight: {
          '0%': {
            transform: 'translateX(100px)',
            opacity: 0,
          },
          '100%': {
            transform: 'translateX(0)',
            opacity: 1,
          },
        },
        pulse: {
          '0%, 100%': {
            opacity: 1,
          },
          '50%': {
            opacity: 0.5,
          },
        },
        spin: {
          from: {
            transform: 'rotate(0deg)',
          },
          to: {
            transform: 'rotate(360deg)',
          },
        },
        'text-shimmer': {
          '0%': {
            'background-position': '0% 50%',
          },
          '50%': {
            'background-position': '100% 50%',
          },
          '100%': {
            'background-position': '0% 50%',
          },
        },
        'blur-in': {
          '0%': {
            filter: 'blur(20px)',
            opacity: 0,
          },
          '100%': {
            filter: 'blur(0)',
            opacity: 1,
          },
        },
        'fade-blur': {
          '0%': {
            filter: 'blur(5px)',
            opacity: 0,
          },
          '100%': {
            filter: 'blur(0)',
            opacity: 1,
          },
        },
      },
      animation: {
        float: 'float 6s ease-in-out infinite',
        glow: 'glow 4s ease-in-out infinite',
        'fade-in': 'fadeIn 0.5s ease-out',
        'slide-up': 'slideUp 0.7s ease-out',
        'slide-in-left': 'slideInLeft 0.7s ease-out',
        'slide-in-right': 'slideInRight 0.7s ease-out',
        pulse: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        shimmer: 'shimmer 2s infinite',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'pulse-fast': 'pulse 1s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'text-shimmer': 'text-shimmer 3s ease infinite',
        'blur-in': 'blur-in 0.6s ease-out forwards',
        'fade-blur': 'fade-blur 0.4s ease-out forwards',
      },
    },
  },
  plugins: [],
}