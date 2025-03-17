/* eslint-disable no-use-before-define */
import React, { useEffect, useState } from "react";
import { Rating } from "@mui/material";
import TimeAgo from "javascript-time-ago";
import de from "javascript-time-ago/locale/de";
import en from "javascript-time-ago/locale/en-CA";
import fr from "javascript-time-ago/locale/fr-CA";
import { ComponentProps, UseVtTranslateType, VTRating } from "../../@types";
import Paragraph from "../shared/Paragraph";
import Heading from "../shared/Heading";

const RatingIcon = () => {
  return (
    <svg
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="mr-[12px]"
    >
      <path
        d="M15.9998 2.66602L20.1198 11.0127L29.3332 12.3593L22.6665 18.8527L24.2398 28.026L15.9998 23.6927L7.75984 28.026L9.33317 18.8527L2.6665 12.3593L11.8798 11.0127L15.9998 2.66602Z"
        stroke="#D3A05C"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

const RatingFilledIcon = () => {
  return (
    <svg
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="mr-[12px]"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M15.9999 1.66602C16.3805 1.66602 16.7281 1.88209 16.8966 2.22339L20.7841 10.0991L29.4778 11.3699C29.8544 11.4249 30.1671 11.6889 30.2844 12.0509C30.4018 12.4129 30.3036 12.8102 30.0309 13.0757L23.7411 19.202L25.2255 27.857C25.2898 28.2322 25.1356 28.6113 24.8276 28.8351C24.5196 29.0588 24.1113 29.0883 23.7744 28.9111L15.9999 24.8225L8.22532 28.9111C7.8884 29.0883 7.48011 29.0588 7.17213 28.8351C6.86415 28.6113 6.70991 28.2322 6.77426 27.857L8.25868 19.202L1.9688 13.0757C1.69618 12.8102 1.59791 12.4129 1.71529 12.0509C1.83266 11.6889 2.14534 11.4249 2.5219 11.3699L11.2156 10.0991L15.1032 2.22339C15.2716 1.88209 15.6192 1.66602 15.9999 1.66602Z"
        fill="#D3A05C"
      />
    </svg>
  );
};

const RatingCard: React.FC<ComponentProps<RatingCardProps>> = ({
  className,
  rating,
  useVtTranslate
}) => {
  const { i18n } = useVtTranslate();
  const getLocale = () => {
    if (i18n.language === "en") {
      return "en-CA";
    }

    if (i18n.language === "fr") {
      return "fr-CA";
    }

    return "de";
  };

  const [timeAgo, setTimeAgo] = useState<TimeAgo>();

  useEffect(() => {
    if ((TimeAgo as any).getDefaultLocale() !== "de") {
      TimeAgo.addDefaultLocale(de);
    }

    TimeAgo.addLocale(en);
    TimeAgo.addLocale(fr);

    if(!timeAgo) {
      setTimeAgo(new TimeAgo(getLocale()));
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getLocale]);
  

  return (
    <div className={`rating-card-wrapper h-full ${className}`}>
      <div
        className="bg-white p-[20px] lg:p-[24px] default-radius h-full flex flex-col gap-[16px]"
        style={{
          boxShadow:
            "0px 2px 8px rgba(208, 145, 29, 0.02), 0px 12px 32px rgba(208, 145, 29, 0.12)"
        }}
      >
        <div className="flex-auto">
          <Rating
            value={rating.NetScore / 2}
            icon={<RatingFilledIcon />}
            emptyIcon={<RatingIcon />}
            disabled
            sx={{
              marginBottom: "8px"
            }}
          />
          <Paragraph
            type="body_1"
            className="line-clamp-4 [display:none_!important] lg:[display:-webkit-box_!important] text-darkBlue"
          >
            {rating.TestimonialText}
          </Paragraph>
          <Paragraph
            type="body_2"
            className="line-clamp-6 lg:hidden text-darkBlue"
          >
            {rating.TestimonialText}
          </Paragraph>
        </div>
        <div>
          <Heading text={rating.TestimonialFrom} level="h4" />
          <Paragraph type="body_3" className="text-lightBlue-pressed mt-[4px]">
            {timeAgo?.format(
              new Date(Number(rating.TestimonialDate.replace(/\D/g, "")))
            )}
          </Paragraph>
        </div>
      </div>
    </div>
  );
};

interface RatingCardProps {
  rating: VTRating;
  useVtTranslate: UseVtTranslateType;
}

export default RatingCard;
