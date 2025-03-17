import { Section } from "@somethingcreative-agency/vettrust-design_system";
import { RichTextSectionStoryblok } from "../../../@types/generated/storyblok";
import RichTextRenderer from "../RichTextRenderer";

interface RichTextSectionBlokProp {
  blok: RichTextSectionStoryblok;
  children: any
}

const spacing = {
  default: "mt-32 lg:mt-48",
  narrow: "mt-24 lg:mt-32",
};

export default function RichTextSectionBlok({ blok, children }: RichTextSectionBlokProp) {
  return (
    <Section
      divider={blok.divider ?? true}
      title={{ level: "h2", text: blok.title, className: "m-0" }}
      className={`${spacing[blok.spacing]} prose container-wrapper`}
    >
      <RichTextRenderer document={blok.rich_text} />
      {children !== undefined ? children : null}
    </Section>
  );
}