/* eslint-disable sonarjs/no-identical-functions,indent,security/detect-object-injection,sonarjs/cognitive-complexity */
import React, { useLayoutEffect, useMemo, useState } from "react";
import { useAtom } from "jotai";
import { Avatar, CircularProgress } from "@mui/material";
import { toast } from "react-toastify";
import { Theme } from "@mui/material/styles";

import SearchBar from "../SearchBar";
import {
  ComponentProps,
  VTAtom,
  VtMapPinCoordinates,
  VtMapPlacesResult,
  CFCollectionLocation,
  LocationFields,
  ModalsState,
  LocationSearchIndex,
  LocationsPlacedData,
  PracticeSearchFilter,
  PracticeSearchSteps,
  PracticeSearchTypes,
  UseVtTranslateType
} from "../../@types";
import Paragraph from "../shared/Paragraph";
import ServicesFiltering from "./ServicesFiltering";
import Heading from "../shared/Heading";
import { Times } from "../../assets/icons";
import ServiceGroupAccordion from "./ServiceGroupDisplay/ServiceGroupAccordion";
import PracticeSearchGMapsInput from "./PracticeSearchGMapsInput";
import PracticeSearchSelect from "./PracticeSearchSelect";
import MobileSearchSection from "./MobileSearchSection";
import PracticeSearchMap from "./PracticeSearchMap";
import {
  getCantons,
  getNearestLocations,
  prepareStepTwoData,
  randomStringGenerator
} from "../../shared/utils";
import { ALL_CANTONS_WORD } from "../../shared/constants";
import { NextRouter } from "../../@types/next";

const PracticesSearchDrawer: React.FC<
  ComponentProps<PracticesSearchDrawerProps>
> = (props) => {
  const { t, i18n } = props.useVtTranslate("location");
  const [currentSearchStep, setCurrentSearchStep] = props.customUseAtom(
    props.currentPracticeSearchStepAtom
  );
  const [isSearchBarLoading, setIsSearchBarLoading] = useState(false);

  const [
    currentGlobalPracticeSearchFilters,
    setCurrentGlobalPracticeSearchFilters
  ] = props.customUseAtom(props.currentGlobalPracticeSearchFiltersAtom);

  const [practiceSearchType, setCurrentSearchType] = props.customUseAtom(
    props.currentPracticeSearchTypeAtom
  );

  const [, setPracticeSearchResults] = props.customUseAtom(
    props.practiceSearchResultsAtom
  );

  const inputId = useMemo(() => `search-input-${randomStringGenerator(4)}`, []);

  const [allLocations] = props.customUseAtom(props.allLocationsAtom);

  const [isLoading, setIsLoading] = props.customUseAtom(
    props.isSearchLoadingAtom
  );

  useLayoutEffect(() => {
    const input = document.getElementById(inputId);

    if (input) {
      (input as any).placeholder = "";
    }
  }, [inputId]);

  const cantons = getCantons(allLocations, t);

  const translatedAllCantonsWord =
    ALL_CANTONS_WORD[i18n?.language as "en" | "de"];

  cantons.unshift({
    displayValue: t(translatedAllCantonsWord),
    submitValue: translatedAllCantonsWord
  });

  const [selectedPlaceResult, setSelectedPlaceResult] = props.customUseAtom(
    props.selectedPlaceResultAtom
  );

  const [cantonId, setCantonId] = useState<string>(
    currentSearchStep === PracticeSearchSteps.SERVICE_AND_ANIMAL_TYPE_FILTER &&
      !selectedPlaceResult
      ? currentGlobalPracticeSearchFilters.fullTextSearch
      : ""
  );

  const [initialCantonId, setInitialCantonId] = props.customUseAtom(
    props.initialCantonIdAtom
  );

  const cantonFilter = (condition: boolean) =>
    cantonId === translatedAllCantonsWord ||
    initialCantonId === translatedAllCantonsWord ||
    initialCantonId === String(PracticeSearchTypes.FULL_TEXT)
      ? true
      : condition;

  let locationsToShow = allLocations;

  if (cantonId || initialCantonId) {
    locationsToShow = allLocations.filter((el) =>
      cantonFilter(
        el.fields.canton.sys.id === cantonId ||
          el.fields.canton.sys.id === initialCantonId
      )
    );
  }

  const [googlePacesResults, setPlacesResults] = useState<VtMapPlacesResult[]>(
    []
  );

  let displayedPins: VtMapPinCoordinates[] = [];

  if (googlePacesResults.length > 0) {
    displayedPins = googlePacesResults.map(
      (el) =>
        ({
          lat: el.geometry?.location?.lat(),
          lng: el.geometry?.location?.lng(),
          locationId: allLocations.find(
            (loc) => loc.fields.googlePlaceId === el.place_id
          )?.sys.id
        } as any)
    );
  }

  if ((cantonId || initialCantonId) && locationsToShow.length > 0) {
    displayedPins = locationsToShow.map(
      (el) =>
        ({
          lat: el.fields.address.lat,
          lng: el.fields.address.lon,
          locationId: el.sys.id
        } as any)
    );
  }

  const {
    locationsSearchIndexes,
    animalTypes,
    locationTypes,
    availableServicesGroupedTogether,
    standardServiceAnimalTypes,
    standardServiceLocationTypeKeys
  } = prepareStepTwoData(
    currentSearchStep,
    initialCantonId || cantonId,
    allLocations,
    cantonFilter,
    selectedPlaceResult
  );

  const [, setIsPracticeSearchModalDisplayed] = props.customUseAtom(
    props.isPracticeSearchModalDisplayedAtom
  );

  return (
    <div
      className={`${props.className} bg-white lg:bg-transparent max-w-[758px] w-[100vw] h-[100vh] md:h-fit`}
    >
      <div className="rounded-full bg-transparent p-[8px] flex flex-row justify-end">
        <Avatar
          variant="circular"
          className="bg-darkBlue w-[32px] h-[32px] rounded-full cursor-pointer"
          sx={{
            height: "32px",
            width: "32px",
            backgroundColor: props.muiTheme.palette.primary.main
          }}
          onClick={() => {
            setIsPracticeSearchModalDisplayed(false);
            setCurrentSearchStep(null);
          }}
        >
          <Times className="cursor-pointer text-white w-[16px] h-[16px]" />
        </Avatar>
      </div>
      <Paragraph
        type="label"
        className="lg:hidden font-[500] text-lightBlue-1.5 text-[12px] px-[20px] pt-[20px] leading-[20px]"
      >
        {t("SEARCH_PAGE.TITLE")}
      </Paragraph>
      <Heading
        text={t("SEARCH_PAGE.MODAL_YOUR_LOCATION")}
        level="h3"
        className="px-[20px] mb-[4px] lg:hidden"
      />
      <div className="w-full flex items-center justify-center">
        <SearchBar
          className="hidden lg:block text-darkBlue"
          type="DESKTOP"
          renderedOutsideHero
          isSearchMode
          {...props}
        />
      </div>
      <div className="mt-[20px] min-h-[430px] bg-white default-radius p-[24px] relative h-fit">
        {/* ------------------------- STEP 1 ----------------------------*/}
        {currentSearchStep === PracticeSearchSteps.LOCATION_NAME_FILTER && (
          <React.Fragment>
            {!isLoading && (
              <PracticeSearchGMapsInput
                onSearchClicked={(place: VtMapPlacesResult) => {
                  if (place.place_id && place.geometry?.location) {
                    setSelectedPlaceResult(place);
                    setPlacesResults([place]);
                    setCantonId(String(PracticeSearchTypes.FULL_TEXT));
                    setInitialCantonId(String(PracticeSearchTypes.FULL_TEXT));
                    setCurrentSearchType(PracticeSearchTypes.FULL_TEXT);

                    const nearestLocations = getNearestLocations(
                      {
                        lat: place.geometry.location.lat(),
                        lng: place.geometry.location.lng(),
                        location: selectedPlaceResult as VtMapPlacesResult
                      },
                      allLocations.map((el) => ({
                        lat: el.fields.address.lat,
                        lng: el.fields.address.lon,
                        location: el
                      }))
                    ).map((el) => el.location);

                    setPracticeSearchResults(nearestLocations);

                    setCurrentGlobalPracticeSearchFilters({
                      ...currentGlobalPracticeSearchFilters,
                      fullTextSearch: place.formatted_address as string
                    });

                    setCurrentSearchStep(
                      PracticeSearchSteps.SERVICE_AND_ANIMAL_TYPE_FILTER
                    );
                  } else {
                    setIsLoading(true);
                    setTimeout(() => {
                      toast(
                        t("location:SEARCH_PAGE.ENTER_KEY_PRESSED_WITH_NO_RESULTS")
                      );
                      setIsLoading(false);
                    }, 1000);
                  }
                }}
                inputId={inputId}
                onChange={(value) => {
                  if (value === "") {
                    setIsLoading(true);
                    setTimeout(() => {
                      setPlacesResults([]);
                      setIsLoading(false);
                    }, 1000);
                  }
                }}
                {...props}
              />
            )}

            {isLoading && (
              <div className="h-[96px] grid items-center justify-center">
                <CircularProgress size={15} className="" color="primary" />
              </div>
            )}

            {googlePacesResults.length === 0 && (
              <PracticeSearchSelect
                options={cantons}
                selected={
                  practiceSearchType === PracticeSearchTypes.CANTON
                    ? {
                        displayValue: t(
                          currentGlobalPracticeSearchFilters.fullTextSearch as string
                        ),
                        submitValue:
                          currentGlobalPracticeSearchFilters.fullTextSearch as string
                      }
                    : undefined
                }
                onSelectedChange={(value) => {
                  setIsLoading(true);
                  setTimeout(() => {
                    setCurrentGlobalPracticeSearchFilters({
                      ...currentGlobalPracticeSearchFilters,
                      fullTextSearch: value.submitValue
                    });
                    setCantonId(value.submitValue);
                    setInitialCantonId(value.submitValue);
                    setIsLoading(false);

                    setSelectedPlaceResult(null);
                    setPracticeSearchResults(
                      allLocations.filter((el) => {
                        if (value.submitValue === translatedAllCantonsWord) {
                          return true;
                        }

                        return el.fields.canton.sys.id === value.submitValue;
                      })
                    );
                    setCurrentSearchType(PracticeSearchTypes.CANTON);
                  }, 800);
                }}
                currentServicesFilterAtom={props.currentServicesFilterAtom}
                useVtTranslate={props.useVtTranslate}
                customUseAtom={props.customUseAtom}
              />
            )}

            {currentSearchStep === PracticeSearchSteps.LOCATION_NAME_FILTER && (
              <PracticeSearchMap
                isLoading={isLoading}
                displayedPins={displayedPins}
                {...props}
              />
            )}
          </React.Fragment>
        )}

        {/* ------------------------- STEP 2 ----------------------------*/}

        {currentSearchStep ===
          PracticeSearchSteps.SERVICE_AND_ANIMAL_TYPE_FILTER && (
          <React.Fragment>
            <ServicesFiltering
              animalTypes={animalTypes}
              availableServicesGroupedTogether={
                availableServicesGroupedTogether
              }
              locationTypes={locationTypes}
              searchIndexes={locationsSearchIndexes}
              currentServicesFilterAtom={props.currentServicesFilterAtom}
              globalLocationSearchIndexesAtom={
                props.globalLocationSearchIndexesAtom
              }
              useVtTranslate={props.useVtTranslate}
              customUseAtom={props.customUseAtom}
            />
            <div className="mt-[32px]">
              <Paragraph type="body_2" className="font-semibold text-darkBlue">
                {t("SEARCH_PAGE.SERVICES_FILTER_LABEL")}{" "}
                <span className="font-normal text-lightBlue-1.5">
                  (optional)
                </span>
              </Paragraph>
              <div className="mt-[12px]">
                {Object.keys(availableServicesGroupedTogether).map((key) => (
                  <ServiceGroupAccordion
                    serviceGroup={availableServicesGroupedTogether[key]}
                    standardServiceLocationTypeKeys={
                      standardServiceLocationTypeKeys
                    }
                    standardServiceAnimalTypes={standardServiceAnimalTypes}
                    key={Math.random()}
                    currentServicesFilterAtom={props.currentServicesFilterAtom}
                    useVtTranslate={props.useVtTranslate}
                    customUseAtom={props.customUseAtom}
                  />
                ))}
              </div>
            </div>
          </React.Fragment>
        )}

        <div
          className={`absolute w-[30px] h-[20px] bg-white top-[-15px] hidden lg:block ${
            currentSearchStep === PracticeSearchSteps.LOCATION_NAME_FILTER
              ? "left-[100px]"
              : "left-[350px]"
          }`}
          style={{
            clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)"
          }}
        >
          &nbsp;
        </div>

        <MobileSearchSection
          onSearchClicked={() => {
            setIsSearchBarLoading(true);
            setTimeout(() => {
              setIsPracticeSearchModalDisplayed(false);
              props.router.push("/locations/search-results");
            }, 500);
          }}
          onNextClicked={() => {
            setCurrentSearchStep(
              PracticeSearchSteps.SERVICE_AND_ANIMAL_TYPE_FILTER
            );
          }}
          onPreviousClicked={() => {
            setCurrentSearchStep(PracticeSearchSteps.LOCATION_NAME_FILTER);
          }}
          isLoading={isSearchBarLoading || isLoading}
          currentSearchStep={currentSearchStep}
          {...props}
        />
      </div>
    </div>
  );
};

interface PracticesSearchDrawerProps {
  allLocationsAtom: ReturnType<VTAtom<CFCollectionLocation[]>["vTAtom"]>;
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
  initialCantonIdAtom: ReturnType<VTAtom<string>["vTAtom"]>;
  isPracticeSearchModalDisplayedAtom: ReturnType<VTAtom<boolean>["vTAtom"]>;
  isSearchLoadingAtom: ReturnType<VTAtom<boolean>["vTAtom"]>;
  practiceSearchResultsAtom: ReturnType<
    VTAtom<CFCollectionLocation[]>["vTAtom"]
  >;
  selectedPlaceResultAtom: ReturnType<
    VTAtom<VtMapPlacesResult | null>["vTAtom"]
  >;
  muiTheme: Theme;
  allLocationsLoadingAtom: ReturnType<VTAtom<boolean>["vTAtom"]>;
  currentServicesFilterAtom: ReturnType<VTAtom<PracticeSearchFilter>["vTAtom"]>;
  currentlyDisplayedLocationAtom: ReturnType<
    VTAtom<LocationFields | null>["vTAtom"]
  >;
  allLocationsGPlacesDataAtom: ReturnType<
    VTAtom<LocationsPlacedData[]>["vTAtom"]
  >;
  currentModalAtom: ReturnType<VTAtom<ModalsState["currentModal"]>["vTAtom"]>;
  globalLocationSearchIndexesAtom: ReturnType<
    VTAtom<LocationSearchIndex[]>["vTAtom"]
  >;
  router: NextRouter;
  useVtTranslate: UseVtTranslateType;
  customUseAtom: typeof useAtom;
}

export default PracticesSearchDrawer;
