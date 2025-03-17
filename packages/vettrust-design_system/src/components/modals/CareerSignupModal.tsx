/* eslint-disable @typescript-eslint/ban-ts-comment */
import React from "react";
import axios from "axios";
import { Formik } from "formik";
import { toast } from "react-toastify";
import { useAtom } from "jotai";
import {
  ComponentProps,
  VTAtom,
  FormSelectOption,
  InputChangeState,
  ModalsOptions,
  ModalsState,
  UseVtTranslateType
} from "../../@types";
import Section from "../shared/Section";
import Paragraph from "../shared/Paragraph";
import TextInput from "../inputs/TextInput";
import DragAndDropFileInput from "../inputs/DragAndDropFileInput";
import CheckboxInput from "../inputs/CheckboxInput";
import Button from "../shared/Button";
import urlEncodeObject from "../../shared/utils/pages/urlEncodeObject";
import SelectInput from "../inputs/SelectInput";
import { careerSignupSchema } from "../../shared/schemas";

const CareerSignupModal: React.FC<ComponentProps<CareerSignupProps>> = ({
  currentModalAtom,
  router,
  useVtTranslate,
  customUseAtom
}) => {
  const { t, i18n } = useVtTranslate("career");
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [resumes, setResumes] = React.useState<File[]>([]);
  const [, setCurrentModal] = customUseAtom(currentModalAtom);

  const POSITIONS: FormSelectOption[] = [
    {
      displayValue: t("SIGNUP.MODAL.POSITIONS.VETERINARIAN"),
      submitValue: "TierärztIn"
    },
    {
      displayValue: t("SIGNUP.MODAL.POSITIONS.VET_PRACTICE_ASSISTANT"),
      submitValue: "TierarztpraxisassistentIn"
    },
    {
      displayValue: t("SIGNUP.MODAL.POSITIONS.CARE_TEAM"),
      submitValue: "Care Team"
    },
    {
      displayValue: t("SIGNUP.MODAL.POSITIONS.ADMINISTRATION"),
      submitValue: "Administration"
    }
  ];

  const REGIONS = [
    {
      displayValue: t("SIGNUP.MODAL.REGIONS.ALL_REGIONS"),
      submitValue: "Alle Regionen"
    },
    {
      displayValue: t("SIGNUP.MODAL.REGIONS.BERN"),
      submitValue: "Bern"
    },
    {
      displayValue: t("SIGNUP.MODAL.REGIONS.ZURICH"),
      submitValue: "Zürich"
    },
    {
      displayValue: t("SIGNUP.MODAL.REGIONS.NORTH_WESTERN_SWITZERLAND"),
      submitValue: "Nordwestschweiz"
    },
    {
      displayValue: t("SIGNUP.MODAL.REGIONS.EASTERN_SWITZERLAND"),
      submitValue: "Ostschweiz"
    },
    {
      displayValue: t("SIGNUP.MODAL.REGIONS.CENTRAL_SWITZERLAND"),
      submitValue: "Zentralschweiz"
    }
  ];

  const initialValues = {
    email: "",
    name: "",
    position: POSITIONS[0].submitValue,
    region: REGIONS[0].submitValue,
    acceptedTerms: false
  };

  return (
    <Formik
      onSubmit={(values) => {
        const resumesToSubmit: Record<string, File> = {};
        resumes.forEach((resume, index) => {
          resumesToSubmit[`resume_${index}`] = resume;
        });

        setIsSubmitting(true);

        axios
          .post(
            "/api/career/signup",
            urlEncodeObject({
              ...values,
              ...resumesToSubmit,
              acceptedTerms: values.acceptedTerms ? "Yes" : "No",
              language: i18n.language
            })
          )
          .then(() => {
            setIsSubmitting(false);
            setCurrentModal({
              type: ModalsOptions.SIGNUP_SUCCESS,
              minWidth: "md"
            });
          })
          .catch(() => {
            setIsSubmitting(false);
            // @ts-ignore
            toast.error(t("SIGNUP.MODAL.SUBMISSION_ERROR")[0]);
          });
      }}
      validateOnChange
      initialValues={initialValues}
      validationSchema={careerSignupSchema(t, i18n)}
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
          values.email.length > 0 &&
          values.name.length > 0 &&
          values.position.length > 0 &&
          values.region.length > 0 &&
          values.acceptedTerms;

        return (
          <form
            name="Career Signup Form"
            data-netlify="true"
            data-netlify-honeypot="bot-field"
            className="bg-white grid lg:grid-cols-2 gap-[40px] lg:gap-[32px] default-radius p-[20px] lg:p-[40px] mt-[48px] lg:mt-[112px]"
          >
            <input type="hidden" name="form-name" value="Career Signup Form" />
            <p hidden>
              <label htmlFor="spam-detector">
                Don’t fill this out:{" "}
                <input name="bot-field" id="spam-detector" />
              </label>
            </p>
            <input
              type="hidden"
              name="subject"
              value={`Anmeldung zum Karrierenetzwerk: ${values.name}`}
            />
            <Section
              title={{
                text: t("SIGNUP.MODAL.TITLE"),
                level: "h3"
              }}
              className="p-[20px] lg:p-[40px]"
            >
              <Paragraph type="body_1" className="hidden md:block">
                {t("SIGNUP.MODAL.PARAGRAPH")}
              </Paragraph>
              <Paragraph type="body_2" className="md:hidden">
                {t("SIGNUP.MODAL.PARAGRAPH")}
              </Paragraph>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-[32px] mt-[24px]">
                <TextInput
                  focusRingClassName="xs:ring-offset-white"
                  labelKey={t("SIGNUP.MODAL.NAME_LABEL") as unknown as string}
                  forText="name"
                  disabled={isSubmitting}
                  name="name"
                  type="text"
                  placeHolder={
                    t("SIGNUP.MODAL.NAME_PLACEHOLDER") as unknown as string
                  }
                  classes={{
                    input: `placeholder:font-[400] border border-sand-pressed h-[48px]`
                    // container: "w-[560px]"
                  }}
                  onChange={(_value, event) => {
                    handleChange(event);
                  }}
                  changeState={
                    touched.name && errors.name
                      ? InputChangeState.INVALID
                      : InputChangeState.VALID
                  }
                  errorMessage={errors.name}
                  value={values.name}
                  onBlur={handleBlur}
                  isRequired
                />
                <TextInput
                  focusRingClassName="xs:ring-offset-white"
                  labelKey={t("SIGNUP.MODAL.EMAIL_LABEL") as unknown as string}
                  forText="email"
                  disabled={isSubmitting}
                  name="email"
                  type="text"
                  placeHolder={
                    t("SIGNUP.MODAL.EMAIL_PLACEHOLDER") as unknown as string
                  }
                  classes={{
                    input: `placeholder:font-[400] border border-sand-pressed h-[48px]`
                  }}
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
                  isRequired
                />

                <SelectInput
                  focusRingClassName="xs:ring-offset-white"
                  classes={{
                    input: `placeholder:font-[400] border border-sand-pressed`
                  }}
                  disabled={isSubmitting}
                  defaultValue={POSITIONS[0]}
                  onSelectedChange={(_value, event) => {
                    handleChange(event);
                    setTouched({ ...touched, position: true });
                  }}
                  forText="position"
                  options={POSITIONS}
                  labelKey={
                    t("SIGNUP.MODAL.POSITION_LABEL") as unknown as string
                  }
                  changeState={
                    touched.position && errors.position
                      ? InputChangeState.INVALID
                      : InputChangeState.VALID
                  }
                  selected={POSITIONS.find(
                    (el) => el.submitValue === values.position
                  )}
                  errorMessage={
                    i18n?.language === "de"
                      ? "Bitte wählen Sie eine Position aus"
                      : "Please select a position"
                  }
                  isRequired
                  onBlur={() => {
                    setTouched({ ...touched, position: true });
                  }}
                  useVtTranslate={useVtTranslate}
                />

                <SelectInput
                  focusRingClassName="xs:ring-offset-white"
                  classes={{
                    input: `placeholder:font-[400] border border-sand-pressed`
                  }}
                  disabled={isSubmitting}
                  defaultValue={REGIONS[0]}
                  onSelectedChange={(_value, event) => {
                    handleChange(event);
                    setTouched({ ...touched, region: true });
                  }}
                  forText="region"
                  options={REGIONS}
                  labelKey={t("SIGNUP.MODAL.REGION_LABEL") as unknown as string}
                  selected={REGIONS.find(
                    (el) => el.submitValue === values.region
                  )}
                  changeState={
                    touched.region && errors.region
                      ? InputChangeState.INVALID
                      : InputChangeState.VALID
                  }
                  errorMessage={errors.region}
                  isRequired
                  // onBlur={handleBlur}
                  useVtTranslate={useVtTranslate}
                />
              </div>
              <div className="mt-[32px]">
                <div>
                  <span className="font-semibold text-[16px] md:text-base text-dark-1 font-NotoSans">
                    {t("SIGNUP.MODAL.RESUME_LABEL") as unknown as string}{" "}
                  </span>
                  <span className="text-lightBlue-1.5 text-[16px] font-NotoSans">
                    (optional)
                  </span>
                </div>
                <DragAndDropFileInput
                  focusRingClassName="xs:ring-offset-white"
                  dragActiveText={
                    <span>{t("SIGNUP.MODAL.FILE_UPLOAD_ACTIVE_LABEL")}</span>
                  }
                  dragInactiveText={
                    <span>{t("SIGNUP.MODAL.FILE_UPLOAD_INACTIVE_LABEL")}</span>
                  }
                  onDragEnd={(files) => {
                    setResumes(files);
                  }}
                  classes={{
                    container: "mt-[12px] border-dashed p-[16px] h-fit",
                    dragActiveTextContainer: "text-darkblue text-center ",
                    dragInactiveTextContainer: "text-darkblue text-center"
                  }}
                  useVtTranslate={useVtTranslate}
                />
                <div className="flex flex-col lg:flex-row items-center justify-between mt-[24px]">
                  <CheckboxInput
                    disabled={false}
                    name="acceptedTerms"
                    labelText={
                      t(
                        "SIGNUP.MODAL.TERMS_AND_CONDITIONS_LABEL"
                      ) as unknown as string
                    }
                    isRequired
                    className=""
                    onChange={(_value, event) => {
                      handleChange(event);
                    }}
                    value={values.acceptedTerms}
                  />
                  <Button
                    type="PRIMARY"
                    size="lg"
                    iconLeft="Send"
                    className="mt-[32px] lg:mt-0 w-full lg:w-auto"
                    disabled={isSubmitting || !isFormValid}
                    onClick={submitForm}
                    isLoading={isSubmitting}
                    iconLeftClassName="w-[16px] h-[16px]"
                    focusRingClassName="xs:ring-offset-white"
                    router={router}
                  >
                    {t("SIGNUP.BUTTON")}
                  </Button>
                </div>
              </div>
            </Section>
          </form>
        );
      }}
    </Formik>
  );
};

interface CareerSignupProps {
  currentModalAtom: ReturnType<VTAtom<ModalsState["currentModal"]>["vTAtom"]>;
  useVtTranslate: UseVtTranslateType;
  router: any;
  customUseAtom: typeof useAtom;
}

export default CareerSignupModal;
