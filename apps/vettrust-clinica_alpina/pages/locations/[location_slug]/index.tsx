/* eslint-disable camelcase,@typescript-eslint/no-explicit-any,indent,@typescript-eslint/ban-ts-comment */
import { GetServerSidePropsContext, NextPage } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { useAtom } from "jotai";
import { useRouter } from "next/router";
import {
  ComponentProps,
  client,
  getContentfulLocale,
  CFCollectionLocation,
  formatURL,
  Section,
  LocationHomeHeroShell,
  DEFAULT_IMAGE_LOADER,
  Hero,
  PageProps,
  getDynamicPageSlugsStaticPaths,
  Heading,
  RelatedLocationSummaryCard,
  getPlaceDetails,
  NextJsStaticPath,
  VTRating,
  // getLocationRatings,
  // RatingCarousel as RatingsCarousel,
  CFPageLocationCommonMetadata,
  LocationHomeDepartments,
  LocationHomeContactSection,
  LocationHomeTeamSection,
  BottomFooterContainer,
  CFCollectionAnnouncement,
  CFCollectionFAQs,
  VTPlatformURLS,
} from "@somethingcreative-agency/vettrust-design_system";
import {
  currentlyDisplayedLocationAtom,
  locationGooglePlacesDataAtom,
} from "../../../atoms/locations";
import { PAGES_WITH_HERO_ANIMATION } from "../../../shared/constants/pages";
import useVtTranslate from "../../../shared/utils/useVtTranslate";
import { navigationDynamicSlugListAtom } from "../../../atoms/navigation";
import { currentPracticeSearchStepAtom } from "../../../atoms/practiceSearch";
import { allAtomsAndI18n } from "../../../shared/utils/designSystem";

// eslint-disable-next-line no-use-before-define
const LocationHomePage: NextPage<ComponentProps<LocationHomePageProps>> = ({
  location,
  relatedLocations,
  slugsList,
  ratings,
  announcements,
  locale,
}) => {
  const [currentlyDisplayedLocation, setCurrentlyDisplayedLocation] = useAtom(
    currentlyDisplayedLocationAtom
  );

  const router = useRouter();
  const { t } = useVtTranslate("location");

  const [showShell, setShowShell] = useState(
    !PAGES_WITH_HERO_ANIMATION.includes(router.pathname)
  );

  const [locationsSlugList, setLocationsSlugList] = useAtom(
    navigationDynamicSlugListAtom
  );

  const [locationGooglePlacesData, setLocationGooglePlacesData] = useAtom(
    locationGooglePlacesDataAtom
  );

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

  useLayoutEffect(() => {
    setTimeout(() => {
      setShowShell(true);
    }, 500);
  }, []);

  const [, setCurrentSearchStep] = useAtom(currentPracticeSearchStepAtom);

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
    <div>
      <Hero
        title=""
        bgImage={{
          url: formatURL(location?.fields?.heroImages[0]?.fields?.file?.url),
          alt: location?.fields?.heroImages[0]?.fields?.description,
          className: "",
          blurDataUrl: formatURL(
            location?.fields?.heroImages[0]?.fields?.file.url
          ),
          smallUrl:
            formatURL(location?.fields?.heroImages[0]?.fields?.file?.url) ||
            DEFAULT_IMAGE_LOADER,
        }}
        displayChildrenInSection={false}
        PAGES_WITH_HERO_ANIMATION={PAGES_WITH_HERO_ANIMATION}
        router={router}
        {...allAtomsAndI18n}
      >
        {showShell && (
          <LocationHomeHeroShell
            router={router}
            location={location}
            hasSimilarLocations={relatedLocations.length !== 0}
            googlePlacesData={locationGooglePlacesData as any}
            announcements={announcements}
            {...allAtomsAndI18n}
          />
        )}
      </Hero>

      {relatedLocations.length !== 0 && (
        <div className="mt-[104px] container-wrapper lg:mt-[104px] mt-[430px] z-[11]">
          <Heading text={t("RELATED_LOCATIONS.TITLE")} level="h5" />
          <div className="grid lg:grid-cols-2 gap-[16px] md:gap-[24px] lg:gap-[32px] mt-[16px]">
            {relatedLocations.map((relatedLocation) => (
              <RelatedLocationSummaryCard
                location={relatedLocation.fields}
                key={Math.random().toString()}
                router={router}
                useVtTranslate={useVtTranslate}
                platformUrl={VTPlatformURLS.CLINICA_ALPINA}
              />
            ))}
          </div>
        </div>
      )}

      <LocationHomeTeamSection
        location={location}
        relatedLocations={relatedLocations}
        useVtTranslate={useVtTranslate}
        router={router}
      />

      <>
        <Section
          title={{
            text: t("HOME_DEPARTMENTS_SECTION.TITLE"),
            level: "h2",
            className: "",
          }}
          className="container-wrapper mt-[128px] lg:mt-[192px]"
        >
          {t("HOME_DEPARTMENTS_SECTION.DESCRIPTION")}
        </Section>

        <LocationHomeDepartments
          location={location}
          className="mt-[40px]"
          useVtTranslate={useVtTranslate}
          router={router}
        />
      </>

      {ratings.length !== 0 && (
        <>
          {/* <Section
          className="container-wrapper mt-[128px] lg:mt-[192px]"
          title={{
            text: t("RATINGS.TITLE"),
            level: "h2",
          }}
        />
        <RatingsCarousel
          ratings={ratings
            .filter((value, index) => {
              const ratingStringValue = JSON.stringify(value);
              return (
                index ===
                  ratings.findIndex(obj => {
                    return JSON.stringify(obj) === ratingStringValue;
                  }) && value.TestimonialFrom
              );
            })
            .slice(0, 5)}
          className="mt-[40px]"
          useVtTranslate={useVtTranslate}
        /> */}
        </>
      )}

      <BottomFooterContainer>
        <LocationHomeContactSection
          googlePlacesData={locationGooglePlacesData as any}
          location={location}
          router={router}
          {...(allAtomsAndI18n as any)}
        />
      </BottomFooterContainer>
    </div>
  );
};

export async function getStaticProps({
  locale,
  params: { location_slug },
}: GetServerSidePropsContext<any>) {
  let relatedLocations: CFCollectionLocation[] = [];

  const location = await client.getEntries<CFCollectionLocation["fields"]>({
    content_type: "collection__locations",
    "fields.slug": location_slug,
    locale: getContentfulLocale(locale as string),
    include: 3,
  });

  if (
    location &&
    location.items[0] &&
    location.items[0].fields.locationGroup &&
    location.items[0].fields.locationGroup.sys.id
  ) {
    relatedLocations = (
      await client.getEntries<CFCollectionLocation["fields"]>({
        content_type: "collection__locations",
        "fields.locationGroup.sys.id":
          location.items[0].fields.locationGroup.sys.id,
        "sys.id[ne]": location.items[0].sys.id,
        locale: getContentfulLocale(locale as string),
        limit: 3,
      })
    ).items;
  }

  const slugsList = await getDynamicPageSlugsStaticPaths(
    "collection__locations",
    "location_slug",
    {
      "fields.platformUrl[in]": VTPlatformURLS.CLINICA_ALPINA,
    }
  );

  // const ratings =
  //   locale === "de" && location.items[0].fields.testimonialsId
  //     ? await getLocationRatings(location.items[0], 10)
  //     : [];

  const pageMeta = await client.getEntries<CFPageLocationCommonMetadata>({
    content_type: "page__location",
    locale: getContentfulLocale(locale as string),
  });

  let announcements = await client.getEntries<
    CFCollectionAnnouncement["fields"]
  >({
    content_type: "collection__announcements",
    locale: getContentfulLocale(locale as string),
  });

  const isAnnouncementActive = (announcement: CFCollectionAnnouncement) => {
    const inAnnouncementIncluded =
      announcement.fields.locationType?.find(
        (type) =>
          type.fields.searchKey ===
          location.items[0].fields.type.fields.searchKey
      ) ||
      announcement.fields.locations?.find(
        (loc) => loc.sys.id === location.items[0].sys.id
      );

    const isAnnouncementExcluded =
      announcement.fields.blacklistedLocations?.find(
        (loc) => loc.sys.id === location.items[0].sys.id
      );

    return inAnnouncementIncluded && !isAnnouncementExcluded;
  };

  announcements = {
    ...announcements,
    items: announcements.items.filter((announcement) =>
      isAnnouncementActive(announcement)
    ),
  };

  let faqs: CFCollectionFAQs[] = [];

  if (location?.items[0]?.fields?.displayedFaQs?.length > 0) {
    faqs = location.items[0].fields.displayedFaQs;
  }

  if (location?.items[0]?.fields.type?.fields?.displayedFaQs?.length > 0) {
    // faqs = [...faqs, ...location.items[0].fields.type.fields.displayedFaQs];
    // NOTE: The following line is using a loop because the Document type from contentful has Symbol like properties that are not iterable
    location.items[0].fields.type.fields.displayedFaQs.forEach((faq) => {
      faqs.push(faq);
    });
  }

  faqs = faqs.filter(
    (faq) =>
      !location?.items[0]?.fields?.blacklistedFaQs?.find(
        (f) => f.sys.id === faq.sys.id
      )
  );

  return {
    props: {
      locale,
      slugsList,
      ratings: [],
      faqs,
      location: location.items[0],
      pageMeta: pageMeta.items[0],
      announcements: announcements.items,
      relatedLocations,
      ...(await serverSideTranslations(locale as string, [
        "blog",
        "common",
        "about",
        "location",
        "location-contact",
        "referral",
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

type LocationHomePageProps = PageProps<
  {
    location: CFCollectionLocation;
    relatedLocations: CFCollectionLocation[];
    slugsList: NextJsStaticPath[];
    ratings: VTRating[];
    announcements: CFCollectionAnnouncement[];
    faqs: CFCollectionFAQs[];
  },
  CFPageLocationCommonMetadata
>;

export default LocationHomePage;
