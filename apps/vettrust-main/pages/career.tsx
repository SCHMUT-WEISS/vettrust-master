/* eslint-disable security/detect-object-injection,react-hooks/exhaustive-deps */
import type { NextPage, GetServerSidePropsContext } from "next";
import Script from "next/script";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import React, { useEffect, useRef, useMemo, useState, RefObject } from "react";
import { useAtom } from "jotai";
import {
  PageProps,
  client,
  ComponentProps,
  formatURL,
  BulletCard,
  Button,
  Paragraph,
  CFPageCareer,
  CareerVimeoContainer,
  BulletCardsGrid,
  Section,
  CareerPersonalDevelopment,
  AccordionListSection,
  CareerSignup,
  BottomFooterContainer,
  Hero,
  getDeviceType,
  StackedHalfSurface,
  StackedRightSurface,
  getContentfulLocale,
  DEFAULT_IMAGE_LOADER,
  IconsT as Icons,
  VTPlatformURLS,
  VTImage,
  Heading,
  Mail,
} from "@somethingcreative-agency/vettrust-design_system";
import { useRouter } from "next/router";
import { PopupModal } from "react-calendly";
import useVtTranslate from "../shared/utils/useVtTranslate";
import { currentPracticeSearchStepAtom } from "../atoms/practiceSearch";
import { PAGES_WITH_HERO_ANIMATION } from "../shared/constants/pages";
import { allAtomsAndI18n } from "../shared/utils/designSystem";
import muiTheme from "../shared/utils/mui-theme";
import RichTextSectionBlok from "../components/storyblok/bloks/RichTextSectionBlok";

// eslint-disable-next-line no-use-before-define
const Home: NextPage<ComponentProps<HomePageProps>> = ({
  pageMeta,
  deviceType,
}) => {
  const { t } = useVtTranslate("career");
  const router = useRouter();
  const ref = useRef<HTMLDivElement>();

  const bulletsIcons: Array<keyof Icons> = [
    "PersonLightDanger",
    "HeartFireDanger",
    "PuzzleDanger",
  ];

  const bulletCards = useMemo(
    () =>
      new Array(3).fill(null).map(
        (_, index) =>
          ({
            title: t("BULLET_CARDS_GRID.BULLETS.TITLE", { context: index + 1 }),
            description: t("BULLET_CARDS_GRID.BULLETS.DESCRIPTION", {
              context: index + 1,
            }),
            icon: bulletsIcons[index],
          } as BulletCard)
      ),
    []
  );

  const serviceOffered = useMemo(
    () =>
      [2, 3, 4, 5].map((i) => ({
        title: t("SERVICES_OFFERED.SERVICE", { context: i }),
        description: t("SERVICES_OFFERED.DESCRIPTION", { context: i }),
      })),
    []
  );

  const offersForTraining = useMemo(
    () =>
      new Array(3).fill(null).map((_, index) => ({
        title: t("OFFERS_FOR_TRAINING.OFFER", { context: index + 1 }),
        description: t("OFFERS_FOR_TRAINING.DESCRIPTION", {
          context: index + 1,
        }),
      })),
    []
  );

  const [, setCurrentSearchStep] = useAtom(currentPracticeSearchStepAtom);

  const [isCalendlyOpen, setIsCalendlyOpen] = useState(false);

  useEffect(
    () => {
      return () => setCurrentSearchStep(null);
    },
    // ⚠️ Don't update the dependency array, otherwise it goes into an infinite loop ⚠️
    // eslint-disable-next-line
    []
  );
  
  const navigateToOpenPositions = () => {
    // the menu height is always 80px
    const menuHeigth = 80;
    const offsetTop = ref.current?.offsetTop ?? 80;
    window?.scrollTo({ top: offsetTop - menuHeigth, behavior: 'smooth' });
  };

  // todo remove direct jobs widget integration and create component when access to monorepo exists
  return (
    <>
      <Hero
        bgImage={{
          url: formatURL(pageMeta?.fields?.heroImage?.fields?.file?.url),
          smallUrl: formatURL(
            pageMeta?.fields?.heroImageSmall?.fields?.file?.url
          ),
          blurDataUrl:
            formatURL(pageMeta?.fields?.heroImage?.fields?.file?.url) ||
            DEFAULT_IMAGE_LOADER,
          alt: pageMeta?.fields?.heroImage?.fields?.description,
        }}
        title={t("HERO.TITLE")}
        className="relative z-0"
        scrollButtonDisplayed
        scrollButtonExtended={false}
        displayChildrenInSection
        PAGES_WITH_HERO_ANIMATION={PAGES_WITH_HERO_ANIMATION}
        router={router}
        {...allAtomsAndI18n}
        bubble={{
          text: pageMeta.fields?.bubbleText,
          degree: pageMeta.fields?.bubbleDegree,
          url: "/academy"
        }}
      >
        <Paragraph type="body_1">{t("HERO.DESCRIPTION")}</Paragraph>
      </Hero>

      <div id="open-positions" ref={ref as RefObject<HTMLDivElement>} className="mt-[128px] lg:mt-[192px] container-wrapper">
        <Script id="teamtailor-jobs-widget" strategy="afterInteractive" src="https://scripts.teamtailor-cdn.com/widgets/production/jobs.js"/>
        <h2 className="H2 mb-[24px] lg:mb-0">{t("POSITIONS.TITLE")}</h2>
        <svg className="mt-[16px] mb-[24px] undefined hidden lg:block" width="64" height="4" viewBox="0 0 64 4" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="64" height="4" rx="2" fill="#D3A05C"/>
        </svg>
        <div className="teamtailor-jobs-widget" data-teamtailor-limit="10" data-teamtailor-pagination="true" data-teamtailor-popup="true" data-teamtailor-department-select="true" data-teamtailor-role-select="true" data-teamtailor-region-select="true" data-teamtailor-location-select="true" data-teamtailor-api-key="4uH51aDRI4iFAPbU7k6bwXUSqAcHxcTFLE020WN6"/>
      </div>

      <CareerVimeoContainer
        className="mt-[128px] lg:mt-[192px]"
        vimeoUrl={pageMeta.fields.vimeoUrl}
        previewVideoUrl={formatURL(
          pageMeta.fields.vimeoPreviewVideo.fields.file.url
        )}
        deviceType={deviceType}
        muiTheme={muiTheme as any}
        useVtTranslate={useVtTranslate}
      />

      {pageMeta.fields?.academyTitle !== undefined && pageMeta.fields.academyTitle !== "" && (
        <RichTextSectionBlok 
          blok={{
            title: 
            pageMeta?.fields?.academyTitle,
            divider: true,
            rich_text: pageMeta?.fields?.academyDescription,
            spacing: "narrow",
            _uid: "academy",
            component: "rich_text_section",
          }}
        >
          <Button
            type="PRIMARY"
            size="lg"
            className="mt-5"
            router={router}
            url={pageMeta?.fields?.link}
          >
            {pageMeta?.fields?.linkText}
          </Button>
        </RichTextSectionBlok>
      )}

      <BulletCardsGrid
        title={t("BULLET_CARDS_GRID.TITLE")}
        bulletCards={bulletCards}
        className="mt-[128px] lg:mt-[192px]"
        gridColumns={3}
        showBgCanvas
        descriptionType="body_2"
      />

      <AccordionListSection
        items={serviceOffered}
        title={t("SERVICES_OFFERED.TITLE")}
      />

      <CareerPersonalDevelopment
        imageUrl={formatURL(
          pageMeta?.fields?.personalDevelopmentImage?.fields?.file?.url
        )}
        blurDataUrl={
          pageMeta?.fields?.personalDevelopmentImage?.fields?.file?.url ||
          DEFAULT_IMAGE_LOADER
        }
        imageAlt={
          pageMeta?.fields?.personalDevelopmentImage?.fields?.description
        }
        useVtTranslate={useVtTranslate}
      />

      <StackedHalfSurface
        image={{
          src: formatURL(
            pageMeta?.fields?.careerWithVetTrustImage?.fields?.file?.url
          ),
          alt: pageMeta?.fields?.careerWithVetTrustImage?.fields?.description,
          blurDataUrl:
            formatURL(
              pageMeta?.fields?.careerWithVetTrustImage?.fields?.file?.url
            ) || DEFAULT_IMAGE_LOADER,
          className: "h-[580px]",
        }}
        className="mt-[128px] lg:mt-[192px] relative z-[10]"
      >
        <Section
          title={{
            text: t("CAREER_WITH_VETTRUST.TITLE"),
            level: "h2",
            className: "",
          }}
          className="h-full flex flex-col justify-center z-[10]"
          childrenContainerClassname="z-[10]"
        >
          <Paragraph type="body_1">
            {t("CAREER_WITH_VETTRUST.PARAGRAPH")}
          </Paragraph>
          <Button
            type="PRIMARY"
            size="lg"
            className="mt-[40px] relative z-[10]"
            disabled={false}
            iconRight="ArrowRight"
            iconRightClassName="w-[16px] h-[16px]"
            router={router}
            onClick={navigateToOpenPositions}
          >
            {t("CAREER_WITH_VETTRUST.BUTTON")}
          </Button>
        </Section>
      </StackedHalfSurface>

      <AccordionListSection
        items={offersForTraining}
        title={t("OFFERS_FOR_TRAINING.TITLE")}
        showRightBgCircles
      />

      <div className="container-wrapper my-48 relative z-10">
        <div className="flex flex-col lg:flex-row p-5 lg:p-10 bg-white rounded-xl items-center">
          <Section
            title={{
              text: t("COFFEE_CHAT.TITLE"),
              level: "h2",
            }}
            className="lg:w-1/2 border-b lg:border-b-0 lg:border-r lg:pr-6 pb-10 lg:pb-0"
          >
            <p className="text-lg">{t("COFFEE_CHAT.PARAGRAPH")}</p>
            <Button
              type="PRIMARY"
              size="lg"
              className="mt-10"
              disabled={false}
              iconLeft="Calendar"
              iconRight="ArrowRight"
              router={router}
              onClick={() => setIsCalendlyOpen(true)}
            >
              {t("COFFEE_CHAT.BUTTON")}
            </Button>

            <PopupModal
              url={`${pageMeta.fields.calendlyLink}?background_color=f2ece1&text_color=132f55&primary_color=d52f89`}
              onModalClose={() => setIsCalendlyOpen(false)}
              open={isCalendlyOpen}
              /*
               * react-calendly uses React's Portal feature (https://reactjs.org/docs/portals.html) to render the popup modal. As a result, you'll need to
               * specify the rootElement property to ensure that the modal is inserted into the correct domNode.
               * uses __next as it's the highest parent and always available
               */
              rootElement={document.getElementById("__next") as HTMLElement}
            />
          </Section>

          <div className="bg-white text-center rounded-xl flex flex-col items-center justify-center lg:w-1/2 pt-10 lg:pt-0">
            <div className="h-[120px] w-[120px] border-magenta border-solid border-[5px] overflow-hidden rounded-full object-cover relative">
              <VTImage
                src={formatURL(pageMeta.fields.contactImage.fields?.file?.url)}
                layout="fill"
                objectFit="cover"
                placeholder="blur"
                blurDataURL={
                  formatURL(pageMeta.fields.contactImage.fields?.file?.url) ||
                  DEFAULT_IMAGE_LOADER
                }
                alt={pageMeta.fields.contactImage.fields?.description}
              />
            </div>
            <Heading
              text={pageMeta.fields.contactName}
              level="h3"
              className="mt-4 hidden lg:block"
            />
            <Heading
              text={pageMeta.fields.contactName}
              level="h4"
              className="mt-4 lg:hidden"
            />
            <div className="mt-1 text-lightBlue-1.5 text-sm md:text-base block">
              {pageMeta.fields.contactJobTitle}
            </div>
            <span className="flex underline items-center text-sm md:text-base mt-4 text-darkBlue">
              <Mail className="mr-2 w-4 h-4" />
              <a href={`mailto:${pageMeta.fields.contactEmailAddress}`}>
                {pageMeta.fields.contactEmailAddress}
              </a>
            </span>
          </div>
        </div>
      </div>

      <StackedRightSurface
        image={{
          src: formatURL(
            pageMeta?.fields?.ourJobOffersImage?.fields?.file?.url
          ),
          alt: pageMeta?.fields?.ourJobOffersImage?.fields?.description,
          blurDataUrl:
            formatURL(pageMeta?.fields?.ourJobOffersImage?.fields?.file?.url) ||
            DEFAULT_IMAGE_LOADER,
        }}
        className="text-white mt-[128px] lg:mt-[192px] relative mb-[64px] lg:mb-[112px]"
      >
        <Section
          title={{
            text: t("OUR_JOB_OFFERS.TITLE"),
            level: "h2",
            className: "text-white",
          }}
          backgroundColor=""
          className="text-white p-[20px] lg:p-[40px] flex flex-col justify-between bg-darkBlue rounded-[12px]"
        >
          <Paragraph type="body_1">{t("OUR_JOB_OFFERS.PARAGRAPH")}</Paragraph>
          <Button
            type="SECONDARY"
            size="lg"
            className="mt-[40px] "
            disabled={false}
            iconRight="ArrowRight"
            router={router}
            onClick={navigateToOpenPositions}
          >
            {t("CAREER_WITH_VETTRUST.BUTTON")}
          </Button>
        </Section>
      </StackedRightSurface>

      <BottomFooterContainer>
        <CareerSignup
          image={{
            src: formatURL(pageMeta?.fields?.signupImage?.fields?.file?.url),
            alt: pageMeta?.fields?.signupImage?.fields?.description,
            blurDataUrl:
              formatURL(pageMeta?.fields?.signupImage?.fields?.file?.url) ||
              DEFAULT_IMAGE_LOADER,
          }}
          className="bg-white"
          router={undefined}
          {...allAtomsAndI18n}
        />
      </BottomFooterContainer>
    </>
  );
};

export async function getServerSideProps({
  req,
  locale,
}: GetServerSidePropsContext) {
  const pageMeta = await client.getEntries({
    content_type: "pages__career",
    include: 2,
    locale: getContentfulLocale(locale as string),
    "fields.platformUrl": VTPlatformURLS.VETTRUST,
  });

  return {
    props: {
      locale,
      deviceType: getDeviceType(req),
      ...(await serverSideTranslations(locale as string, [
        "career",
        "common",
        "about",
        "location",
      ])),
      pageMeta: pageMeta.items[0],
    },
  };
}

type HomePageProps = PageProps<
  {
    deviceType: string;
  },
  CFPageCareer
>;

export default Home;
