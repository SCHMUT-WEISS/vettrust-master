/* eslint-disable no-use-before-define,react-hooks/exhaustive-deps */
// eslint-disable-next-line no-use-before-define
import React, { useMemo } from "react";
import { useAtom } from "jotai";
import {
  ComponentProps,
  VTAtom,
  CfCollectionEmployee,
  ModalsOptions,
  ModalsState,
  UseVtTranslateType
} from "../../../@types";
import TeamMemberCard from "./TeamMemberCard";
import TeamMembersCarousel from "./TeamMembersCarousel";

const TeamMemberCardsGrid: React.FC<ComponentProps<TeamMemberCardProps>> = ({
  members,
  currentModalAtom,
  currentlyDisplayedTeamMemberAtom,
  router,
  useVtTranslate,
  customUseAtom,
}) => {
  const [, setCurrentModal] = customUseAtom(currentModalAtom);
  const [, setCurrentlyDisplayedMember] = customUseAtom(
    currentlyDisplayedTeamMemberAtom
  );

  const onButtonClick = (member: CfCollectionEmployee) => {
    setCurrentlyDisplayedMember(member);
    setCurrentModal({
      type: ModalsOptions.LOCATION_TEAM_MEMBER_DETAILS,
      minWidth: "md"
    });
  };

  const membersNodes = useMemo(
    () =>
      members.map((employee) => (
        <TeamMemberCard
          key={Math.random().toString()}
          member={employee}
          onButtonClick={() => onButtonClick(employee)}
          router={router}
          useVtTranslate={useVtTranslate}
        />
      )),
    [members]
  );

  return (
    <React.Fragment>
      <div className="container-wrapper hidden lg:grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-[16px] md:gap-[24px] lg:gap-[32px] mt-[40px]">
        {membersNodes}
      </div>

      <TeamMembersCarousel
        members={members}
        onButtonClick={(member) => onButtonClick(member)}
        className="lg:hidden mt-[40px]"
        dotsClassName="lg:hidden"
        router={router}
        useVtTranslate={useVtTranslate}
      />
    </React.Fragment>
  );
};

interface TeamMemberCardProps {
  members: CfCollectionEmployee[];
  currentModalAtom: ReturnType<VTAtom<ModalsState["currentModal"]>["vTAtom"]>;
  currentlyDisplayedTeamMemberAtom: ReturnType<
    VTAtom<CfCollectionEmployee | null>["vTAtom"]
  >;
  useVtTranslate: UseVtTranslateType;
  router: any;
  customUseAtom: typeof useAtom;
}

export default TeamMemberCardsGrid;
