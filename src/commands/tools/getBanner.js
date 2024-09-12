const {
  ContextMenuCommandBuilder,
  ApplicationCommandType,
} = require("discord.js");

module.exports = {
  data: new ContextMenuCommandBuilder()
    .setName("getBanner")
    .setType(ApplicationCommandType.User),

  async execute(interaction) {
    await interaction.reply({
      content: `${interaction.targetUser.bannerURL()}`,
      ephemeral: true,
    });
  },
};
