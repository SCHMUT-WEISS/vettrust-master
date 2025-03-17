/* eslint-disable no-use-before-define */
import React from "react";
import { ComponentProps, UseVtTranslateType } from "../../@types";
import Section from "../shared/Section";
import Paragraph from "../shared/Paragraph";
import BulletPoint from "../bullets/BulletPoint";
import StackedLeftSurface from "../surfaces/StackedLeftSurface";

const CareerPersonalDevelopment: React.FC<
  ComponentProps<CareerPersonalDevelopmentProps>
> = ({ imageUrl, imageAlt, useVtTranslate }) => {
  const { t } = useVtTranslate("career");
  return (
    <StackedLeftSurface
      image={{
        src: imageUrl,
        alt: imageAlt,
        blurDataUrl: imageUrl
      }}
      className="text-white mt-[128px] lg:mt-[192px] relative"
    >
      <Section
        title={{
          text: t("PERSONAL_DEVELOPMENT.TITLE"),
          level: "h2",
          className: "text-white break-words"
        }}
        backgroundColor=""
        className="text-white p-[20px] lg:p-[40px] bg-darkBlue rounded-[12px]"
      >
        <Paragraph type="body_1">
          {t("PERSONAL_DEVELOPMENT.PARAGRAPH")}
        </Paragraph>
        <div className="lg:flex mt-[16px] gap-[16px]">
          <BulletPoint>{t("PERSONAL_DEVELOPMENT.BULLET_1")}</BulletPoint>
          <BulletPoint>{t("PERSONAL_DEVELOPMENT.BULLET_2")}</BulletPoint>
        </div>
        <div className="lg:flex gap-[24px]">
          <BulletPoint>{t("PERSONAL_DEVELOPMENT.BULLET_3")}</BulletPoint>
          <BulletPoint>{t("PERSONAL_DEVELOPMENT.BULLET_4")}</BulletPoint>
        </div>
        <BulletPoint>{t("PERSONAL_DEVELOPMENT.BULLET_5")}</BulletPoint>
      </Section>
    </StackedLeftSurface>
  );
};

interface CareerPersonalDevelopmentProps {
  imageUrl: string;
  blurDataUrl: string;
  imageAlt: string;
  useVtTranslate: UseVtTranslateType;
}

export default CareerPersonalDevelopment;
