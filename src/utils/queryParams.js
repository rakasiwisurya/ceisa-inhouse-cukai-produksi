export const queryParams = (data) => {
  return `?${Object.keys(data)
    .map((key) => `${key}=${data[key]}`)
    .join("&")}`;
};
