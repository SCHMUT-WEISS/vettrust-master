/* eslint-disable camelcase,no-use-before-define,indent */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-use-before-define */
import { GetServerSidePropsContext } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import React, { useEffect, useMemo } from "react";
import { useAtom } from "jotai";
import {
  PageProps,
  CFCollectionLocation,
  NextJsStaticPath,
  CFPageLocationCommonMetadata,
  getDynamicPageSlugsStaticPaths,
  client,
  getContentfulLocale,
  getPlaceDetails,
  ComponentProps,
  VTPlatformURLS,
  Section,
  GlobalPartnerCard,
  Paragraph,
} from "@somethingcreative-agency/vettrust-design_system";
import { useRouter } from "next/router";
import {
  currentlyDisplayedLocationAtom,
  locationGooglePlacesDataAtom,
} from "../../../atoms/locations";
import { navigationDynamicSlugListAtom } from "../../../atoms/navigation";
import useVtTranslate from "../../../shared/utils/useVtTranslate";
import { currentPracticeSearchStepAtom } from "../../../atoms/practiceSearch";

const OurPartners = ({
  location,
  slugsList,
  locale,
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

  const sortedPartners = useMemo(
    () =>
      (currentlyDisplayedLocation?.partners || []).sort((a, b) => {
        return a.fields.sortingIndex - b.fields.sortingIndex;
      }),
    [currentlyDisplayedLocation]
  );

  const partnersNodes = useMemo(
    () =>
      sortedPartners.map((partnerType) => (
        <Section
          title={{ text: partnerType.fields.name, level: "h2" }}
          className="mb-[64px]"
          key={partnerType.sys.id}
          childrenContainerClassname="pt-[8px]"
        >
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-[32px]">
            {partnerType.fields.partners.map((partner) => (
              <GlobalPartnerCard
                partner={partner}
                key={Math.random()}
                useVtTranslate={useVtTranslate}
                router={router}
              />
            ))}
          </div>
        </Section>
      )),
    [sortedPartners]
  );

  return (
    <div className="container-wrapper">
      <Section
        title={{ text: t("REGIONAL_PARTNERS_PAGE.TITLE"), level: "h1" }}
        className="mb-[64px] lg:mb-[96px] mt-[144px] lg:mt-[176px]"
      >
        <Paragraph type="body_1">
          {t("REGIONAL_PARTNERS_PAGE.DESCRIPTION")}
        </Paragraph>
      </Section>

      {partnersNodes}
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

export default OurPartners;
