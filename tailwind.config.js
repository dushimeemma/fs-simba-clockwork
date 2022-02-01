module.exports = {
  content: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  darkMode: false,
  theme: {
    extend: {
      dropShadow: {
        default: "0 0 0.25rem rgba(0, 0, 0, 0.25)",
        md: "0 0 0.5rem rgba(0, 0, 0, 0.25)",
        lg: "0 0 1rem rgba(0, 0, 0, 0.25)",
      },
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
      },
      colors: {
        primary: "#2F2D2D",
        secondary: "#F8F8F8",
      },
      fontSize: {
        xs: ["0.813rem", { letterSpacing: "-0.006rem", lineHeight: "1.25rem" }],
        sm: ["1.125rem", { lineHeight: "1.688rem" }],
        tiny: ["1.25rem", { lineHeight: "1.875rem" }],
        base: ["1.875rem", { lineHeight: "2.813rem" }],
        lg: ["2.5rem", { lineHeight: "3.75rem" }],
        xl: ["5rem", { letterSpacing: "-0.156rem", lineHeight: "4.813rem" }],
      },
    },
  },
  variants: {
    extend: {
      margin: ["last", "first"],
    },
  },
  plugins: [],
};
