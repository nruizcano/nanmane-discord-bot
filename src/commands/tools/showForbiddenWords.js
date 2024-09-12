const {
  SlashCommandBuilder,
  EmbedBuilder,
  userMention,
} = require("discord.js");

let message = "";

module.exports = {
  data: new SlashCommandBuilder()
    .setName("showforbiddenwords")
    .setDescription(
      "Return the list of the words that are not allowed to be used in this server's messages",
    ),

  async execute(interaction, client) {
    const reply = await interaction.deferReply({
      fetchReply: true,
      ephemeral: true,
    });

    if (client.forbiddenWordArray.length < 1) {
      message = "There are no forbidden words in this server.";
    } else {
      for (const word of client.forbiddenWordArray) {
        message += "\n" + word;
      }
    }

    const embed = new EmbedBuilder()
      .setTitle("Forbidden words")
      .setDescription(message)
      .setColor(client.color);

    await interaction.editReply({
      embeds: [embed],
    });

    message = "";
  },
};
