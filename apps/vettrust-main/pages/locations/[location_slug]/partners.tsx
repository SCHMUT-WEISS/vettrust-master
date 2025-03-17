/* eslint-disable camelcase,no-use-before-define,sonarjs/no-identical-functions,security/detect-object-injection,indent,sonarjs/cognitive-complexity */
import { useAtom } from "jotai";
import { GetServerSidePropsContext } from "next";
import { useRouter } from "next/router";
import {
  CFCollectionLocation,
  CFPageLocationCommonMetadata,
  GlobalPartnerCard,
  LocationTypeKeys,
  NextJsStaticPath,
  PageProps,
  Paragraph,
  Section,
  VTPlatformURLS,
  client,
  getContentfulLocale,
  getDynamicPageSlugsStaticPaths,
  getPlaceDetails,
} from "@somethingcreative-agency/vettrust-design_system";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useEffect, useMemo } from "react";

import useVtTranslate from "../../../shared/utils/useVtTranslate";
import {
  currentlyDisplayedLocationAtom,
  locationGooglePlacesDataAtom,
} from "../../../atoms/locations";
import { navigationDynamicSlugListAtom } from "../../../atoms/navigation";
import { currentPracticeSearchStepAtom } from "../../../atoms/practiceSearch";

export default function Partners({
  location,
  slugsList,
  locale,
}: LocationPartnersPageProps) {
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
        locale
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

      if (
        location.fields.type.fields.searchKey === LocationTypeKeys.CLINIC_PLUS
      ) {
        router.push(`/locations/${location.fields.slug}/departments`);
      }

      if (
        [LocationTypeKeys.PET_HOTEL, LocationTypeKeys.COIFFEUR].includes(
          location.fields.type.fields.searchKey
        )
      ) {
        router.push(`/locations/${location.fields.slug}`);
      }

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

  // Order partners by sorting index
  const sortedPartners = useMemo(
    () =>
      currentlyDisplayedLocation?.partners?.sort((a, b) => {
        return a.fields.sortingIndex - b.fields.sortingIndex;
      }),
    [currentlyDisplayedLocation]
  );

  const partnersNodes = useMemo(
    () =>
      sortedPartners?.map(partnerType => (
        <Section
          title={{ text: partnerType.fields.name, level: "h2" }}
          className="mb-[64px]"
          key={partnerType.sys.id}
          childrenContainerClassname="pt-[8px]"
        >
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-[32px]">
            {partnerType.fields.partners.map(partner => (
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
    [sortedPartners, router]
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
}

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
      "fields.platformUrl[in]": VTPlatformURLS.VETTRUST,
    }
  );

  const pageMeta = await client.getEntries<CFPageLocationCommonMetadata>({
    content_type: "page__location",
    locale: getContentfulLocale(locale as string),
    "fields.platformUrl": VTPlatformURLS.VETTRUST,
  });

  return {
    props: {
      locale,
      location: location.items[0],
      slugsList,
      pageMeta: pageMeta.items[0],
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
        "fields.platformUrl[in]": VTPlatformURLS.VETTRUST,
      }
    )
  ).map(el => ({
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

type LocationPartnersPageProps = PageProps<
  {
    location: CFCollectionLocation;
    slugsList: NextJsStaticPath[];
  },
  CFPageLocationCommonMetadata
>;
