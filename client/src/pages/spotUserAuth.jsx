import React, { useState, useEffect } from "react";

export default function spotifyAuth() {
  useEffect(() => {
    const qString = window.location.search;
    const urlSearch = new URLSearchParams(qString);
    const code = urlSearch.get("code");

    const client_id = "8000e5a74ec242939a1246f4295be86c"; // Your client id
    const client_secret = "0a652098d8db4e21b13c660584ad0ba0"; // Your secret
    const redirect_uri = "http://localhost:3000/callback";

    const [accessToken, setAccessToken] = useState("");
    const [refreshToken, setRefreshToken] = useState("");
    const [expiresIn, setExpiresIn] = useState("");
    const [tokenType, setTokenType] = useState("");

    const authParams = {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization:
          "Basic " +
          new Buffer.from(client_id + ":" + client_secret).toString("base64"),
      },
      body: new URLSearchParams({
        grant_type: "authorization_code",
        redirect_uri: redirect_uri,
        code: code,
      }),
    };
    fetch("https://accounts.spotify.com/api/token", authParams)
      .then((result) => result.json())
      .then((data) => {
        console.log(data);
        setAccessToken(data.access_token);
        setRefreshToken(data.refresh_token);
        setExpiresIn(data.expires_in);
        setTokenType(data.token_type);
        localStorage.setItem("access_token", accessToken);
        if (data.token_type === "Bearer")
          return window.location.assign("/spotify");
        else {
          return window.history.pushState({}, null, "/");
        }
      })
      .catch((err) => {
        console.log(err);
        res.sendStatus(400);
      });
  }, []);
}
