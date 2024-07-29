const mongoose = require("mongoose");

const Chat = mongoose.model(
    "Chat",
    new mongoose.Schema({
      messages: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Message"
        }
      ],
      chatCode: {
        type: String,
        required: true
      }
    }) // groupCode now is courseCode by default
  );
  
  module.exports = Chat;