/* eslint-disable sonarjs/cognitive-complexity */
import React from "react";
import { Formik } from "formik";
import axios from "axios";
import { toast } from "react-toastify";
import { useAtom } from "jotai";

import { ComponentProps, UseVtTranslateType, VTAtom } from "../../@types";
import Section from "../shared/Section";
import TextInput from "../inputs/TextInput";
import CheckboxInput from "../inputs/CheckboxInput";
import Button from "../shared/Button";
import TextAreaInput from "../inputs/TextAreaInput";
import SelectInput from "../inputs/SelectInput";
import { InputChangeState } from "../../@types/components/inputs";
import { contactModalSchema } from "../../shared/schemas/contactModal";
import { ModalsOptions, ModalsState } from "../../@types/components/modals";
import { LocationFields } from "../../@types/content/CFClollectionLocation";

const initialState = {
  petIsAlreadyPatient: "",
  breed: "",
  petName: "",
  ownerName: "",
  email: "",
  phoneNumber: "",
  message: "",
  acceptedTerms: false
};

const ContactModal: React.FC<ComponentProps<Props>> = ({
  currentModalAtom,
  currentlyDisplayedLocationAtom,
  router,
  useVtTranslate,
  customUseAtom,
}) => {
  const { t, i18n } = useVtTranslate("location-contact");
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [, setCurrentModal] = customUseAtom(currentModalAtom);
  const [currentlyDisplayedLocation] = customUseAtom(currentlyDisplayedLocationAtom);

  const YES_NO_CHOICES = [
    {
      displayValue: t("FOR_VETS.FORM.RETURN_TRANSFER_CHOICES.YES"),
      submitValue: "Ja"
    },
    {
      displayValue: t("FOR_VETS.FORM.RETURN_TRANSFER_CHOICES.NO"),
      submitValue: "Nein"
    }
  ];

  const BREED_CHOICES = [
    {
      displayValue: t("CONTACT_MODAL.CAT"),
      submitValue: "Katze"
    },
    {
      displayValue: t("CONTACT_MODAL.DOG"),
      submitValue: "Hund"
    },
    {
      displayValue: t("CONTACT_MODAL.OTHER"),
      submitValue: "Andere"
    }
  ];

  return (
    <Formik
      initialValues={initialState}
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      onSubmit={({ acceptedTerms, ...rest }, formikHelpers) => {
        setIsSubmitting(true);

        axios
          .post("/api/locations/contact", {
            ...rest,
            locationContactEmail: currentlyDisplayedLocation?.email
          })
          .then(() => {
            setIsSubmitting(false);
            setCurrentModal({
              type: ModalsOptions.SIGNUP_SUCCESS,
              minWidth: "md"
            });
            formikHelpers.resetForm();
          })
          .catch(() => {
            setIsSubmitting(false);
            // @ts-ignore
            toast.error(t("common:ERRORS.SOMETHING_WENT_WRONG")[0]);
          });
      }}
      validationSchema={contactModalSchema(t, i18n)}
    >
      {({
        values,
        touched,
        errors,
        handleBlur,
        handleChange,
        isValid,
        submitForm,
        setTouched
      }) => {
        const isFormValid =
          isValid &&
          Object.values(errors).length === 0 &&
          values.petIsAlreadyPatient.length > 0 &&
          values.breed.length > 0 &&
          values.petName.length > 0 &&
          values.ownerName.length > 0 &&
          values.email.length > 0 &&
          values.phoneNumber.length > 0 &&
          values.acceptedTerms;

        return (
          <div className="max-w-[1120px] lg:w-[1120px] p-[20px] lg:p-[40px]">
            <Section title={{ text: t("CONTACT_MODAL.TITLE"), level: "h3" }}>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[32px] mb-[32px]">
                <SelectInput
                  forText="petIsAlreadyPatient"
                  labelKey={t("CONTACT_MODAL.PET_ALREADY_PATIENT_LABEL")}
                  isRequired
                  classes={{
                    input: "border-solid border-[1px] border-sand-pressed"
                  }}
                  focusRingClassName="xs:ring-offset-white"
                  options={YES_NO_CHOICES}
                  onSelectedChange={(_value, event) => {
                    handleChange(event);
                  }}
                  changeState={
                    touched.petIsAlreadyPatient && errors.petIsAlreadyPatient
                      ? InputChangeState.INVALID
                      : InputChangeState.VALID
                  }
                  errorMessage={errors.petIsAlreadyPatient}
                  value={values.petIsAlreadyPatient}
                  onBlur={() => {
                    setTouched({
                      ...touched,
                      petIsAlreadyPatient: true
                    });
                  }}
                  useVtTranslate={useVtTranslate}
                />
                <SelectInput
                  forText="breed"
                  labelKey={t("CONTACT_MODAL.BREED")}
                  isRequired
                  classes={{
                    input: "border-solid border-[1px] border-sand-pressed"
                  }}
                  focusRingClassName="xs:ring-offset-white"
                  options={BREED_CHOICES}
                  onSelectedChange={(_value, event) => {
                    handleChange(event);
                  }}
                  changeState={
                    touched.breed && errors.breed
                      ? InputChangeState.INVALID
                      : InputChangeState.VALID
                  }
                  errorMessage={errors.breed}
                  value={values.breed}
                  onBlur={() => {
                    setTouched({
                      ...touched,
                      breed: true
                    });
                  }}
                  useVtTranslate={useVtTranslate}
                />
                <TextInput
                  forText="petName"
                  placeHolder="Rex"
                  labelKey={t("CONTACT_MODAL.PET_NAME_LABEL")}
                  isRequired
                  classes={{
                    input: "border-solid border-[1px] border-sand-pressed"
                  }}
                  focusRingClassName="xs:ring-offset-white"
                  onChange={(_value, event) => {
                    handleChange(event);
                  }}
                  changeState={
                    touched.petName && errors.petName
                      ? InputChangeState.INVALID
                      : InputChangeState.VALID
                  }
                  errorMessage={errors.petName}
                  value={values.petName}
                  onBlur={handleBlur}
                />
                <TextInput
                  forText="ownerName"
                  placeHolder={t(
                    "CONTACT_MODAL.FIRST_AND_LAST_NAME_PLACEHOLDER"
                  )}
                  labelKey={t("CONTACT_MODAL.FIRST_AND_LAST_NAME")}
                  isRequired
                  classes={{
                    input: "border-solid border-[1px] border-sand-pressed"
                  }}
                  focusRingClassName="xs:ring-offset-white"
                  onChange={(_value, event) => {
                    handleChange(event);
                  }}
                  changeState={
                    touched.ownerName && errors.ownerName
                      ? InputChangeState.INVALID
                      : InputChangeState.VALID
                  }
                  errorMessage={errors.ownerName}
                  value={values.ownerName}
                  onBlur={handleBlur}
                />
                <TextInput
                  forText="email"
                  placeHolder={t("CONTACT_MODAL.EMAIL_PLACEHOLDER")}
                  labelKey={t("CONTACT_MODAL.EMAIL_LABEL")}
                  isRequired
                  classes={{
                    input: "border-solid border-[1px] border-sand-pressed"
                  }}
                  focusRingClassName="xs:ring-offset-white"
                  onChange={(_value, event) => {
                    handleChange(event);
                  }}
                  changeState={
                    touched.email && errors.email
                      ? InputChangeState.INVALID
                      : InputChangeState.VALID
                  }
                  errorMessage={errors.email}
                  value={values.email}
                  onBlur={handleBlur}
                />
                <TextInput
                  forText="phoneNumber"
                  placeHolder={t("CONTACT_MODAL.TELEPHONE_PLACEHOLDER")}
                  labelKey={t("CONTACT_MODAL.TELEPHONE_LABEL")}
                  isRequired
                  classes={{
                    input: "border-solid border-[1px] border-sand-pressed"
                  }}
                  focusRingClassName="xs:ring-offset-white"
                  onChange={(_value, event) => {
                    handleChange(event);
                  }}
                  changeState={
                    touched.phoneNumber && errors.phoneNumber
                      ? InputChangeState.INVALID
                      : InputChangeState.VALID
                  }
                  errorMessage={errors.phoneNumber}
                  value={values.phoneNumber}
                  onBlur={handleBlur}
                />
              </div>

              <TextAreaInput
                forText="message"
                placeHolder={t("CONTACT_MODAL.MESSAGE_PLACEHOLDER")}
                labelKey={t("CONTACT_MODAL.MESSAGE_LABEL")}
                isRequired
                classes={{
                  input:
                    "border-solid border-[1px] border-sand-pressed h-[186px]"
                }}
                focusRingClassName="xs:ring-offset-white"
                onChange={(_value, event) => {
                  handleChange(event);
                }}
                changeState={
                  touched.message && errors.message
                    ? InputChangeState.INVALID
                    : InputChangeState.VALID
                }
                errorMessage={errors.message}
                value={values.message}
                onBlur={handleBlur}
              />

              <div className="w-full mt-[24px] flex flex-col lg:flex-row items-center justify-between gap-[32px]">
                <CheckboxInput
                  labelText={t("CONTACT_MODAL.PRIVACY_LABEL")}
                  isRequired
                  onChange={(_value, event) => {
                    handleChange(event);
                  }}
                  value={values.acceptedTerms}
                  name="acceptedTerms"
                />

                <Button
                  type="PRIMARY"
                  size="lg"
                  iconLeft="Send"
                  disabled={isSubmitting || !isFormValid}
                  onClick={submitForm}
                  isLoading={isSubmitting}
                  focusRingClassName="xs:ring-offset-white"
                  router={router}
                >
                  {t("CONTACT_MODAL.BUTTON_LABEL")}
                </Button>
              </div>
            </Section>
          </div>
        );
      }}
    </Formik>
  );
};

interface Props {
  currentModalAtom: ReturnType<VTAtom<ModalsState["currentModal"]>["vTAtom"]>;
  useVtTranslate: UseVtTranslateType;
  currentlyDisplayedLocationAtom: ReturnType<
    VTAtom<LocationFields | null>["vTAtom"]
  >;
  router: any;
  customUseAtom: typeof useAtom;
}

export default ContactModal;
