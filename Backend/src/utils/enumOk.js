const enumOk = (gender) => {
  const enumGender = ["hombre", "mujer", "otros"];
  if (enumGender.includes(gender)) {
    console.log("entro en el true");
    return { check: true, gender };
  } else {
    return {
      check: false,
    };
  }
};

//!--------------ENUM TIPO ACTIVIDADES--------------------

const enumTypeActivityIsOk = (type) => {
  const enumOk = ["pistas", "colectivas"];
  if (enumOk.includes(type)) {
    return true;
  } else {
    return false;
  }
};

module.exports = enumTypeActivityIsOk;
module.exports = enumOk;
