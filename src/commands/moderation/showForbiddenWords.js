const {
  SlashCommandBuilder,
  EmbedBuilder,
} = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("showforbiddenwords")
    .setDescription(
      "Returns the list of the words that are not allowed to be used in this server's messages.",
    ),

  async execute(interaction, client) {
    await interaction.deferReply({
      fetchReply: true,
      ephemeral: true,
    });

    let embedDescription = "";

    if (client.forbiddenWordArray.length < 1) {
      embedDescription = "There are no forbidden words in this server.";
    } else {
      for (const word of client.forbiddenWordArray) {
        embedDescription += "\n → " + word;
      }
    }

    const embed = new EmbedBuilder()
      .setTitle("Forbidden words")
      .setDescription(embedDescription)
      .setFooter({
        text: "To date",
        iconURL: "https://cdn-icons-png.freepik.com/512/4081/4081197.png",
      })
      .setTimestamp()
      .setColor(client.color);

    const embedReply = await interaction.editReply({
      embeds: [embed],
    });

    embedDescription = "";
  },
};
