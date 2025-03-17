/* NextJs built in image component doesn't provide a good stacktrace when the src prop is not provided
 * This component is built to add a placeholder wherever the issue happens
 * REF: Issue description https://github.com/vercel/next.js/pull/38847
 *
 * NOTE: This has been solved in this PR https://github.com/vercel/next.js/pull/38847
 * likely to be removed in the next release of NextJs
 *  */

// import Image, { ImageProps } from "next/image";
import React from "react";
import { contentfulLoader } from "@delicious-simplicity/next-image-contentful-loader";
import NextImage from "next/image";

const DefaultImage: React.FC = props => (
  <svg
    {...props}
    width="100%"
    height="100%"
    xmlns="http://www.w3.org/2000/svg"
    role="img"
    aria-label="Placeholder: Responsive image"
    preserveAspectRatio="xMidYMid slice"
    focusable="false"
  >
    <title>Placeholder</title>
    <rect width="100%" height="100%" fill="#868e96" />
    <text x="50%" y="50%" fill="#dee2e6" dy=".3em">
      missing image
    </text>
  </svg>
);

const VTImage: React.FC<any> = ({ src, alt, ...rest }) =>
  src ? (
    <NextImage
      src={src}
      alt={alt}
      {...rest}
      loader={props => contentfulLoader(props, { fit: "fill", ar: "1:1" })}
    />
  ) : (
    <DefaultImage {...rest} />
  );

export default VTImage;
