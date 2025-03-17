/* eslint-disable sonarjs/cognitive-complexity */
import React, { ChangeEvent } from "react";
import { RadioGroup } from "@mui/material";
import {
  ComponentProps,
  InputChangeState,
  StepDepartmentProps
} from "../../../../../@types";
import { Paragraph } from "../../../../shared";
import {
  DragAndDropFileInput,
  SelectInput,
  TextInput
} from "../../../../inputs";
import RadioOptionsInput from "../../../../inputs/RadioOptionsInput";
import {
  BINARY_CHECKBOXES_VALUES,
  DEPARTMENTS_RADIOLOGY_VALUES,
  DEPARTMENTS_VALUES,
  DEPARTMENTS_WITH_CUSTOM_FIELDS,
  useSelectOptionsHandle,
  INDICATION_CHECKBOXES_VALUES,
  SEDATION_CHECKBOXES_VALUES
} from "../../../../../shared/utils/form/referral";
import CheckboxOptionsInput from "../../../../inputs/CheckboxOptionsInput";

const StepDepartment: React.FC<ComponentProps<StepDepartmentProps>> = ({
  t,
  isSubmitting,
  touched,
  errors,
  values,
  handleChange,
  handleBlur,
  useVtTranslate,
  setFiles,
  currentFiles
}) => {
  const selectOptionsHandler = useSelectOptionsHandle(t);

  const filesHandler = (key: string) => (files: File[]) => {
    setFiles({ ...currentFiles, [key]: [...files, ...currentFiles[key]] });
  };

  return (
    <div className="step-4">
      {/* <Paragraph type="body_1" className="hidden md:block">
        {t("REFERRAL_FORM.DEPARTURE_STEP_TITLE")}:
      </Paragraph> */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-[32px] mt-[24px]">
        <SelectInput
          useVtTranslate={useVtTranslate}
          options={DEPARTMENTS_VALUES.map(selectOptionsHandler)}
          focusRingClassName="xs:ring-offset-white"
          labelKey={t("REFERRAL_FORM.INPUTS.DEPARTMENT")}
          forText="department"
          name="department"
          disabled={isSubmitting}
          type="text"
          placeHolder={t("REFERRAL_FORM.INPUTS.DEPARTMENT")}
          classes={{
            input: `placeholder:font-[400] border border-sand-pressed h-[48px]`,
            container: "col-span-2"
          }}
          selected={
            values.department
              ? {
                  submitValue: values.department,
                  displayValue: values.department
                }
              : undefined
          }
          onSelectedChange={(event) => {
            handleChange({
              target: {
                id: "department",
                name: "department",
                value: event.submitValue
              }
            } as ChangeEvent<HTMLInputElement>);
          }}
          changeState={
            touched.department && errors.department
              ? InputChangeState.INVALID
              : InputChangeState.VALID
          }
          errorMessage={errors.department}
          value={values.department}
          onBlur={handleBlur}
        />
        <div className="flex flex-col flex col-span-2 sm:col-span-1">
          <span className="font-semibold text-[16px] md:text-base text-dark-1 mb-[8px] block font-NotoSans">
            {t("REFERRAL_FORM.INPUTS.EMERGENCY")}
          </span>
          <span className="text-[14px] md:text-sm mb-[12px] block font-NotoSans">
            {t("REFERRAL_FORM.INPUTS.EMERGENCY_DESCRIPTION")}
          </span>
          <RadioGroup row name="emergency" className="flex flex-wrap gap-2">
            <RadioOptionsInput
              options={BINARY_CHECKBOXES_VALUES.map(selectOptionsHandler)}
              value={values.emergency}
              onChange={handleChange}
            />
          </RadioGroup>
          {values.emergency === "1" && (
            <span className="font-semibold text-[16px] md:text-base text-dark-1 my-[12px] block font-NotoSans">
              {t("REFERRAL_FORM.EMERGENCY_DESCRIPTION")}
            </span>
          )}
        </div>
        <div className="flex flex-col col-span-2 sm:col-span-1">
          <span className="font-semibold text-[16px] md:text-base text-dark-1 mb-[8px] block font-NotoSans">
            {t("REFERRAL_FORM.INPUTS.URGENT")}
          </span>
          <span className="text-[14px] md:text-sm mb-[12px] block font-NotoSans">
            {t("REFERRAL_FORM.INPUTS.URGENT_DESCRIPTION")}
          </span>
          <RadioGroup row name="urgent" className="flex flex-wrap gap-2">
            <RadioOptionsInput
              options={BINARY_CHECKBOXES_VALUES.map(selectOptionsHandler)}
              value={values.urgent}
              onChange={handleChange}
            />
          </RadioGroup>
        </div>
        <div className="flex flex-col col-span-2 sm:col-span-1">
          <span className="font-semibold text-[16px] md:text-base text-dark-1 mb-[12px] block font-NotoSans">
            {t("REFERRAL_FORM.INPUTS.ELECTIVE")}
          </span>
          <RadioGroup row name="elective" className="flex flex-wrap gap-2">
            <RadioOptionsInput
              options={BINARY_CHECKBOXES_VALUES.map(selectOptionsHandler)}
              value={values.elective}
              onChange={handleChange}
            />
          </RadioGroup>
        </div>
        <div className="col-span-2 sm:col-span-1" />
        <TextInput
          labelKey={t("REFERRAL_FORM.INPUTS.REMARKS")}
          forText="remarks"
          name="remarks"
          placeHolder={t("REFERRAL_FORM.INPUTS.REMARKS")}
          classes={{
            container: values.department === "radiology" ? "" : "col-span-2",
            input: "border-solid border-[1px] border-sand-pressed"
          }}
          focusRingClassName="xs:ring-offset-white"
          onChange={(_value, event) => {
            handleChange(event);
          }}
          changeState={
            touched.remarks && errors.remarks
              ? InputChangeState.INVALID
              : InputChangeState.VALID
          }
          errorMessage={errors.remarks}
          value={values.remarks}
          onBlur={handleBlur}
        />

        {/* Radiology */}
        {values.department === "radiology" && (
          <>
            <TextInput
              focusRingClassName="xs:ring-offset-white"
              labelKey={t("REFERRAL_FORM.INPUTS.AREA_TO_BE_EXAMINED")}
              forText="areaToBeExamined"
              name="areaToBeExamined"
              disabled={isSubmitting}
              type="text"
              placeHolder={t("REFERRAL_FORM.INPUTS.AREA_TO_BE_EXAMINED")}
              classes={{
                container: "col-span-2 sm:col-span-1",
                input: `placeholder:font-[400] border border-sand-pressed h-[48px]`
              }}
              onChange={(_value, event) => {
                handleChange(event);
              }}
              changeState={
                touched.areaToBeExamined && errors.areaToBeExamined
                  ? InputChangeState.INVALID
                  : InputChangeState.VALID
              }
              errorMessage={errors.areaToBeExamined}
              value={values.areaToBeExamined}
              onBlur={handleBlur}
            />
            <TextInput
              focusRingClassName="xs:ring-offset-white"
              labelKey={`${t("REFERRAL_FORM.INPUTS.ABDOMEN")}: ${t(
                "REFERRAL_FORM.INPUTS.ABDOMEN_DESC"
              )}`}
              forText="abdomen"
              name="abdomen"
              disabled={isSubmitting}
              type="text"
              placeHolder={`${t("REFERRAL_FORM.INPUTS.ABDOMEN")}: ${t(
                "REFERRAL_FORM.INPUTS.ABDOMEN_DESC"
              )}`}
              classes={{
                container: "col-span-2 sm:col-span-1",
                input: `placeholder:font-[400] border border-sand-pressed h-[48px]`
              }}
              onChange={(_value, event) => {
                handleChange(event);
              }}
              changeState={
                touched.abdomen && errors.abdomen
                  ? InputChangeState.INVALID
                  : InputChangeState.VALID
              }
              errorMessage={errors.abdomen}
              value={values.abdomen}
              onBlur={handleBlur}
            />
            <div className="flex flex-col col-span-2 sm:col-span-1">
              <span className="font-semibold text-[16px] md:text-base text-dark-1 mb-[12px] block font-NotoSans">
                {t("REFERRAL_FORM.INPUTS.FNAS")}
              </span>
              <RadioGroup row name="fnas" className="flex flex-wrap gap-2">
                <RadioOptionsInput
                  options={INDICATION_CHECKBOXES_VALUES.map(
                    selectOptionsHandler
                  )}
                  value={values.fnas}
                  onChange={handleChange}
                />
              </RadioGroup>
            </div>
            <div className="flex flex-col col-span-2 sm:col-span-1">
              <span className="font-semibold text-[16px] md:text-base text-dark-1 mb-[12px] block font-NotoSans">
                {t("REFERRAL_FORM.INPUTS.CYSTOCENTESIS")}
              </span>
              <RadioGroup
                row
                name="cystocentesis"
                className="flex flex-wrap gap-2"
              >
                <RadioOptionsInput
                  options={INDICATION_CHECKBOXES_VALUES.map(
                    selectOptionsHandler
                  )}
                  value={values.cystocentesis}
                  onChange={handleChange}
                />
              </RadioGroup>
            </div>
            <div className="flex flex-col col-span-2 sm:col-span-1">
              <span className="font-semibold text-[16px] md:text-base text-dark-1 mb-[12px] block font-NotoSans">
                {t("REFERRAL_FORM.INPUTS.SEDATION_REQUIRED")}
              </span>
              <RadioGroup
                row
                name="sedationRequired"
                className="flex flex-wrap gap-2"
              >
                <RadioOptionsInput
                  options={SEDATION_CHECKBOXES_VALUES.map(
                    selectOptionsHandler
                  )}
                  value={values.sedationRequired}
                  onChange={handleChange}
                />
              </RadioGroup>
            </div>
            <div className="flex flex-col col-span-2 sm:col-span-1">
              <span className="font-semibold text-[16px] md:text-base text-dark-1 mb-[12px] block font-NotoSans">
                {t("REFERRAL_FORM.INPUTS.CT")}
              </span>
              <RadioGroup row name="ct" className="flex flex-wrap gap-2">
                <RadioOptionsInput
                  options={INDICATION_CHECKBOXES_VALUES.map(
                    selectOptionsHandler
                  )}
                  value={values.ct}
                  onChange={handleChange}
                />
              </RadioGroup>
            </div>
            <div className="flex flex-col col-span-2 sm:col-span-1">
              <span className="font-semibold text-[16px] md:text-base text-dark-1 mb-[12px] block font-NotoSans">
                {t("REFERRAL_FORM.INPUTS.XRAY")}
              </span>
              <div className="flex flex-wrap gap-2">
                <RadioGroup row name="xRay" className="flex flex-wrap gap-2">
                  <RadioOptionsInput
                    options={INDICATION_CHECKBOXES_VALUES.map(
                      selectOptionsHandler
                    )}
                    value={values.xRay}
                    onChange={handleChange}
                  />
                </RadioGroup>
              </div>
            </div>
          </>
        )}

        {DEPARTMENTS_WITH_CUSTOM_FIELDS.includes(values.department) && (
          <>
            <TextInput
              focusRingClassName="xs:ring-offset-white"
              labelKey={t("REFERRAL_FORM.INPUTS.SUSPECTED_DIAGNOSIS")}
              forText="suspectedDiagnosis"
              isRequired
              name="suspectedDiagnosis"
              disabled={isSubmitting}
              type="text"
              placeHolder={t("REFERRAL_FORM.INPUTS.SUSPECTED_DIAGNOSIS")}
              classes={{
                container: "col-span-2",
                input: `placeholder:font-[400] border border-sand-pressed h-[48px]`
              }}
              onChange={(_value, event) => {
                handleChange(event);
              }}
              changeState={
                touched.suspectedDiagnosis && errors.suspectedDiagnosis
                  ? InputChangeState.INVALID
                  : InputChangeState.VALID
              }
              errorMessage={errors.suspectedDiagnosis}
              value={values.suspectedDiagnosis}
              onBlur={handleBlur}
            />
            <div className="flex flex-col col-span-2 sm:col-span-1">
              <span className="font-semibold text-[16px] md:text-base text-dark-1 mb-[12px] block font-NotoSans">
                {t("REFERRAL_FORM.INPUTS.PRE_TREATMENT")}
                <span className="text-red-600 ml-[4px]">*</span>
              </span>
              <RadioGroup
                row
                name="preTreatment"
                className="flex flex-wrap gap-2"
              >
                <RadioOptionsInput
                  options={BINARY_CHECKBOXES_VALUES.map(selectOptionsHandler)}
                  value={values.preTreatment}
                  onChange={handleChange}
                />
              </RadioGroup>
            </div>
            {values.preTreatment === "1" && (
              <div className="col-span-2 sm:col-span-1">
                <TextInput
                  focusRingClassName="xs:ring-offset-white"
                  labelKey={t("REFERRAL_FORM.INPUTS.MEDICATION")}
                  forText="medication"
                  name="medication"
                  disabled={isSubmitting}
                  type="text"
                  placeHolder={t("REFERRAL_FORM.DOSAGE_DURATION")}
                  classes={{
                    input: `placeholder:font-[400] border border-sand-pressed h-[48px]`
                  }}
                  onChange={(_value, event) => {
                    handleChange(event);
                  }}
                  changeState={
                    touched.medication && errors.medication
                      ? InputChangeState.INVALID
                      : InputChangeState.VALID
                  }
                  errorMessage={errors.medication}
                  value={values.medication}
                  onBlur={handleBlur}
                />
              </div>
            )}
            {values.department === "radiology" && (
              <div className="flex flex-col col-span-2 sm:col-span-1">
                <span className="font-semibold text-[16px] md:text-base text-dark-1 mb-[12px] block font-NotoSans">
                  {t("REFERRAL_FORM.INPUTS.COMBINED_WITH_ANOTHER_CONSULTATION")}
                </span>
                <div className="flex flex-wrap gap-2">
                  <CheckboxOptionsInput
                    options={DEPARTMENTS_RADIOLOGY_VALUES.map(
                      selectOptionsHandler
                    )}
                    value={values.combinedWithAnotherConsultation}
                    onChange={handleChange}
                    name="combinedWithAnotherConsultation"
                  />
                </div>
              </div>
            )}
            <div className="flex flex-col col-span-2">
              <span className="font-semibold text-[16px] md:text-base text-dark-1 block font-NotoSans mb-[16px]">
                {t("REFERRAL_FORM.INPUTS.MEDICATION_HISTORY")}
              </span>
              <DragAndDropFileInput
                useVtTranslate={useVtTranslate}
                classes={{
                  container: "col-span-2 border-dashed h-fit",
                  textsContainer: "p-[16px]",
                  dragActiveTextContainer: "text-darkblue text-center ",
                  dragInactiveTextContainer: "text-darkblue text-center"
                }}
                dragActiveText={t("REFERRAL_FORM.DRAG_ACTIVE_TEXT")}
                dragInactiveText={t("REFERRAL_FORM.DRAG_INACTIVE_TEXT")}
                onDragEnd={filesHandler("medicalHistory")}
                focusRingClassName="xs:ring-offset-white"
                accept={{
                  "application/pdf": [".pdf"],
                  "image/*": [".png", ".jpg", ".jpeg"]
                }}
                fileUploadErrorKey="medicalHistory"
                withoutCleanup
              />
            </div>
            <div className="flex flex-col col-span-2">
              <div className="mb-[16px]">
                <span className="font-semibold text-[16px] md:text-base text-dark-1 block font-NotoSans mb-[16px]">
                  {t("REFERRAL_FORM.INPUTS.LABS_RESULTS_AVAILABLE")}
                </span>
                <RadioGroup
                  row
                  name="labsResultsAvailableValue"
                  className="flex flex-wrap gap-2"
                >
                  <RadioOptionsInput
                    options={BINARY_CHECKBOXES_VALUES.map(selectOptionsHandler)}
                    value={values.labsResultsAvailableValue}
                    onChange={handleChange}
                  />
                </RadioGroup>
              </div>
              <DragAndDropFileInput
                useVtTranslate={useVtTranslate}
                classes={{
                  container: "col-span-2 border-dashed h-fit",
                  textsContainer: "p-[16px]",
                  dragActiveTextContainer: "text-darkblue text-center",
                  dragInactiveTextContainer: "text-darkblue text-center"
                }}
                dragActiveText={t("REFERRAL_FORM.DRAG_ACTIVE_TEXT")}
                dragInactiveText={t("REFERRAL_FORM.DRAG_INACTIVE_TEXT")}
                onDragEnd={filesHandler("labsResultsAvailable")}
                focusRingClassName="xs:ring-offset-white"
                accept={{
                  "application/pdf": [".pdf"],
                  "image/*": [".png", ".jpg", ".jpeg"]
                }}
                fileUploadErrorKey="labsResultsAvailable"
                withoutCleanup
              />
            </div>
            <div className="flex flex-col col-span-2">
              <div className="mb-[16px]">
                <span className="font-semibold text-[16px] md:text-base text-dark-1 block font-NotoSans mb-[16px]">
                  {t("REFERRAL_FORM.INPUTS.X_RAY_RESULTS_AVAILABLE")}
                </span>
                <RadioGroup
                  row
                  name="xRayResultsAvailableValue"
                  className="flex flex-wrap gap-2"
                >
                  <RadioOptionsInput
                    options={BINARY_CHECKBOXES_VALUES.map(selectOptionsHandler)}
                    value={values.xRayResultsAvailableValue}
                    onChange={handleChange}
                  />
                </RadioGroup>
              </div>
              <DragAndDropFileInput
                useVtTranslate={useVtTranslate}
                classes={{
                  container: "col-span-2 border-dashed h-fit",
                  textsContainer: "p-[16px]",
                  dragActiveTextContainer: "text-darkblue text-center",
                  dragInactiveTextContainer: "text-darkblue text-center"
                }}
                dragActiveText={t("REFERRAL_FORM.DRAG_ACTIVE_TEXT")}
                dragInactiveText={t("REFERRAL_FORM.DRAG_INACTIVE_TEXT")}
                onDragEnd={filesHandler("xRayResultsAvailable")}
                focusRingClassName="xs:ring-offset-white"
                accept={{
                  "application/pdf": [".pdf"],
                  "image/*": [".png", ".jpg", ".jpeg"]
                }}
                fileUploadErrorKey="xRayResultsAvailable"
                withoutCleanup
              />
            </div>
            <Paragraph type="caption" className="col-span-2">
              {t("REFERRAL_FORM.UPLOAD_FILES_WARNING")}
            </Paragraph>
          </>
        )}
      </div>
    </div>
  );
};

export default StepDepartment;
