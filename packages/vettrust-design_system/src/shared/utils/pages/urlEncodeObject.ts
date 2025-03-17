/* eslint-disable security/detect-object-injection */

export default function urlEncodeObject(data: {
  [key: string]: string | File;
}) {
  const formData = new FormData();
  Object.keys(data).forEach(k => {
    formData.append(k, data[k]);
  });
  return formData;
}
