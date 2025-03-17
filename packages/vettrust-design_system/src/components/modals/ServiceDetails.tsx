import React, { useState } from "react";
import { useAtom } from "jotai";
import { Document } from "@contentful/rich-text-types";
import {
  ComponentProps,
  VTAtom,
  LocationFields,
  CfCollectionService,
  ModalsState,
  UseVtTranslateType,
  ModalsOptions
} from "../../@types";
import Button from "../shared/Button";
import Heading from "../shared/Heading";
import Paragraph from "../shared/Paragraph";
import Section from "../shared/Section";
import VTImage from "../shared/VTImage";
import { formatURL } from "../../shared/utils";
import RichTextRenderer from "../shared/RichTextRenderer";

const ServiceDetails: React.FC<ComponentProps<ServiceDetailsProps>> = ({
  currentlyDisplayedLocationAtom,
  currentlyDisplayedServiceAtom,
  currentModalAtom,
  useVtTranslate,
  router,
  customUseAtom
}) => {
  const { t } = useVtTranslate("location");
  const [currentlyDisplayedService] = customUseAtom(
    currentlyDisplayedServiceAtom
  );
  const [currentlyDisplayedLocation] = customUseAtom(
    currentlyDisplayedLocationAtom
  );
  const [, setCurrentModal] = customUseAtom(currentModalAtom);
  const [isLoading, setIsLoading] = useState(false);

  const image = currentlyDisplayedService?.image;

  const SectionTitle = () => {
    return (
      <div>
        <Heading level="h3" text={currentlyDisplayedService?.name} />
        <Paragraph type="body_1" className="font-[400]">
          {currentlyDisplayedService?.serviceGroups[0]?.fields?.name}
        </Paragraph>
      </div>
    );
  };

  const isTelemedicine = currentlyDisplayedService?.serviceGroups.some(
    (group) => group.fields.isTelemedicine
  );

  return (
    <div className="max-w-[1040px] p-[20px] lg:p-[40px]">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-[20px] lg:gap-[56px]">
        <div className="w-full h-[250px] md:h-[428px] lg:h-[auto] relative">
          <VTImage
            src={formatURL(image?.fields?.file?.url as string)}
            layout="fill"
            objectFit="cover"
            className="rounded-[12px]"
            placeholder="blur"
            blurDataURL={formatURL(image?.fields?.file?.url as string)}
            alt={image?.fields?.description}
          />
        </div>

        <Section
          title={{
            text: <SectionTitle />,
            level: "h3"
          }}
        >
          <Paragraph type="body_1">
            <RichTextRenderer
              document={currentlyDisplayedService?.description as Document}
              useVtTranslate={useVtTranslate}
            />
          </Paragraph>

          <Button
            type="PRIMARY"
            size="lg"
            className="mt-[24px]"
            onClick={() => {
              setIsLoading(true);
              setCurrentModal({
                type: isTelemedicine ? ModalsOptions.VESTORIA_WIDGET : null,
                minWidth: "md"
              });
              if (!isTelemedicine) {
                router
                  .push(
                    `/locations/${currentlyDisplayedLocation?.slug}/contact`
                  )
                  .then(() => {
                    setIsLoading(false);
                  });
              }
            }}
            isLoading={isLoading}
            disabled={isLoading}
            router={router}
          >
            {t(
              isTelemedicine
                ? "SERVICES_SECTION.MODAL_TELEMEDICINE_BUTTON_LABEL"
                : "SERVICES_SECTION.MODAL_BUTTON_LABEL"
            )}
          </Button>
        </Section>
      </div>
    </div>
  );
};

interface ServiceDetailsProps {
  currentlyDisplayedLocationAtom: ReturnType<
    VTAtom<LocationFields | null>["vTAtom"]
  >;
  currentlyDisplayedServiceAtom: ReturnType<
    VTAtom<CfCollectionService["fields"] | null>["vTAtom"]
  >;
  currentModalAtom: ReturnType<VTAtom<ModalsState["currentModal"]>["vTAtom"]>;
  useVtTranslate: UseVtTranslateType;
  router: any;
  customUseAtom: typeof useAtom;
}

export default ServiceDetails;
