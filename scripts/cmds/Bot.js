const axios = require("axios");

module.exports = {
  config: {
    name: "bot",
    aliases: [],
    version: "2.0",
    author: "sasuke roy",
    countDown: 2,
    role: 0,
    shortDescription: "Talk to AI like ChatGPT",
    longDescription: "Bot will talk like AI whenever someone mentions 'bot' in group.",
    category: "fun",
    guide: {
      en: "Just say something like 'bot তুমি কি করো?' and it will reply."
    }
  },

  // কেউ message এ 'bot' বললে AI reply করবে
  onChat: async function ({ event, message }) {
    const content = event.body;
    if (!content?.toLowerCase().includes("bot")) return;

    try {
      const res = await axios.get(`https://api.affiliateplus.xyz/api/chatbot`, {
        params: {
          message: content,
          botname: "OpuBot",
          ownername: "sasuke",
          user: event.senderID
        }
      });

      return message.reply(res.data.message);
    } catch (err) {
      console.error(err);
      return message.reply("AI bot এখন উত্তর দিতে পারছে না 😢");
    }
  }
};

