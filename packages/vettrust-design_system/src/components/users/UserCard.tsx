/* eslint-disable no-use-before-define,sonarjs/cognitive-complexity */
import React from "react";
import VTImage from "../shared/VTImage";
import Heading from "../shared/Heading";
import { Mail, PhoneCall, PhonePlus } from "../../assets/icons";
import { ComponentProps } from "../../@types";
import { CfCollectionEmployee } from "../../@types/content/CFCollectionEmployee";
import { formatURL } from "../../shared/utils/contentful/helpers";
import Paragraph from "../shared/Paragraph";
import { DEFAULT_IMAGE_LOADER } from "../../shared/pages";

const QuoteDisplayIcon = () => (
  <svg
    width={24}
    height={24}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M16.4368 18.217C15.4716 18.217 14.631 17.8745 13.9148 17.1896C13.1987 16.4734 12.8407 15.4615 12.8407 14.1538C12.8407 12.1612 13.4167 10.3397 14.5687 8.68956C15.7518 7.03938 17.7289 5.80952 20.5 5V6.96154C19.5037 7.27289 18.663 7.64652 17.978 8.08242C17.3242 8.48718 16.8416 8.95421 16.5302 9.48352C16.2189 9.98168 16.0632 10.5421 16.0632 11.1648C16.0632 11.5385 16.1722 11.8498 16.3901 12.0989C16.6392 12.3168 16.935 12.5192 17.2775 12.706C17.62 12.8617 17.9469 13.0485 18.2582 13.2665C18.6007 13.4844 18.881 13.7647 19.0989 14.1071C19.348 14.4496 19.4725 14.9011 19.4725 15.4615C19.4725 16.3333 19.1767 17.0183 18.5852 17.5165C18.0247 17.9835 17.3086 18.217 16.4368 18.217ZM7.09615 18.217C6.13095 18.217 5.29029 17.8745 4.57418 17.1896C3.85806 16.4734 3.5 15.4615 3.5 14.1538C3.5 12.1612 4.07601 10.3397 5.22802 8.68956C6.41117 7.03938 8.38828 5.80952 11.1593 5V6.96154C10.163 7.27289 9.32234 7.64652 8.63736 8.08242C7.98352 8.48718 7.50092 8.95421 7.18956 9.48352C6.8782 9.98168 6.72253 10.5421 6.72253 11.1648C6.72253 11.5385 6.8315 11.8498 7.04945 12.0989C7.29853 12.3168 7.57875 12.5192 7.89011 12.706C8.2326 12.8617 8.57509 13.0485 8.91758 13.2665C9.26007 13.4844 9.54029 13.7647 9.75824 14.1071C10.0073 14.4496 10.1319 14.9011 10.1319 15.4615C10.1319 16.3333 9.83608 17.0183 9.24451 17.5165C8.68407 17.9835 7.96795 18.217 7.09615 18.217Z"
      fill="#D52F89"
    />
  </svg>
);

const UserCard: React.FC<ComponentProps<UserCardProps>> = ({
  className,
  type = "FULL",
  employee
}) => {
  if (type === "LOCATION_HOME_TEAM_SECTION_DISPLAY") {
    return (
      <div
        className={`bg-white p-[20px] lg:p-[24px] gap-[16px] default-radius flex flex-col lg:flex-row items-center ${className}`}
      >
        <div>
          <div className="h-[120px] w-[120px] border-magenta overflow-hidden rounded-full object-cover relative border-solid border-[5px]">
            <VTImage
              src={formatURL(employee?.fields?.image?.fields?.file?.url)}
              layout="fill"
              className="border-solid border-[5px] object-contain h-[120px] w-[120px]  "
              objectFit="contain"
              placeholder="blur"
              blurDataURL={
                formatURL(employee?.fields?.image?.fields?.file?.url) ||
                DEFAULT_IMAGE_LOADER
              }
              alt={employee?.fields?.image?.fields?.description}
            />
          </div>
        </div>
        <div className="">
          <Heading
            text={employee.fields.name}
            level="h3"
            className="text-center lg:text-left hidden lg:block"
          />
          <Heading
            text={employee.fields.name}
            level="h4"
            className="text-center lg:text-left lg:hidden"
          />
          <Paragraph
            type="body_2"
            className="text-lightBlue-1.5 mt-[4px] hidden lg:block text-center lg:text-left"
          >
            {employee.fields.jobTitle || ""}
          </Paragraph>
          <Paragraph
            type="body_3"
            className="text-lightBlue-1.5 mt-[4px] lg:hidden text-center lg:text-left"
          >
            {employee.fields.jobTitle || ""}
          </Paragraph>
          <div className="flex flex-row gap-[8px] leading-[24px] mt-[16px] lg:mt-[8px] items-center">
            {employee.fields.email && (
              <span className="flex underline items-center justify-center text-darkBlue">
                <Mail className="mr-2 w-4 h-4" />{" "}
                <a
                  href={`mailto:${employee.fields.email}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  {employee.fields.email}
                </a>
              </span>
            )}

            {employee.fields.quote && (
              <React.Fragment>
                <span>
                  <QuoteDisplayIcon />
                </span>
                <Paragraph type="body_2" className="">
                  {employee.fields.quote}
                </Paragraph>
              </React.Fragment>
            )}
          </div>
        </div>
      </div>
    );
  }

  if (type === "QUOTE_DISPLAY") {
    return (
      <div
        className={`bg-white p-[20px] lg:p-[24px] gap-[16px] default-radius flex flex-col lg:flex-row items-center ${className}`}
      >
        <div>
          <div className="h-[120px] w-[120px] border-magenta overflow-hidden rounded-full object-cover relative border-solid border-[5px]">
            <VTImage
              src={formatURL(employee?.fields?.image?.fields?.file?.url)}
              layout="fill"
              className="border-solid border-[5px] object-contain h-[120px] w-[120px]  "
              objectFit="contain"
              placeholder="blur"
              blurDataURL={
                formatURL(employee?.fields?.image?.fields?.file?.url) ||
                DEFAULT_IMAGE_LOADER
              }
              alt={employee?.fields?.image?.fields?.description}
            />
          </div>
        </div>
        <div className="">
          <Heading
            text={employee.fields.name}
            level="h4"
            className="text-center lg:text-left"
          />
          <Paragraph
            type="body_2"
            className="text-lightBlue-1.5 mt-[4px] hidden lg:block text-center lg:text-left"
          >
            {employee.fields.jobTitle || ""}
          </Paragraph>
          <Paragraph
            type="body_3"
            className="text-lightBlue-1.5 mt-[4px] lg:hidden text-center lg:text-left"
          >
            {employee.fields.jobTitle || ""}
          </Paragraph>
          <div className="flex flex-row gap-[8px] leading-[24px] mt-[16px] lg:mt-[8px]">
            {employee.fields.quote && (
              <React.Fragment>
                <span>
                  <QuoteDisplayIcon />
                </span>
                <Paragraph type="body_2" className="">
                  {employee.fields.quote}
                </Paragraph>
              </React.Fragment>
            )}
          </div>
        </div>
      </div>
    );
  }

  if (type === "BECOME_A_VET_FLEX") {
    return (
      <div
        className={`bg-white text-center rounded-[12px] flex flex-col items-center justify-center ${className}`}
        key={Math.random().toString()}
      >
        <div className="h-[120px] lg:h-[104px] w-[120px] lg:w-[104px] border-magenta border-solid border-[5px] overflow-hidden rounded-full object-cover relative">
          <VTImage
            src={formatURL(employee?.fields?.image?.fields?.file?.url)}
            layout="fill"
            objectFit="cover"
            placeholder="blur"
            blurDataURL={
              formatURL(employee?.fields?.image?.fields?.file?.url) ||
              DEFAULT_IMAGE_LOADER
            }
            alt={employee?.fields?.image?.fields?.description}
          />
        </div>
        <Heading
          text={employee.fields.name}
          level="h3"
          className="mt-[16px] hidden lg:block"
        />
        <Heading
          text={employee.fields.name}
          level="h4"
          className="mt-[16px] lg:hidden"
        />
        <div className="mt-[4px] text-lightBlue-1.5 text-[14px] w-[70%] md:w-[40%] lg:w-[50%] md:text-[16px] block ">
          {employee.fields.jobTitle}
        </div>
        <div className="text-[14px] md:text-[16px] flex flex-col md:flex-row justify-center gap-[8px] mt-[16px] ">
          {employee.fields.phoneNumber && (
            <span className="flex underline items-center justify-center text-darkBlue">
              <PhoneCall className="mr-2 w-[16px] h-[16px]" />{" "}
              <a href={`tel:${employee.fields.phoneNumber}`}>
                {employee.fields.phoneNumber}
              </a>
            </span>
          )}
          {employee.fields.email && (
            <span className="flex underline items-center justify-center text-darkBlue">
              <Mail className="mr-2 w-[16px] h-[16px]" />{" "}
              <a href={`mailto:${employee.fields.email}`}>
                {employee.fields.email}
              </a>
            </span>
          )}
        </div>
      </div>
    );
  }

  if (type === "FLEX") {
    return (
      <div
        className={`bg-white text-center rounded-[12px] flex flex-col items-center justify-center ${className}`}
        key={Math.random().toString()}
      >
        <div className="h-[120px] w-[120px] border-magenta border-solid border-[5px] overflow-hidden rounded-full object-cover relative">
          <VTImage
            src={formatURL(employee?.fields?.image?.fields?.file?.url)}
            layout="fill"
            objectFit="cover"
            placeholder="blur"
            blurDataURL={
              formatURL(employee?.fields?.image?.fields?.file?.url) ||
              DEFAULT_IMAGE_LOADER
            }
            alt={employee?.fields?.image?.fields?.description}
          />
        </div>
        <Heading
          text={employee.fields.name}
          level="h3"
          className="mt-[16px] hidden lg:block"
        />
        <Heading
          text={employee.fields.name}
          level="h4"
          className="mt-[16px] lg:hidden"
        />
        <div className="mt-[4px] text-lightBlue-1.5 text-[14px] md:text-[16px] block ">
          {employee.fields.jobTitle}
        </div>
        <div className="text-[14px] md:text-[16px] flex flex-row justify-center gap-[8px] mt-[16px] text-darkBlue">
          {employee.fields.phoneNumber && (
            <span className="flex underline items-center">
              <PhoneCall className="mr-2 w-[16px] h-[16px]" />{" "}
              <a href={`tel:${employee.fields.phoneNumber}`}>
                {employee.fields.phoneNumber}
              </a>
            </span>
          )}
          {employee.fields.email && (
            <span className="flex underline items-center">
              <Mail className="mr-2 w-[16px] h-[16px]" />{" "}
              <a href={`mailto:${employee.fields.email}`}>
                {employee.fields.email}
              </a>
            </span>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="management-carousel-wrapper h-full">
      <div
        className={`bg-white  text-center rounded-[12px] p-[24px] flex flex-col items-center h-full ${className}`}
        key={Math.random().toString()}
      >
        <div className="h-[120px] w-[120px] border-magenta  overflow-hidden rounded-full object-cover relative border-solid border-[5px]">
          <VTImage
            src={formatURL(employee?.fields?.image?.fields?.file?.url)}
            layout="fill"
            className="border-solid border-[5px]"
            objectFit="cover"
            placeholder="blur"
            blurDataURL={
              formatURL(employee.fields?.image?.fields?.file?.url) ||
              DEFAULT_IMAGE_LOADER
            }
            alt={employee?.fields?.image?.fields?.description}
          />
        </div>
        <Heading
          text={employee.fields.name}
          level="h3"
          className="mt-[16px] lg:mt-[24px] hidden lg:block"
        />
        <Heading
          text={employee.fields.name}
          level="h4"
          className="mt-[16px] lg:mt-[24px] lg:hidden"
        />
        <div className="mt-[4px] text-lightBlue-1.5 text-[14px] md:text-[16px] block">
          {employee.fields.jobTitle}
        </div>
        {employee.fields.phoneNumber && (
          <div className="mt-[4px] text-[14px] md:text-[16px] flex flex-row justify-center gap-[8px] mt-[16px]">
            <PhonePlus />{" "}
            <a href={`tel:${employee.fields.phoneNumber}`}>
              {employee.fields.phoneNumber}
            </a>
          </div>
        )}
        {employee.fields.email && (
          <div className="mt-[4px] text-[14px] md:text-[16px] flex flex-row justify-center gap-[8px] mt-[12px]">
            <Mail />{" "}
            <a href={`mailto:${employee.fields.email}`}>
              {employee.fields.email}
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

interface UserCardProps {
  type?:
    | "FULL"
    | "FLEX"
    | "BECOME_A_VET_FLEX"
    | "QUOTE_DISPLAY"
    | "LOCATION_HOME_TEAM_SECTION_DISPLAY";
  employee: CfCollectionEmployee;
}

export default UserCard;
