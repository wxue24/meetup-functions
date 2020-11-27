const functions = require("firebase-functions");
const app = require("express")();

//Allows test calls from localhost
// const cors = require("cors");
// app.use(cors());

const FBAuth = require("./util/fbAuth");
const { db } = require("./util/admin");

const {
  signup,
  login,
  updateUserDetails,
  validateAddress,
  addLocation,
  getMatches,
} = require("./handlers/users");

const { sendOTP, checkOTP } = require("./handlers/twilio");
const { getInstagramHandle } = require("./handlers/instagram");

// app.post("/signup", signup);
// app.post("/login", login);
app.post("/sendOTP", FBAuth, sendOTP);
app.post("/checkOTP", FBAuth, checkOTP);
// app.post("/userDetails", FBAuth, updateUserDetails);
// app.post("/address", FBAuth, validateAddress);
// app.post("/location", FBAuth, addLocation);
app.get("/instagram", FBAuth, getInstagramHandle);
// app.get("/matches", FBAuth, getMatches);

exports.api = functions.https.onRequest(app);
