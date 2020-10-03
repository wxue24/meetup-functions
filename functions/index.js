const functions = require("firebase-functions");
const app = require("express")();
const FBAuth = require("./util/fbAuth");

const { db } = require("./util/admin");


app.post("/signup", (req, res))

exports.api = functions.https.onRequest(app)