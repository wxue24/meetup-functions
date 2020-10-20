const functions = require("firebase-functions");
const app = require("express")();

const FBAuth = require("./util/fbAuth");
const { db } = require("./util/admin");

const {
  signup,
  login,
  sendOTP,
  checkOTP,
  updateUserDetails,
  validateAddress,
  addLocation,
  addInstagramHandle,
} = require("./handlers/users");

app.post("/signup", signup);
app.post("/login", login);
app.post("/sendOTP", sendOTP);
app.post("/checkOTP", checkOTP);
app.post("/userDetails", FBAuth, updateUserDetails);
app.post("/address", FBAuth, validateAddress);
app.post("/location", FBAuth, addLocation)
app.post("/instagram", FBAuth, addInstagramHandle);


exports.api = functions.https.onRequest(app);
