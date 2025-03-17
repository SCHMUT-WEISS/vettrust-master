import {
  Section,
  StackedHalfSurface,
} from "@somethingcreative-agency/vettrust-design_system";
import { StoryblokComponent, storyblokEditable } from "@storyblok/react";
import { ImageContentSectionStoryblok } from "../../../@types/generated/storyblok";
import RichTextRenderer from "../RichTextRenderer";

interface ImageContentSectionBlokProps {
  blok: ImageContentSectionStoryblok;
}

const spacing = {
  default: "mt-32 lg:mt-48",
  narrow: "mt-24 lg:mt-32",
};

export default function ImageContentSectionBlok({
  blok,
}: ImageContentSectionBlokProps) {
  return (
    <div {...storyblokEditable({ ...blok })}>
      <StackedHalfSurface
        image={{
          src: blok.image_or_video.filename,
          alt: blok.image_or_video.alt || "",
          blurDataUrl: blok.image_or_video.filename,
          className: `${blok?.size === 'small' ? 'min-h-[252px] max-w-[296px]' : 'min-h-[580px]'}${blok?.rounded ? ' --rounded' : ''} ${blok.reversed ? "order-last" : "order-first"}`,
        }}
        className={`${spacing[blok.spacing]} relative z-[10]`}
      >
        <Section
          title={{
            text: blok.title,
            level: "h2",
            className: "",
          }}
          className="h-full flex flex-col justify-center z-[10]"
          childrenContainerClassname="z-[10]"
        >
          <RichTextRenderer document={blok.content} className="mb-10" />

          {blok.call_to_action && blok.call_to_action.length > 0 && (
            <div className="flex flex-wrap gap-4 mx-5 lg:m-0">
              {blok.call_to_action.map(callToAction => {
                return (
                  <StoryblokComponent
                    blok={callToAction}
                    // eslint-disable-next-line no-underscore-dangle
                    key={callToAction._uid}
                  />
                );
              })}
            </div>
          )}
        </Section>
      </StackedHalfSurface>
    </div>
  );
}
