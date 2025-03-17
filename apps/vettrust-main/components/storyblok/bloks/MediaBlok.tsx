import {
  DEFAULT_IMAGE_LOADER,
  VTImage,
} from "@somethingcreative-agency/vettrust-design_system";
import { MediaStoryblok } from "../../../@types/generated/storyblok";

interface MediaBlokProps {
  blok: MediaStoryblok;
}

const spacing = {
  default: "mt-32 lg:mt-48",
  narrow: "mt-24 lg:mt-32",
};

export default function MediaBlok({ blok }: MediaBlokProps) {
  return (
    <div className={`container-wrapper flex ${spacing[blok.spacing]} justify-${blok.align ?? 'start'}`}>
      <div className="relative w-full lf:w-[65%] min-h-[16rem] flex-grow min-h-[692px]">
        <VTImage
          className="rounded-[12px] object-cover default-radius"
          layout="fill"
          src={blok.media.filename}
          alt={blok.media.alt}
          style={{ filter: "drop-shadow(0px 2px 24px rgba(0, 0, 0, 0.04))" }}
          objectFit="contain"
          placeholder="blur"
          blurDataURL={blok.media?.filename || DEFAULT_IMAGE_LOADER}
        />
      </div>
    </div>
  );
}
