/* eslint-disable indent,security/detect-object-injection */
/**
 * Returns true if an array contains fully another array
 * @param {Array} source - the source array
 * @param {Array} target - the target array
 * @returns {boolean} -
 * * */
export const arrayContainsEvery = <T>(source: T[], target: T[]) =>
  target.every(v => source.includes(v));

/**
 * Returns true if an array contains partially another array
 * @param {Array} source - the source array
 * @param {Array} target - the target array
 * @returns {boolean} -
 * * */
export const arrayContainsSome = <T>(source: T[], target: T[]) =>
  target.some(v => source.includes(v));

const isPropValuesEqual = <T>(
  subject: T,
  target: T,
  propNames: Array<keyof T>
) => propNames.every(propName => subject[propName] === target[propName]);

/**
 * Returns array with unique items based on array of properties
 * @param items
 * @param propNames
 */
export const getUniqueItemsByProperties = <T>(
  items: T[],
  propNames: Array<keyof T>
) =>
  items.filter(
    (item, index, array) =>
      index ===
      array.findIndex(foundItem =>
        isPropValuesEqual(foundItem, item, propNames)
      )
  );

/**
 * Generates a random string
 * @param {string} sub - the substring length
 * @returns {string} -
 * * */
export const randomStringGenerator = (sub: number) =>
  Math.random().toString(36).substring(sub);

export const uniqueArray = <T>(a: T[]) => a.filter(function(item, pos, self) {
    return self.indexOf(item) === pos;
});
