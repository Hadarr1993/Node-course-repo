const async = require("hbs/lib/async");
const validator = require("validator");

const results = {
  success: { statusCode: 200, success: true },
  failure: { statusCode: 400, success: false },
};


const emailValidate = (value) => {
  if (validator.isEmail(value)) {
    return results.success;
  }
  return results.failure;
};

const ageValidate = (value) => {
  if (value > 0) {
    return results.success;
  }
  return results.failure;
};

const passValidate = (value) => {
  if (!value.toLowerCase().includes("password")) {
    return results.success;
  }
  return results.failure;
};
const isValid = async (age,password,email) => {
    if(ageValidate(age).success && passValidate(password).success && emailValidate(email).success) {
      return true
    }
}
module.exports = {isValid}
