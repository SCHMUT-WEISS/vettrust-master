import { Asset, Entry } from "contentful";
import { CfCollectionRoleType } from "./CFCollectionRoleType";

interface EmployeeFields {
  name: string;
  note: string;
  jobTitle: string;
  image: Asset;
  bio: string;
  quote: string;
  phoneNumber: string;
  email: string;
  role: CfCollectionRoleType[];
  certificates?: string[];
}

export type CfCollectionEmployee = Entry<EmployeeFields>;
