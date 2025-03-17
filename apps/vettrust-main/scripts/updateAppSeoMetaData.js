/* eslint-disable @typescript-eslint/no-var-requires,import/no-extraneous-dependencies,no-console,no-await-in-loop,no-restricted-syntax,security/detect-object-injection */
const { createClient } = require("contentful");
const path = require("path");
const fs = require("fs");
require("dotenv/config");

const deCommonTranslations = require("../public/locales/de/common.json");
const deLocationTranslations = require("../public/locales/de/location.json");
const deCareerTranslations = require("../public/locales/de/career.json");
const deLocationContactTranslations = require("../public/locales/de/location-contact.json");
const deBecomePartnerTranslations = require("../public/locales/de/become-vet.json");
const deHomeTranslations = require("../public/locales/de/home.json");

const enCommonTranslations = require("../public/locales/en/common.json");
const enLocationTranslations = require("../public/locales/en/location.json");
const enCareerTranslations = require("../public/locales/en/career.json");
const enLocationContactTranslations = require("../public/locales/en/location-contact.json");
const enBecomePartnerTranslations = require("../public/locales/en/become-vet.json");
const enHomeTranslations = require("../public/locales/en/home.json");

const frCommonTranslations = require("../public/locales/fr/common.json");
const frLocationTranslations = require("../public/locales/fr/location.json");
const frCareerTranslations = require("../public/locales/fr/career.json");
const frLocationContactTranslations = require("../public/locales/fr/location-contact.json");
const frBecomePartnerTranslations = require("../public/locales/fr/become-vet.json");
const frHomeTranslations = require("../public/locales/fr/home.json");

const client = createClient({
  space: process.env.CONTENTFUL_MAIN_SPACE_ID,
  accessToken: process.env.CONTENTFUL_MAIN_DELIVERY_ACCESS_TOKEN,
});

const timer = ms => new Promise(res => setTimeout(res, ms));
const formatURL = url => (url ? `https:${url}` : undefined);
const DEFAULT_VETTRUST_META_IMAGE =
  "https://assets.website-files.com/62695292ac31cd97968fa7b4/626a567107ae0558a9174bd4_VetTrust%20opengraph.png";

function getRichTextSummary(document) {
  return (
    document?.content
      ?.map(node => {
        return node.content.map(el => el.value).join(" ");
      })
      .join(" ") || ""
  );
}

const generatePriority = path => {
  const paths = path.split("/");
  if (paths.length === 2 || (paths.length === 3 && (path.includes("/en") || path.includes("/fr")))) {
    return 1;
  }
  if (path.includes("locations")) {
    return 0.9;
  }
  if (path.includes("news")) {
    return 0.7;
  }
  if (path.includes("blog")) {
    return 0.6;
  }
  return 0.5;
};

const sortPaths = (a, b) => {
  return b[1].priority - a[1].priority;
};

async function run() {
  const metaDataDE = {};
  const metaDataEN = {};
  const metaDataFR = {};

  // Home Page

  const homePagePath = "/";

  const pageMeta = await client.getEntries({
    content_type: "pages__home",
    include: 2,
    locale: "*",
    "fields.platformUrl": process.env.VETTRUST_HOST,
  });

  // DE
  metaDataDE[homePagePath] = {
    title: "VetTrust",
    description: deHomeTranslations.HERO.TITLE,
    image: formatURL(
      pageMeta?.items[0]?.fields?.heroImage?.de?.fields?.file?.de?.url
    ),
    priority: generatePriority(homePagePath),
    lastmod: pageMeta?.items[0]?.sys?.updatedAt,
  };

  // EN
  metaDataEN[homePagePath] = {
    title: "VetTrust",
    description: enHomeTranslations.HERO.TITLE,
    image: formatURL(
      pageMeta?.items[0]?.fields?.heroImage?.de?.fields?.file?.de?.url
    ),
    priority: generatePriority(homePagePath),
    lastmod: pageMeta?.items[0]?.sys?.updatedAt,
  };

  // FR
  metaDataFR[homePagePath] = {
    title: "VetTrust",
    description: frHomeTranslations.HERO.TITLE,
    image: formatURL(
      pageMeta?.items[0]?.fields?.heroImage?.de?.fields?.file?.de?.url
    ),
    priority: generatePriority(homePagePath),
    lastmod: pageMeta?.items[0]?.sys?.updatedAt,
  };

  await timer(200);

  // Imprint Page

  const imprintPagePath = "/imprint";

  const imprintPageMeta = await client.getEntries({
    content_type: "pages__imprint",
    locale: "*",
    "fields.platformUrl": process.env.VETTRUST_HOST,
  });

  // DE
  metaDataDE[imprintPagePath] = {
    title: deCommonTranslations.NAVIGATION.MENU_LIST.IMPRINT_TITTLE,
    description: `${getRichTextSummary(
      imprintPageMeta?.items[0]?.fields?.body?.de
    ).substring(0, 100)}...`,
    image: formatURL(
      imprintPageMeta?.items[0]?.fields?.heroImage?.de?.fields?.file?.de?.url
    ),
    priority: generatePriority(imprintPagePath),
    lastmod: imprintPageMeta?.items[0]?.sys?.updatedAt,
  };

  // EN
  metaDataEN[imprintPagePath] = {
    title: enCommonTranslations.NAVIGATION.MENU_LIST.IMPRINT_TITTLE,
    description: `${getRichTextSummary(
      imprintPageMeta?.items[0]?.fields?.body["en-US"]
    ).substring(0, 100)}...`,
    image: formatURL(
      imprintPageMeta?.items[0]?.fields?.heroImage?.de?.fields?.file?.de?.url
    ),
    priority: generatePriority(imprintPagePath),
    lastmod: imprintPageMeta?.items[0]?.sys?.updatedAt,
  };

  // FR
  metaDataFR[imprintPagePath] = {
    title: frCommonTranslations.NAVIGATION.MENU_LIST.IMPRINT_TITTLE,
    description: `${getRichTextSummary(
      imprintPageMeta?.items[0]?.fields?.body?.fr
    ).substring(0, 100)}...`,
    image: formatURL(
      imprintPageMeta?.items[0]?.fields?.heroImage?.de?.fields?.file?.de?.url
    ),
    priority: generatePriority(imprintPagePath),
    lastmod: imprintPageMeta?.items[0]?.sys?.updatedAt,
  };

  await timer(200);

  // Privacy Page

  const privacyPagePath = "/data-protection";

  const privacyPageMeta = await client.getEntries({
    content_type: "pages__dataProtection",
    locale: "*",
    "fields.platformUrl": process.env.VETTRUST_HOST,
  });

  // DE
  metaDataDE[privacyPagePath] = {
    title: deCommonTranslations.NAVIGATION.MENU_LIST.DATA_PROTECTION_TITTLE,
    description: `${getRichTextSummary(
      privacyPageMeta?.items[0]?.fields?.body?.de
    ).substring(0, 100)}...`,
    image: formatURL(
      privacyPageMeta?.items[0]?.fields?.heroImage?.de?.fields?.file?.de?.url
    ),
    priority: generatePriority(privacyPagePath),
    lastmod: privacyPageMeta?.items[0]?.sys?.updatedAt,
  };

  // EN
  metaDataEN[privacyPagePath] = {
    title: enCommonTranslations.NAVIGATION.MENU_LIST.DATA_PROTECTION_TITTLE,
    description: `${getRichTextSummary(
      privacyPageMeta?.items[0]?.fields?.body["en-US"]
    ).substring(0, 100)}...`,
    image: formatURL(
      privacyPageMeta?.items[0]?.fields?.heroImage?.de?.fields?.file?.de?.url
    ),
    priority: generatePriority(privacyPagePath),
    lastmod: privacyPageMeta?.items[0]?.sys?.updatedAt,
  };

  // FR
  metaDataFR[privacyPagePath] = {
    title: frCommonTranslations.NAVIGATION.MENU_LIST.DATA_PROTECTION_TITTLE,
    description: `${getRichTextSummary(
      privacyPageMeta?.items[0]?.fields?.body?.fr
    ).substring(0, 100)}...`,
    image: formatURL(
      privacyPageMeta?.items[0]?.fields?.heroImage?.de?.fields?.file?.de?.url
    ),
    priority: generatePriority(privacyPagePath),
    lastmod: privacyPageMeta?.items[0]?.sys?.updatedAt,
  };

  await timer(200);

  // Global Partners Page

  const globalPartnersPagePath = "/global-partners";

  // DE
  metaDataDE[globalPartnersPagePath] = {
    title: deCommonTranslations.NAVIGATION.MENU_LIST.GLOBAL_PARTNERS_TITTLE,
    description:
      deCommonTranslations.NAVIGATION.MENU_LIST.GLOBAL_PARTNERS_DESCRIPTION,
    image: DEFAULT_VETTRUST_META_IMAGE,
    priority: generatePriority(globalPartnersPagePath),
    lastmod: pageMeta?.items[0]?.sys?.updatedAt,
  };

  // EN
  metaDataEN[globalPartnersPagePath] = {
    title: enCommonTranslations.NAVIGATION.MENU_LIST.GLOBAL_PARTNERS_TITTLE,
    description:
      enCommonTranslations.NAVIGATION.MENU_LIST.GLOBAL_PARTNERS_DESCRIPTION,
    image: DEFAULT_VETTRUST_META_IMAGE,
    priority: generatePriority(globalPartnersPagePath),
    lastmod: pageMeta?.items[0]?.sys?.updatedAt,
  };

  // FR
  metaDataFR[globalPartnersPagePath] = {
    title: frCommonTranslations.NAVIGATION.MENU_LIST.GLOBAL_PARTNERS_TITTLE,
    description:
      frCommonTranslations.NAVIGATION.MENU_LIST.GLOBAL_PARTNERS_DESCRIPTION,
    image: DEFAULT_VETTRUST_META_IMAGE,
    priority: generatePriority(globalPartnersPagePath),
    lastmod: pageMeta?.items[0]?.sys?.updatedAt,
  };

  // Career Page

  const careerPagePath = "/career";

  const careerPageMeta = await client.getEntries({
    content_type: "pages__career",
    locale: "*",
    "fields.platformUrl": process.env.VETTRUST_HOST,
  });

  // DE
  metaDataDE[careerPagePath] = {
    title: deCommonTranslations.NAVIGATION.MENU_LIST.CAREER_TITTLE,
    description: deCommonTranslations.NAVIGATION.MENU_LIST.CAREER_DESCRIPTION,
    image: formatURL(
      careerPageMeta?.items[0]?.fields?.heroImage?.de?.fields?.file?.de?.url
    ),
    priority: generatePriority(careerPagePath),
    lastmod: careerPageMeta?.items[0]?.sys?.updatedAt,
  };

  // EN
  metaDataEN[careerPagePath] = {
    title: enCommonTranslations.NAVIGATION.MENU_LIST.CAREER_TITTLE,
    description: enCommonTranslations.NAVIGATION.MENU_LIST.CAREER_DESCRIPTION,
    image: formatURL(
      careerPageMeta?.items[0]?.fields?.heroImage?.de?.fields?.file?.de?.url
    ),
    priority: generatePriority(careerPagePath),
    lastmod: careerPageMeta?.items[0]?.sys?.updatedAt,
  };

  // FR
  metaDataFR[careerPagePath] = {
    title: frCommonTranslations.NAVIGATION.MENU_LIST.CAREER_TITTLE,
    description: frCommonTranslations.NAVIGATION.MENU_LIST.CAREER_DESCRIPTION,
    image: formatURL(
      careerPageMeta?.items[0]?.fields?.heroImage?.de?.fields?.file?.de?.url
    ),
    priority: generatePriority(careerPagePath),
    lastmod: careerPageMeta?.items[0]?.sys?.updatedAt,
  };

  await timer(200);

  // News Page

  // const newsPagePath = "/news";

  // const newsPageMeta = await client.getEntries({
  //   content_type: "pages__news",
  //   locale: "*",
  //   "fields.platformUrl": process.env.VETTRUST_HOST,
  // });

  // // DE
  // metaDataDE[newsPagePath] = {
  //   title: deCommonTranslations.NAVIGATION.MENU_LIST.NEWS_TITTLE,
  //   description: deCommonTranslations.NAVIGATION.MENU_LIST.NEWS_DESCRIPTION,
  //   image: formatURL(
  //     newsPageMeta?.items[0]?.fields?.heroImage?.de?.fields?.file?.de?.url
  //   ),
  //   priority: generatePriority(newsPagePath),
  //   lastmod: newsPageMeta?.items[0]?.sys?.updatedAt,
  // };

  // // EN
  // metaDataEN[newsPagePath] = {
  //   title: enCommonTranslations.NAVIGATION.MENU_LIST.NEWS_TITTLE,
  //   description: enCommonTranslations.NAVIGATION.MENU_LIST.NEWS_DESCRIPTION,
  //   image: formatURL(
  //     newsPageMeta?.items[0]?.fields?.heroImage?.de?.fields?.file?.de?.url
  //   ),
  //   priority: generatePriority(newsPagePath),
  //   lastmod: newsPageMeta?.items[0]?.sys?.updatedAt,
  // };

  // // FR
  // metaDataFR[newsPagePath] = {
  //   title: frCommonTranslations.NAVIGATION.MENU_LIST.NEWS_TITTLE,
  //   description: frCommonTranslations.NAVIGATION.MENU_LIST.NEWS_DESCRIPTION,
  //   image: formatURL(
  //     newsPageMeta?.items[0]?.fields?.heroImage?.de?.fields?.file?.de?.url
  //   ),
  //   priority: generatePriority(newsPagePath),
  //   lastmod: newsPageMeta?.items[0]?.sys?.updatedAt,
  // };

  // await timer(200);

  // News Article Page

  const newsArticlePagePath = "/news/[news_slug]";

  const newsArticlePageMeta = await client.getEntries({
    content_type: "collection__newsArticles",
    locale: "*",
    "fields.pageUrl[in]": process.env.VETTRUST_HOST,
  });

  await Promise.all(
    newsArticlePageMeta.items.map(async newsArticle => {
      const newsArticleSlugEN = newsArticle.fields.slug["en-US"];
      const newsArticleSlugDE = newsArticle.fields.slug.de;
      const newsArticleSlugFR = newsArticle.fields.slug.fr;

      const newsArticleImage =
        newsArticle.fields?.thumbnail?.de?.fields?.file?.de?.url;

      // DE
      metaDataDE[
        newsArticlePagePath.replace("[news_slug]", newsArticleSlugDE)
      ] = {
        title: newsArticle.fields.name?.de,
        description: newsArticle?.fields?.summary?.de,
        image: formatURL(newsArticleImage),
        priority: generatePriority(newsArticlePagePath),
        lastmod: newsArticle?.sys?.updatedAt,
      };

      // EN
      metaDataEN[
        newsArticlePagePath.replace("[news_slug]", newsArticleSlugEN)
      ] = {
        title: newsArticle.fields.name["en-US"],
        description: newsArticle?.fields?.summary["en-US"],
        image: formatURL(newsArticleImage),
        priority: generatePriority(newsArticlePagePath),
        lastmod: newsArticle?.sys?.updatedAt,
      };

      // FR
      metaDataFR[
        newsArticlePagePath.replace("[news_slug]", newsArticleSlugFR)
      ] = {
        title: newsArticle.fields.name.fr,
        description: newsArticle?.fields?.summary.fr,
        image: formatURL(newsArticleImage),
        priority: generatePriority(newsArticlePagePath),
        lastmod: newsArticle?.sys?.updatedAt,
      };
    })
  );

  await timer(200);

  // Blog Page

  const blogPagePath = "/blog";

  const blogPageMeta = await client.getEntries({
    content_type: "page__animalKnowledge",
    locale: "*",
    "fields.platformUrl": process.env.VETTRUST_HOST,
  });

  // DE
  metaDataDE[blogPagePath] = {
    title: deCommonTranslations.NAVIGATION.MENU_LIST.ANIMAL_TITTLE,
    description: deCommonTranslations.NAVIGATION.MENU_LIST.ANIMAL_DESCRIPTION,
    image: formatURL(
      blogPageMeta?.items[0]?.fields?.heroImage?.de?.fields?.file?.de?.url
    ),
    priority: generatePriority(blogPagePath),
    lastmod: blogPageMeta?.items[0]?.sys?.updatedAt,
  };

  // EN
  metaDataEN[blogPagePath] = {
    title: enCommonTranslations.NAVIGATION.MENU_LIST.ANIMAL_TITTLE,
    description: enCommonTranslations.NAVIGATION.MENU_LIST.ANIMAL_DESCRIPTION,
    image: formatURL(
      blogPageMeta?.items[0]?.fields?.heroImage?.de?.fields?.file?.de?.url
    ),
    priority: generatePriority(blogPagePath),
    lastmod: blogPageMeta?.items[0]?.sys?.updatedAt,
  };

  // FR
  metaDataFR[blogPagePath] = {
    title: frCommonTranslations.NAVIGATION.MENU_LIST.ANIMAL_TITTLE,
    description: frCommonTranslations.NAVIGATION.MENU_LIST.ANIMAL_DESCRIPTION,
    image: formatURL(
      blogPageMeta?.items[0]?.fields?.heroImage?.de?.fields?.file?.de?.url
    ),
    priority: generatePriority(blogPagePath),
    lastmod: blogPageMeta?.items[0]?.sys?.updatedAt,
  };

  await timer(200);

  // News Article Page

  const blogArticlePagePath = "/blog/[blog_slug]";

  const blogArticlePageMeta = await client.getEntries({
    content_type: "collection__blogArticle",
    locale: "*",
    "fields.pageUrl[in]": process.env.VETTRUST_HOST,
  });

  await Promise.all(
    blogArticlePageMeta.items.map(async blogArticle => {
      const blogArticleSlugEN = blogArticle.fields.slug["en-US"];
      const blogArticleSlugDE = blogArticle.fields.slug.de;
      const blogArticleSlugFR = blogArticle.fields.slug.fr;

      const newsArticleImage =
        blogArticle.fields?.thumbnail?.de?.fields?.file?.de?.url;

      // DE
      metaDataDE[
        blogArticlePagePath.replace("[blog_slug]", blogArticleSlugDE)
      ] = {
        title: blogArticle.fields.name?.de,
        description: blogArticle?.fields?.summary?.de,
        image: formatURL(newsArticleImage),
        priority: generatePriority(blogArticlePagePath),
        lastmod: blogArticle?.sys?.updatedAt,
      };

      // EN
      metaDataEN[
        blogArticlePagePath.replace("[blog_slug]", blogArticleSlugEN)
      ] = {
        title: blogArticle.fields.name["en-US"],
        description: blogArticle?.fields?.summary["en-US"],
        image: formatURL(newsArticleImage),
        priority: generatePriority(blogArticlePagePath),
        lastmod: blogArticle?.sys?.updatedAt,
      };

      // FR
      metaDataFR[
        blogArticlePagePath.replace("[blog_slug]", blogArticleSlugFR)
      ] = {
        title: blogArticle.fields.name.fr,
        description: blogArticle?.fields?.summary.fr,
        image: formatURL(newsArticleImage),
        priority: generatePriority(blogArticlePagePath),
        lastmod: blogArticle?.sys?.updatedAt,
      };
    })
  );

  await timer(200);

  // Open Positions Page

  const jobsPagePath = "/jobs";

  // DE
  metaDataDE[jobsPagePath] = {
    title: `VetTrust - ${deCareerTranslations.OUR_JOB_OFFERS.TITLE}`,
    description: `VetTrust - ${deCareerTranslations.OUR_JOB_OFFERS.PARAGRAPH}`,
    image: DEFAULT_VETTRUST_META_IMAGE,
    priority: generatePriority(jobsPagePath),
    lastmod: pageMeta?.items[0]?.sys?.updatedAt,
  };

  // EN
  metaDataEN[jobsPagePath] = {
    title: `VetTrust - ${enCareerTranslations.OUR_JOB_OFFERS.TITLE}`,
    description: `VetTrust - ${enCareerTranslations.OUR_JOB_OFFERS.PARAGRAPH}`,
    image: DEFAULT_VETTRUST_META_IMAGE,
    priority: generatePriority(jobsPagePath),
    lastmod: pageMeta?.items[0]?.sys?.updatedAt,
  };

  // FR
  metaDataFR[jobsPagePath] = {
    title: `VetTrust - ${frCareerTranslations.OUR_JOB_OFFERS.TITLE}`,
    description: `VetTrust - ${frCareerTranslations.OUR_JOB_OFFERS.PARAGRAPH}`,
    image: DEFAULT_VETTRUST_META_IMAGE,
    priority: generatePriority(jobsPagePath),
    lastmod: pageMeta?.items[0]?.sys?.updatedAt,
  };

  await timer(200);

  // All Locations Page

  const locationsPagePath = "/locations";

  const locationsPageMeta = await client.getEntries({
    content_type: "pages__allLocations",
    locale: "*",
    "fields.platformUrl": process.env.VETTRUST_HOST,
  });

  // DE
  metaDataDE[locationsPagePath] = {
    title: deCommonTranslations.NAVIGATION.MENU_LIST.LOCATIONS_TITTLE,
    description:
      deCommonTranslations.NAVIGATION.MENU_LIST.LOCATIONS_DESCRIPTION,
    image: formatURL(
      locationsPageMeta?.items[0]?.fields?.heroImage?.de?.fields?.file?.de?.url
    ),
    priority: generatePriority(locationsPagePath),
    lastmod: locationsPageMeta?.items[0]?.sys?.updatedAt,
  };

  // EN
  metaDataEN[locationsPagePath] = {
    title: enCommonTranslations.NAVIGATION.MENU_LIST.LOCATIONS_TITTLE,
    description:
      enCommonTranslations.NAVIGATION.MENU_LIST.LOCATIONS_DESCRIPTION,
    image: formatURL(
      locationsPageMeta?.items[0]?.fields?.heroImage?.de?.fields?.file?.de?.url
    ),
    priority: generatePriority(locationsPagePath),
    lastmod: locationsPageMeta?.items[0]?.sys?.updatedAt,
  };

  // FR
  metaDataFR[locationsPagePath] = {
    title: frCommonTranslations.NAVIGATION.MENU_LIST.LOCATIONS_TITTLE,
    description:
      frCommonTranslations.NAVIGATION.MENU_LIST.LOCATIONS_DESCRIPTION,
    image: formatURL(
      locationsPageMeta?.items[0]?.fields?.heroImage?.de?.fields?.file?.de?.url
    ),
    priority: generatePriority(locationsPagePath),
    lastmod: locationsPageMeta?.items[0]?.sys?.updatedAt,
  };

  await timer(200);

  // Location Home Page

  const locationHomePagePath = "/locations/[location_slug]";

  const locationHomePageMeta = await client.getEntries({
    content_type: "collection__locations",
    locale: "*",
    "fields.platformUrl": process.env.VETTRUST_HOST,
  });

  await Promise.all(
    locationHomePageMeta.items.map(async location => {
      const locationSlugEN = location.fields.slug["en-US"];
      const locationSlugDE = location.fields.slug.de;
      const locationSlugFR = location.fields.slug.fr;

      const locationImage =
        location?.fields?.heroImages?.de[0]?.fields?.file?.de?.url;

      // DE
      metaDataDE[
        locationHomePagePath.replace("[location_slug]", locationSlugDE)
      ] = {
        title: location.fields.name?.de,
        description: location?.fields?.metaDescription?.de,
        image: formatURL(locationImage),
        priority: generatePriority(locationHomePagePath),
        lastmod: location?.sys?.updatedAt,
      };

      // EN
      metaDataEN[
        locationHomePagePath.replace("[location_slug]", locationSlugEN)
      ] = {
        title: location.fields.name["en-US"],
        description: location?.fields?.metaDescription["en-US"],
        image: formatURL(locationImage),
        priority: generatePriority(locationHomePagePath),
        lastmod: location?.sys?.updatedAt,
      };

      // FR
      metaDataFR[
        locationHomePagePath.replace("[location_slug]", locationSlugFR)
      ] = {
        title: location.fields.name.fr,
        description: location?.fields?.metaDescription.fr,
        image: formatURL(locationImage),
        priority: generatePriority(locationHomePagePath),
        lastmod: location?.sys?.updatedAt,
      };
    })
  );

  // Location Team Page

  const locationTeamPagePath = "/locations/[location_slug]/team";

  await Promise.all(
    locationHomePageMeta.items.map(async location => {
      const locationSlugEN = location.fields.slug["en-US"];
      const locationSlugDE = location.fields.slug.de;
      const locationSlugFR = location.fields.slug.fr;

      const locationImage =
        location?.fields?.heroImages?.de[0]?.fields?.file?.de?.url;

      // DE
      metaDataDE[
        locationTeamPagePath.replace("[location_slug]", locationSlugDE)
      ] = {
        title: `${location.fields.name?.de} - ${deLocationTranslations.TEAM_PAGE.TITLE}`,
        description: deLocationTranslations.TEAM_PAGE.DESCRIPTION,
        image: formatURL(locationImage),
        priority: generatePriority(locationTeamPagePath),
        lastmod: location?.sys?.updatedAt,
      };

      // EN
      metaDataEN[
        locationTeamPagePath.replace("[location_slug]", locationSlugEN)
      ] = {
        title: `${location.fields.name["en-US"]} - ${enLocationTranslations.TEAM_PAGE.TITLE}`,
        description: enLocationTranslations.TEAM_PAGE.DESCRIPTION,
        image: formatURL(locationImage),
        priority: generatePriority(locationTeamPagePath),
        lastmod: location?.sys?.updatedAt,
      };

      // FR
      metaDataFR[
        locationTeamPagePath.replace("[location_slug]", locationSlugFR)
      ] = {
        title: `${location.fields.name.fr} - ${frLocationTranslations.TEAM_PAGE.TITLE}`,
        description: frLocationTranslations.TEAM_PAGE.DESCRIPTION,
        image: formatURL(locationImage),
        priority: generatePriority(locationTeamPagePath),
        lastmod: location?.sys?.updatedAt,
      };
    })
  );

  // Location Services Page

  const locationServicesPagePath = "/locations/[location_slug]/services";

  await Promise.all(
    locationHomePageMeta.items.map(async location => {
      const locationSlugEN = location.fields.slug["en-US"];
      const locationSlugDE = location.fields.slug.de;
      const locationSlugFR = location.fields.slug.fr;

      const locationImage =
        location?.fields?.heroImages?.de[0]?.fields?.file?.de?.url;

      // DE
      metaDataDE[
        locationServicesPagePath.replace("[location_slug]", locationSlugDE)
      ] = {
        title: `${location.fields.name?.de} - ${deLocationTranslations.SERVICES.TITLE}`,
        description: deLocationTranslations.SERVICES.DESCRIPTION,
        image: formatURL(locationImage),
        priority: generatePriority(locationServicesPagePath),
        lastmod: location?.sys?.updatedAt,
      };

      // EN
      metaDataEN[
        locationServicesPagePath.replace("[location_slug]", locationSlugEN)
      ] = {
        title: `${location.fields.name["en-US"]} - ${enLocationTranslations.SERVICES.TITLE}`,
        description: enLocationTranslations.SERVICES.DESCRIPTION,
        image: formatURL(locationImage),
        priority: generatePriority(locationServicesPagePath),
        lastmod: location?.sys?.updatedAt,
      };

      // FR
      metaDataFR[
        locationServicesPagePath.replace("[location_slug]", locationSlugFR)
      ] = {
        title: `${location.fields.name.fr} - ${frLocationTranslations.SERVICES.TITLE}`,
        description: frLocationTranslations.SERVICES.DESCRIPTION,
        image: formatURL(locationImage),
        priority: generatePriority(locationServicesPagePath),
        lastmod: location?.sys?.updatedAt,
      };
    })
  );

  // Location For Vets Page

  const locationForVetsPagePath = "/locations/[location_slug]/for-vets";

  await Promise.all(
    locationHomePageMeta.items.map(async location => {
      const locationSlugEN = location.fields.slug["en-US"];
      const locationSlugDE = location.fields.slug.de;
      const locationSlugFR = location.fields.slug.fr;

      const locationImage =
        location?.fields?.heroImages?.de[0]?.fields?.file?.de?.url;

      // DE
      metaDataDE[
        locationForVetsPagePath.replace("[location_slug]", locationSlugDE)
      ] = {
        title: `${location.fields.name?.de} - ${deLocationContactTranslations.FOR_VETS.HEADER.TITLE}`,
        description: deLocationContactTranslations.FOR_VETS.HEADER.DESCRIPTION,
        image: formatURL(locationImage),
        priority: generatePriority(locationForVetsPagePath),
        lastmod: location?.sys?.updatedAt,
      };

      // EN
      metaDataEN[
        locationForVetsPagePath.replace("[location_slug]", locationSlugEN)
      ] = {
        title: `${location.fields.name["en-US"]} - ${enLocationContactTranslations.FOR_VETS.HEADER.TITLE}`,
        description: enLocationContactTranslations.FOR_VETS.HEADER.DESCRIPTION,
        image: formatURL(locationImage),
        priority: generatePriority(locationForVetsPagePath),
        lastmod: location?.sys?.updatedAt,
      };

      // FR
      metaDataFR[
        locationForVetsPagePath.replace("[location_slug]", locationSlugFR)
      ] = {
        title: `${location.fields.name.fr} - ${frLocationContactTranslations.FOR_VETS.HEADER.TITLE}`,
        description: frLocationContactTranslations.FOR_VETS.HEADER.DESCRIPTION,
        image: formatURL(locationImage),
        priority: generatePriority(locationForVetsPagePath),
        lastmod: location?.sys?.updatedAt,
      };
    })
  );

  // Location For Vets Page

  const locationDepartmentsPagePath = "/locations/[location_slug]/departments";

  await Promise.all(
    locationHomePageMeta.items.map(async location => {
      const locationSlugEN = location.fields.slug["en-US"];
      const locationSlugDE = location.fields.slug.de;
      const locationSlugFR = location.fields.slug.fr;

      const locationImage =
        location?.fields?.heroImages?.de[0]?.fields?.file?.de?.url;

      // DE
      metaDataDE[
        locationDepartmentsPagePath.replace("[location_slug]", locationSlugDE)
      ] = {
        title: `${location.fields.name?.de} - ${deLocationTranslations.DEPARTMENTS_PAGE.TITLE}`,
        description: deLocationTranslations.DEPARTMENTS_PAGE.DESCRIPTION,
        image: formatURL(locationImage),
        priority: generatePriority(locationDepartmentsPagePath),
        lastmod: location?.sys?.updatedAt,
      };

      // EN
      metaDataEN[
        locationDepartmentsPagePath.replace("[location_slug]", locationSlugEN)
      ] = {
        title: `${location.fields.name["en-US"]} - ${enLocationTranslations.DEPARTMENTS_PAGE.TITLE}`,
        description: enLocationTranslations.DEPARTMENTS_PAGE.DESCRIPTION,
        image: formatURL(locationImage),
        priority: generatePriority(locationDepartmentsPagePath),
        lastmod: location?.sys?.updatedAt,
      };

      // FR
      metaDataFR[
        locationDepartmentsPagePath.replace("[location_slug]", locationSlugFR)
      ] = {
        title: `${location.fields.name.fr} - ${frLocationTranslations.DEPARTMENTS_PAGE.TITLE}`,
        description: frLocationTranslations.DEPARTMENTS_PAGE.DESCRIPTION,
        image: formatURL(locationImage),
        priority: generatePriority(locationDepartmentsPagePath),
        lastmod: location?.sys?.updatedAt,
      };
    })
  );

  // Location For Vets Page

  const locationContactPagePath = "/locations/[location_slug]/contact";

  await Promise.all(
    locationHomePageMeta.items.map(async location => {
      const locationSlugEN = location.fields.slug["en-US"];
      const locationSlugDE = location.fields.slug.de;
      const locationSlugFR = location.fields.slug.fr;

      const locationImage =
        location?.fields?.heroImages?.de[0]?.fields?.file?.de?.url;

      // DE
      metaDataDE[
        locationContactPagePath.replace("[location_slug]", locationSlugDE)
      ] = {
        title: `${location.fields.name?.de} - Kontakt`,
        description: location.fields.metaDescription?.de,
        image: formatURL(locationImage),
        priority: generatePriority(locationContactPagePath),
        lastmod: location?.sys?.updatedAt,
      };

      // EN
      metaDataEN[
        locationContactPagePath.replace("[location_slug]", locationSlugEN)
      ] = {
        title: `${location.fields.name?.de} - Contact`,
        description: location.fields.metaDescription["en-US"],
        image: formatURL(locationImage),
        priority: generatePriority(locationContactPagePath),
        lastmod: location?.sys?.updatedAt,
      };

      // FR
      metaDataFR[
        locationContactPagePath.replace("[location_slug]", locationSlugFR)
      ] = {
        title: `${location.fields.name?.de} - Contact`,
        description: location.fields.metaDescription.fr,
        image: formatURL(locationImage),
        priority: generatePriority(locationContactPagePath),
        lastmod: location?.sys?.updatedAt,
      };
    })
  );

  // Location For Vets Page

  const locationAnimalRescuePagePath =
    "/locations/[location_slug]/animal-rescue";

  await Promise.all(
    locationHomePageMeta.items.map(async location => {
      const locationSlugEN = location.fields.slug["en-US"];
      const locationSlugDE = location.fields.slug.de;
      const locationSlugFR = location.fields.slug.fr;

      const locationImage =
        location?.fields?.heroImages?.de[0]?.fields?.file?.de?.url;

      // DE
      metaDataDE[
        locationAnimalRescuePagePath.replace("[location_slug]", locationSlugDE)
      ] = {
        title: `${location.fields.name?.de} - ${deLocationTranslations.ANIMAL_RESCUE.HERO.TITLE}`,
        description: deLocationTranslations.ANIMAL_RESCUE.HERO.DESCRIPTION,
        image: formatURL(locationImage),
        priority: generatePriority(locationAnimalRescuePagePath),
        lastmod: location?.sys?.updatedAt,
      };

      // EN
      metaDataEN[
        locationAnimalRescuePagePath.replace("[location_slug]", locationSlugEN)
      ] = {
        title: `${location.fields.name?.de} - ${deLocationTranslations.ANIMAL_RESCUE.HERO.TITLE}`,
        description: deLocationTranslations.ANIMAL_RESCUE.HERO.DESCRIPTION,
        image: formatURL(locationImage),
        priority: generatePriority(locationAnimalRescuePagePath),
        lastmod: location?.sys?.updatedAt,
      };

      // FR
      metaDataFR[
        locationAnimalRescuePagePath.replace("[location_slug]", locationSlugFR)
      ] = {
        title: `${location.fields.name?.fr} - ${frLocationTranslations.ANIMAL_RESCUE.HERO.TITLE}`,
        description: frLocationTranslations.ANIMAL_RESCUE.HERO.DESCRIPTION,
        image: formatURL(locationImage),
        priority: generatePriority(locationAnimalRescuePagePath),
        lastmod: location?.sys?.updatedAt,
      };
    })
  );

  await timer(200);

  // About us page

  const aboutUsPagePath = "/about";

  const aboutUsPageMeta = await client.getEntries({
    content_type: "pages__aboutUs",
    locale: "*",
    "fields.platformUrl": process.env.VETTRUST_HOST,
  });

  metaDataDE[aboutUsPagePath] = {
    title: deCommonTranslations.NAVIGATION.MENU_LIST.ABOUT_TITTLE,
    description: deCommonTranslations.NAVIGATION.MENU_LIST.ABOUT_DESCRIPTION,
    image: formatURL(
      aboutUsPageMeta?.items[0]?.fields?.heroImage?.de?.fields?.file?.de?.url
    ),
    priority: generatePriority(aboutUsPagePath),
    lastmod: aboutUsPageMeta?.sys?.updatedAt,
  };

  metaDataEN[aboutUsPagePath] = {
    title: enCommonTranslations.NAVIGATION.MENU_LIST.ABOUT_TITTLE,
    description: enCommonTranslations.NAVIGATION.MENU_LIST.ABOUT_DESCRIPTION,
    image: formatURL(
      aboutUsPageMeta?.items[0]?.fields?.heroImage?.de?.fields?.file?.de?.url
    ),
    priority: generatePriority(aboutUsPagePath),
    lastmod: aboutUsPageMeta?.sys?.updatedAt,
  };

  // FR
  metaDataFR[aboutUsPagePath] = {
    title: frCommonTranslations.NAVIGATION.MENU_LIST.ABOUT_TITTLE,
    description: frCommonTranslations.NAVIGATION.MENU_LIST.ABOUT_DESCRIPTION,
    image: formatURL(
      aboutUsPageMeta?.items[0]?.fields?.heroImage?.de?.fields?.file?.de?.url
    ),
    priority: generatePriority(aboutUsPagePath),
    lastmod: aboutUsPageMeta?.sys?.updatedAt,
  };

  // Become a vet

  const aboutBecomeVetPath = "/about/become-a-part-of-vettrust";

  const becomeVetPageMeta = await client.getEntries({
    content_type: "pages__becomeAVet",
    locale: "*",
    "fields.platformUrl": process.env.VETTRUST_HOST,
  });

  metaDataDE[aboutBecomeVetPath] = {
    title: deBecomePartnerTranslations.META.TITLE,
    description: deBecomePartnerTranslations.HERO.DESCRIPTION,
    image: formatURL(
      becomeVetPageMeta?.items[0]?.fields?.heroImage?.de?.fields?.file?.de?.url
    ),
    priority: generatePriority(aboutBecomeVetPath),
    lastmod: becomeVetPageMeta?.sys?.updatedAt,
  };

  metaDataEN[aboutBecomeVetPath] = {
    title: enBecomePartnerTranslations.META.TITLE,
    description: enBecomePartnerTranslations.HERO.DESCRIPTION,
    image: formatURL(
      becomeVetPageMeta?.items[0]?.fields?.heroImage?.de?.fields?.file?.de?.url
    ),
    priority: generatePriority(aboutBecomeVetPath),
    lastmod: becomeVetPageMeta?.sys?.updatedAt,
  };

  // FR
  metaDataFR[aboutBecomeVetPath] = {
    title: frBecomePartnerTranslations.META.TITLE,
    description: frBecomePartnerTranslations.HERO.DESCRIPTION,
    image: formatURL(
      becomeVetPageMeta?.items[0]?.fields?.heroImage?.de?.fields?.file?.de?.url
    ),
    priority: generatePriority(aboutBecomeVetPath),
    lastmod: becomeVetPageMeta?.sys?.updatedAt,
  };

  const sortedDE = Object.entries(metaDataDE).sort(sortPaths);
  const sortedEN = Object.entries(metaDataEN).sort(sortPaths);
  const sortedFR = Object.entries(metaDataFR).sort(sortPaths);

  const DE = Object.fromEntries(sortedDE);
  const EN = Object.fromEntries(sortedEN);
  const FR = Object.fromEntries(sortedFR);

  // Write to json file
  fs.writeFileSync(
    path.join(__dirname, "../shared/constants/appSeoMetadata/de.json"),
    JSON.stringify(DE, null, 2)
  );

  fs.writeFileSync(
    path.join(__dirname, "../shared/constants/appSeoMetadata/en.json"),
    JSON.stringify(EN, null, 2)
  );

  fs.writeFileSync(
    path.join(__dirname, "../shared/constants/appSeoMetadata/fr.json"),
    JSON.stringify(FR, null, 2)
  );

  console.log("--- Meta Data Generation Complete ---");
}

run();
