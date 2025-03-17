import { Document } from "@contentful/rich-text-types";

export default function getRichTextSummary(document: Document) {
  return (
    document?.content
      ?.map((node: any) => {
        return node.content.map((el: any) => el.value).join(" ");
      })
      .join(" ") || ""
  );
}
