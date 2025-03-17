/* eslint-disable security/detect-object-injection,sonarjs/cognitive-complexity,@typescript-eslint/ban-ts-ignore */
import { ReactNode } from "react";
import {
  CFCollectionLocation,
  LocationSearchIndex,
  AnimalTypes,
  CFCollectionLocationType,
  LocationTypeKeys,
  CfCollectionService,
  VtMapPlacesResult,
  PracticeSearchSteps
} from "../../@types";
import { getNearestLocations } from "./gmaps";

export const getCantons = (
  allLocations: CFCollectionLocation[],
  t: (key: string) => string | ReactNode
) => {
  return allLocations
    .sort(
      (a, b) =>
        a.fields.canton.fields.sortingIndex -
        b.fields.canton.fields.sortingIndex
    )
    .map((el) => ({
      displayValue: t(el.fields.canton.fields.name),
      submitValue: el.fields.canton.sys.id
    }))
    .filter((canton, index, acc) => {
      return (
        acc.findIndex((el) => el.submitValue === canton.submitValue) === index
      );
    });
};

export const prepareStepTwoData = (
  currentSearchStep: PracticeSearchSteps | null,
  cantonId: string,
  allLocations: CFCollectionLocation[],
  cantonFilter: (filter: boolean) => boolean,
  selectedPlaceResult: VtMapPlacesResult | null
) => {
  let locationsToFilter: CFCollectionLocation[] = [];
  let locationsSearchIndexes: LocationSearchIndex[] = [];
  let animalTypes: AnimalTypes[] = [];
  let locationTypes: CFCollectionLocationType[] = [];
  let availableServices: CfCollectionService[] = [];
  let availableServicesGroupedTogether: Record<
    string,
    {
      name: string;
      services: CfCollectionService[];
    }
  > = {};

  const servicesGroupedByAnimalType = Object.values(AnimalTypes).map(
    (animalType) => {
      const services: CfCollectionService[] = [];

      allLocations.forEach((location) => {
        location.fields.servicesProvided.forEach((sp) => {
          if (sp.fields.animalType === animalType) {
            services.push(sp.fields.relatedService);
          }
        });
      });

      return {
        animalType,
        services
      };
    }
  );

  let standardServiceAnimalTypes: AnimalTypes[] = [];
  let standardServiceLocationTypeKeys: LocationTypeKeys[] = [];

  if (
    currentSearchStep === PracticeSearchSteps.SERVICE_AND_ANIMAL_TYPE_FILTER
  ) {
    if (cantonId) {
      locationsToFilter = allLocations.filter((el) =>
        cantonFilter(el.fields.canton.sys.id === cantonId)
      );
    }

    if (selectedPlaceResult) {
      locationsToFilter = getNearestLocations(
        {
          lat: selectedPlaceResult.geometry?.location?.lat() as number,
          lng: selectedPlaceResult.geometry?.location?.lng() as number,
          location: selectedPlaceResult as VtMapPlacesResult
        },
        allLocations.map((el) => ({
          lat: el.fields.address.lat,
          lng: el.fields.address.lon,
          location: el
        }))
      ).map((el) => el.location);
    }

    if (locationsToFilter.length > 0) {
      locationsSearchIndexes = locationsToFilter
        .filter((loc) => loc.fields.servicesProvided)
        .map((el) => ({
          location: el,
          animalTypes: el.fields.servicesProvided
            .map((animalType) => animalType.fields.animalType)
            .filter(
              (el, index, acc) => el && acc.findIndex((_) => el === _) === index
            ),
          hasStandardServices: el.fields.servicesProvided
            .filter(
              (providedService) =>
                providedService.fields.relatedService &&
                providedService.fields.relatedService.fields
            )
            .some((service) =>
              service.fields.relatedService.fields.serviceGroups.some(
                (group) => group.fields.isStandardServiceGroup
              )
            ),
          services: el.fields.servicesProvided
            .map((sp) => sp.fields.relatedService)
            .filter(
              (serv, index, arr) =>
                serv &&
                arr.findIndex((el) => el.sys.id === serv.sys.id) === index
            ),
          locationType: el.fields.type
        }));

      locationsSearchIndexes = locationsSearchIndexes.map((si) => ({
        ...si,
        services: si.services.filter((serv) => serv?.fields !== undefined).map((serv) => {
          const locationsWithService = locationsSearchIndexes.filter((loc) =>
            loc.services.find((s) => s.sys.id === serv.sys.id)
          );

          const displayLocationTypeSearchKeys = Array.from(new Set(
            locationsWithService.map(
              (loc) => loc.locationType.fields.searchKey
            )
          ));

          const displayAnimalTypes = Array.from(new Set(
            servicesGroupedByAnimalType
              .filter((group) =>
                group.services.find((s) => s.sys.id === serv.sys.id)
              )
              .map((group) => group.animalType)
          ));

          if (
            serv.fields.serviceGroups.some(
              (group) => group.fields.isStandardServiceGroup
            )
          ) {
            standardServiceAnimalTypes = Array.from(
              new Set([...standardServiceAnimalTypes, ...displayAnimalTypes])
            );
            standardServiceLocationTypeKeys = Array.from(
              new Set([
                ...standardServiceLocationTypeKeys,
                ...displayLocationTypeSearchKeys
              ])
            );
          }

          return {
            ...serv,
            fields: {
              ...serv.fields,
              displayLocationTypeSearchKeys,
              displayAnimalTypes
            }
          };
        })
      }));

      animalTypes = locationsSearchIndexes
        .map((el) => el.animalTypes)
        .flat()
        .filter(
          (animalType, index, acc) =>
            acc.findIndex((el) => el === animalType) === index
        );

      locationTypes = locationsToFilter
        .map((el) => el.fields.type)
        .filter(
          (locationType, index, acc) =>
            acc.findIndex((el) => el.sys.id === locationType.sys.id) === index
        );

      if (
        locationTypes.find(
          (el) => el.fields.searchKey === LocationTypeKeys.CLINIC_PLUS
        )
      ) {
        locationTypes = locationTypes.filter(
          (el) =>
            el.fields.searchKey !== LocationTypeKeys.CLINIC &&
            el.fields.searchKey !== LocationTypeKeys.CLINIC_PLUS
        );

        locationTypes.push(
          allLocations.find(
            (el) => el.fields.type.fields.searchKey === LocationTypeKeys.CLINIC
          )?.fields.type as CFCollectionLocationType
        );
      }

      availableServices = locationsSearchIndexes
        .map((el) => el.services)
        .flat()
        .filter(
          (service, index, acc) =>
            acc.findIndex((el) => el.sys.id === service.sys.id) === index
        )
        .filter((el) =>
          el.fields.serviceGroups.some((sg) => sg.fields.sortingIndex !== 98)
        );

      // group services by service group id
      availableServicesGroupedTogether = availableServices
        .filter((s) => {
          return s.fields && !s.fields.serviceGroups.find((group) => group.fields.isTelemedicine === true);
        })
        .reduce((acc, service) => {
          service.fields.serviceGroups.forEach((sg) => {
            if (!acc[sg.sys.id]) {
              acc[sg.sys.id] = {
                name: sg.fields.name,
                services: []
              };
            }
            acc[sg.sys.id].services.push(service);
          });
          return acc;
        }, {} as { [key: string]: { name: string; services: CfCollectionService[] } });

      // meke services under a service group unique
      Object.keys(availableServicesGroupedTogether).forEach((key) => {
        availableServicesGroupedTogether[key] = {
          name: availableServicesGroupedTogether[key].name,
          services: availableServicesGroupedTogether[key].services.filter(
            (service, index, acc) =>
              acc.findIndex((el) => el.sys.id === service.sys.id) === index
          )
        };
      });
    }
  }

  return {
    locationsToFilter,
    locationsSearchIndexes,
    animalTypes,
    locationTypes,
    availableServices,
    availableServicesGroupedTogether,
    standardServiceAnimalTypes,
    standardServiceLocationTypeKeys
  };
};
