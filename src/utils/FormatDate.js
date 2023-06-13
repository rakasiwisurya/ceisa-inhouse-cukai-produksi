import moment from "moment";

export const momentDate = (
  d = "",
  pattern_1 = "",
  pattern_2 = "",
) => {
  if (!d) return "";
  let isValid = false;
  let inputPattern = pattern_2 ? pattern_1 : "";
  let outputPattern = pattern_2 || pattern_1;

  try {
    if (inputPattern) {
      if (moment(d, inputPattern)._isValid) {
        isValid = true;
      }
    } else {
      if (moment(d)._isValid) {
        isValid = true;
      }
    }
  } catch (e) {
    console.log("Deprecated date converter cause of unknown pattern");
  }
  if (isValid && inputPattern) {
    if (outputPattern) {
      if (outputPattern === "time") {
        return moment(d, inputPattern).toDate().getTime();
      } else {
        return moment(d, inputPattern).format(outputPattern)
      }
    }
    else return moment(d, inputPattern).toDate();
  } else if (!isValid) {
    if (/^\w{3} \w{3} \d{2} \d{2}:\d{2}:\d{2} WIB \d{4}$/.test(d)) {
      d = d.replace("WIB","+07:00");
    }
    else if (/^\w{3} \w{3} \d{2} \d{2}:\d{2}:\d{2} WITA \d{4}$/.test(d)) {
      d = d.replace("WITA","+08:00");
    }
    else if (/^\w{3} \w{3} \d{2} \d{2}:\d{2}:\d{2} WIT \d{4}$/.test(d)) {
      d = d.replace("WIT","+09:00");
    }
    else {
      console.error("[Invalid Date]",d);
      d = "1976-01-01";
    }
  }
  if (outputPattern) {
    if (outputPattern === "time") {
      return moment(d).toDate().getTime();
    } else {
      return moment(d).format(outputPattern)
    }
  }
  else return moment(d).toDate();
};