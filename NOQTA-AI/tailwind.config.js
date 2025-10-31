/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        sora: ['"Sora"', "sans-serif"],
      },
      colors: {
        nova: "#6366F1",
        azure: "#8B5CF6",
        serene: "#A78BFA",
        zenith: "#C4B5FD",
      },
      boxShadow: {
        nova: "0 0 10px rgba(99,102,241,0.4)",
      },
    },
  },
  plugins: [],
}

