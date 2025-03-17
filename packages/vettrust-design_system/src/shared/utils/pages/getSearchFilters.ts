import {
  CFCollectionLocation,
  PracticeSearchFilter,
  PracticeSearchTypes
} from "../../../@types";

export const getFiltersDisplay = (filters: PracticeSearchFilter) => {
  const newGlobalFilters = filters.services.map((el) => el.fields.name);

  if (filters.hasStandardServices) {
    newGlobalFilters.push("hasStandardServices");
  }

  if (filters.locationTypeSearchKey) {
    newGlobalFilters.push(filters.locationTypeSearchKey);
  }

  if (filters.animalType) {
    newGlobalFilters.push(filters.animalType);
  }

  return newGlobalFilters;
};

export const getFullTextSearchFilterDisplay = (
  currentSearchType: PracticeSearchTypes | null,
  allLocations: CFCollectionLocation[],
  currentGlobalPracticeSearchFilters: {
    fullTextSearch: string;
    filters: string[];
  }
) => {
  if (currentSearchType === PracticeSearchTypes.CANTON) {
    return (
      allLocations.find(
        (el) =>
          el.fields.canton.sys.id ===
          currentGlobalPracticeSearchFilters.fullTextSearch
      )?.fields.canton.fields.name ||
      currentGlobalPracticeSearchFilters.fullTextSearch
    );
  }

  return currentGlobalPracticeSearchFilters.fullTextSearch;
};
