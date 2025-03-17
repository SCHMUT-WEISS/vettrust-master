/* eslint-disable no-use-before-define,sonarjs/no-identical-functions,react-hooks/exhaustive-deps,indent */
import { GetServerSidePropsContext, NextPage } from "next";
import { useAtom } from "jotai";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import {
  ALL_CANTONS_WORD,
  AnimalTypes,
  Button,
  CfCollectionService,
  client,
  ComponentProps,
  getContentfulLocale,
  getDeviceType,
  getFiltersDisplay,
  getFullTextSearchFilterDisplay,
  Heading,
  LocationSearchResultCard,
  LocationSearchResultsMap,
  ModalsOptions,
  PageProps,
  PracticeSearchSteps,
  PracticeSearchTypes,
  SearchBar,
  SearchEmptyState,
  Section,
  VTPlatformURLS,
} from "@somethingcreative-agency/vettrust-design_system";
import Link from "next/link";
import {
  allLocationsAtom,
  allLocationsGPlacesDataAtom,
  currentGlobalPracticeSearchFiltersAtom,
  currentPracticeSearchStepAtom,
  currentPracticeSearchTypeAtom,
  currentServicesFilterAtom,
  globalLocationSearchIndexesAtom,
  isPracticeSearchModalDisplayedAtom,
  practiceSearchResultsAtom,
} from "../../atoms/practiceSearch";
import useVtTranslate from "../../shared/utils/useVtTranslate";
import { allAtomsAndI18n } from "../../shared/utils/designSystem";
import muiTheme from "../../shared/utils/mui-theme";
import { currentModalAtom } from "../../atoms/modals";

const LocationSearchResults: NextPage<
  ComponentProps<AllLocationsPageProps>
> = ({ locale }) => {
  const { t, i18n } = useVtTranslate("location");
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [currentSearchType, setCurrentSearchType] = useAtom(
    currentPracticeSearchTypeAtom
  );
  const [, setCurrentSearchStep] = useAtom(currentPracticeSearchStepAtom);
  const [practiceSearchResults] = useAtom(practiceSearchResultsAtom);
  const [currentGlobalPracticeSearchFilters] = useAtom(
    currentGlobalPracticeSearchFiltersAtom
  );
  const [, setIsPracticeSearchModalDisplayed] = useAtom(
    isPracticeSearchModalDisplayedAtom
  );

  const [googlePlacesData] = useAtom(allLocationsGPlacesDataAtom);
  const [allLocations] = useAtom(allLocationsAtom);

  const [filters] = useAtom(currentServicesFilterAtom);
  const [globalSearchIndexes] = useAtom(globalLocationSearchIndexesAtom);
  const [, setCurrentModal] = useAtom(currentModalAtom);
  const [isTelemedicineCardDisplayed, setIsTelemedicineCardDisplayed] =
    useState(true);

  const filterResults = () => {
    // TODO: When the number of locations is considerable, please call the api at this point
    let res = globalSearchIndexes;

    const translatedAllCantonsWord =
      ALL_CANTONS_WORD[i18n.language as "en" | "de"];

    if (filters.hasStandardServices) {
      res = res.filter(searchIndex => searchIndex.hasStandardServices);
    }

    if (filters.locationTypeSearchKey) {
      res = res.filter(
        searchIndex =>
          searchIndex.location.fields.type.fields.searchKey ===
          filters.locationTypeSearchKey
      );
    }

    if (filters.animalType) {
      res = res.filter(searchIndex =>
        searchIndex.animalTypes.includes(filters.animalType as AnimalTypes)
      );
    }

    if (filters.services.length !== 0) {
      res = res.filter(searchIndex =>
        filters.services.every(service =>
          searchIndex.services.find(
            (siService: CfCollectionService) =>
              siService.sys.id === service.sys.id
          )
        )
      );
    }

    if (
      currentGlobalPracticeSearchFilters.fullTextSearch &&
      globalSearchIndexes.length === 0
    ) {
      res = allLocations
        .filter(el => {
          return (
            currentGlobalPracticeSearchFilters.fullTextSearch ===
              translatedAllCantonsWord ||
            el.fields.canton.sys.id ===
              currentGlobalPracticeSearchFilters.fullTextSearch
          );
        })
        .map(loc => ({ location: loc } as any));
    }

    return res.map(el => el.location);
  };

  const [currentOffset, setCurrentOffset] = useState(5);

  // Locations with filters already applied
  const [filteredResults] = useState(filterResults());

  const [locationsToDisplay, setLocationsToDisplay] = useState(
    filteredResults.slice(0, currentOffset)
  );

  const router = useRouter();

  useEffect(
    () => {
      if (practiceSearchResults.length === 0) {
        router.push("/").then(() => {
          setCurrentSearchType(PracticeSearchTypes.FULL_TEXT);
          setCurrentSearchStep(PracticeSearchSteps.LOCATION_NAME_FILTER);
          setIsPracticeSearchModalDisplayed(true);
          toast.warn("Please filter first");
        });
      }
    },
    // ⚠️CAUTION ⚠️: Don't update the dependency array or else it will lead to an infinite loop
    []
  );

  const filtersDisplay = getFiltersDisplay(filters).length;
  const fullTextFilterDisplay = getFullTextSearchFilterDisplay(
    currentSearchType,
    allLocations,
    currentGlobalPracticeSearchFilters
  );

  return (
    <div className="search-results-page flex flex-col lg:flex-row flex-wrap lg:gap-[48px] mt-[144px] lg:mt-[176px]">
      <div className="lg:hidden">
        <Section
          title={{
            text: t("SEARCH_PAGE.TITLE"),
            level: "h2",
          }}
          className="mb-[24px]"
        />
        <SearchBar
          router={router}
          type="MOBILE"
          className="bg-white"
          title={`${fullTextFilterDisplay} (+${
            getFiltersDisplay(filters).length
          } ${locale === "de" ? "Filter" : "Filters"})`}
          {...allAtomsAndI18n}
        />
      </div>

      <Heading
        level="h5"
        text={t("SEARCH_PAGE.MOBILE_RESULTS_NUMBER_LABEL", {
          locationsToDisplayLength: locationsToDisplay.length,
        })}
        className="mt-[40px] lg:hidden mb-[16px]"
      />

      <div className="location-search__sticky-map lg:[align-self:baseline] lg:inline-block top-[120px] lg:mb-[90px] lg:min-w-[350px] flex-auto">
        <LocationSearchResultsMap
          router={router}
          muiTheme={muiTheme as any}
          locationsToDisplay={locationsToDisplay}
          isLoading={isLoadingMore}
          {...allAtomsAndI18n}
        />
      </div>
      <div className="lg:max-w-[512px]">
        <Section
          title={{
            text: t("SEARCH_PAGE.TITLE"),
            level: "h2",
          }}
          className="hidden lg:block mb-[24px]"
        />
        <SearchBar
          router={router}
          type="MOBILE"
          className="bg-white hidden lg:flex"
          title={`${fullTextFilterDisplay} (+${filtersDisplay} ${
            locale === "de"
              ? "Filter"
              : filtersDisplay > 1
              ? "Filters"
              : "Filter"
          })`}
          {...allAtomsAndI18n}
        />

        {isTelemedicineCardDisplayed && (
          <div className="mt-[16px] p-[16px] bg-sand-pressed default-radius">
            <div>{t("SEARCH_PAGE.TELEMEDICIN_WIDGET.DESCRIPTION")}</div>
            <div className="flex mt-[12px] gap-[12px]">
              <Button
                type="PRIMARY"
                size="sm"
                router={router}
                onClick={() => {
                  setCurrentModal({
                    type: ModalsOptions.VESTORIA_WIDGET,
                    minWidth: "md",
                  });
                }}
              >
                {t("SEARCH_PAGE.TELEMEDICIN_WIDGET.ACTION_BUTTON_1")}
              </Button>
              <Button
                type="SECONDARY"
                size="sm"
                router={router}
                onClick={() => {
                  setIsTelemedicineCardDisplayed(false);
                }}
              >
                {t("SEARCH_PAGE.TELEMEDICIN_WIDGET.ACTION_BUTTON_2")}
              </Button>
            </div>
          </div>
        )}
        {locationsToDisplay.length !== 0 ? (
          <div className="pt-[24px] flex flex-col gap-[24px] mb-[128px] lg:mb-[90px]">
            {locationsToDisplay.map(location => {
              const plData = googlePlacesData.find(
                data => data?.location?.id === location.sys.id
              );
              return (
                <LocationSearchResultCard
                  Link={Link}
                  location={location}
                  key={Math.random()}
                  googlePlacesData={plData ? plData.placesData : {}}
                  router={router}
                  {...allAtomsAndI18n}
                />
              );
            })}

            {filteredResults.length > currentOffset && (
              <div className="flex flex-row justify-center mt-[49px]">
                <Button
                  type="PRIMARY"
                  size="lg"
                  className="text-[16px] mt-[24px]"
                  disabled={false}
                  iconLeft="Refresh"
                  isLoading={isLoadingMore}
                  onClick={() => {
                    setIsLoadingMore(true);
                    setTimeout(() => {
                      setIsLoadingMore(false);
                      setCurrentOffset(currentOffset + 5);
                      setLocationsToDisplay(
                        filteredResults.slice(0, currentOffset + 5)
                      );
                    }, 1000);
                  }}
                  router={router}
                >
                  {t("location:SEARCH_PAGE.LOAD_MORE")}
                </Button>
              </div>
            )}
          </div>
        ) : (
          <SearchEmptyState t={t} />
        )}
      </div>
      <div className="w-[80px] text-vtBG">.</div>
    </div>
  );
};

export async function getServerSideProps({
  locale = "de",
  req,
}: GetServerSidePropsContext) {
  const pageMeta = await client.getEntries({
    content_type: "pages__allLocations",
    include: 2,
    locale: getContentfulLocale(locale as string),
    "fields.platformUrl": VTPlatformURLS.VETTRUST,
  });

  const locations = await client.getEntries({
    content_type: "collection__locations",
    include: 3,
    locale: getContentfulLocale(locale as string),
  });

  return {
    props: {
      locale,
      deviceType: getDeviceType(req),
      ...(await serverSideTranslations(locale as string, [
        "home",
        "common",
        "about",
        "blog",
        "location",
      ])),
      locations: locations.items,
      pageMeta: pageMeta.items[0],
    },
  };
}

type AllLocationsPageProps = PageProps<
  {
    deviceType: string;
  },
  { pageMeta: any }
>;

export default LocationSearchResults;
