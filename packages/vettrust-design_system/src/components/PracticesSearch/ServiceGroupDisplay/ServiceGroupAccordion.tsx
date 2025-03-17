/* eslint-disable no-use-before-define */
import React from "react";
import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material";
import { useAtom } from "jotai";
import {
  ComponentProps,
  PracticeSearchFilter,
  VTAtom,
  CfCollectionService,
  LocationTypeKeys,
  AnimalTypes,
  UseVtTranslateType
} from "../../../@types";
import { ChevronDownDanger } from "../../../assets/icons";
import ServiceGroupAccordionDetails from "./ServiceGroupAccordionDetails";
import ServiceGroupAccordionSummary from "./ServiceGroupAccordionSummary";

const ServiceGroupAccordion: React.FC<
  ComponentProps<ServiceGroupAccordionProps>
> = ({
  serviceGroup,
  standardServiceLocationTypeKeys,
  standardServiceAnimalTypes,
  currentServicesFilterAtom,
  useVtTranslate,
  customUseAtom
}) => {
  const hasStandardServices = serviceGroup.services.some((el) =>
    el.fields.serviceGroups.some((sg) => sg.fields.isStandardServiceGroup)
  );

  return (
    <React.Fragment>
      <hr />
      <Accordion
        key={Math.random().toString()}
        sx={{
          borderRadius: "12px",
          background: "white",
          paddingLeft: 0,
          "& .MuiAccordionSummary-root": {
            padding: 0
          },
          "& .MuiAccordionDetails-root": {
            paddingLeft: "2px"
          }
        }}
        className="border-0 search__MuiAccordion-root-custom"
      >
        <AccordionSummary
          expandIcon={<ChevronDownDanger className="ml-0 h-[24px] w-[24px]" />}
          aria-controls={serviceGroup.name}
          id={serviceGroup.name}
          className="group"
        >
          <ServiceGroupAccordionSummary
            serviceGroup={serviceGroup}
            standardServiceLocationTypeKeys={standardServiceLocationTypeKeys}
            standardServiceAnimalTypes={standardServiceAnimalTypes}
            hasStandardServices={hasStandardServices}
            currentServicesFilterAtom={currentServicesFilterAtom}
            useVtTranslate={useVtTranslate}
            customUseAtom={customUseAtom}
          />
        </AccordionSummary>
        <AccordionDetails>
          <ServiceGroupAccordionDetails
            serviceGroup={serviceGroup}
            hasStandardServices={hasStandardServices}
            useVtTranslate={useVtTranslate}
            currentServicesFilterAtom={currentServicesFilterAtom}
            customUseAtom={customUseAtom}
          />
        </AccordionDetails>
      </Accordion>
    </React.Fragment>
  );
};

interface ServiceGroupAccordionProps {
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

export default ServiceGroupAccordion;
