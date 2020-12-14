const functions = require("firebase-functions");

const { sendOTP, checkOTP } = require("./handlers/twilio");
const { getInstagramHandle } = require("./handlers/instagram");

exports.getInstagram = functions.https.onCall(getInstagramHandle);
exports.sendOTP = functions.https.onCall(sendOTP)
exports.checkOTP = functions.https.onCall(checkOTP)

//firebase emulators:start --import .\saved-data\ --export-on-exit
