import { StoryblokComponent, storyblokEditable } from "@storyblok/react";

import { PageStoryblok } from "../../../@types/generated/storyblok";

interface PageBlokProps {
  blok: PageStoryblok;
}

const PageBlok = ({ blok }: PageBlokProps) => {
  return (
    <main {...storyblokEditable({ ...blok })}>
      {blok.body?.map(nestedBlok => (
        // eslint-disable-next-line no-underscore-dangle
        <StoryblokComponent blok={nestedBlok} key={nestedBlok._uid} />
      ))}
    </main>
  );
};

export default PageBlok;
