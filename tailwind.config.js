/** @type {import('tailwindcss').Config} */
export default {
  important: true,
  content: ["./src/**/*.{css,js,vue}"],
  theme: {
    extend: {
      backgroundImage: {
        // theme: "linear-gradient(90deg, #3CACB6 0%, #8CCEAD 90%)",
        theme: "#1CBC9B",
      },
      borderColor: {
        theme: "#1CBC9B",
      },
      textColor: {
        theme: "#1CBC9B",
      },
    },
  },
  plugins: [],
};
