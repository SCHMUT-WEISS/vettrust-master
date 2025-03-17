/* eslint-disable indent */
import {
  Button,
  ModalsOptions,
} from "@somethingcreative-agency/vettrust-design_system";
import { storyblokEditable } from "@storyblok/react";
import { useAtom } from "jotai";
import { useRouter } from "next/router";
import { CallToActionStoryblok } from "../../../@types/generated/storyblok";
import { currentModalAtom } from "../../../atoms/modals";
import { resolveLink } from "../../../shared/utils/storyblok/resolveLink";

interface CallToActionBlokProps {
  blok: CallToActionStoryblok;
}

function getLink(blok: CallToActionStoryblok) {
  switch (blok.type) {
    case "telemedicine":
      return undefined;
    case "call":
      return `tel:${blok.phone}`;
    case "mailto":
      return `mailto:${blok.email}`;
    default:
      return resolveLink(blok.link);
  }
}

function getIconLeft(type: CallToActionStoryblok["type"]) {
  switch (type) {
    case "call":
      return "PhonePlus";
    case "mailto":
      return "Mail";
    default:
      return undefined;
  }
}

export default function CallToActionBlok({ blok }: CallToActionBlokProps) {
  const router = useRouter();

  const [, setCurrentModal] = useAtom(currentModalAtom);

  const onClick = () =>
    setCurrentModal({
      type: ModalsOptions.VESTORIA_WIDGET,
      minWidth: "md",
    });

  return (
    <div className={`${blok.left_right_spacing && "container-wrapper"}`}>
      <Button
        size="lg"
        router={router}
        type={blok.button_type}
        target={blok?.target ?? "_self"}
        url={getLink(blok)}
        onClick={blok.type === "telemedicine" ? onClick : undefined}
        iconLeft={getIconLeft(blok.type)}
        iconRight={
          blok.type === "telemedicine" || blok.type === "link"
            ? "ArrowRight"
            : undefined
        }
        className={`${blok.top_spacing && "mt-10"}`}
        {...storyblokEditable({ ...blok })}
      >
        {blok.text}
      </Button>
    </div>
  );
}
