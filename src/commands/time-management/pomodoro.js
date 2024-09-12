const { SlashCommandBuilder } = require("discord.js");

const { setupPomodoro } = require("../../functions/helpers/setupPomodoro");

let prevWorkTime;
let prevRestTime;

module.exports = {
  data: new SlashCommandBuilder()
    .setName("pomodoro")
    .setDescription("Sets up a Pomodoro timer.")
    .addStringOption((option) =>
      option
        .setName("duration")
        .setDescription("Choose between a short and a long timer.")
        .setAutocomplete(true)
        .setRequired(true),
    ),

  async autocomplete(interaction) {
    const focusedValue = interaction.options.getFocused();
    const choices = ["short (25-5)", "long (50-10)"];
    const filtered = choices.filter((choice) => choice.match(focusedValue));

    await interaction.respond(
      filtered.map((choice) => ({ name: choice, value: choice })),
    );
  },

  async execute(interaction, client) {
    const option = interaction.options.getString("duration");
    let workTime;
    let restTime;

    if (option == "short (25-5)") {
      workTime = 1;
      restTime = 1;
    }

    if (option == "long (50-10)") {
      workTime = 1;
      restTime = 1;
    }

    await interaction.deferReply({
      fetchReply: true,
    });

    await setupPomodoro(interaction, client, workTime, restTime);

    prevWorkTime = workTime;
    prevRestTime = restTime;
  },

  getPreviousPomodoroValues: () => ({
    prevWorkTime,
    prevRestTime,
  }),
};
