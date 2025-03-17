/* eslint-disable no-use-before-define */
import React from "react";
import Link from "next/link";
import {
  ComponentProps,
  CFCollectionDepartment,
  UseVtTranslateType,
  LocationTypeKeys
} from "../../../@types";
import VTImage from "../../shared/VTImage";
import Heading from "../../shared/Heading";
import Paragraph from "../../shared/Paragraph";
import Button from "../../shared/Button";
import EmployeeCard from "../../users/EmployeeCard";
import { Mail } from "../../../assets/icons";
import { DEFAULT_IMAGE_LOADER } from "../../../shared/pages";
import { formatURL } from "../../../shared/utils";

const LocationDepartmentCard: React.FC<
  ComponentProps<LocationDepartmentCardProps>
> = ({ department, locationSlug, useVtTranslate, router, locationType }) => {
  const { t } = useVtTranslate("location");

  const summary = (department.fields?.body?.content ?? [])
    .map((node: any) => {
      return node.content.map((el: any) => el.value).join(" ");
    })
    .join(" ");

  let description;

  if (locationType === LocationTypeKeys.PET_HOTEL) {
    description = (
      <Paragraph
        type="body_2"
        className="text-[14px] leading-[20px] text-darkBlue ml-[8px] mt-[4px] font-NotoSans line-clamp-5"
      >
        {summary}
      </Paragraph>
    );
  } else if (department?.fields?.clinicaAlpinaAnimalType) {
    description = (
      <Paragraph
        type="body_3"
        className="text-[14px] leading-[20px] text-lightBlue-pressed ml-[8px] mt-[4px] font-NotoSans"
      >
        {t(department.fields.clinicaAlpinaAnimalType as string)}
      </Paragraph>
    );
  }

  const url = department.fields.headOfDepartment
    ? `/locations/${locationSlug}/departments#${department?.fields?.name
        ?.split(" ")
        ?.join("-")}`
    : `/locations/${locationSlug}/services#${department?.fields?.name
        ?.split(" ")
        ?.join("-")}`;

  return (
    <div className="department-card-wrapper h-full">
      <div className="bg-white p-[12px] lg:p-[16px] h-full default-radius flex flex-col">
        <div className="flex-auto">
          <div className="w-full h-[201px] relative rounded-[8px] overflow-hidden">
            <VTImage
              src={formatURL(department?.fields?.image?.fields?.file?.url)}
              layout="fill"
              objectFit="cover"
              objectPosition="center"
              placeholder="blur"
              blurDataURL={
                formatURL(department?.fields?.image?.fields?.file?.url) ||
                DEFAULT_IMAGE_LOADER
              }
              alt={department?.fields?.image?.fields?.description}
            />
          </div>

          <Heading
            level="h4"
            text={department.fields.name}
            className="mt-[20px] line-clamp-2 mx-[8px]"
          />

          {department.fields.headOfDepartment ? (
            <React.Fragment>
              <EmployeeCard
                employee={department.fields.headOfDepartment}
                className="mt-[12px] mx-[8px]"
                type="LOCATION_HOME_PAGE"
              />

              <hr className="mt-[12px] bg-sand border-sand" />

              {department.fields.email && (
                <Paragraph
                  type="body_3"
                  className="text-darkBlue flex flex-row items-center mt-[12px] gap-[8px] mx-[8px]"
                >
                  <Mail />
                  <Link
                    href={`mailto:${department.fields.email}`}
                    target="_blank"
                  >
                    {department.fields.email}
                  </Link>
                </Paragraph>
              )}
            </React.Fragment>
          ) : (
            description ?? ""
          )}
        </div>
        <Button
          type="TERTIARY"
          size="sm"
          className="border-0 p-0 text-[16px] justify-start mt-[16px] h-[24px] mx-[8px] mb-[8px]"
          disabled={false}
          iconRight="ArrowRightDanger"
          focusRingClassName="xs:ring-offset-white"
          url={url}
          router={router}
        >
          {t("HOME_DEPARTMENTS_SECTION.CARD_BUTTON_LABEL")}
        </Button>
      </div>
    </div>
  );
};

interface LocationDepartmentCardProps {
  department: CFCollectionDepartment;
  locationSlug: string;
  useVtTranslate: UseVtTranslateType;
  router: any;
  locationType?: LocationTypeKeys;
}

export default LocationDepartmentCard;
