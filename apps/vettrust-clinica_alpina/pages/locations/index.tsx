/* eslint-disable import/named,sonarjs/no-identical-functions,no-use-before-define */
import React from "react";
import { GetServerSidePropsContext } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import {
  PageProps,
  getContentfulLocale,
  getDeviceType,
  ComponentProps,
  VTPlatformURLS,
  CFCollectionLocation,
  BottomFooterContainer,
  VTImage,
  formatURL,
  DEFAULT_IMAGE_LOADER,
  Section,
  CFPagesAllLocations,
  Paragraph,
  Button,
  client,
} from "@somethingcreative-agency/vettrust-design_system";
import { useRouter } from "next/router";
import useVtTranslate from "../../shared/utils/useVtTranslate";
import LocationCard from "../../components/locations/locationCard";

// eslint-disable-next-line no-use-before-define
const Locations: React.FC<ComponentProps<AllLocationsPageProps>> = ({
  locations,
  pageMeta,
}) => {
  const { t } = useVtTranslate("location");
  const router = useRouter();

  return (
    <>
      <div className="container-wrapper mt-[144px] lg:mt-[176px]">
        <Section
          title={{
            className: "",
            level: "h1",
            text: t("ALL_LOCATIONS.TITLE"),
          }}
          childrenContainerClassname="grid md:grid-cols-2 lg:grid-cols-3 gap-[40px] md:gap-[32px]"
        >
          {locations.map(location => (
            <LocationCard key={location.sys.id} location={location} />
          ))}
        </Section>
      </div>
      <BottomFooterContainer>
        <div className="bg-white grid lg:grid-cols-2 gap-[40px] lg:gap-[64px] default-radius p-[20px] lg:p-[40px] mt-[48px] lg:mt-[112px]">
          <div className="h-full overflow-hidden rounded-[8px] object-cover relative ">
            <VTImage
              src={formatURL(pageMeta?.fields?.heroImage?.fields?.file?.url)}
              layout="fill"
              objectFit="cover"
              objectPosition="center"
              placeholder="blur"
              blurDataURL={
                formatURL(pageMeta?.fields?.heroImage?.fields?.file?.url) ||
                DEFAULT_IMAGE_LOADER
              }
              alt={pageMeta?.fields?.heroImage?.fields?.description}
            />
          </div>
          <Section
            title={{
              className: "",
              level: "h2",
              text: t("ALL_LOCATIONS.FOOTER_COMPONENT_TITLE"),
            }}
          >
            <Paragraph type="body_1">
              {t("ALL_LOCATIONS.FOOTER_COMPONENT_DESCRIPTION")}
            </Paragraph>

            <Button
              type="PRIMARY"
              size="lg"
              className="mt-[20px] lg:mt-[40px] w-full"
              disabled={false}
              iconRight="ArrowRight"
              url="https://www.vettrust.ch/locations"
              target="_blank"
              router={router}
            >
              {t("ALL_LOCATIONS.FOOTER_COMPONENT_BUTTON")}
            </Button>
          </Section>
        </div>
      </BottomFooterContainer>
    </>
  );
};

export async function getServerSideProps({
  locale = "de",
  req,
}: GetServerSidePropsContext) {
  const locationsData = await client.getEntries({
    content_type: "collection__locations",
    include: 2,
    locale: getContentfulLocale(locale as string),
    "fields.platformUrl": VTPlatformURLS.CLINICA_ALPINA,
  });

  const pageMeta = await client.getEntries({
    content_type: "pages__allLocations",
    locale: getContentfulLocale(locale as string),
    "fields.platformUrl": VTPlatformURLS.CLINICA_ALPINA,
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
      locations: locationsData.items,
      pageMeta: pageMeta.items[0],
    },
  };
}

type AllLocationsPageProps = PageProps<
  {
    deviceType: string;
    locations: CFCollectionLocation[];
  },
  CFPagesAllLocations
>;

export default Locations;
