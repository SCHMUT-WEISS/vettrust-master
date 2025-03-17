import * as Yup from "yup";
import { VTI18n, VTTranslateFx } from "../../@types";

export const contactModalSchema = (t: VTTranslateFx, i18nConfig: VTI18n) =>
  Yup.object().shape({
    petIsAlreadyPatient: Yup.string()
      .min(
        1,
        t("common:ERRORS.SHORT_FIELD", {
          field: t("common:OTHERS.PLEASE_SELECT"),
        }) as unknown as string
      )
      .required(
        t("common:ERRORS.REQUIRED_FIELD", {
          field: t("common:OTHERS.PLEASE_SELECT"),
        }) as unknown as string
      ),
    breed: Yup.string()
      .min(
        1,
        t("common:ERRORS.SHORT_FIELD", {
          field: t("common:OTHERS.PLEASE_SELECT"),
        }) as unknown as string
      )
      .required(
        t("common:ERRORS.REQUIRED_FIELD", {
          field: t("common:OTHERS.PLEASE_SELECT"),
        }) as unknown as string
      ),
    petName: Yup.string()
      .min(
        1,
        t("common:ERRORS.SHORT_FIELD", {
          field: t("CONTACT_MODAL.PET_NAME_LABEL"),
        }) as unknown as string
      )
      .required(
        t("common:ERRORS.REQUIRED_FIELD", {
          field: t("CONTACT_MODAL.PET_NAME_LABEL"),
        }) as unknown as string
      ),
    ownerName: Yup.string()
      .min(
        1,
        t("common:ERRORS.SHORT_FIELD", {
          field: t("CONTACT_MODAL.FIRST_AND_LAST_NAME"),
        }) as unknown as string
      )
      .required(
        t("common:ERRORS.REQUIRED_FIELD", {
          field: t("CONTACT_MODAL.FIRST_AND_LAST_NAME"),
        }) as unknown as string
      ),
    email: Yup.string()
      .email(
        t("common:ERRORS.INVALID_FIELD", {
          field: i18nConfig?.language === "de" ? "E-Mail" : "Email",
        }) as unknown as string
      )
      .min(
        1,
        t("common:ERRORS.SHORT_FIELD", {
          field: i18nConfig?.language === "de" ? "E-Mail" : "Email",
        }) as unknown as string
      )
      .required(
        t("common:ERRORS.REQUIRED_FIELD", {
          field: i18nConfig?.language === "de" ? "E-Mail" : "Email",
        }) as unknown as string
      ),
    phoneNumber: Yup.string()
      .min(
        1,
        t("common:ERRORS.SHORT_FIELD", {
          field: t("CONTACT_MODAL.TELEPHONE_LABEL"),
        }) as unknown as string
      )
      .required(
        t("common:ERRORS.REQUIRED_FIELD", {
          field: t("CONTACT_MODAL.TELEPHONE_LABEL"),
        }) as unknown as string
      ),
    message: Yup.string()
      .min(
        1,
        t("common:ERRORS.SHORT_FIELD", {
          field: t("CONTACT_MODAL.MESSAGE_LABEL"),
        }) as unknown as string
      )
      .required(
        t("common:ERRORS.REQUIRED_FIELD", {
          field: t("CONTACT_MODAL.MESSAGE_LABEL"),
        }) as unknown as string
      ),
    acceptedTerms: Yup.boolean().required(
      i18nConfig?.language === "de"
        ? "Sie müssen unsere Allgemeinen Geschäftsbedingungen akzeptieren, bevor Sie sich anmelden."
        : "You need accept our terms and conditions before signing up"
    ),
  });
