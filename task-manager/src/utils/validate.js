const validator = require("validator");

const results = {
    success: { statusCode: 200, success: true },
    failure:  { statusCode: 400, success: false }
}

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

module.exports = { emailValidate, ageValidate, passValidate };
