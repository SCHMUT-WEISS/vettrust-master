/* eslint-disable no-use-before-define */
import React from "react";
import { useAtom } from "jotai";

import Button from "../shared/Button";
import { ArrowLeft, ArrowRight } from "../../assets/icons";
import {
  ComponentProps,
  VTAtom,
  CFCollectionLocation,
  PracticeSearchSteps,
  PracticeSearchTypes,
  UseVtTranslateType
} from "../../@types";
import { ALL_CANTONS_WORD } from "../../shared/constants";
import { NextRouter } from "../../@types/next";

const MobileSearchSection: React.FC<
  ComponentProps<MobileSearchSectionProps>
> = ({
  currentSearchStep,
  isLoading,
  onSearchClicked,
  onPreviousClicked,
  onNextClicked,
  currentGlobalPracticeSearchFiltersAtom,
  initialCantonIdAtom,
  currentPracticeSearchTypeAtom,
  allLocationsLoadingAtom,
  practiceSearchResultsAtom,
  allLocationsAtom,
  isSearchLoadingAtom,
  useVtTranslate,
  router,
  customUseAtom,
}) => {
  const { t, i18n } = useVtTranslate("common");
  const [
    currentGlobalPracticeSearchFilters,
    setCurrentGlobalPracticeSearchFilters
  ] = customUseAtom(currentGlobalPracticeSearchFiltersAtom);
  const [, setInitialCantonId] = customUseAtom(initialCantonIdAtom);
  const [currentSearchType, setCurrentSearchType] = customUseAtom(
    currentPracticeSearchTypeAtom
  );
  const [practiceSearchResults, setPracticeSearchResults] = customUseAtom(
    practiceSearchResultsAtom
  );
  const [allLocations] = customUseAtom(allLocationsAtom);
  const [isSearchComponentLoading] = customUseAtom(isSearchLoadingAtom);
  const [isAllLocationsLoading] = customUseAtom(allLocationsLoadingAtom);

  const searchButtonDisabled =
    isLoading ||
    isSearchComponentLoading ||
    isAllLocationsLoading ||
    (currentSearchStep === PracticeSearchSteps.LOCATION_NAME_FILTER &&
      !currentGlobalPracticeSearchFilters.fullTextSearch);

  return (
    <div className="w-full flex items-center lg:hidden gap-[16px] mt-[28px]">
      {currentSearchStep ===
        PracticeSearchSteps.SERVICE_AND_ANIMAL_TYPE_FILTER && (
        <span>
          <Button
            type="TERTIARY"
            size="lg"
            className="h-[48px] w-[48px] rounded-full p-0 flex flex-row justify-center items-center"
            onClick={onPreviousClicked}
            disabled={isLoading}
            router={router}
          >
            <ArrowLeft className="h-[16px] w-[16px]" />
          </Button>
        </span>
      )}
      {currentSearchStep === PracticeSearchSteps.LOCATION_NAME_FILTER && (
        <span>
          <Button
            type="TERTIARY"
            size="lg"
            className="h-[48px] w-[48px] rounded-full p-0 flex flex-row justify-center items-center"
            onClick={() => {
              onNextClicked();
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
            }}
            disabled={isLoading}
            isLoading={isLoading}
            router={router}
          >
            <ArrowRight className="h-[16px] w-[16px]" />
          </Button>
        </span>
      )}
      <span className="flex-auto">
        <Button
          type="PRIMARY"
          size="lg"
          className="w-full"
          disabled={searchButtonDisabled}
          isLoading={isLoading}
          iconLeft="Search"
          focusRingClassName="ring-offset-white"
          onClick={onSearchClicked}
          router={router}
        >
          {t("common:SEARCH.BUTTON")}
        </Button>
      </span>
    </div>
  );
};

interface MobileSearchSectionProps {
  currentSearchStep: PracticeSearchSteps | null;
  onSearchClicked: () => void;
  onPreviousClicked: () => void;
  onNextClicked: () => void;
  isLoading: boolean;
  allLocationsAtom: ReturnType<VTAtom<CFCollectionLocation[]>["vTAtom"]>;
  allLocationsLoadingAtom: ReturnType<VTAtom<boolean>["vTAtom"]>;
  currentGlobalPracticeSearchFiltersAtom: ReturnType<
    VTAtom<{
      fullTextSearch: string;
      filters: string[];
    }>["vTAtom"]
  >;
  currentPracticeSearchTypeAtom: ReturnType<
    VTAtom<PracticeSearchTypes | null>["vTAtom"]
  >;
  initialCantonIdAtom: ReturnType<VTAtom<string>["vTAtom"]>;
  isSearchLoadingAtom: ReturnType<VTAtom<boolean>["vTAtom"]>;
  practiceSearchResultsAtom: ReturnType<
    VTAtom<CFCollectionLocation[]>["vTAtom"]
  >;
  useVtTranslate: UseVtTranslateType;
  router: NextRouter;
  customUseAtom: typeof useAtom;
}

export default MobileSearchSection;
