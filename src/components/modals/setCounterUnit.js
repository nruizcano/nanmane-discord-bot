const { EmbedBuilder } = require("discord.js");

const { getCounter } = require("../../commands/tools/counter");

module.exports = {
  data: {
    name: "changeUnit",
  },

  async execute(interaction, client) {
    const counter = getCounter();
    const newUnit = interaction.fields.getTextInputValue("unitInput");

    counter.setUnit(newUnit);

    const embed = new EmbedBuilder()
      .setTitle("The counter's unit has been updated")
      .setDescription(`${counter.getName()}: ${counter.getDetails()}`)
      .setThumbnail(
        "https://gifdb.com/images/high/anime-writing-down-notes-5jof80xsptf9lzpl.gif",
      )
      .setColor(client.color);

    const embedReply = await interaction.reply({
      embeds: [embed],
    });
  },
};
