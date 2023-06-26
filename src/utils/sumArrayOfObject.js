export const sumArrayOfObject = (array, objectKey) => {
  return array.reduce((acc, obj) => acc + obj[objectKey], 0);
};
