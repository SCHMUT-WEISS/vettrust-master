/* eslint-disable @typescript-eslint/no-explicit-any,jsx-a11y/anchor-is-valid */
import {
  BLOCKS,
  MARKS,
  INLINES,
  Document,
  Node
} from "@contentful/rich-text-types";
import React from "react";
import {
  documentToReactComponents,
  Options
} from "@contentful/rich-text-react-renderer";

import { ComponentProps, UseVtTranslateType } from "../../@types";
import Paragraph, { PARAGRAPH_STYLES } from "./Paragraph";
import VTImage from "./VTImage";
import { formatURL } from "../../shared/utils/contentful/helpers";
import { CFRichTextEmbedAsset } from "../../@types/content/CFRichTextAsset";
import Heading from "./Heading";
import { DEFAULT_IMAGE_LOADER } from "../../shared/pages";
import PdfIframeEmbed from "./PdfIframeEmbed";

// Used only for the purpose of type checking.
const obj = {};

// eslint-disable-next-line no-use-before-define
const RichTextRenderer: React.FC<ComponentProps<RichTextRendererProps>> = ({
  document,
  classes,
  paragraphType = "body_2",
  className,
  useVtTranslate
}) => {
  const options = {
    renderMark: {
      [MARKS.BOLD]: (text: string) => (
        <span
          className={`font-bold ${
            classes?.renderMark?.[MARKS.BOLD as keyof typeof obj]
          }`}
        >
          {text}
        </span>
      ),

      [MARKS.CODE]: (text: string) => (
        <p
          className={`border-l border-l-sand-pressed border-l-[5px] pl-[10px] ${
            classes?.renderMark?.[MARKS.CODE as keyof typeof obj]
          }`}
        >
          {text}
        </p>
      ),

      [MARKS.ITALIC]: (text: string) => (
        <span
          className={`font-italic ${
            classes?.renderMark?.[MARKS.ITALIC as keyof typeof obj]
          }`}
        >
          {text}
        </span>
      ),

      [MARKS.UNDERLINE]: (text: string) => (
        <span
          className={`underline ${
            classes?.renderMark?.[MARKS.UNDERLINE as keyof typeof obj]
          }`}
        >
          {text}
        </span>
      )
    },
    renderNode: {
      [BLOCKS.PARAGRAPH]: (_node: Node, children: React.ReactNode) => (
        <Paragraph
          className={`mt-[16px] ${
            classes?.renderNode?.[BLOCKS.PARAGRAPH as keyof typeof obj]
          }`}
          type={paragraphType}
        >
          {children}
        </Paragraph>
      ),

      [BLOCKS.HR]: () => (
        <hr
          className={`border-sand-pressed border-t-[1px] my-[24px] ${
            classes?.renderNode?.[BLOCKS.HR as keyof typeof obj]
          }`}
        />
      ),

      [BLOCKS.EMBEDDED_ASSET]: (asset: CFRichTextEmbedAsset) => {
        if (
          asset?.data?.target?.fields?.file?.contentType === "application/pdf"
        ) {
          return (
            <PdfIframeEmbed
              title={asset?.data?.target?.fields?.title}
              src={formatURL(asset?.data?.target?.fields?.file?.url)}
              useVtTranslate={useVtTranslate}
            />
          );
        }

        return (
          <React.Fragment>
            <div
              className={`h-[310px] w-full relative rounded-[12px] mt-[24px]  ${
                classes?.renderNode?.[BLOCKS.EMBEDDED_ASSET as keyof typeof obj]
              }`}
            >
              <VTImage
                src={formatURL(asset?.data?.target?.fields?.file?.url)}
                layout="fill"
                className="border-solid rounded-[12px]"
                objectFit="cover"
                placeholder="blur"
                blurDataURL={
                  formatURL(asset?.data?.target?.fields?.file?.url) ||
                  DEFAULT_IMAGE_LOADER
                }
                alt={asset?.data?.target?.fields?.description}
              />
            </div>
            <Paragraph type="caption" className="mb-[24px] line-clamp-1">
              {asset.data.target.fields.title}
            </Paragraph>
          </React.Fragment>
        );
      },

      // TODO: investigate on embedding other content types through rich text
      // [BLOCKS.DOCUMENT]: (node: Document, children) => documentToReactComponents(node, options as any)
      [BLOCKS.HEADING_1]: (_node: Node, children: React.ReactNode) => (
        <Heading
          className={`mt-[16px]  ${
            classes?.renderNode?.[BLOCKS.HEADING_1 as keyof typeof obj]
          }`}
          level="h1"
          text={children}
        />
      ),

      [BLOCKS.HEADING_2]: (_node: Node, children: React.ReactNode) => (
        <Heading
          className={`mt-[16px]  ${
            classes?.renderNode?.[BLOCKS.HEADING_2 as keyof typeof obj]
          }`}
          level="h2"
          text={children}
        />
      ),

      [BLOCKS.HEADING_3]: (_node: Node, children: React.ReactNode) => (
        <Heading
          className={`mt-[16px]  ${
            classes?.renderNode?.[BLOCKS.HEADING_3 as keyof typeof obj]
          }`}
          level="h3"
          text={children}
        />
      ),

      [BLOCKS.HEADING_4]: (_node: Node, children: React.ReactNode) => (
        <Heading
          className={`mt-[16px]  ${
            classes?.renderNode?.[BLOCKS.HEADING_4 as keyof typeof obj]
          }`}
          level="h4"
          text={children}
        />
      ),

      [BLOCKS.HEADING_5]: (_node: Node, children: React.ReactNode) => (
        <Heading
          className={`mt-[16px]  ${
            classes?.renderNode?.[BLOCKS.HEADING_5 as keyof typeof obj]
          }`}
          level="h5"
          text={children}
        />
      ),

      [BLOCKS.HEADING_6]: (_node: Node, children: React.ReactNode) => (
        <Heading
          className={`mt-[16px]  ${
            classes?.renderNode?.[BLOCKS.HEADING_6 as keyof typeof obj]
          }`}
          level="h6"
          text={children}
        />
      ),

      [BLOCKS.UL_LIST]: (_node: Node, children: React.ReactNode) => (
        <ul
          className={`list-disc pl-[16px] mt-[16px] ${
            classes?.renderNode?.[BLOCKS.UL_LIST as keyof typeof obj]
          }`}
        >
          {children}
        </ul>
      ),

      [BLOCKS.OL_LIST]: (_node: Node, children: React.ReactNode) => (
        <ul
          className={`list-decimal pl-[16px] mt-[16px] ${
            classes?.renderNode?.[BLOCKS.UL_LIST as keyof typeof obj]
          }`}
        >
          {children}
        </ul>
      ),

      [BLOCKS.LIST_ITEM]: (_node: Node, children: React.ReactNode) => (
        <li
          className={`rich-text__ul-element pt-0 ${
            classes?.renderNode?.[BLOCKS.LIST_ITEM as keyof typeof obj]
          }`}
        >
          {children}
        </li>
      ),

      [INLINES.HYPERLINK]: (node: Node, children: React.ReactNode) => (
        <a
          href={node.data.uri}
          className={`text-darkBlue-hover underline hover:no-underline ${
            classes?.renderNode?.[INLINES.HYPERLINK as keyof typeof obj]
          }`}
          target="_blank"
          rel="noreferrer"
        >
          {children}
        </a>
      )
    },
    renderText: (text: string) => text
  };
  return (
    <div className={`text-darkBlue ${className}`}>
      {documentToReactComponents(document, options as any)}
    </div>
  );
};

interface RichTextRendererProps {
  document: Document;
  classes?: {
    [K in keyof Options]: {
      [V in keyof Options[K]]: string;
    };
  };
  paragraphType?: keyof typeof PARAGRAPH_STYLES;
  useVtTranslate: UseVtTranslateType;
}

export default RichTextRenderer;
