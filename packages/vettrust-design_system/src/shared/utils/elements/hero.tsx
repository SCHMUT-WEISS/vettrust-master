/* eslint-disable sonarjs/no-identical-functions,indent,@typescript-eslint/no-explicit-any,react/require-default-props */
import React from "react";

import Button from "../../../components/shared/Button";
import { ChevronDown } from "../../../assets/icons";

// TODO: Move this to the main apps
export const getHeroHeight = (pathName: string) => {
  switch (pathName) {
    case "/":
      return "h-[70vh] lg:h-[640px]";

    case "/about":
      return "h-[70vh] lg:h-[640px]";

    case "/career":
      return "h-[70vh] lg:h-[640px]";

    case "/about/become-a-part-of-vettrust":
      return "h-[80vh] lg:h-[640px]";

    case "/imprint":
      return "h-[208px] lg:h-[400px]";

    case "/blog/[blog_slug]":
      return "h-[332px] lg:h-[400px] lg:min-h-[400px]";

    case "/news/[news_slug]":
      return "h-[332px] lg:h-[400px] lg:min-h-[400px]";

    case "/blog":
      return "hero__news-page";

    case "/news":
      return "hero__news-page";

    case "/data-protection":
      return "h-[208px] lg:h-[400px]";

    case "/locations":
      return "h-[70vh] lg:h-[640px]";

    case "/locations/[location_slug]":
      return "h-[70vh] lg:h-[640px]";

    case "/locations/[location_slug]/animal-rescue":
      return "h-[70vh] lg:h-[640px]";

    default:
      return "h-[70vh] lg:h-[640px]";
  }
};

export const getHeroSectionMarginTop = (pathName: string) => {
  switch (pathName) {
    case "/":
      return "hero__home";

    case "/about":
      return "hero__about";

    case "/career":
      return "hero__career";

    case "/about/become-a-part-of-vettrust":
      return "hero__become-vet";

    case "/imprint":
      return "absolute left-0 bottom-[20px] lg:bottom-[146px] text-white";

    case "/blog/[blog_slug]":
      return "absolute left-0 bottom-[20px] lg:bottom-[96px] text-white line-clamp-3";

    case "/news/[news_slug]":
      return "absolute left-0 bottom-[20px] lg:bottom-[96px] text-white line-clamp-3";
    case "/data-protection":
      return "absolute left-0 bottom-[20px] lg:bottom-[146px] text-white";

    case "/locations":
      return "hero__home";

    default:
      return "h-[400px]";
  }
};

export const getHeroBgStyle = (imageUrl: string, pathname: string, PAGES_WITH_HERO_ANIMATION: string[]) => ({
  backgroundImage: `linear-gradient(360deg, rgba(0, 0, 0, 0.3) 0%, rgba(0, 0, 0, 0) 100%), linear-gradient(90deg, rgba(0, 0, 0, 0.3) 0%, rgba(0, 0, 0, 0) 100%), url(${imageUrl})`,
  backgroundSize: "cover",
  backgroundPosition: "center",
  animation: PAGES_WITH_HERO_ANIMATION.includes(pathname)
    ? "heroImageAnimation 1s ease-in-out"
    : undefined
});

export const HeroShowMoreButton = ({
  scrollButtonDisplayed,
  scrollButtonExtended,
  t,
  pathName,
  router,
  PAGES_WITH_HERO_ANIMATION
}: {
  scrollButtonDisplayed?: boolean;
  scrollButtonExtended?: boolean;
  t: (key: string) => any;
  pathName: string;
  router: any;
  PAGES_WITH_HERO_ANIMATION: string[];
}) => {
  return scrollButtonDisplayed ? (
    <div
      className={`flex flex-row justify-center mt-[28px] absolute w-full ${
        scrollButtonExtended ? "mt-[56px] lg:mt-[76px]" : "mt-[28px]"
      }`}
      style={{
        animation: PAGES_WITH_HERO_ANIMATION.includes(pathName)
          ? "heroSwissFlag 1s ease-in-out"
          : undefined
      }}
    >
      <Button
        type="TERTIARY"
        size="lg"
        disabled={false}
        className="border-0 cursor-pointer lg:flex border-0 bouncing-button w-[84px]"
        onClick={() => {
          const heroElement = document.getElementById("scrollButton-anchor");
          // eslint-disable-next-line no-unused-expressions
          heroElement?.scrollIntoView({ behavior: "smooth", block: "start" });
        }}
        router={router}
      >
        <div className="hover:text-magenta text-lightBlue-1.5 font-[500] text-[12px] h-[36px] p-0">
          <span>
            {router.pathname === "/locations"
              ? t("common:NAVIGATION.MENU_LIST.LOCATIONS_TITTLE")
              : t("HERO.MORE")}
          </span>
          <ChevronDown className="w-[20px] h-[20px] mx-auto" />
        </div>
      </Button>
    </div>
  ) : null;
};

/*
⚠️
  Duplication is very important here because the components
  (HeroBgMobile, HeroBgDesktop) will be rendered at the same time
⚠️
*/

export const HeroBgMobile = ({
  pathName,
  imageUrl,
  className,
  PAGES_WITH_HERO_ANIMATION
}: {
  pathName: string;
  imageUrl: string;
  className: string;
  PAGES_WITH_HERO_ANIMATION: string[];
}) => {
  return (
    <div
      className={`hero__bg-image ${getHeroHeight(pathName)} ${className}`}
      style={getHeroBgStyle(imageUrl, pathName, PAGES_WITH_HERO_ANIMATION)}
    >
      &nbsp;
    </div>
  );
};

export const HeroBgDesktop = ({
  pathName,
  imageUrl,
  className,
  PAGES_WITH_HERO_ANIMATION
}: {
  pathName: string;
  imageUrl: string;
  className: string;
  PAGES_WITH_HERO_ANIMATION: string[];
}) => {
  return (
    <div
      className={`hero__bg-image ${getHeroHeight(pathName)} ${className}`}
      style={getHeroBgStyle(imageUrl, pathName, PAGES_WITH_HERO_ANIMATION)}
    >
      &nbsp;
    </div>
  );
};
