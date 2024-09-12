const { EmbedBuilder } = require("discord.js");

module.exports = {
  data: {
    name: "welcomeMesage",
  },

  async execute(interaction, client) {
    client.welcomeMessage = interaction.fields.getTextInputValue(
      "welcomeMessageInput",
    );

    const embed = new EmbedBuilder()
      .setTitle("New welcome message!")
      .setDescription("Welcome message has been set 👍")
      .setFooter({
        text: "Updated",
      })
      .setTimestamp()
      .setColor(client.color);

    const embedReply = await interaction.reply({
      embeds: [embed],
      ephemeral: true,
    });
  },
};
