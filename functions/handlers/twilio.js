const functions = require("firebase-functions");

const { client } = require("../util/config");
const { validatePhone } = require("../util/validators");
//TODO Change Twilio verification name

exports.sendOTP = async (data, context) => {
  const phoneNumber = data.phone;

  const { errors, valid, number } = await validatePhone(phoneNumber);
  if (!valid)
    throw new functions.https.HttpsError(
      "failed-precondition",
      "Number is not valid",
      `${errors}`
    );

  return client.verify
    .services("VA9c4ed233063f9b856f7ff7bcef09eda8")
    .verifications.create({ to: number, channel: "sms" })
    .then((verification) => {
      return { phone: number };
    })
    .catch((err) => {
      throw new functions.https.HttpsError(
        "unknown",
        "Something went wrong",
        `${err.message}`
      );
    });
};

exports.checkOTP = (data, context) => {
  const OTP = data.OTP;
  const phone = data.phone;

  return client.verify
    .services("VA9c4ed233063f9b856f7ff7bcef09eda8")
    .verificationChecks.create({ to: phone, code: OTP })
    .then((verification_check) => {
      console.log(verification_check.status);
      // approved | pending
      return { status: verification_check.status };
    })
    .catch((err) => {
      console.log(err);
      throw new functions.https.HttpsError(
        "unknown",
        "Something went wrong",
        `${err.message}`
      );
    });
};
