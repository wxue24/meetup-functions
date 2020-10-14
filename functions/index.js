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
app.post("/user/:handle/sendOTP", sendOTP);
app.post("/user/:handle/checkOTP", checkOTP);
app.post("/user/:handle/register", FBAuth, register);
app.post("/user/:handle/address", FBAuth, validateAddress);
app.post("/user/:handle/socialmedia", FBAuth, connectSocialMedia);
app.post("/user/:handle/edit", FBAuth, editUserDetails);

exports.api = functions.https.onRequest(app);
