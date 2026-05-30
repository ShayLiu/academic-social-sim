import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: 'class',
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        academic: {
          blue: '#2563eb',
          'blue-light': '#60a5fa',
          'blue-dark': '#1d4ed8',
        },
        danger: {
          DEFAULT: '#dc2626',
          dark: '#991b1b',
          glow: '#ef4444',
        },
        mine: {
          gold: '#f59e0b',
          dark: '#b45309',
        },
        surface: {
          DEFAULT: '#0d0d1a',
          light: '#151528',
          lighter: '#1e1e38',
        },
        text: {
          primary: '#e8e8f0',
          secondary: '#9ca3af',
          muted: '#6b7280',
        },
      },
      keyframes: {
        'mine-shake': {
          '0%, 100%': { transform: 'translateX(0)' },
          '10%': { transform: 'translateX(-8px) rotate(-1deg)' },
          '20%': { transform: 'translateX(8px) rotate(1deg)' },
          '30%': { transform: 'translateX(-6px) rotate(-0.5deg)' },
          '40%': { transform: 'translateX(6px) rotate(0.5deg)' },
          '50%': { transform: 'translateX(-4px)' },
          '60%': { transform: 'translateX(4px)' },
          '70%': { transform: 'translateX(-2px)' },
          '80%': { transform: 'translateX(2px)' },
          '90%': { transform: 'translateX(-1px)' },
        },
        'pulse-danger': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.5' },
        },
        'urgency-pulse': {
          '0%, 100%': { boxShadow: '0 0 0 0 rgba(220, 38, 38, 0.4)' },
          '50%': { boxShadow: '0 0 0 8px rgba(220, 38, 38, 0)' },
        },
        'flash-red': {
          '0%': { backgroundColor: 'rgba(220, 38, 38, 0.6)' },
          '100%': { backgroundColor: 'rgba(220, 38, 38, 0)' },
        },
        heartbeat: {
          '0%, 100%': { transform: 'scale(1)' },
          '14%': { transform: 'scale(1.1)' },
          '28%': { transform: 'scale(1)' },
          '42%': { transform: 'scale(1.1)' },
          '56%': { transform: 'scale(1)' },
        },
        'glow-pulse': {
          '0%, 100%': { boxShadow: '0 0 8px rgba(59, 130, 246, 0.3)' },
          '50%': { boxShadow: '0 0 20px rgba(59, 130, 246, 0.6)' },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-4px)' },
        },
        'score-ring': {
          '0%': { strokeDashoffset: '283' },
          '100%': { strokeDashoffset: 'var(--target-offset)' },
        },
      },
      animation: {
        'mine-shake': 'mine-shake 0.6s ease-in-out',
        'pulse-danger': 'pulse-danger 1.5s ease-in-out infinite',
        'urgency-pulse': 'urgency-pulse 2s ease-in-out infinite',
        'flash-red': 'flash-red 0.5s ease-out',
        heartbeat: 'heartbeat 1.5s ease-in-out infinite',
        'glow-pulse': 'glow-pulse 2s ease-in-out infinite',
        'float': 'float 3s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
export default config
