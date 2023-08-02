import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { CREATE_PLAYLIST, ADD_TRACK_TO_PLAYLIST } from "../utils/mutation";
import { QUERY_USER_BY_ID } from "../utils/queries";

const Playlist = ({ playlist, userId }) => {
  const [trackFormData, setTrackFormData] = useState({
    title: "",
    artist: "",
    album: "",
    duration: 0,
    uri: "",
    imageUrl: "",
  });

  const [createPlaylist] = useMutation(CREATE_PLAYLIST, {
    refetchQueries: [{ query: QUERY_USER_BY_ID, variables: { id: userId } }],
  });

  const [addTrackToPlaylist] = useMutation(ADD_TRACK_TO_PLAYLIST, {
    refetchQueries: [{ query: QUERY_USER_BY_ID, variables: { id: userId } }],
  });

  const handleCreatePlaylist = () => {
    createPlaylist({
      variables: {
        title: "New Playlist",
        description: "My new playlist description",
      },
    });
  };

  const handleAddTrack = () => {
    addTrackToPlaylist({
      variables: {
        playlistId: playlist._id,
        ...trackFormData,
      },
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTrackFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <div className="playlist-container">
      <h2>{playlist.title}</h2>
      <p>{playlist.description}</p>

      <div className="add-track-section">
        <h3>Add Track</h3>
        <form onSubmit={handleAddTrack} className="track-form">
          <div className="form-group">
            <label htmlFor="title">Title:</label>
            <input
              type="text"
              id="title"
              name="title"
              value={trackFormData.title}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="artist">Artist:</label>
            <input
              type="text"
              id="artist"
              name="artist"
              value={trackFormData.artist}
              onChange={handleChange}
              required
            />
          </div>
          {/* Add other input fields for album, duration, uri, and imageUrl */}
          <button type="submit" className="add-track-button">
            Add Track
          </button>
        </form>
      </div>

      {/* Display existing tracks in the playlist */}
      <div className="tracks-section">
        <h3>Tracks</h3>
        <ul className="track-list">
          {playlist.tracks.map((track) => (
            <li key={track._id} className="track-item">
              {track.title} - {track.artist}
            </li>
          ))}
        </ul>
      </div>

      {/* Button to create a new playlist */}
      <button onClick={handleCreatePlaylist} className="create-playlist-button">
        Create New Playlist
      </button>
    </div>
  );
};


export default Playlist;