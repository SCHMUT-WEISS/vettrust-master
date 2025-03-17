/* eslint-disable camelcase,no-use-before-define */
import { GetServerSidePropsContext } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import React, { useEffect } from "react";
import { useAtom } from "jotai";
import { useRouter } from "next/router";
import Link from "next/link";
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
  Mail,
  formatURL,
  EmployeeCard,
  RichTextRenderer,
  LocationDepartmentDescription,
  LocationTypeKeys,
  DEFAULT_IMAGE_LOADER,
  VTPlatformURLS,
  Button,
  ExternalLink,
} from "@somethingcreative-agency/vettrust-design_system";
import {
  currentlyDisplayedLocationAtom,
  locationGooglePlacesDataAtom,
} from "../../../atoms/locations";
import { navigationDynamicSlugListAtom } from "../../../atoms/navigation";
import useVtTranslate from "../../../shared/utils/useVtTranslate";
import { currentPracticeSearchStepAtom } from "../../../atoms/practiceSearch";

const lipsumDescription = `
Lorem ipsum dolor sit amet, consectetur adipisicing elit. Debitis eius fugiat labore placeat sapiente. Accusantium aperiam cumque dolor incidunt ipsa maxime necessitatibus pariatur repudiandae totam. Asperiores consequuntur eius recusandae veritatis?
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad atque corporis cumque delectus est hic maiores, minima molestiae nam nobis quam quibusdam quod quos repudiandae sit? A autem laudantium qui.
`;

const LocationDepartmentsPage = ({
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
        location.fields.type.fields.searchKey !== LocationTypeKeys.CLINIC_PLUS
      ) {
        router.push(`/locations/${location.fields.slug}/services`);
      }

      setTimeout(() => {
        const id = router.asPath.split("#")[1];
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
        setCurrentSearchStep(null);
      };
    },
    // ⚠️ Don't update the dependency array, otherwise it goes into an infinite loop ⚠️
    // eslint-disable-next-line
    []
  );

  return (
    <>
      <Section
        title={{
          text: t("DEPARTMENTS_PAGE.TITLE"),
          level: "h1",
        }}
        className="container-wrapper mb-[64px] lg:mb-[96px] mt-[144px] lg:mt-[176px]"
      >
        <Paragraph type="body_1">{t("DEPARTMENTS_PAGE.DESCRIPTION")}</Paragraph>
      </Section>

      <div className="flex flex-col gap-[128px] lg:gap-[192px] pb-[160px] lg:pb-[192px]">
        {location.fields.departments &&
          location.fields.departments?.length > 0 &&
          location.fields.departments.map((department, index) => (
            <LocationDepartmentDescription
              image={{
                src: formatURL(department?.fields?.image?.fields?.file?.url),
                alt: department?.fields?.image?.fields?.description,
                blurDataUrl:
                  formatURL(department?.fields?.image?.fields?.file?.url) ||
                  DEFAULT_IMAGE_LOADER,
              }}
              reversed={index % 2 !== 0}
              key={department.sys.id}
              showBgImageToTheRight={index % 2 === 0}
              scrollAnchorId={department?.fields?.name?.split(" ")?.join("-")}
            >
              <div className="h-full flex flex-col justify-center">
                <Section title={{ text: department.fields.name, level: "h2" }}>
                  <Paragraph type="body_1">
                    {department.fields.body ? (
                      <RichTextRenderer
                        document={department.fields.body}
                        paragraphType="body_1"
                        useVtTranslate={useVtTranslate}
                      />
                    ) : (
                      lipsumDescription
                    )}
                  </Paragraph>

                  {department.fields.email && (
                    <div className="flex items-center gap-[9.33px] mt-[16px]">
                      <Mail />
                      <Link
                        href={`mailto:${department.fields.email}`}
                        target="_blank"
                      >
                        <a className="underline">{department.fields.email}</a>
                      </Link>
                    </div>
                  )}

                  {department?.fields?.employees?.length > 0 && (
                    <div className="flex flex-col gap-[12px] mt-[40px]">
                      {department.fields.employees.map(employee => (
                        <EmployeeCard
                          employee={employee}
                          className="bg-white rounded-[12px] p-[16px] gap-[16px]"
                          type="DEPARTMENT_EMPLOYEE_DEPARTMENTS_PAGE"
                          key={employee.sys.id}
                        />
                      ))}
                    </div>
                  )}

                  {department?.fields.storyblokPageSlug && (
                    <Button
                      url={department.fields.storyblokPageSlug}
                      router={router}
                      size="lg"
                      type="MAGENTA"
                      className="mt-10"
                      target="_blank"
                    >
                      {t("DEPARTMENTS_PAGE.BUTTON_LABEL")}
                      <ExternalLink className="text-transparent" />
                    </Button>
                  )}
                </Section>
              </div>
            </LocationDepartmentDescription>
          ))}
      </div>
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
    "location_slug"
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

export default LocationDepartmentsPage;
