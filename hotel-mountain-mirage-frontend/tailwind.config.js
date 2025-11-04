/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: "class", // 🌙 for future dark mode toggle
  theme: {
    extend: {
      colors: {
        brand: {
          teal: "#14B8A6", // your primary accent
          light: "#F9FAFB", // page backgrounds
          gray: "#E5E7EB", // borders, dividers
          dark: "#1F2937", // headings in dark mode
        },
        // alias for easier use
        teal: {
          400: "#38B2AC",
          500: "#14B8A6",
          600: "#0D9488",
        },
        neutral: {
          50: "#FAFAFA",
          100: "#F3F4F6",
          200: "#E5E7EB",
          800: "#1F2937",
          900: "#111827",
        },
      },

      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"], // 🧠 clean professional font
      },

      boxShadow: {
        soft: "0 4px 20px rgba(0, 0, 0, 0.05)", // subtle
        card: "0 6px 30px rgba(0, 0, 0, 0.08)", // for room cards, services, etc.
        hover: "0 8px 35px rgba(0, 0, 0, 0.12)",
      },

      animation: {
        fadeIn: "fadeIn 1.2s ease-in-out",
        slideUp: "slideUp 0.8s ease-out",
      },

      keyframes: {
        fadeIn: {
          "0%": { opacity: "0", transform: "translateY(10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        slideUp: {
          "0%": { transform: "translateY(30px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
      },

      transitionDuration: {
        400: "400ms",
        600: "600ms",
      },
    },
  },
  plugins: [],
};
