const functions = require("firebase-functions");

const {
  instagram: { clientId, clientSecret, redirectUri },
} = require("../util/config");
const axios = require("axios");
const querystring = require("querystring");

exports.getInstagramHandle = (data, context) => {
  const authCode = data.code;

  let requestData = {
    client_id: clientId,
    client_secret: clientSecret,
    grant_type: "authorization_code",
    redirect_uri: redirectUri,
    code: authCode,
  };

  return axios({
    url: "https://api.instagram.com/oauth/access_token",
    method: "post",
    data: querystring.stringify(requestData),
  })
    .then((response) => {
      const access_token = response.data.access_token;
      const user_id = response.data.user_id;
      return axios({
        url: `https://graph.instagram.com/${user_id}`,
        method: "get",
        params: {
          fields: "id, username",
          access_token: access_token,
        },
      });
    })
    .then((response) => {
      return { handle: response.data.username };
    })
    .catch((err) => {
      throw new functions.https.HttpsError(
        "permission-denied",
        "Try again",
        `${err.response.data.error_message}`
      );
    });
};
