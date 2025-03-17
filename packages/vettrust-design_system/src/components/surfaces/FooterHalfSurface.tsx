/*
  Surface component but this time tight to the footer
*/

import { Asset } from "contentful";
import React from "react";
import { ComponentProps } from "../../@types";
import { DEFAULT_IMAGE_LOADER } from "../../shared/pages";
import { formatURL } from "../../shared/utils";
import BottomFooterContainer from "../BottomFooterContainer";
import { Section, VTImage } from "../shared";

const FooterHalfSurface: React.FC<ComponentProps<FooterHalfSurfaceProps>> = ({
  children,
  title,
  image,
  reverse,
}) => {
  return (
    <BottomFooterContainer>
      <div className="bg-white grid lg:grid-cols-2 gap-[40px] lg:gap-[64px] default-radius p-[20px] lg:p-[40px] mt-[48px] lg:mt-[112px]">
        <div className={`h-full overflow-hidden rounded-[8px] object-cover relative ${reverse && "order-last"}`}>
          <VTImage
            src={formatURL(image?.fields?.file?.url)}
            layout="fill"
            objectFit="cover"
            objectPosition="center"
            placeholder="blur"
            blurDataURL={
              formatURL(image?.fields?.file?.url) ||
                DEFAULT_IMAGE_LOADER
            }
            alt={image?.fields?.description}
          />
        </div>
        <Section
          title={{
            className: "",
            level: "h2",
            text: title,
          }}
        >
          {children}
        </Section>
      </div>
    </BottomFooterContainer>
  );
};

interface FooterHalfSurfaceProps {
    reverse?: boolean;
    title: JSX.Element;
    image: Asset;
}

export default FooterHalfSurface;
