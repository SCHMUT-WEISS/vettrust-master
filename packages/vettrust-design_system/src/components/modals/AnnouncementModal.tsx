import React from "react";
import { useAtom } from "jotai";
import { Document } from "@contentful/rich-text-types";

import Heading from "../shared/Heading";
import Paragraph from "../shared/Paragraph";
import RichTextRenderer from "../shared/RichTextRenderer";
import Button from "../shared/Button";
import {
  ComponentProps,
  VTAtom,
  ModalsState,
  CFCollectionAnnouncement,
  UseVtTranslateType
} from "../../@types";

const Icon = () => (
  <svg
    width="32"
    height="32"
    viewBox="0 0 32 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M1.9165 15.9998C1.9165 8.22183 8.22183 1.9165 15.9998 1.9165C23.7778 1.9165 30.0832 8.22183 30.0832 15.9998C30.0832 23.7778 23.7778 30.0832 15.9998 30.0832C8.22183 30.0832 1.9165 23.7778 1.9165 15.9998Z"
      fill="#D52F89"
    />
    <path
      d="M16 10.6665V15.9998M16 21.3332H16.0133"
      stroke="white"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const AnnouncementModal: React.FC<ComponentProps<AnnouncementModal>> = ({
  currentlyDisplayedAnnouncementAtom,
  currentModalAtom,
  useVtTranslate,
  router,
  customUseAtom
}) => {
  const { t } = useVtTranslate("location");
  const [announcement] = customUseAtom(currentlyDisplayedAnnouncementAtom);
  const [, closeModal] = customUseAtom(currentModalAtom);

  return (
    <div className="p-[20px] lg:p-[40px] flex flex-col items-center max-w-[560px]">
      <Icon />
      <Heading
        text={announcement?.fields.name}
        level="h3"
        className="mt-[8px] text-darkBlue text-center"
      />
      <Paragraph type="body_1" className="text-darkBlue">
        <RichTextRenderer
          document={announcement?.fields.description as Document}
          useVtTranslate={useVtTranslate}
        />
      </Paragraph>

      <Button
        className="mt-[16px]"
        type="PRIMARY"
        size="lg"
        iconLeft="Check"
        onClick={() => {
          closeModal({
            type: null,
            minWidth: "md"
          });
        }}
        router={router}
      >
        {t("HERO_SHELL.ANNOUNCEMENT_BUTTON")}
      </Button>
    </div>
  );
};

interface AnnouncementModal {
  currentlyDisplayedAnnouncementAtom: ReturnType<
    VTAtom<CFCollectionAnnouncement | null>["vTAtom"]
  >;
  currentModalAtom: ReturnType<VTAtom<ModalsState["currentModal"]>["vTAtom"]>;
  useVtTranslate: UseVtTranslateType;
  router: any;
  customUseAtom: typeof useAtom;
}

export default AnnouncementModal;
