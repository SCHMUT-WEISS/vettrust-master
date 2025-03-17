/* eslint-disable no-use-before-define,react/jsx-curly-newline */
import React from "react";
import { useAtom } from "jotai";
import CheckboxInput from "../../inputs/CheckboxInput";
import {
  CfCollectionService,
  ComponentProps,
  UseVtTranslateType,
  VTAtom,
  LocationTypeKeys,
  AnimalTypes,
  PracticeSearchFilter
} from "../../../@types";

const ServiceGroupAccordionSummary: React.FC<
  ComponentProps<ServiceGroupAccordionSummaryProps>
> = ({
  hasStandardServices,
  serviceGroup,
  standardServiceLocationTypeKeys,
  standardServiceAnimalTypes,
  currentServicesFilterAtom,
  useVtTranslate,
  customUseAtom,
}) => {
  const { t } = useVtTranslate("location");
  const [filters, setFilters] = customUseAtom(currentServicesFilterAtom);
  const standardServicesDisabled =
    Boolean(
      filters.animalType &&
        !standardServiceAnimalTypes.includes(filters.animalType as any)
    ) ||
    Boolean(
      filters.locationTypeSearchKey &&
        !standardServiceLocationTypeKeys.includes(
          filters.locationTypeSearchKey as any
        )
    );

  return hasStandardServices ? (
    <CheckboxInput
      labelText={t("SEARCH_PAGE.GENERAL_CONSULTATION_LABEL")}
      name=""
      labelClassName={`text-darkBlue font-noto-sans-condensed font-semibold ${
        standardServicesDisabled ? "cursor-no-drop text-lightBlue-1.5" : "cursor-pointer hover:text-magenta"
      }`}
      className="flex-wrap"
      onChange={(checked) =>
        setFilters({ ...filters, hasStandardServices: checked })
      }
      value={filters.hasStandardServices}
      disabled={standardServicesDisabled}
    />
  ) : (
    <span className="font-noto-sans-condensed font-semibold text-darkBlue text-[16px] group-hover:text-magenta">
      {serviceGroup.name}
    </span>
  );
};

interface ServiceGroupAccordionSummaryProps {
  hasStandardServices: boolean;
  serviceGroup: {
    name: string;
    services: CfCollectionService[];
  };
  standardServiceLocationTypeKeys: LocationTypeKeys[];
  standardServiceAnimalTypes: AnimalTypes[];
  currentServicesFilterAtom: ReturnType<VTAtom<PracticeSearchFilter>["vTAtom"]>;
  useVtTranslate: UseVtTranslateType;
  customUseAtom: typeof useAtom;
}

export default ServiceGroupAccordionSummary;
