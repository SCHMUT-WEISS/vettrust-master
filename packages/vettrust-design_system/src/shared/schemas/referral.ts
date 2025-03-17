import * as Yup from "yup";
import { VTTranslateFx } from "../../@types";

//   // Radiology
//   areaToBeExamined: "",
//   fnas: false,
//   cystocentesis: false,
//   furtherEvaluationsDesired: false,
//   combinedWithAnotherConsultation: "internal_medicine",

//   // All
//   suspectedDiagnosis: "",
//   medicalHistory: null,
//   preTreatment: false,
//   medication: "",
//   labsResultsAvailable: null,
//   xRayResultsAvailable: null
export const referralSchema = (t: VTTranslateFx) => [
  Yup.object({
    clinicName: Yup.string().required(
      t("common:ERRORS.REQUIRED_FIELD", {
        field: t("REFERRAL_FORM.INPUTS.CLINIC_NAME")
      }) as string
    ),
    vetName: Yup.string().required(
      t("common:ERRORS.REQUIRED_FIELD", {
        field: t("REFERRAL_FORM.INPUTS.VETERINARIAN_NAME")
      }) as string
    ),
    vetEmail: Yup.string().email(
      t("common:ERRORS.INVALID_FIELD", {
        field: t("REFERRAL_FORM.INPUTS.EMAIL")
      }) as string
    )
    // .required(
    //   t("common:ERRORS.REQUIRED_FIELD", {
    //     field: t("REFERRAL_FORM.INPUTS.EMAIL")
    //   }) as string
    // ),
    // vetPhoneNumber: Yup.string().required(
    //   t("common:ERRORS.REQUIRED_FIELD", {
    //     field: t("REFERRAL_FORM.INPUTS.PHONE_NUMBER")
    //   }) as string
    // )
  }),
  Yup.object({
    ownerFirstName: Yup.string().required(
      t("common:ERRORS.REQUIRED_FIELD", {
        field: t("REFERRAL_FORM.INPUTS.OWNER_FIRST_NAME")
      }) as string
    ),
    ownerLastName: Yup.string().required(
      t("common:ERRORS.REQUIRED_FIELD", {
        field: t("REFERRAL_FORM.INPUTS.OWNER_LAST_NAME")
      }) as string
    ),
    ownerEmail: Yup.string()
      .email(
        t("common:ERRORS.INVALID_FIELD", {
          field: t("REFERRAL_FORM.INPUTS.EMAIL")
        }) as string
      )
      .required(
        t("common:ERRORS.REQUIRED_FIELD", {
          field: t("REFERRAL_FORM.INPUTS.EMAIL")
        }) as string
      ),
    ownerPhoneNumber: Yup.string().required(
      t("common:ERRORS.REQUIRED_FIELD", {
        field: t("REFERRAL_FORM.INPUTS.PHONE_NUMBER")
      }) as string
    )
    // ownerAddress: Yup.string().required(
    //   t("common:ERRORS.REQUIRED_FIELD", {
    //     field: t("REFERRAL_FORM.INPUTS.OWNER_ADDRESS")
    //   }) as string
    // ),
    // ownerZipCode: Yup.string().required(
    //   t("common:ERRORS.REQUIRED_FIELD", {
    //     field: t("REFERRAL_FORM.INPUTS.OWNER_ZIP_CODE")
    //   }) as string
    // ),
    // ownerCity: Yup.string().required(
    //   t("common:ERRORS.REQUIRED_FIELD", {
    //     field: t("REFERRAL_FORM.INPUTS.OWNER_CITY")
    //   }) as string
    // )
  }),
  Yup.object({
    patientName: Yup.string().required(
      t("common:ERRORS.REQUIRED_FIELD", {
        field: t("REFERRAL_FORM.INPUTS.PATIENT_NAME")
      }) as string
    ),
    patientBreed: Yup.string().required(
      t("common:ERRORS.REQUIRED_FIELD", {
        field: t("REFERRAL_FORM.INPUTS.PATIENT_BREED")
      }) as string
    ),
    patientSpecies: Yup.string().required(
      t("common:ERRORS.REQUIRED_FIELD", {
        field: t("REFERRAL_FORM.INPUTS.PATIENT_SPECIES")
      }) as string
    ),
    patientBirthdate: Yup.string().required(
      t("common:ERRORS.REQUIRED_FIELD", {
        field: t("REFERRAL_FORM.INPUTS.PATIENT_BIRTHDATE")
      }) as string
    ),
    patientWeight: Yup.string().required(
      t("common:ERRORS.REQUIRED_FIELD", {
        field: t("REFERRAL_FORM.INPUTS.PATIENT_WEIGHT")
      }) as string
    )
  }),
  Yup.object({
    suspectedDiagnosis: Yup.string()
      .ensure()
      .when("department", {
        is: "radiology",
        then: Yup.string().required(
          t("common:ERRORS.REQUIRED_FIELD", {
            field: t("REFERRAL_FORM.INPUTS.SUSPECTED_DIAGNOSIS")
          }) as string
        )
      })
  })
];
