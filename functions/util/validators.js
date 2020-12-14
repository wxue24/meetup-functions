const { client } = require("./config");

const isPhone = (phone) => {
  return client.lookups
    .phoneNumbers(phone)
    .fetch()
    .then((phone_number) => {
      return phone_number.phoneNumber;
    }).catch(err => null)
};

exports.validatePhone = async (phone) => {
  let errors = {};
  let number = null;

  const formatedNumber = await isPhone(phone);
  if (!formatedNumber) {
    errors.phone = "Number is not valid";
  } else {
    number = formatedNumber;
  }

  return {
    errors,
    valid: Object.keys(errors).length > 0 ? false : true,
    number,
  };
};
