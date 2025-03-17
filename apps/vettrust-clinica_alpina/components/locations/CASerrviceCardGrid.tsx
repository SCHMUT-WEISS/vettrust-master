/* eslint-disable no-use-before-define */
import React, { useMemo } from "react";
import {
  CFCollectionDepartment,
  CfCollectionService,
  CfCollectionServiceGroup,
  ComponentProps,
  DEFAULT_IMAGE_LOADER,
  formatURL,
  Paragraph,
  RichTextRenderer,
  Section,
  StandardServiceDescription,
} from "@somethingcreative-agency/vettrust-design_system";
import { Asset } from "contentful";
import DepartmentsGrid from "./DepartmentsGrid";
import useVtTranslate from "../../shared/utils/useVtTranslate";

const CAServiceCardsGrid: React.FC<ComponentProps<ServiceCardsGridProps>> = ({
  standardServices,
  className,
  departments,
}) => {
  let standardServiceGroup: CfCollectionServiceGroup | undefined;

  if (standardServices.length > 0) {
    standardServiceGroup = standardServices[0].fields.serviceGroups.find(
      el => el.fields.isStandardServiceGroup
    );
  }

  standardServiceGroup = useMemo(
    () => standardServiceGroup || undefined,
    [standardServiceGroup]
  );

  const standardServicesNodes = useMemo(
    () =>
      standardServices
        .sort((a, b) =>
          a.fields.name.toLowerCase().localeCompare(b.fields.name.toLowerCase())
        )
        .map(service => (
          <Paragraph
            type="body_2"
            className="inline-block py-[4px] px-[12px] rounded-[6px] bg-white mr-[12px] mb-[12px]"
            key={Math.random().toString()}
          >
            {service.fields.name}
          </Paragraph>
        )),
    [standardServices]
  );

  return (
    <div className={`${className} `}>
      {standardServiceGroup && (
        <StandardServiceDescription
          image={{
            src: formatURL(
              standardServiceGroup?.fields?.image?.fields?.file?.url
            ),
            alt: standardServiceGroup?.fields?.image?.fields?.description,
            blurDataUrl:
              formatURL(
                standardServiceGroup?.fields?.image?.fields?.file?.url
              ) || DEFAULT_IMAGE_LOADER,
          }}
          className="mt-[64px] lg:mt-[96px] container-wrapper"
          contentNotWrapped
          showBgImageToTheRight
        >
          <Section
            title={{
              text: standardServiceGroup.fields.name,
              level: "h2",
              className: "",
            }}
          >
            <RichTextRenderer
              document={standardServiceGroup.fields.description}
              className="text-darkBlue"
              useVtTranslate={useVtTranslate}
            />
            <div className="mt-[16px] lg:mt-[24px]">
              {standardServicesNodes}
            </div>
          </Section>
        </StandardServiceDescription>
      )}
      <DepartmentsGrid
        departments={departments}
        className="mt-[128px] lg:mt-[192px]"
        reversed
      />
    </div>
  );
};

interface ServiceCardsGridProps {
  standardServices: CfCollectionService[];
  defaultServiceImage: Asset;
  departments: CFCollectionDepartment[];
}

export default CAServiceCardsGrid;
