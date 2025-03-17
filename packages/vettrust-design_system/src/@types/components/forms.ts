import { UseVtTranslateType } from "..";

export interface ReferralFormValues {
  clinicName: string;
  vetName: string;
  vetEmail: string;
  vetPhoneNumber: string;

  ownerFirstName: string;
  ownerLastName: string;
  ownerEmail: string;
  ownerPhoneNumber: string;
  ownerAddress: string;
  ownerZipCode: string;
  ownerCity: string;

  patientName: string;
  patientBreed: string;
  patientSpecies: string;
  patientBirthdate: string;
  patientWeight: string;
  patientGender: string;
  patientNeutered: string;
  patientTravel: string;

  department: string;

  emergency: string;
  urgent: string;
  elective: string;

  remarks: string;

  // Radiology
  xRay: string;
  ct: string;
  abdomen: string;
  areaToBeExamined: string;
  fnas: string;
  cystocentesis: string;
  sedationRequired: string;
  combinedWithAnotherConsultation: string;

  // All
  suspectedDiagnosis: string;
  preTreatment: string;
  medication: string;

  labsResultsAvailableValue: string;
  xRayResultsAvailableValue: string;
}

export interface ReferralFormProps {
  useVtTranslate: UseVtTranslateType;
  router: any;
}
