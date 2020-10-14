const functions = require("firebase-functions");
const app = require("express")();
const FBAuth = require("./util/fbAuth");

const { db } = require("./util/admin");

const {
  signup,
  login,
  sendOTP,
  checkOTP,
  register,
  validateAddress,
  connectSocialMedia,
  editUserDetails,
} = require("./handlers/users");

app.post("/signup", signup);
app.post("/login", login);
app.post("/sendOTP", sendOTP);
app.post("/checkOTP", checkOTP);
app.post("/register", register);
app.post("/address", validateAddress);
app.post("/socialmedia", connectSocialMedia);
app.post("/edit", editUserDetails);

exports.api = functions.https.onRequest(app);
