import { useAtom } from "jotai";
import * as articleAtoms from "../../atoms/articles";
import * as locationsAtoms from "../../atoms/locations";
import * as modalsAtoms from "../../atoms/modals";
import * as navigationAtoms from "../../atoms/navigation";
import * as practiceSearchAtoms from "../../atoms/practiceSearch";
import useVtTranslate from "./useVtTranslate";

export const allAtomsAndI18n = Object.freeze({
  ...articleAtoms,
  ...locationsAtoms,
  ...modalsAtoms,
  ...navigationAtoms,
  ...practiceSearchAtoms,
  useVtTranslate,
  customUseAtom: useAtom,
}) as any;
