const axios = require("axios");

module.exports = {
  config: {
    name: "chat",
    aliases: [],
    version: "1.1",
    author: "sasuke roy",
    countDown: 3,
    role: 0,
    shortDescription: "Smart AI Chat",
    longDescription: "Bot will respond normally or intelligently to reply messages.",
    category: "ai",
    guide: {
      en: "Just talk to the bot, and it will auto reply."
    }
  },

  onStart: async function () {},

  onChat: async function ({ event, message, api }) {
    const msg = event.body;
    if (!msg || msg.length < 2) return;

    // যদি কেউ রিপ্লাই করে কথা বলে
    if (event.messageReply) {
      const originalMsg = event.messageReply.body;
      const replyMsg = msg;

      try {
        const response = await axios.get(`https://api.affiliateplus.xyz/api/chatbot`, {
          params: {
            message: `${replyMsg} (In response to: ${originalMsg})`,
            botname: "OpuBot",
            ownername: "sasuke",
            user: event.senderID
          }
        });

        return message.reply(response.data.message);
      } catch (e) {
        console.error(e);
        return message.reply("❌ বট উত্তর দিতে পারছে না!");
      }

    } else {
      // যদি reply না করে সরাসরি বটে কথা বলে
      try {
        const response = await axios.get(`https://api.affiliateplus.xyz/api/chatbot`, {
          params: {
            message: msg,
            botname: "OpuBot",
            ownername: "sasuke",
            user: event.senderID
          }
        });

        return message.reply(response.data.message);
      } catch (e) {
        console.error(e);
        return message.reply("❌ বট এখন কথা বলতে পারছে না!");
      }
    }
  }
};

