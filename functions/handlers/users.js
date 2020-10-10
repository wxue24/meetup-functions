const { admin, db } = require("../util/admin");

const {
  firebaseConfig,
  twilioConfig: { accountSid, authToken },
} = require("../util/config");
const { uuid } = require("uuidv4");

const firebase = require("firebase");
firebase.initializeApp(firebaseConfig);

const {
  validateLoginData,
  validateSignupData,
  validatePhone,
  reduceUserDetails,
} = require("../util/validators");

const client = require("twilio")(accountSid, authToken);

// Sign users up
//TODO: Signup with google, appleId, etc
exports.signup = (req, res) => {
  const newUser = {
    email: req.body.email,
    password: req.body.password,
    confirmPassword: req.body.confirmPassword,
    handle: req.body.handle,
  };

  const { errors, valid } = validateSignupData(newUser);

  if (!valid) return res.status(400).json(errors);

  let token, userId;
  db.doc(`/users/${newUser.handle}`)
    .get()
    .then((doc) => {
      if (doc.exists) {
        return res.status(400).json({ handle: "This handle is already taken" });
      } else {
        return firebase
          .auth()
          .createUserWithEmailAndPassword(newUser.email, newUser.password);
      }
    })
    .then((data) => {
      userId = data.user.uid;
      return data.user.getIdToken();
    })
    .then((userToken) => {
      token = userToken;
      const userCredentials = {
        handle: newUser.handle,
        email: newUser.email,
        createdAt: new Date().toISOString(),
        userId,
      };
      return db.doc(`/users/${newUser.handle}`).set(userCredentials);
    })
    .then(() => {
      return res.status(201).json({ token });
    })
    .catch((err) => {
      console.error(err);
      if (err.code === "auth/email-already-in-use") {
        return res.status(400).json({ email: "Email is already in use" });
      } else {
        return res
          .status(500)
          .json({ general: "Something went wrong, please try again" });
      }
    });
};

exports.login = (req, res) => {
  const user = {
    email: req.body.email,
    password: req.body.password,
  };

  const { valid, errors } = validateLoginData(user);
  if (!valid) return res.status(400).json(errors);

  firebase
    .auth()
    .signInWithEmailAndPassword(user.email, user.password)
    .then((data) => {
      return data.user.getIdToken();
    })
    .then((token) => {
      return res.json(token);
    })
    .catch((err) => {
      console.error(err);
      return res.status(403).json({ general: "Wrong credentials, try again" });
    });
};

exports.sendOTP = async (req, res) => {
  const phoneNumber = req.body.phone;

  const { errors, valid, number } = await validatePhone(phoneNumber);

  if (!valid) return res.status(400).json(errors);

  client.verify
    .services("VAb51a99dc6d48c612a24deb5e0180cb62")
    .verifications.create({ to: number, channel: "sms" })
    .then((verification) => {
      console.log(verification.status);
      return res.status(200).json({ message: "OTP sent" });
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
        return res.status(200).json({ verification_check });
      } else {
        return res.status(400).json({ verification_check });
      }
    })
    .catch((err) => {
      console.log(err);
      return res.status(400).json({ error: err.message });
    });
};
