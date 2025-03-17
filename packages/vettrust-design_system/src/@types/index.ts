/* eslint-disable @typescript-eslint/no-explicit-any,import/named,class-methods-use-this */
import { ReactNode } from "react";
import parse from "html-react-parser";
import { atom } from "jotai";
import * as icons from "../assets/icons";

/* Merges two types together
 * ex: type Props = Merge<React.HTMLAttributes<HTMLDivElement>, { children: ReactNode }>;
 *  */
export type Merge<A, B> = {
  [K in keyof A]: K extends keyof B ? B[K] : A[K];
} & B extends infer O
  ? { [K in keyof O]: O[K] }
  : never;

/* Generic for any component that should have optional children, className and id properties */
export type ComponentProps<
  T = Record<string, ReactNode | string | { [key: string]: any }>
> = Merge<{ children?: ReactNode; className?: string; id?: string }, T>;

/* A wrapper for the NextI18n translate function that parses  */
export type VTTranslateFx = (
  key: string,
  options?: Record<string, any>
) => ReturnType<typeof parse>;

export type VTI18n = any;

export interface MultipartyFileObject {
  fieldName: string;
  originalFilename: string;
  path: string;
  headers: Record<string, string>;
  size: number;
  base64: string;
}

export class VTAtom<T> {
  vTAtom(initialValue: T) {
    return atom<T>(initialValue);
  }
}

export type MenuItem = {
  key: string;
  pathname: string;
  title: any;
  description?: any;
  disabled: boolean;
  only?: string;
};

export type PageList = (t: VTTranslateFx) => MenuItem[];

export type UseVtTranslateType = (namespace?: string) => {
  t: VTTranslateFx;
  i18n: VTI18n;
};

export type IconsT = typeof icons;

/**
 * @TODO: Replace with env variables
 */
export enum VTPlatformURLS {
  VETTRUST = "vettrust.ch",
  CLINICA_ALPINA = "clinica-alpina.ch"
}

export * from "./components";
export * from "./atoms";
export * from "./content";
