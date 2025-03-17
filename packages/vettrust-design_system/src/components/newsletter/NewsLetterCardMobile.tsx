/* eslint-disable sonarjs/cognitive-complexity */
import React from "react";
import axios from "axios";
import { Formik } from "formik";
import { toast } from "react-toastify";

import {
  ComponentProps,
  UseVtTranslateType,
  InputChangeState
} from "../../@types";
import Section from "../shared/Section";
import Paragraph from "../shared/Paragraph";
import Button from "../shared/Button";
import TextInput from "../inputs/TextInput";
import { newsletterSubscription } from "../../shared/schemas";

const initialState = {
  EMAIL: "",
  NAME: ""
};

// eslint-disable-next-line no-use-before-define
const NewsLetterCardMobile: React.FC<ComponentProps<NewsLetterCardProps>> = ({
  className,
  type,
  useVtTranslate,
  router
}) => {
  const { t, i18n } = useVtTranslate("blog");
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  return (
    <Formik
      onSubmit={(values) => axios.post("/api/newsletter", values)}
      validateOnChange
      initialValues={initialState}
      validationSchema={newsletterSubscription(t, i18n)}
    >
      {({
        values,
        touched,
        errors,
        handleBlur,
        handleChange,
        isValid,
        submitForm,
        resetForm
      }) => {
        const isFormValid =
          isValid &&
          Object.values(errors).length === 0 &&
          values.EMAIL.length > 0 &&
          values.NAME.length > 0;

        return (
          <div
            className={`bg-white h-fit rounded-[12px] flex flex-col lg:flex-row ${className}`}
          >
            <Section
              title={{
                text: t("NEWS_PAGE.NEWS_LETTER.TITLE"),
                level: "h2"
              }}
              backgroundColor=""
              className="pt-[20px] pb-[27px] lg:py-[40px] pl-[20px] lg:pl-[40px] pr-[20px]"
            >
              <Paragraph type="body_1" className="w-full">
                {t("NEWS_PAGE.NEWS_LETTER.DESCRIPTION")}
              </Paragraph>
            </Section>

            <div className="pt-[103px] lg:pt-[40px] pb-[20px] lg:pb-[40px] pr-[20px] lg:pr-[40px] pl-[20px] lg:pl-[80px] lg:w-[44%] rounded-[12px] news-letter__news-bg-image-mobile">
              <TextInput
                forText="news-letter-name"
                disabled={isSubmitting}
                name="NAME"
                type="text"
                placeHolder={
                  t(
                    "NEWS_PAGE.NEWS_LETTER.FORM_NAME_PLACEHOLDER"
                  ) as unknown as string
                }
                classes={{
                  input: `placeholder:font-[400] ${
                    type === "home" || type === "blog"
                      ? "border border-sand-pressed"
                      : ""
                  }`
                }}
                onChange={(_value, event) => {
                  handleChange(event);
                }}
                changeState={
                  touched.NAME && errors.NAME
                    ? InputChangeState.INVALID
                    : InputChangeState.VALID
                }
                errorMessage={errors.NAME}
                value={values.NAME}
                onBlur={handleBlur}
                isRequired
              />
              <TextInput
                forText="EMAIL"
                disabled={isSubmitting}
                name="EMAIL"
                type="text"
                placeHolder={
                  t(
                    "NEWS_PAGE.NEWS_LETTER.FORM_EMAIL_PLACEHOLDER"
                  ) as unknown as string
                }
                classes={{
                  input: `placeholder:font-[400] ${
                    type === "home" || type === "blog"
                      ? "border border-sand-pressed"
                      : ""
                  }`,
                  container: "mt-[16px]"
                }}
                onChange={(_value, event) => {
                  handleChange(event);
                }}
                changeState={
                  touched.EMAIL && errors.EMAIL
                    ? InputChangeState.INVALID
                    : InputChangeState.VALID
                }
                errorMessage={errors.EMAIL}
                value={values.EMAIL}
                isRequired
                onBlur={handleBlur}
              />

              <Paragraph
                type="caption"
                className="text-[12px] text-lightBlue-pressed mt-[16px]"
              >
                {t("NEWS_PAGE.NEWS_LETTER.FORM_CAPTION")}
              </Paragraph>

              <Button
                type="PRIMARY"
                size="lg"
                className={`text-[16px] mt-[24px] w-fit lg:w-fit ${
                  isFormValid ? "cursor-pointer" : "cursor-no-drop"
                }`}
                disabled={isSubmitting || !isFormValid}
                iconLeft="Send"
                iconLeftClassName="w-[16px] h-[16px]"
                isLoading={isSubmitting}
                onClick={() => {
                  setIsSubmitting(true);
                  submitForm()
                    .then(() => {
                      setIsSubmitting(false);
                      toast.success(
                        // @ts-ignore
                        t("NEWS_PAGE.NEWS_LETTER.FORM_SUCCESS_MESSAGE")[0],
                        { autoClose: 6000 }
                      );
                      setTimeout(() => {
                        resetForm({ values: initialState });
                      }, 6000);
                    })
                    .catch((err) => {
                      setIsSubmitting(false);
                      toast.error(
                        err?.response?.data?.error || "Something went wrong",
                        { autoClose: 6000 }
                      );
                    });
                }}
                router={router}
              >
                {t("NEWS_PAGE.NEWS_LETTER.FORM_SUBMIT_BUTTON")}
              </Button>
            </div>
          </div>
        );
      }}
    </Formik>
  );
};

interface NewsLetterCardProps {
  type?: "blog" | "home";
  useVtTranslate: UseVtTranslateType;
  router: any;
}

export default NewsLetterCardMobile;
