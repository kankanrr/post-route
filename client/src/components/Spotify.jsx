import React from "react";
import "./Components.css";

import { Container } from "react-bootstrap";

const AUTH_URL =
  "https://accounts.spotify.com/authorize?client_id=8000e5a74ec242939a1246f4295be86c&response_type=code&redirect_uri=http://localhost:3000/callback&scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state";

export default function Spotify() {
  return (
    <Container
      className="d-flex justify-content-center align-items-center form"
      style={{ minHeight: "100vh" }}
    >
      <a className="btn btn-success btn-lg" href={AUTH_URL}>
        Login with Spotify;
      </a>
    </Container>
  );
}
