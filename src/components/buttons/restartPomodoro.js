const {
  getPreviousPomodoroValues,
} = require("../../commands/time-management/pomodoro");

const { setupPomodoro } = require("../../functions/helpers/setupPomodoro");

module.exports = {
  data: {
    name: "restart-pomodoro",
  },

  async execute(interaction, client) {
    await interaction.deferReply();

    const { prevWorkTime, prevRestTime } = getPreviousPomodoroValues();
    setupPomodoro(interaction, client, prevWorkTime, prevRestTime);
  },
};
