/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        saffron: {
          light: '#FFB870',
          DEFAULT: '#FF9933',
          dark: '#E67A00'
        },
        terracotta: {
          light: '#D87A4A',
          DEFAULT: '#C45C26',
          dark: '#934017'
        },
        cream: {
          DEFAULT: '#FFF8F0',
          dark: '#F5E6D3'
        },
        deepBrown: {
          DEFAULT: '#3B1F0A',
          light: '#5A3212'
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        serif: ['"Tiro Devanagari Hindi"', 'serif']
      },
      backgroundImage: {
        'indian-pattern': "url('data:image/svg+xml,%3Csvg width=%2760%27 height=%2760%27 viewBox=%270 0 60 60%27 xmlns=%27http://www.w3.org/2000/svg%27%3E%3Cg fill=%27none%27 fill-rule=%27evenodd%27%3E%3Cg fill=%27%23c45c26%27 fill-opacity=%270.05%27%3E%3Cpath d=%27M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z%27%3E%3C/path%3E%3C/g%3E%3C/g%3E%3C/svg%3E')",
        'mandala-pattern': "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200' viewBox='0 0 200 200'%3E%3Ccircle cx='100' cy='100' r='90' fill='none' stroke='%23C45C26' stroke-opacity='0.06' stroke-width='1'/%3E%3Ccircle cx='100' cy='100' r='70' fill='none' stroke='%23C45C26' stroke-opacity='0.05' stroke-width='1'/%3E%3Ccircle cx='100' cy='100' r='50' fill='none' stroke='%23C45C26' stroke-opacity='0.04' stroke-width='1'/%3E%3Ccircle cx='100' cy='100' r='30' fill='none' stroke='%23FF9933' stroke-opacity='0.06' stroke-width='1'/%3E%3Cpath d='M100 10 L100 190 M10 100 L190 100' stroke='%23C45C26' stroke-opacity='0.03' stroke-width='0.5'/%3E%3Cpath d='M100 10 Q140 50 190 100 Q140 150 100 190 Q60 150 10 100 Q60 50 100 10Z' fill='none' stroke='%23FF9933' stroke-opacity='0.04' stroke-width='0.8'/%3E%3Cpath d='M36.5 36.5 L163.5 163.5 M163.5 36.5 L36.5 163.5' stroke='%23C45C26' stroke-opacity='0.03' stroke-width='0.5'/%3E%3Ccircle cx='100' cy='100' r='8' fill='%23FF9933' fill-opacity='0.04'/%3E%3C/svg%3E\")"
      },
      keyframes: {
        'fade-in-up': {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' }
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' }
        },
        'slide-in-left': {
          '0%': { opacity: '0', transform: 'translateX(-32px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' }
        },
        'pulse-glow': {
          '0%, 100%': { boxShadow: '0 0 0 0 rgba(255, 153, 51, 0.4)' },
          '50%': { boxShadow: '0 0 20px 6px rgba(255, 153, 51, 0.15)' }
        }
      },
      animation: {
        'fade-in-up': 'fade-in-up 0.7s ease-out both',
        'fade-in-up-delay-1': 'fade-in-up 0.7s ease-out 0.15s both',
        'fade-in-up-delay-2': 'fade-in-up 0.7s ease-out 0.3s both',
        'fade-in-up-delay-3': 'fade-in-up 0.7s ease-out 0.45s both',
        'fade-in': 'fade-in 0.6s ease-out both',
        'fade-in-delay': 'fade-in 0.6s ease-out 0.2s both',
        'slide-in-left': 'slide-in-left 0.6s ease-out both',
        'pulse-glow': 'pulse-glow 3s ease-in-out infinite'
      }
    },
  },
  plugins: [],
}
