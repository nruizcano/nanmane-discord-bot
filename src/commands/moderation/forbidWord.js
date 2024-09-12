const {
  SlashCommandBuilder,
  EmbedBuilder,
  PermissionsBitField,
} = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("forbidword")
    .setDescription("Make a word unusable in messages in this server.")
    .addStringOption((option) =>
      option
        .setName("word")
        .setDescription("Add a word to the list of forbidden words.")
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

    // Insert the word into the array
    if (client.forbiddenWordArray.includes(word)) {
      return await interaction.editReply({
        content: "⚠️ The word is already in the list of forbidden words...",
        ephemeral: true,
      });
    }

    client.forbiddenWordArray.push(word);

    const embed = new EmbedBuilder()
      .setTitle("Word forbidden!")
      .setDescription(
        `The use of the word "${word}" will not be allowed in this server's messages.`,
      )
      .setFooter({
        text: "Forbidden",
        iconURL: "https://cdn-icons-png.freepik.com/512/4081/4081197.png",
      })
      .setTimestamp()
      .setColor(client.color);

    const embedReply = await interaction.editReply({
      embeds: [embed],
    });
  },
};
