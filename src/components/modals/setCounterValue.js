const { EmbedBuilder } = require("discord.js");

const { getCounter } = require("../../commands/tools/counter");

module.exports = {
  data: {
    name: "changeValue",
  },

  async execute(interaction, client) {
    const counter = getCounter();
    const newValue = +interaction.fields.getTextInputValue("valueInput");

    counter.setValue(newValue);

    const embed = new EmbedBuilder()
      .setTitle("The counter's value has been updated")
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
