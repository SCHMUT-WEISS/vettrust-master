/* eslint-disable security/detect-object-injection */
import enSeoMetadata from "../constants/appSeoMetadata/en.json";
import deSeoMetadata from "../constants/appSeoMetadata/de.json";
import frSeoMetadata from "../constants/appSeoMetadata/fr.json";

interface SeoMetadata {
    [key: string]: {
        title: string;
        description: string;
        image: string;
    };
}

const getSeoMetadata = async (path: string, locale: string) => {
  if (locale === "en" && Object.keys(enSeoMetadata).includes(path)) {
    return (enSeoMetadata as SeoMetadata)[path];
  }

  if (locale === "de" && Object.keys(deSeoMetadata).includes(path)) {
    return (deSeoMetadata as SeoMetadata)[path];
  }

  if (locale === "fr" && Object.keys(frSeoMetadata).includes(path)) {
    return (frSeoMetadata as unknown as SeoMetadata)[path];
  }

  return deSeoMetadata["/"];
};

export default getSeoMetadata;