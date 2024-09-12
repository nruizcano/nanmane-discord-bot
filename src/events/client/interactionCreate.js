const { InteractionType } = require("discord.js");

module.exports = {
  name: "interactionCreate",

  async execute(interaction, client) {
    if (
      interaction.isChatInputCommand() ||
      interaction.isContextMenuCommand()
    ) {
      const { commands } = client;
      const { commandName } = interaction;
      const command = commands.get(commandName);

      if (!command) return new Error("⚠️ There is no code for this command!");

      try {
        await command.execute(interaction, client);
      } catch (error) {
        console.error(error);
        await interaction.reply({
          content: "❌ Something went wrong while executing this command...",
          ephemeral: true,
        });
      }
    }

    if (interaction.isButton()) {
      const { buttons } = client;
      const { customId } = interaction;
      const button = buttons.get(customId);

      if (!button) return new Error("⚠️ There is no code for this button!");

      try {
        await button.execute(interaction, client);
      } catch (error) {
        console.error(error);
        await interaction.reply({
          content: "❌ There was an error while executing this button...",
          ephemeral: true,
        });
      }
    }

    if (interaction.isStringSelectMenu()) {
      const { selectMenus } = client;
      const { customId } = interaction;
      const menu = selectMenus.get(customId);

      if (!menu)
        return new Error("⚠️ There is no code for this string select menu!");

      try {
        await menu.execute(interaction, client);
      } catch (error) {
        console.error(error);
        await interaction.reply({
          content:
            "❌ There was an error while executing this string select menu...",
          ephemeral: true,
        });
      }
    }

    if (interaction.type == InteractionType.ApplicationCommandAutocomplete) {
      const { commands } = client;
      const { commandName } = interaction;
      const command = commands.get(commandName);

      if (!command)
        return new Error("⚠️ There is no code for this autocomplete!");

      try {
        await command.autocomplete(interaction, client);
      } catch (error) {
        console.error(error);
        await interaction.reply({
          content:
            "❌ Something went wrong while executing this autocomplete...",
          ephemeral: true,
        });
      }
    }

    if (interaction.type == InteractionType.ModalSubmit) {
      const { modals } = client;
      const { customId } = interaction;
      const modal = modals.get(customId);

      if (!modal)
        return new Error("⚠️ There is no code for this modal!");

      try {
        await modal.execute(interaction, client);
      } catch (error) {
        console.error(error);
        await interaction.reply({
          content:
            "❌ Something went wrong while executing this modal...",
          ephemeral: true,
        });
      }
    }
  },
};
