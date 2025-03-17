/* eslint-disable no-underscore-dangle */
/* eslint-disable security/detect-object-injection */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextApiRequest, NextApiResponse } from "next";
import sgMail from "@sendgrid/mail";
import PDFDocument from "pdfkit";
import path from "path";
import {
  FormSelectOption,
  referralEmailTemplate,
  ReferralValues,
} from "@somethingcreative-agency/vettrust-design_system";
import { SSRConfig } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import parseMultipartData from "../../../shared/utils/pages/parseMultipartData";
import nextI18nextConfig from "../../../next-i18next.config";

let translations: SSRConfig;
let locale: string;
const {
  DEPARTMENTS_WITH_CUSTOM_FIELDS,
  DEPARTMENTS_VALUES,
  INDICATION_CHECKBOXES_VALUES,
  BINARY_WITH_UNKNOWN_CHECKBOXES_VALUES,
  SEDATION_CHECKBOXES_VALUES,
} = ReferralValues;

sgMail.setApiKey(process.env.SENDGRID_API_KEY as string);

const t = (key: string) => {
  if (translations?._nextI18Next) {
    const keys = key.split(".");
    let text = key;
    let obj = translations._nextI18Next.initialI18nStore[locale].referral;
    keys.forEach(k => {
      if (typeof obj[k] === "string") text = obj[k];
      else if (!obj[k]) text = key;
      else obj = obj[k];
    });
    return text;
  }

  return key;
};
const getLabel = (key: FormSelectOption | undefined, defaultValue: string) => {
  if (!key) return defaultValue;

  return t(`REFERRAL_FORM.INPUTS.${key.displayValue}`);
};

const generatePDF = (data: any) => {
  const textOnCenter = (doc: typeof PDFDocument, text: string) => {
    const pageWidth = doc.page.width;
    const textWidth = doc.widthOfString(text);
    const xPosition = (pageWidth - textWidth) / 2;
    doc.text(text, xPosition);
  };
  // eslint-disable-next-line sonarjs/cognitive-complexity
  return new Promise((resolve, reject) => {
    const doc = new PDFDocument({});
    const pdfChunks = [] as Buffer[];
    const pageWidth = doc.page.width;
    const imagePath = path.resolve("./public", "logo.png");
    const imageWidth = 160;
    let pageNumber = 1;

    const now = new Date().toLocaleDateString("de-DE");

    const footer = () => {
      const currentPosition = doc.y;
      const oldBottomMargin = doc.page.margins.bottom;
      doc.page.margins.bottom = 0;
      const dateWidth = doc.widthOfString(now);
      doc
        .fontSize(12)
        .text(
          `Pag. ${pageNumber}`,
          0.5 * (doc.page.width - 100),
          doc.page.height - 50,
          {
            width: 100,
            align: "center",
            lineBreak: false,
          }
        )
        .text(now, pageWidth - 50 - dateWidth, doc.page.height - 50, {
          width: dateWidth,
          align: "right",
          lineBreak: false,
        });
      doc.page.margins.bottom = oldBottomMargin;
      doc.y = currentPosition;
    };

    footer();
    doc.on("pageAdded", () => {
      pageNumber += 1;
      footer();
    });

    doc.on("data", (chunk: Buffer) => {
      pdfChunks.push(chunk);
    });

    doc.on("end", () => {
      const pdfBuffer = Buffer.concat(pdfChunks);
      resolve(pdfBuffer);
    });

    doc.on("error", (error: any) => reject(error));

    doc
      .image(imagePath, 50, 50, {
        width: imageWidth,
      })
      .moveDown(4)
      .fontSize(16)
      .text(
        `${t("REFERRAL_FORM.INPUTS.CLINIC_NAME")}: ${data.clinicName || ""}`,
        50
      )
      .moveDown()

      .fontSize(16);
    textOnCenter(doc, t("REFERRAL_FORM.VETERINARIAN_STEP_TITLE"));

    doc
      .fontSize(12)
      .moveDown()
      .text(
        `${t("REFERRAL_FORM.INPUTS.VETERINARIAN_NAME")}: ${data.vetName || ""}`,
        50
      )
      .text(`${t("REFERRAL_FORM.INPUTS.EMAIL")}: ${data.vetEmail || ""}`, 50)
      .text(
        `${t("REFERRAL_FORM.INPUTS.PHONE_NUMBER")}: ${
          data.vetPhoneNumber || ""
        }`,
        50
      )
      .moveDown();

    doc.fontSize(16);
    textOnCenter(doc, t("REFERRAL_FORM.OWNER_STEP_TITLE"));
    doc.fontSize(12).moveDown();

    doc
      .text(
        `${t("REFERRAL_FORM.INPUTS.OWNER_FIRST_NAME")}: ${
          data.ownerFirstName || ""
        }`,
        50
      )
      .text(
        `${t("REFERRAL_FORM.INPUTS.OWNER_LAST_NAME")}: ${
          data.ownerLastName || ""
        }`,
        50
      )
      .text(`${t("REFERRAL_FORM.INPUTS.EMAIL")}: ${data.ownerEmail || ""}`, 50)
      .text(
        `${t("REFERRAL_FORM.INPUTS.PHONE_NUMBER")}: ${
          data.ownerPhoneNumber || ""
        }`,
        50
      )
      .text(
        `${t("REFERRAL_FORM.INPUTS.OWNER_ADDRESS")}: ${
          data.ownerAddress || ""
        }`,
        50
      )
      .text(
        `${t("REFERRAL_FORM.INPUTS.OWNER_ZIP_CODE")}: ${
          data.ownerZipCode || ""
        }`,
        50
      )
      .text(
        `${t("REFERRAL_FORM.INPUTS.OWNER_CITY")}: ${data.ownerCity || ""}`,
        50
      )
      .moveDown();

    doc.fontSize(16);
    textOnCenter(doc, t("REFERRAL_FORM.PATIENT_STEP_TITLE"));
    doc.fontSize(12).moveDown();

    const patientTravel = BINARY_WITH_UNKNOWN_CHECKBOXES_VALUES.find(
      i => i.submitValue === data.patientTravel
    );

    doc
      .text(
        `${t("REFERRAL_FORM.INPUTS.PATIENT_NAME")}: ${data.patientName || ""}`,
        50
      )
      .text(
        `${t("REFERRAL_FORM.INPUTS.PATIENT_BREED")}: ${
          data.patientBreed || ""
        }`,
        50
      )
      .text(
        `${t("REFERRAL_FORM.INPUTS.PATIENT_SPECIES")}: ${
          data.patientSpecies || ""
        }`,
        50
      )
      .text(
        `${t("REFERRAL_FORM.INPUTS.PATIENT_BIRTHDATE")}: ${new Date(
          data.patientBirthdate || ""
        ).toLocaleDateString("de-DE")}`,
        50
      )
      .text(
        `${t("REFERRAL_FORM.INPUTS.GENDER")}: ${
          data.patientGender.toUpperCase() || ""
        }`,
        50
      )
      .text(
        `${t("REFERRAL_FORM.INPUTS.NEUTERED")}: ${
          data.patientNeutered
            ? t("REFERRAL_FORM.INPUTS.YES")
            : t("REFERRAL_FORM.INPUTS.NO")
        }`,
        50
      )
      .text(
        `${t("REFERRAL_FORM.INPUTS.PATIENT_WEIGHT")}: ${
          data.patientWeight || ""
        }`,
        50
      )
      .text(
        `${t("REFERRAL_FORM.INPUTS.TRAVEL")}: ${getLabel(
          patientTravel,
          data.patientTravel
        )}`,
        50
      )
      .moveDown();

    doc.fontSize(16);
    const department = DEPARTMENTS_VALUES.find(
      i => i.submitValue === data.department
    );
    textOnCenter(
      doc,
      `${t("REFERRAL_FORM.INPUTS.DEPARTMENT")}: ${getLabel(
        department,
        data.department
      )}`
    );
    doc.fontSize(12).moveDown();

    doc
      .text(
        `${t("REFERRAL_FORM.INPUTS.EMERGENCY")}: ${
          data.emergency
            ? t("REFERRAL_FORM.INPUTS.YES")
            : t("REFERRAL_FORM.INPUTS.NO")
        }`,
        50
      )
      .text(
        `${t("REFERRAL_FORM.INPUTS.URGENT")}: ${
          data.urgent
            ? t("REFERRAL_FORM.INPUTS.YES")
            : t("REFERRAL_FORM.INPUTS.NO")
        }`,
        50
      )
      .text(
        `${t("REFERRAL_FORM.INPUTS.ELECTIVE")}: ${
          data.elective
            ? t("REFERRAL_FORM.INPUTS.YES")
            : t("REFERRAL_FORM.INPUTS.NO")
        }`,
        50
      );

    if (data.remarks)
      doc.text(
        `${t("REFERRAL_FORM.INPUTS.REMARKS")}: ${data.remarks || ""}`,
        50
      );

    if (data.department === "radiology") {
      if (data.areaToBeExamined)
        doc.text(
          `${t("REFERRAL_FORM.INPUTS.AREA_TO_BE_EXAMINED")}: ${
            data.areaToBeExamined || ""
          }`,
          50
        );

      if (data.xRay) {
        const xRay = INDICATION_CHECKBOXES_VALUES.find(
          i => i.submitValue === data.xRay
        );
        doc.text(
          `${t("REFERRAL_FORM.INPUTS.XRAY")}: ${getLabel(xRay, data.xRay)}`,
          50
        );
      }

      if (data.abdomen)
        doc.text(`${t("REFERRAL_FORM.INPUTS.ABDOMEN")}: ${data.abdomen}`, 50);

      const fnas = INDICATION_CHECKBOXES_VALUES.find(
        i => i.submitValue === data.fnas
      );

      const cystocentesis = INDICATION_CHECKBOXES_VALUES.find(
        i => i.submitValue === data.cystocentesis
      );

      const sedationRequired = SEDATION_CHECKBOXES_VALUES.find(
        i => i.submitValue === data.sedationRequired
      );

      doc
        .text(
          `${t("REFERRAL_FORM.INPUTS.FNAS")}: ${getLabel(fnas, data.fnas)}`,
          50
        )
        .text(
          `${t("REFERRAL_FORM.INPUTS.CYSTOCENTESIS")}: ${getLabel(
            cystocentesis,
            data.cystocentesis
          )}`,
          50
        )
        .text(
          `${t("REFERRAL_FORM.INPUTS.SEDATION_REQUIRED")}: ${getLabel(
            sedationRequired,
            data.sedationRequired
          )}`,
          50
        );

      if (data.ct) {
        const ct = INDICATION_CHECKBOXES_VALUES.find(
          i => i.submitValue === data.ct
        );
        doc.text(
          `${t("REFERRAL_FORM.INPUTS.CT")}: ${getLabel(ct, data.ct)}`,
          50
        );
      }

      if (data.combinedWithAnotherConsultation)
        doc.text(
          `${t("REFERRAL_FORM.INPUTS.COMBINED_WITH_ANOTHER_CONSULTATION")}: ${
            data.combinedWithAnotherConsultation || ""
          }`,
          50
        );
    }

    if (DEPARTMENTS_WITH_CUSTOM_FIELDS.includes(data.department)) {
      if (data.suspectedDiagnosis)
        doc.text(
          `${t("REFERRAL_FORM.INPUTS.SUSPECTED_DIAGNOSIS")}: ${
            data.suspectedDiagnosis || ""
          }`,
          50
        );

      doc.text(
        `${t("REFERRAL_FORM.INPUTS.PRE_TREATMENT")}: ${
          data.preTreatment
            ? t("REFERRAL_FORM.INPUTS.YES")
            : t("REFERRAL_FORM.INPUTS.NO")
        }`,
        50
      );

      if (data.medication)
        doc.text(
          `${t("REFERRAL_FORM.INPUTS.MEDICATION")}: ${data.medication || ""}`,
          50
        );

      doc.text(
        `${t("REFERRAL_FORM.INPUTS.MEDICATION_HISTORY")} ${
          data.medicalHistoryValue ? t("REFERRAL_FORM.INPUTS.YES") : "N/A"
        }`,
        50
      );

      doc.text(
        `${t("REFERRAL_FORM.INPUTS.LABS_RESULTS_AVAILABLE")}: ${
          data.labsResultsAvailableValue ? t("REFERRAL_FORM.INPUTS.YES") : "N/A"
        }`,
        50
      );
      doc.text(
        `${t("REFERRAL_FORM.INPUTS.X_RAY_RESULTS_AVAILABLE")}: ${
          data.xRayResultsAvailableValue ? t("REFERRAL_FORM.INPUTS.YES") : "N/A"
        }`,
        50
      );
    }

    doc.end();
  });
};

const formatValue = (data: Record<string, string>) => {
  const values: Record<string, any> = {};
  const noFormat = ["patientWeight"];
  Object.keys(data).forEach(key => {
    if (noFormat.includes(key)) values[key] = data[key];
    else if (data[key] === "null") values[key] = null;
    else if (data[key] === "1") values[key] = true;
    else if (data[key] === "0") values[key] = false;
    else values[key] = data[key];
  });
  return values;
};

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    locale = nextI18nextConfig.i18n.defaultLocale;
    translations = await serverSideTranslations(locale, ["referral"], {
      ...nextI18nextConfig,
      i18n: {
        ...nextI18nextConfig.i18n,
        localeDetection: false,
      },
    });

    const data = await parseMultipartData(req);

    const { vetName, vetEmail, clinicName, patientName, department, urgent } =
      data.fields;
    if (!vetName || !vetEmail || !clinicName || !patientName || !urgent) {
      return res.status(400).json({
        error:
          "Missing required fields [vetName, vetEmail, clinicName, patientName, department, urgent]",
      });
    }

    let mailOptions = {};

    try {
      const date = new Date().toLocaleDateString("de-DE");

      const values = formatValue(data.fields);

      const pdf = (await generatePDF(values)) as Buffer;

      const departmentText = DEPARTMENTS_VALUES.find(
        i => i.submitValue === values.department
      );

      mailOptions = {
        to: process.env.MAILER_TO,
        from: process.env.MAILER_FROM,
        subject: `Neue Überweisung von ${vetName} Datum ${date}`,
        html: referralEmailTemplate({
          vetName,
          clinicName,
          patientName,
          department: departmentText
            ? t(`REFERRAL_FORM.INPUTS.${departmentText.displayValue}`)
            : department,
          urgent: urgent
            ? t("REFERRAL_FORM.INPUTS.YES")
            : t("REFERRAL_FORM.INPUTS.NO"),
          withHtml: true,
        }),
        attachments: [
          ...(data.files ?? []).map(file => ({
            content: file.base64,
            filename: file.originalFilename,
            content_id: file.fieldName,
          })),
          {
            filename: "referral.pdf",
            content: pdf.toString("base64"),
          },
        ],
      };

      await sgMail.send(mailOptions as any);

      res.status(200).json({ message: "Email sent successfully!" });
      return res;
    } catch (error: any) {
      console.error("mailOptions", mailOptions, error?.response?.body);

      return res.status(500).json(error);
    }
  }

  res.setHeader("Allow", ["POST"]);
  return res.status(405).end(`Method ${req.method} Not Allowed`);
};

export const config = {
  api: {
    bodyParser: false,
  },
};
