/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable camelcase,no-use-before-define,sonarjs/no-identical-functions,security/detect-object-injection,indent,sonarjs/cognitive-complexity */
import { GetServerSidePropsContext } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import React, { useEffect, useMemo } from "react";
import { useAtom } from "jotai";
import { useRouter } from "next/router";
import {
  AnimalTypes,
  CFCollectionDepartment,
  CFCollectionLocation,
  CfCollectionService,
  CFPageLocationCommonMetadata,
  client,
  ClinicaAlpinaAnimalType,
  ComponentProps,
  getContentfulLocale,
  getDynamicPageSlugsStaticPaths,
  getPlaceDetails,
  Heading,
  LocationTypeKeys,
  NextJsStaticPath,
  PageProps,
  Paragraph,
  randomStringGenerator,
  Section,
  TabMenu,
  VTPlatformURLS,
} from "@somethingcreative-agency/vettrust-design_system";
import {
  currentlyDisplayedLocationAtom,
  locationGooglePlacesDataAtom,
} from "../../../atoms/locations";
import { navigationDynamicSlugListAtom } from "../../../atoms/navigation";
import useVtTranslate from "../../../shared/utils/useVtTranslate";
import CAServiceCardsGrid from "../../../components/locations/CASerrviceCardGrid";
import DepartmentsGrid from "../../../components/locations/DepartmentsGrid";

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

  const uniqueServicesSmallPetMedicine = useMemo(
    () =>
      location.fields.servicesProvided
        .filter(
          (relation) =>
            AnimalTypes.KLEINTIERMEDIZIN === relation.fields.animalType
        )
        .map((relation) => relation.fields.relatedService)
        .filter((el) => el.fields)
        .filter(
          (el, i, arr) => arr.findIndex((e) => e.sys.id === el.sys.id) === i
        ),
    [location.fields.servicesProvided]
  );

  const uniqueServicesLivestockMedicine = useMemo(
    () =>
      location.fields.servicesProvided
        .filter(
          (relation) =>
            relation.fields.animalType === AnimalTypes.NUTZTIERMEDIZIN
        )
        .map((relation) => relation.fields.relatedService)
        .filter((el) => el.fields)
        .filter(
          (el, i, arr) => arr.findIndex((e) => e.sys.id === el.sys.id) === i
        ),
    [location.fields.servicesProvided]
  );

  const uniqueServicesHorseMedicine = useMemo(
    () =>
      location.fields.servicesProvided
        .filter(
          (relation) => relation.fields.animalType === AnimalTypes.PFERDEMEDIZIN
        )
        .map((relation) => relation.fields.relatedService)
        .filter((el) => el.fields)
        .filter(
          (el, i, arr) => arr.findIndex((e) => e.sys.id === el.sys.id) === i
        ),
    [location.fields.servicesProvided]
  );

  const standardServicesSmallPetMedicine = useMemo(
    () =>
      uniqueServicesSmallPetMedicine.filter((service: CfCollectionService) =>
        service.fields.serviceGroups.find(
          (group) => group.fields.isStandardServiceGroup
        )
      ),
    [uniqueServicesSmallPetMedicine]
  );

  const standardServicesLiveStockMedicine = useMemo(
    () =>
      uniqueServicesLivestockMedicine.filter((service) =>
        service.fields.serviceGroups.find(
          (group) => group.fields.isStandardServiceGroup
        )
      ),
    [uniqueServicesLivestockMedicine]
  );

  const standardServicesHorseMedicine = useMemo(
    () =>
      uniqueServicesHorseMedicine.filter((service) =>
        service.fields.serviceGroups.find(
          (group) => group.fields.isStandardServiceGroup
        )
      ),
    [uniqueServicesHorseMedicine]
  );

  const standardServicesAllAnimalTypes = useMemo(
    () => [
      ...standardServicesSmallPetMedicine,
      ...standardServicesLiveStockMedicine,
      ...standardServicesHorseMedicine,
    ],
    [
      standardServicesSmallPetMedicine,
      standardServicesLiveStockMedicine,
      standardServicesHorseMedicine,
    ]
  );

  const uniqueStandardServicesAllAnimalTypes = useMemo(
    () =>
      standardServicesAllAnimalTypes.filter(
        (el, i, arr) => arr.findIndex((e) => e.sys.id === el.sys.id) === i
      ),
    [standardServicesAllAnimalTypes]
  );

  const standardServicesLargeAnimals = useMemo(
    () => [
      ...standardServicesLiveStockMedicine,
      ...standardServicesHorseMedicine,
    ],
    [standardServicesLiveStockMedicine, standardServicesHorseMedicine]
  );

  const uniqueStandardServicesLargeAnimals = useMemo(
    () =>
      standardServicesLargeAnimals.filter(
        (el, i, arr) => arr.findIndex((e) => e.sys.id === el.sys.id) === i
      ),
    [standardServicesLargeAnimals]
  );

  const allAnimalTypesDepartments = useMemo(
    () =>
      location.fields.departments?.filter(
        (department) =>
          department.fields.clinicaAlpinaAnimalType ===
          ClinicaAlpinaAnimalType.ALL_ANIMALS
      ),
    [location.fields.departments]
  );

  const largeAnimalDepartments = useMemo(
    () =>
      location.fields.departments?.filter(
        (department) =>
          department.fields.clinicaAlpinaAnimalType ===
          ClinicaAlpinaAnimalType.LARGE_ANIMALS
      ),
    [location.fields.departments]
  );

  const largeAnimalDepIds = largeAnimalDepartments?.map((dep) =>
    dep?.fields?.name?.split(" ")?.join("-")
  );

  const id = router.asPath.split("#")[1];

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

      if (
        location.fields.type.fields.searchKey === LocationTypeKeys.CLINIC_PLUS
      ) {
        router.push(`/locations/${location.fields.slug}/departments`);
      }

      setTimeout(() => {
        if (id) {
          const element = document.getElementById(id);
          if (element) {
            element.scrollIntoView({
              behavior: "smooth",
            });
          }
        }
      }, 1000);

      return () => {
        setCurrentlyDisplayedLocation(null);
        setLocationsSlugList([]);
        setLocationGooglePlacesData(null);
      };
    },
    // ⚠️ Don't update the dependency array, otherwise it goes into an infinite loop ⚠️
    // eslint-disable-next-line
    []
  );

  const TabMenuLabels = useMemo(
    () =>
      new Array(2)
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

  const TabMenuContent = useMemo(
    () => [
      {
        elements: (
          <CAServiceCardsGrid
            standardServices={uniqueStandardServicesAllAnimalTypes}
            key={randomStringGenerator(4)}
            defaultServiceImage={pageMeta.fields.defaultServiceImage}
            departments={allAnimalTypesDepartments as CFCollectionDepartment[]}
          />
        ),
        visible: Boolean(uniqueStandardServicesAllAnimalTypes.length),
      },
      {
        elements: (
          <CAServiceCardsGrid
            standardServices={uniqueStandardServicesLargeAnimals}
            key={randomStringGenerator(4)}
            defaultServiceImage={pageMeta.fields.defaultServiceImage}
            departments={largeAnimalDepartments as CFCollectionDepartment[]}
          />
        ),
        visible: Boolean(uniqueStandardServicesLargeAnimals.length),
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
    ]
  );

  const isPageHidden = [LocationTypeKeys.CLINIC_PLUS].includes(
    location.fields.type.fields.searchKey
  );

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
        {location.fields.type.fields.searchKey ===
          LocationTypeKeys.PET_HOTEL && (
          <Paragraph type="body_1">{t("SERVICES.DESCRIPTION")}</Paragraph>
        )}
      </Section>

      {location.fields.type.fields.searchKey !== LocationTypeKeys.PET_HOTEL ? (
        <TabMenu
          labels={TabMenuLabels.filter(
            (el, index) => TabMenuContent[index].visible
          )}
          tabs={TabMenuContent.filter((el) => el.visible).map(
            (tab) => tab.elements
          )}
          className="mt-[40px] services-tabs"
          initialTab={id && largeAnimalDepIds?.includes(id) ? 1 : 0}
        />
      ) : (
        <DepartmentsGrid
          departments={location.fields.departments as CFCollectionDepartment[]}
          className="mt-[96px] lg:mt-[64px]"
        />
      )}
      <div className="mb-[14px] lg:mb-[87px]">&nbsp;</div>
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
      "fields.platformUrl[in]": VTPlatformURLS.CLINICA_ALPINA,
    }
  );

  const pageMeta = await client.getEntries<CFPageLocationCommonMetadata>({
    content_type: "page__location",
    locale: getContentfulLocale(locale as string),
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

export default LocationServicesPage;
