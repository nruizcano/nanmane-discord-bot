const { SlashCommandBuilder, EmbedBuilder, PermissionsBitField } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("links")
    .setDescription("Moderate sending links in this channel.")
    .addStringOption((option) =>
      option
        .setName("permission")
        .setDescription("Allow or forbid links in this channel.")
        .setAutocomplete(true)
        .setRequired(true),
    ),

  async autocomplete(interaction) {
    const focusedValue = interaction.options.getFocused();
    const choices = ["allow", "forbid"];
    const filtered = choices.filter((choice) => choice.match(focusedValue));

    await interaction.respond(
      filtered.map((choice) => ({ name: choice, value: choice })),
    );
  },

  async execute(interaction, client) {
    await interaction.deferReply({
      fetchReply: true,
    });

    // Only administrators are allowed to use this command
    if (
      !interaction.member.permissions.has(
        PermissionsBitField.Flags.Administrator,
      )
    )
      return await interaction.editReply({
        content: "❌ You dont have permission to use this command!"
      });

    const option = interaction.options.getString("permission");

    if (option == "allow") {
      // Remove the channel from the array
      if (client.noLinksChannelArray.includes(interaction.channelId)) {
        const index = client.noLinksChannelArray.indexOf(interaction.channelId);
        if (index > -1) {
          client.noLinksChannelArray.splice(index, 1);
          embedDescription = "Links are now ALLOWED in this channel.";
        }
      } else {
        return await interaction.editReply({
          content: "⚠️ Sending links in this channel is already allowed..."
        });
      }
    }

    if (option == "forbid") {
      // Insert the channel into the array if is not already there
      if (!client.noLinksChannelArray.includes(interaction.channelId)) {
        client.noLinksChannelArray.push(interaction.channelId);
        embedDescription = "Links are now NOT ALLOWED in this channel.";
      } else {
        return await interaction.editReply({
          content: "⚠️ Sending links in this channel is already forbidden..."
        });
      }
    }

    const embed = new EmbedBuilder()
      .setTitle("About sending links")
      .setDescription(embedDescription)
      .setFooter({
        text: "To date",
        iconURL: "https://cdn-icons-png.freepik.com/512/4081/4081197.png",
      })
      .setTimestamp()
      .setColor(client.color);

    const embedReply = await interaction.editReply({
      embeds: [embed],
    });
  },
};
