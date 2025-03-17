/* eslint-disable sonarjs/cognitive-complexity */
import React, { useState } from "react";
import { Formik, Form, FormikHelpers, FormikErrors } from "formik";
import axios from "axios";
import { toast } from "react-toastify";
import { ComponentProps } from "../../../../@types";
import { Button, Section } from "../../../shared";
import StepVeterinarian from "./Partials/StepVeterinarian";
import StepOwner from "./Partials/StepOwner";
import { referralSchema } from "../../../../shared/schemas/referral";
import StepPatient from "./Partials/StepPatient";
import StepDepartment from "./Partials/StepDepartment";
import {
  ReferralFormProps,
  ReferralFormValues
} from "../../../../@types/components/forms";
import { urlEncodeObject } from "../../../../shared/utils";

const initialState = {
  clinicName: "",
  vetName: "",
  vetEmail: "",
  vetPhoneNumber: "",

  ownerFirstName: "",
  ownerLastName: "",
  ownerEmail: "",
  ownerPhoneNumber: "",
  ownerAddress: "",
  ownerZipCode: "",
  ownerCity: "",

  patientName: "",
  patientBreed: "",
  patientSpecies: "",
  patientBirthdate: "",
  patientGender: "f",
  patientNeutered: "0",
  patientWeight: "",
  patientTravel: "unknown",

  department: "internal_medicine",

  emergency: "0",
  urgent: "0",
  elective: "0",

  remarks: "",

  // Radiology
  xRay: "with_indication",
  abdomen: "",
  areaToBeExamined: "",
  ct: "with_indication",
  fnas: "with_indication",
  cystocentesis: "with_indication",
  sedationRequired: "uncertainty",
  combinedWithAnotherConsultation: "",

  // All
  suspectedDiagnosis: "",
  preTreatment: "0",
  medication: "",

  labsResultsAvailableValue: "0",
  xRayResultsAvailableValue: "0"
};

const ReferralForm: React.FC<ComponentProps<ReferralFormProps>> = ({
  router,
  useVtTranslate
}) => {
  const { t } = useVtTranslate("referral");
  const formRef = React.useRef<HTMLFormElement>(null);
  const [step, setStep] = useState(0);
  const [files, setFiles] = React.useState<Record<string, File[]>>({
    medicalHistory: [],
    labsResultsAvailable: [],
    xRayResultsAvailable: []
  });

  const handleSubmit = (
    values: ReferralFormValues,
    formikHelpers: FormikHelpers<ReferralFormValues>
  ) => {
    formikHelpers.setSubmitting(true);
    const filesToSubmit: Record<string, any> = {};
    Object.keys(files).forEach((key) => {
      files[key].forEach((file, index) => {
        filesToSubmit[`${key}_${index}`] = file;
      });
    });

    axios
      .post(
        "/api/form/referral",
        urlEncodeObject({
          ...filesToSubmit,
          ...values,
          medicalHistoryValue: files.medicalHistory.length ? "1" : "0",
          labsResultsAvailableValue: files.labsResultsAvailable.length
            ? "1"
            : "0",
          xRayResultsAvailableValue: files.xRayResultsAvailable.length
            ? "1"
            : "0"
        })
      )
      .then(() => {
        setStep(4);

        formikHelpers.resetForm();

        setFiles({
          medicalHistory: [],
          labsResultsAvailable: [],
          xRayResultsAvailable: []
        });

        toast.success(t("REFERRAL_FORM.SUCCESS") as string, {
          autoClose: 6000
        });
      })
      .catch(() => {
        toast.error(t("common:ERRORS.SOMETHING_WENT_WRONG") as string);
      })
      .finally(() => {
        formikHelpers.setSubmitting(false);
      });
  };

  const handleNext = (
    values: ReferralFormValues,
    formikHelpers: FormikHelpers<ReferralFormValues>
  ) => {
    if (step < 3) {
      formikHelpers.setSubmitting(false);
      setStep(step + 1);
      formikHelpers.setTouched({});
    } else {
      console.log("Form values:", values);
      handleSubmit(values, formikHelpers);
    }
  };

  const handleBack = (
    setErrors: (errors: FormikErrors<ReferralFormValues>) => void
  ) => {
    if (step > 0) {
      setErrors({});
      setStep(step - 1);
    }
  };

  return (
    <div>
      <Formik
        ref={formRef}
        initialValues={initialState}
        onSubmit={handleNext}
        validationSchema={referralSchema(t)[step]}
      >
        {({
          values,
          touched,
          errors,
          handleBlur,
          handleChange,
          submitForm,
          isSubmitting,
          isValid,
          setErrors
        }) => (
          <Form
            name="referral-form"
            className="bg-white default-radius p-[20px] pt-[40px] lg:p-[40px] w-[calc(90vw-40px)] lg:w-[calc(80vw-40px)] max-w-[1040px]"
          >
            <Section
              title={{
                text: t("REFERRAL_FORM.TITLE"),
                level: "h3"
              }}
            >
              {step === 0 && (
                <StepVeterinarian
                  t={t}
                  isSubmitting={isSubmitting}
                  touched={touched}
                  errors={errors}
                  values={values}
                  handleChange={handleChange}
                  handleBlur={handleBlur}
                />
              )}
              {step === 1 && (
                <StepOwner
                  t={t}
                  isSubmitting={isSubmitting}
                  touched={touched}
                  errors={errors}
                  values={values}
                  handleChange={handleChange}
                  handleBlur={handleBlur}
                />
              )}
              {step === 2 && (
                <StepPatient
                  t={t}
                  isSubmitting={isSubmitting}
                  touched={touched}
                  errors={errors}
                  values={values}
                  handleChange={handleChange}
                  handleBlur={handleBlur}
                />
              )}
              {step === 3 && (
                <StepDepartment
                  t={t}
                  currentFiles={files}
                  setFiles={setFiles}
                  isSubmitting={isSubmitting}
                  touched={touched}
                  errors={errors}
                  values={values}
                  handleChange={handleChange}
                  handleBlur={handleBlur}
                  useVtTranslate={useVtTranslate}
                />
              )}
              {step === 4 && t("REFERRAL_FORM.SUCCESS_MESSAGE")}
              {step !== 4 && (
                <div className="mt-[32px] flex flex-col-reverse md:flex-row justify-between gap-4">
                  {step > 0 ? (
                    <Button
                      type="PRIMARY"
                      size="lg"
                      className="lg:mt-[32px] lg:mt-0 w-full lg:w-auto"
                      disabled={isSubmitting}
                      onClick={() => handleBack(setErrors)}
                      isLoading={isSubmitting}
                      iconLeftClassName="w-[16px] h-[16px]"
                      focusRingClassName="xs:ring-offset-white"
                      router={router}
                    >
                      {t("REFERRAL_FORM.BACK")}
                    </Button>
                  ) : (
                    <div />
                  )}
                  <Button
                    buttonType="submit"
                    type="PRIMARY"
                    size="lg"
                    iconLeft={step === 3 ?"Send" : undefined}
                    className="lg:mt-[32px] lg:mt-0 w-full lg:w-auto"
                    disabled={
                      isSubmitting ||
                      !(isValid && Object.values(errors).length === 0)
                    }
                    isLoading={isSubmitting}
                    iconLeftClassName="w-[16px] h-[16px]"
                    focusRingClassName="xs:ring-offset-white"
                    router={router}
                    onClick={submitForm}
                  >
                    {t(
                      step === 3
                        ? "REFERRAL_FORM.SUBMIT"
                        : "REFERRAL_FORM.CONTINUE"
                    )}
                  </Button>
                </div>
              )}
            </Section>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default ReferralForm;
