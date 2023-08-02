const { Schema, model } = require("mongoose");

const chatSchema = new Schema({
  users: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  ],
  messages: [
    {
      type: Schema.Types.ObjectId,
      ref: "Message",
    },
  ],
});
const Chat = model("Chat", chatSchema);

module.exports = Chat;
