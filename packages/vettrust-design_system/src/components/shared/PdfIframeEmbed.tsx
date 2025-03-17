import React from "react";
import { ComponentProps, UseVtTranslateType } from "../../@types";
import Paragraph from "./Paragraph";

export interface PdfIframeEmbedProps {
  title: string;
  src: string;
  useVtTranslate: UseVtTranslateType;
}

const PdfIframeEmbed: React.FC<ComponentProps<PdfIframeEmbedProps>> = ({
  title,
  src,
  useVtTranslate
}) => {
  const { t } = useVtTranslate("common");

  return (
    <React.Fragment>
      <div className="hidden md:block">
        <div className="h-[608px] w-full relative rounded-[12px] mt-[24px] ">
          <iframe
            title={title}
            src={`${src}#toolbar=0`}
            className="border-solid rounded-[12px] "
            style={{ width: "100%", height: "100%" }}
          />
        </div>
        <Paragraph type="caption" className="mb-[24px] line-clamp-1">
          {title}
        </Paragraph>
      </div>
      <div className="block md:hidden">
        {/* Button */}
        <a
          href={src}
          target="_blank"
          rel="noreferrer"
          className="flex items-center justify-center w-full h-[48px] rounded-[12px] bg-sand-pressed text-sand-pressed-text font-bold text-[14px] mt-[24px]"
        >
          {t("OTHERS.VIEW_PDF")}
        </a>
      </div>
    </React.Fragment>
  );
};

export default PdfIframeEmbed;
