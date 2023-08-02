const { Schema, model } = require("mongoose");

const trackSchema = new Schema({
  title: { type: String, required: true },
  artist: { type: String, required: true },
  album: { type: String, required: true },
  duration: { type: Number, required: true },
  uri: { type: String, required: true },
  imageUrl: { type: String },
});

const Track = model("Track", trackSchema);

module.exports = Track;
