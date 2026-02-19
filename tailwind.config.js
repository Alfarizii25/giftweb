/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive) / <alpha-value>)",
          foreground: "hsl(var(--destructive-foreground) / <alpha-value>)",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        // Valentine custom colors
        pink: {
          light: '#FFB6C1',
          DEFAULT: '#FFC0CB',
          hot: '#FF69B4',
          deep: '#DB7093',
          rose: '#FF1493',
        },
        peach: {
          DEFAULT: '#FFDAB9',
          light: '#FFE4C4',
        },
        cream: {
          DEFAULT: '#FFF0F5',
          light: '#FFF5EE',
        },
      },
      fontFamily: {
        display: ['Dancing Script', 'cursive'],
        body: ['Poppins', 'sans-serif'],
      },
      borderRadius: {
        xl: "calc(var(--radius) + 4px)",
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
        xs: "calc(var(--radius) - 6px)",
        '2xl': '1rem',
        '3xl': '1.5rem',
        '4xl': '2rem',
      },
      boxShadow: {
        xs: "0 1px 2px 0 rgb(0 0 0 / 0.05)",
        'pink': '0 4px 20px rgba(255, 105, 180, 0.3)',
        'pink-lg': '0 8px 40px rgba(255, 105, 180, 0.4)',
        'peach': '0 4px 20px rgba(255, 218, 185, 0.5)',
        'romantic': '0 10px 40px rgba(255, 105, 180, 0.25), 0 4px 12px rgba(255, 182, 193, 0.3)',
        'glow': '0 0 30px rgba(255, 105, 180, 0.5)',
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "caret-blink": {
          "0%,70%,100%": { opacity: "1" },
          "20%,50%": { opacity: "0" },
        },
        "float": {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-20px)" },
        },
        "heartbeat": {
          "0%, 100%": { transform: "scale(1)" },
          "10%": { transform: "scale(1.1)" },
          "20%": { transform: "scale(1)" },
          "30%": { transform: "scale(1.15)" },
          "40%": { transform: "scale(1)" },
        },
        "pulse-glow": {
          "0%, 100%": { boxShadow: "0 0 20px rgba(255, 105, 180, 0.4)" },
          "50%": { boxShadow: "0 0 40px rgba(255, 105, 180, 0.8), 0 0 60px rgba(255, 182, 193, 0.4)" },
        },
        "slide-up": {
          "0%": { opacity: "0", transform: "translateY(30px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "slide-down": {
          "0%": { opacity: "0", transform: "translateY(-30px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "scale-in": {
          "0%": { opacity: "0", transform: "scale(0.8)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
        "bounce-in": {
          "0%": { opacity: "0", transform: "scale(0.3)" },
          "50%": { transform: "scale(1.05)" },
          "70%": { transform: "scale(0.9)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
        "spin-slow": {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
        "wiggle": {
          "0%, 100%": { transform: "rotate(-3deg)" },
          "50%": { transform: "rotate(3deg)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "caret-blink": "caret-blink 1.25s ease-out infinite",
        "float": "float 6s ease-in-out infinite",
        "heartbeat": "heartbeat 1.5s ease-in-out infinite",
        "pulse-glow": "pulse-glow 2s ease-in-out infinite",
        "slide-up": "slide-up 0.8s ease-out forwards",
        "slide-down": "slide-down 0.8s ease-out forwards",
        "fade-in": "fade-in 0.6s ease-out forwards",
        "scale-in": "scale-in 0.6s ease-out forwards",
        "bounce-in": "bounce-in 0.8s cubic-bezier(0.68, -0.55, 0.265, 1.55) forwards",
        "spin-slow": "spin-slow 20s linear infinite",
        "wiggle": "wiggle 1s ease-in-out infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}
