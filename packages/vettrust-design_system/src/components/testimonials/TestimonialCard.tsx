/* eslint-disable no-use-before-define */
import React from "react";
import { ComponentProps } from "../../@types";
import { CfCollectionBlogArticleAuthor } from "../../@types/content/CfCollectionBlogArticleAuthor";
import { CfCollectionTestimonial } from "../../@types/content/CFCollectionTestimonial";
import Avatar from "../shared/Avatar";
import Paragraph from "../shared/Paragraph";
import Heading from "../shared/Heading";

const TestimonialCard: React.FC<ComponentProps<TestimonialCardProps>> = ({
  testimonial,
  className,
  type
}) => {
  if (type === "BECOME_A_VET_DISPLAY") {
    return (
      <div className={`testimonial-card-wrapper h-full ${className || ""}`}>
        <div
          className={`bg-white rounded-[12px]  p-[20px] lg:p-[24px] h-full flex flex-col gap-[16px] `}
        >
          <Avatar
            author={
              {
                fields: {
                  image: testimonial.fields.authorImage,
                  name: testimonial.fields.authorName
                }
              } as CfCollectionBlogArticleAuthor
            }
            type="BECOME_VET_TESTIMONIAL_DISPLAY"
            className=""
          />
          <div className="flex-auto flex flex-col justify-between">
            <Paragraph type="body_1" className="hidden lg:block text-center">
              {testimonial.fields.testimony}
            </Paragraph>
            <Paragraph type="body_2" className="lg:hidden">
              {testimonial.fields.testimony}
            </Paragraph>
            <div className="text-center mt-[16px]">
              <Heading
                text={testimonial.fields.authorName}
                level="h3"
                className="text-[24px]"
              />
              <Paragraph
                type="body_2"
                className="mt-[4px] text-lightBlue-1.5 text-[16px]"
              >
                {testimonial.fields.authorRole}
              </Paragraph>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`testimonial-card-wrapper h-full ${className || ""}`}>
      <div
        className={`bg-white rounded-[12px]  p-[20px] lg:p-[24px] h-full flex flex-col gap-[16px] `}
      >
        <Avatar
          author={
            {
              fields: {
                image: testimonial.fields.authorImage,
                name: testimonial.fields.authorName
              }
            } as CfCollectionBlogArticleAuthor
          }
          type="TESTIMONIAL_DISPLAY"
          className=""
        />
        <div className="flex-auto flex flex-col justify-between">
          <Paragraph type="body_1" className="hidden lg:block text-darkBlue">
            {testimonial.fields.testimony}
          </Paragraph>
          <Paragraph type="body_2" className="lg:hidden text-darkBlue">
            {testimonial.fields.testimony}
          </Paragraph>
          <div className="text-center mt-[16px]">
            <Heading
              text={testimonial.fields.authorName}
              level="h4"
              className=""
            />
            <Paragraph type="body_3" className="mt-[4px] text-lightBlue-1.5">
              {testimonial.fields.authorRole}
            </Paragraph>
          </div>
        </div>
      </div>
    </div>
  );
};

export interface TestimonialCardProps {
  testimonial: CfCollectionTestimonial;
  type?: "BECOME_A_VET_DISPLAY";
}

export default TestimonialCard;
