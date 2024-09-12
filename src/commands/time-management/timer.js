const {
  SlashCommandBuilder,
} = require("discord.js");

const { setupTimer } = require("../../functions/helpers/setupTimer");

let prevMinutes;
let prevSeconds;
let prevReminder;

module.exports = {
  data: new SlashCommandBuilder()
    .setName("timer")
    .setDescription("Sets up a timer.")
    .addIntegerOption((option) =>
      option
        .setName("minutes")
        .setDescription("Add the number of minutes.")
        .setRequired(true),
    )
    .addIntegerOption((option) =>
      option
        .setName("seconds")
        .setDescription("Add the number of seconds.")
        .setRequired(true),
    )
    .addStringOption((option) =>
      option
        .setName("reminder")
        .setDescription("Add a note to be reminded of after the time is up."),
    ),

  async execute(interaction, client) {
    await interaction.deferReply({
      fetchReply: true,
    });
    
    const minutes = interaction.options.getInteger("minutes");
    const seconds = interaction.options.getInteger("seconds");
    const reminder = interaction.options.getString("reminder");

    await setupTimer(interaction, client, minutes, seconds, reminder);
  
    prevMinutes = minutes;
    prevSeconds = seconds;
    prevReminder = reminder;
  },

  getPreviousTimerValues: () => ({
    prevMinutes,
    prevSeconds,
    prevReminder
  }),
};
