/* eslint-disable security/detect-object-injection,react/require-default-props */
import { GetServerSidePropsContext, NextPage } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import React, { useEffect } from "react";
import { useAtom } from "jotai";
import {
  ComponentProps,
  client,
  PageProps,
  CFPageBecomeAVet,
  formatURL,
  Button,
  BulletCard,
  BulletCardsGrid,
  BecomeAVetAdvantages,
  TestimonialCard,
  Section,
  UserCard,
  BottomFooterContainer,
  TestimonialsCarousel,
  getDeviceType,
  Hero,
  getContentfulLocale,
  DEFAULT_IMAGE_LOADER,
  BgCircleCanvas as BgCircleCanvasLeft,
  IconsT as Icons,
  VTPlatformURLS,
} from "@somethingcreative-agency/vettrust-design_system";
import { useRouter } from "next/router";
import useVtTranslate from "../../shared/utils/useVtTranslate";
import { currentPracticeSearchStepAtom } from "../../atoms/practiceSearch";
import { allAtomsAndI18n } from "../../shared/utils/designSystem";
import { PAGES_WITH_HERO_ANIMATION } from "../../shared/constants/pages";

const testimonialsCarouselResponsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 2.5,
    slidesToSlide: 1,
  },
  tablet: {
    breakpoint: { max: 1024, min: 640 },
    items: 2,
    slidesToSlide: 1,
  },
  mobile: {
    breakpoint: { max: 640, min: 0 },
    items: 1.2,
    slidesToSlide: 1,
  },
};

// eslint-disable-next-line no-use-before-define
const BecomeAPartOfVettrust: NextPage<ComponentProps<BecomeVetPageProps>> = ({
  pageMeta,
  deviceType,
}) => {
  const { t } = useVtTranslate("become-vet");
  const router = useRouter();

  const bulletCardsIcons = [
    "TeamDanger",
    "IntegrationDanger",
    "ShieldDanger",
  ] as Array<keyof Icons>;

  const bulletCards = new Array(3).fill(null).map(
    (_, index) =>
      ({
        title: t("BULLET_CARDS_GRID.BULLETS.TITLE", { context: index + 1 }),
        subtitle: t("BULLET_CARDS_GRID.BULLETS.SUBTITLE", {
          context: index + 1,
        }),
        description: t("BULLET_CARDS_GRID.BULLETS.DESCRIPTION", {
          context: index + 1,
        }),
        icon: bulletCardsIcons[index],
      } as BulletCard)
  );

  const [, setCurrentSearchStep] = useAtom(currentPracticeSearchStepAtom);

  useEffect(
    () => {
      return () => setCurrentSearchStep(null);
    },
    // ⚠️ Don't update the dependency array, otherwise it goes into an infinite loop ⚠️
    // eslint-disable-next-line
    []
  );

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
        className=""
        scrollButtonDisplayed
        displayChildrenInSection
        router={router}
        PAGES_WITH_HERO_ANIMATION={PAGES_WITH_HERO_ANIMATION}
        {...allAtomsAndI18n}
      >
        <p className="text-white">{t("HERO.DESCRIPTION")}</p>
        <Button
          type="SECONDARY"
          size="lg"
          className="mt-[24px] lg:mt-[40px]"
          disabled={false}
          iconRight="ArrowRight"
          onClick={() => {
            const contactSection = document.getElementById(
              "ceo-contact-section-anchor"
            );
            if (contactSection) {
              contactSection.scrollIntoView({ behavior: "smooth" });
            }
          }}
          router={router}
        >
          {t("HERO.BUTTON")}
        </Button>
      </Hero>

      <BulletCardsGrid
        title={t("BULLET_CARDS_GRID.TITLE")}
        bulletCards={bulletCards}
        className="mt-[128px] lg:mt-[192px]"
        gridColumns={3}
        showBgCanvas
      />

      <BecomeAVetAdvantages useVtTranslate={useVtTranslate} />

      <Section
        title={{
          text: t("TESTIMONIALS.TITLE"),
          level: "h2",
          className: "",
        }}
        backgroundColor=""
        className="container-wrapper mt-[128px] lg:mt-[192px] hidden lg:block relative z-[10]"
      >
        <BgCircleCanvasLeft className="absolute left-[-400px] top-[calc(50%_-_400px)] z-[-1]" />
        <div className="grid grid-cols-2 gap-[32px] pt-[16px] h-full">
          {pageMeta.fields.testimonials.map(testimonial => (
            <TestimonialCard
              key={Math.random().toString()}
              testimonial={testimonial}
              className=""
              type="BECOME_A_VET_DISPLAY"
            />
          ))}
        </div>
      </Section>

      <Section
        title={{
          text: t("TESTIMONIALS.TITLE"),
          level: "h2",
          className: "",
        }}
        className="container-wrapper mt-[128px] lg:mt-[192px] lg:hidden"
        childrenContainerClassname="pt-[16px]"
      />
      <TestimonialsCarousel
        deviceType={deviceType}
        testimonials={pageMeta.fields.testimonials}
        className="site-wrapper mt-[24px] lg:hidden"
        responsive={testimonialsCarouselResponsive}
        dotsClassName="lg:hidden"
      />

      <BottomFooterContainer>
        <span className="absolute mt-[-148px]" id="ceo-contact-section-anchor">
          &nbsp;
        </span>
        <div className="flex flex-col lg:flex-row p-[20px] lg:p-[40px] bg-white rounded-[12px] mt-[48px] lg:mt-[112px]">
          <Section
            title={{
              text: t("INTEREST.TITLE"),
              level: "h2",
              className: "",
            }}
            backgroundColor=""
            className="lg:w-1/2 lg:border-r lg:pr-[24px] border-b lg:border-b-0 pb-[40px] lg:pb-0"
          >
            <p className="text-[18px]">{t("INTEREST.DESCRIPTION")}</p>
          </Section>
          <UserCard
            key={Math.random().toString()}
            className="lg:w-1/2 md:p-0 mt-[40px] lg:mt-0"
            employee={pageMeta.fields.cmaoCard}
            type="BECOME_A_VET_FLEX"
          />
        </div>
      </BottomFooterContainer>
    </>
  );
};

export async function getServerSideProps({
  locale,
  req,
}: GetServerSidePropsContext) {
  const pageMeta = await client.getEntries({
    content_type: "pages__becomeAVet",
    locale: getContentfulLocale(locale as string),
    "fields.platformUrl": VTPlatformURLS.VETTRUST,
  });

  return {
    props: {
      deviceType: getDeviceType(req),
      locale,
      ...(await serverSideTranslations(locale as string, [
        "blog",
        "common",
        "about",
        "become-vet",
        "location",
      ])),
      pageMeta: pageMeta.items[0],
    },
  };
}

type BecomeVetPageProps = PageProps<
  {
    deviceType: string;
  },
  CFPageBecomeAVet
>;

export default BecomeAPartOfVettrust;
