const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("about")
    .setDescription("Get information about this bot."),

  async execute(interaction, client) {
    const embed = new EmbedBuilder()
      .setTitle("About Nanmane Discord Bot")
      .setURL("https://github.com/nruizcano/nanmane-discord-bot")
      .setDescription(
        "Hey! \n I am a multi-purpose Discord bot, created to help with the management and the moderation of the servers, packed with time-management tools and fun features too 🩵",
      )
      .setImage(
        "https://media1.tenor.com/m/7oJCQVaU9zYAAAAC/killua-hxh.gif"
      )
      .setFooter({
        text: "Developed by Nerea Ruiz Cano.",
        iconURL: "https://images.emojiterra.com/twitter/v14.0/512px/1fad0.png"
      })
      .setColor(client.color);

    const embedReply = await interaction.reply({
      embeds: [embed],
    });
  },
};
