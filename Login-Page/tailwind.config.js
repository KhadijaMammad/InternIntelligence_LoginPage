module.exports = {
  content: [
    "./src/**/*.{html,js,jsx}",
  ],
  theme: {
    extend: {
      animation: {
        borderGradient: "borderGradient 3s linear infinite",
      },
      keyframes: {
        borderGradient: {
          "0%": {
            borderImageSource: "linear-gradient(to right, #4C6EF5, #F84F6B, #F7A06D)",
          },
          "50%": {
            borderImageSource: "linear-gradient(to left, #4C6EF5, #F84F6B, #F7A06D)",
          },
          "100%": {
            borderImageSource: "linear-gradient(to right, #4C6EF5, #F84F6B, #F7A06D)",
          },
        },
      },
    },
  },
  plugins: [],
}
