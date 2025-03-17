/* eslint-disable sonarjs/no-small-switch,indent */

export function getContentfulLocale(locale: string): string {
  switch (locale) {
    case "en":
      return "en-US";
    case "fr":
      return "fr";
    default:
      return "de";
  }
}
