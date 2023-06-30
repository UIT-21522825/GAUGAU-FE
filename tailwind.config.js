/** @type {import('tailwindcss').Config} */
let theme = require("./src/theme/theme.config.js");

module.exports = {
  content: ["./src/**/*.{html,js,jsx}", "./public/index.html"],
  darkMode: "class",
  important: true,
  theme: {
    extend: {
      colors: {
        primary: '#01dbf1',
        secondary: theme.color.secondary,
        success: theme.color.success,
        warning: theme.color.warning,
        error: theme.color.error,
        info: theme.color.info,
        "text-base": theme.color.textBase,
        bgBase: theme.color.bgBase,
        white: theme.color.white,
      },
    },
    borderWidth: {
      DEFAULT: "1px",
      0: "0",
      2: "2px",
      3: "3px",
      4: "4px",
      6: "6px",
      8: "8px",
    },
    outlineWidth: {
      DEFAULT: "1px",
      0: "0",
      2: "2px",
      3: "3px",
      4: "4px",
      6: "6px",
      8: "8px",
    },
  },
};
