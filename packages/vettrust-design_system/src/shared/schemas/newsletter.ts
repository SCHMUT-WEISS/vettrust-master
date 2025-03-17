import * as Yup from "yup";
import { VTI18n, VTTranslateFx } from "../../@types";

export const newsletterSubscription = (
  t: VTTranslateFx,
  i18nConfig: VTI18n
) =>
  Yup.object().shape({
    EMAIL: Yup.string()
      .email(
        t("common:ERRORS.INVALID_FIELD", {
          field: i18nConfig?.language === "de" ? "E-Mail" : "Email",
        }) as unknown as string
      )
      .required(
        t("common:ERRORS.REQUIRED_FIELD", {
          field: i18nConfig?.language === "de" ? "E-Mail" : "Email",
        }) as unknown as string
      ),
    NAME: Yup.string()
      .min(
        1,
        t("common:ERRORS.SHORT_FIELD", {
          field: "Name",
        }) as unknown as string
      )
      .required(
        t("common:ERRORS.REQUIRED_FIELD", {
          field: "Name",
        }) as unknown as string
      ),
  });
