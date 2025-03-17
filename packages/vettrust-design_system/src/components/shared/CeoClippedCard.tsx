import React from "react";
import { ComponentProps } from "../../@types";
import Heading from "./Heading";
import { CfCollectionEmployee } from "../../@types/content/CFCollectionEmployee";
import Paragraph from "./Paragraph";
import VTImage from "./VTImage";
import { formatURL } from "../../shared/utils/contentful/helpers";
import { DEFAULT_IMAGE_LOADER } from "../../shared/pages";

const QuoteIconDesktop = () => {
  return (
    <svg
      width="24"
      height="16"
      viewBox="0 0 21 17"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M15.648 16.808C14.4907 16.808 13.4827 16.3973 12.624 15.576C11.7653 14.7173 11.336 13.504 11.336 11.936C11.336 9.54667 12.0267 7.36267 13.408 5.384C14.8267 3.40533 17.1973 1.93067 20.52 0.959998V3.312C19.3253 3.68533 18.3173 4.13333 17.496 4.656C16.712 5.14133 16.1333 5.70133 15.76 6.336C15.3867 6.93333 15.2 7.60533 15.2 8.352C15.2 8.8 15.3307 9.17333 15.592 9.472C15.8907 9.73333 16.2453 9.976 16.656 10.2C17.0667 10.3867 17.4587 10.6107 17.832 10.872C18.2427 11.1333 18.5787 11.4693 18.84 11.88C19.1387 12.2907 19.288 12.832 19.288 13.504C19.288 14.5493 18.9333 15.3707 18.224 15.968C17.552 16.528 16.6933 16.808 15.648 16.808ZM4.448 16.808C3.29067 16.808 2.28267 16.3973 1.424 15.576C0.565333 14.7173 0.136 13.504 0.136 11.936C0.136 9.54667 0.826667 7.36267 2.208 5.384C3.62667 3.40533 5.99733 1.93067 9.32 0.959998V3.312C8.12533 3.68533 7.11733 4.13333 6.296 4.656C5.512 5.14133 4.93333 5.70133 4.56 6.336C4.18667 6.93333 4 7.60533 4 8.352C4 8.8 4.13067 9.17333 4.392 9.472C4.69067 9.73333 5.02667 9.976 5.4 10.2C5.81067 10.3867 6.22133 10.6107 6.632 10.872C7.04267 11.1333 7.37867 11.4693 7.64 11.88C7.93867 12.2907 8.088 12.832 8.088 13.504C8.088 14.5493 7.73333 15.3707 7.024 15.968C6.352 16.528 5.49333 16.808 4.448 16.808Z"
        fill="#D52F89"
      />
    </svg>
  );
};

const QuoteIconMobile = () => {
  return (
    <svg
      width="17"
      height="16"
      viewBox="0 0 21 17"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M15.648 16.808C14.4907 16.808 13.4827 16.3973 12.624 15.576C11.7653 14.7173 11.336 13.504 11.336 11.936C11.336 9.54667 12.0267 7.36267 13.408 5.384C14.8267 3.40533 17.1973 1.93067 20.52 0.959998V3.312C19.3253 3.68533 18.3173 4.13333 17.496 4.656C16.712 5.14133 16.1333 5.70133 15.76 6.336C15.3867 6.93333 15.2 7.60533 15.2 8.352C15.2 8.8 15.3307 9.17333 15.592 9.472C15.8907 9.73333 16.2453 9.976 16.656 10.2C17.0667 10.3867 17.4587 10.6107 17.832 10.872C18.2427 11.1333 18.5787 11.4693 18.84 11.88C19.1387 12.2907 19.288 12.832 19.288 13.504C19.288 14.5493 18.9333 15.3707 18.224 15.968C17.552 16.528 16.6933 16.808 15.648 16.808ZM4.448 16.808C3.29067 16.808 2.28267 16.3973 1.424 15.576C0.565333 14.7173 0.136 13.504 0.136 11.936C0.136 9.54667 0.826667 7.36267 2.208 5.384C3.62667 3.40533 5.99733 1.93067 9.32 0.959998V3.312C8.12533 3.68533 7.11733 4.13333 6.296 4.656C5.512 5.14133 4.93333 5.70133 4.56 6.336C4.18667 6.93333 4 7.60533 4 8.352C4 8.8 4.13067 9.17333 4.392 9.472C4.69067 9.73333 5.02667 9.976 5.4 10.2C5.81067 10.3867 6.22133 10.6107 6.632 10.872C7.04267 11.1333 7.37867 11.4693 7.64 11.88C7.93867 12.2907 8.088 12.832 8.088 13.504C8.088 14.5493 7.73333 15.3707 7.024 15.968C6.352 16.528 5.49333 16.808 4.448 16.808Z"
        fill="#D52F89"
      />
    </svg>
  );
};
// eslint-disable-next-line no-use-before-define
const CeoClippedCard: React.FC<ComponentProps<ClippedCardProps>> = ({
  className,
  ceoData,
  type = "DESKTOP"
}) => {
  if (type === "MOBILE") {
    return (
      <div className={`container-wrapper ${className}`}>
        <div className="bg-white rounded-[12px]">
          <div
            className="bg-magenta h-[236px] rounded-[12px]"
            style={{
              maskImage:
                "radial-gradient(87% 100% at 50% 25%, rgb(255, 255, 255) 75%, rgba(0, 0, 0, 0) 75.5%)",
              WebkitMaskImage:
                "radial-gradient(87% 100% at 50% 25%, rgb(255, 255, 255) 75%, rgba(0, 0, 0, 0) 75.5%)"
            }}
          >
            <div
              className="h-[231px] w-full bg-no-repeat bg-cover bg-center object-contain"
              style={{
                maskImage:
                  "radial-gradient(85% 100% at 50% 25%, rgb(255, 255, 255) 75%, rgba(0, 0, 0, 0) 75.5%)",
                WebkitMaskImage:
                  "radial-gradient(85% 100% at 50% 25%, rgb(255, 255, 255) 75%, rgba(0, 0, 0, 0) 75.5%)"
              }}
            >
              <img
                src={ceoData.fields.image.fields.file.url}
                alt=""
                className="w-full h-full object-cover bg-cover bg-center bg-no-repeat"
              />
            </div>
          </div>
          <div className="mt-[24px] px-[20px] pb-[20px]">
            <div className="flex flex-col gap-[12px]">
              <span className="pt-[3px]">
                <QuoteIconMobile />
              </span>
              <Paragraph type="body_1" className="text-darkBlue">
                {ceoData.fields.quote}
              </Paragraph>
            </div>
            <Heading
              text={ceoData.fields.name}
              level="h3"
              className="mt-[16px] text-[24px]"
            />
            <Paragraph
              className="mt-[4px] text-lightBlue-1.5 text-[16px]"
              type="body_1"
            >
              {ceoData.fields.jobTitle}
            </Paragraph>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`container-wrapper ${className}`}>
      <div className="flex flex-row gap-[48px] bg-white rounded-[12px]">
        <div className="">
          <div
            className="h-full w-[296px] bg-magenta rounded-[12px]"
            style={{
              maskImage:
                "radial-gradient(100% 110% at 25% 50%, rgb(255, 255, 255) 75%, rgba(0, 0, 0, 0) 75%)",
              WebkitMaskImage:
                "radial-gradient(100% 110% at 25% 50%, rgb(255, 255, 255) 75%, rgba(0, 0, 0, 0) 75%)"
            }}
          >
            <div
              className="relative w-[290px] h-full"
              style={{
                maskImage:
                  "radial-gradient(100% 110% at 25% 50%, rgb(255, 255, 255) 75%, rgba(0, 0, 0, 0) 75%)",
                WebkitMaskImage:
                  "radial-gradient(100% 110% at 25% 50%, rgb(255, 255, 255) 75%, rgba(0, 0, 0, 0) 75%)"
              }}
            >
              <VTImage
                className="object-cover rounded-l-[12px]"
                layout="fill"
                src={formatURL(ceoData?.fields?.image?.fields?.file?.url)}
                alt={ceoData?.fields?.image?.fields?.description}
                style={{
                  filter: "drop-shadow(0px 2px 24px rgba(0, 0, 0, 0.04))"
                }}
                objectFit="cover"
                placeholder="blur"
                blurDataURL={
                  formatURL(ceoData?.fields?.image?.fields?.file.url) ||
                  DEFAULT_IMAGE_LOADER
                }
              />
            </div>
          </div>
        </div>
        <div className="py-[20px] lg:py-[40px] pr-[20px] lg:pr-[40px]">
          <div className="flex flex-row gap-[8px]">
            <span className="pt-[3px]">
              <QuoteIconDesktop />
            </span>
            <Paragraph type="body_1" className="text-darkBlue">
              {ceoData.fields.quote}
            </Paragraph>
          </div>
          <Heading
            text={ceoData.fields.name}
            level="h3"
            className="mt-[24px] text-[24px] pl-[32px]"
          />
          <Paragraph
            type="body_1"
            className="mt-[4px] text-lightBlue-1.5 pl-[32px] text-[18px]"
          >
            {ceoData.fields.jobTitle}
          </Paragraph>
        </div>
      </div>
    </div>
  );
};

interface ClippedCardProps {
  className?: string;
  ceoData: CfCollectionEmployee;
  type: "DESKTOP" | "MOBILE";
}

export default CeoClippedCard;
