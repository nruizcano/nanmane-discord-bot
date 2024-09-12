const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("forbidword")
    .setDescription("Make a word not usable in messages in this server")
    .addStringOption((option) =>
      option
        .setName("word")
        .setDescription("Add a word to the list of forbidden words")
        .setRequired(true),
    ),
    
  async execute(interaction, client) {
    const word = interaction.options.getString("word").toLowerCase();

    if (!client.forbiddenWordArray.includes(word)) {
      client.forbiddenWordArray.push(word);
    }

    await interaction.reply({
      content: `The use of the word "${word}" will not be allowed in this server's messages.`,
    });
  },
};
