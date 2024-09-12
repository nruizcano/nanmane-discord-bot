const {
  SlashCommandBuilder,
  ModalBuilder,
  ActionRowBuilder,
  TextInputBuilder,
  TextInputStyle,
  PermissionsBitField,
} = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("welcome")
    .setDescription(
      "Sets the welcome message new members will receibe when they join the server."
    ),
  async execute(interaction) {
    if (
      !interaction.member.permissions.has(
        PermissionsBitField.Flags.Administrator,
      )
    )
      return await interaction.reply({
        content: "❌ You dont have permission to use this command!",
        ephemeral: true,
      });

    const modal = new ModalBuilder()
      .setCustomId("welcomeMesage")
      .setTitle("Update the welcome message");

    const input = new TextInputBuilder()
      .setCustomId("welcomeMessageInput")
      .setLabel("Type in the new welcome message.")
      .setRequired(true)
      .setStyle(TextInputStyle.Paragraph);

    modal.addComponents(new ActionRowBuilder().addComponents(input));

    await interaction.showModal(modal);
  },
};
