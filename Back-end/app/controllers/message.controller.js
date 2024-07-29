const Message = require('../models/message.model');

exports.createMessage = async (req, res) => {
  try {
    const { sender, chatId, text } = req.body;

    const newMessage = new Message({
      sender,
      chat: chatId,
      text: text
    });

    const savedMessage = await newMessage.save();

    res.status(201).json(savedMessage);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};