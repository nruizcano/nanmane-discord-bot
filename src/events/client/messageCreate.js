const { userMention } = require("discord.js");

module.exports = {
  name: "messageCreate",

  async execute(message, client) {
    if (message.author.bot) {
      return;
    }

    // Link rules
    if (
      message.content.includes("http") &&
      client.noLinksChannelArray.includes(message.channelId)
    ) {
      try {
        message.delete();
        message.channel.send({
          content: `⚠️ ${userMention(
            message.author.id,
          )} links are not allowed in this channel!`,
        });
      } catch (error) {
        console.error(error);
        console.log("❌ There was an error while deleting the message...");
      }
    }

    // Forbidden words rule
    for (const word of client.forbiddenWordArray) {
      if (message.content.toLowerCase().includes(word)) {
        try {
          message.delete();
          message.channel.send({
            content: `⚠️ ${userMention(
              message.author.id,
            )} there is a word you used in your message that is not allowed in this server, hence it got deleted!`,
          });
        } catch (error) {
          console.error(error);
          console.log("❌ There was an error while deleting the message...");
        }
      }
    }
  },
};
