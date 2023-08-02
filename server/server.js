// ==== [Vars] ====

const express = require("express");
const { ApolloServer } = require("@apollo/server");
const path = require("path");
const { authMiddleware } = require("./utils/auth");
const { expressMiddleware } = require("@apollo/server/express4");
const app = express();
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
const spotifyApi = require("spotify-web-api-node");
const { typeDefs, resolvers } = require("./schemas");
const db = require("./config/connection");
const bodyParser = require("body-parser");

// ==== [Env] ====

const PORT = process.env.PORT || 3000;
const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
});

app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  })
);
const server = http.createServer(app);

//==== [Spotify] ====

app.use(bodyParser.json());

const client_id = "8000e5a74ec242939a1246f4295be86c"; // Your client id
const client_secret = "0a652098d8db4e21b13c660584ad0ba0"; // Your secret
const redirect_uri = "http://localhost:3000/callback"; // Your redirect uri

app.get("/refreshtoken", async (req, res) => {
  let refreshToken = await req.body.refresh_token;
  const refreshParams = {
    url: "https://accounts.spotify.com/api/token",
    method: "GET",
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
});

// ==== [Apollo] ====

// Create a new instance of an Apollo server with the GraphQL schema
const startApolloServer = async () => {
  app.use(express.urlencoded({ extended: false }));
  app.use(express.json());

  if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "../client/dist")));

    app.get("*", (req, res) => {
      res.sendFile(path.join(__dirname, "../client/dist/index.html"));
    });
  }

  db.once("open", async () => {
    app.listen(PORT, () => {
      console.log(`API server running on port ${PORT}!`);
      console.log(`Use GraphQL at http://localhost:${PORT}/graphql`);
    });
    await apolloServer.start();
    app.use(
      "/graphql",
      expressMiddleware(apolloServer, {
        context: authMiddleware,
      })
    );
  });
};

// Call the async function to start the server
startApolloServer();
