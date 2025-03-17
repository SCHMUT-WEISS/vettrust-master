/* eslint-disable jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions,sonarjs/no-identical-functions */
import { useAtom } from "jotai";
import React from "react";
import { Asset } from "contentful";
import {
  ModalsOptions,
  ModalsState,
  ComponentProps,
  VTAtom,
  CfCollectionService,
  UseVtTranslateType
} from "../../../@types";
import Paragraph from "../../shared/Paragraph";
import Heading from "../../shared/Heading";
import VTImage from "../../shared/VTImage";
import Button from "../../shared/Button";
import { formatURL } from "../../../shared/utils";
import { DEFAULT_IMAGE_LOADER } from "../../../shared/pages";

// eslint-disable-next-line no-use-before-define
const ServiceCard: React.FC<ComponentProps<ServiceCardProps>> = ({
  service,
  defaultImage,
  currentModalAtom,
  currentlyDisplayedServiceAtom,
  useVtTranslate,
  router,
  customUseAtom,
}) => {
  const { t } = useVtTranslate("location");
  const [, setCurrentModal] = customUseAtom(currentModalAtom);
  const [, setCurrentlyDisplayedService] = customUseAtom(
    currentlyDisplayedServiceAtom
  );

  const image = service?.fields?.image || defaultImage;

  return (
    <div className="service-card-wrapper h-full">
      <div
        className="bg-white p-[12px] lg:p-[16px] default-radius shadow-vtCard h-full flex flex-col cursor-pointer"
        onClick={() => {
          setCurrentlyDisplayedService({
            ...service.fields,
            image
          });
          setCurrentModal({
            type: ModalsOptions.SERVICE_DETAILS,
            minWidth: "md"
          });
        }}
      >
        <div className="flex-auto">
          <div className="w-full h-[208px] relative rounded-[8px] overflow-hidden">
            <VTImage
              src={formatURL(image.fields?.file?.url)}
              layout="fill"
              objectFit="cover"
              objectPosition="center"
              placeholder="blur"
              blurDataURL={
                formatURL(image?.fields?.file?.url) || DEFAULT_IMAGE_LOADER
              }
              alt={image?.fields?.description}
            />
          </div>

          <Heading
            level="h4"
            text={service.fields.name}
            className="mt-[20px] line-clamp-2 mx-[8px]"
          />

          <Paragraph
            type="body_3"
            className="line-clamp-2 mt-[4px] mx-[8px] text-darkBlue"
          >
            {service.fields.serviceGroups?.map((group) => group.fields.name)}
          </Paragraph>
        </div>

        <Button
          type="TERTIARY"
          size="sm"
          className="border-0 p-0 text-[16px] justify-start mt-[16px] h-[24px] mx-[8px] mb-[8px]"
          disabled={false}
          focusRingClassName="xs:ring-offset-white"
          onClick={() => {
            setCurrentlyDisplayedService({
              ...service.fields,
              image
            });
            setCurrentModal({
              type: ModalsOptions.SERVICE_DETAILS,
              minWidth: "md"
            });
          }}
          iconLeft="PlusDanger"
          router={router}
        >
          {t("SERVICES_CAROUSEL_SECTION.SERVICE_CARD_BUTTON_LABEL")}
        </Button>
      </div>
    </div>
  );
};

interface ServiceCardProps {
  service: CfCollectionService;
  defaultImage: Asset;
  currentModalAtom: ReturnType<VTAtom<ModalsState["currentModal"]>["vTAtom"]>;
  currentlyDisplayedServiceAtom: ReturnType<
    VTAtom<CfCollectionService["fields"] | null>["vTAtom"]
  >;
  router: any;
  useVtTranslate: UseVtTranslateType;
  customUseAtom: typeof useAtom;
}

export default ServiceCard;
