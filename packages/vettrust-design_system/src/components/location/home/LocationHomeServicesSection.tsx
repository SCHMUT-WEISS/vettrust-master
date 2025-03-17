/* eslint-disable no-use-before-define */
import React, { useMemo } from "react";
import { useAtom } from "jotai";
import {
  ComponentProps,
  VTAtom,
  CFCollectionLocation,
  CFPageLocationCommonMetadata,
  ModalsState,
  CfCollectionService,
  UseVtTranslateType
} from "../../../@types";
import StackedHalfSurface from "../../surfaces/StackedHalfSurface";
import Section from "../../shared/Section";
import Paragraph from "../../shared/Paragraph";
import Button from "../../shared/Button";
import LocationServicesCarousel from "../services/LocationServicesCarousel";
import { BgCircleCanvas } from "../../../assets/svg";
import { DEFAULT_IMAGE_LOADER } from "../../../shared/pages";
import { formatURL } from "../../../shared/utils";

const LocationHomeServicesSection: React.FC<
  ComponentProps<LocationHomeServicesSectionProps>
> = ({
  location,
  pageMeta,
  useVtTranslate,
  currentlyDisplayedServiceAtom,
  currentModalAtom,
  router,
  customUseAtom
}) => {
  const { t } = useVtTranslate("location");
  const uniqueServices = useMemo(
    () =>
      location.fields.servicesProvided
        .map((relation) => relation.fields.relatedService)
        .filter((el) => el.fields)
        .filter(
          (el, i, arr) => arr.findIndex((e) => e.sys.id === el.sys.id) === i
        ),
    [location.fields.servicesProvided]
  );

  return (
    <React.Fragment>
      {location.fields.displayTheServicesSection !== false && (
        <StackedHalfSurface
          image={{
            src: formatURL(
              pageMeta?.fields?.ourStandardServicesSectionImage?.fields?.file?.url
            ),
            alt: pageMeta?.fields?.ourStandardServicesSectionImage?.fields
              ?.description,
            blurDataUrl:
              formatURL(
                pageMeta?.fields?.ourStandardServicesSectionImage?.fields?.file
                  ?.url
              ) || DEFAULT_IMAGE_LOADER,
            className: "[height:273px_!important] lg:[height:444px_!important]"
          }}
          className="mt-[128px] lg:mt-[192px]"
          showBgImageToTheRight
        >
          <Section
            title={{
              text: t("SERVICES_SECTION.TITLE"),
              level: "h2",
              className: ""
            }}
            className="flex flex-col justify-center h-full"
          >
            <Paragraph type="body_1">
              {t("SERVICES_SECTION.DESCRIPTION")}
            </Paragraph>
            <Button
              type="PRIMARY"
              size="lg"
              iconRight="ArrowRight"
              className="mt-[40px]"
              url={`/locations/${location.fields.slug}/services`}
              router={router}
            >
              {t("SERVICES_SECTION.BUTTON_LABEL")}
            </Button>
          </Section>
        </StackedHalfSurface>
      )}
      
      {location.fields.servicesProvided && (
        <div className="relative z-[10]">
          <BgCircleCanvas className="absolute left-[-400px] top-[calc(50%_-_400px)] z-[-1]" />
          <Section
            title={{
              text: t("SERVICES_CAROUSEL_SECTION.TITLE"),
              level: "h2",
              className: ""
            }}
            className="container-wrapper z-[11] mt-[128px] lg:mt-[192px]"
          >
            <div className="md:flex justify-between gap-[40px] ">
              <Paragraph type="body_1">
                {t("SERVICES_CAROUSEL_SECTION.DESCRIPTION")}
              </Paragraph>
              <Button
                type="PRIMARY"
                size="lg"
                className="mt-[40px] lg:mt-[0]"
                disabled={false}
                iconRight="ArrowRight"
                url={`/locations/${location.fields.slug}/services`}
                router={router}
              >
                {t("SERVICES_CAROUSEL_SECTION.BUTTON_LABEL")}
              </Button>
            </div>
          </Section>
          <LocationServicesCarousel
            services={uniqueServices.filter((el) =>
              el.fields.serviceGroups.some(
                (sg) => !sg.fields.isStandardServiceGroup
              )
            )}
            className="mt-[40px]"
            defaultServiceImage={pageMeta.fields.defaultServiceImage}
            currentModalAtom={currentModalAtom}
            currentlyDisplayedServiceAtom={currentlyDisplayedServiceAtom}
            router={router}
            useVtTranslate={useVtTranslate}
            customUseAtom={customUseAtom}
          />
        </div>
      )}
    </React.Fragment>
  );
};

interface LocationHomeServicesSectionProps {
  location: CFCollectionLocation;
  useVtTranslate: UseVtTranslateType;
  pageMeta: CFPageLocationCommonMetadata;
  currentModalAtom: ReturnType<VTAtom<ModalsState["currentModal"]>["vTAtom"]>;
  currentlyDisplayedServiceAtom: ReturnType<
    VTAtom<CfCollectionService["fields"] | null>["vTAtom"]
  >;
  router: any;
  customUseAtom: typeof useAtom;
}

export default LocationHomeServicesSection;
