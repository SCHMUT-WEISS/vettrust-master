/* eslint-disable global-require,import/no-extraneous-dependencies */
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./shared/utils/**/*.{js,ts,jsx,tsx}",
    "../../node_modules/@somethingcreative-agency/vettrust-design_system/src/components/**/*.{js,ts,jsx,tsx}",
    "../../node_modules/@somethingcreative-agency/vettrust-design_system/src/shared/utils/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Source Sans Pro", "sans-serif"],
        NotoSans: ["NotoSans", "sans-serif"],
      },
      colors: {
        light: {
          DEFAULT: "#797979",
        },
        darkBlue: {
          DEFAULT: "#132F55",
          pressed: "#103F7E",
          disabled: "rgba(19, 47, 85,  0.5)",
          hover: "#041936",
        },
        magenta: {
          DEFAULT: "#d52f89", // Magenta 1 on figma
          hover: "#990C58", // Magenta 2 on figma
          pressed: "#EB3296", // Magenta 0 on figma
          disabled: "rgba(213, 47, 137,  0.5);",
        },
        lightBlue: {
          DEFAULT: "#c0c5d0",
          hover: "#d5dbe3",
          pressed: "#3F4966",
          1.5: "#717E99",
        },
        sand: {
          DEFAULT: "#ECE3D6",
          hover: "#F7F2E9",
          pressed: "#D9CEBF",
        },
        vtGold: {
          DEFAULT: "#d3a05c",
        },
        vtGreen: {
          DEFAULT: "#358C0C",
        },
        vtBG: {
          DEFAULT: "#F2ECE1",
        },
        error: {
          DEFAULT: "#b22222",
          pressed: "#8b0000",
        },
      },
      screens: {
        xs: "375px",
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
        "2xl": "1536px",
        mdToLg: { min: "768px", max: "1023px" },
      },
      boxShadow: {
        vtCard:
          "0px 2px 8px rgba(208, 145, 29, 0.02), 0px 12px 32px rgba(208, 145, 29, 0.12)",
      },
    },
  },
  plugins: [
    function containerLarge({ addComponents }) {
      addComponents({
        ".container__large": {
          maxWidth: "100%",
          "@screen sm": {
            maxWidth: "820px",
          },
          "@screen md": {
            maxWidth: "948px",
          },
          "@screen lg": {
            maxWidth: "1460px",
          },
          "@screen xl": {
            maxWidth: "calc(100vw - 10%)",
          },
        },
      });
    },
    require("@tailwindcss/line-clamp"),
    require("@tailwindcss/typography"),
  ],
};
