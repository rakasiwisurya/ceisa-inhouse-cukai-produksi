import moment from "moment";

export const capitalize = (string, isLowerCaseFirst = true) => {
  if (!string) return string;
  const words = isLowerCaseFirst ? string.toLowerCase().split(" ") : string.split(" ");
  words[0] = words[0].charAt(0).toUpperCase() + words[0].slice(1);
  return words.join(" ");
};

export const formatDateFromExcelEpoch = (numericDate) => {
  if (!numericDate) return null;

  const date = moment("1899-12-30").add(numericDate, "days");
  return date.format("YYYY-MM-DD");
};
