/** @type {import('tailwindcss').Config} */

const { fontFamily } = require("tailwindcss/defaultTheme");

module.exports = {
  trailingSlash: true,
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
    "./app/**/*.{js,jsx}",
    "./app/p/**/*.{js,jsx}",
    "./src/**/*.{js,jsx}",
  ],
  prefix: "",
  theme: {
    screens: {
      sm: "480px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
    },
    container: {
      center: true,
      padding: "2rem",
    },
    extend: {
      fontFamily: {
        fredoka: ["Fredoka", "sans-serif"], // Add Fredoka to Tailwind
        montserrat: ["Montserrat", "sans-serif"], // Add Montserrat
        gloria: ["Gloria Hallelujah", "cursive"], // Add Gloria Hallelujah
      },

      // sans: ["var(--font-sans)", ...fontFamily.sans],

      scrollbarWidth: "none",
      scrollbarHeight: "none",
      colors: {
        purple: "#42328a",
        red: "#f05c5c",
        hoverRed: "#de4040",
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
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
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
      },

      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      animation: {
        bounce: "bounce 0.5s",
        fadeIn: "fadeIn 1s ease-in-out",
        slideUp: "slideUp 1s ease-out",
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "slide-down": "slide-down 0.5s ease-out",
        "fade-in": "fade-in 0.5s ease-out forwards",
        "slide-up": "slide-up 0.5s ease-out forwards",
        expand: "expand 0.2s ease-out forwards",
        shrink: "shrink 0.2s ease-out forwards",
        pulse: "pulse 1s ease-out infinite",
        spin: "spin 1s ease-out infinite",
        bounce: "bounce 0.5s ease-out infinite",
        animateButton: "animateButton 2s ease-in-out",
        animateArrow: "animateArrow 2s ease-in-out",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: 0 },
          "100%": { opacity: 1 },
        },
        slideUp: {
          "0%": { transform: "translateY(20px)", opacity: 0 },
          "100%": { transform: "translateY(0)", opacity: 1 },
        },
        animateButton: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(100px)" },
        },
        animateArrow: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(150px)" },
        },
        "caret-blink": {
          "0%,70%,100%": { opacity: "1" },
          "20%,50%": { opacity: "0" },
        },
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },

        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "slide-up": {
          "0%": { transform: "translateY(100%)" },
          "100%": { transform: "translateY(0)" },
        },
        "slide-down": {
          "0%": { transform: "translateY(0)" },
          "100%": { transform: "translateY(100%)" },
        },
        "fade-in": {
          "0%": { opacity: 0 },
          "100%": { opacity: 1 },
        },
        expand: {
          "0%": { height: 0 },
          "100%": { height: "var(--radix-accordion-content-height)" },
        },
        shrink: {
          "0%": { height: "var(--radix-accordion-content-height)" },
          "100%": { height: 0 },
        },
        pulse: {
          "0%, 70%, 100%": { opacity: 1 },
          "20%, 50%": { opacity: 0 },
        },
        spin: {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
        bounce: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
      },
      transitionProperty: {
        "background-color": "background-color",
        opacity: "opacity",
        transform: "transform",
      },

      transitionDuration: {
        fast: "0.2s",
        medium: "0.5s",
        slow: "1s",
        500: "500ms",
      },
      transitionTimingFunction: {
        "ease-in": "ease-in",
        "ease-out": "ease-out",
        "ease-in-out": "ease-in-out",
      },
      backgroundImage: {
        "hero-image": "url('/Images/HeroBGOurStory.svg')",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
