module.exports = {
  name: "ready",
  once: true,

  async execute(client) {
    console.log(
      `✅ The bot ${client.user.tag} is online and ready to be used.`,
    );
    client.user.setActivity({
      name: "Working for the server 🩵",
      type: 4, //Custom
    });
  },
};
