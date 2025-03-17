/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-use-before-define */
import { GetServerSidePropsContext } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import React, { useEffect, useMemo } from "react";
import { useAtom } from "jotai";
import {
  ComponentProps,
  getDeviceType,
  client,
  Section,
  GlobalPartnerCard,
  Paragraph,
  getContentfulLocale,
  PageProps,
  CfCollectionPartnerType,
  VTPlatformURLS,
} from "@somethingcreative-agency/vettrust-design_system";
import { useRouter } from "next/router";
import useVtTranslate from "../shared/utils/useVtTranslate";
import { currentPracticeSearchStepAtom } from "../atoms/practiceSearch";

const GlobalPartnersPage: React.FC<ComponentProps<PartnerPageProps>> = ({
  partners,
}) => {
  const { t } = useVtTranslate("location");
  const router = useRouter();

  const [, setCurrentSearchStep] = useAtom(currentPracticeSearchStepAtom);

  useEffect(
    () => {
      return () => setCurrentSearchStep(null);
    },
    // ⚠️ Don't update the dependency array, otherwise it goes into an infinite loop ⚠️
    // eslint-disable-next-line
    []
  );

  // Order partners by sorting index
  const sortedPartners = useMemo(
    () =>
      partners.sort((a, b) => {
        return a.fields.sortingIndex - b.fields.sortingIndex;
      }),
    [partners]
  );

  const partnersNodes = useMemo(
    () =>
      sortedPartners.map(partnerType => (
        <Section
          title={{ text: partnerType.fields.name, level: "h2" }}
          className="mb-[64px]"
          key={partnerType.sys.id}
          childrenContainerClassname="pt-[8px]"
        >
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-[32px]">
            {partnerType.fields.partners.map(partner => (
              <GlobalPartnerCard
                partner={partner}
                key={Math.random()}
                useVtTranslate={useVtTranslate}
                router={router}
              />
            ))}
          </div>
        </Section>
      )),
    [sortedPartners]
  );

  return (
    <div className="container-wrapper">
      <Section
        title={{ text: t("GLOBAL_PARTNERS_PAGE.TITLE"), level: "h1" }}
        className="mb-[64px] lg:mb-[96px] mt-[144px] lg:mt-[176px]"
      >
        <Paragraph type="body_1">
          {t("GLOBAL_PARTNERS_PAGE.DESCRIPTION")}
        </Paragraph>
      </Section>

      {partnersNodes}
    </div>
  );
};

export async function getServerSideProps({
  locale,
  req,
}: GetServerSidePropsContext) {
  const partners = await client.getEntries({
    content_type: "collectionPartnerType",
    locale: getContentfulLocale(locale as string),
    "fields.platformUrl[in]": VTPlatformURLS.CLINICA_ALPINA,
  });

  return {
    props: {
      locale,
      deviceType: getDeviceType(req),
      partners: partners.items,
      ...(await serverSideTranslations(locale as string, [
        "home",
        "common",
        "about",
        "blog",
        "location",
      ])),
    },
  };
}

type PartnerPageProps = PageProps<{
  partners: CfCollectionPartnerType[];
}>;

export default GlobalPartnersPage;
