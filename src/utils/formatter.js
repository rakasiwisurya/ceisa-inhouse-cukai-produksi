import moment from "moment";

export const capitalize = (string) => {
  if (!string) return string;
  const words = string.split(" ");
  words[0] = words[0].charAt(0).toUpperCase() + words[0].slice(1);
  return words.join(" ");
};

export const formatNumber = (number) => {
  return `${number}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

export const unFormatNumber = (number) => {
  return number.replace(/\$\s?|(,*)/g, "");
};

export const formatDateFromExcelEpoch = (numericDate) => {
  if (!numericDate) return null;

  const date = moment("1899-12-30").add(numericDate, "days");
  return date.format("YYYY-MM-DD");
};
