const functions = require("firebase-functions");
const app = require("express")();
const FBAuth = require("./util/fbAuth");

const { db } = require("./util/admin");

const { signup } = require("./handlers/users");

app.post("/signup", signup);

exports.api = functions.https.onRequest(app);
