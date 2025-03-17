/* eslint-disable no-use-before-define */
import React from "react";
import { useAtom } from "jotai";
import { ComponentProps, UseVtTranslateType, VTAtom } from "../../@types";
import Section from "../shared/Section";
import Paragraph from "../shared/Paragraph";
import VTImage from "../shared/VTImage";
import Button from "../shared/Button";
import { ModalsOptions, ModalsState } from "../../@types/components/modals";
import { DEFAULT_IMAGE_LOADER } from "../../shared/pages";

const CareerSignup: React.FC<ComponentProps<CareerSignupProps>> = ({
  image,
  className,
  useVtTranslate,
  currentModalAtom,
  router,
  customUseAtom
}) => {
  const [, setCurrentModal] = customUseAtom(currentModalAtom);
  const { t } = useVtTranslate("career");

  return (
    <div
      className={`flex flex-col-reverse lg:flex-row gap-[40px] lg:gap-[64px] p-[20px] lg:p-[40px] rounded-[12px] ${className}`}
    >
      <Section
        title={{
          text: t("SIGNUP.TITLE"),
          level: "h2"
        }}
        backgroundColor=""
        className="lg:w-[488px]"
      >
        <Paragraph type="body_1" className="w-full">
          {t("SIGNUP.PARAGRAPH")}
        </Paragraph>
        <Button
          type="PRIMARY"
          size="lg"
          className="mt-[40px] w-full md:w-fit"
          disabled={false}
          onClick={() => {
            setCurrentModal({
              type: ModalsOptions.CAREER_SIGNUP,
              minWidth: "lg"
            });
          }}
          router={router}
        >
          {t("SIGNUP.BUTTON")}
        </Button>
      </Section>
      <div className="relative w-full lg:w-[520px] h-full rounded-[12px] h-[224px] md:h-[324px] lg:h-[inherit]">
        <VTImage
          className="rounded-[12px] object-cover w-full h-auto"
          layout="fill"
          src={image.src}
          alt={image.alt}
          style={{
            filter: "drop-shadow(0px 2px 24px rgba(0, 0, 0, 0.04))"
          }}
          placeholder="blur"
          blurDataURL={image?.blurDataUrl || DEFAULT_IMAGE_LOADER}
        />
      </div>
    </div>
  );
};

interface CareerSignupProps {
  image: {
    src: string;
    alt: string;
    className?: string;
    width?: number;
    height?: number;
    style?: React.CSSProperties;
    blurDataUrl: string;
  };
  currentModalAtom: ReturnType<VTAtom<ModalsState["currentModal"]>["vTAtom"]>;
  router: any;
  useVtTranslate: UseVtTranslateType;
  customUseAtom: typeof useAtom;
}

export default CareerSignup;
