/* eslint-disable no-use-before-define,jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions,sonarjs/no-identical-functions,indent,sonarjs/cognitive-complexity */
import React, { useState } from "react";
import { useAtom } from "jotai";
import { CircularProgress } from "@mui/material";
import {
  ComponentProps,
  VTAtom,
  PracticeSearchFilter,
  PracticeSearchSteps,
  PracticeSearchTypes,
  CFCollectionLocation,
  UseVtTranslateType
} from "../@types";
import { Clipboard, MapPin, Search } from "../assets/icons";
import Paragraph from "./shared/Paragraph";
import Button from "./shared/Button";
import {
  getFiltersDisplay,
  getFullTextSearchFilterDisplay,
  getLoaderColor
} from "../shared/utils";
import { ALL_CANTONS_WORD } from "../shared/constants";
import { NextRouter } from "../@types/next";

const SearchBar: React.FC<ComponentProps<SearchbarProps>> = (props) => {
  const { t, i18n } = props.useVtTranslate("common");
  const [currentSearchStep, setCurrentSearchStep] = props.customUseAtom(
    props.currentPracticeSearchStepAtom
  );
  const [, setIsPracticeSearchModalDisplayed] = props.customUseAtom(
    props.isPracticeSearchModalDisplayedAtom
  );
  const [
    currentGlobalPracticeSearchFilters,
    setCurrentGlobalPracticeSearchFilters
  ] = props.customUseAtom(props.currentGlobalPracticeSearchFiltersAtom);

  const [animalTypeFilters] = props.customUseAtom(
    props.currentServicesFilterAtom
  );

  const [, setInitialCantonId] = props.customUseAtom(props.initialCantonIdAtom);

  const [currentSearchType, setCurrentSearchType] = props.customUseAtom(
    props.currentPracticeSearchTypeAtom
  );

  const [practiceSearchResults, setPracticeSearchResults] = props.customUseAtom(
    props.practiceSearchResultsAtom
  );
  const [allLocations] = props.customUseAtom(props.allLocationsAtom);

  const [isSearchBarLoading, setIsSearchBarLoading] = useState(false);
  const [isSearchComponentLoading] = props.customUseAtom(
    props.isSearchLoadingAtom
  );
  const [isAllLocationsLoading] = props.customUseAtom(
    props.allLocationsLoadingAtom
  );

  const searchButtonDisabled =
    isSearchComponentLoading ||
    isSearchBarLoading ||
    isAllLocationsLoading ||
    (currentSearchStep === PracticeSearchSteps.LOCATION_NAME_FILTER &&
      !currentGlobalPracticeSearchFilters.fullTextSearch);

  const filters = getFiltersDisplay(animalTypeFilters);

  const filtersDisplay = filters.length;
  const fullTextFilterDisplay = getFullTextSearchFilterDisplay(
    currentSearchType,
    allLocations,
    currentGlobalPracticeSearchFilters
  );

  if (props.type === "MOBILE") {
    return (
      <div
        className={`cursor-pointer flex flex-row items-center lg:min-w-[400px] bg-white justify-between rounded-[12px] group ${
          !props.title && "w-[calc(100%_-_60px)] md:w-[515px]"
        } p-[20px] h-[64px] ${props.className}`}
        onClick={() => {
          if (!props.isSearchMode && !isAllLocationsLoading) {
            setCurrentSearchStep(PracticeSearchSteps.LOCATION_NAME_FILTER);
            setIsPracticeSearchModalDisplayed(true);
          }
        }}
      >
        <Paragraph
          type="body_2"
          className="font-semibold text-[18px] leading-[24px] text-darkBlue group-hover:text-magenta"
        >
          {props.title || t("SEARCH.MOBILE_TITLE")}
        </Paragraph>

        <Button
          type="PRIMARY"
          size="lg"
          className="bg-darkBlue text-white h-[40px] w-[40px] rounded-full p-0 flex flex-row justify-center items-center border-darkBlue"
          disabled={isAllLocationsLoading}
          router={props.router}
        >
          {isAllLocationsLoading ? (
            <CircularProgress
              style={{ color: getLoaderColor("PRIMARY") }}
              size={15}
              className=""
            />
          ) : (
            <Search className="h-[16px] w-[16px]" />
          )}
        </Button>
      </div>
    );
  }

  return (
    <div className={`w-[758px] ${props.className}`}>
      <h2
        className={`font-[700] text-[24px] leading-[32px]  font-noto-sans-condensed ${
          props.renderedOutsideHero ? "text-darkBlue" : "text-white"
        }`}
      >
        {props.showTitleOnDesktop ? props.title : t("SEARCH.TITLE")}
      </h2>

      <div className="grid grid-cols-3 gap-[32px] h-[96px] p-[8px] text-darkBlue rounded-[12px] text-[16px] mt-[16px] bg-white">
        <div
          className={`cursor-pointer ${
            currentSearchStep === PracticeSearchSteps.LOCATION_NAME_FILTER &&
            "bg-magenta"
          } bg-opacity-[7.5%] pl-[16px] flex flex-col justify-center rounded-[8px]`}
          onClick={() => {
            if (!isSearchComponentLoading && !isAllLocationsLoading) {
              if (!props.isSearchMode) {
                setCurrentSearchStep(PracticeSearchSteps.LOCATION_NAME_FILTER);
                setIsPracticeSearchModalDisplayed(true);
              } else {
                setCurrentSearchStep(PracticeSearchSteps.LOCATION_NAME_FILTER);
              }
            }
          }}
        >
          <div>
            <Paragraph type="label" className="flex gap-[5px] font-semibold">
              <MapPin className="w-[16px] h-[16px] mt-[2px]" />{" "}
              <span className="text-[16px]">{t("SEARCH.LOCATION.TITLE")}</span>
            </Paragraph>
            <Paragraph type="body_2" className="text-[16px] truncate">
              {props.isSearchMode &&
              currentGlobalPracticeSearchFilters.fullTextSearch
                ? fullTextFilterDisplay
                : t("SEARCH.LOCATION.PLACEHOLDER")}
            </Paragraph>
          </div>
        </div>

        <div
          className={`flex flex-col justify-center ${
            props.isSearchMode && "cursor-pointer"
          } ${
            currentSearchStep ===
              PracticeSearchSteps.SERVICE_AND_ANIMAL_TYPE_FILTER &&
            "bg-magenta rounded-[8px] pl-[16px]"
          } bg-opacity-[7.5%] ${isAllLocationsLoading && "cursor-no-drop"} `}
          onClick={() => {
            if (!isSearchComponentLoading && props.isSearchMode) {
              setCurrentSearchStep(
                PracticeSearchSteps.SERVICE_AND_ANIMAL_TYPE_FILTER
              );
              if (!currentGlobalPracticeSearchFilters.fullTextSearch) {
                setInitialCantonId(
                  ALL_CANTONS_WORD[i18n?.language as "de" | "en"]
                );
                setCurrentSearchType(PracticeSearchTypes.CANTON);
                setCurrentGlobalPracticeSearchFilters({
                  ...currentGlobalPracticeSearchFilters,
                  fullTextSearch:
                    ALL_CANTONS_WORD[i18n?.language as "de" | "en"]
                });
                setPracticeSearchResults(allLocations);
              } else if (currentSearchType === PracticeSearchTypes.CANTON) {
                setInitialCantonId(
                  currentGlobalPracticeSearchFilters.fullTextSearch
                );
              } else if (practiceSearchResults.length === 0) {
                setInitialCantonId(
                  ALL_CANTONS_WORD[i18n?.language as "de" | "en"]
                );
              }
            }
          }}
        >
          <div>
            <div className="flex gap-[5px] font-semibold">
              <Clipboard className="w-[16px] h-[16px] mt-[2px]" />{" "}
              <span className="text-[16px]">{t("SEARCH.FILTER.TITLE")}</span>
            </div>
            <Paragraph type="body_2" className="text-[16px] truncate">
              {props.isSearchMode && filtersDisplay > 0
                ? ` (${filtersDisplay} ${
                    i18n?.language === "de"
                      ? "Filter"
                      : filtersDisplay > 1
                      ? "Filters"
                      : "Filter"
                  })`
                : t("SEARCH.FILTER.PLACEHOLDER")}
            </Paragraph>
          </div>
        </div>

        <div className="flex flex-row items-center justify-end pr-[16px]">
          <Button
            type="PRIMARY"
            size="lg"
            className="w-fit gtm-search-submit"
            disabled={searchButtonDisabled}
            iconLeft="Search"
            focusRingClassName="ring-offset-white"
            isLoading={
              isSearchBarLoading ||
              isSearchComponentLoading ||
              isAllLocationsLoading
            }
            onClick={() => {
              if (!props.isSearchMode) {
                setCurrentSearchStep(PracticeSearchSteps.LOCATION_NAME_FILTER);
                setIsPracticeSearchModalDisplayed(true);
              } else {
                setIsSearchBarLoading(true);
                setTimeout(() => {
                  setIsPracticeSearchModalDisplayed(false);
                  props.router.push("/locations/search-results");

                  // eslint-disable-next-line no-unused-expressions
                  // @ts-ignore
                  window?.dataLayer.push({
                    event: "formSubmissionSuccess",
                    searchCity:
                      currentSearchType === "FULL_TEXT"
                        ? fullTextFilterDisplay
                        : "",
                    searchCanton:
                      currentSearchType === "CANTON"
                        ? fullTextFilterDisplay
                        : "",
                    searchCategory: animalTypeFilters.animalType,
                    searchService: filters.reduce((services, current) => {
                      return { ...services, [current]: true };
                    }, {})
                  });
                }, 500);
              }
            }}
            router={props.router}
          >
            {t("SEARCH.BUTTON")}
          </Button>
        </div>
      </div>
    </div>
  );
};

interface SearchbarProps {
  type?: "DESKTOP" | "MOBILE";
  renderedOutsideHero?: boolean;
  isSearchMode?: boolean;
  title?: string | React.ReactNode;
  showTitleOnDesktop?: boolean;

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
  router: NextRouter;
  customUseAtom: typeof useAtom;
}

export default SearchBar;
