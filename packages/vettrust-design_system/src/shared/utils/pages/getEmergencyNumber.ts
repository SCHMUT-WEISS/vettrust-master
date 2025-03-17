/* eslint-disable no-console */
import { client } from "../contentful";
import { CFPageLocationCommonMetadata, VTPlatformURLS } from "../../../@types";

export async function getEmergencyNumber(platformUrl: VTPlatformURLS) {
  let pageMeta: CFPageLocationCommonMetadata["fields"] | null = null;
  try {
    const locationPageMeta = await client.getEntries<
      CFPageLocationCommonMetadata["fields"]
    >({
      content_type: "page__location",
      locale: "de",
      "fields.platformUrl": platformUrl,
    });

    pageMeta = locationPageMeta.items[0].fields;
  } catch (error) {
    console.log(error);
  }

  return pageMeta;
}
