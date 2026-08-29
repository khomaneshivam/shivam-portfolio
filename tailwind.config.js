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
          DEFAULT: '#0f1420',
          elev: '#1a1f2e',
          elev2: '#242c3f',
          elev3: '#2f384f',
        },
        text: {
          DEFAULT: '#fff3e0',
          dim: '#c6beb3',
          mute: '#7a7570',
        },
        accent: {
          DEFAULT: 'var(--accent, #ff7a00)',
          rose: '#ff3d7f',
          gold: '#ffc107',
          dim: 'var(--accent-dim, rgba(255, 122, 0, 0.16))',
          glow: 'var(--accent-glow, rgba(255, 122, 0, 0.45))',
          hover: 'var(--accent-hover, #ff8f26)',
        },
        line: {
          DEFAULT: 'rgba(255, 243, 224, 0.10)',
          soft: 'rgba(255, 243, 224, 0.05)',
          strong: 'rgba(255, 243, 224, 0.22)',
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
