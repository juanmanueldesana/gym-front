/* eslint-disable eqeqeq */
export default function validateInfo(values) {
  const errors = {};
  const conditions = {};
  // eslint-disable-next-line eqeqeq
  if (values.first_name !== "") {
    conditions.firstName = true;
  } else {
    errors.firstName = "Nombre es un campo obligatorio";
    conditions.firstName = false;
  }
  if (/^[0-9]*$/.test(values.username)) {
    conditions.username = true;
  } else {
    errors.username = "El DNI solamente puede contener numeros";
    conditions.username = false;
  }

  if (values.last_name !== "") {
    conditions.lastName = true;
  } else {
    errors.lastName = "Apellido es un campo obligatorio";
    conditions.lastName = false;
  }

  if (/\S+@\S+\.\S+/.test(values.email)) {
    conditions.email = true;
  } else {
    errors.email = "La direccion de correo electronico es invalida";
    conditions.email = false;
  }
  
  if (values.password.length >= 8) {
    conditions.password = true;
  } else {
    errors.password = "La contraseña debe tener al menos 8 caracteres";
    conditions.password = false;
  }

  if (values.password2 === values.password) {
    conditions.passwordMatch = true;
  } else {
    errors.password2 = "Las contraseñas no coinciden";
    conditions.passwordMatch = false;
  }

  if (
    conditions.username == true &&
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
