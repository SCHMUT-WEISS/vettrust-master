import { Entry } from "contentful";
import { Document } from "@contentful/rich-text-types";
import { CFCollectionLocationType } from "./CFCollectionLocationType";
import { CFCollectionLocation } from "./CFClollectionLocation";

export interface AnnouncementFields {
  name: string;
  description: Document;
  locationType?: CFCollectionLocationType[];
  locations?: CFCollectionLocation[];
  blacklistedLocations?: CFCollectionLocation[];
}

export type CFCollectionAnnouncement = Entry<AnnouncementFields>;
