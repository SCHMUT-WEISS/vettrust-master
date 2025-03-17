/* eslint-disable import/named,sonarjs/no-identical-functions,no-use-before-define */
import React, { useEffect, useState } from "react";
import { GetServerSidePropsContext } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useAtom } from "jotai";
import {
  AllLocationsResults,
  PageProps,
  CFPagesAllLocations,
  client,
  getContentfulLocale,
  getDeviceType,
  CFCollectionLocation,
  Hero,
  formatURL,
  Section,
  SelectInput,
  LocationTypeKeys,
  Paragraph,
  ALL_CANTONS_WORD,
  DEFAULT_IMAGE_LOADER,
  AllLocationsMap,
  ExternalLink,
  ComponentProps,
  VTPlatformURLS,
} from "@somethingcreative-agency/vettrust-design_system";
import { useRouter } from "next/router";
import Link from "next/link";
import useVtTranslate from "../../shared/utils/useVtTranslate";
import {
  allLocationsAtom,
  allLocationsLoadingAtom,
  currentPracticeSearchStepAtom,
} from "../../atoms/practiceSearch";
import { PAGES_WITH_HERO_ANIMATION } from "../../shared/constants/pages";
import { allAtomsAndI18n } from "../../shared/utils/designSystem";
import muiTheme from "../../shared/utils/mui-theme";

// eslint-disable-next-line no-use-before-define
const Locations: React.FC<ComponentProps<AllLocationsPageProps>> = ({
  pageMeta,
}) => {
  const { t, i18n } = useVtTranslate("location");
  const router = useRouter();

  const [locations] = useAtom(allLocationsAtom);
  const [, setCurrentSearchStep] = useAtom(currentPracticeSearchStepAtom);
  const [isAllLocationsLoading] = useAtom(allLocationsLoadingAtom);

  useEffect(
    () => {
      return () => {
        setCurrentSearchStep(null);
      };
    },
    // ⚠️ Don't update the dependency array, otherwise it goes into an infinite loop ⚠️
    // eslint-disable-next-line
    []
  );

  const cantons = pageMeta.fields.cantons
    .sort((a, b) => {
      return a.fields.sortingIndex - b.fields.sortingIndex;
    })
    .filter((canton, index, acc) => {
      return acc.indexOf(canton) === index;
    })
    .map(canton => ({
      displayValue: t(canton.fields.name),
      submitValue: canton.sys.id,
    }));

  const locationTypes = pageMeta.fields.locationTypes
    .filter(lt => {
      return lt.fields.searchKey !== LocationTypeKeys.CLINIC_PLUS;
    })
    .map(locationType => ({
      displayValue: t(locationType.fields.name),
      submitValue: locationType.sys.id,
    }));

  const [cantonId, setCantonId] = useState<string>("");
  const [typeId, setTypeId] = useState<string>("");

  const ALL_LOCATION_TYPES_WORD = {
    en: "All types",
    de: "Alle Typen",
    fr: "Tous les types",
  };

  const translatedAllCantonsWord =
    ALL_CANTONS_WORD[i18n.language as "en" | "de"];
  const translatedAllLocationTypesWord =
    ALL_LOCATION_TYPES_WORD[i18n.language as "en" | "de"];

  cantons.unshift({
    displayValue: t(translatedAllCantonsWord),
    submitValue: translatedAllCantonsWord,
  });

  locationTypes.unshift({
    displayValue: t(translatedAllLocationTypesWord),
    submitValue: translatedAllLocationTypesWord,
  });

  let locationsToShow = locations;

  const cantonFilter = (condition: boolean) =>
    cantonId === translatedAllCantonsWord ? true : condition;
  const locationTypeFilter = (condition: boolean) =>
    typeId === translatedAllLocationTypesWord ? true : condition;

  if (cantonId) {
    locationsToShow = locations.filter(el =>
      cantonFilter(el.fields.canton.sys.id === cantonId)
    );
  }

  if (typeId) {
    locationsToShow = locations.filter(el =>
      locationTypeFilter(el.fields.type.sys.id === typeId)
    );
  }

  if (cantonId && typeId) {
    locationsToShow = locations.filter(
      el =>
        cantonFilter(el.fields.canton.sys.id === cantonId) &&
        locationTypeFilter(el.fields.type.sys.id === typeId)
    );
  }

  const [isLoading, setIsLoading] = useState(false);

  const clinicType = locations.find(
    el => el.fields.type.fields.searchKey === LocationTypeKeys.CLINIC
  )?.fields.type;

  if (clinicType) {
    if (typeId && typeId === clinicType.sys.id) {
      locationsToShow.unshift(
        locations.find(
          loc =>
            loc.fields.type.fields.searchKey === LocationTypeKeys.CLINIC_PLUS
        ) as CFCollectionLocation
      );
    }

    if (cantonId && typeId && typeId === clinicType.sys.id) {
      locationsToShow.unshift(
        locations.find(
          loc =>
            loc.fields.type.fields.searchKey === LocationTypeKeys.CLINIC_PLUS
        ) as CFCollectionLocation
      );
    }
  }

  locationsToShow = locationsToShow.filter(
    (loc, index, self) => index === self.findIndex(l => l.sys.id === loc.sys.id)
  );

  return (
    <>
      <Hero
        bgImage={{
          url: formatURL(pageMeta?.fields?.heroImage?.fields?.file?.url),
          smallUrl: formatURL(pageMeta?.fields?.heroImage?.fields?.file?.url),
          blurDataUrl:
            formatURL(pageMeta?.fields?.heroImage?.fields?.file?.url) ||
            DEFAULT_IMAGE_LOADER,
          alt: pageMeta?.fields?.heroImage?.fields?.description,
        }}
        title={t("SERVICES.HERO_TITLE")}
        className="text-white"
        scrollButtonDisplayed
        scrollButtonExtended
        displayChildrenInSection
        PAGES_WITH_HERO_ANIMATION={PAGES_WITH_HERO_ANIMATION}
        router={router}
        {...allAtomsAndI18n}
      >
        <Paragraph type="body_1" className="text-white">
          {t("SERVICES.HERO_DESCRIPTION")}
        </Paragraph>
      </Hero>

      <div className="container-wrapper grid lg:grid-cols-2 lg:gap-[64px] mt-[212px] lg:mt-[240px]">
        <Section
          title={{
            text: t("ALL_LOCATIONS.OUR_LOCATIONS"),
            level: "h2",
            className: "",
          }}
          className="lg:min-h-[590px] mb-[16px] lg:mb-0"
        >
          <div className="flex flex-col lg:flex-row lg:gap-[16px]">
            <SelectInput
              classes={{
                input: `bg-white input`,
                container: `w-full lg:w-[256px]`,
              }}
              forText="cantonId"
              labelKey={t("Filter")}
              options={cantons}
              className="placeholder:font-[400] border border-sand-pressed h-[48px]"
              onSelectedChange={value => {
                setIsLoading(true);
                setTimeout(() => {
                  setCantonId(value.submitValue);
                  setIsLoading(false);
                }, 1000);
              }}
              defaultLabel={t("ALL_LOCATIONS.CANTON_DEFAULT_LABEL")}
              useVtTranslate={useVtTranslate}
            />
            <SelectInput
              classes={{
                input: `bg-white input`,
                label: "text-vtBG hidden lg:block",
                container: `w-full lg:w-[256px]`,
              }}
              labelKey={t(".")}
              forText="typeId"
              options={locationTypes}
              className="placeholder:font-[400] border border-sand-pressed h-[48px]"
              onSelectedChange={value => {
                setIsLoading(true);
                setTimeout(() => {
                  setTypeId(value.submitValue);
                  setIsLoading(false);
                }, 1000);
              }}
              defaultLabel={t("ALL_LOCATIONS.LOCATION_TYPE_DEFAULT_LABEL")}
              useVtTranslate={useVtTranslate}
            />
          </div>
          {!isLoading && (
            <Paragraph
              type="body_2"
              className="font-NotoSans font-semibold mt-[40px]"
            >
              {t("ALL_LOCATIONS.LOCATIONS_COUNT", {
                count: locationsToShow.length,
              })}
            </Paragraph>
          )}
          <div className="mt-[16px] mb-[90px] hidden lg:block">
            <AllLocationsResults
              isLoading={isLoading}
              locationsToShow={locationsToShow}
              className=""
              externalLinkIcon={<ExternalLink className="inline-block" />}
              Link={Link}
            />
          </div>
        </Section>
        <div className="locations__sticky-map [align-self:baseline] inline-block top-[120px] mb-[90px]">
          <AllLocationsMap
            muiTheme={muiTheme as any}
            locationsToShow={locationsToShow}
            isLoading={isLoading || isAllLocationsLoading}
            router={router}
            {...allAtomsAndI18n}
          />
        </div>
      </div>
      <AllLocationsResults
        isLoading={isLoading || isAllLocationsLoading}
        locationsToShow={locationsToShow}
        className="container-wrapper lg:hidden mt-[16px] mb-[90px]"
        externalLinkIcon={<ExternalLink className="inline-block" />}
        Link={Link}
      />
    </>
  );
};

export async function getServerSideProps({
  locale = "de",
  req,
}: GetServerSidePropsContext) {
  const pageMeta = await client.getEntries({
    content_type: "pages__allLocations",
    include: 2,
    locale: getContentfulLocale(locale as string),
    "fields.platformUrl": VTPlatformURLS.VETTRUST,
  });

  return {
    props: {
      locale,
      deviceType: getDeviceType(req),
      ...(await serverSideTranslations(locale as string, [
        "home",
        "common",
        "about",
        "blog",
        "location",
      ])),
      pageMeta: pageMeta.items[0],
    },
  };
}

type AllLocationsPageProps = PageProps<
  {
    deviceType: string;
  },
  CFPagesAllLocations
>;

export default Locations;
