module.exports = {
  purge: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  darkMode: false,
  theme: {
    extend: {
      screens: {},
      colors: {
        blue: {
          100: "#F1FBFF",
          500: "#14429D",
          700: "#07577A",
          800:'rgb(0, 102, 204)'
        },
        red: {
          500: "#EB6578",
        },
        dark: {
          100: "#1F1F1F",
          120: "#121212",
          150: "#151515",
          180: "rgb(18, 18, 18)",
          200: "#2D2D2D",
          210: "#212529",
          270:'rgb(27, 27, 27)',
          310: "rgb(31, 31, 31)",
          420: "#424242",
        },
      },
      fontSize: {
        "3xl": "28px",
        min: "10px",
      },
      lineHeight: {
        "3xl": "32px",
      },
      spacing: {
        7.5: "30px",
        13: "52px",
        15: "60px",
        25: "100px",
        26: "104px",
        17: "68px",
        18: "72px",
        18.5: "74px",
        30: "120px",
        80: "320px",
        28: "112px",
      },
      width: {},
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
