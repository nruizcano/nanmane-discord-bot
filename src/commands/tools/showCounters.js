const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("showcounters")
    .setDescription("Returns the list of the active counters."),

  async execute(interaction, client) {
    await interaction.deferReply({
      fetchReply: true,
    });

    let embedDescription = "";

    if (client.counterArray.length < 1) {
      embedDescription = "There are active counters at the moment.";
    } else {
      for (const counter of client.counterArray) {
        embedDescription += `\n ★ ${counter.getName()}: ${counter.getDetails()}`;
      }
    }

    const embed = new EmbedBuilder()
      .setTitle("Active counters")
      .setDescription(embedDescription)
      .setFooter({
        text: "To date",
        iconURL:
          "https://images.emojiterra.com/microsoft/fluent-emoji/1024px/1f9ee_flat.png",
      })
      .setTimestamp()
      .setColor(client.color);

    const embedReply = await interaction.editReply({
      embeds: [embed],
    });

    embedDescription = "";
  },
};
