const functions = require("firebase-functions");
const app = require("express")();
const FBAuth = require("./util/fbAuth");

const { db } = require("./util/admin");

const { signup, sendOTP, checkOTP } = require("./handlers/users");

app.post("/signup", signup);
app.post("/sendOTP", sendOTP);
app.post("/checkOTP", checkOTP);

exports.api = functions.https.onRequest(app);
