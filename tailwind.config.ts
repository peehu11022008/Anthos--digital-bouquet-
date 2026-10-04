import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        cream: '#FFFBF5',
        'cream-dark': '#F5EFE3',
        blush: '#F9C6CC',
        'blush-light': '#FDEAEC',
        'blush-dark': '#F0A0AA',
        lavender: '#D4BCFF',
        'lavender-light': '#EDE5FF',
        'lavender-dark': '#B89FE8',
        sage: '#C1D9B0',
        'sage-light': '#DFF0D0',
        'sage-dark': '#98BB82',
        butter: '#FFF0A8',
        'butter-light': '#FFFADC',
        'butter-dark': '#F0D870',
        sky: '#BDE3F5',
        'sky-light': '#DCF0FA',
        'sky-dark': '#90C8E8',
        peach: '#FFCBA4',
        'peach-light': '#FFE5D0',
        'peach-dark': '#F0AA80',
        rose: '#F4A7B9',
        'text-dark': '#3D2C2C',
        'text-soft': '#7A6060',
        'text-muted': '#B0A0A0',
      },
      fontFamily: {
        sans: ['Nunito', 'system-ui', 'sans-serif'],
        display: ['Pacifico', 'cursive'],
        handwriting: ['Caveat', 'cursive'],
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
        '4xl': '2rem',
        pill: '9999px',
      },
      boxShadow: {
        soft: '0 4px 20px rgba(180, 140, 140, 0.12)',
        'soft-lg': '0 8px 32px rgba(180, 140, 140, 0.18)',
        'soft-xl': '0 16px 48px rgba(180, 140, 140, 0.22)',
        petal: '0 2px 12px rgba(244, 167, 185, 0.25)',
      },
      animation: {
        'petal-fall': 'petalFall linear infinite',
        'float-gentle': 'floatGentle ease-in-out infinite',
        'sparkle-fade': 'sparkleFade ease-in-out infinite',
        'butterfly-drift': 'butterflyDrift ease-in-out infinite',
        'sway': 'sway ease-in-out infinite',
        'bloom-in': 'bloomIn 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) forwards',
        'fade-up': 'fadeUp 0.5s ease-out forwards',
        'fade-in': 'fadeIn 0.4s ease-out forwards',
        'scale-in': 'scaleIn 0.3s ease-out forwards',
        'slide-up': 'slideUp 0.4s ease-out forwards',
      },
      keyframes: {
        petalFall: {
          '0%': { transform: 'translateY(-20px) rotate(0deg)', opacity: '0' },
          '10%': { opacity: '1' },
          '90%': { opacity: '0.6' },
          '100%': { transform: 'translateY(100vh) rotate(360deg)', opacity: '0' },
        },
        floatGentle: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        sparkleFade: {
          '0%, 100%': { opacity: '0', transform: 'scale(0.5)' },
          '50%': { opacity: '1', transform: 'scale(1)' },
        },
        sway: {
          '0%, 100%': { transform: 'rotate(-3deg)' },
          '50%': { transform: 'rotate(3deg)' },
        },
        bloomIn: {
          '0%': { transform: 'scale(0.3)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        fadeUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.8)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(30px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
      backgroundImage: {
        'paper-lines': "repeating-linear-gradient(transparent, transparent 27px, #e8d8d8 28px)",
      },
    },
  },
  plugins: [],
}
export default config
