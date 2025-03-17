import * as Yup from "yup";
import { VTI18n, VTTranslateFx } from "../../@types";

export const careerSignupSchema = (t: VTTranslateFx, i18nConfig: VTI18n) =>
  Yup.object().shape({
    email: Yup.string()
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
    name: Yup.string()
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
    position: Yup.string()
      .min(
        1,
        t("common:ERRORS.SHORT_FIELD", {
          field: "Position",
        }) as unknown as string
      )
      .required(
        t("common:ERRORS.REQUIRED_FIELD", {
          field: "Position",
        }) as unknown as string
      ),
    region: Yup.string()
      .min(
        1,
        t("common:ERRORS.SHORT_FIELD", {
          field: "Region",
        }) as unknown as string
      )
      .required(
        t("common:ERRORS.REQUIRED_FIELD", {
          field: "Region",
        }) as unknown as string
      ),
    acceptedTerms: Yup.boolean().required(
      i18nConfig?.language === "de"
        ? "Sie müssen unsere Allgemeinen Geschäftsbedingungen akzeptieren, bevor Sie sich anmelden."
        : "You need accept our terms and conditions before signing up"
    ),
  });
