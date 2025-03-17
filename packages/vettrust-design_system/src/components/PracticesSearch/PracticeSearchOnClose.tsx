/* eslint-disable react-hooks/exhaustive-deps */
/*
   It is soo important not to have the whole search component reload on every change of filters,
   this component is nothing but a placeholder to fire events when the search drawer open or closes
 */
import React, { useEffect } from "react";
import { useAtom } from "jotai";
import { ALL_CANTONS_WORD } from "../../shared/constants";
import { UseVtTranslateType, VTAtom, PracticeSearchSteps } from "../../@types";

const PracticeSearchOnClose: React.FC<PracticeSearchOnCloseProps> = ({
  currentGlobalPracticeSearchFiltersAtom,
  currentPracticeSearchStepAtom,
  shouldReloadFiltersAtom,
  useVtTranslate,
  customUseAtom,
}) => {
  const { i18n } = useVtTranslate();
  const [, setShouldReloadFilters] = customUseAtom(shouldReloadFiltersAtom);
  const [globalFilters, setGlobalFilters] = customUseAtom(
    currentGlobalPracticeSearchFiltersAtom
  );
  const [currentSearchStep, setCurrentSearchStep] = customUseAtom(
    currentPracticeSearchStepAtom
  );

  useEffect(() => {
    setShouldReloadFilters(true);

    if (
      globalFilters.fullTextSearch === ALL_CANTONS_WORD.en &&
      i18n?.language === "de"
    ) {
      setGlobalFilters({
        ...globalFilters,
        fullTextSearch: ALL_CANTONS_WORD.de
      });
    }

    if (
      globalFilters.fullTextSearch === ALL_CANTONS_WORD.de &&
      i18n?.language === "en"
    ) {
      setGlobalFilters({
        ...globalFilters,
        fullTextSearch: ALL_CANTONS_WORD.en
      });
    }

    return () => {
      setShouldReloadFilters(false);
      if (currentSearchStep !== null) {
        setCurrentSearchStep(null);
      }
    };
  }, []);
  return <React.Fragment />;
};

interface PracticeSearchOnCloseProps {
  currentGlobalPracticeSearchFiltersAtom: ReturnType<
    VTAtom<{
      fullTextSearch: string;
      filters: string[];
    }>["vTAtom"]
  >;
  currentPracticeSearchStepAtom: ReturnType<
    VTAtom<PracticeSearchSteps | null>["vTAtom"]
  >;
  shouldReloadFiltersAtom: ReturnType<VTAtom<boolean>["vTAtom"]>;
  useVtTranslate: UseVtTranslateType;
  customUseAtom: typeof useAtom;
}

export default PracticeSearchOnClose;
