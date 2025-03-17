import { useTranslation } from "next-i18next";
import parse from "html-react-parser";

const useVtTranslate = (namespace = "common") => {
  const { t: translate, i18n } = useTranslation(namespace);

  const t = (key: string, options?: Record<string, any>) => {
    if(!key || key === '') return "ERROR: No key provided";
    // @ts-ignore
    return parse(translate(key, options));
  };

  return { t, i18n };
};

/* NOTE: This is built only with the assumption that the site will support only two locales.  */
export const LANGUAGE_SWITCH = (language: string) => {
  return language === "en" ? "en-US" : "de";
};

export default useVtTranslate;
