/**
 * Prefixes contentful url links with `https:`
 * @param url - the url to prefix
 */
export const formatURL = (url: string) =>
  (url ? `https:${url}` : undefined) as string;
