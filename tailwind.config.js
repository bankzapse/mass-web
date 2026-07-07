/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // MASS brand — bold, appetising red
        mass: {
          50: '#FFF1F2',
          100: '#FFE0E2',
          200: '#FFC4C8',
          300: '#FF98A0',
          400: '#FB5A67',
          500: '#E4002B', // primary red
          600: '#C60023',
          700: '#A3001D',
          800: '#84061C',
          900: '#6E0B1D',
        },
        // deep ink navy for trust / ride
        ink: {
          50: '#F4F6FB',
          100: '#E6EAF4',
          200: '#C6CFE6',
          300: '#93A2CC',
          400: '#5C6FAA',
          500: '#3A4C86',
          600: '#2A3A6B',
          700: '#212E56',
          800: '#161F3B',
          900: '#0C1428',
        },
        // fresh green — "go" / success / eco
        go: {
          50: '#E9FBF2',
          100: '#C7F4DE',
          200: '#8FE9BD',
          300: '#4FD996',
          400: '#1FC47D',
          500: '#08A867',
          600: '#008554',
          700: '#026944',
          800: '#065338',
          900: '#08442F',
        },
      },
      fontFamily: {
        sans: ['Prompt', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        display: ['Kanit', 'Prompt', 'ui-sans-serif', 'sans-serif'],
      },
      boxShadow: {
        soft: '0 4px 24px -4px rgba(16, 24, 40, 0.10)',
        card: '0 8px 30px -6px rgba(16, 24, 40, 0.12)',
        lift: '0 20px 45px -12px rgba(228, 0, 43, 0.35)',
        glow: '0 0 0 4px rgba(228, 0, 43, 0.12)',
      },
      borderRadius: {
        '4xl': '2rem',
        '5xl': '2.5rem',
      },
      backgroundImage: {
        'mass-gradient': 'linear-gradient(122deg, #FF5347 0%, #E4002B 52%, #A80E37 100%)',
        'ink-gradient': 'linear-gradient(150deg, #212E56 0%, #0C1428 100%)',
        'hero-glow': 'radial-gradient(1200px 500px at 80% -10%, rgba(228,0,43,0.16), transparent 60%)',
      },
      keyframes: {
        'float-slow': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-14px)' },
        },
        'float-mid': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-9px)' },
        },
        shimmer: {
          '100%': { transform: 'translateX(100%)' },
        },
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'spin-slow': {
          to: { transform: 'rotate(360deg)' },
        },
      },
      animation: {
        'float-slow': 'float-slow 6s ease-in-out infinite',
        'float-mid': 'float-mid 4.5s ease-in-out infinite',
        shimmer: 'shimmer 2s infinite',
        'fade-up': 'fade-up 0.6s ease-out both',
        'spin-slow': 'spin-slow 18s linear infinite',
      },
    },
  },
  plugins: [],
}
