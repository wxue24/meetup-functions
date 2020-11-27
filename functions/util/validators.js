const axios = require("axios");

const {
  twilio: { accountSid, authToken },
  ups,
} = require("../util/config");
const client = require("twilio")(accountSid, authToken);

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
  return client.lookups
    .phoneNumbers(phone)
    .fetch()
    .then((phone_number) => {
      return phone_number.phoneNumber;
    });
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

exports.isLocation = (location) => {
  const data = JSON.stringify({
    XAVRequest: {
      AddressKeyFormat: {
        AddressLine: location.address,
        PoliticalDivision2: location.city,
        PoliticalDivision1: location.state,
        PostcodePrimaryLow: location.zip,
        CountryCode: location.country,
      },
    },
  });

  const config = {
    method: "post",
    url: "https://onlinetools.ups.com/addressvalidation/v1/1",
    headers: {
      AccessLicenseNumber: ups.AccessLicenseNumber,
      Username: ups.Username,
      Password: ups.Password,
    },
    data: data,
  };
  //If valid or close to valid returns the address in AddressKeyFormat
  //Else returns null
  return axios(config)
    .then((res) => {
      if (res.data.XAVResponse.ValidAddressIndicator === "") {
        return res.data.XAVResponse.Candidate.AddressKeyFormat;
      } else return null;
    })
    .catch((err) => {
      console.log(err.response.data.response.errors);
      return null;
    });
};

exports.validateUserDetails = (data) => {
  // grades 9-16
  const userDetails = data;
  const grade = data.grade;
  let maxGrade = data.filterSettings.maxGrade;
  let minGrade = data.filterSettings.minGrade;

  if (grade >= 9 && grade <= 12) {
    if (maxGrade >= 12) maxGrade = 12;
    if (maxGrade < grade) maxGrade = grade;
    if (minGrade <= 9) minGrade = 9;
    if (minGrade > grade) minGrade = grade;
  } else {
  }
  userDetails.filterSettings.maxGrade = maxGrade;
  userDetails.filterSettings.minGrade = minGrade;

  let radius = data.filterSettings.radius;
  userDetails.filterSettings.radius = radius * 1.6;
  return userDetails;
};
