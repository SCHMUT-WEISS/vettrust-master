/* eslint-disable security/detect-object-injection,prefer-destructuring,prefer-promise-reject-errors,array-callback-return,security/detect-non-literal-fs-filename */
import multiparty from "multiparty";
import { NextApiRequest } from "next";
import * as fs from "fs";
import { MultipartyFileObject } from "@somethingcreative-agency/vettrust-design_system";

export default async function parseMultipartData(req: NextApiRequest) {
  const form = new multiparty.Form();

  const data: {
    files: Record<string, MultipartyFileObject[]>;
    fields: Record<string, string[]>;
  } = await new Promise((resolve, reject) => {
    form.parse(req, (err, fields, files) => {
      if (err) reject({ err });
      resolve({ fields, files });
    });
  });

  const files: MultipartyFileObject[] = [];
  const fields: Record<string, string> = {};

  Object.keys(data.files).map(key => {
    const contents = fs.readFileSync(data.files[key][0].path, {
      encoding: "base64",
    });
    const newFile = data.files[key][0];
    newFile.base64 = contents;
    files.push(newFile);
  });

  Object.keys(data.fields).map(key => {
    fields[key] = data.fields[key][0];
  });

  return { files, fields };
}
