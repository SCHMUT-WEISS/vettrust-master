/* eslint-disable no-use-before-define */
import React from "react";
import { useAtom } from "jotai";
import Paragraph from "../../shared/Paragraph";
import {
  CFCollectionAnnouncement,
  ComponentProps,
  VTAtom,
  ModalsOptions,
  ModalsState,
  UseVtTranslateType
} from "../../../@types";

const AnnouncementIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M1.04175 9.99984C1.04175 5.05229 5.05253 1.0415 10.0001 1.0415C14.9476 1.0415 18.9584 5.05229 18.9584 9.99984C18.9584 14.9474 14.9476 18.9582 10.0001 18.9582C5.05253 18.9582 1.04175 14.9474 1.04175 9.99984Z"
      fill="#D52F89"
    />
    <path
      d="M10 6.6665V9.99984M10 13.3332H10.0083"
      stroke="white"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const AnnouncementItem: React.FC<ComponentProps<AnnouncementItemProps>> = ({
  announcement,
  className,
  useVtTranslate,
  currentModalAtom,
  currentlyDisplayedAnnouncementAtom,
  customUseAtom
}) => {
  const { t } = useVtTranslate("location");
  const [, openModal] = customUseAtom(currentModalAtom);
  const [, setDisplayedAnnouncement] = customUseAtom(
    currentlyDisplayedAnnouncementAtom
  );
  const summary = announcement.fields.description.content
    .map((node: any) => {
      return node.content.map((el: any) => el.value).join(" ");
    })
    .join(" ");

  return (
    <div
      className={`w-full flex flex-row gap-[33px] items-center ${className}`}
    >
      <span className="inline-block">
        <AnnouncementIcon />
      </span>
      <Paragraph type="body_3" className="truncate text-darkBlue">
        {summary}
      </Paragraph>
      <span className="inline-block whitespace-nowrap text-[14px] leading-[20px] text-magenta font-[600] font-NotoSans">
        <button
          className=""
          type="button"
          onClick={() => {
            setDisplayedAnnouncement(announcement);
            openModal({
              type: ModalsOptions.ANNOUNCEMENT,
              minWidth: "md"
            });
          }}
        >
          {t("SERVICES_CAROUSEL_SECTION.BUTTON_LABEL")}
        </button>
      </span>
    </div>
  );
};

interface AnnouncementItemProps {
  announcement: CFCollectionAnnouncement;
  useVtTranslate: UseVtTranslateType;
  currentModalAtom: ReturnType<VTAtom<ModalsState["currentModal"]>["vTAtom"]>;
  currentlyDisplayedAnnouncementAtom: ReturnType<
    VTAtom<CFCollectionAnnouncement | null>["vTAtom"]
  >;
  customUseAtom: typeof useAtom;
}

export default AnnouncementItem;
