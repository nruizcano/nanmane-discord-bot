const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("autorole")
    .setDescription(
      "Sets the role new members will be given automatically when they join the server",
    )
    .addStringOption((option) =>
      option
        .setName("id")
        .setDescription("Introduce the role's id number")
        .setRequired(true),
    ),

  async execute(interaction, client) {
    client.autoRoleId = interaction.options.getString("id");
    
    await interaction.reply({
      content: "Automatic role has been updated 👍",
      ephemeral: true,
    });
  },
};
