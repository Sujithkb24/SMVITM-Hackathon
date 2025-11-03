const TelegramChat = require("../models/telegram/telegram-model");

const BOT_TOKEN = process.env.BOT_TOKEN || "8238071418:AAHR7XY8dL5HUkd2r9Xe1PsJRKggDBTPe3g";
const TELEGRAM_API = `https://api.telegram.org/bot8238071418:AAHR7XY8dL5HUkd2r9Xe1PsJRKggDBTPe3g/getUpdates`;

async function getTelegramUpdates(req, res) {
  try {
    const response = await fetch(TELEGRAM_API);
    const data = await response.json();

    if (!data.ok) {
      return res.status(400).json({
        error: "Failed to fetch updates",
        details: data,
      });
    }

    const lastUpdate = data.result?.[data.result.length - 1];
    const id = lastUpdate["message"]["chat"].id;
    console.log(id)
    const tele = await TelegramChat.findOne({"chat_id": id})
    if(!tele){
      const save = new TelegramChat({chat_id: id});
      await save.save()
       res.status(200).json({
        message: "Last Telegram update fetched successfully",
        lastUpdate,
      });
    }
    else{
      res.status(500).json({
        error: "same id reg",
      });
    }

    if (!lastUpdate) {
      return res.status(200).json({
        message: "No updates available",
        lastUpdate: null,
      });
    }

    res.status(200).json({
      message: "Last Telegram update fetched successfully",
      lastUpdate,
    });

  } catch (err) {
    console.error("Error fetching updates:", err.message);
    res.status(500).json({
      error: "Server error fetching Telegram updates",
    });
  }
}

module.exports = { getTelegramUpdates };
