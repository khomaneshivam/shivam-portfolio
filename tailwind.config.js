/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        bg: {
          DEFAULT: '#08080a',
          elev: '#0e0e12',
          elev2: '#141419',
          elev3: '#1a1a22',
        },
        text: {
          DEFAULT: '#efebe4',
          dim: '#9a968e',
          mute: '#5d5a55',
        },
        accent: {
          DEFAULT: 'var(--accent-color, #ccff00)',
          dim: 'var(--accent-dim, rgba(204, 255, 0, 0.15))',
          glow: 'var(--accent-glow, rgba(204, 255, 0, 0.35))',
          hover: 'var(--accent-hover, #d9ff33)',
        },
        line: {
          DEFAULT: 'rgba(239, 235, 228, 0.12)',
          soft: 'rgba(239, 235, 228, 0.06)',
          strong: 'rgba(239, 235, 228, 0.22)',
        },
      },
      fontFamily: {
        display: ['"Anton"', 'sans-serif'],
        serif: ['"Instrument Serif"', 'Georgia', 'serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
        sans: ['"Inter"', 'system-ui', 'sans-serif'],
      },
      animation: {
        'marquee': 'marquee 25s linear infinite',
        'marquee-reverse': 'marquee-reverse 25s linear infinite',
        'pulse-glow': 'pulseGlow 2.5s ease-in-out infinite',
        'float': 'float 4s ease-in-out infinite',
        'scanline': 'scanline 8s linear infinite',
        'spin-slow': 'spin 20s linear infinite',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        'marquee-reverse': {
          '0%': { transform: 'translateX(-50%)' },
          '100%': { transform: 'translateX(0%)' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: '0.4', transform: 'scale(1)' },
          '50%': { opacity: '0.85', transform: 'scale(1.04)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        scanline: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(1000%)' },
        },
      },
    },
  },
  plugins: [],
}
