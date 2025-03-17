/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextApiRequest, NextApiResponse } from "next";
import mailchimp from "@mailchimp/mailchimp_marketing";

mailchimp.setConfig({
  apiKey: process.env.MAILCHIMP_API_KEY,
  server: process.env.MAILCHIMP_API_SERVER,
});

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const name = req.body.NAME;
  const email = req.body.EMAIL;

  if (!email) {
    return res.status(400).json({ error: "Email is required" });
  }

  const data = {
    email_address: email,
    status: "subscribed",
    merge_fields: {
      NAME: name,
    },
  };

  try {
    await mailchimp.lists.addListMember(
      process.env.MAILCHIMP_AUDIENCE_ID as string,
      data as any
    );

    return res.status(201).json({ error: "" });
  } catch (error: any) {
    // eslint-disable-next-line no-console
    console.error(error);
    const errorMessage = error?.response?.text;
    let textMessage = "Something went wrong";
    if (errorMessage && typeof errorMessage === "string") {
      textMessage = JSON.parse(errorMessage).detail;
    }

    return res.status(500).json({ error: textMessage });
  }
};
