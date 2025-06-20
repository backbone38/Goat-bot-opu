const axios = require("axios");
const fs = require("fs");
const path = require("path");

module.exports = {
  config: {
    name: "fluximage",
    aliases: ["draw", "genimage"],
    version: "1.0",
    author: "sasuke roy",
    countDown: 5,
    role: 0,
    shortDescription: "Generate image from prompt using Flux AI",
    longDescription: "Create realistic or anime-style images using a prompt via Flux model",
    category: "ai",
    guide: {
      en: "{pn} <your image description>\nExample: {pn} a boy standing in the rain wearing a school dress"
    }
  },

  onStart: async function () {},

  onMessage: async function ({ event, args, message }) {
    const prompt = args.join(" ");
    if (!prompt) return message.reply("🎨 কী আঁকবো বলো? কিছু লিখো!");

    const msg = await message.reply(`⏳ "${prompt}" ইমেজ বানানো হচ্ছে, একটু অপেক্ষা করো...`);

    try {
      // Flux API Call
      const res = await axios.get(`https://image.pollinations.ai/prompt/${encodeURIComponent(prompt)}`, {
        responseType: "arraybuffer"
      });

      const imagePath = path.join(__dirname, "cache", `flux-${event.senderID}.jpg`);
      fs.writeFileSync(imagePath, Buffer.from(res.data, "binary"));

      return message.reply({
        body: `🎨 তোমার ছবিঃ "${prompt}"`,
        attachment: fs.createReadStream(imagePath)
      }, () => fs.unlinkSync(imagePath));

    } catch (err) {
      console.error(err);
      return message.reply("❌ Flux Image generate করতে সমস্যা হয়েছে!");
    }
  }
};
