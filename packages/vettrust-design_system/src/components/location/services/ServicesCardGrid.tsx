/* eslint-disable no-use-before-define */
// eslint-disable-next-line no-use-before-define
import React, { useMemo, useState } from "react";
import { Asset } from "contentful";
import { CircularProgress } from "@mui/material";
import { useAtom } from "jotai";
import {
  ComponentProps,
  VTAtom,
  CfCollectionService,
  CfCollectionServiceGroup,
  ModalsState,
  UseVtTranslateType
} from "../../../@types";
import Section from "../../shared/Section";
import StandardServiceDescription from "./StandardServiceDescription";
import Paragraph from "../../shared/Paragraph";
import RichTextRenderer from "../../shared/RichTextRenderer";
import { Check } from "../../../assets/icons";
import ServiceCard from "./LocationServiceCard";
import LocationServicesCarousel from "./LocationServicesCarousel";
import { formatURL } from "../../../shared/utils";
import { DEFAULT_IMAGE_LOADER } from "../../../shared/pages";

const ServiceCardsGrid: React.FC<ComponentProps<ServiceCardsGridProps>> = ({
  standardServices,
  specialServices,
  className,
  defaultServiceImage,
  currentlyDisplayedServiceAtom,
  currentModalAtom,
  router,
  useVtTranslate,
  customUseAtom
}) => {
  const { i18n, t } = useVtTranslate("location");
  const ALL_WORD = {
    en: "All",
    de: "Alle"
  };

  let standardServiceGroup: CfCollectionServiceGroup | undefined;

  if (standardServices.length > 0) {
    standardServiceGroup = standardServices[0].fields.serviceGroups.find(
      (el) => el.fields.isStandardServiceGroup
    );
  }

  standardServiceGroup = useMemo(
    () => standardServiceGroup || undefined,
    [standardServiceGroup]
  );

  const allSpecializedServicesGroupNames = specialServices
    .map((el) => el.fields.serviceGroups.map((el) => el.fields.name))
    .flat()
    .filter((el, i, arr) => arr.indexOf(el) === i)
    .filter((el) => {
      if (standardServiceGroup) {
        return el !== standardServiceGroup.fields.name;
      }
      return true;
    });

  allSpecializedServicesGroupNames.unshift(
    ALL_WORD[i18n.language as "en" | "de"] as string
  );

  const memoizedAllSpecializedServicesGroupNames = useMemo(
    () => allSpecializedServicesGroupNames,
    [allSpecializedServicesGroupNames]
  );

  const [
    currentSpecializedServicesGroupName,
    setCurrentSepecializedServicesGroupName
  ] = useState(memoizedAllSpecializedServicesGroupNames[0]);

  const [isLoading, setIsLoading] = useState(false);

  let displayedSpecializedServices = specialServices;

  if (
    currentSpecializedServicesGroupName !==
    ALL_WORD[i18n.language as "en" | "de"]
  ) {
    displayedSpecializedServices = specialServices.filter((el) =>
      el.fields.serviceGroups.some(
        (el) => el.fields.name === currentSpecializedServicesGroupName
      )
    );
  }

  const standardServicesNodes = useMemo(
    () =>
      standardServices
        .sort((a, b) =>
          a.fields.name.toLowerCase().localeCompare(b.fields.name.toLowerCase())
        )
        .map((service) => (
          <Paragraph
            type="body_2"
            className="inline-block py-[4px] px-[12px] rounded-[6px] bg-white mr-[12px] mb-[12px]"
            key={Math.random().toString()}
          >
            {service.fields.name}
          </Paragraph>
        )),
    [standardServices]
  );

  const allSpecializedServiceTagsNames = useMemo(
    () =>
      memoizedAllSpecializedServicesGroupNames.map((groupName) => (
        <Paragraph
          type="label"
          className={`${
            currentSpecializedServicesGroupName === groupName
              ? "text-magenta border-magenta"
              : ""
          } group font-NotoSans font-semibold inline-block py-[4px] px-[8px] rounded-[6px] border border-sand-pressed mr-[12px] inline-flex flex-row items-center cursor-pointer hover:text-magenta gap-[4px] hover:border-magenta`}
          key={Math.random().toString()}
          onClick={() => {
            if (currentSpecializedServicesGroupName !== groupName) {
              setCurrentSepecializedServicesGroupName(groupName);
              setIsLoading(true);
              setTimeout(() => {
                setIsLoading(false);
              }, 1000);
            }
          }}
        >
          <span
            className={`${
              groupName === currentSpecializedServicesGroupName
                ? "text-magenta"
                : "text-sand-pressed"
            } group-hover:text-magenta`}
          >
            <Check />
          </span>
          {groupName}
        </Paragraph>
      )),
    [
      currentSpecializedServicesGroupName,
      memoizedAllSpecializedServicesGroupNames
    ]
  );

  return (
    <div className={`${className} `}>
      {standardServiceGroup && (
        <StandardServiceDescription
          image={{
            src: formatURL(
              standardServiceGroup?.fields?.image?.fields?.file?.url
            ),
            alt: standardServiceGroup?.fields?.image?.fields?.description,
            blurDataUrl:
              formatURL(
                standardServiceGroup?.fields?.image?.fields?.file?.url
              ) || DEFAULT_IMAGE_LOADER
          }}
          className="mt-[64px] lg:mt-[96px] container-wrapper"
          contentNotWrapped
          showBgImageToTheRight
        >
          <Section
            title={{
              text: standardServiceGroup.fields.name,
              level: "h2",
              className: ""
            }}
          >
            <RichTextRenderer
              document={standardServiceGroup.fields.description}
              className="text-darkBlue"
              useVtTranslate={useVtTranslate}
            />
            <div className="mt-[16px] lg:mt-[24px]">
              {standardServicesNodes}
            </div>
          </Section>
        </StandardServiceDescription>
      )}
      <Section
        title={{
          text: t("SERVICES.SPACIAL_SERVICES_TITLE"),
          level: "h2",
          className: ""
        }}
        className="mt-[52px] lg:mt-[96px] container-wrapper lg:min-h-[520px]"
      >
        <div className="overflow-x-scroll whitespace-nowrap service-group-choice">
          {allSpecializedServiceTagsNames}
        </div>

        {!isLoading && (
          <div className="mt-[24px] lg:mt-[32px] grid grid-cols-4 gap-[16px] md:gap-[24px] lg:gap-[32px] hidden lg:grid">
            {displayedSpecializedServices.map((service) => (
              <ServiceCard
                service={service}
                defaultImage={defaultServiceImage}
                key={Math.random().toString()}
                currentlyDisplayedServiceAtom={currentlyDisplayedServiceAtom}
                currentModalAtom={currentModalAtom}
                router={router}
                useVtTranslate={useVtTranslate}
                customUseAtom={customUseAtom}
              />
            ))}
          </div>
        )}

        {isLoading && (
          <div className="h-[380px] w-full grid justify-center items-center">
            <CircularProgress size={50} className="" color="primary" />
          </div>
        )}
      </Section>
      {!isLoading && (
        <LocationServicesCarousel
          services={displayedSpecializedServices}
          defaultServiceImage={defaultServiceImage}
          className="lg:hidden mt-[24px] lg:mt-[32px]"
          dotsClassName={`${
            specialServices.length === 1 ? "hidden" : ""
          } lg:hidden`}
          notWrapped
          currentModalAtom={currentModalAtom}
          currentlyDisplayedServiceAtom={currentlyDisplayedServiceAtom}
          router={router}
          useVtTranslate={useVtTranslate}
          customUseAtom={customUseAtom}
        />
      )}
    </div>
  );
};

interface ServiceCardsGridProps {
  standardServices: CfCollectionService[];
  specialServices: CfCollectionService[];
  defaultServiceImage: Asset;
  useVtTranslate: UseVtTranslateType;
  currentModalAtom: ReturnType<VTAtom<ModalsState["currentModal"]>["vTAtom"]>;
  currentlyDisplayedServiceAtom: ReturnType<
    VTAtom<CfCollectionService["fields"] | null>["vTAtom"]
  >;
  router: any;
  customUseAtom: typeof useAtom;
}

export default ServiceCardsGrid;
