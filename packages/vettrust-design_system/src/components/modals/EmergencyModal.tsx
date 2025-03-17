/* eslint-disable security/detect-object-injection */
import React from "react";
import { useAtom } from "jotai";
import {
  ComponentProps,
  VTAtom,
  CFPageLocationCommonMetadata,
  UseVtTranslateType,
  VTPlatformURLS,
  CFCollectionLocation
} from "../../@types";
import VTImage from "../shared/VTImage";
import Section from "../shared/Section";
import Heading from "../shared/Heading";
import Button from "../shared/Button";
import Paragraph from "../shared/Paragraph";
import { formatURL } from "../../shared/utils";
import { DEFAULT_IMAGE_LOADER } from "../../shared/pages";

interface EmergencyModalProps {
  currentlyDisplayedLocationAtom: ReturnType<
    VTAtom<CFCollectionLocation["fields"] | null>["vTAtom"]
  >;
  locationPageMetaAtom: ReturnType<
    VTAtom<CFPageLocationCommonMetadata["fields"] | null>["vTAtom"]
  >;
  useVtTranslate: UseVtTranslateType;
  router: any;
  customUseAtom: typeof useAtom;
  platformUrl: VTPlatformURLS;
}

const EmergencyModal: React.FC<ComponentProps<EmergencyModalProps>> = ({
  locationPageMetaAtom,
  currentlyDisplayedLocationAtom,
  useVtTranslate,
  router,
  customUseAtom,
  platformUrl
}) => {
  const { t } = useVtTranslate();
  const [locationPageMeta] = customUseAtom(locationPageMetaAtom);
  const [currentlyDisplayedLocation] = customUseAtom(currentlyDisplayedLocationAtom);
  
  const chargeable = currentlyDisplayedLocation?.emergencyPhoneNumberPrice || 0;
  const phoneNumber = currentlyDisplayedLocation?.emergencyPhoneNumber || locationPageMeta?.emergencyPhoneNumber;

  const mainEmergencySection = {
    [VTPlatformURLS.VETTRUST]: (
      <div className="w-full border-[1px] border-solid border-magenta rounded-[12px] p-[16px] flex flex-col lg:flex-row items-center gap-[16px] mb-[16px] bg-magenta/5">
        <div className="w-full lg:w-[50%]">
          <Heading
            text={chargeable !== 0? t("EMERGENCY_MODAL.PHONE_NUMBER_CHARGEABLE_HEADING", {price: chargeable}) : t("EMERGENCY_MODAL.PHONE_NUMBER_HEADING")}
            level="h5"
          />
        </div>
        <div className="w-full lg:w-[50%] flex justify-end whitespace-nowrap">
          <Button
            type="MAGENTA"
            size="lg"
            iconLeft="PhonePlus"
            className="rounded-[8px]"
            focusRingClassName="xs:ring-offset-white"
            url={`tel:${phoneNumber}`}
            router={router}
          >
            {phoneNumber}
          </Button>
        </div>
      </div>
    ),
    [VTPlatformURLS.CLINICA_ALPINA]: (
      <div className="w-full border-[1px] border-solid border-magenta rounded-[12px] p-[16px] flex flex-col items-center gap-[16px] mb-[16px] bg-magenta/5">
        <div className="w-full ">
          <Heading
            text={chargeable !== 0 ? t("EMERGENCY_MODAL.PHONE_NUMBER_CHARGEABLE_HEADING", {price: chargeable}) : t("EMERGENCY_MODAL.PHONE_NUMBER_HEADING")}
            level="h5"
          />
        </div>
        <div className="w-full flex justify-end whitespace-nowrap">
          <Button
            type="MAGENTA"
            size="lg"
            iconLeft="PhonePlus"
            className="rounded-[8px] w-full"
            focusRingClassName="xs:ring-offset-white"
            url={`tel:${t("FOOTER.VETTRUST.TELEPHONE_NUMBER_1")}`}
            router={router}
          >
            Scuol: {t("FOOTER.VETTRUST.TELEPHONE_NUMBER")}
          </Button>
        </div>
        <div className="w-full flex justify-end whitespace-nowrap">
          <Button
            type="MAGENTA"
            size="lg"
            iconLeft="PhonePlus"
            className="rounded-[8px] w-full"
            focusRingClassName="xs:ring-offset-white"
            url={`tel:${t("FOOTER.VETTRUST.TELEPHONE_NUMBER_2")}`}
            router={router}
          >
            Celerina: {t("FOOTER.VETTRUST.TELEPHONE_NUMBER_2")}
          </Button>
        </div>
      </div>
    )
  };

  return (
    <div className="max-w-[1040px] p-[20px] lg:p-[40px]">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-[20px] lg:gap-[56px]">
        <div className="w-full h-[250px] md:h-[414px] lg:h-[auto] relative overflow-hidden ">
          <VTImage
            src={formatURL(
              locationPageMeta?.emergencyImage?.fields?.file?.url as string
            )}
            layout="fill"
            objectFit="cover"
            objectPosition="center"
            placeholder="blur"
            blurDataURL={DEFAULT_IMAGE_LOADER}
            className="default-radius"
            alt={locationPageMeta?.emergencyImage?.fields?.description}
          />
        </div>

        <Section title={{ text: chargeable !== 0 ? t("EMERGENCY_MODAL.TITLE_CHARGEABLE") : t("EMERGENCY_MODAL.TITLE"), level: "h3" }}>
          {mainEmergencySection[platformUrl]}

          <Paragraph type="body_2" className="mb-[16px]">
            {t("EMERGENCY_MODAL.DESCRIPTION_1")}
          </Paragraph>

          {platformUrl !== VTPlatformURLS.CLINICA_ALPINA && (
            <React.Fragment>
              <Paragraph type="body_2" className="mb-[16px]">
                {t("EMERGENCY_MODAL.DESCRIPTION_2")}
              </Paragraph>

              <Paragraph type="body_2">
                {t("EMERGENCY_MODAL.DESCRIPTION_3")}
              </Paragraph>
            </React.Fragment>
          )}
        </Section>
      </div>
    </div>
  );
};

export default EmergencyModal;
