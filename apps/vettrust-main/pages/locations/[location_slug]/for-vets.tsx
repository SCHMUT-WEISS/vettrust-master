/* eslint-disable camelcase,no-use-before-define,security/detect-object-injection,sonarjs/cognitive-complexity */
import { GetServerSidePropsContext } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import React, { useEffect } from "react";
import { useAtom } from "jotai";
import { useRouter } from "next/router";
import { Formik } from "formik";
import axios from "axios";
import { toast } from "react-toastify";
import {
  PageProps,
  CFCollectionLocation,
  BulletCard,
  NextJsStaticPath,
  CFPageLocationCommonMetadata,
  getDynamicPageSlugsStaticPaths,
  client,
  getContentfulLocale,
  getPlaceDetails,
  ComponentProps,
  Button,
  TextAreaInput,
  DragAndDropFileInput,
  SelectInput,
  TextInput,
  Heading,
  BulletCardsGrid,
  Paragraph,
  Section,
  NumberInput,
  InputChangeState,
  forVetsSchema,
  ModalsOptions,
  urlEncodeObject,
  IconsT as Icons,
  VTPlatformURLS,
} from "@somethingcreative-agency/vettrust-design_system";
import {
  currentlyDisplayedLocationAtom,
  locationGooglePlacesDataAtom,
} from "../../../atoms/locations";
import { navigationDynamicSlugListAtom } from "../../../atoms/navigation";
import useVtTranslate from "../../../shared/utils/useVtTranslate";
import { currentModalAtom } from "../../../atoms/modals";
import { currentPracticeSearchStepAtom } from "../../../atoms/practiceSearch";

const HorizontalDivider = () => {
  return <div className="w-full h-[1px] bg-sand-pressed" />;
};

const LocationForVetsPage = ({
  location,
  locale,
  slugsList,
}: ComponentProps<LocationForVetsPageProps>) => {
  const { t, i18n } = useVtTranslate("location-contact");
  const [, setCurrentModal] = useAtom(currentModalAtom);

  const router = useRouter();
  const [currentlyDisplayedLocation, setCurrentlyDisplayedLocation] = useAtom(
    currentlyDisplayedLocationAtom
  );

  const [locationsSlugList, setLocationsSlugList] = useAtom(
    navigationDynamicSlugListAtom
  );

  const [locationGooglePlacesData, setLocationGooglePlacesData] = useAtom(
    locationGooglePlacesDataAtom
  );

  const bulletsIcons: Array<keyof Icons> = ["Transfer", "Document", "Doctor"];

  const bulletCards = new Array(3).fill(null).map(
    (_, index) =>
      ({
        title: t("FOR_VETS.BULLET_CARDS_GRID.BULLETS.TITLE", {
          context: index + 1,
        }),
        description: t("FOR_VETS.BULLET_CARDS_GRID.BULLETS.DESCRIPTION", {
          context: index + 1,
        }),
        icon: bulletsIcons[index],
      } as BulletCard)
  );

  const RETURN_TRANSFER_CHOICES = [
    {
      displayValue: t("FOR_VETS.FORM.RETURN_TRANSFER_CHOICES.YES"),
      submitValue: "Ja",
    },
    {
      displayValue: t("FOR_VETS.FORM.RETURN_TRANSFER_CHOICES.NO"),
      submitValue: "Nein",
    },
  ];

  const initialState = {
    referrerPractice: "",
    referrerVetName: "",
    referrerEmail: "",
    referrerPhone: "",
    petOwnerNames: "",
    petOwnerPhone: "",
    petOwnerAddress: "",
    patientSpeciesRace: "",
    patientPetName: "",
    patientPetWeightKgs: "",
    patientBirthdate: "",
    patientAgeInYears: "",
    patientGender: "",
    bankTransferReason: "",
    bankTransferReturnTransferPer: "",
    preliminaryReport: "",
    preTreatment: "",
  };

  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [files, setFiles] = React.useState<File[]>([]);

  const [, setCurrentSearchStep] = useAtom(currentPracticeSearchStepAtom);

  const getGoogleData = async () => {
    try {
      const googlePlacesData = await getPlaceDetails(
        location.fields.googlePlaceId,
        location.sys.id,
        locale
      );

      setLocationGooglePlacesData(googlePlacesData);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(
    () => {
      if (!currentlyDisplayedLocation) {
        setCurrentlyDisplayedLocation(location.fields);
      }

      if (locationsSlugList.length === 0) {
        setLocationsSlugList(slugsList);
      }

      if (!locationGooglePlacesData) getGoogleData();

      if (!location.fields.isRadiusOfBasel || !location.fields.referalsEmail) {
        router.push(`/locations/${location.fields.slug}`);
      }

      return () => {
        setCurrentlyDisplayedLocation(null);
        setLocationsSlugList([]);
        setLocationGooglePlacesData(null);
        setCurrentSearchStep(null);
      };
    },
    // ⚠️ Don't update the dependency array, otherwise it goes into an infinite loop ⚠️
    // eslint-disable-next-line
    []
  );

  return (
    <Formik
      initialValues={initialState}
      onSubmit={(values, formikHelpers) => {
        const filesToSubmit: Record<string, File> = {};
        files.forEach((file, index) => {
          filesToSubmit[`file_${index}`] = file;
        });

        setIsSubmitting(true);

        axios
          .post(
            "/api/locations/for-vets",
            urlEncodeObject({
              ...values,
              formReceiverEmail: location.fields.referalsEmail,
              ...filesToSubmit,
            })
          )
          .then(() => {
            setIsSubmitting(false);
            setCurrentModal({
              type: ModalsOptions.SIGNUP_SUCCESS,
              minWidth: "md",
            });
            formikHelpers.resetForm();
          })
          .catch(() => {
            setIsSubmitting(false);
            toast.error(t("common:ERRORS.SOMETHING_WENT_WRONG"));
          });
      }}
      validationSchema={forVetsSchema(t, i18n)}
    >
      {({
        values,
        touched,
        errors,
        handleBlur,
        handleChange,
        isValid,
        submitForm,
        setTouched,
      }) => {
        const isFormValid =
          isValid &&
          Object.values(errors).length === 0 &&
          values.referrerPractice.length > 0 &&
          values.referrerVetName.length > 0 &&
          values.referrerEmail.length > 0 &&
          values.referrerPhone.length > 0 &&
          values.petOwnerNames.length > 0 &&
          values.petOwnerPhone.length > 0 &&
          values.petOwnerAddress.length > 0 &&
          values.patientSpeciesRace.length > 0 &&
          values.patientPetName.length > 0 &&
          values.patientPetWeightKgs.length > 0 &&
          values.patientAgeInYears.length > 0 &&
          values.patientGender.length > 0 &&
          values.bankTransferReason.length > 0 &&
          values.bankTransferReturnTransferPer.length > 0 &&
          values.preliminaryReport.length > 0 &&
          values.preTreatment.length > 0;

        return (
          <>
            <div className="container-wrapper mt-[144px] lg:mt-[176px] mb-[64px] lg:mb-[96px]">
              <Section
                title={{
                  text: t("FOR_VETS.HEADER.TITLE"),
                  level: "h1",
                }}
              >
                <Paragraph type="body_1">
                  {t("FOR_VETS.HEADER.DESCRIPTION")}
                </Paragraph>

                <Button
                  type="PRIMARY"
                  size="lg"
                  className="mt-[40px]"
                  iconRight="ArrowRight"
                  onClick={() => {
                    const heroElement = document.getElementById(
                      "for-vets-section-anchor"
                    );
                    heroElement?.scrollIntoView({
                      behavior: "smooth",
                      block: "start",
                    });
                  }}
                  router={router}
                >
                  {t("FOR_VETS.HEADER.BUTTON_LABEL")}
                </Button>
              </Section>
            </div>

            <BulletCardsGrid
              title={t("FOR_VETS.BULLET_CARDS_GRID.TITLE")}
              bulletCards={bulletCards}
              gridColumns={3}
              showBgCanvas
              bgCanvasPosition="right"
            />

            <div className="container-wrapper py-[80px]">
              <Section
                title={{
                  text: t("FOR_VETS.FORM.TITLE"),
                  level: "h2",
                }}
                className="py-[48px] lg:py-[112px]"
                id="for-vets-section-anchor"
              >
                <div className="mb-[48px]">
                  <Heading
                    level="h3"
                    text={t("FOR_VETS.FORM.REFERRER.TITLE")}
                  />

                  <div className="mt-[32px] mb-[48px] grid grid-cols-1 md:grid-cols-2 gap-[32px]">
                    <TextInput
                      forText="referrerPractice"
                      placeHolder={t(
                        "FOR_VETS.FORM.REFERRER.PRACTICE_PLACEHOLDER"
                      )}
                      labelKey={t("FOR_VETS.FORM.REFERRER.PRACTICE_LABEL")}
                      isRequired
                      classes={{
                        input: `placeholder:font-[400] border border-sand-pressed h-[48px]`,
                      }}
                      onChange={(value, event) => {
                        handleChange(event);
                      }}
                      changeState={
                        touched.referrerPractice && errors.referrerPractice
                          ? InputChangeState.INVALID
                          : InputChangeState.VALID
                      }
                      errorMessage={errors.referrerPractice}
                      value={values.referrerPractice}
                      onBlur={handleBlur}
                    />

                    <TextInput
                      forText="referrerVetName"
                      placeHolder="Dr. Martina Musterfrau"
                      labelKey={t("FOR_VETS.FORM.REFERRER.VET_LABEL")}
                      isRequired
                      classes={{
                        input: `placeholder:font-[400] border border-sand-pressed h-[48px]`,
                      }}
                      onChange={(value, event) => {
                        handleChange(event);
                      }}
                      changeState={
                        touched.referrerVetName && errors.referrerVetName
                          ? InputChangeState.INVALID
                          : InputChangeState.VALID
                      }
                      errorMessage={errors.referrerVetName}
                      value={values.referrerVetName}
                      onBlur={handleBlur}
                    />

                    <TextInput
                      forText="referrerEmail"
                      placeHolder={t(
                        "FOR_VETS.FORM.REFERRER.EMAIL_PLACEHOLDER"
                      )}
                      labelKey={t("FOR_VETS.FORM.REFERRER.EMAIL_LABEL")}
                      isRequired
                      classes={{
                        input: `placeholder:font-[400] border border-sand-pressed h-[48px]`,
                      }}
                      onChange={(value, event) => {
                        handleChange(event);
                      }}
                      changeState={
                        touched.referrerEmail && errors.referrerEmail
                          ? InputChangeState.INVALID
                          : InputChangeState.VALID
                      }
                      errorMessage={errors.referrerEmail}
                      value={values.referrerEmail}
                      onBlur={handleBlur}
                    />

                    <TextInput
                      forText="referrerPhone"
                      placeHolder="+41 987 654"
                      labelKey={t("FOR_VETS.FORM.REFERRER.TELEPHONE_LABEL")}
                      isRequired
                      classes={{
                        input: `placeholder:font-[400] border border-sand-pressed h-[48px]`,
                      }}
                      onChange={(value, event) => {
                        handleChange(event);
                      }}
                      changeState={
                        touched.referrerPhone && errors.referrerPhone
                          ? InputChangeState.INVALID
                          : InputChangeState.VALID
                      }
                      errorMessage={errors.referrerPhone}
                      value={values.referrerPhone}
                      onBlur={handleBlur}
                    />
                  </div>

                  <HorizontalDivider />
                </div>

                <div className="mb-[48px]">
                  <Heading
                    level="h3"
                    text={t("FOR_VETS.FORM.PET_OWNER.TITLE")}
                  />

                  <div className="mt-[32px] mb-[48px]">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-[32px] mb-[32px]">
                      <TextInput
                        forText="petOwnerNames"
                        placeHolder="Max Mustermann"
                        labelKey={t("FOR_VETS.FORM.PET_OWNER.NAME_LABEL")}
                        isRequired
                        classes={{
                          input: `placeholder:font-[400] border border-sand-pressed h-[48px]`,
                        }}
                        onChange={(value, event) => {
                          handleChange(event);
                        }}
                        changeState={
                          touched.petOwnerNames && errors.petOwnerNames
                            ? InputChangeState.INVALID
                            : InputChangeState.VALID
                        }
                        errorMessage={errors.petOwnerNames}
                        value={values.petOwnerNames}
                        onBlur={handleBlur}
                      />

                      <TextInput
                        forText="petOwnerPhone"
                        placeHolder="+41 987 654"
                        labelKey={t("FOR_VETS.FORM.PET_OWNER.TELEPHONE_LABEL")}
                        isRequired
                        classes={{
                          input: `placeholder:font-[400] border border-sand-pressed h-[48px]`,
                        }}
                        onChange={(value, event) => {
                          handleChange(event);
                        }}
                        changeState={
                          touched.petOwnerPhone && errors.petOwnerPhone
                            ? InputChangeState.INVALID
                            : InputChangeState.VALID
                        }
                        errorMessage={errors.petOwnerPhone}
                        value={values.petOwnerPhone}
                        onBlur={handleBlur}
                      />
                    </div>
                    <TextInput
                      forText="petOwnerAddress"
                      placeHolder="Hauptstraße 27, 1099 Musterstadt"
                      labelKey={t("FOR_VETS.FORM.PET_OWNER.ADDRESS_LABEL")}
                      isRequired
                      classes={{
                        input: `placeholder:font-[400] border border-sand-pressed h-[48px]`,
                      }}
                      onChange={(value, event) => {
                        handleChange(event);
                      }}
                      changeState={
                        touched.petOwnerAddress && errors.petOwnerAddress
                          ? InputChangeState.INVALID
                          : InputChangeState.VALID
                      }
                      errorMessage={errors.petOwnerAddress}
                      value={values.petOwnerAddress}
                      onBlur={handleBlur}
                    />
                  </div>

                  <HorizontalDivider />
                </div>

                <div className="mb-[48px]">
                  <Heading level="h3" text={t("FOR_VETS.FORM.PATIENT.TITLE")} />

                  <div className="mt-[32px] mb-[48px] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[32px]">
                    <TextInput
                      forText="patientSpeciesRace"
                      placeHolder={t("FOR_VETS.FORM.PATIENT.BREED_PLACEHOLDER")}
                      labelKey={t("FOR_VETS.FORM.PATIENT.BREED_LABEL")}
                      isRequired
                      classes={{
                        input: `placeholder:font-[400] border border-sand-pressed h-[48px]`,
                      }}
                      onChange={(value, event) => {
                        handleChange(event);
                      }}
                      changeState={
                        touched.patientSpeciesRace && errors.patientSpeciesRace
                          ? InputChangeState.INVALID
                          : InputChangeState.VALID
                      }
                      errorMessage={errors.patientSpeciesRace}
                      value={values.patientSpeciesRace}
                      onBlur={handleBlur}
                    />

                    <TextInput
                      forText="patientPetName"
                      placeHolder="Rex"
                      labelKey={t("FOR_VETS.FORM.PATIENT.PET_NAME")}
                      isRequired
                      classes={{
                        input: `placeholder:font-[400] border border-sand-pressed h-[48px]`,
                      }}
                      onChange={(value, event) => {
                        handleChange(event);
                      }}
                      changeState={
                        touched.patientPetName && errors.patientPetName
                          ? InputChangeState.INVALID
                          : InputChangeState.VALID
                      }
                      errorMessage={errors.patientPetName}
                      value={values.patientPetName}
                      onBlur={handleBlur}
                    />

                    <NumberInput
                      forText="patientPetWeightKgs"
                      placeHolder="19.5"
                      labelKey={t("FOR_VETS.FORM.PATIENT.WEIGHT_LABEL")}
                      isRequired
                      classes={{
                        input: `placeholder:font-[400] border border-sand-pressed h-[48px]`,
                      }}
                      onChange={(value, event) => {
                        handleChange(event);
                      }}
                      changeState={
                        touched.patientPetWeightKgs &&
                        errors.patientPetWeightKgs
                          ? InputChangeState.INVALID
                          : InputChangeState.VALID
                      }
                      errorMessage={errors.patientPetWeightKgs}
                      value={values.patientPetWeightKgs}
                      onBlur={handleBlur}
                    />

                    <TextInput
                      forText="patientBirthdate"
                      placeHolder="03.09.2015"
                      labelKey={t("FOR_VETS.FORM.PATIENT.BIRTH_DATE_LABEL")}
                      onChange={(value, event) => {
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
                      forText="patientAgeInYears"
                      placeHolder="7"
                      labelKey={t("FOR_VETS.FORM.PATIENT.AGE_IN_YEARS_LABEL")}
                      isRequired
                      classes={{
                        input: `placeholder:font-[400] border border-sand-pressed h-[48px]`,
                      }}
                      onChange={(value, event) => {
                        handleChange(event);
                      }}
                      changeState={
                        touched.patientAgeInYears && errors.patientAgeInYears
                          ? InputChangeState.INVALID
                          : InputChangeState.VALID
                      }
                      errorMessage={errors.patientAgeInYears}
                      value={values.patientAgeInYears}
                      onBlur={handleBlur}
                    />

                    <TextInput
                      forText="patientGender"
                      placeHolder={t(
                        "FOR_VETS.FORM.PATIENT.GENDER_PLACEHOLDER"
                      )}
                      labelKey={t("FOR_VETS.FORM.PATIENT.GENDER_LABEL")}
                      isRequired
                      classes={{
                        input: `placeholder:font-[400] border border-sand-pressed h-[48px]`,
                      }}
                      onChange={(value, event) => {
                        handleChange(event);
                      }}
                      changeState={
                        touched.patientGender && errors.patientGender
                          ? InputChangeState.INVALID
                          : InputChangeState.VALID
                      }
                      errorMessage={errors.patientGender}
                      value={values.patientGender}
                      onBlur={handleBlur}
                    />
                  </div>

                  <HorizontalDivider />
                </div>

                <div className="mb-[48px]">
                  <Heading
                    level="h3"
                    text={t("FOR_VETS.FORM.BANk_TRANSFER.TITLE")}
                  />

                  <div className="my-[32px] grid grid-cols-1 md:grid-cols-2 gap-[32px]">
                    <TextInput
                      forText="bankTransferReason"
                      placeHolder={t(
                        "FOR_VETS.FORM.BANk_TRANSFER.REASON_PLACEHOLDER"
                      )}
                      labelKey={t("FOR_VETS.FORM.BANk_TRANSFER.REASON_LABEL")}
                      isRequired
                      classes={{
                        input: `placeholder:font-[400] border border-sand-pressed h-[48px]`,
                      }}
                      onChange={(value, event) => {
                        handleChange(event);
                      }}
                      changeState={
                        touched.bankTransferReason && errors.bankTransferReason
                          ? InputChangeState.INVALID
                          : InputChangeState.VALID
                      }
                      errorMessage={errors.bankTransferReason}
                      value={values.bankTransferReason}
                      onBlur={handleBlur}
                    />

                    <SelectInput
                      classes={{
                        input: `bg-white input`,
                      }}
                      forText="bankTransferReturnTransferPer"
                      labelKey={t(
                        "FOR_VETS.FORM.BANk_TRANSFER.RETURN_TRANSFER_LABEL"
                      )}
                      options={RETURN_TRANSFER_CHOICES}
                      className="placeholder:font-[400] border border-sand-pressed h-[48px]"
                      onSelectedChange={(value, event) => {
                        handleChange(event);
                      }}
                      changeState={
                        touched.bankTransferReturnTransferPer &&
                        errors.bankTransferReturnTransferPer
                          ? InputChangeState.INVALID
                          : InputChangeState.VALID
                      }
                      errorMessage={errors.bankTransferReturnTransferPer}
                      value={values.bankTransferReturnTransferPer}
                      onBlur={() => {
                        setTouched({
                          ...touched,
                          bankTransferReturnTransferPer: true,
                        });
                      }}
                      useVtTranslate={useVtTranslate}
                    />

                    <TextAreaInput
                      forText="preliminaryReport"
                      placeHolder={t(
                        "FOR_VETS.FORM.BANk_TRANSFER.PRELIMINARY_REPORT_PLACEHOLDER"
                      )}
                      labelKey={t(
                        "FOR_VETS.FORM.BANk_TRANSFER.PRELIMINARY_REPORT_LABEL"
                      )}
                      isRequired
                      classes={{
                        input: `placeholder:font-[400] border border-sand-pressed h-[48px]`,
                      }}
                      onChange={(value, event) => {
                        handleChange(event);
                      }}
                      changeState={
                        touched.preliminaryReport && errors.preliminaryReport
                          ? InputChangeState.INVALID
                          : InputChangeState.VALID
                      }
                      errorMessage={errors.preliminaryReport}
                      value={values.preliminaryReport}
                      onBlur={handleBlur}
                    />

                    <TextAreaInput
                      forText="preTreatment"
                      placeHolder={t(
                        "FOR_VETS.FORM.BANk_TRANSFER.PRE_TREATMENT_PLACEHOLDER"
                      )}
                      labelKey={t("FOR_VETS.FORM.BANk_TRANSFER.PRE_TREATMENT")}
                      isRequired
                      classes={{
                        input: `placeholder:font-[400] border border-sand-pressed h-[48px]`,
                      }}
                      onChange={(value, event) => {
                        handleChange(event);
                      }}
                      changeState={
                        touched.preTreatment && errors.preTreatment
                          ? InputChangeState.INVALID
                          : InputChangeState.VALID
                      }
                      errorMessage={errors.preTreatment}
                      value={values.preTreatment}
                      onBlur={handleBlur}
                    />
                  </div>

                  <div>
                    <Paragraph type="label" className="font-NotoSans">
                      {t("FOR_VETS.FORM.BANk_TRANSFER.FILES_LABEL")}
                      <span className="text-lightBlue-1.5 font-NotoSans font-normal">
                        &nbsp;(optional)
                      </span>
                    </Paragraph>
                    <DragAndDropFileInput
                      dragActiveText={
                        <span>
                          {t(
                            "FOR_VETS.FORM.BANk_TRANSFER.FILE_UPLOAD_ACTIVE_LABEL"
                          )}
                        </span>
                      }
                      dragInactiveText={
                        <span>
                          {t(
                            "FOR_VETS.FORM.BANk_TRANSFER.FILE_UPLOAD_INACTIVE_LABEL"
                          )}
                        </span>
                      }
                      onDragEnd={files => {
                        setFiles(files);
                      }}
                      classes={{
                        container: "mt-[12px] border-dashed",
                        dragActiveTextContainer: "text-darkblue text-center",
                        dragInactiveTextContainer: "text-darkblue text-center",
                      }}
                      accept={{
                        "text/pdf": [".pdf"],
                        "image/*": [".jpg", ".jpeg", ".png", ".heic", ".dcm"],
                      }}
                      fileUploadErrorKey="location-contact:FOR_VETS.FORM.BANk_TRANSFER.FILE_UPLOAD_ERROR_LABEL"
                      useVtTranslate={useVtTranslate}
                    />
                  </div>
                </div>

                <div className="flex items-center justify-end">
                  <Button
                    type="PRIMARY"
                    size="lg"
                    iconLeft="Send"
                    disabled={isSubmitting || !isFormValid}
                    onClick={submitForm}
                    isLoading={isSubmitting}
                    router={router}
                  >
                    {t("FOR_VETS.FORM.SUBMIT_BUTTON_LABEL")}
                  </Button>
                </div>
              </Section>
            </div>
          </>
        );
      }}
    </Formik>
  );
};

export async function getStaticProps({
  locale,
  params: { location_slug },
}: GetServerSidePropsContext<any>) {
  const location = await client.getEntries<CFCollectionLocation["fields"]>({
    content_type: "collection__locations",
    "fields.slug": location_slug,
    locale: getContentfulLocale(locale as string),
    include: 3,
  });

  const slugsList = await getDynamicPageSlugsStaticPaths(
    "collection__locations",
    "location_slug",
    {
      "fields.platformUrl[in]": VTPlatformURLS.VETTRUST,
    }
  );

  return {
    props: {
      locale,
      location: location.items[0],
      slugsList,
      ...(await serverSideTranslations(locale as string, [
        "blog",
        "common",
        "about",
        "location-contact",
        "location",
        "referral"
      ])),
    },
  };
}

export async function getStaticPaths() {
  const paths = (
    await getDynamicPageSlugsStaticPaths(
      "collection__locations",
      "location_slug",
      {
        "fields.platformUrl[in]": VTPlatformURLS.VETTRUST,
      }
    )
  ).map(el => ({
    params: el.params,
    locale: el.locale,
  }));

  // We'll pre-render only these paths at build time.
  // { fallback: blocking } will server-render pages
  // on-demand if the path doesn't exist.
  return {
    paths: paths || [],
    fallback: false,
  };
}

type LocationForVetsPageProps = PageProps<
  {
    location: CFCollectionLocation;
    slugsList: NextJsStaticPath[];
  },
  CFPageLocationCommonMetadata
>;

export default LocationForVetsPage;
