import * as Yup from "yup";
import { VTI18n, VTTranslateFx } from "../../@types";

export const forVetsSchema = (t: VTTranslateFx, i18nConfig: VTI18n) =>
  Yup.object().shape({
    referrerPractice: Yup.string()
      .min(
        1,
        t("common:ERRORS.SHORT_FIELD", {
          field: t("FOR_VETS.FORM.REFERRER.PRACTICE_LABEL"),
        }) as unknown as string
      )
      .required(
        t("common:ERRORS.REQUIRED_FIELD", {
          field: t("FOR_VETS.FORM.REFERRER.PRACTICE_LABEL"),
        }) as unknown as string
      ),
    referrerVetName: Yup.string()
      .min(
        1,
        t("common:ERRORS.SHORT_FIELD", {
          field: t("FOR_VETS.FORM.REFERRER.VET_LABEL"),
        }) as unknown as string
      )
      .required(
        t("common:ERRORS.REQUIRED_FIELD", {
          field: t("FOR_VETS.FORM.REFERRER.VET_LABEL"),
        }) as unknown as string
      ),
    referrerEmail: Yup.string()
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
    referrerPhone: Yup.string()
      .min(
        1,
        t("common:ERRORS.SHORT_FIELD", {
          field: t("FOR_VETS.FORM.REFERRER.TELEPHONE_LABEL"),
        }) as unknown as string
      )
      .required(
        t("common:ERRORS.REQUIRED_FIELD", {
          field: t("FOR_VETS.FORM.REFERRER.TELEPHONE_LABEL"),
        }) as unknown as string
      ),
    petOwnerNames: Yup.string()
      .min(
        1,
        t("common:ERRORS.SHORT_FIELD", {
          field: t("FOR_VETS.FORM.PET_OWNER.NAME_LABEL"),
        }) as unknown as string
      )
      .required(
        t("common:ERRORS.REQUIRED_FIELD", {
          field: t("FOR_VETS.FORM.PET_OWNER.NAME_LABEL"),
        }) as unknown as string
      ),
    petOwnerPhone: Yup.string()
      .min(
        1,
        t("common:ERRORS.SHORT_FIELD", {
          field: t("FOR_VETS.FORM.PET_OWNER.TELEPHONE_LABEL"),
        }) as unknown as string
      )
      .required(
        t("common:ERRORS.REQUIRED_FIELD", {
          field: t("FOR_VETS.FORM.PET_OWNER.TELEPHONE_LABEL"),
        }) as unknown as string
      ),
    petOwnerAddress: Yup.string()
      .min(
        1,
        t("common:ERRORS.SHORT_FIELD", {
          field: t("FOR_VETS.FORM.PET_OWNER.ADDRESS_LABEL"),
        }) as unknown as string
      )
      .required(
        t("common:ERRORS.REQUIRED_FIELD", {
          field: t("FOR_VETS.FORM.PET_OWNER.ADDRESS_LABEL"),
        }) as unknown as string
      ),
    patientSpeciesRace: Yup.string()
      .min(
        1,
        t("common:ERRORS.SHORT_FIELD", {
          field: t("FOR_VETS.FORM.PATIENT.BREED_LABEL"),
        }) as unknown as string
      )
      .required(
        t("common:ERRORS.REQUIRED_FIELD", {
          field: t("FOR_VETS.FORM.PATIENT.BREED_LABEL"),
        }) as unknown as string
      ),
    patientPetName: Yup.string()
      .min(
        1,
        t("common:ERRORS.SHORT_FIELD", {
          field: t("FOR_VETS.FORM.PATIENT.PET_NAME"),
        }) as unknown as string
      )
      .required(
        t("common:ERRORS.REQUIRED_FIELD", {
          field: t("FOR_VETS.FORM.PATIENT.PET_NAME"),
        }) as unknown as string
      ),
    patientPetWeightKgs: Yup.string()
      .min(
        1,
        t("common:ERRORS.SHORT_FIELD", {
          field: t("FOR_VETS.FORM.PATIENT.WEIGHT_LABEL"),
        }) as unknown as string
      )
      .required(
        t("common:ERRORS.REQUIRED_FIELD", {
          field: t("FOR_VETS.FORM.PATIENT.WEIGHT_LABEL"),
        }) as unknown as string
      ),
    patientBirthdate: Yup.string()
      .matches(
        /^(?:(?:31(\/|-|\.)(?:0?[13578]|1[02]))\1|(?:(?:29|30)(\/|-|\.)(?:0?[13-9]|1[0-2])\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(\/|-|\.)0?2\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(\/|-|\.)(?:(?:0?[1-9])|(?:1[0-2]))\4(?:(?:1[6-9]|[2-9]\d)?\d{2})$/,
        // @ts-ignore
        t("common:ERRORS.PATTERN_NO_MATCH", {
          field: t("FOR_VETS.FORM.PATIENT.BIRTH_DATE_LABEL"),
          format: i18nConfig?.language === "de" ? "tt-MM-jjjj" : "dd-MM-yyyy",
        })[0] as unknown as string
      )
      .min(
        1,
        t("common:ERRORS.SHORT_FIELD", {
          field: t("FOR_VETS.FORM.PATIENT.BIRTH_DATE_LABEL"),
        }) as unknown as string
      ),
    patientAgeInYears: Yup.string()
      .min(
        1,
        t("common:ERRORS.SHORT_FIELD", {
          field: t("FOR_VETS.FORM.PATIENT.AGE_IN_YEARS_LABEL"),
        }) as unknown as string
      )
      .required(
        t("common:ERRORS.REQUIRED_FIELD", {
          field: t("FOR_VETS.FORM.PATIENT.AGE_IN_YEARS_LABEL"),
        }) as unknown as string
      ),
    patientGender: Yup.string()
      .min(
        1,
        t("common:ERRORS.SHORT_FIELD", {
          field: t("FOR_VETS.FORM.PATIENT.GENDER_LABEL"),
        }) as unknown as string
      )
      .required(
        t("common:ERRORS.REQUIRED_FIELD", {
          field: t("FOR_VETS.FORM.PATIENT.GENDER_LABEL"),
        }) as unknown as string
      ),
    bankTransferReason: Yup.string()
      .min(
        1,
        t("common:ERRORS.SHORT_FIELD", {
          field: t("FOR_VETS.FORM.BANk_TRANSFER.REASON_LABEL"),
        }) as unknown as string
      )
      .required(
        t("common:ERRORS.REQUIRED_FIELD", {
          field: t("FOR_VETS.FORM.BANk_TRANSFER.REASON_LABEL"),
        }) as unknown as string
      ),
    bankTransferReturnTransferPer: Yup.string()
      .min(
        1,
        t("common:ERRORS.SHORT_FIELD", {
          field: t("FOR_VETS.FORM.BANk_TRANSFER.RETURN_TRANSFER_LABEL"),
        }) as unknown as string
      )
      .required(
        t("common:ERRORS.REQUIRED_FIELD", {
          field: t("FOR_VETS.FORM.BANk_TRANSFER.RETURN_TRANSFER_LABEL"),
        }) as unknown as string
      ),
    preliminaryReport: Yup.string()
      .min(
        1,
        t("common:ERRORS.SHORT_FIELD", {
          field: t("FOR_VETS.FORM.BANk_TRANSFER.PRELIMINARY_REPORT_LABEL"),
        }) as unknown as string
      )
      .required(
        t("common:ERRORS.REQUIRED_FIELD", {
          field: t("FOR_VETS.FORM.BANk_TRANSFER.PRELIMINARY_REPORT_LABEL"),
        }) as unknown as string
      ),
    preTreatment: Yup.string()
      .min(
        1,
        t("common:ERRORS.SHORT_FIELD", {
          field: t("FOR_VETS.FORM.BANk_TRANSFER.PRE_TREATMENT"),
        }) as unknown as string
      )
      .required(
        t("common:ERRORS.REQUIRED_FIELD", {
          field: t("FOR_VETS.FORM.BANk_TRANSFER.PRE_TREATMENT"),
        }) as unknown as string
      ),
  });
