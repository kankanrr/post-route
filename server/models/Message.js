const { Schema, model } = require("mongoose");

const messageSchema = new Schema({
  sentBy: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  chat: {
    type: Schema.Types.ObjectId,
    ref: "Chat",
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  createdTime: {
    type: Date,
    default: Date.now,
  },
});

const Message = model("Message", messageSchema);

module.exports = Message;
