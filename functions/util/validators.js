const isEmpty = (string) => {
  if (string.trim() === "") return true;
  else return false;
};

const isEmail = (email) => {
  // eslint-disable-next-line no-useless-escape
  const emailRegEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (email.match(emailRegEx)) return true;
  else return false;
};

const isPhone = (phone) => {
  //TODO validate phone number
};

exports.validateSignupData = (data) => {
  let errors = {};
  if (isEmpty(data.email)) {
    errors.email = "Email must not be empty";
  } else if (!isEmail(data.email)) {
    errors.email = "Must be a valid email address";
  }
  if (isEmpty(data.password)) errors.password = "Must not be empty";
  if (data.password !== data.confirmPassword)
    errors.confirmPassword = "Passwords must match";
  if (isEmpty(data.handle)) errors.handle = "Must not be empty";
  //   if (!isPhone(data.phone))
  //     errors.phone = "Phone number must be in (XXX)-XXX-XXXX format";
  return {
    errors,
    valid: Object.keys(errors).length > 0 ? false : true,
  };
};

exports.validateLoginData = (data) => {
  let errors = {};
  if (isEmpty(data.email)) errors.email = "Must not be empty";
  if (isEmpty(data.password)) errors.password = "Must not be empty";
  return {
    errors,
    valid: Object.keys(errors).length > 0 ? false : true,
  };
};

exports.reduceUserDetails = (data) => {
  let userDetails = {};

  if (!isEmpty(data.location.trim())) userDetails.location = data.location;
  // TODO: first, last, school, grade...

  return userDetails;
};
