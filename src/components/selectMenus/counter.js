const {
  EmbedBuilder,
  ModalBuilder,
  ActionRowBuilder,
  TextInputBuilder,
  TextInputStyle,
} = require("discord.js");

const { getCounter } = require("../../commands/tools/counter");

let embedDescription;

module.exports = {
  data: {
    name: "counter",
  },
  async execute(interaction, client) {
    const counter = getCounter();
    if (!client.counterArray.includes(counter)) {
      await interaction.reply({
        content: "❌ The counter does not exist...",
        ephemeral: true,
      });
      return;
    }
    const index = client.counterArray.indexOf(counter);

    if (interaction.values[0] === "increase") {
      counter.increaseValue();
      embedTitle = `The counter has been increased by 1!`;
    }
    if (interaction.values[0] === "decrease") {
      if (counter.getValue() > 0) {
        counter.decreaseValue();
        embedTitle = `The counter has been decreased by 1!`;
      } else {
        embedTitle = "The counter value is already 0...";
      }
    }
    if (interaction.values[0] === "value") {
      const modal = new ModalBuilder()
        .setCustomId("changeValue")
        .setTitle("Change the counter's value");

      const input = new TextInputBuilder()
        .setCustomId("valueInput")
        .setLabel("Introduce the new value.")
        .setRequired(true)
        .setStyle(TextInputStyle.Short);

      modal.addComponents(new ActionRowBuilder().addComponents(input));

      await interaction.showModal(modal);
    }
    if (interaction.values[0] === "unit") {
      const modal = new ModalBuilder()
        .setCustomId("changeUnit")
        .setTitle("Change the unit of the counter");

      const input = new TextInputBuilder()
        .setCustomId("unitInput")
        .setLabel("Introduce the new counting unit.")
        .setRequired(true)
        .setStyle(TextInputStyle.Short);

      modal.addComponents(new ActionRowBuilder().addComponents(input));

      await interaction.showModal(modal);
    }
    if (interaction.values[0] === "restart") {
      counter.setValue(0);
      embedTitle = "The counter has been restarted back to 0";
    }

    embedDescription = `${counter.getName()}: ${counter.getDetails()}`;

    if (interaction.values[0] === "delete") {
      client.counterArray.splice(index, 1);
      embedTitle = "The counter has been deleted";
      embedDescription = `${counter.getName()} is no longer active.`;
    }

    if (!["value", "unit"].includes(interaction.values[0])) {
      const embed = new EmbedBuilder()
        .setTitle(embedTitle)
        .setDescription(embedDescription)
        .setThumbnail(
          "https://gifdb.com/images/high/anime-writing-down-notes-5jof80xsptf9lzpl.gif",
        )
        .setColor(client.color);

      const embedReply = await interaction.reply({
        embeds: [embed],
      });
    }
  },
};
