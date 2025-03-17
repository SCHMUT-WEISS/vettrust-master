/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextApiRequest, NextApiResponse } from "next";
import sgMail from "@sendgrid/mail";
import { referralsEMailTemplate } from "@somethingcreative-agency/vettrust-design_system";
import parseMultipartData from "../../../shared/utils/pages/parseMultipartData";

sgMail.setApiKey(process.env.SENDGRID_API_KEY as string);

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const data = await parseMultipartData(req);

    const {
      referrerPractice,
      referrerVetName,
      referrerEmail,
      referrerPhone,
      petOwnerNames,
      petOwnerPhone,
      petOwnerAddress,
      patientSpeciesRace,
      patientPetName,
      patientPetWeightKgs,
      patientBirthdate,
      patientAgeInYears,
      patientGender,
      bankTransferReason,
      bankTransferReturnTransferPer,
      preliminaryReport,
      preTreatment,
      formReceiverEmail,
    } = data.fields;

    if (
      !referrerPractice ||
      !referrerVetName ||
      !referrerEmail ||
      !referrerPhone ||
      !petOwnerNames ||
      !petOwnerPhone ||
      !petOwnerAddress ||
      !patientSpeciesRace ||
      !patientPetName ||
      !patientPetWeightKgs ||
      !patientAgeInYears ||
      !patientGender ||
      !bankTransferReason ||
      !bankTransferReturnTransferPer ||
      !preliminaryReport ||
      !preTreatment ||
      !formReceiverEmail
    ) {
      return res.status(400).json({
        error:
          "Required fields : [practiceName, formReceiverEmail, referrerPractice, referrerVetName, referrerEmail, referrerPhone, petOwnerNames, petOwnerPhone, petOwnerAddress, patientSpeciesRace, patientPetName, patientPetWeightKgs, patientAgeInYears, patientGender, bankTransferReason, bankTransferReturnTransferPer, preliminaryReport, preTreatment,]",
        data: data.fields,
      });
    }

    const msg = {
      to: formReceiverEmail,
      from: process.env.VETTRUST_INFO_EMAIL || "info@vettrust.ch",
      subject: `Neue Überweisung: ${petOwnerNames}`,
      html: referralsEMailTemplate({
        referrerPractice,
        referrerVetName,
        referrerEmail,
        referrerPhone,
        petOwnerNames,
        petOwnerPhone,
        petOwnerAddress,
        patientSpeciesRace,
        patientPetName,
        patientPetWeightKgs,
        patientBirthdate,
        patientAgeInYears,
        patientGender,
        bankTransferReason,
        bankTransferReturnTransferPer,
        preliminaryReport,
        preTreatment,
      }),
      attachments: data.files.map(file => ({
        content: file.base64,
        filename: file.originalFilename,
        type: "application/pdf",
        disposition: "attachment",
        content_id: file.fieldName,
      })),
    };

    await sgMail.send(msg as any);

    return res.status(201).json({ error: "" });
  } catch (error: any) {
    // eslint-disable-next-line no-console
    console.error(JSON.stringify(error, null, 2));
    const errorMessage = error?.response?.text;
    let textMessage = "Something went wrong";
    if (errorMessage && typeof errorMessage === "string") {
      textMessage = JSON.parse(errorMessage).detail;
    }

    return res.status(500).json({ error: textMessage });
  }
};

export const config = {
  api: {
    bodyParser: false,
  },
};
