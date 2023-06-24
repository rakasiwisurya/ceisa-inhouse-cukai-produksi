export const snakeToCamelCase = (string) => {
  return string.replace(/(?!^)_(.)/g, (_, char) => char.toUpperCase());
};
