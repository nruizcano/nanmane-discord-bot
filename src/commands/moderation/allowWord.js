const {
  SlashCommandBuilder,
  EmbedBuilder,
  PermissionsBitField,
} = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("allowword")
    .setDescription("Make a word usable again in messages in this server.")
    .addStringOption((option) =>
      option
        .setName("word")
        .setDescription("Remove a word from the list of forbidden words.")
        .setRequired(true),
    ),

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
        content: "❌ You dont have permission to use this command!",
        ephemeral: true,
      });

    const word = interaction.options.getString("word").toLowerCase();

    // Remove the word from the array
    if (client.forbiddenWordArray.includes(word)) {
      const index = client.forbiddenWordArray.indexOf(word);
      if (index > -1) {
        client.forbiddenWordArray.splice(index, 1);
      }
    } else {
      return await interaction.editReply({
        content: `⚠️ The word "${word}" is not in the list of forbidden words, so you can already use it in this server's messages.`,
        ephemeral: true,
      });
    }

    const embed = new EmbedBuilder()
      .setTitle("Word allowed!")
      .setDescription(
        `The use of the word "${word}" is now allowed in this server's messages.`,
      )
      .setFooter({
        text: "Allowed",
        iconURL: "https://cdn-icons-png.freepik.com/512/4081/4081197.png",
      })
      .setTimestamp()
      .setColor(client.color);

    const embedReply = await interaction.editReply({
      embeds: [embed],
    });
  },
};
