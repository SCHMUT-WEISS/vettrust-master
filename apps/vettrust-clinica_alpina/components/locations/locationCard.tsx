import React from "react";
import {
  CFCollectionLocation,
  ComponentProps,
  VTImage,
  formatURL,
  DEFAULT_IMAGE_LOADER,
  Heading,
  Button,
  Paragraph,
  getRichTextSummary,
} from "@somethingcreative-agency/vettrust-design_system";
import { useRouter } from "next/router";
import useVtTranslate from "../../shared/utils/useVtTranslate";

const LocationCard: React.FC<
  ComponentProps<{
    location: CFCollectionLocation;
  }>
> = ({ location }) => {
  const router = useRouter();
  const { t } = useVtTranslate("location");

  return (
    <div className="flex flex-col">
      <div className="flex-auto">
        <div className="h-[171px] lg:h-[204px] overflow-hidden rounded-[8px] object-cover relative ">
          <VTImage
            src={formatURL(location?.fields?.heroImages[0]?.fields?.file?.url)}
            layout="fill"
            objectFit="cover"
            objectPosition="center"
            placeholder="blur"
            blurDataURL={
              formatURL(location?.fields?.heroImages[0]?.fields?.file?.url) ||
              DEFAULT_IMAGE_LOADER
            }
            alt={location?.fields?.heroImages[0]?.fields?.description}
          />
        </div>
        <Heading
          level="h3"
          className="mt-[24px]"
          text={location?.fields?.name}
        />
        <Paragraph
          type="body_1"
          className="text-darkBlue line-clamp-5 mt-[8px] text-darkBlue font-notoSans"
        >
          {getRichTextSummary(location?.fields?.welcomeMessage)}
        </Paragraph>
      </div>
      <Button
        type="PRIMARY"
        size="lg"
        className="mt-[24px]"
        disabled={false}
        iconRight="ArrowRight"
        url={`/locations/${location.fields.slug}`}
        focusRingClassName="xs:ring-offset-white"
        router={router}
      >
        {t("RELATED_LOCATIONS.CHECKOUT_BUTTON")}
      </Button>
    </div>
  );
};

export default LocationCard;
