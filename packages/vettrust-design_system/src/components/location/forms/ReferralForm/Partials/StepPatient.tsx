/* eslint-disable sonarjs/cognitive-complexity */
import React from "react";
import { RadioGroup } from "@mui/material";
import {
  ComponentProps,
  InputChangeState,
  StepBasicnProps,
} from "../../../../../@types";
import { Paragraph } from "../../../../shared";
import { DatePickerInput, NumberInput, TextInput } from "../../../../inputs";
import RadioOptionsInput from "../../../../inputs/RadioOptionsInput";
import { BINARY_CHECKBOXES_VALUES, BINARY_WITH_UNKNOWN_CHECKBOXES_VALUES, GENDER_VALUES, useSelectOptionsHandle } from "../../../../../shared/utils/form/referral";

const StepPatient: React.FC<ComponentProps<StepBasicnProps>> = ({
  t,
  isSubmitting,
  touched,
  errors,
  values,
  handleChange,
  handleBlur
}) => {
  const selectOptionsHandler = useSelectOptionsHandle(t);

  return (
    <div className="step-3">
      <Paragraph type="body_1" className="hidden md:block">
        {t("REFERRAL_FORM.PATIENT_STEP_TITLE")}:
      </Paragraph>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-[32px] mt-[24px] justify-between">
        <TextInput
          focusRingClassName="xs:ring-offset-white"
          labelKey={t("REFERRAL_FORM.INPUTS.PATIENT_NAME")}
          forText="patientName"
          name="patientName"
          disabled={isSubmitting}
          type="text"
          placeHolder={t("REFERRAL_FORM.INPUTS.PATIENT_NAME")}
          classes={{
            container: "col-span-2 lg:col-span-1",
            input: `placeholder:font-[400] border border-sand-pressed h-[48px]`
          }}
          onChange={(_value, event) => {
            handleChange(event);
          }}
          changeState={
            touched.patientName && errors.patientName
              ? InputChangeState.INVALID
              : InputChangeState.VALID
          }
          errorMessage={errors.patientName}
          value={values.patientName}
          onBlur={handleBlur}
          isRequired
        />
        <TextInput
          focusRingClassName="xs:ring-offset-white"
          labelKey={t("REFERRAL_FORM.INPUTS.PATIENT_BREED")}
          forText="patientBreed"
          disabled={isSubmitting}
          name="patientBreed"
          type="text"
          placeHolder={t("REFERRAL_FORM.INPUTS.PATIENT_BREED")}
          classes={{
            container: "col-span-2 lg:col-span-1",
            input: `placeholder:font-[400] border border-sand-pressed h-[48px]`
          }}
          onChange={(_value, event) => {
            handleChange(event);
          }}
          changeState={
            touched.patientBreed && errors.patientBreed
              ? InputChangeState.INVALID
              : InputChangeState.VALID
          }
          errorMessage={errors.patientBreed}
          value={values.patientBreed}
          onBlur={handleBlur}
          isRequired
        />
        <TextInput
          forText="patientSpecies"
          name="patientSpecies"
          labelKey={t("REFERRAL_FORM.INPUTS.PATIENT_SPECIES")}
          placeHolder={t("REFERRAL_FORM.INPUTS.PATIENT_SPECIES")}
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
            touched.patientSpecies && errors.patientSpecies
              ? InputChangeState.INVALID
              : InputChangeState.VALID
          }
          errorMessage={errors.patientSpecies}
          value={values.patientSpecies}
          onBlur={handleBlur}
        />
        <DatePickerInput
          forText="patientBirthdate"
          name="patientBirthdate"
          labelKey={t("REFERRAL_FORM.INPUTS.PATIENT_BIRTHDATE")}
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
            touched.patientBirthdate && errors.patientBirthdate
              ? InputChangeState.INVALID
              : InputChangeState.VALID
          }
          errorMessage={errors.patientBirthdate}
          value={values.patientBirthdate}
          onBlur={handleBlur}
        />
        <NumberInput
          forText="patientWeight"
          name="patientWeight"
          labelKey={t("REFERRAL_FORM.INPUTS.PATIENT_WEIGHT")}
          placeHolder={t("REFERRAL_FORM.INPUTS.PATIENT_WEIGHT")}
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
            touched.patientWeight && errors.patientWeight
              ? InputChangeState.INVALID
              : InputChangeState.VALID
          }
          errorMessage={errors.patientWeight}
          value={values.patientWeight}
          onBlur={handleBlur}
        />
        <div className="flex flex-col col-span-2 sm:col-span-1">
          <span className="font-semibold text-[16px] md:text-base text-dark-1 mb-[12px] block font-NotoSans">
            {t("REFERRAL_FORM.INPUTS.GENDER")}
          </span>
          <RadioGroup row name="patientGender" className="flex gap-2">
            <RadioOptionsInput
              options={GENDER_VALUES.map(selectOptionsHandler)}
              value={values.patientGender}
              onChange={handleChange}
            />
          </RadioGroup>
        </div>
        <div className="flex flex-col col-span-2 sm:col-span-1">
          <span className="font-semibold text-[16px] md:text-base text-dark-1 mb-[12px] block font-NotoSans">
            {t("REFERRAL_FORM.INPUTS.TRAVEL")}
          </span>
          <RadioGroup row name="patientTravel" className="flex gap-2">
            <RadioOptionsInput
              options={BINARY_WITH_UNKNOWN_CHECKBOXES_VALUES.map(selectOptionsHandler)}
              value={values.patientTravel}
              onChange={handleChange}
            />
          </RadioGroup>
        </div>
        <div className="flex flex-col col-span-2 sm:col-span-1">
          <span className="font-semibold text-[16px] md:text-base text-dark-1 mb-[12px] block font-NotoSans">
            {t("REFERRAL_FORM.INPUTS.NEUTERED")}
          </span>
          <RadioGroup row name="patientNeutered" className="flex gap-2">
            <RadioOptionsInput
              options={BINARY_CHECKBOXES_VALUES.map(selectOptionsHandler)}
              value={values.patientNeutered}
              onChange={handleChange}
            />
          </RadioGroup>
        </div>
      </div>
    </div>
  );
};

export default StepPatient;
