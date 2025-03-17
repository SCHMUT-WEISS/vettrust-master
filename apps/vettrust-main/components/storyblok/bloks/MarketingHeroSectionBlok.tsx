import {
  Hero,
  Paragraph,
} from "@somethingcreative-agency/vettrust-design_system";
import { StoryblokComponent, storyblokEditable } from "@storyblok/react";
import { useRouter } from "next/router";
import { MarketingHeroSectionStoryblok } from "../../../@types/generated/storyblok";
import { PAGES_WITH_HERO_ANIMATION } from "../../../shared/constants/pages";
import { allAtomsAndI18n } from "../../../shared/utils/designSystem";

interface MarketingHeroSectionBlokProps {
  blok: MarketingHeroSectionStoryblok;
}

export default function MarketingHeroSectionBlok({
  blok,
}: MarketingHeroSectionBlokProps) {
  const router = useRouter();

  const ctaBlok = blok.call_to_action || [];

  return (
    <div {...storyblokEditable({ ...blok })}>
      <Hero
        bgImage={{
          url: blok.image.filename,
          smallUrl: blok.image.filename,
          blurDataUrl: blok.image.filename,
          alt: blok.image.alt,
        }}
        title={blok.title}
        PAGES_WITH_HERO_ANIMATION={PAGES_WITH_HERO_ANIMATION}
        router={router}
        displayChildrenInSection
        scrollButtonDisplayed
        {...allAtomsAndI18n}
      >
        <Paragraph type="body_1" className="text-white mb-10">
          {blok.description}
        </Paragraph>
        {ctaBlok.length > 0 && <StoryblokComponent blok={ctaBlok[0]} />}
      </Hero>
    </div>
  );
}
