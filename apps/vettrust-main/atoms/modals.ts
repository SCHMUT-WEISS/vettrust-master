import { atom } from "jotai";
import { ModalsState } from "@somethingcreative-agency/vettrust-design_system";

/* General state for all modals */
export const currentModalAtom = atom<ModalsState["currentModal"]>({
  type: null,
  minWidth: "sm",
});
