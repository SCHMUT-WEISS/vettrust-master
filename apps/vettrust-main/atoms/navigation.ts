import { atom } from "jotai";
import { NextJsStaticPath } from "@somethingcreative-agency/vettrust-design_system";

/* States weather or not the navigation drawer should show */
export const navigationDisplayAtom = atom(false);

/* List of all dynamic slugs to use with the router object when switching language */
export const navigationDynamicSlugListAtom = atom<NextJsStaticPath[]>([]);
