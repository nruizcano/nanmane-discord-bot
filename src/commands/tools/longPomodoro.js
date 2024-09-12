const {
  SlashCommandBuilder,
  EmbedBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  userMention,
} = require("discord.js");

async function setupLongPomodoro(interaction, client) {
  const embed = new EmbedBuilder()
    .setTitle("Time to focus!")
    .setDescription("Get work done for the next 50 minutes.")
    .setTimestamp()
    .setFooter({
      text: "Started",
      iconURL:
        "https://static-00.iconduck.com/assets.00/open-book-emoji-1024x769-oyfx263r.png",
    })
    .setColor(client.color);

  const reply = await interaction.followUp({
    embeds: [embed],
    fetchReply: true,
  });

  setTimeout(() => {
    const embed = new EmbedBuilder()
      .setTitle("Time for a break!")
      .setDescription(
        `${userMention(interaction.user.id)} rest for the next 10 minutes.`,
      )
      .setTimestamp()
      .setFooter({
        text: "Started",
        iconURL:
          "https://creazilla-store.fra1.digitaloceanspaces.com/emojis/53615/teacup-without-handle-emoji-clipart-xl.png",
      })
      .setColor(client.color);
    interaction.channel.send({ embeds: [embed] });

    setTimeout(() => {
      const embed = new EmbedBuilder()
        .setTitle("Pomodoro done!")
        .setDescription(
          `${userMention(interaction.user.id)} the Pomodoro timer has ended.`,
        )
        .setTimestamp()
        .setFooter({
          text: "Finished",
          iconURL:
            "https://static-00.iconduck.com/assets.00/chequered-flag-emoji-465x512-pmjpx1wg.png",
        })
        .setColor(client.color);
      interaction.channel.send({ embeds: [embed] });

      const button = new ButtonBuilder()
        .setCustomId("restart-long-pomodoro")
        .setLabel("Restart")
        .setStyle(ButtonStyle.Secondary)
        .setEmoji("🔄");
      interaction.channel.send({
        components: [new ActionRowBuilder().addComponents(button)],
      });
    }, 10 * 60 * 1000); // 10 minutes in milliseconds
  }, 50 * 60 * 1000); // 50 minutes in milliseconds
}

module.exports = {
  data: new SlashCommandBuilder()
    .setName("longpomodoro")
    .setDescription("Sets up a 50-10 Pomodoro timer"),

  async execute(interaction, client) {
    await interaction.deferReply({
      fetchReply: true,
    });
    await setupLongPomodoro(interaction, client);
  },

  setupLongPomodoro,
};
