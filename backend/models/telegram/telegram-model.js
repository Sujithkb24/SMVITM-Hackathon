const mongoose = require("mongoose");

const telegramChatSchema = new mongoose.Schema(
  {
    chat_id: {
      type: Number,       
      required: true,
      unique: true,       
    },
  }
);

const TelegramChat = mongoose.model("TelegramChat", telegramChatSchema);

module.exports = TelegramChat;