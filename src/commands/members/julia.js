const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("julia")
    .setDescription("¿Cómo que no sabes quién es Julia?"),
  async execute(interaction, client) {
    const message = await interaction.deferReply({
      fetchReply: true,
    });
    const embed = new EmbedBuilder()
      .setTitle("Julia aka La Pámpara 💜")
      .setURL("https://www.youtube.com/watch?v=6o7bCAZSxsg")
      .setDescription("Julia es La Pámpara porque nada la pue' parar y ya 🎶")
      .setColor(client.color);

    await interaction.editReply({
      embeds: [embed],
    });
  },
};
