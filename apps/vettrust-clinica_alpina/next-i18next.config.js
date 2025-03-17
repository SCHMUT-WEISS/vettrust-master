/* eslint-disable @typescript-eslint/no-var-requires */
const path = require("path");

module.exports = {
  i18n: {
    locales: ["en", "de", "fr"],
    defaultLocale: "de",
    // domains: [
    //   {
    //     domain: 'localhost',
    //     defaultLocale: 'en-US'
    //   }
    // ]
  },
  localePath: path.resolve("./public/locales"),
  reloadOnPrerender: process.env.NODE_ENV === "development",
};
