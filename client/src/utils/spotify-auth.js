var client_id = "8000e5a74ec242939a1246f4295be86c"; // Your client id
var client_secret = "0a652098d8db4e21b13c660584ad0ba0"; // Your secret
var redirect_uri = "http://localhost:3000/callback"; // Your redirect uri

var app = express();

app.get("/login", function (req, res) {
  var state = generateRandomString(16);
  var scope = "user-read-private user-read-email";

  res.redirect(
    "https://accounts.spotify.com/authorize?" +
      querystring.stringify({
        response_type: "code",
        client_id: client_id,
        scope: scope,
        redirect_uri: redirect_uri,
        state: state,
      })
  );
});
