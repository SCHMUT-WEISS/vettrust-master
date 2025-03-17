/* eslint-disable no-use-before-define,indent,react-hooks/exhaustive-deps,@typescript-eslint/ban-ts-ignore */
import React, { useMemo } from "react";
import Section from "../shared/Section";
import { ComponentProps, BulletCard } from "../../@types";
import Heading from "../shared/Heading";
import { BgCircleCanvas } from "../../assets/svg";
import Paragraph from "../shared/Paragraph";
import * as Icons from "../../assets/icons";
import { DogDangerGolden } from "../../assets/icons";

const BulletCardsGrid = ({
  title,
  bulletCards = [],
  gridColumns = 4,
  className,
  showBgCanvas,
  id,
  descriptionType = "body_1",
  bgCanvasPosition = "left"
}: ComponentProps<BulletCardProps>) => {
  const gridColsStyle = ((cols) => {
    if (cols === 2) {
      return "md:grid-cols-2 lg:grid-cols-2";
    }
    return gridColumns === 4
      ? "md:grid-cols-2 lg:grid-cols-4"
      : "md:grid-cols-2 lg:grid-cols-3";
  })(gridColumns);

  const bulletsNodes = useMemo(
    () =>
      bulletCards.map((bulletCard) => (
        <div
          key={bulletCard.title + Math.random().toString()}
          className="md:block mt-[40px] lg:mt-[16px]"
        >
          {bulletCard.icon ? (
            // @ts-ignore
            React.createElement(Icons[bulletCard.icon as string], {}, null)
          ) : (
            <DogDangerGolden />
          )}
          <Heading text={bulletCard.title} level="h3" className="mt-[24px]" />
          {bulletCard.subtitle && (
            <Paragraph type="body_1" className="text-darkBlue mt-[4px]">
              {bulletCard.subtitle}
            </Paragraph>
          )}
          <Paragraph
            type={descriptionType}
            className="text-darkBlue mt-[8px] hidden lg:block"
          >
            {bulletCard.description}
          </Paragraph>
          <Paragraph type="body_1" className="text-darkBlue mt-[8px] lg:hidden">
            {bulletCard.description}
          </Paragraph>
        </div>
      )),
    [bulletCards, descriptionType]
  );

  return (
    <div className="container-wrapper relative z-[10]" id={id}>
      {showBgCanvas && (
        <BgCircleCanvas
          className={`absolute ${
            bgCanvasPosition === "left" ? "left-[-400px]" : "right-[-400px]"
          } top-[calc(50%_-_400px)] z-[-1]`}
        />
      )}
      <Section
        title={{
          text: title,
          level: "h2",
          className: ""
        }}
        backgroundColor=""
        className={` ${className}`}
      >
        <div className={`md:grid md:gap-[32px] ${gridColsStyle}`}>
          {bulletsNodes}
        </div>
      </Section>
    </div>
  );
};

interface BulletCardProps {
  title: string | React.ReactNode;
  bulletCards: BulletCard[];
  gridColumns?: 2 | 3 | 4;
  className?: string;
  showBgCanvas?: boolean;
  descriptionType?: "body_1" | "body_2";
  bgCanvasPosition?: "right" | "left";
}

export default BulletCardsGrid;
