const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("cointoss")
    .setDescription("Tosses a coin, randomly getting heads or tails."),

  async execute(interaction, client) {
    await interaction.deferReply({
      fetchReply: true,
    });

    // Coin toss: randomly generate either 1 or 2 and use it to get the array option elem in that position
    const options = ["Heads", "Tails"];
    const randomPos = Math.floor(Math.random() * 2) + 1;
    const result = options[randomPos - 1];

    const embed = new EmbedBuilder()
      .setTitle(`${result}`)
      .setDescription(`You got ${result} out of the coin toss.`)
      .setThumbnail(
        "https://cdn.dribbble.com/users/12524477/screenshots/18860746/coin-flip.gif",
      )
      .setFooter({
        text: "Hope luck was by your side!",
        iconURL:
          "https://static-00.iconduck.com/assets.00/four-leaf-clover-emoji-484x512-7irkncqr.png",
      })
      .setColor(client.color);

    const embedReply = await interaction.editReply({
      embeds: [embed],
    });
  },
};
