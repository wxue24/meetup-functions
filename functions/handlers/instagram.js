const {
  instagram: { clientId, clientSecret, redirectUri },
} = require("../util/config");
const axios = require("axios");
const querystring = require("querystring");

//Returns error or handle
exports.getInstagramHandle = async (req, res) => {
  const authCode = req.body.code;
  console.log("heeheh");

  let data = {
    client_id: clientId,
    client_secret: clientSecret,
    grant_type: "authorization_code",
    redirect_uri: redirectUri,
    code: authCode,
  };

  axios({
    url: "https://api.instagram.com/oauth/access_token",
    method: "post",
    data: querystring.stringify(data),
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
      return res.status(200).json({ handle: response.data.username });
    })
    .catch((err) => {
      console.log(err.response.data);
      return res.status(400).json({ error: err.message });
    });
};
