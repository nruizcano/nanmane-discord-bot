const {
  EmbedBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  userMention,
} = require("discord.js");

async function setupPomodoro(interaction, client, workTime, restTime) {
  // Pomodoro starts: working time
  const embed = new EmbedBuilder()
    .setTitle("Time to focus!")
    .setDescription(`Get work done for the next ${workTime} minutes.`)
    .setTimestamp()
    .setFooter({
      text: "Started",
      iconURL:
        "https://static-00.iconduck.com/assets.00/open-book-emoji-1024x769-oyfx263r.png",
    })
    .setColor(client.color);

  await interaction.editReply({
    embeds: [embed],
    fetchReply: true,
  });

  // Resting time
  setTimeout(() => {
    const embed = new EmbedBuilder()
      .setTitle("Time for a break!")
      .setDescription(
        `${userMention(
          interaction.user.id,
        )} rest for the next ${restTime} minutes.`,
      )
      .setTimestamp()
      .setFooter({
        text: "Started",
        iconURL:
          "https://creazilla-store.fra1.digitaloceanspaces.com/emojis/53615/teacup-without-handle-emoji-clipart-xl.png",
      })
      .setColor(client.color);
    interaction.followUp({ embeds: [embed] });

    // Pomodoro finishes & restart button
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

      const button = new ButtonBuilder()
        .setCustomId("restart-pomodoro")
        .setLabel("Restart")
        .setStyle(ButtonStyle.Secondary)
        .setEmoji("🔄");

      const embedButtonReply = interaction.followUp({
        embeds: [embed],
        components: [new ActionRowBuilder().addComponents(button)],
      });
    }, restTime * 60 * 1000);
  }, workTime * 60 * 1000);
}

module.exports = { setupPomodoro };
