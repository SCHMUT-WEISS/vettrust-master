import { Entry } from "contentful";

export enum RoleTypeSearchKeys {
  VETS = "TierärztInnen",
  SPECIALISTS = "SpezialistInnen",
  VET_ASSISTANTS = "Tiermedizinische PraxisassistentInnen",
  TRAINEES = "PraktikantIn",
  BOARD_OF_DOCTORS = "Vorstand",
  OTHER_EMPLOYEES = "Weitere MitarbeiterInnen",
  DOG_HAIRDRESSER = "Hundecoiffeusen",
}

interface RoleTypeFields {
  name: string;
  sortingIndex: number;
  serachKey: RoleTypeSearchKeys;
}

export type CfCollectionRoleType = Entry<RoleTypeFields>;
