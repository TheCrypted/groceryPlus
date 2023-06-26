/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "translucentWhite": "rgba(50, 50, 50, 0.5)",
        "translucentHover": "rgba(20, 20, 20, 0.6)",
        "translucentDarken": "rgba(20, 20, 20, 0.4)",
        "translucentWhiten": "rgba(220, 220, 220, 0.4)"
      }
    },
  },
  plugins: [],
}

