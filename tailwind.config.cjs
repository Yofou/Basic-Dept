/**@type {import("tailwindcss/tailwind-config").TailwindConfig}*/
module.exports = {
  content: ["./src/**/*.{svelte,html}"],
  theme: {
    colors: {
      pink: {
        300: "#f9cdcd",
      },
      black: {
        300: "#252422",
        full: "#000000",
      },
      white: {
        300: "#f4f4f4",
        full: "#FFFFFF"
      },
    },
    fontFamily: {
      sora: ["'Sora'", "sans-serif"],
    },
  },
  plugins: [],
}
