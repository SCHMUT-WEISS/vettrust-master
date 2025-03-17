/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextApiRequest, NextApiResponse } from "next";
import { client, getLocale } from "@somethingcreative-agency/vettrust-design_system";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { locale } = req.query;

  const locations = await client.getEntries({
    content_type: "collection__locations",
    include: 3,
    locale: getLocale(locale as string),
  });

  return res
    .status(201)
    .json({ error: "", message: "Ok", data: locations.items });
};
