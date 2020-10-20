const { admin, db } = require("../util/admin");

const {
  firebaseConfig,
  twilio: { accountSid, authToken },
  instagram: { clientId, clientSecret, redirectUri },
  instagram,
} = require("../util/config");

const axios = require("axios");
const querystring = require("querystring");

const firebase = require("firebase");
firebase.initializeApp(firebaseConfig);

const {
  validateLoginData,
  validateSignupData,
  validatePhone,
  reduceUserDetails,
  isLocation,
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

//TODO Client side validation (fields empty and school)
exports.updateUserDetails = (req, res) => {
  const data = req.body;
  db.doc(`/users/${req.user.handle}`)
    .update(data)
    .then(() => {
      return res.status(200).json({ message: "Successfully added data" });
    })
    .catch((err) => {
      console.log(err);
      return res.status(500).json({ error: err.code });
    });
};

// Or just get location 
exports.validateAddress = async (req, res) => {
  const address = req.body;
  const validated = await isLocation(address);
  if (!validated) return res.status(400).json({ error: "Not a valid address" });
  else {
    //TODO Add location to firebase
    const handle = req.user.handle;
    db.doc(`/users/${handle}`)
      .update({
        location: address,
      })
      .then(() => {
        return res.status(200).json({ message: "Successfully added address" });
      })
      .catch((err) => {
        return res.status(500).json({ error: err.code });
      });
  }
};

exports.addLocation = (req, res) => {
  const latitude = req.body.latitude
  const longitude = req.body.longitude
  const handle = req.user.handle

  db.doc(`/users/${handle}`).update({
    location: {
      latitude,
      longitude
    }
  }).then(() => {
    return res.status(200).json({message: "Successfully added location"})
  }).catch(err => {
    return res.status(500).json({error: err.code})
  })
}

//Returns error or adds handle to firebase
exports.addInstagramHandle = async (req, res) => {
  const authCode = req.body.code;

  let data = {
    client_id: clientId,
    client_secret: clientSecret,
    grant_type: "authorization_code",
    redirect_uri: redirectUri,
    code: authCode,
  };

  const instagramHandle = await axios({
    url: "https://api.instagram.com/oauth/access_token",
    method: "post",
    data: querystring.stringify(data),
  })
    .then((response) => {
      const access_token = response.data.access_token;
      const user_id = response.data.user_id;
      return axios({
        url: `https://graph.instagram.com/${user_id}`,
        method: "get",
        params: {
          fields: "id, username",
          access_token: access_token,
        },
      });
    })
    .then((response) => {
      return response.data.username;
    })
    .catch((err) => {
      console.log(err.response.data);
      return res.status(400).json({ error: err.message });
    });

  //Add to firebase
  db.doc(`/users/${req.user.handle}`)
    .update({
      socialMediaHandles: {
        instagram: instagramHandle,
      },
    })
    .then(() => {
      return res.status(200).json({ message: "Added instagram username" });
    })
    .catch((err) => {
      return res.status(500).json({ error: err.code });
    });
};

exports.getMatches = (req, res) => {};
