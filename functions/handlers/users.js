const { admin, db } = require("../util/admin");

const config = require("../util/config");
const { uuid } = require("uuidv4");

const firebase = require("firebase");
firebase.initializeApp(config);

const {} = require("../util/validators");

// Sign users up
exports.signup = (req, res) => {};
