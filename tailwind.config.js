/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",

    // Or if using src directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        main: {
          primary: "#facc15",
          secondary: "#f4f5f8",
          tertiary: "#222326",
          white: "#FCFCFD",
          black: "##161618",
        },
        sub: {
          "light-gray": "#ccc",
          "lighter-gray": "#eee",
          gray: "#999",
          "dark-gray": "#666",
          "darker-gray": "#333",
          black: "#000",
        },
      },
      container: {
        center: true,
        padding: {
          sm: "20px",
          md: "40px",
          xl: "100px",
          DEFAULT: "20px",
        },
      },
    },
  },
  plugins: [],
};
