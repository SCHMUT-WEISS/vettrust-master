/* eslint-disable sonarjs/cognitive-complexity */
import React from "react";
import {
  ComponentProps,
  InputChangeState,
  StepBasicnProps,
} from "../../../../../@types";
import { Paragraph } from "../../../../shared";
import { TextInput } from "../../../../inputs";

const StepOwner: React.FC<ComponentProps<StepBasicnProps>> = ({
  t,
  isSubmitting,
  touched,
  errors,
  values,
  handleChange,
  handleBlur
}) => {
  return (
    <div className="step-2">
      <Paragraph type="body_1" className="hidden md:block">
        {t("REFERRAL_FORM.OWNER_STEP_TITLE")}:
      </Paragraph>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-[32px] mt-[24px]">
        <TextInput
          focusRingClassName="xs:ring-offset-white"
          labelKey={t("REFERRAL_FORM.INPUTS.OWNER_FIRST_NAME")}
          forText="ownerFirstName"
          name="ownerFirstName"
          disabled={isSubmitting}
          type="text"
          placeHolder={t("REFERRAL_FORM.INPUTS.OWNER_FIRST_NAME")}
          classes={{
            container: "col-span-2 sm:col-span-1",
            input: `placeholder:font-[400] border border-sand-pressed h-[48px]`
          }}
          onChange={(_value, event) => {
            handleChange(event);
          }}
          changeState={
            touched.ownerFirstName && errors.ownerFirstName
              ? InputChangeState.INVALID
              : InputChangeState.VALID
          }
          errorMessage={errors.ownerFirstName}
          value={values.ownerFirstName}
          onBlur={handleBlur}
          isRequired
        />
        <TextInput
          focusRingClassName="xs:ring-offset-white"
          labelKey={t("REFERRAL_FORM.INPUTS.OWNER_LAST_NAME")}
          forText="ownerLastName"
          disabled={isSubmitting}
          name="ownerLastName"
          type="text"
          placeHolder={t("REFERRAL_FORM.INPUTS.OWNER_LAST_NAME")}
          classes={{
            container: "col-span-2 lg:col-span-1",
            input: `placeholder:font-[400] border border-sand-pressed h-[48px]`
          }}
          onChange={(_value, event) => {
            handleChange(event);
          }}
          changeState={
            touched.ownerLastName && errors.ownerLastName
              ? InputChangeState.INVALID
              : InputChangeState.VALID
          }
          errorMessage={errors.ownerLastName}
          value={values.ownerLastName}
          onBlur={handleBlur}
          isRequired
        />
        <TextInput
          forText="ownerEmail"
          name="ownerEmail"
          placeHolder={t("REFERRAL_FORM.INPUTS.EMAIL")}
          labelKey={t("REFERRAL_FORM.INPUTS.EMAIL")}
          isRequired
          classes={{
            container: "col-span-2 lg:col-span-1",
            input: "border-solid border-[1px] border-sand-pressed"
          }}
          focusRingClassName="xs:ring-offset-white"
          onChange={(_value, event) => {
            handleChange(event);
          }}
          changeState={
            touched.ownerEmail && errors.ownerEmail
              ? InputChangeState.INVALID
              : InputChangeState.VALID
          }
          errorMessage={errors.ownerEmail}
          value={values.ownerEmail}
          onBlur={handleBlur}
        />
        <TextInput
          forText="ownerPhoneNumber"
          name="ownerPhoneNumber"
          placeHolder={t("REFERRAL_FORM.INPUTS.PHONE_NUMBER")}
          labelKey={t("REFERRAL_FORM.INPUTS.PHONE_NUMBER")}
          isRequired
          classes={{
            container: "col-span-2 lg:col-span-1",
            input: "border-solid border-[1px] border-sand-pressed"
          }}
          focusRingClassName="xs:ring-offset-white"
          onChange={(_value, event) => {
            handleChange(event);
          }}
          changeState={
            touched.ownerPhoneNumber && errors.ownerPhoneNumber
              ? InputChangeState.INVALID
              : InputChangeState.VALID
          }
          errorMessage={errors.ownerPhoneNumber}
          value={values.ownerPhoneNumber}
          onBlur={handleBlur}
        />
        <TextInput
          forText="ownerAddress"
          name="ownerAddress"
          placeHolder={t("REFERRAL_FORM.INPUTS.OWNER_ADDRESS")}
          labelKey={t("REFERRAL_FORM.INPUTS.OWNER_ADDRESS")}
          classes={{
            container: "col-span-2 lg:col-span-1",
            input: "border-solid border-[1px] border-sand-pressed"
          }}
          focusRingClassName="xs:ring-offset-white"
          onChange={(_value, event) => {
            handleChange(event);
          }}
          changeState={
            touched.ownerAddress && errors.ownerAddress
              ? InputChangeState.INVALID
              : InputChangeState.VALID
          }
          errorMessage={errors.ownerAddress}
          value={values.ownerAddress}
          onBlur={handleBlur}
        />
        <TextInput
          forText="ownerZipCode"
          name="ownerZipCode"
          placeHolder={t("REFERRAL_FORM.INPUTS.OWNER_ZIP_CODE")}
          labelKey={t("REFERRAL_FORM.INPUTS.OWNER_ZIP_CODE")}
          classes={{
            container: "col-span-2 lg:col-span-1",
            input: "border-solid border-[1px] border-sand-pressed"
          }}
          focusRingClassName="xs:ring-offset-white"
          onChange={(_value, event) => {
            handleChange(event);
          }}
          changeState={
            touched.ownerZipCode && errors.ownerZipCode
              ? InputChangeState.INVALID
              : InputChangeState.VALID
          }
          errorMessage={errors.ownerZipCode}
          value={values.ownerZipCode}
          onBlur={handleBlur}
        />
        <TextInput
          forText="ownerCity"
          name="ownerCity"
          placeHolder={t("REFERRAL_FORM.INPUTS.OWNER_CITY")}
          labelKey={t("REFERRAL_FORM.INPUTS.OWNER_CITY")}
          classes={{
            container: "col-span-2 lg:col-span-1",
            input: "border-solid border-[1px] border-sand-pressed"
          }}
          focusRingClassName="xs:ring-offset-white"
          onChange={(_value, event) => {
            handleChange(event);
          }}
          changeState={
            touched.ownerCity && errors.ownerCity
              ? InputChangeState.INVALID
              : InputChangeState.VALID
          }
          errorMessage={errors.ownerCity}
          value={values.ownerCity}
          onBlur={handleBlur}
        />
      </div>
    </div>
  );
};

export default StepOwner;
