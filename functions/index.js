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
  editUserDetails,
  addInstagramHandle,
} = require("./handlers/users");

app.post("/signup", signup);
app.post("/login", login);
app.post("/sendOTP", sendOTP);
app.post("/checkOTP", checkOTP);
app.post("/register", FBAuth, register);
app.post("/address", FBAuth, validateAddress);
app.post("/instagram", FBAuth, addInstagramHandle);
app.post("/edit", FBAuth, editUserDetails);

exports.api = functions.https.onRequest(app);
