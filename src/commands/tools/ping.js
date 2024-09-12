const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Shows the client and the websocket ping."),

  async execute(interaction, client) {
    const reply = await interaction.deferReply({
      fetchReply: true,
    });

    const ping = reply.createdTimestamp - interaction.createdTimestamp;
    const websocket = client.ws.ping;

    const embed = new EmbedBuilder()
      .setTitle("Ping")
      .setDescription("This is what the connection is looking like.")
      .setThumbnail(
        "https://media1.tenor.com/m/NRISgv7urE8AAAAC/killua-zoldyck-hunter-x-hunter.gif",
      )
      .setFooter({
        text: "Measured",
        iconURL: "https://images.emojiterra.com/twitter/512px/1f310.png",
      })
      .setTimestamp()
      .setColor(client.color)
      .addFields(
        {
          name: "Client:",
          value: `${ping} ms`,
          inline: true,
        },
        {
          name: "API Latency:",
          value: `${websocket} ms`,
          inline: true,
        },
      );

    const embedReply = await interaction.editReply({
      embeds: [embed],
    });
  },
};
