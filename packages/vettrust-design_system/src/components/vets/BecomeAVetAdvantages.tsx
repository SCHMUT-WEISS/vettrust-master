/* eslint-disable  */
import React from "react";
import Section from "../shared/Section";
import AdvantageCard from "./AdvantageCard";
import { BgCircleCanvas as BgCircleCanvasRight } from "../../assets/svg";
import { ComponentProps, UseVtTranslateType } from "../../@types";

const BecomeAVetAdvantages: React.FC<
  ComponentProps<{ useVtTranslate: UseVtTranslateType }>
> = ({ useVtTranslate }) => {
  const { t } = useVtTranslate("become-vet");
  const bulletCards1 = new Array(3)
    .fill(null)
    .map((_, index) => t("ADVANTAGES_CARDS_GRID.CARD", { context: index + 1 }));

  const bulletCards2 = new Array(2)
    .fill(null)
    .map((_, index) => t("ADVANTAGES_CARDS_GRID.CARD", { context: index + 4 }));

  const bulletCards3 = new Array(3)
    .fill(null)
    .map((_, index) => t("ADVANTAGES_CARDS_GRID.CARD", { context: index + 6 }));

  const bulletCards4 = new Array(2)
    .fill(null)
    .map((_, index) => t("ADVANTAGES_CARDS_GRID.CARD", { context: index + 9 }));

  return (
    <Section
      title={{
        text: t("ADVANTAGES_CARDS_GRID.TITLE"),
        level: "h2",
        className: ""
      }}
      backgroundColor=""
      className="container-wrapper mt-[128px] lg:mt-[192px] relative z-[10] "
      childrenContainerClassname=""
      dividerClassName="mb-[40px]"
      dividerSmallClassName="mb-[40px]"
    >
      <BgCircleCanvasRight className="absolute right-[-400px] top-[calc(50%_-_400px)] z-[-1]" />
      <div className="grid lg:grid-cols-3 gap-[16px] lg:gap-[32px] my-[16px] lg:my-[32px]">
        {bulletCards1.map((text) => (
          <AdvantageCard text={text} key={Math.random().toString()} />
        ))}
      </div>
      <div className="grid lg:grid-cols-3 gap-[16px] lg:gap-[32px] my-[16px] lg:my-[32px]">
        <AdvantageCard
          text={bulletCards2[0]}
          key={Math.random().toString()}
          className="col-span-1"
        />
        <AdvantageCard
          text={bulletCards2[1]}
          key={Math.random().toString()}
          className="lg:col-span-2"
        />
      </div>
      <div className="grid lg:grid-cols-3 gap-[16px] lg:gap-[32px] my-[16px] lg:my-[32px]">
        {bulletCards3.map((text) => (
          <AdvantageCard text={text} key={Math.random().toString()} />
        ))}
      </div>
      <div className="grid lg:grid-cols-2 gap-[16px] lg:gap-[32px] my-[16px] lg:my-[32px]">
        {bulletCards4.map((text) => (
          <AdvantageCard text={text} key={Math.random().toString()} />
        ))}
      </div>
    </Section>
  );
};

export default BecomeAVetAdvantages;
