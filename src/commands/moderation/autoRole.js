const { SlashCommandBuilder, EmbedBuilder, PermissionsBitField } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("autorole")
    .setDescription(
      "Sets the role new members will be given automatically when they join the server.",
    )
    .addStringOption((option) =>
      option
        .setName("id")
        .setDescription("Introduce the role's id number.")
        .setRequired(true),
    ),

  async execute(interaction, client) {
    // Only administrators are allowed to use this command
    if (
      !interaction.member.permissions.has(
        PermissionsBitField.Flags.Administrator,
      )
    )
      return await interaction.reply({
        content: "❌ You dont have permission to use this command!",
        ephemeral: true,
      });

    client.autoRoleId = interaction.options.getString("id");

    const embed = new EmbedBuilder()
      .setTitle("New auto role!")
      .setDescription("Automatic role has been set 👍")
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
