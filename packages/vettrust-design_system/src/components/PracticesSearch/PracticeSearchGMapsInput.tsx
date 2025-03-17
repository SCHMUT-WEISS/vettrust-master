/* eslint-disable no-use-before-define */
import React, { useMemo } from "react";
import { useAtom } from "jotai";
import debounce from "lodash/debounce";
import MapSearchInput from "../VtMap/MapSearchInput";
import { VtMapPlacesResult } from "../../@types/components/maps";
import { ComponentProps, UseVtTranslateType, VTAtom } from "../../@types";
import { PracticeSearchFilter, PracticeSearchTypes } from "../../@types/atoms";
import { CFCollectionLocation } from "../../@types/content/CFClollectionLocation";

const PracticeSearchGMapsInput: React.FC<
  ComponentProps<PracticeSearchGMapsInputProps>
> = ({
  onSearchClicked,
  onChange,
  inputId,
  currentGlobalPracticeSearchFiltersAtom,
  currentPracticeSearchTypeAtom,
  currentServicesFilterAtom,
  useVtTranslate,
  allLocationsAtom,
  customUseAtom,
}) => {
  const { t } = useVtTranslate("location");
  const [globalFilters] = customUseAtom(currentGlobalPracticeSearchFiltersAtom);
  const [practiceSearchType, setCurrentGlobalPracticeSearchFilters] = customUseAtom(
    currentPracticeSearchTypeAtom
  );
  const [, setFilters] = customUseAtom(currentServicesFilterAtom);

  const debouncedSetCurrentGlobalPracticeSearchFilters = useMemo(
    () =>
      debounce((value) => {
        setCurrentGlobalPracticeSearchFilters(value);
      }, 200),
    [setCurrentGlobalPracticeSearchFilters]
  );

  const debouncedSeFilters = useMemo(
    () =>
      debounce((value) => {
        setFilters(value);
      }, 200),
    [setFilters]
  );

  return (
    <MapSearchInput
      onSearchClicked={onSearchClicked}
      tipText="Tip Text"
      forText={inputId}
      labelKey={t("SEARCH_PAGE.MODAL_MAP_SEARCH_FIELD_LABEL")}
      placeHolder=""
      onChange={(value) => {
        debouncedSetCurrentGlobalPracticeSearchFilters({
          ...globalFilters,
          fullTextSearch: value
        });
        debouncedSeFilters({
          hasStandardServices: false,
          services: [],
          locationTypeSearchKey: "",
          animalType: ""
        });

        if (onChange) {
          onChange(value);
        }
      }}
      value={
        practiceSearchType === PracticeSearchTypes.FULL_TEXT
          ? (globalFilters.fullTextSearch as string)
          : undefined
      }
      autoFocus
      allLocationsAtom={allLocationsAtom}
      customUseAtom={customUseAtom}
    />
  );
};

interface PracticeSearchGMapsInputProps {
  onSearchClicked: (data: VtMapPlacesResult) => void;
  onChange: (value: string) => void;
  inputId: string;
  currentGlobalPracticeSearchFiltersAtom: ReturnType<
    VTAtom<{
      fullTextSearch: string;
      filters: string[];
    }>["vTAtom"]
  >;
  currentPracticeSearchTypeAtom: ReturnType<
    VTAtom<PracticeSearchTypes | null>["vTAtom"]
  >;
  currentServicesFilterAtom: ReturnType<VTAtom<PracticeSearchFilter>["vTAtom"]>;
  useVtTranslate: UseVtTranslateType;
  allLocationsAtom: ReturnType<VTAtom<CFCollectionLocation[]>["vTAtom"]>;
  customUseAtom: typeof useAtom;
}

export default PracticeSearchGMapsInput;
