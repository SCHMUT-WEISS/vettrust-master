/* eslint-disable @typescript-eslint/no-explicit-any,security/detect-unsafe-regex,no-console */
import { NextApiRequest, NextApiResponse } from "next";
import sgMail from "@sendgrid/mail";
import {
  client,
  CFPageCareer,
  careerSignupEMailTemplate,
} from "@somethingcreative-agency/vettrust-design_system";
import parseMultipartData from "../../../shared/utils/pages/parseMultipartData";
import careerSignupThankYouEmail from "../../../shared/utils/emails/careerSignupThankYou";

sgMail.setApiKey(process.env.SENDGRID_API_KEY as string);

type Language = "en" | "de" | "fr";

function getLocale(language: string): Language {
  const languages: Language[] = ["en", "de", "fr"];

  return languages.find(supported => language === supported) ?? "en";
}

const thankYouSubject: Record<Language, string> = {
  en: "Signup confirmation VetTrust career network",
  de: "Anmeldebestätigung VetTrust Karrierenetzwerk",
  fr: "Confirmation d'inscription à la liste de distribution de VetTrust"
};

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const pageMeta = (
    await client.getEntries({
      content_type: "pages__career",
      include: 2,
    })
  ).items[0] as CFPageCareer;

  const positions = [
    "TierärztIn",
    "TierarztpraxisassistentIn",
    "Administration",
    "Care Team",
  ];
  const regions = [
    "Alle Regionen",
    "Bern",
    "Zürich",
    "Nordwestschweiz",
    "Ostschweiz",
    "Zentralschweiz",
  ];

  const data = await parseMultipartData(req);

  try {
    const { name, email, position, region } = data.fields;
    const language = getLocale(data.fields.language);

    if (!name || !email || !position || !region) {
      return res.status(400).json({
        error: "Missing required fields [name, email, position, region]",
      });
    }

    if (!positions.includes(position)) {
      return res
        .status(400)
        .json({ error: `Position must be one of ${positions.join(", ")}` });
    }

    if (!regions.includes(region)) {
      return res
        .status(400)
        .json({ error: `Region must be one of ${regions.join(", ")}` });
    }

    const msg = {
      to: pageMeta.fields.signupReceiverEmail,
      from: pageMeta.fields.signupSenderEmail,
      subject: `Anmeldung zum Karrierenetzwerk: ${name}`,
      html: careerSignupEMailTemplate(
        data.fields.name,
        data.fields.email,
        data.fields.position,
        data.fields.region
      ),
      attachments: data.files.map(file => ({
        content: file.base64,
        filename: file.originalFilename,
        type: "application/pdf",
        disposition: "attachment",
        content_id: file.fieldName,
      })),
    };

    const thankYouMsg = {
      to: email,
      from: pageMeta.fields.signupSenderEmail,
      replyTo: "hr@vettrust.ch",
      // eslint-disable-next-line security/detect-object-injection
      subject: thankYouSubject[language],
      // eslint-disable-next-line security/detect-object-injection
      html: careerSignupThankYouEmail[language],
    };



    await sgMail.send(msg as any);
    await sgMail.send(thankYouMsg as any);



    return res.status(201).json({ message: "Created", error: "" });
  } catch (error: any) {
    console.log("we reaching ->>");
    console.error(JSON.stringify(error, null, 2));
    return res
      .status(500)
      .json({ error: "Something went wrong, please try again" });
  }
};

export const config = {
  api: {
    bodyParser: false,
  },
};
