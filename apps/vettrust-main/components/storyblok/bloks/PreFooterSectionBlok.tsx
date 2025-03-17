import {
  BottomFooterContainer,
  Section,
  VTImage,
} from "@somethingcreative-agency/vettrust-design_system";
import { StoryblokComponent, storyblokEditable } from "@storyblok/react";
import { PreFooterSectionStoryblok } from "../../../@types/generated/storyblok";
import RichTextRenderer from "../RichTextRenderer";

interface PreFooterSectionBlokProps {
  blok: PreFooterSectionStoryblok;
}

export default function PreFooterSectionBlok({
  blok,
}: PreFooterSectionBlokProps) {
  return (
    <div {...storyblokEditable({ ...blok })}>
      <BottomFooterContainer>
        <div className="flex flex-col-reverse lg:flex-row gap-[40px] lg:gap-[64px] p-[20px] lg:p-[40px] rounded-[12px] bg-white">
          <Section
            title={{
              text: blok.title,
              level: "h2",
            }}
            className="lg:w-[488px]"
          >
            <RichTextRenderer document={blok.content} className="mb-10" />
            <StoryblokComponent blok={blok.call_to_action[0]} />
          </Section>
          <div className="relative w-full lg:w-[520px] h-full rounded-[12px] h-[224px] md:h-[324px] lg:h-[inherit]">
            <VTImage
              className="rounded-[12px] object-cover w-full h-auto"
              layout="fill"
              src={blok.image.filename}
              alt={blok.image.alt}
              style={{
                filter: "drop-shadow(0px 2px 24px rgba(0, 0, 0, 0.04))",
              }}
              placeholder="blur"
              blurDataURL={blok.image.filename}
            />
          </div>
        </div>
      </BottomFooterContainer>
    </div>
  );
}
