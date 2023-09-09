export const years = ((startYear = 1980) => {
  const currentYear = new Date().getFullYear();
  const allYears = [];

  for (let i = startYear; i <= currentYear; i++) {
    allYears.unshift(String(i));
  }

  const newAllYears = allYears.map((year) => ({ year_code: year, year_name: year }));

  return newAllYears;
})();

export const months = (() => {
  const allMonths = {
    1: "JANUARI",
    2: "FEBRUARI",
    3: "MARET",
    4: "APRIL",
    5: "MEI",
    6: "JUNI",
    7: "JULI",
    8: "AGUSTUS",
    9: "SEPTEMBER",
    10: "OKTOBER",
    11: "NOPEMBER",
    12: "DESEMBER",
  };

  const newAllMonths = Object.keys(allMonths).map((key) => ({
    month_code: key.padStart(2, "0"),
    month_name: allMonths[key],
  }));

  return newAllMonths;
})();
