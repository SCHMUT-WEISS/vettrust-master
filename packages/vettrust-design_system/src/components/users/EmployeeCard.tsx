/* eslint-disable no-use-before-define */
import React from "react";
import { CfCollectionEmployee } from "../../@types/content/CFCollectionEmployee";
import { ComponentProps } from "../../@types";
import VTImage from "../shared/VTImage";
import { formatURL } from "../../shared/utils/contentful/helpers";
import Heading from "../shared/Heading";
import Paragraph from "../shared/Paragraph";
import { DEFAULT_IMAGE_LOADER } from "../../shared/pages";
import { Mail } from "../../assets";

const EmployeeCard: React.FC<ComponentProps<EmployeeCardProps>> = ({
  employee,
  className,
  type
}) => {
  if (type === "LOCATION_HOME_PAGE") {
    return (
      <div className={`flex flex-row items-center gap-[12px] ${className}`}>
        <div>
          <div className="h-[40px] w-[40px] overflow-hidden rounded-full object-cover relative">
            <VTImage
              src={formatURL(employee?.fields?.image?.fields?.file?.url)}
              layout="fill"
              className="border-solid border-[5px]"
              objectFit="cover"
              placeholder="blur"
              blurDataURL={
                formatURL(employee?.fields?.image?.fields?.file?.url) ||
                DEFAULT_IMAGE_LOADER
              }
              alt={employee?.fields?.image?.fields?.description}
            />
          </div>
        </div>
        <div className="flex flex-col">
          <span className="text-[14px] text-darkBlue">
            {employee?.fields?.name}
          </span>
          <Paragraph
            className="text-[12px] text-lightBlue-1.5 line-clamp-3"
            type="body_3"
          >
            {employee?.fields?.jobTitle}
          </Paragraph>
        </div>
      </div>
    );
  }

  if (type === "DEPARTMENT_EMPLOYEE_DEPARTMENTS_PAGE") {
    return (
      <div className={`flex flex-row items-center gap-[12px] ${className}`}>
        <div className="flex flex-col">
          <div className="h-20 w-20 border-magenta border-solid border-[2px] overflow-hidden rounded-full object-cover relative">
            <VTImage
              src={formatURL(employee?.fields?.image?.fields?.file?.url)}
              layout="fill"
              className="border-solid border-[5px]"
              objectFit="cover"
              placeholder="blur"
              blurDataURL={
                formatURL(employee?.fields?.image?.fields?.file?.url) ||
                DEFAULT_IMAGE_LOADER
              }
              alt={employee?.fields?.image?.fields?.description}
            />
          </div>
        </div>
        <div className="flex flex-col">
          <Heading
            text={employee?.fields?.name}
            level="h4"
            className="text-darkBlue"
          />

          <Paragraph type="body_3" className="text-[14px] text-lightBlue-1.5">
            {employee?.fields?.jobTitle}
          </Paragraph>

          {employee?.fields.email && (
            <span className="flex underline items-center text-darkBlue mt-2 text-sm">
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

          {employee?.fields.certificates &&
            employee.fields.certificates.length !== 0 && (
              <div className="mt-[16px] flex items-center flex-wrap gap-[8px]">
                {employee.fields.certificates.map((certificate) => (
                  <span
                    key={certificate}
                    className="text-[12px] min-w-[82px] min-h-[20px] bg-sand py-[2px] px-[8px] flex items-center justify-center rounded-[6px] whitespace-nowrap"
                  >
                    {certificate}
                  </span>
                ))}
              </div>
            )}
        </div>
      </div>
    );
  }

  return (
    <div className={`flex flex-row items-center gap-[12px] ${className}`}>
      <div>
        <div className="h-[40px] w-[40px] overflow-hidden rounded-full object-cover relative">
          <VTImage
            src={formatURL(employee?.fields?.image?.fields?.file?.url)}
            layout="fill"
            className="border-solid border-[5px]"
            objectFit="cover"
            placeholder="blur"
            blurDataURL={
              formatURL(employee?.fields?.image?.fields?.file?.url) ||
              DEFAULT_IMAGE_LOADER
            }
            alt={employee?.fields?.image?.fields?.description}
          />
        </div>
      </div>
      <div className="flex flex-col">
        <span className="text-[14px] text-darkBlue">
          {employee.fields.name}
        </span>
        <span className="text-[12px] text-lightBlue-1.5 line-clamp-3">
          {employee.fields.jobTitle}
        </span>
      </div>
    </div>
  );
};

interface EmployeeCardProps {
  employee: CfCollectionEmployee;
  type?: "DEPARTMENT_EMPLOYEE_DEPARTMENTS_PAGE" | "LOCATION_HOME_PAGE";
}

export default EmployeeCard;
