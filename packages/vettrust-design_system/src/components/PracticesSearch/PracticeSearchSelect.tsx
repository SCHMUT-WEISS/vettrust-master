/* eslint-disable no-use-before-define */
import React from "react";
import { useAtom } from "jotai";
import SelectInput from "../inputs/SelectInput";
import { ComponentProps, UseVtTranslateType, VTAtom } from "../../@types";
import { FormSelectInputProps } from "../../@types/components/inputs";
import { PracticeSearchFilter } from "../../@types/atoms";

const PracticeSearchSelect: React.FC<
  ComponentProps<PracticeSearchSelectProps>
> = ({
  options,
  onSelectedChange,
  selected,
  currentServicesFilterAtom,
  useVtTranslate,
  customUseAtom,
}) => {
  const [filters, setFilters] = customUseAtom(currentServicesFilterAtom);
  const { t } = useVtTranslate("location");

  return (
    <SelectInput
      classes={{
        input: `bg-white input border border-sand-pressed`,
        container: `w-full mt-[32px]`
      }}
      forText="cantonId"
      labelKey={t("SEARCH_PAGE.MODAL_SELECT_CANTON_LABEL")}
      options={options}
      className="placeholder:font-[400] border border-sand-pressed h-[48px]"
      selected={selected}
      onSelectedChange={(...args) => {
        setFilters({
          ...filters,
          services: [],
          animalType: "",
          hasStandardServices: false,
          locationTypeSearchKey: ""
        });
        if (onSelectedChange) {
          onSelectedChange(...args);
        }
      }}
      defaultLabel={t("location:ALL_LOCATIONS.CANTON_DEFAULT_LABEL")}
      useVtTranslate={useVtTranslate}
    />
  );
};

interface PracticeSearchSelectProps {
  options: FormSelectInputProps["options"];
  onSelectedChange: FormSelectInputProps["onSelectedChange"];
  selected: FormSelectInputProps["selected"];
  currentServicesFilterAtom: ReturnType<VTAtom<PracticeSearchFilter>["vTAtom"]>;
  useVtTranslate: UseVtTranslateType;
  customUseAtom: typeof useAtom;
}

export default PracticeSearchSelect;
