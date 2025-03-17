/* eslint-disable no-use-before-define */
import React from "react";
import {
  ComponentProps,
  CFCollectionLocation,
  UseVtTranslateType,
  CfCollectionEmployee
} from "../../../@types";
import { BgCircleCanvas } from "../../../assets/svg";
import Section from "../../shared/Section";
import Paragraph from "../../shared/Paragraph";
import RichTextRenderer from "../../shared/RichTextRenderer";
import Button from "../../shared/Button";
import UserCard from "../../users/UserCard";

const LocationHomeTeamSection: React.FC<
  ComponentProps<LocationHomeTeamSectionProps>
> = ({ location, relatedLocations, router, useVtTranslate }) => {
  const { t } = useVtTranslate("location");

  const hasStaff = (location.fields?.vetStaff && location.fields.vetStaff.length > 0);

  return (
    <div
      className={`grid lg:grid-cols-2 gap-[40px] items-center lg:gap-[32px] container-wrapper relative z-[10] ${
        relatedLocations.length === 0
          ? "mt-[518px] lg:mt-[278px]"
          : "mt-[64px] lg:mt-[128px]"
      }`}
    >
      <BgCircleCanvas className="absolute left-[-400px] top-[calc(50%_-_400px)] z-[-1]" />
      <Section
        title={{ text: location.fields.welcomeMessageHeading, level: "h2" }}
        className=""
      >
        <Paragraph type="body_1">
          <RichTextRenderer
            document={location.fields.welcomeMessage}
            useVtTranslate={useVtTranslate}
          />
        </Paragraph>
        <Button
          type="PRIMARY"
          size="lg"
          iconRight="ArrowRight"
          className="mt-[40px]"
          url={`/locations/${location.fields.slug}/team`}
          router={router}
        >
          {t("WELCOME_SECTION.BUTTON_LABEL")}
        </Button>
      </Section>

      <div className="">
        {(!hasStaff && location.fields.leadVet) && (
          <UserCard
            employee={location.fields.leadVet}
            type="LOCATION_HOME_TEAM_SECTION_DISPLAY"
            className="text-darkBlue"
          />
        )}
        {(!hasStaff && location.fields.vetAssistant) && (
          <UserCard
            employee={location.fields.vetAssistant}
            type="LOCATION_HOME_TEAM_SECTION_DISPLAY"
            className="mt-[32px] text-darkBlue"
          />
        )}
        {hasStaff && location.fields.vetStaff.map(
          (staff : CfCollectionEmployee, i: number) =>
            <UserCard
              employee={staff}
              type="LOCATION_HOME_TEAM_SECTION_DISPLAY"
              className={
                (i !== 0 ? "mt-[32px]" : "") + " text-darkBlue"}
            />
        )}
      </div>
    </div>
  );
};

interface LocationHomeTeamSectionProps {
  location: CFCollectionLocation;
  relatedLocations: CFCollectionLocation[];
  useVtTranslate: UseVtTranslateType;
  router: any;
}

export default LocationHomeTeamSection;
