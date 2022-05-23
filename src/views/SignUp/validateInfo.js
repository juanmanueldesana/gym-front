/* eslint-disable eqeqeq */
export default function validateInfo(values) {
  const errors = {};
  const conditions = {};
  // eslint-disable-next-line eqeqeq
  if (values.firstName !== "") {
    conditions.firstName = true;
  } else {
    errors.firstName = "First name required";
    conditions.firstName = false;
  }

  if (/^[0-9]*$/.test(values.dni)) {
    conditions.dni = true;
  } else {
    errors.dni = "DNI must be only numbers";
    conditions.dni = false;
  }

  if (values.lastName !== "") {
    conditions.lastName = true;
  } else {
    errors.lastName = "Last name required";
    conditions.lastName = false;
  }

  if (/\S+@\S+\.\S+/.test(values.email)) {
    conditions.email = true;
  } else {
    errors.email = "Email address is invalid";
    conditions.email = false;
  }
  if (/(?=.{8,30})(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=!*]).*$/.test(values.password)) {
    conditions.password = true;
  } else {
    errors.password =
      "Must have at least 8 characters, including one uppercase, one lowercase, one number, one special character";
    conditions.password = false;
  }

  if (values.password2 === values.password) {
    conditions.passwordMatch = true;
  } else {
    errors.password2 = "Passwords do not match";
    conditions.passwordMatch = false;
  }

  if (
    conditions.dni == true &&
    conditions.email == true &&
    conditions.firstName == true &&
    conditions.lastName == true &&
    conditions.password == true &&
    conditions.passwordMatch == true
  ) {
    return true;
  }

  return errors;
}
