/* eslint-disable no-use-before-define,jsx-a11y/anchor-is-valid,camelcase */
import React from "react";
import { PlaceData } from "@googlemaps/google-maps-services-js";
import { useAtom } from "jotai";
import {
  CFCollectionLocation,
  ComponentProps,
  VTAtom,
  ModalsOptions,
  ModalsState,
  UseVtTranslateType
} from "../../../@types";
import VTImage from "../../shared/VTImage";
import Heading from "../../shared/Heading";
import Button from "../../shared/Button";
import { ExternalLink } from "../../../assets/icons";
import OpeningHours from "../OpeningHours";
import { formatURL } from "../../../shared/utils";
import { DEFAULT_IMAGE_LOADER } from "../../../shared/pages";

const ArrowRightDangerIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M0.833496 8.00016C0.833496 4.04212 4.04212 0.833496 8.00016 0.833496C11.9582 0.833496 15.1668 4.04212 15.1668 8.00016C15.1668 11.9582 11.9582 15.1668 8.00016 15.1668C4.04212 15.1668 0.833496 11.9582 0.833496 8.00016Z"
      fill="#D52F89"
    />
    <path
      d="M4.6665 7.99984H11.3332M11.3332 7.99984L7.99984 4.6665M11.3332 7.99984L7.99984 11.3332"
      stroke="white"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const LocationSearchResultCard: React.FC<
  ComponentProps<LocationSearchResultCardProps>
> = ({
  location,
  googlePlacesData,
  useVtTranslate,
  currentModalAtom,
  currentlyDisplayedLocationAtom,
  Link,
  router,
  customUseAtom
}) => {
  const { t } = useVtTranslate("location");
  const [, setCurrentLocation] = customUseAtom(currentlyDisplayedLocationAtom);
  const [, setCurrentModal] = customUseAtom(currentModalAtom);

  const externalLink = location?.fields?.hasExternalWebsite
    ? location?.fields?.externalWebsiteUrl
    : null;
  const locationWithoutVestoriaIdContactUrl =
    externalLink || `/locations/${location?.fields.slug}/contact`;

  return (
    <div className="flex flex-col md:flex-row gap-[20px] pt-[24px] border-t border-sand-pressed ">
      <div className="h-[188px] md:h-[116px] my-auto md:max-w-[200px] md:min-w-[200px] lg:max-w-[160px] lg:min-w-[160px] w-full overflow-hidden rounded-[8px] object-cover relative ">
        <VTImage
          src={formatURL(location?.fields?.heroImages[0]?.fields?.file?.url)}
          layout="fill"
          objectFit="cover"
          objectPosition="center"
          placeholder="blur"
          blurDataURL={
            formatURL(location?.fields.heroImages[0]?.fields?.file?.url) ||
            DEFAULT_IMAGE_LOADER
          }
          className="w-full h-full"
          alt={location?.fields?.heroImages[0]?.fields?.description}
        />
      </div>
      <div className="flex flex-col">
        <div className="flex-auto">
          <Link
            href={
              location.fields.hasExternalWebsite
                ? (location.fields.externalWebsiteUrl as string)
                : `/locations/${location.fields.slug}`
            }
            passHref
          >
            <a
              target={location.fields.hasExternalWebsite ? "_blank" : undefined}
            >
              <Heading
                level="h4"
                className={`hover:text-magenta leading-[28px] ${
                  location.fields.hasExternalWebsite
                    ? "hover:cursor-alias"
                    : "hover:cursor-pointer"
                } group`}
                text={
                  <span>
                    <span className="fle flex-row items-center ">
                      {location.fields.name?.trim()}
                    </span>
                    <span
                      className={`${
                        location.fields.hasExternalWebsite
                          ? "inline-block"
                          : "hidden group-hover:inline-block"
                      } ml-[8px] items-center translate-y-[4px]`}
                    >
                      {location.fields.hasExternalWebsite ? (
                        <ExternalLink />
                      ) : (
                        <ArrowRightDangerIcon />
                      )}
                    </span>
                  </span>
                }
              />
            </a>
          </Link>
          {googlePlacesData?.opening_hours && (
            <OpeningHours
              className="mt-[8px]"
              placesData={googlePlacesData}
              useVtTranslate={useVtTranslate}
            />
          )}
        </div>
        <div className="flex mt-[12px] gap-[12px]">
        {(location.fields.bookingUrl || location.fields.vestoriaId) && !externalLink ? (
            <React.Fragment>
              <Button
                type="PRIMARY"
                size="sm"
                iconLeft="Calendar"
                onClick={() => {
                  // eslint-disable-next-line no-unused-expressions
                  // @ts-ignore
                  window?.dataLayer?.push({
                    event: "gtm-booking-enter",
                    bookingPracticeName: location.fields.name
                  });
                  setCurrentLocation(location.fields);
                  setCurrentModal({
                    type: ModalsOptions.LOCATION_APPOINTMENT_BOOKING,
                    minWidth: "lg"
                  });
                }}
                className="shadow-none gtm-booking-enter"
                router={router}
              >
                {t("HOME_CONTACT_SECTION.BOOK_NOW_BUTTON")}
              </Button>
              <Button
                type="SECONDARY"
                size="sm"
                iconLeft="Mail"
                onClick={() => {
                  router.push(`/locations/${location.fields.slug}/contact`);
                }}
                className="shadow-none"
                router={router}
              >
                {t("common:FOOTER.VETERINARIANS.CONTACT")}
              </Button>
            </React.Fragment>
          ) : (
            <Button
              type="PRIMARY"
              size="sm"
              iconLeft="Calendar"
              url={locationWithoutVestoriaIdContactUrl}
              className="shadow-none"
              target={externalLink ? "_blank" : undefined}
              router={router}
            >
              {t("SEARCH_PAGE.APPOINTMENT_REQUEST_AND_CONTACT_BUTTON")}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

interface LocationSearchResultCardProps {
  location: CFCollectionLocation;
  googlePlacesData: Partial<PlaceData>;
  useVtTranslate: UseVtTranslateType;
  currentModalAtom: ReturnType<VTAtom<ModalsState["currentModal"]>["vTAtom"]>;
  currentlyDisplayedLocationAtom: ReturnType<
    VTAtom<CFCollectionLocation["fields"] | null>["vTAtom"]
  >;
  router: any;
  Link: React.ForwardRefExoticComponent<any>;
  customUseAtom: typeof useAtom;
}

export default LocationSearchResultCard;
