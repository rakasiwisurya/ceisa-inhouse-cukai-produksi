export const convertArrayExcelToTable = (excelArray) => {
  const [headers, ...rest] = excelArray;
  return rest.map((values) => {
    return Object.fromEntries(headers.map((header, index) => [header, values[index]]));
  });
};

export const alternativeConvertArrayExcelToTable = (excelArray) => {
  const headers = excelArray[0];
  const data = [];

  for (let i = 1; i < excelArray.length; i++) {
    const obj = {};
    const currentArray = excelArray[i];

    for (let j = 0; j < headers.length; j++) {
      obj[headers[j]] = currentArray[j];
    }

    data.push(obj);
  }

  return data;
};
