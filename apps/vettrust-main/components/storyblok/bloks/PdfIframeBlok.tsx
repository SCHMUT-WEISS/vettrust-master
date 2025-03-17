import { PdfIframeEmbed } from "@somethingcreative-agency/vettrust-design_system";
import { storyblokEditable } from "@storyblok/react";
import { PdfIframeStoryblok } from "../../../@types/generated/storyblok";
import useVtTranslate from "../../../shared/utils/useVtTranslate";

interface PdfIframeBlokProps {
  blok: PdfIframeStoryblok;
}

export default function PdfIframeBlok({ blok }: PdfIframeBlokProps) {
  if (!blok.file?.filename) return null;

  return (
    <div {...storyblokEditable({ ...blok })} className="max-w-3xl mx-auto">
      <PdfIframeEmbed
        title={blok.title || "PDF Title"}
        src={blok.file.filename}
        useVtTranslate={useVtTranslate}
      />
    </div>
  );
}
