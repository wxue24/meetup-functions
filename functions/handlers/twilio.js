const {
  twilio: { accountSid, authToken },
} = require("../util/config");
const { validatePhone } = require("../util/validators");
const client = require("twilio")(accountSid, authToken);

//TODO Change Twilio verification name

exports.sendOTP = async (req, res) => {
  const phoneNumber = req.body.phone;

  const { errors, valid, number } = await validatePhone(phoneNumber);

  if (!valid) return res.status(400).json(errors);

  client.verify
    .services("VAb51a99dc6d48c612a24deb5e0180cb62")
    .verifications.create({ to: number, channel: "sms" })
    .then((verification) => {
      console.log(verification.status);
      return res.status(200).json({ phone: number });
    })
    .catch((err) => {
      console.log(err);
      return res.status(400).json({ error: err.message });
    });
};

exports.checkOTP = (req, res) => {
  const OTP = req.body.OTP;
  const phone = req.body.phone;

  client.verify
    .services("VAb51a99dc6d48c612a24deb5e0180cb62")
    .verificationChecks.create({ to: phone, code: OTP })
    .then((verification_check) => {
      console.log(verification_check.status);
      if (verification_check.status == "approved") {
        return res.status(200).json({ status: verification_check.status });
      } else {
        return res.status(400).json({ status: verification_check.status });
      }
    })
    .catch((err) => {
      console.log(err);
      return res.status(400).json({ error: err.message });
    });
};
