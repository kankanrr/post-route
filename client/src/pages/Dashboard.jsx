import React from "react";
// import Login from "../components/Login";
// import Signup from "../components/Signup";
import Comment from "./Comment";
import Spotify from "../components/Spotify";
import "../components/Components.css";

export default function Dashboard() {
  return (
    <>
      <header className="header">Welcome To TuneHubs!!</header>
      <Comment />
      <Spotify />
    </>
  );
}
