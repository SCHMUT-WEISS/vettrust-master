/* eslint-disable camelcase,no-use-before-define,sonarjs/no-identical-functions,security/detect-object-injection,indent,sonarjs/cognitive-complexity */
import { GetServerSidePropsContext } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import React, { useEffect, useMemo } from "react";
import { useAtom } from "jotai";
import { useRouter } from "next/router";
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
  LocationTypeKeys,
  Section,
  Heading,
  TabMenu,
  randomStringGenerator,
  AnimalTypes,
  ServiceCardsGrid,
  BottomFooterContainer,
  SearchBar,
  CfCollectionService,
  VTPlatformURLS,
} from "@somethingcreative-agency/vettrust-design_system";
import {
  currentlyDisplayedLocationAtom,
  locationGooglePlacesDataAtom,
} from "../../../atoms/locations";
import { navigationDynamicSlugListAtom } from "../../../atoms/navigation";
import useVtTranslate from "../../../shared/utils/useVtTranslate";
import { currentPracticeSearchStepAtom } from "../../../atoms/practiceSearch";
import { allAtomsAndI18n } from "../../../shared/utils/designSystem";

const Cursor = () => (
  <svg
    width="2"
    height="29"
    viewBox="0 0 2 29"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect y="0.419922" width="1.00904" height="28" fill="#132F55" />
  </svg>
);

const LocationServicesPage = ({
  location,
  locale,
  slugsList,
  pageMeta,
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

  const TabMenuLabels = useMemo(
    () =>
      new Array(3)
        .fill(null)
        .map((_, index) => (
          <Heading
            text={t("SERVICES.TABS.LABEL", { context: index + 1 })}
            level="h3"
            key={randomStringGenerator(4)}
            className="normal-case text-inherit"
          />
        )),
    [t]
  );

  let uniqueServicesSmallPetMedicine = useMemo(
    () =>
      location.fields.servicesProvided
        .filter(
          relation =>
            AnimalTypes.KLEINTIERMEDIZIN === relation.fields.animalType
        )
        .map(relation => relation.fields.relatedService)
        .filter(el => el.fields)
        .filter(
          (el, i, arr) => arr.findIndex(e => e.sys.id === el.sys.id) === i
        ),
    [location.fields.servicesProvided]
  );

  let uniqueServicesLivestockMedicine = useMemo(
    () =>
      location.fields.servicesProvided
        .filter(
          relation => relation.fields.animalType === AnimalTypes.NUTZTIERMEDIZIN
        )
        .map(relation => relation.fields.relatedService)
        .filter(el => el.fields)
        .filter(
          (el, i, arr) => arr.findIndex(e => e.sys.id === el.sys.id) === i
        ),
    [location.fields.servicesProvided]
  );

  let uniqueServicesHorseMedicine = useMemo(
    () =>
      location.fields.servicesProvided
        .filter(
          relation => relation.fields.animalType === AnimalTypes.PFERDEMEDIZIN
        )
        .map(relation => relation.fields.relatedService)
        .filter(el => el.fields)
        .filter(
          (el, i, arr) => arr.findIndex(e => e.sys.id === el.sys.id) === i
        ),
    [location.fields.servicesProvided]
  );

  const standardServicesSmallPetMedicine = useMemo(
    () =>
      uniqueServicesSmallPetMedicine.filter((service: CfCollectionService) =>
        service.fields.serviceGroups.find(
          group => group.fields.isStandardServiceGroup
        )
      ),
    [uniqueServicesSmallPetMedicine]
  );

  const standardServicesLiveStockMedicine = useMemo(
    () =>
      uniqueServicesLivestockMedicine.filter(service =>
        service.fields.serviceGroups.find(
          group => group.fields.isStandardServiceGroup
        )
      ),
    [uniqueServicesLivestockMedicine]
  );

  const standardServicesHorseMedicine = useMemo(
    () =>
      uniqueServicesHorseMedicine.filter(service =>
        service.fields.serviceGroups.find(
          group => group.fields.isStandardServiceGroup
        )
      ),
    [uniqueServicesHorseMedicine]
  );

  uniqueServicesSmallPetMedicine = useMemo(
    () =>
      uniqueServicesSmallPetMedicine.filter(
        service =>
          !standardServicesSmallPetMedicine.find(
            s => s.sys.id === service.sys.id
          )
      ),
    [standardServicesSmallPetMedicine, uniqueServicesSmallPetMedicine]
  );

  uniqueServicesLivestockMedicine = useMemo(
    () =>
      uniqueServicesLivestockMedicine.filter(
        service =>
          !standardServicesLiveStockMedicine.find(
            s => s.sys.id === service.sys.id
          )
      ),
    [standardServicesLiveStockMedicine, uniqueServicesLivestockMedicine]
  );

  uniqueServicesHorseMedicine = useMemo(
    () =>
      uniqueServicesHorseMedicine.filter(
        service =>
          !standardServicesHorseMedicine.find(s => s.sys.id === service.sys.id)
      ),
    [standardServicesHorseMedicine, uniqueServicesHorseMedicine]
  );

  const TabMenuContent = useMemo(
    () => [
      {
        elements: (
          <ServiceCardsGrid
            router={router}
            standardServices={standardServicesSmallPetMedicine}
            specialServices={uniqueServicesSmallPetMedicine}
            key={randomStringGenerator(4)}
            defaultServiceImage={pageMeta.fields.defaultServiceImage}
            {...allAtomsAndI18n}
          />
        ),
        visible: Boolean(
          standardServicesSmallPetMedicine.length &&
            uniqueServicesSmallPetMedicine.length
        ),
      },
      {
        elements: (
          <ServiceCardsGrid
            router={router}
            standardServices={standardServicesLiveStockMedicine}
            specialServices={uniqueServicesLivestockMedicine}
            key={randomStringGenerator(4)}
            defaultServiceImage={pageMeta.fields.defaultServiceImage}
            {...allAtomsAndI18n}
          />
        ),
        visible: Boolean(
          standardServicesLiveStockMedicine.length &&
            uniqueServicesLivestockMedicine.length
        ),
      },
      {
        elements: (
          <ServiceCardsGrid
            router={router}
            standardServices={standardServicesHorseMedicine}
            specialServices={uniqueServicesHorseMedicine}
            key={randomStringGenerator(4)}
            defaultServiceImage={pageMeta.fields.defaultServiceImage}
            {...allAtomsAndI18n}
          />
        ),
        visible: Boolean(
          standardServicesHorseMedicine.length &&
            uniqueServicesHorseMedicine.length
        ),
      },
    ],
    [
      pageMeta.fields.defaultServiceImage,
      standardServicesHorseMedicine,
      standardServicesLiveStockMedicine,
      standardServicesSmallPetMedicine,
      uniqueServicesHorseMedicine,
      uniqueServicesLivestockMedicine,
      uniqueServicesSmallPetMedicine,
      router,
    ]
  );

  const isPageHidden = [
    LocationTypeKeys.PET_HOTEL,
    LocationTypeKeys.COIFFEUR,
    LocationTypeKeys.CLINIC_PLUS,
  ].includes(location.fields.type.fields.searchKey);

  return isPageHidden ? (
    <div className="w-screen h-screen">&nbsp;</div>
  ) : (
    <>
      <Section
        title={{
          text: t("SERVICES.TITLE"),
          level: "h1",
        }}
        className="container-wrapper mt-[144px] lg:mt-[176px]"
      >
        {/* <Paragraph type="body_1">{t("SERVICES.DESCRIPTION")}</Paragraph> */}
      </Section>
      <TabMenu
        labels={TabMenuLabels.filter(
          (el, index) => TabMenuContent[index].visible
        )}
        tabs={TabMenuContent.filter(el => el.visible).map(tab => tab.elements)}
        className="mt-[40px] services-tabs"
      />

      <div className="mb-[14px] lg:mb-[87px]">&nbsp;</div>

      <Heading
        text={t("SERVICES.LOCATION_SEARCHBAR_TITLE")}
        level="h4"
        className="container-wrapper translate-y-[94px] lg:hidden"
      />
      <BottomFooterContainer>
        <div className="w-full flex items-center justify-center pt-[30px] lg:pt-0 lg:pb-[30px]">
          <SearchBar
            router={router}
            className="hidden lg:block text-darkBlue"
            type="DESKTOP"
            renderedOutsideHero
            title={t("SERVICES.LOCATION_SEARCHBAR_TITLE")}
            showTitleOnDesktop
            {...allAtomsAndI18n}
          />
          <SearchBar
            router={router}
            className="block lg:hidden w-[calc(100vw_-_40px)]"
            type="MOBILE"
            renderedOutsideHero
            title={<Cursor />}
            {...allAtomsAndI18n}
          />
        </div>
      </BottomFooterContainer>
    </>
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

type LocationDepartmentsPageProps = PageProps<
  {
    location: CFCollectionLocation;
    slugsList: NextJsStaticPath[];
  },
  CFPageLocationCommonMetadata
>;

export default LocationServicesPage;
