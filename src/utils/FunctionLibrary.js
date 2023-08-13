// module.exports = {

export const dslTranslator = (jsonquery) => {
  //loop object
  let must = [];
  let must_not = [];
  let should = [];
  for (const [key, value] of Object.entries(jsonquery)) {
    //area olah
    if (value) {
      if (Array.isArray(value)) {
        //ini array, gunakn terms

        must.push(termsConfig(key, value));
      } else if (typeof value == "number") {
        //ini number, kemungkinan term
        must.push(termConfig(key, Number(value)));
      } else {
        if (value.includes(">")) {
          must.push(moreThanConfig(key, value));
        } else if (value.includes("<")) {
          must.push(lessThanConfig(key, value));
        } else if (value.includes("between")) {
          must.push(betweenConfig(key, value));
        } else if (value.includes("@like@")) {
          must.push(wildCardConfig(key, value));
        } else if (value.includes("@likein@")) {
          should.push(...likeInConfig(key, value));
        } else if (value.includes("@not@")) {
          must_not.push(notConfig(key, value));
        } else {
          must.push(termConfig(key, value));
        }
      }
    }
  }

  let finalResult = {
    query: {
      bool: {
        must,
        must_not,
        should,
        adjust_pure_negative: true,
      },
    },
  };

  if (must.length === 0) {
    delete finalResult.query.bool.must;
  }
  if (should.length === 0) {
    delete finalResult.query.bool.should;
  }
  if (must_not.length === 0) {
    delete finalResult.query.bool.must_not;
    delete finalResult.query.bool.adjust_pure_negative;
  }

  return finalResult;
};

// }

const termConfig = (key, value) => {
  return {
    term: {
      [key.toLowerCase() + ".keyword"]: {
        value: value,
        boost: 1.0,
      },
    },
  };
};

const wildCardConfig = (key, value) => {
  const newVal = value.replace("@like@", "").trim();
  return {
    wildcard: {
      [key.toLowerCase() + ".keyword"]: {
        wildcard: "*" + newVal + "*",
        boost: 1.0,
      },
    },
  };
};

const likeInConfig = (key, value) => {
  const newVal = value.replace("@likein@", "").replace("[", "").replace("]", "").trim();
  const arrayVal = newVal.split(",");
  let result = [];
  for (const eachVal of arrayVal) {
    result.push({
      wildcard: {
        [key.toLowerCase() + ".keyword"]: {
          wildcard: eachVal,
          boost: 1.0,
        },
      },
    });
  }
  return result;
};

const notConfig = (key, value) => {
  const newVal = value.replace("@not@", "").replace("[", "").replace("]", "").trim();
  const arrayVal = newVal.split(",");
  return {
    terms: {
      [key.toLowerCase() + ".keyword"]: arrayVal,
      boost: 1.0,
    },
  };
};

const termsConfig = (key, value) => {
  return {
    terms: {
      [key.toLowerCase() + ".keyword"]: value,
      boost: 1.0,
    },
  };
};

const lessThanConfig = (key, value) => {
  const newVal = Number(value.replace("<", "").trim());
  return {
    range: {
      [key.toLowerCase()]: {
        from: null,
        to: newVal,
        include_lower: false,
        include_upper: false,
        boost: 1.0,
      },
    },
  };
};

const moreThanConfig = (key, value) => {
  const newVal = Number(value.replace(">", "").trim());
  return {
    range: {
      [key.toLowerCase()]: {
        from: newVal,
        to: null,
        include_lower: false,
        include_upper: false,
        boost: 1.0,
      },
    },
  };
};

const betweenConfig = (key, value) => {
  let newVal = value.replace("between", "");
  let re = new RegExp("'", "g");
  let re2 = new RegExp('"', "g");
  const datefrom = newVal.split("and")[0].trim().replace(re, "").replace(re2, "");
  const dateto = newVal.split("and")[1].trim().replace(re, "").replace(re2, "");
  return {
    range: {
      [key.toLowerCase()]: {
        from: datefrom,
        to: dateto,
        include_lower: true,
        include_upper: true,
        time_zone: "Z",
        boost: 1.0,
      },
    },
  };
};
