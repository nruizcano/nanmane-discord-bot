const { SlashCommandBuilder } = require("discord.js");

let message;

module.exports = {
  data: new SlashCommandBuilder()
    .setName("allowword")
    .setDescription("Make a word usable again in messages in this server")
    .addStringOption((option) =>
      option
        .setName("word")
        .setDescription("Remove a word from the list of forbidden words")
        .setRequired(true),
    ),

  async execute(interaction, client) {
    const word = interaction.options.getString("word").toLowerCase();

    if (client.forbiddenWordArray.includes(word)) {
      const index = client.forbiddenWordArray.indexOf(word);
      if (index > -1) {
        client.forbiddenWordArray.splice(index, 1);
      }
      message = `The use of the word "${word}" is now allowed in this server's messages.`;
    } else {
      message = `The word "${word}" is not in the list of forbidden words, so you can already use it in this server's messages...`;
    }

    await interaction.reply({
      content: message,
    });
  },
};
