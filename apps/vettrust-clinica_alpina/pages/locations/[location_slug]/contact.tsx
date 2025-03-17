/* eslint-disable camelcase,no-use-before-define,indent */
import { GetServerSidePropsContext } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import React, { useEffect } from "react";
import { useAtom } from "jotai";
import {
  PageProps,
  CFCollectionLocation,
  NextJsStaticPath,
  CFPageLocationCommonMetadata,
  getDynamicPageSlugsStaticPaths,
  client,
  getContentfulLocale,
  ComponentProps,
  Button,
  Section,
  DotIcon,
  Mail,
  MapPin,
  PhoneCall,
  OpeningHours,
  ModalsOptions,
  getGooglePlaceInfoOnMapsUrl,
  VetTrustMap,
  VTPlatformURLS,
  getPlaceDetails,
} from "@somethingcreative-agency/vettrust-design_system";
import { useRouter } from "next/router";
import {
  currentlyDisplayedLocationAtom,
  locationGooglePlacesDataAtom,
} from "../../../atoms/locations";
import { navigationDynamicSlugListAtom } from "../../../atoms/navigation";
import useVtTranslate from "../../../shared/utils/useVtTranslate";
import { currentPracticeSearchStepAtom } from "../../../atoms/practiceSearch";
import { currentModalAtom } from "../../../atoms/modals";
import { allAtomsAndI18n } from "../../../shared/utils/designSystem";

const LocationContactPage = ({
  location,
  locale,
  slugsList,
}: ComponentProps<LocationDepartmentsPageProps>) => {
  const { t } = useVtTranslate("location");
  const router = useRouter();
  const [currentlyDisplayedLocation, setCurrentlyDisplayedLocation] = useAtom(
    currentlyDisplayedLocationAtom
  );

  const [locationsSlugList, setLocationsSlugList] = useAtom(
    navigationDynamicSlugListAtom
  );

  const [locationGooglePlacesData, setLocationGooglePlacesData] = useAtom(
    locationGooglePlacesDataAtom
  );

  const [, setCurrentModal] = useAtom(currentModalAtom);

  const [, setCurrentSearchStep] = useAtom(currentPracticeSearchStepAtom);

  const getGoogleData = async () => {
    try {
      const googlePlacesData = await getPlaceDetails(
        location.fields.googlePlaceId,
        location.sys.id,
        locale,
        process.env.CLINICA_ALPINA_DOMAIN
      );

      setLocationGooglePlacesData(googlePlacesData);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(
    () => {
      if (!currentlyDisplayedLocation) {
        setCurrentlyDisplayedLocation(location.fields);
      }

      if (locationsSlugList.length === 0) {
        setLocationsSlugList(slugsList);
      }

      if (!locationGooglePlacesData) getGoogleData();

      return () => {
        setCurrentlyDisplayedLocation(null);
        setLocationsSlugList([]);
        setLocationGooglePlacesData(null);
        setCurrentSearchStep(null);
      };
    },
    // ⚠️ Don't update the dependency array, otherwise it goes into an infinite loop ⚠️
    // eslint-disable-next-line
    []
  );

  return (
    <div className="content-wrapper pb-[192px] flex flex-col lg:flex-row items-center mt-[144px] lg:mt-[176px]">
      <div className="w-full h-[408px] sm:w-[952px] sm:h-[640px] shadow-vtCard relative default-radius overflow-hidden">
        <VetTrustMap
          router={router}
          pinIcon="default"
          displayedPins={
            locationGooglePlacesData?.geometry
              ? [locationGooglePlacesData.geometry?.location as any]
              : []
          }
          withoutLocationDescriptors
          {...allAtomsAndI18n}
        />
      </div>

      <div className="z-10 px-[10px]">
        <div className="bg-white w-full h-max sm:w-[560px] shadow-vtCard rounded-[12px] p-[20px] sm:p-[40px] mt-[-226px] lg:ml-[-280px] lg:mt-0">
          <Section
            title={{ text: t("HOME_CONTACT_SECTION.TITLE"), level: "h2" }}
          >
            <div className="flex flex-row gap-[8px]">
              <span className="h-[24px] flex flex-col justify-center">
                <MapPin />
              </span>{" "}
              <div className="line-clamp-2 underline">
                {locationGooglePlacesData?.formatted_address &&
                locationGooglePlacesData &&
                locationGooglePlacesData.geometry ? (
                  <a
                    className="underline"
                    href={getGooglePlaceInfoOnMapsUrl(
                      locationGooglePlacesData.geometry.location,
                      location.fields.googlePlaceId as string
                    )}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {locationGooglePlacesData?.formatted_address}
                  </a>
                ) : (
                  `${locationGooglePlacesData?.formatted_address || "..."}`
                )}
              </div>
            </div>
            {locationGooglePlacesData?.opening_hours && (
              <div className="flex flex-row items-center flex-wrap mt-[12px]">
                <OpeningHours
                  placesData={locationGooglePlacesData as any}
                  useVtTranslate={useVtTranslate}
                />
                {locationGooglePlacesData?.opening_hours?.weekday_text && (
                  <div className="flex flex-row [@media(max-width:434px)]:pl-[15px]">
                    <span className="px-[8px] h-[24px] flex flex-col justify-center">
                      <DotIcon />
                    </span>
                    <button
                      type="button"
                      className="underline"
                      onClick={() => {
                        setCurrentModal({
                          type: ModalsOptions.ALL_OPENING_HOURS,
                          minWidth: "md",
                        });
                      }}
                    >
                      {t("HERO_SHELL.ALL_OPENING_HOURS")}
                    </button>
                  </div>
                )}
              </div>
            )}
            <div className="flex flex-row gap-[8px] items-center mt-[12px]">
              <span>
                <PhoneCall className="w-[16px] h-[16px]" />
              </span>
              <a href={`tel:${location.fields.phone}`} className="underline">
                {location.fields.phone}
              </a>
            </div>
            {location.fields.email !== undefined && (
              <div className="flex flex-row gap-[8px] items-center mt-[12px]">
                <span>
                  <Mail />
                </span>{" "}
                <a
                  href={`mailto:${location.fields.email}`}
                  className="underline"
                >
                  {location.fields.email}
                </a>
              </div>
            )}
            {location.fields.vestoriaId && (
              <Button
                type="PRIMARY"
                size="lg"
                iconLeft="Calendar"
                focusRingClassName="xs:ring-offset-white"
                className="mt-[40px] w-full"
                onClick={() => {
                  setCurrentModal({
                    type: ModalsOptions.LOCATION_APPOINTMENT_BOOKING,
                    minWidth: "md",
                  });
                }}
                router={router}
              >
                {t("HOME_CONTACT_SECTION.BOOK_NOW_BUTTON")}
              </Button>
            )}
            {location.fields.email && (
              <Button
                type="TERTIARY"
                size="lg"
                iconLeft="Mail"
                focusRingClassName="xs:ring-offset-white"
                className="mt-[12px] w-full"
                onClick={() => {
                  setCurrentModal({
                    type: ModalsOptions.CONTACT_MODAL,
                    minWidth: "md",
                  });
                }}
                router={router}
              >
                {t("HOME_CONTACT_SECTION.CONTACT_BUTTON")}
              </Button>
            )}
          </Section>
        </div>
      </div>
    </div>
  );
};

export async function getStaticProps({
  locale,
  params: { location_slug },
}: GetServerSidePropsContext<any>) {
  const location = await client.getEntries<CFCollectionLocation["fields"]>({
    content_type: "collection__locations",
    "fields.slug": location_slug,
    locale: getContentfulLocale(locale as string),
    include: 3,
  });

  const slugsList = await getDynamicPageSlugsStaticPaths(
    "collection__locations",
    "location_slug",
    {
      "fields.platformUrl[in]": VTPlatformURLS.CLINICA_ALPINA,
    }
  );

  return {
    props: {
      locale,
      location: location.items[0],
      slugsList,
      ...(await serverSideTranslations(locale as string, [
        "blog",
        "common",
        "about",
        "location",
        "location-contact",
        "referral"
      ])),
    },
  };
}

export async function getStaticPaths() {
  const paths = (
    await getDynamicPageSlugsStaticPaths(
      "collection__locations",
      "location_slug",
      {
        "fields.platformUrl[in]": VTPlatformURLS.CLINICA_ALPINA,
      }
    )
  ).map((el) => ({
    params: el.params,
    locale: el.locale,
  }));

  // We'll pre-render only these paths at build time.
  // { fallback: blocking } will server-render pages
  // on-demand if the path doesn't exist.
  return {
    paths: paths || [],
    fallback: false,
  };
}

type LocationDepartmentsPageProps = PageProps<
  {
    location: CFCollectionLocation;
    slugsList: NextJsStaticPath[];
  },
  CFPageLocationCommonMetadata
>;

export default LocationContactPage;
