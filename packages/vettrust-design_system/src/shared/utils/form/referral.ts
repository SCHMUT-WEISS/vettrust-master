import { FormSelectOption, VTTranslateFx } from "../../../@types";

export const DEPARTMENTS_VALUES: FormSelectOption[] = [
  {
    submitValue: "internal_medicine",
    displayValue: "INTERNAL_MEDICINE"
  },
  {
    submitValue: "radiology",
    displayValue: "RADIOLOGY"
  },
  {
    submitValue: "neurology_behavioral_medicine",
    displayValue: "NEUROLOGY_BEHAVIORAL_MEDICINE"
  },
  {
    submitValue: "surgery",
    displayValue: "SURGERY"
  },
  {
    submitValue: "sports_pain",
    displayValue: "SPORTS_PAIN"
  },
  {
    submitValue: "dentistry",
    displayValue: "DENTISTRY"
  },
  {
    submitValue: "cardiology",
    displayValue: "CARDIOLOGY"
  },
  {
    submitValue: "ophthalmology",
    displayValue: "OPHTHALMOLOGY"
  },
  {
    submitValue: "emergency",
    displayValue: "EMERGENCY_INPATIENT"
  }
];

export const DEPARTMENTS_WITH_CUSTOM_FIELDS: string[] = [
  "internal_medicine",
  "neurology_behavioral_medicine",
  "surgery",
  "dentistry",
  "cardiology",
  "radiology"
];

export const BINARY_CHECKBOXES_VALUES: FormSelectOption[] = [
  {
    submitValue: "1",
    displayValue: "YES"
  },
  {
    submitValue: "0",
    displayValue: "NO"
  }
];

export const BINARY_WITH_UNKNOWN_CHECKBOXES_VALUES: FormSelectOption[] = [
  {
    submitValue: "1",
    displayValue: "YES"
  },
  {
    submitValue: "0",
    displayValue: "NO"
  },
  {
    submitValue: "unknown",
    displayValue: "UNKNOWN"
  }
];

export const INDICATION_CHECKBOXES_VALUES: FormSelectOption[] = [
  {
    submitValue: "1",
    displayValue: "YES"
  },
  {
    submitValue: "0",
    displayValue: "NO"
  },
  {
    submitValue: "with_indication",
    displayValue: "WITH_INDICATION"
  }
];

export const SEDATION_CHECKBOXES_VALUES: FormSelectOption[] = [
  {
    submitValue: "1",
    displayValue: "YES"
  },
  {
    submitValue: "0",
    displayValue: "NO"
  },
  {
    submitValue: "uncertainty",
    displayValue: "UNCERTAINTY"
  }
];

export const DEPARTMENTS_RADIOLOGY_VALUES: FormSelectOption[] =
  DEPARTMENTS_VALUES.filter((department) =>
    ["internal_medicine", "surgery", "neurology_behavioral_medicine"].includes(
      department.submitValue
    )
  );

export const GENDER_VALUES: FormSelectOption[] = [
  {
    submitValue: "f",
    displayValue: "FEMALE"
  },
  {
    submitValue: "m",
    displayValue: "MALE"
  }
];

export const useSelectOptionsHandle = (t: VTTranslateFx) => {
  return (option: FormSelectOption): FormSelectOption => ({
    submitValue: option.submitValue,
    displayValue: t(`REFERRAL_FORM.INPUTS.${option.displayValue}`)
  });
};

export default {
  BINARY_WITH_UNKNOWN_CHECKBOXES_VALUES,
  DEPARTMENTS_VALUES,
  DEPARTMENTS_WITH_CUSTOM_FIELDS,
  BINARY_CHECKBOXES_VALUES,
  DEPARTMENTS_RADIOLOGY_VALUES,
  GENDER_VALUES,
  INDICATION_CHECKBOXES_VALUES,
  SEDATION_CHECKBOXES_VALUES
};
