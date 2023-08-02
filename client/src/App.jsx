import { useEffect, useState } from "react";
import {
  ApolloProvider,
  ApolloClient,
  InMemoryCache,
  createHttpLink,
} from "@apollo/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Container, Form } from "react-bootstrap";
import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Dashboard.jsx";
import Comment from "./pages/Comment.jsx";
import Signup from "./components/Signup";
// import Nav from "./components/Nav";
import Login from "./components/Login";
import Spotify from "./components/Spotify";
// import SpotifyDash from "./pages/SpotifyDash";
import { Buffer } from "buffer";

function App() {
  const qString = window.location.search;
  const urlSearch = new URLSearchParams(qString);
  const code = urlSearch.get("code");
  // console.log(code);

  // Create the HTTP link to your GraphQL server
  const httpLink = createHttpLink({
    uri: "/graphql",
  });

  // Create the Apollo Client
  const client = new ApolloClient({
    link: httpLink,
    cache: new InMemoryCache(),
  });

  // ==== [Spotify Api] ====

  const client_id = "8000e5a74ec242939a1246f4295be86c"; // Your client id
  const client_secret = "0a652098d8db4e21b13c660584ad0ba0"; // Your secret
  const redirect_uri = "http://localhost:3000/callback";

  const [accessToken, setAccessToken] = useState("");
  const [refreshToken, setRefreshToken] = useState("");
  const [expiresIn, setExpiresIn] = useState("");

  useEffect(() => {
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
    const refreshParams = {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization:
          "Basic " +
          new Buffer.from(client_id + ":" + client_secret).toString("base64"),
      },
      body: new URLSearchParams({
        grant_type: "refresh_token",
        refresh_token: refreshToken,
        client_id: client_id,
      }),
    };
    fetch("https://accounts.spotify.com/api/token", authParams)
      .then((result) => result.json())
      .then((data) => {
        console.log(data);
        if (!accessToken) {
          setAccessToken(data.access_token);
        }
        setRefreshToken(data.refresh_token);
        setExpiresIn(data.expires_in);
        if (!expiresIn) {
          fetch("https://accounts.spotify.com/api/token", refreshParams)
            .then((res) => res.json())
            .then((data) => {
              setExpiresIn(data.expires_in);
              setAccessToken(data.access_token);
            });
        }

        console.log(data.access_token);
        // if (accessToken) return console.log("access toke +> " + accessToken);
        // else window.history.pushState({}, null, "/");
      })
      .catch((err) => {
        console.log(err);
        res.sendStatus(400);
      });
  }, []);

  console.log(accessToken);

  // ==== [Spotify API Search] ====
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  async function searchSpotify() {
    console.log("search for " + search);
    const artistParams = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + accessToken,
      },
    };
    var artistID = await fetch(
      "https://api.spotify.com/v1/search?q=" + search + "&type=artist",
      artistParams
    )
      .then((res) => res.json())
      .then((data) => console.log(data));
  }
  return (
    <ApolloProvider client={client}>
      <>
        {/* other components */}
        <BrowserRouter>
          <Sidebar>
            <Routes>
              <Route path="/" element={<Login />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/comment" element={<Comment />} />
              <Route path="/spotify" element={<Spotify />} />
              <Route path="/callback" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
            </Routes>
          </Sidebar>
        </BrowserRouter>
        <Container
          className="d-flex flex-column py-2"
          style={{ height: "100vh" }}
        >
          <Form.Control
            type="input"
            placeholder="Search Songs/Artists"
            value={search}
            onKeyPress={(e) => {
              if (e.key == "Enter") {
                searchSpotify();
              }
            }}
            onChange={(e) => setSearch(e.target.value)}
          />
          <div className="flex-grow-1 my-2" style={{ overflowY: "auto" }}>
            Songs
          </div>
          <div>Bottom</div>
        </Container>
      </>
    </ApolloProvider>
  );
}

export default App;
