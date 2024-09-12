let message;

module.exports = {
  data: {
    name: "link-rules",
  },
  async execute(interaction, client) {
    if (interaction.values[0] === "allowed") {
      message = "Links are now allowed in this channel.";
      // Delete the channel from noLinksChannelArray
      if (client.noLinksChannelArray.includes(interaction.channelId)) {
        const index = client.noLinksChannelArray.indexOf(interaction.channelId);
        if (index > -1) {
          client.noLinksChannelArray.splice(index, 1);
        }
      }
    }

    if (interaction.values[0] === "forbidden") {
      message = "Links are now not allowed in this channel.";
      // Add the channel to noLinksChannelArray if is not already there
      if (!client.noLinksChannelArray.includes(interaction.channelId)) {
        client.noLinksChannelArray.push(interaction.channelId);
      }
    }

    await interaction.reply({
      content: message,
    });
  },
};
