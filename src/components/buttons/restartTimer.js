const {
  getPreviousTimerValues,
} = require("../../commands/time-management/timer");

const { setupTimer } = require("../../functions/helpers/setupTimer");

module.exports = {
  data: {
    name: "restart-timer",
  },

  async execute(interaction, client) {
    await interaction.deferReply();

    const { prevMinutes, prevSeconds, prevReminder } =
      getPreviousTimerValues();
    setupTimer(
      interaction,
      client,
      prevMinutes,
      prevSeconds,
      prevReminder,
    );
  },
};
