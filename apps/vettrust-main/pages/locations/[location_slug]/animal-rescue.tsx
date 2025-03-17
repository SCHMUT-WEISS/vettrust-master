/* eslint-disable camelcase,no-use-before-define */
import { GetServerSidePropsContext } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import React, { useEffect } from "react";
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
  Paragraph,
  Section,
  StackedHalfSurface,
  AccordionListSection,
  Button,
  AnimalRescueHeroShel,
  formatURL,
  AnimalRescueMap,
  ModalsOptions,
  RichTextRenderer,
  DEFAULT_IMAGE_LOADER,
  VTPlatformURLS,
} from "@somethingcreative-agency/vettrust-design_system";
import {
  currentlyDisplayedLocationAtom,
  locationGooglePlacesDataAtom,
} from "../../../atoms/locations";
import { navigationDynamicSlugListAtom } from "../../../atoms/navigation";
import useVtTranslate from "../../../shared/utils/useVtTranslate";
import { currentModalAtom } from "../../../atoms/modals";
import { currentPracticeSearchStepAtom } from "../../../atoms/practiceSearch";

const LocationAnimalRescuePage = ({
  location,
  locale,
  slugsList,
  pageMeta,
}: ComponentProps<LocationDepartmentsPageProps>) => {
  const { t } = useVtTranslate("location");
  const router = useRouter();
  const [, setCurrentModal] = useAtom(currentModalAtom);
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

      if (!location.fields.isRadiusOfBasel) {
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

  const faqs = pageMeta.fields.rescueFaq.map(faq => ({
    title: faq.fields.name,
    description: (
      <RichTextRenderer
        document={faq.fields.description}
        useVtTranslate={useVtTranslate}
      />
    ),
  }));

  return (
    <>
      <div className="relative">
        <AnimalRescueHeroShel
          location={location}
          googlePlacesData={locationGooglePlacesData as any}
          className="lg:hidden absolute top-[-80px] z-[11]"
          router={router}
          useVtTranslate={useVtTranslate}
          currentModalAtom={currentModalAtom}
          customUseAtom={useAtom}
        />
      </div>

      <AnimalRescueMap
        className="mb-[128px] lg:mb-[192px] lg:mt-[256px] animal-rescue__half-surface"
        showBgImageToTheRight
        image={{
          src: formatURL(
            pageMeta?.fields?.animalRescueBaselAreaImage?.fields?.file?.url
          ),
          alt: pageMeta.fields.animalRescueBaselAreaImage.fields.title,
          blurDataUrl:
            formatURL(
              pageMeta?.fields?.animalRescueBaselAreaImage?.fields?.file?.url
            ) || DEFAULT_IMAGE_LOADER,
        }}
      >
        <div className="h-full flex flex-col justify-center">
          <Section
            title={{
              text: t("ANIMAL_RESCUE.OPERATIONAL_AREA.TITLE"),
              level: "h2",
            }}
          >
            <Paragraph type="body_1">
              {t("ANIMAL_RESCUE.OPERATIONAL_AREA.DESCRIPTION")}
            </Paragraph>

            <Button
              type="MAGENTA"
              size="lg"
              iconLeft="PhonePlus"
              focusRingClassName="xs:ring-offset-white"
              onClick={() =>
                setCurrentModal({
                  type: ModalsOptions.EMERGENCY,
                  minWidth: "md",
                })
              }
              className="mt-[40px]"
              router={router}
            >
              {t("ANIMAL_RESCUE.OPERATIONAL_AREA.BUTTON_LABEL")}
            </Button>
          </Section>
        </div>
      </AnimalRescueMap>

      <AccordionListSection
        items={faqs}
        title={t("INFO_TO_VISITORS.HEADING")}
        childrenContainerClassname="xs:pt-0"
      >
        <Paragraph type="body_1" className="mb-[40px]">
          {t("INFO_TO_VISITORS.SUMMARY")}
        </Paragraph>
      </AccordionListSection>

      <StackedHalfSurface
        image={{
          src: formatURL(
            pageMeta?.fields?.solutionForAnimalsSectionImage?.fields?.file?.url
          ),
          alt: pageMeta?.fields?.solutionForAnimalsSectionImage?.fields
            ?.description,
          blurDataUrl:
            formatURL(
              pageMeta.fields.solutionForAnimalsSectionImage.fields.file.url
            ) || DEFAULT_IMAGE_LOADER,
        }}
        className="my-[128px] lg:my-[192px]"
        showBgImageToTheRight
      >
        <div className="h-full flex flex-col justify-center">
          <Section
            title={{
              text: t("ANIMAL_RESCUE.SOLUTION_FOR_ANIMALS.TITLE"),
              level: "h2",
            }}
          >
            <Paragraph type="body_1">
              {t("ANIMAL_RESCUE.SOLUTION_FOR_ANIMALS.DESCRIPTION")}
            </Paragraph>

            <Button
              type="PRIMARY"
              size="lg"
              iconRight="ArrowRight"
              className="mt-[40px]"
              url={pageMeta.fields.petRescueSolutionForAnnimalsLink}
              target="_blank"
              router={router}
            >
              <Paragraph type="body_2">
                {t("ANIMAL_RESCUE.SOLUTION_FOR_ANIMALS.BUTTON_LABEL")}
              </Paragraph>
            </Button>
          </Section>
        </div>
      </StackedHalfSurface>

      <StackedHalfSurface
        image={{
          src: formatURL(
            pageMeta?.fields?.cooperationOfTheAntonFoundationSection?.fields
              ?.file?.url
          ),
          alt: pageMeta?.fields?.cooperationOfTheAntonFoundationSection?.fields
            ?.description,
          blurDataUrl:
            formatURL(
              pageMeta?.fields?.cooperationOfTheAntonFoundationSection?.fields
                ?.file?.url
            ) || DEFAULT_IMAGE_LOADER,
        }}
        reversed
        className="my-[128px] lg:my-[192px]"
      >
        <div className="h-full flex flex-col justify-center">
          <Section
            title={{
              text: t("ANIMAL_RESCUE.ANTON_FOUNDATION_CORPORATION.TITLE"),
              level: "h2",
            }}
          >
            <Paragraph type="body_1">
              {t("ANIMAL_RESCUE.ANTON_FOUNDATION_CORPORATION.DESCRIPTION")}
            </Paragraph>

            <Button
              type="PRIMARY"
              size="lg"
              iconRight="ArrowRight"
              className="mt-[40px]"
              url={pageMeta.fields.petRescueCooperationOfTheAntonFoundationLink}
              target="_blank"
              router={router}
            >
              <Paragraph type="body_2">
                {t("ANIMAL_RESCUE.ANTON_FOUNDATION_CORPORATION.BUTTON_LABEL")}
              </Paragraph>
            </Button>
          </Section>
        </div>
      </StackedHalfSurface>
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
    "fields.platformUrl[in]": VTPlatformURLS.VETTRUST,
  });

  return {
    props: {
      locale,
      location: location.items[0],
      pageMeta: pageMeta.items[0],
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

export default LocationAnimalRescuePage;
