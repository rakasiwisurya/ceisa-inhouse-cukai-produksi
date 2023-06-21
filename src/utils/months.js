export const months = () => {
  const allMonths = {
    1: "Januari",
    2: "Februari",
    3: "Maret",
    4: "April",
    5: "Mei",
    6: "Juni",
    7: "Juli",
    8: "Agustus",
    9: "September",
    10: "Oktober",
    11: "Nopember",
    12: "Desember",
  };

  const newAllMonths = Object.keys(allMonths).map((key) => ({
    month_code: key,
    month_name: allMonths[key],
  }));

  return newAllMonths;
};
