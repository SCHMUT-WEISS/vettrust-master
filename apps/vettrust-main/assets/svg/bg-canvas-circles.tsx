/* eslint-disable react/require-default-props */
import React from "react";

export default function BgCanvasCircles({ className }: { className?: string }) {
  return (
    <svg
      width="800"
      height="800"
      viewBox="0 0 800 800"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <mask
        id="mask0_244_639"
        style={{ maskType: "alpha" }}
        maskUnits="userSpaceOnUse"
        x="0"
        y="0"
        width="800"
        height="800"
      >
        <circle cx="400" cy="400" r="400" fill="black" />
      </mask>
      <g mask="url(#mask0_244_639)">
        <circle
          cx="400"
          cy="400"
          r="400"
          fill="url(#paint0_radial_244_639)"
          fillOpacity="0.02"
        />
        <circle
          cx="400"
          cy="400"
          r="400"
          fill="url(#paint1_radial_244_639)"
          fillOpacity="0.15"
        />
        <circle
          cx="400"
          cy="400"
          r="316"
          fill="url(#paint2_radial_244_639)"
          fillOpacity="0.2"
        />
        <g style={{ mixBlendMode: "soft-light" }} opacity="0.075">
          <rect width="800" height="800" fill="white" />
        </g>
      </g>
      <defs>
        <radialGradient
          id="paint0_radial_244_639"
          cx="0"
          cy="0"
          r="1"
          gradientUnits="userSpaceOnUse"
          gradientTransform="translate(400 400) rotate(90) scale(400)"
        >
          <stop offset="0.890625" stopColor="#D9CEBF" stopOpacity="0" />
          <stop offset="1" stopColor="#D9CEBF" />
        </radialGradient>
        <radialGradient
          id="paint1_radial_244_639"
          cx="0"
          cy="0"
          r="1"
          gradientUnits="userSpaceOnUse"
          gradientTransform="translate(400 400) rotate(90) scale(400)"
        >
          <stop stopColor="#D9CEBF" stopOpacity="0" />
          <stop offset="1" stopColor="#D9CEBF" />
        </radialGradient>
        <radialGradient
          id="paint2_radial_244_639"
          cx="0"
          cy="0"
          r="1"
          gradientUnits="userSpaceOnUse"
          gradientTransform="translate(400 400) rotate(90) scale(316)"
        >
          <stop stopColor="#D9CEBF" stopOpacity="0" />
          <stop offset="1" stopColor="#D9CEBF" />
        </radialGradient>
      </defs>
    </svg>
  );
}
