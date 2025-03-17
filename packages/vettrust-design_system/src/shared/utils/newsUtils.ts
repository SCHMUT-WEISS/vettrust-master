/* eslint-disable indent,security/detect-object-injection */

export const compareArticlesByDate = (a: any, b: any) => {
  if (!a.fields.publishedAt) return 1;
  if (!b.fields.publishedAt) return -1;

  const dateA = new Date(a.fields.publishedAt);
  const dateB = new Date(b.fields.publishedAt);

  return dateB.getTime() - dateA.getTime();
};