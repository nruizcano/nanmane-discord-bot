const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("poll")
    .setDescription("Creates a poll for members to vote by reacting")
    .addStringOption((option) =>
      option
        .setName("polltitle")
        .setDescription("Type what we are going to be voting about")
        .setRequired(true),
    ),

  async execute(interaction, client) {
    await interaction.deferReply({
      fetchReply: true,
    });

    const pollTitle = interaction.options.getString("polltitle");

    const embed = new EmbedBuilder()
      .setTitle(pollTitle)
      .setDescription("React to this message to vote in this poll")
      .setTimestamp()
      .setFooter({
        text: "Created",
      })
      .setColor(client.color);

    const reply = await interaction.followUp({
      embeds: [embed],
      fetchReply: true,
    });

    await Promise.all([reply.react("✅"), reply.react("❌"), reply.react("⚪")]);
  },
};
