const axios = require("axios");

module.exports = {
  config: {
    name: "bby",
    aliases: [],
    version: "1.0",
    author: "sasuke roy",
    countDown: 3,
    role: 0,
    shortDescription: "Talk with AI or reply when someone says 'bby'",
    longDescription: "Bot will reply to 'bby' and talk like a chatbot.",
    category: "fun",
    guide: {
      en: "{pn} <your message> - Talk to AI bot"
    }
  },

  onStart: async function () {
    // No action needed when bot starts
  },

  onChat: async function ({ event, message, api }) {
    const content = event.body?.toLowerCase();
    if (content?.includes("bby")) {
      return message.reply("Aw bby! 🥺 তুমি আমায় ডাকলে?");
    }
  },

  onMessage: async function ({ event, message, args }) {
    const prompt = args.join(" ");
    if (!prompt) return message.reply("কি বলবে bby?");
    
    try {
      const res = await axios.get(`https://api.affiliateplus.xyz/api/chatbot`, {
        params: {
          message: prompt,
          botname: "BbyBot",
          ownername: "sasuke",
          user: event.senderID
        }
      });

      return message.reply(res.data.message);
    } catch (err) {
      console.error(err);
      return message.reply("AI bot এর সাথে কথা বলা যাচ্ছে না 😢");
    }
  }
};
