/* eslint-disable camelcase,no-use-before-define,no-param-reassign,react-hooks/exhaustive-deps */
import React, { useEffect, useMemo } from "react";
import { GetServerSidePropsContext } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useAtom } from "jotai";
import {
  ComponentProps,
  getDynamicPageSlugsStaticPaths,
  client,
  CFCollectionLocation,
  getContentfulLocale,
  PageProps,
  NextJsStaticPath,
  CFPageLocationCommonMetadata,
  getPlaceDetails,
  Section,
  TeamMemberCardsGrid,
  CfCollectionEmployee,
  BgCircleCanvas as BgCircleCanvasRight,
  Paragraph,
  LocationTypeKeys,
  VTPlatformURLS,
} from "@somethingcreative-agency/vettrust-design_system";
import { useRouter } from "next/router";
import {
  currentlyDisplayedLocationAtom,
  locationGooglePlacesDataAtom,
} from "../../../atoms/locations";
import { navigationDynamicSlugListAtom } from "../../../atoms/navigation";
import useVtTranslate from "../../../shared/utils/useVtTranslate";
import { currentPracticeSearchStepAtom } from "../../../atoms/practiceSearch";
import { allAtomsAndI18n } from "../../../shared/utils/designSystem";

type SortedEmployeeRoles = {
  [key: string]: {
    name: string;
    sortingIndex: number;
    serachKey: string;
    data: CfCollectionEmployee[];
  };
};

const LocationTeamPage: React.FC<ComponentProps<LocationTeamPageProps>> = ({
  location,
  slugsList,
  locale,
}) => {
  const { t } = useVtTranslate("location");
  const [currentlyDisplayedLocation, setCurrentlyDisplayedLocation] = useAtom(
    currentlyDisplayedLocationAtom
  );
  const router = useRouter();

  const [locationsSlugList, setLocationsSlugList] = useAtom(
    navigationDynamicSlugListAtom
  );

  const [locationGooglePlacesData, setLocationGooglePlacesData] = useAtom(
    locationGooglePlacesDataAtom
  );

  let { employees } = location.fields;

  employees = useMemo(
    () => employees.filter((el) => el.fields && el.fields.role),
    [employees]
  );

  let roles = employees.reduce((r, a) => {
    a.fields.role.forEach((role) => {
      if (role.fields && !r[role.fields.serachKey]) {
        r[role.fields.serachKey] = {
          name: role.fields.name,
          sortingIndex: role.fields.sortingIndex,
          serachKey: role.fields.serachKey,
          data: [],
        };
      }
    });

    return r;
  }, {} as SortedEmployeeRoles);

  employees.forEach((employee) => {
    employee.fields.role
      .filter((r) => r.fields)
      .forEach((role) => {
        roles[role.fields.serachKey].data.push(employee);
      });
  });

  roles = useMemo(() => roles, [roles]);

  const sortedRoles = useMemo(
    () =>
      Object.values(roles).sort((a, b) => {
        if (a.sortingIndex < b.sortingIndex) {
          return 0;
        }
        return 1;
      }),
    [roles]
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

  let orderedRoles: SortedEmployeeRoles[string][] = [];

  sortedRoles.forEach((role) => {
    orderedRoles[role.sortingIndex] = role;
  });

  orderedRoles = useMemo(() => orderedRoles, [employees]);

  const rolesNodes = useMemo(
    () =>
      orderedRoles.map((role, index) => (
        <div
          className={`${
            location.fields.type.fields.searchKey !==
            LocationTypeKeys.CLINIC_PLUS
              ? index === 0
                ? " pt-[96px]"
                : ""
              : "mt-[144px]"
          } lg:mt-0 relative z-[10] mb-[128px] lg:mb-[192px]`}
          key={Math.random().toString()}
        >
          <Section
            title={{ text: role.name, level: "h2" }}
            className={`container-wrapper ${
              index === 0 ? "mt-[128px] lg:mt-[192px]" : ""
            } `}
          />
          <BgCircleCanvasRight
            className={`absolute hidden lg:block ${
              index % 2 === 0 ? "about-bg-circles" : "left-[-400px]"
            } top-[calc(50%_-_400px)] z-[-1]`}
          />
          <TeamMemberCardsGrid
            members={role.data}
            {...allAtomsAndI18n}
            router={router}
          />
        </div>
      )),
    []
  );

  return (
    <div className="z-[10] mt-[176px]">
      {location.fields.type.fields.searchKey ===
        LocationTypeKeys.CLINIC_PLUS && (
        <Section
          title={{ text: t("TEAM_PAGE.TITLE"), level: "h1" }}
          className="container-wrapper mt-[176px] mb-[96px] hidden lg:block"
        >
          <Paragraph type="body_1">{t("TEAM_PAGE.DESCRIPTION")}</Paragraph>
        </Section>
      )}

      {rolesNodes}
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

type LocationTeamPageProps = PageProps<
  {
    location: CFCollectionLocation;
    slugsList: NextJsStaticPath[];
  },
  CFPageLocationCommonMetadata
>;

export default LocationTeamPage;
