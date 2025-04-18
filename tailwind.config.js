/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#059669',
          light: '#34D399',
          dark: '#047857'
        },
        darkest: '#1F2937',
        dark: '#4B5563',
        medium: '#9CA3AF',
        light: '#E5E7EB',
        lightest: '#F9FAFB'
      },
      fontFamily: {
        sans: ['Pretendard Variable', '-apple-system', 'BlinkMacSystemFont', 'system-ui', 'Roboto', 'sans-serif']
      }
    },
  },
  plugins: [],
} 