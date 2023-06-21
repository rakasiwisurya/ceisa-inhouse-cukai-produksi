export const years = (startYear = 1980) => {
  const currentYear = new Date().getFullYear();
  const allYears = [];

  for (let i = startYear; i <= currentYear; i++) {
    allYears.unshift(i);
  }

  const newAllYears = allYears.map((year) => ({ year_code: year, year_name: year }));

  return newAllYears;
};
