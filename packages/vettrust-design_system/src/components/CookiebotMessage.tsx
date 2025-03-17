import React from "react";
import { Drawer } from "@mui/material";
import { ComponentProps, UseVtTranslateType } from "../@types";
import Section from "./shared/Section";
import Paragraph from "./shared/Paragraph";
import Button from "./shared/Button";
import { NextRouter } from "../@types/next";

const CookiebotMessage: React.FC<
  ComponentProps<{ useVtTranslate: UseVtTranslateType; router: NextRouter }>
> = ({ useVtTranslate, router }) => {
  const { t } = useVtTranslate();
  const [open, setOpen] = React.useState(false);

  React.useLayoutEffect(() => {
    setOpen(
      !(window as Record<string, any>)?.Cookiebot?.consented &&
        !(window as Record<string, any>)?.Cookiebot?.declined
    );
  }, []);

  const onClose = () => {};

  const onAccept = async () => {
    setOpen(false);
    await (window as Record<string, any>)?.Cookiebot?.submitCustomConsent(
      true,
      true,
      true
    );
    return true;
  };

  const onDecline = async () => {
    setOpen(false);
    await (window as Record<string, any>)?.Cookiebot?.submitCustomConsent(
      false,
      false,
      false
    );
    return false;
  };

  return (
    <Drawer anchor="bottom" open={open} onClose={onClose}>
      <div className="bg-darkBlue text-white p-[20px] lg:p-[40px] flex flex-row justify-center">
        <Section
          title={{
            text: t("COOKIEBOT.TITLE"),
            level: "h2",
            className: "text-white"
          }}
          className="text-white lg:w-[1152px]"
        >
          <Paragraph type="body_1" className="mt-[8px]">
            {t("COOKIEBOT.DESCRIPTION")}
          </Paragraph>
          <div className="flex flex-col md:flex-row justify-between md:justify-start mt-[40px] gap-[16px]">
            <Button
              type="MAGENTA"
              size="lg"
              onClick={() => {
                onAccept();
              }}
              router={router}
            >
              {t("COOKIEBOT.CONSENT_BUTTON")}
            </Button>
            <Button
              type="SECONDARY"
              size="lg"
              onClick={() => {
                onDecline();
              }}
              router={router}
            >
              {t("COOKIEBOT.REFUSE_CONSENT_BUTTON")}
            </Button>
          </div>
        </Section>
      </div>
    </Drawer>
  );
};

export default CookiebotMessage;
