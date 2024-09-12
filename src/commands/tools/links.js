const {
  SlashCommandBuilder,
  StringSelectMenuBuilder,
  StringSelectMenuOptionBuilder,
  ActionRowBuilder,
} = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("links")
    .setDescription("Allow or forbid links in this channel"),
    
  async execute(interaction) {
    const menu = new StringSelectMenuBuilder()
      .setCustomId("link-rules")
      .setMinValues(1)
      .setMaxValues(1)
      .addOptions(
        new StringSelectMenuOptionBuilder({
          label: "Allow",
          value: "allowed",
        }),
        new StringSelectMenuOptionBuilder({
          label: "Not allow",
          value: "forbidden",
        }),
      );

    await interaction.reply({
      components: [new ActionRowBuilder().addComponents(menu)],
      ephemeral: true,
    });
  },
};
