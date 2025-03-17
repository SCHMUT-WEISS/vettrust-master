/* eslint-disable no-use-before-define,react/jsx-curly-newline */
import React from "react";
import { Asset } from "contentful";
import { useAtom } from "jotai";
import {
  ComponentProps,
  VTAtom,
  ModalsOptions,
  ModalsState,
  UseVtTranslateType
} from "../../../@types";
import { formatURL } from "../../../shared/utils";
import Section from "../../shared/Section";
import Button from "../../shared/Button";
import StackedLeftSurface from "../../surfaces/StackedLeftSurface";
import Paragraph from "../../shared/Paragraph";

const LocationHomePetAmbulanceSection: React.FC<
  ComponentProps<LocationHomePetAmbulanceSectionProps>
> = ({
  image,
  className,
  emergencyPhone,
  locationSlug,
  useVtTranslate,
  currentModalAtom,
  router,
  customUseAtom,
}) => {
  const { t } = useVtTranslate("location");
  const [, setCurrentModal] = customUseAtom(currentModalAtom);

  return (
    <StackedLeftSurface
      image={{
        alt: image.fields.description,
        blurDataUrl: formatURL(image.fields.file.url),
        src: formatURL(image.fields.file.url)
      }}
      className={`mt-[128px] lg:mt-[192px] ${className}`}
    >
      <Section
        title={{
          text: t("HOME_PET_AMBULANCE_SECTION.TITLE"),
          level: "h2",
          className: "text-white"
        }}
        className="bg-darkBlue default-radius text-white p-[20px] lg:p-[40px]"
      >
        <Paragraph type="body_1" className="mt-[4px] font-bold ">
          {t("HOME_PET_AMBULANCE_SECTION.DESCRIPTION_1")}
        </Paragraph>
        <Paragraph type="body_1" className="mt-[4px] ">
          {t("HOME_PET_AMBULANCE_SECTION.DESCRIPTION_2", {
            emergency_phone: emergencyPhone
          })}
        </Paragraph>
        <div className="flex flex-col lg:flex-row mt-[40px] gap-[16px]">
          <Button
            type="MAGENTA"
            size="lg"
            iconLeft="PhonePlus"
            focusRingClassName="xs:ring-offset-white"
            onClick={() =>
              setCurrentModal({
                type: ModalsOptions.EMERGENCY,
                minWidth: "md"
              })
            }
            router={router}
          >
            {t("HOME_PET_AMBULANCE_SECTION.BUTTON_LABEL_1")}
          </Button>
          <Button
            type="SECONDARY"
            size="lg"
            iconRight="ArrowRight"
            focusRingClassName="xs:ring-offset-white"
            url={`/locations/${locationSlug}/animal-rescue`}
            router={router}
          >
            {t("HOME_PET_AMBULANCE_SECTION.BUTTON_LABEL_2")}
          </Button>
        </div>
      </Section>
    </StackedLeftSurface>
  );
};

interface LocationHomePetAmbulanceSectionProps {
  image: Asset;
  emergencyPhone: string;
  locationSlug: string;
  useVtTranslate: UseVtTranslateType;
  currentModalAtom: ReturnType<VTAtom<ModalsState["currentModal"]>["vTAtom"]>;
  router: any;
  customUseAtom: typeof useAtom;
}

export default LocationHomePetAmbulanceSection;
