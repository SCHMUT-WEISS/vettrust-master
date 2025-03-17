/* eslint-disable security/detect-object-injection */
/** @type {import('next-sitemap').IConfig} */

const deJSON = require("./shared/constants/appSeoMetadata/de.json");
const enJSON = require("./shared/constants/appSeoMetadata/en.json");
const frJSON = require("./shared/constants/appSeoMetadata/fr.json");

const findData = url => {
  const paths = url.split("/");
  let locale = "de";
  let data = {};
  let pathName = url;

  if (paths[1] === "en") {
    locale = "en";
    pathName = url.replace("/en", "");
  } else if (paths[1] === "fr") {
    locale = "fr";
    pathName = url.replace("/fr", "");
  }

  if (locale === "en" && enJSON[pathName]) data = enJSON[pathName];
  else if (locale === "fr" && frJSON[pathName]) data = frJSON[pathName];
  else if (locale === "de" && deJSON[pathName]) data = deJSON[pathName];

  return data;
};

module.exports = {
  siteUrl: "https://vettrust.ch",
  changefreq: "daily",
  priority: 0.5,
  sitemapSize: 5000,
  generateRobotsTxt: true,
  exclude: ["/locations/search-results", "/en/locations/search-results"],
  alternateRefs: [],
  // Default transformation function
  transform: async (config, path) => {
    let { priority } = config;
    const paths = path.split("/");
    if (paths.length === 2) priority = 1;
    else if (path.includes("locations")) priority = 0.9;
    else if (path.includes("news")) priority = 0.7;
    else if (path.includes("blog")) priority = 0.6;

    const data = findData(path);

    return {
      loc: path, // => this will be exported as http(s)://<config.siteUrl>/<path>
      changefreq: null,
      priority,
      lastmod: data?.lastmod ? data.lastmod : new Date().toISOString(),
      alternateRefs: config.alternateRefs ?? [],
    };
  },
  additionalPaths: async config => [
    await config.transform(config, "/en"),
    await config.transform(config, "/en/about"),
    await config.transform(config, "/en/career"),
    await config.transform(config, "/en/global-partners"),
    await config.transform(config, "/en/become-vet"),
    await config.transform(config, "/en/blog"),
    await config.transform(config, "/en/locations"),
    await config.transform(config, "/en/news"),
  ],
  robotsTxtOptions: {
    policies: [
      {
        userAgent: "*",
        allow: "/",
      },
    ],
    additionalSitemaps: [],
  },
};
