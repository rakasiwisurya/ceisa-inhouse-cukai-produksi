export const years = ((startYear = 1980) => {
  const currentYear = new Date().getFullYear();
  const allYears = [];

  for (let i = startYear; i <= currentYear; i++) {
    allYears.unshift(String(i));
  }

  const newAllYears = allYears.map((year) => ({ yearCode: year, yearName: year }));

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
    monthCode: key.padStart(2, "0"),
    monthName: allMonths[key],
  }));

  return newAllMonths;
})();
