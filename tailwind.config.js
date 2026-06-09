export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        bg: "#0a0f1e",
        panel: "#111827",
      },
      boxShadow: {
        glow: "0 30px 120px rgba(56, 189, 248, 0.14)",
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        blink: "blink 1.2s infinite both",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-8px)" },
        },
        blink: {
          "0%, 100%": { opacity: "0.3" },
          "50%": { opacity: "1" },
        },
      },
    },
  },
  plugins: [],
};
