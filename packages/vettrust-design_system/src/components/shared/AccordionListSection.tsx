/* eslint-disable no-use-before-define,react/no-unused-prop-types */
import React, { ReactNode, useMemo } from "react";
import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material";
import { ComponentProps } from "../../@types";
import Section from "./Section";
import { ChevronDownDanger } from "../../assets/icons";
import Heading from "./Heading";
import Paragraph from "./Paragraph";
import { BgCircleCanvas as BgCircleCanvasRight } from "../../assets/svg";

const AccordionListSection: React.FC<
  ComponentProps<AccordionListSectionProps>
> = ({
  items,
  title,
  className,
  showRightBgCircles,
  childrenContainerClassname,
  children,
}) => {
  const itemsNodes = useMemo(
    () =>
      items.map(item => (
        <Accordion
          key={Math.random().toString()}
          sx={{
            borderRadius: "12px",
          }}
          className="MuiAccordion-root-custom mb-[16px] border-0"
        >
          <AccordionSummary
            expandIcon={
              <ChevronDownDanger className="ml-0 h-[24px] w-[24px] lg:h-[32px] lg:w-[32px]" />
            }
            aria-controls={item.title as unknown as string}
            id={item.title as unknown as string}
          >
            <Heading
              level="h3"
              text={item.title}
              className="hover:text-magenta hidden lg:block"
            />
            <Heading
              level="h4"
              text={item.title}
              className="hover:text-magenta lg:hidden"
            />
          </AccordionSummary>
          <AccordionDetails>
            <Paragraph type="body_1" className="hidden text-darkBlue lg:block">
              {item.description}
            </Paragraph>
            <Paragraph type="body_2" className="lg:hidden text-darkBlue">
              {item.description}
            </Paragraph>
          </AccordionDetails>
        </Accordion>
      )),
    [items]
  );

  return (
    <Section
      title={{
        text: title,
        level: "h2",
        className: "",
      }}
      backgroundColor=""
      className={`container-wrapper mt-[128px] lg:mt-[192px] relative z-[10] ${className}`}
      childrenContainerClassname={`pt-[16px] ${childrenContainerClassname}`}
    >
      {children}
      {showRightBgCircles && (
        <BgCircleCanvasRight className="absolute about-bg-circles top-[calc(50%_-_400px)] z-[-1]" />
      )}
      {itemsNodes}
    </Section>
  );
};

interface AccordionListSectionProps {
  title: string | ReactNode;
  items: {
    title: string | ReactNode;
    description: string | ReactNode;
  }[];
  showRightBgCircles?: boolean;
  childrenContainerClassname?: string;
}

export default AccordionListSection;
