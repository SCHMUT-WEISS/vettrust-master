/* eslint-disable sonarjs/cognitive-complexity */
import React from "react";
import {
  ComponentProps,
  InputChangeState,
  StepBasicnProps
} from "../../../../../@types";
import { Paragraph } from "../../../../shared";
import { TextInput } from "../../../../inputs";

const StepVeterinarian: React.FC<ComponentProps<StepBasicnProps>> = ({
  t,
  isSubmitting,
  touched,
  errors,
  values,
  handleChange,
  handleBlur
}) => {
  return (
    <div className="step-1">
      <Paragraph type="body_1" className="hidden md:block">
        {t("REFERRAL_FORM.VETERINARIAN_STEP_TITLE")}
      </Paragraph>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-[32px] mt-[24px]">
        <TextInput
          focusRingClassName="xs:ring-offset-white"
          labelKey={t("REFERRAL_FORM.INPUTS.CLINIC_NAME")}
          forText="clinicName"
          disabled={isSubmitting}
          name="clinicName"
          type="text"
          placeHolder={t("REFERRAL_FORM.INPUTS.CLINIC_NAME")}
          classes={{
            container: "col-span-2 lg:col-span-1",
            input: `placeholder:font-[400] border border-sand-pressed h-[48px]`
          }}
          onChange={(_value, event) => {
            handleChange(event);
          }}
          changeState={
            touched.clinicName && errors.clinicName
              ? InputChangeState.INVALID
              : InputChangeState.VALID
          }
          errorMessage={errors.clinicName}
          value={values.clinicName}
          onBlur={handleBlur}
          isRequired
        />
        <TextInput
          focusRingClassName="xs:ring-offset-white"
          labelKey={t("REFERRAL_FORM.INPUTS.VETERINARIAN_NAME")}
          forText="vetName"
          disabled={isSubmitting}
          name="vetName"
          type="text"
          placeHolder={t("REFERRAL_FORM.INPUTS.VETERINARIAN_NAME")}
          classes={{
            container: "col-span-2 lg:col-span-1",
            input: `placeholder:font-[400] border border-sand-pressed h-[48px]`
          }}
          onChange={(_value, event) => {
            handleChange(event);
          }}
          changeState={
            touched.vetName && errors.vetName
              ? InputChangeState.INVALID
              : InputChangeState.VALID
          }
          errorMessage={errors.vetName}
          value={values.vetName}
          onBlur={handleBlur}
          isRequired
        />
        <TextInput
          forText="vetEmail"
          placeHolder={t("REFERRAL_FORM.INPUTS.EMAIL")}
          labelKey={t("REFERRAL_FORM.INPUTS.EMAIL")}
          name="vetEmail"
          classes={{
            container: "col-span-2 lg:col-span-1",
            input: "border-solid border-[1px] border-sand-pressed"
          }}
          focusRingClassName="xs:ring-offset-white"
          onChange={(_value, event) => {
            handleChange(event);
          }}
          changeState={
            touched.vetEmail && errors.vetEmail
              ? InputChangeState.INVALID
              : InputChangeState.VALID
          }
          errorMessage={errors.vetEmail}
          value={values.vetEmail}
          onBlur={handleBlur}
        />
        <TextInput
          forText="vetPhoneNumber"
          name="vetPhoneNumber"
          placeHolder={t("REFERRAL_FORM.INPUTS.PHONE_NUMBER")}
          labelKey={t("REFERRAL_FORM.INPUTS.PHONE_NUMBER")}
          classes={{
            container: "col-span-2 lg:col-span-1",
            input: "border-solid border-[1px] border-sand-pressed"
          }}
          focusRingClassName="xs:ring-offset-white"
          onChange={(_value, event) => {
            handleChange(event);
          }}
          changeState={
            touched.vetPhoneNumber && errors.vetPhoneNumber
              ? InputChangeState.INVALID
              : InputChangeState.VALID
          }
          errorMessage={errors.vetPhoneNumber}
          value={values.vetPhoneNumber}
          onBlur={handleBlur}
        />
      </div>
      <Paragraph type="body_1" className="block mt-[16px]">
        {t("REFERRAL_FORM.LINE_1")}
        <br />
        {t("REFERRAL_FORM.LINE_2")}
        <br />
        {t("REFERRAL_FORM.LINE_3")}
      </Paragraph>
    </div>
  );
};

export default StepVeterinarian;
