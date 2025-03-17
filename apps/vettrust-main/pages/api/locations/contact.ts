/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextApiRequest, NextApiResponse } from "next";
import sgMail from "@sendgrid/mail";
import { contactModalEMailTemplate } from "@somethingcreative-agency/vettrust-design_system";

sgMail.setApiKey(process.env.SENDGRID_API_KEY as string);

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const {
      petIsAlreadyPatient,
      breed,
      petName,
      ownerName,
      email,
      phoneNumber,
      message,
      locationContactEmail,
    } = req.body;

    if (
      !petIsAlreadyPatient ||
      !breed ||
      !petName ||
      !ownerName ||
      !email ||
      !message ||
      !locationContactEmail
    ) {
      return res.status(400).json({
        error:
          "Required fields : [locationContactEmail, petIsAlreadyPatient, breed, petName, ownerName, email, phoneNumber, message, ]",
        data: req.body,
      });
    }

    const msg = {
      to: locationContactEmail,
      from: process.env.VETTRUST_INFO_EMAIL || "info@vettrust.ch",
      subject: `Neues Kontaktformular: ${ownerName}`,
      html: contactModalEMailTemplate({
        petIsAlreadyPatient,
        breed,
        petName,
        ownerName,
        email,
        phoneNumber,
        message,
      }),
    };

    await sgMail.send(msg as any);

    return res.status(201).json({ error: "", message: "Created" });
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
