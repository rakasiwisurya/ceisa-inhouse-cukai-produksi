export const years = ((startYear = 1980) => {
  const currentYear = new Date().getFullYear();
  const allYears = [];

  for (let i = startYear; i <= currentYear; i++) {
    allYears.unshift(i);
  }

  const newAllYears = allYears.map((year) => ({ year_code: year, year_name: year }));

  return newAllYears;
})();

export const months = (() => {
  const allMonths = {
    JANUARY: "Januari",
    FEBRUARI: "Februari",
    MARET: "Maret",
    APRIL: "April",
    MEI: "Mei",
    JUNI: "Juni",
    JULI: "Juli",
    AGUSTUS: "Agustus",
    SEPTEMBER: "September",
    OKTOBER: "Oktober",
    NOPEMBER: "Nopember",
    DESEMBER: "Desember",
  };

  const newAllMonths = Object.keys(allMonths).map((key) => ({
    month_code: key,
    month_name: allMonths[key],
  }));

  return newAllMonths;
})();
