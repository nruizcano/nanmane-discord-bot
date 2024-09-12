const {
  SlashCommandBuilder,
  EmbedBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  userMention,
} = require("discord.js");

let previousMinutes;
let previousSeconds;
let previousReminder;

async function setupTimer(interaction, client, minutes, seconds, reminder) {
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

  const reply = await interaction.followUp({
    embeds: [embed],
    fetchReply: true,
  });

  let formattedTime = (minutes * 60 + seconds) * 1000;
  let embedDescription = `${userMention(
    interaction.user.id,
  )} the timer of ${minutes} and ${seconds} has ended.`;

  if (reminder != null) {
    embedDescription = embedDescription + ` Now is time to ${reminder}.`;
  }

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
    interaction.channel.send({ embeds: [embed] });

    const button = new ButtonBuilder()
      .setCustomId("restart-timer")
      .setLabel("Restart")
      .setStyle(ButtonStyle.Secondary)
      .setEmoji("🔄");
    interaction.channel.send({
      components: [new ActionRowBuilder().addComponents(button)],
    });

    previousMinutes = minutes;
    previousSeconds = seconds;
    previousReminder = reminder;
  }, formattedTime);
}

module.exports = {
  data: new SlashCommandBuilder()
    .setName("timer")
    .setDescription("Sets up a timer")
    .addIntegerOption((option) =>
      option
        .setName("minutes")
        .setDescription("Add the number of minutes")
        .setRequired(true),
    )
    .addIntegerOption((option) =>
      option
        .setName("seconds")
        .setDescription("Add the number of seconds")
        .setRequired(true),
    )
    .addStringOption((option) =>
      option
        .setName("reminder")
        .setDescription("Add a note to be reminded after the time is up"),
    ),

  async execute(interaction, client) {
    await interaction.deferReply({
      fetchReply: true,
    });
    const minutes = interaction.options.getInteger("minutes");
    const seconds = interaction.options.getInteger("seconds");
    const reminder = interaction.options.getString("reminder");

    await setupTimer(interaction, client, minutes, seconds, reminder);
  },

  setupTimer,
  getPreviousTimerValues: () => ({
    previousMinutes,
    previousSeconds,
    previousReminder,
  }),
};
