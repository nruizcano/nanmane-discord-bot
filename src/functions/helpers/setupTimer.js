const {
  EmbedBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  userMention,
} = require("discord.js");

async function setupTimer(interaction, client, minutes, seconds, reminder) {
  // Timer starts
  const embed = new EmbedBuilder()
    .setTitle("Timer is set!")
    .setDescription(
      `I'll let you know when ${minutes} minutes and ${seconds} seconds have passed.`,
    )
    .setTimestamp()
    .setFooter({
      text: "Started",
      iconURL:
        "https://static-00.iconduck.com/assets.00/timer-clock-emoji-1935x2048-f1cllrn5.png",
    })
    .setColor(client.color);

  const embedReply = await interaction.editReply({
    embeds: [embed],
    fetchReply: true,
  });

  let formattedTime = (minutes * 60 + seconds) * 1000;
  let embedDescription = `${userMention(
    interaction.user.id,
  )} the timer of ${minutes} minutes and ${seconds} seconds has ended.`;

  if (reminder != null) {
    embedDescription = embedDescription + ` Now it's time to: ${reminder}.`;
  }

  // Timer finishes & restart button
  setTimeout(() => {
    const embed = new EmbedBuilder()
      .setTitle("Time is up!")
      .setDescription(embedDescription)
      .setTimestamp()
      .setFooter({
        text: "Finished",
        iconURL:
          "https://creazilla-store.fra1.digitaloceanspaces.com/emojis/55730/bell-emoji-clipart-xl.png",
      })
      .setColor(client.color);

    const button = new ButtonBuilder()
      .setCustomId("restart-timer")
      .setLabel("Restart")
      .setStyle(ButtonStyle.Secondary)
      .setEmoji("🔄");

    const embedButtonReply = interaction.followUp({
      embeds: [embed],
      components: [new ActionRowBuilder().addComponents(button)]
    });
  }, formattedTime);
}

module.exports = { setupTimer };
