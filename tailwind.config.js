const { nextui } = require("@nextui-org/react");
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: 'rgb(4, 54, 74)',
        teal: 'rgb(23, 107, 135)',
        tosca: 'rgb(100, 204, 197)',
        mint: 'rgb(218, 255, 251)',
        scrollerGrey: 'rgb(219,219,219)',
        lightGrey: 'rgb(227,227,227)',
        darkerGrey: 'rgb(200,200,200)',
        darkBlue: 'rgb(3,37,65)',
        lightBlue: 'rgb(1,180,228)',
        lighterGreen: 'rgb(192,254,207)',
        lightGreen: 'rgb(30,213,169)',
        logoGreen: 'rgb(144,206,161)',
        logoOrange: 'rgb(253,193,112)',
        logoRed: 'rgb(217,59,99)',
        accountSilver: 'rgb(149,149,149)',
        accountPink: 'rgb(234,20,140)',
        accountPurple: 'rgb(128,91,231)',
        accountGreen: 'rgb(1,210,119)',
        accountTeal: 'rgb(1,198,172)',
        accountLightBlue: '(1,180,228)',
        accountBlue: 'rgb(1,119,210)',
        accountOrange: '(rgb210,119,1)',
        accountYellow: 'rgb(210,144,1)',
        accountRed: 'rgb(212,2,66)',
      },
    },
  },
  darkMode: "class",
  plugins: [nextui()]
}