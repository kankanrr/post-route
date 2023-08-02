const { Schema, model } = require("mongoose");

const playlistSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String },
  owner: { type: Schema.Types.ObjectId, ref: "User" },
  tracks: [{ type: Schema.Types.ObjectId, ref: "Track" }],
});

const Playlist = model("Playlist", playlistSchema);

module.exports = Playlist;
