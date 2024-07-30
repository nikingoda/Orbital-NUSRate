const db = require("../models");
const Chat = db.chat;
const Course = db.course;
const User = db.user;

exports.getChatInfo = async (req, res) => {
    try {
    //   const chatId = req.params.chatId;
      const chatCode = req.params.chatCode;
      var chat = await Chat.findOne({chatCode: chatCode})
        .populate("members", "username")
        .populate({
          path: "messages",
          populate: {
            path: "sender",
            select: "username"
          }
        })
        .exec();
  
      if (!chat) {
        // const course = await Course.findOne({courseCode: chatCode}).exec();
        // if(!course) {
        //     return res.status(404).send({ message: "Chat not found!" });
        // }
        chat = await new Chat({
            messages: [],
            chatCode: chatCode,
        }).save();
        console(chat);
      }
      res.status(200).send(chat);
    } catch (err) {
      console.log(err);
      res.status(500).send({ message: err.message });
    }
  };
