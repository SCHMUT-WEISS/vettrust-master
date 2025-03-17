/* eslint-disable sonarjs/cognitive-complexity,indent */
import React from "react";
import { ComponentProps } from "../../@types";
import VTImage from "./VTImage";
import { formatURL } from "../../shared/utils/contentful/helpers";
import { CfCollectionBlogArticleAuthor } from "../../@types/content/CfCollectionBlogArticleAuthor";
import Paragraph from "./Paragraph";
import { DEFAULT_IMAGE_LOADER } from "../../shared/pages";

const QuoteIcon = () => (
  <svg
    width="24"
    height="25"
    viewBox="0 0 24 25"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M16.4803 18.7419C15.5419 18.7419 14.7246 18.4066 14.0284 17.7359C13.3321 17.0347 12.984 16.0439 12.984 14.7635C12.984 12.8125 13.544 11.0291 14.664 9.41332C15.8143 7.79759 17.7365 6.59341 20.4306 5.80078V7.72137C19.4619 8.02623 18.6446 8.39206 17.9787 8.81886C17.343 9.21517 16.8738 9.67245 16.5711 10.1907C16.2684 10.6785 16.117 11.2272 16.117 11.8369C16.117 12.2028 16.223 12.5076 16.4349 12.7515C16.677 12.9649 16.9646 13.1631 17.2976 13.346C17.6306 13.4984 17.9484 13.6813 18.2511 13.8947C18.5841 14.1081 18.8565 14.3825 19.0684 14.7178C19.3106 15.0532 19.4317 15.4952 19.4317 16.0439C19.4317 16.8975 19.1441 17.5682 18.569 18.056C18.0241 18.5133 17.3279 18.7419 16.4803 18.7419ZM7.39909 18.7419C6.4607 18.7419 5.64339 18.4066 4.94717 17.7359C4.25094 17.0347 3.90283 16.0439 3.90283 14.7635C3.90283 12.8125 4.46284 11.0291 5.58285 9.41332C6.73314 7.79759 8.65532 6.59341 11.3494 5.80078V7.72137C10.3808 8.02623 9.56344 8.39206 8.89749 8.81886C8.26181 9.21517 7.79261 9.67245 7.4899 10.1907C7.1872 10.6785 7.03584 11.2272 7.03584 11.8369C7.03584 12.2028 7.14179 12.5076 7.35369 12.7515C7.59585 12.9649 7.86829 13.1631 8.17099 13.346C8.50397 13.4984 8.83695 13.6813 9.16993 13.8947C9.5029 14.1081 9.77534 14.3825 9.98723 14.7178C10.2294 15.0532 10.3505 15.4952 10.3505 16.0439C10.3505 16.8975 10.0629 17.5682 9.48777 18.056C8.9429 18.5133 8.24667 18.7419 7.39909 18.7419Z"
      fill="#D52F89"
    />
  </svg>
);

const BecomeAVetQuoteIcon = () => (
  <svg
    width={34}
    height={34}
    viewBox="0 0 34 34"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M22.8724 25.8403C21.5586 25.8403 20.4144 25.3708 19.4397 24.4318C18.4649 23.4502 17.9776 22.0631 17.9776 20.2705C17.9776 17.539 18.7616 15.0422 20.3296 12.7802C21.94 10.5182 24.6311 8.83233 28.4028 7.72266V10.4115C27.0467 10.8383 25.9024 11.3504 24.9701 11.948C24.0802 12.5028 23.4233 13.143 22.9995 13.8686C22.5757 14.5514 22.3638 15.3197 22.3638 16.1733C22.3638 16.6854 22.5121 17.1122 22.8088 17.4537C23.1478 17.7524 23.5504 18.0298 24.0166 18.2859C24.4828 18.4993 24.9277 18.7554 25.3515 19.0542C25.8177 19.3529 26.1991 19.737 26.4958 20.2065C26.8348 20.676 27.0043 21.2948 27.0043 22.0631C27.0043 23.2581 26.6017 24.1971 25.7965 24.88C25.0337 25.5202 24.059 25.8403 22.8724 25.8403ZM10.1587 25.8403C8.84493 25.8403 7.7007 25.3708 6.72599 24.4318C5.75127 23.4502 5.26392 22.0631 5.26392 20.2705C5.26392 17.539 6.04793 15.0422 7.61595 12.7802C9.22634 10.5182 11.9174 8.83233 15.6891 7.72266V10.4115C14.333 10.8383 13.1888 11.3504 12.2564 11.948C11.3665 12.5028 10.7096 13.143 10.2858 13.8686C9.86203 14.5514 9.65013 15.3197 9.65013 16.1733C9.65013 16.6854 9.79846 17.1122 10.0951 17.4537C10.4341 17.7524 10.8156 18.0298 11.2393 18.2859C11.7055 18.4993 12.1717 18.7554 12.6378 19.0542C13.104 19.3529 13.4854 19.737 13.7821 20.2065C14.1211 20.676 14.2906 21.2948 14.2906 22.0631C14.2906 23.2581 13.888 24.1971 13.0828 24.88C12.32 25.5202 11.3453 25.8403 10.1587 25.8403Z"
      fill="#D52F89"
    />
  </svg>
);

// eslint-disable-next-line no-use-before-define
const Avatar: React.FC<ComponentProps<UserCardProps>> = ({
  author,
  type,
  date,
  className
}) => {
  const displayedDate = date
    ? new Date(date).toJSON().slice(0, 10).split("-").reverse().join(".")
    : "...";

  if (type === "AUTHOR_DISPLAY") {
    return (
      <div className={`flex flex-row gap-[12px] ${className}`}>
        <div className="h-[40px] w-[40px] border-magenta border-solid border-[2px] overflow-hidden rounded-full object-cover relative">
          <VTImage
            src={formatURL(author?.fields?.image?.fields?.file?.url)}
            layout="fill"
            className="border-solid border-[5px]"
            objectFit="cover"
            placeholder="blur"
            blurDataURL={
              formatURL(author?.fields?.image?.fields?.file?.url) ||
              DEFAULT_IMAGE_LOADER
            }
            alt={author?.fields?.image?.fields?.description}
          />
        </div>
        <div className="flex flex-col">
          <span className="text-[14px] text-darkBlue">
            {author?.fields?.name}
          </span>
          <span className="text-[12px] text-lightBlue-1.5">
            {displayedDate}
          </span>
        </div>
      </div>
    );
  }

  if (type === "HERO_AUTHOR_DISPLAY") {
    return (
      <div className={`flex flex-row items-center gap-[12px] ${className}`}>
        <div className="h-[40px] lg:h-[48px] w-[40px] lg:w-[48px] border-magenta border-solid border-[2px] overflow-hidden rounded-full object-cover relative">
          <VTImage
            src={formatURL(author?.fields?.image?.fields?.file?.url)}
            layout="fill"
            className="border-solid border-[5px]"
            objectFit="cover"
            placeholder="blur"
            blurDataURL={
              formatURL(author?.fields?.image?.fields?.file?.url) ||
              DEFAULT_IMAGE_LOADER
            }
            alt={author?.fields?.image?.fields?.description}
          />
        </div>
        <div className="flex flex-col justify-center">
          <Paragraph
            type="body_2"
            className="text-[14px] lg:text-[16px] text-darkBlue"
          >
            {author?.fields?.name}
          </Paragraph>
          <Paragraph
            type="body_2"
            className=" text-lightBlue-1.5 text-[14px] lg:text-[16px] leading-[20px] lg:leading-[24px]"
          >
            {displayedDate}
          </Paragraph>
        </div>
      </div>
    );
  }

  if (type === "BLOG_AUTHOR_DISPLAY") {
    return (
      <div className={`flex flex-row items-center gap-[12px] ${className}`}>
        <div className="h-[40px] w-[40px] border-magenta border-solid border-[2px] overflow-hidden rounded-full object-cover relative">
          <VTImage
            src={formatURL(author?.fields?.image?.fields?.file?.url)}
            layout="fill"
            className="border-solid border-[5px]"
            objectFit="cover"
            placeholder="blur"
            blurDataURL={
              formatURL(author?.fields?.image?.fields?.file?.url) ||
              DEFAULT_IMAGE_LOADER
            }
            alt={author?.fields?.image?.fields?.description}
          />
        </div>
        <div className="flex flex-col justify-center">
          <Paragraph
            type="body_2"
            className="text-[12px] leading-[20px] text-darkBlue"
          >
            {author.fields.name}
          </Paragraph>
          <Paragraph
            type="body_2"
            className=" text-lightBlue-1.5 text-[12px] leading-[20px] "
          >
            {displayedDate}
          </Paragraph>
        </div>
      </div>
    );
  }

  if (type === "TESTIMONIAL_DISPLAY") {
    return (
      <div className={`relative flex flex-col items-center ${className}`}>
        <div
          className="relative w-[120px] h-[120px]"
          style={{
            clipPath: "circle(50% at 50% 50%)"
          }}
        >
          <div className="absolute w-[120px] h-[120px] border-magenta border-[4px] rounded-full">
            <VTImage
              src={formatURL(author?.fields?.image?.fields?.file?.url)}
              layout="fill"
              className="border-solid border-[4px] rounded-full w-[120px] h-[120px] "
              objectFit="cover"
              placeholder="blur"
              blurDataURL={
                formatURL(author?.fields?.image?.fields?.file?.url) ||
                DEFAULT_IMAGE_LOADER
              }
              alt={author?.fields?.image?.fields?.description}
            />
            <div className="w-[45px] h-[45px] flex flex-row justify-center  border-magenta border-[4px] rounded-full absolute bottom-[-26px] absolute-center-X bg-white">
              <QuoteIcon />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (type === "BECOME_VET_TESTIMONIAL_DISPLAY") {
    return (
      <div className={`relative flex flex-col items-center ${className}`}>
        <div
          className="relative w-[168px] h-[168px]"
          style={{
            clipPath: "circle(50% at 50% 50%)"
          }}
        >
          <div className="absolute w-[168px] h-[168px] border-magenta border-[4px] rounded-full">
            <VTImage
              src={formatURL(author?.fields?.image?.fields?.file?.url)}
              layout="fill"
              className="border-solid border-[4px] rounded-full w-[120px] h-[120px] "
              objectFit="cover"
              placeholder="blur"
              blurDataURL={
                formatURL(author?.fields?.image?.fields?.file?.url) ||
                DEFAULT_IMAGE_LOADER
              }
              alt={author?.fields?.image?.fields?.description}
            />
            <div className="w-[62px] h-[62px] flex flex-row justify-center  border-magenta border-[4px] rounded-full absolute bottom-[-35px] absolute-center-X bg-white">
              <BecomeAVetQuoteIcon />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`h-[16px] w-[16px] border-magenta  overflow-hidden rounded-full object-cover relative border-solid border-[2px] ${className}`}
    >
      <VTImage
        src={formatURL(author?.fields?.image?.fields?.file?.url)}
        layout="fill"
        className="border-solid border-[5px]"
        objectFit="cover"
        placeholder="blur"
        blurDataURL={
          formatURL(author?.fields?.image?.fields?.file?.url) ||
          DEFAULT_IMAGE_LOADER
        }
        alt={author?.fields?.image?.fields?.description}
      />
    </div>
  );
};

interface UserCardProps {
  author: CfCollectionBlogArticleAuthor;
  type:
    | "AUTHOR_DISPLAY"
    | "EMPLOYEE_DISPLAY"
    | "TESTIMONIAL_DISPLAY"
    | "BECOME_VET_TESTIMONIAL_DISPLAY"
    | "HERO_AUTHOR_DISPLAY"
    | "BLOG_AUTHOR_DISPLAY";
  date?: number;
}

export default Avatar;
