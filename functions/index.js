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
  getInstagramHandle
} = require("./handlers/users");

app.post("/signup", signup);
app.post("/login", login);
app.post("/:handle/sendOTP", sendOTP);
app.post("/:handle/checkOTP", checkOTP);
app.post("/:handle/register", FBAuth, register);
app.post("/:handle/address", FBAuth, validateAddress);
app.post("/:handle/instagram", FBAuth, getInstagramHandle);
app.post("/:handle/edit", FBAuth, editUserDetails);

exports.api = functions.https.onRequest(app);
