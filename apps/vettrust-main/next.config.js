/* eslint-disable @typescript-eslint/no-var-requires */
/** @type {import('next').NextConfig} */
const withTM = require("next-transpile-modules")([
  "@somethingcreative-agency/vettrust-design_system",
]);
const { i18n } = require("./next-i18next.config");

const TEN_MINUTES = 600;

module.exports = withTM({
  reactStrictMode: false,
  staticPageGenerationTimeout: TEN_MINUTES,
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });

    return config;
  },
  images: {
    deviceSizes: [350, 640, 768, 1024, 1440, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    domains: ["images.ctfassets.net", "unsplash.com"],
  },
  i18n,
  env: {
    MAILCHIMP_API_KEY: process.env.MAILCHIMP_API_KEY,
    MAILCHIMP_API_SERVER: process.env.MAILCHIMP_API_SERVER,
    MAILCHIMP_AUDIENCE_ID: process.env.MAILCHIMP_AUDIENCE_ID,
    CONTENTFUL_MAIN_DELIVERY_ACCESS_TOKEN:
      process.env.CONTENTFUL_MAIN_DELIVERY_ACCESS_TOKEN,
    CONTENTFUL_MAIN_SPACE_ID: process.env.CONTENTFUL_MAIN_SPACE_ID,
    GOOGLE_MAPS_API_KEY: process.env.GOOGLE_MAPS_API_KEY,
    STORE_SITE_URL: process.env.STORE_SITE_URL ?? "https://shop.vettrust.ch",
    VETTRUST_INFO_EMAIL: process.env.VETTRUST_INFO_EMAIL,
    VETTRUST_DOMAIN: process.env.VETTRUST_DOMAIN,
    PLATFORM_URLS: process.env.PLATFORM_URLS,
    STORYBLOK_ACCESS_TOKEN: process.env.STORYBLOK_ACCESS_TOKEN,
    HRS_OF_STORE: process.env.HRS_OF_STORE,
    SLACK_WEBHOOK_URL: process.env.SLACK_WEBHOOK_URL,
  }
});
