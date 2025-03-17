/* eslint-disable indent, react/no-unstable-nested-components */
import {
  Heading,
  Paragraph,
} from "@somethingcreative-agency/vettrust-design_system";
import {
  NODE_HEADING,
  NODE_PARAGRAPH,
  NODE_OL,
  render,
  NODE_UL,
} from "storyblok-rich-text-react-renderer";
import CallToActionBlok from "./bloks/CallToActionBlok";
import { CallToActionStoryblok } from "../../@types/generated/storyblok";

interface RichTextRendererProps {
  document: any;
  className?: string;
}

export default function RichTextRenderer({
  document,
  className,
}: RichTextRendererProps) {
  return (
    <div className={className}>
      {render(document, {
        nodeResolvers: {
          [NODE_HEADING]: (children, { level }) => {
            switch (level) {
              case 1:
                return <Heading level="h1" text={children} />;
              case 2:
                return <Heading level="h2" text={children} />;
              case 3:
                return <Heading level="h3" text={children} />;
              case 4:
                return <Heading level="h4" text={children} />;
              case 5:
                return <Heading level="h5" text={children} />;
              case 6:
                return <Heading level="h6" text={children} />;
              default:
                return <Heading level="h6" text={children} />;
            }
          },
          [NODE_PARAGRAPH]: children => (
            <Paragraph type="body_1">{children}</Paragraph>
          ),
          [NODE_OL]: children => {
            return <ol className="list-decimal">{children}</ol>;
          },
          [NODE_UL]: children => {
            return <ol className="list-disc">{children}</ol>;
          },
        },
        blokResolvers: {
          call_to_action: (blok: unknown) => (
            <CallToActionBlok blok={blok as CallToActionStoryblok} />
          ),
        },
      })}
    </div>
  );
}

RichTextRenderer.defaultProps = {
  className: "",
};
