/* eslint-disable no-use-before-define,security/detect-object-injection,jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions,react-hooks/exhaustive-deps,react/jsx-curly-newline */
import React, { ReactNode, useEffect, useState } from "react";
import { useAtom } from "jotai";
import {
  AnimalTypes,
  CFCollectionLocationType,
  LocationTypeKeys,
  CfCollectionService,
  ComponentProps,
  VTAtom,
  LocationSearchIndex,
  PracticeSearchFilter,
  UseVtTranslateType
} from "../../@types";
import CheckboxInput from "../inputs/CheckboxInput";
import Paragraph from "../shared/Paragraph";
import {
  CatPlain,
  Coifeur,
  CowPlain,
  HorsePlain,
  Tierhotel
} from "../../assets/icons";
import { ANIMAL_TYPE_TRANSLATION_KEYS } from "../../shared/constants";

const ServicesFiltering: React.FC<ComponentProps<ServicesFilteringProps>> = ({
  animalTypes,
  locationTypes,
  searchIndexes,
  currentServicesFilterAtom,
  globalLocationSearchIndexesAtom,
  useVtTranslate,
  customUseAtom,
}) => {
  const { t } = useVtTranslate("location");
  const localizedAnimalTypes = [
    AnimalTypes.KLEINTIERMEDIZIN,
    AnimalTypes.PFERDEMEDIZIN,
    AnimalTypes.NUTZTIERMEDIZIN
  ];

  const animalTypesIcons = {
    [AnimalTypes.KLEINTIERMEDIZIN]: <CatPlain />,
    [AnimalTypes.PFERDEMEDIZIN]: <HorsePlain />,
    [AnimalTypes.NUTZTIERMEDIZIN]: <CowPlain />
  };

  const locationTypesIcons: { [key in LocationTypeKeys]?: ReactNode } = {
    [LocationTypeKeys.PET_HOTEL]: <Tierhotel />,
    [LocationTypeKeys.COIFFEUR]: <Coifeur />
  };

  const [filters, setFilters] = customUseAtom(currentServicesFilterAtom);

  const [animalTypesFilters, setAnimalTypesFilters] = useState<{
    [key in AnimalTypes]?: boolean;
  }>({
    [AnimalTypes.KLEINTIERMEDIZIN]:
      filters.animalType === AnimalTypes.KLEINTIERMEDIZIN,
    [AnimalTypes.PFERDEMEDIZIN]:
      filters.animalType === AnimalTypes.PFERDEMEDIZIN,
    [AnimalTypes.NUTZTIERMEDIZIN]:
      filters.animalType === AnimalTypes.NUTZTIERMEDIZIN
  });

  const [locationTypesFilters, setLocationTypesFilters] = useState<{
    [key in LocationTypeKeys]?: boolean;
  }>({
    [LocationTypeKeys.PET_HOTEL]:
      filters.locationTypeSearchKey === LocationTypeKeys.PET_HOTEL,
    [LocationTypeKeys.COIFFEUR]:
      filters.locationTypeSearchKey === LocationTypeKeys.COIFFEUR
  });

  const onAnimalTypeChanged = (nextAnimalType: AnimalTypes) => {
    setFilters({
      ...filters,
      animalType: nextAnimalType,
      locationTypeSearchKey: "",
      services: []
    });

    const newAnimalTypeFilters: {
      [key in AnimalTypes]?: boolean;
    } = {};

    Object.keys(animalTypesFilters).forEach((el) => {
      newAnimalTypeFilters[el as unknown as AnimalTypes] =
        el === nextAnimalType;
    });

    setAnimalTypesFilters(newAnimalTypeFilters);

    // Change also the location type filters display

    const newLocationTypeFilters: {
      [key in LocationTypeKeys]?: boolean;
    } = {};

    Object.keys(locationTypesFilters).forEach((el) => {
      newLocationTypeFilters[el as unknown as LocationTypeKeys] = false;
    });

    setLocationTypesFilters(newLocationTypeFilters);
  };

  const onLocationTypeChanged = (nextLocationType: LocationTypeKeys) => {
    setFilters({
      ...filters,
      locationTypeSearchKey: nextLocationType,
      animalType: "",
      services: []
    });

    const newLocationTypeFilters: {
      [key in LocationTypeKeys]?: boolean;
    } = {};

    Object.keys(locationTypesFilters).forEach((el) => {
      newLocationTypeFilters[el as unknown as LocationTypeKeys] =
        el === nextLocationType;
    });

    setLocationTypesFilters(newLocationTypeFilters);

    // Change also animal types

    const newAnimalTypeFilters: {
      [key in AnimalTypes]?: boolean;
    } = {};

    Object.keys(animalTypesFilters).forEach((el) => {
      newAnimalTypeFilters[el as unknown as AnimalTypes] = false;
    });

    setAnimalTypesFilters(newAnimalTypeFilters);
  };

  const [, setGlobalSearchIndexes] = customUseAtom(globalLocationSearchIndexesAtom);

  useEffect(
    () => {
      setGlobalSearchIndexes(searchIndexes);
    },
    // ⚠️CAUTION ⚠️: Don't ever put globalSearchIndexes in the array
    []
  );

  return (
    <div>
      <Paragraph type="body_2" className="font-semibold text-darkBlue">
        {t("SEARCH_PAGE.FILTER_BY_CATEGORY_LABEL")}
        <span className="font-normal ml-[4px] text-lightBlue-1.5">
          (optional)
        </span>
      </Paragraph>
      <div className="grid lg:grid-cols-3 gap-[12px] mt-[12px]">
        {animalTypes
          .filter((el) => el && localizedAnimalTypes.includes(el))
          .map((animalType) => (
            <div
              className="border-sand-pressed border rounded-[8px] px-[16px] group hover:cursor-pointer"
              key={Math.random()}
              onClick={() => onAnimalTypeChanged(animalType)}
            >
              <CheckboxInput
                labelText={
                  <span className="inline-flex flex-row gap-[8px] items-center hover:text-magenta font-noto-sans-condensed group-hover:text-magenta cursor-pointer">
                    {animalTypesIcons[animalType]}
                    {t(ANIMAL_TYPE_TRANSLATION_KEYS[animalType])}
                  </span>
                }
                name="animalType"
                isRadioButton
                labelClassName="text-darkBlue font-noto-sans-condensed font-semibold"
                className="flex-wrap cursor-pointer"
                value={animalTypesFilters[animalType]}
                onChange={() => onAnimalTypeChanged(animalType)}
              />
            </div>
          ))}
        {locationTypes
          .filter((el) =>
            Object.keys(locationTypesIcons).includes(el.fields.searchKey)
          )
          .map((locationType) => (
            <div
              className="border-sand-pressed border rounded-[8px] px-[16px] group hover:cursor-pointer"
              key={Math.random()}
              onClick={() =>
                onLocationTypeChanged(locationType.fields.searchKey)
              }
            >
              <CheckboxInput
                labelText={
                  <span className="inline-flex flex-row gap-[8px] items-center hover:text-magenta font-noto-sans-condensed group-hover:text-magenta cursor-pointer">
                    {locationTypesIcons[locationType.fields.searchKey]}
                    {locationType.fields.name}
                  </span>
                }
                name="locationType"
                disabled
                isRadioButton
                labelClassName="text-darkBlue font-noto-sans-condensed font-semibold cursor-pointer"
                className="flex-wrap"
                value={locationTypesFilters[locationType.fields.searchKey]}
                onChange={() =>
                  onLocationTypeChanged(locationType.fields.searchKey)
                }
              />
            </div>
          ))}
      </div>
    </div>
  );
};

interface ServicesFilteringProps {
  animalTypes: AnimalTypes[];
  locationTypes: CFCollectionLocationType[];
  availableServicesGroupedTogether: Record<
    string,
    {
      name: string;
      services: CfCollectionService[];
    }
  >;
  searchIndexes: LocationSearchIndex[];
  currentServicesFilterAtom: ReturnType<VTAtom<PracticeSearchFilter>["vTAtom"]>;
  globalLocationSearchIndexesAtom: ReturnType<
    VTAtom<LocationSearchIndex[]>["vTAtom"]
  >;
  useVtTranslate: UseVtTranslateType;
  customUseAtom: typeof useAtom;
}

export default ServicesFiltering;
