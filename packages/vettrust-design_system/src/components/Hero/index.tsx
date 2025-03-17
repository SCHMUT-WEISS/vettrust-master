/* eslint-disable no-use-before-define,sonarjs/cognitive-complexity,@typescript-eslint/ban-ts-ignore */
import React, { useLayoutEffect, useState } from "react";
import { useAtom } from "jotai";
import { ComponentProps, UseVtTranslateType, VTAtom } from "../../@types";
import {
  getHeroHeight,
  getHeroSectionMarginTop,
  HeroBgDesktop,
  HeroBgMobile,
  HeroShowMoreButton
} from "../../shared/utils/elements/hero";
import Section from "../shared/Section";
import SearchBar from "../SearchBar";
import { SwissFlag, SwissFlagSmall } from "../../assets/svg";
import HorizontalSurface from "./HorizontalSurface";
import { CFCollectionLocation } from "../../@types/content/CFClollectionLocation";
import {
  PracticeSearchFilter,
  PracticeSearchSteps,
  PracticeSearchTypes
} from "../../@types/atoms";
import { NextRouter } from "../../@types/next";
import { Button } from "../shared";

const Hero: React.FC<ComponentProps<HeroProps>> = ({
  className,
  bgImage,
  scrollButtonDisplayed,
  scrollButtonExtended,
  title,
  children,
  type,
  displayChildrenInSection,
  router,
  PAGES_WITH_HERO_ANIMATION,
  allLocationsAtom,
  allLocationsLoadingAtom,
  currentGlobalPracticeSearchFiltersAtom,
  currentPracticeSearchStepAtom,
  currentPracticeSearchTypeAtom,
  currentServicesFilterAtom,
  initialCantonIdAtom,
  isPracticeSearchModalDisplayedAtom,
  isSearchLoadingAtom,
  practiceSearchResultsAtom,
  useVtTranslate,
  customUseAtom,
  isSearchHidden,
  bubble
}) => {
  const { t } = useVtTranslate("about");
  const [showSearchBar, setShowSearchBar] = useState(
    !PAGES_WITH_HERO_ANIMATION.includes(router.pathname)
  );
  const [showSwissFlag, setShowSwissFlag] = useState(
    !PAGES_WITH_HERO_ANIMATION.includes(router.pathname)
  );
  const [showSection, setShowSection] = useState(
    !PAGES_WITH_HERO_ANIMATION.includes(router.pathname)
  );
  const [showButton, setShowButton] = useState(
    !PAGES_WITH_HERO_ANIMATION.includes(router.pathname)
  );

  useLayoutEffect(() => {
    if (router.pathname === "/") {
      setTimeout(() => {
        setShowButton(true);
      }, 2500);
    }
  }, [router.pathname]);

  useLayoutEffect(() => {
    setTimeout(() => {
      setShowSwissFlag(true);
    }, 500);

    setTimeout(() => {
      setShowSection(true);
    }, 1500);

    setTimeout(() => {
      setShowSearchBar(true);
    }, 2500);
  }, []);

  if (type === "HORIZONTAL") {
    return (
      <div
        className={`relative content-wrapper rounded-[12px] lg:pr-[144px] ${className} ${getHeroHeight(
          router.pathname
        )} z-[11] `}
        id="hero"
      >
        <SwissFlag
          // @ts-ignore
          className="absolute left-[30px] md:left-[48px] lg:left-[144px] z-[20] hidden lg:block"
          style={{
            animation: PAGES_WITH_HERO_ANIMATION.includes(router.pathname)
              ? "heroSwissFlag 3s ease-in-out"
              : undefined
          }}
        />

        <SwissFlagSmall
          // @ts-ignore
          className="absolute left-[30px] md:left-[48px] lg:left-[144px] z-[20] lg:hidden"
          style={{
            animation: PAGES_WITH_HERO_ANIMATION.includes(router.pathname)
              ? "heroSwissFlag 3s ease-in-out"
              : undefined
          }}
        />

        <HorizontalSurface image={bgImage}>{children}</HorizontalSurface>
      </div>
    );
  }

  return (
    <React.Fragment>
      <div
        className={`relative content-wrapper rounded-[12px] ${className} ${getHeroHeight(
          router.pathname
        )} z-[11]`}
        id="hero"
      >
        {showSwissFlag ? (
          <React.Fragment>
            <SwissFlag
              // @ts-ignore
              className="absolute left-[30px] md:left-[48px] lg:left-[144px] z-[20] hidden lg:block"
              style={{
                animation: PAGES_WITH_HERO_ANIMATION.includes(router.pathname)
                  ? "heroSwissFlag 1s ease-in-out"
                  : undefined
              }}
            />
            <SwissFlagSmall
              // @ts-ignore
              className="absolute left-[30px] md:left-[48px] lg:left-[144px] z-[20] lg:hidden"
              style={{
                animation: PAGES_WITH_HERO_ANIMATION.includes(router.pathname)
                  ? "heroSwissFlag 1s ease-in-out"
                  : undefined
              }}
            />
          </React.Fragment>
        ) : (
          ""
        )}
        <div className="relative">
          {bubble !== undefined && (
            <Button type="NONE" size="lg" className="bubble" router={router} url={bubble.url} style={{ transform: `rotate(${bubble.degree}deg)` }}>
              {bubble.text}
            </Button>
          )}
          <HeroBgMobile
            className="block lg:hidden"
            imageUrl={bgImage.smallUrl as string}
            pathName={router.pathname}
            PAGES_WITH_HERO_ANIMATION={PAGES_WITH_HERO_ANIMATION}
          />
          <HeroBgDesktop
            pathName={router.pathname}
            imageUrl={bgImage.url}
            className="hidden lg:block"
            PAGES_WITH_HERO_ANIMATION={PAGES_WITH_HERO_ANIMATION}
          />
        </div>
        <div className="flex flex-row justify-center">
          {" "}
          {showButton && (
            <HeroShowMoreButton
              scrollButtonDisplayed={scrollButtonDisplayed}
              scrollButtonExtended={scrollButtonExtended}
              pathName={router.pathname}
              router={router}
              t={t}
              PAGES_WITH_HERO_ANIMATION={PAGES_WITH_HERO_ANIMATION}
            />
          )}
          <div
            className={`${
              scrollButtonExtended ? "mt-[100px] lg:mt-[120px]" : "mt-[70px]"
            }`}
            id="scrollButton-anchor"
          >
            &nbsp;
          </div>
        </div>

        <div className="absolute z-[20] rounded-[12px] w-full bottom-0 left-0">
          {showSearchBar && !isSearchHidden && ["/", "/locations"].includes(router.pathname) && (
            <div
              className={`absolute w-full flex flex-row justify-center bottom-[-32px] lg:bottom-[-48px] z-[20] ${
                router.pathname === "/" ? "hero__search-animated" : undefined
              }`}
            >
              <SearchBar
                className="hidden lg:block"
                type="DESKTOP"
                allLocationsAtom={allLocationsAtom}
                allLocationsLoadingAtom={allLocationsLoadingAtom}
                currentGlobalPracticeSearchFiltersAtom={
                  currentGlobalPracticeSearchFiltersAtom
                }
                currentPracticeSearchStepAtom={currentPracticeSearchStepAtom}
                currentPracticeSearchTypeAtom={currentPracticeSearchTypeAtom}
                currentServicesFilterAtom={currentServicesFilterAtom}
                initialCantonIdAtom={initialCantonIdAtom}
                isPracticeSearchModalDisplayedAtom={
                  isPracticeSearchModalDisplayedAtom
                }
                isSearchLoadingAtom={isSearchLoadingAtom}
                practiceSearchResultsAtom={practiceSearchResultsAtom}
                router={router}
                useVtTranslate={useVtTranslate}
                customUseAtom={customUseAtom}
              />
              <SearchBar
                className="block lg:hidden"
                type="MOBILE"
                allLocationsAtom={allLocationsAtom}
                allLocationsLoadingAtom={allLocationsLoadingAtom}
                currentGlobalPracticeSearchFiltersAtom={
                  currentGlobalPracticeSearchFiltersAtom
                }
                currentPracticeSearchStepAtom={currentPracticeSearchStepAtom}
                currentPracticeSearchTypeAtom={currentPracticeSearchTypeAtom}
                currentServicesFilterAtom={currentServicesFilterAtom}
                initialCantonIdAtom={initialCantonIdAtom}
                isPracticeSearchModalDisplayedAtom={
                  isPracticeSearchModalDisplayedAtom
                }
                isSearchLoadingAtom={isSearchLoadingAtom}
                practiceSearchResultsAtom={practiceSearchResultsAtom}
                router={router}
                useVtTranslate={useVtTranslate}
                customUseAtom={customUseAtom}
              />
            </div>
          )}

          {showSection && displayChildrenInSection && (
            <Section
              title={{
                text: title,
                level: "h1",
                className: "text-white line-clamp-4 lg:line-clamp-2"
              }}
              backgroundColor=""
              className={`w-[calc(100%_-_60px)] md:w-[calc(100%_-_96px)] lg:w-[58%] ml-[30px] md:ml-[48px] lg:ml-[144px] ${
                router.pathname === "/" ? "hero__section-animated" : ""
              }  ${getHeroSectionMarginTop(router.pathname)}`}
            >
              {children}
            </Section>
          )}
          {!displayChildrenInSection && children && (
            <React.Fragment> {children} </React.Fragment>
          )}
        </div>
      </div>
    </React.Fragment>
  );
};

interface HeroProps {
  bgImage: {
    url: string;
    blurDataUrl: string;
    smallUrl?: string;
    alt?: string;
    className?: string;
  };
  title: string | React.ReactNode;
  className?: string;
  surfaceClassName?: string;
  sectionClassName?: string;
  scrollButtonDisplayed?: boolean;
  scrollButtonExtended?: boolean;
  type?: "FULL" | "HORIZONTAL";
  displayChildrenInSection?: boolean;
  router: NextRouter;
  PAGES_WITH_HERO_ANIMATION: string[];
  allLocationsAtom: ReturnType<VTAtom<CFCollectionLocation[]>["vTAtom"]>;
  allLocationsLoadingAtom: ReturnType<VTAtom<boolean>["vTAtom"]>;
  currentGlobalPracticeSearchFiltersAtom: ReturnType<
    VTAtom<{
      fullTextSearch: string;
      filters: string[];
    }>["vTAtom"]
  >;
  currentPracticeSearchStepAtom: ReturnType<
    VTAtom<PracticeSearchSteps | null>["vTAtom"]
  >;
  currentPracticeSearchTypeAtom: ReturnType<
    VTAtom<PracticeSearchTypes | null>["vTAtom"]
  >;
  currentServicesFilterAtom: ReturnType<VTAtom<PracticeSearchFilter>["vTAtom"]>;
  initialCantonIdAtom: ReturnType<VTAtom<string>["vTAtom"]>;
  isPracticeSearchModalDisplayedAtom: ReturnType<VTAtom<boolean>["vTAtom"]>;
  isSearchLoadingAtom: ReturnType<VTAtom<boolean>["vTAtom"]>;
  practiceSearchResultsAtom: ReturnType<
    VTAtom<CFCollectionLocation[]>["vTAtom"]
  >;
  useVtTranslate: UseVtTranslateType;
  customUseAtom: typeof useAtom;
  isSearchHidden?: boolean;
  bubble?: {
    text: string;
    degree: number;
    url: string;
  }
}

export default Hero;
export * from "./HeroNewsCard";
export * from "./HeroNewsCarrousel";
export * from "./HorizontalSurface";
export { default as HeroNewsCard } from "./HeroNewsCard";
export { default as HeroNewsCarousel } from "./HeroNewsCarrousel";
export { default as HorizontalSurface } from "./HorizontalSurface";
