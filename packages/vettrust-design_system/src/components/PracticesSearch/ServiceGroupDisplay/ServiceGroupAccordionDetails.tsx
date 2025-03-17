/* eslint-disable no-use-before-define */
import React from "react";
import { useAtom } from "jotai";
import { ComponentProps, UseVtTranslateType, VTAtom } from "../../../@types";
import CheckboxInput from "../../inputs/CheckboxInput";
import { CfCollectionService } from "../../../@types/content/CFCollectionService";
import Paragraph from "../../shared/Paragraph";
import { PracticeSearchFilter } from "../../../@types/atoms";

const ListDot = () => (
  <svg
    width="4"
    height="4"
    viewBox="0 0 4 4"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="2" cy="2" r="2" fill="#132F55" />
  </svg>
);

const StandardServicesDescription = ({
  useVtTranslate
}: {
  useVtTranslate: UseVtTranslateType;
}) => {
  const { t, i18n } = useVtTranslate("location");
  const bullets = {
    de: [
      "Impfungen und Jahrescheck",
      "Lahmheitsabklärung",
      "Augenerkrankung",
      "Futterberatung",
      "Reiseberatung",
      "Allgemeine Chirurgie",
      "Kastration",
      "Tumorentfernung",
      "Zweitmeinung",
      "Zahnerkrankungen",
      "Radiologie"
    ],
    en: [
      "Vaccinations and annual check-up",
      "Lameness examination",
      "Eye disease",
      "Feed consultation",
      "Travel advice",
      "General surgery",
      "Neutering",
      "Tumor removal",
      "Second opinion",
      "Dentistry",
      "Radiology"
    ],
    fr: [
      "Vaccinations et contrôle annuel",
      "Examen des boiteries",
      "Maladie des yeux",
      "Consultation en alimentation",
      "Conseils aux voyageurs",
      "Chirurgie générale",
      "stérilisation",
      "Ablation de tumeur",
      "Deuxième avis",
      "Dentisterie",
      "Radiologie"
    ]
  };

  return (
    <React.Fragment>
      <Paragraph type="body_2" className="text-darkBlue">
        {t("SEARCH_PAGE.STANDARD_SERVICES_SUB_TITLE")}
      </Paragraph>
      <Paragraph type="body_2" className="text-darkBlue">
        <ul className="grid lg:grid-cols-2 mt-[8px]">
          {
            //@ts-ignore
            (bullets[i18n.language]).map((bullet: string) => (
            <li
              key={Math.random()}
              className="flex flex-row items-center gap-[12px]"
            >
              <ListDot />
              {bullet}
            </li>
          ))}
        </ul>
      </Paragraph>
    </React.Fragment>
  );
};

const ServiceGroupAccordionDetails: React.FC<
  ComponentProps<ServiceGroupAccordionDetailsProps>
> = ({
  hasStandardServices,
  serviceGroup,
  currentServicesFilterAtom,
  useVtTranslate,
  customUseAtom
}) => {
  const [filters, setFilters] = customUseAtom(currentServicesFilterAtom);

  return hasStandardServices ? (
    <StandardServicesDescription useVtTranslate={useVtTranslate} />
  ) : (
    <div className="grid lg:grid-cols-2 gap-[12px]">
      {serviceGroup.services.map((service) => {
        const disabled =
          Boolean(
            filters.animalType &&
              !service.fields.displayAnimalTypes.includes(filters.animalType)
          ) ||
          Boolean(
            filters.locationTypeSearchKey &&
              !service.fields.displayLocationTypeSearchKeys.includes(
                filters.locationTypeSearchKey as any
              )
          );

        return (
          <div className="text-darkBlue" key={Math.random()}>
            <CheckboxInput
              disabled={disabled}
              labelText={service.fields.name}
              key={Math.random().toString()}
              value={Boolean(
                filters.services.find((el) => el.sys.id === service.sys.id)
              )}
              onChange={(checked) => {
                if (checked) {
                  setFilters({
                    ...filters,
                    services: [...filters.services, service]
                  });
                }

                if (!checked) {
                  setFilters({
                    ...filters,
                    services: filters.services.filter(
                      (el) => el.sys.id !== service.sys.id
                    )
                  });
                }
              }}
              labelClassName={
                disabled ? "cursor-no-drop text-lightBlue-1.5" : undefined
              }
            />
          </div>
        );
      })}
    </div>
  );
};

interface ServiceGroupAccordionDetailsProps {
  hasStandardServices: boolean;
  serviceGroup: {
    name: string;
    services: CfCollectionService[];
  };
  currentServicesFilterAtom: ReturnType<VTAtom<PracticeSearchFilter>["vTAtom"]>;
  useVtTranslate: UseVtTranslateType;
  customUseAtom: typeof useAtom;
}

export default ServiceGroupAccordionDetails;
