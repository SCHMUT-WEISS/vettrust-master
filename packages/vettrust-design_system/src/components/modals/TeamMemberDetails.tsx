/* eslint-disable indent */
import React from "react";
import { useAtom } from "jotai";
import { ComponentProps, VTAtom } from "../../@types";
import VTImage from "../shared/VTImage";
import { formatURL } from "../../shared/utils/contentful/helpers";
import Heading from "../shared/Heading";
import Paragraph from "../shared/Paragraph";
import { CfCollectionEmployee } from "../../@types/content/CFCollectionEmployee";
import { DEFAULT_IMAGE_LOADER } from "../../shared/pages";

const TeamMemberDetails: React.FC<ComponentProps<TeamMemberDetailsProps>> = ({
  currentlyDisplayedTeamMemberAtom, customUseAtom,
}) => {
  const [currentlyDisplayedMember] = customUseAtom(currentlyDisplayedTeamMemberAtom);
  const member = currentlyDisplayedMember as CfCollectionEmployee;

  return (
    <div
      className="max-w-[560px] bg-white text-center rounded-[12px] flex flex-col items-center justify-center p-[20px] lg:p-[40px] mr-[16px] lg:mr-0"
      key={Math.random().toString()}
    >
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
        level="h3"
        text={member.fields.name}
        className="mt-[16px] mb-[4px]"
      />

      <Paragraph type="body_3" className="text-lightBlue-pressed">
        {member.fields.jobTitle}
      </Paragraph>

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

      <div className="mt-[24px]">
        <Paragraph type="body_1" className="text-darkBlue text-left">
          {member.fields.bio}
        </Paragraph>

        {member.fields.phoneNumber && (
          <a
            className="underline block mt-[24px] text-darkBlue"
            href={`tel:${member.fields.phoneNumber}`}
          >
            {member.fields.phoneNumber}
          </a>
        )}
        {member.fields.email && (
          <a
            className="underline block mt-[24px] text-darkBlue"
            href={`mailto:${member.fields.email}`}
          >
            {member.fields.email}
          </a>
        )}
      </div>
    </div>
  );
};

interface TeamMemberDetailsProps {
  currentlyDisplayedTeamMemberAtom: ReturnType<
    VTAtom<CfCollectionEmployee | null>["vTAtom"]
  >;
  customUseAtom: typeof useAtom;
}

export default TeamMemberDetails;
