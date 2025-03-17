import React from "react";
import {
  CFCollectionDepartment,
  ComponentProps,
  DEFAULT_IMAGE_LOADER,
  formatURL,
  LocationDepartmentDescription,
  Mail,
  Paragraph,
  RichTextRenderer,
  Section,
} from "@somethingcreative-agency/vettrust-design_system";
import useVtTranslate from "../../shared/utils/useVtTranslate";

const lipsumDescription = `
Lorem ipsum dolor sit amet, consectetur adipisicing elit. Debitis eius fugiat labore placeat sapiente. Accusantium aperiam cumque dolor incidunt ipsa maxime necessitatibus pariatur repudiandae totam. Asperiores consequuntur eius recusandae veritatis?
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad atque corporis cumque delectus est hic maiores, minima molestiae nam nobis quam quibusdam quod quos repudiandae sit? A autem laudantium qui.
`;

const DepartmentsGrid: React.FC<
  ComponentProps<{
    departments: CFCollectionDepartment[];
    reversed?: boolean;
  }>
> = ({ departments, className, reversed }) => {
  return (
    <div className={className}>
      {departments &&
        departments?.length > 0 &&
        departments.map((department, index) => (
          <LocationDepartmentDescription
            image={{
              src: formatURL(department?.fields?.image?.fields?.file?.url),
              alt: department?.fields?.image?.fields?.description,
              blurDataUrl:
                formatURL(department?.fields?.image?.fields?.file?.url) ||
                DEFAULT_IMAGE_LOADER,
            }}
            reversed={reversed ? index % 2 === 0 : index % 2 !== 0}
            key={department.sys.id}
            showBgImageToTheRight={index % 2 === 0}
            scrollAnchorId={department?.fields?.name?.split(" ")?.join("-")}
            className="mb-[96px] lg:mb-[192px]"
            hideBgImage
          >
            <div className="h-full flex flex-col justify-center">
              <Section title={{ text: department.fields.name, level: "h2" }}>
                <Paragraph type="body_1">
                  {department.fields.body ? (
                    <RichTextRenderer
                      document={department.fields.body}
                      paragraphType="body_1"
                      useVtTranslate={useVtTranslate}
                    />
                  ) : (
                    lipsumDescription
                  )}
                </Paragraph>

                {department.fields.email && (
                  <div className="flex items-center gap-[9.33px] mt-[16px]">
                    <Mail />
                    <span className="underline">{department.fields.email}</span>
                  </div>
                )}
              </Section>
            </div>
          </LocationDepartmentDescription>
        ))}
    </div>
  );
};
export default DepartmentsGrid;
