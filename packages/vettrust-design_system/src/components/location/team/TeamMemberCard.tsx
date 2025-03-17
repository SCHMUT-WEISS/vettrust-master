/* eslint-disable no-use-before-define,indent */
import React from "react";
import {
  ComponentProps,
  CfCollectionEmployee,
  UseVtTranslateType
} from "../../../@types";
import VTImage from "../../shared/VTImage";
import Heading from "../../shared/Heading";
import Paragraph from "../../shared/Paragraph";
import Button from "../../shared/Button";
import { DEFAULT_IMAGE_LOADER } from "../../../shared/pages";
import { formatURL } from "../../../shared/utils";
import { Mail } from "../../../assets";

const TeamMemberCard: React.FC<ComponentProps<TeamMemberCardProps>> = ({
  member,
  onButtonClick,
  useVtTranslate,
  router
}) => {
  const { t } = useVtTranslate("location");

  return (
    <div className="team-card-wrapper h-full">
      <div
        className="bg-white text-center rounded-[12px] flex flex-col items-center justify-center p-[24px] lg:mr-0 h-full"
        key={Math.random().toString()}
      >
        <div className="flex-auto flex flex-col items-center">
          <div className="h-[120px] w-[120px] border-magenta border-solid border-[5px] overflow-hidden rounded-full object-cover relative">
            <VTImage
              src={formatURL(member?.fields?.image?.fields?.file?.url)}
              layout="fill"
              objectFit="cover"
              placeholder="blur"
              blurDataURL={
                formatURL(member?.fields?.image?.fields?.file?.url) ||
                DEFAULT_IMAGE_LOADER
              }
              className="rounded-full"
              alt={member?.fields?.image?.fields?.description}
            />
          </div>

          <Heading
            level="h4"
            text={member.fields.name}
            className="mt-[16px] mb-[4px]"
          />

          <Paragraph type="body_3" className="text-lightBlue-pressed">
            {member.fields.jobTitle}
          </Paragraph>

          {member.fields.email && (
            <span className="flex underline items-center justify-center text-darkBlue mt-2 text-sm">
              <Mail className="mr-2 w-4 h-4" />{" "}
              <a
                href={`mailto:${member.fields.email}`}
                target="_blank"
                rel="noreferrer"
              >
                {member.fields.email}
              </a>
            </span>
          )}

          {member.fields.certificates &&
            member.fields.certificates.length !== 0 && (
              <div className="mt-[16px] flex items-center justify-center flex-wrap gap-[8px]">
                {member.fields.certificates.map((certificate) => (
                  <span
                    key={Math.random().toString()}
                    className="text-[12px] min-w-[82px] min-h-[20px] bg-sand py-[2px] px-[8px] flex items-center justify-center rounded-[6px] whitespace-nowrap"
                  >
                    {certificate}
                  </span>
                ))}
              </div>
            )}
        </div>

        {member.fields.bio && (
          <Button
            type="TERTIARY"
            size="sm"
            focusRingClassName="xs:ring-offset-white"
            className="border-0 p-0 text-[16px] mt-[16px] h-[24px] mt-[16px]"
            onClick={() => onButtonClick(member)}
            iconLeft="PlusDanger"
            router={router}
          >
            <Paragraph type="body_2">
              {t("TEAM_PAGE.CARD_BUTTON_LABEL")}
            </Paragraph>
          </Button>
        )}
      </div>
    </div>
  );
};

interface TeamMemberCardProps {
  member: CfCollectionEmployee;
  className?: string;
  onButtonClick: (member: CfCollectionEmployee) => void;
  useVtTranslate: UseVtTranslateType;
  router: any;
}

export default TeamMemberCard;
