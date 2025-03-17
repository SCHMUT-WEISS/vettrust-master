import { AccordionListSection } from "@somethingcreative-agency/vettrust-design_system";
import { storyblokEditable } from "@storyblok/react";
import { FaqSectionStoryblok } from "../../../@types/generated/storyblok";

interface FaqSectionBlokProps {
  blok: FaqSectionStoryblok;
}

export default function FaqSectionBlok({ blok }: FaqSectionBlokProps) {
  return (
    <div {...storyblokEditable({ ...blok })}>
      <AccordionListSection
        title={blok.title}
        items={blok.questions.map(({ question, answer }) => ({
          title: question,
          description: answer,
        }))}
      />
    </div>
  );
}
