const { guildId } = process.env;

module.exports = {
  name: "guildMemberAdd",

  async execute(member, client) {
    if (!member.guild) return;

    try {
      if (client.welcomeMessage == "") {
        await member.send(
          `Hey ${member.user.username}! 👋 \n 🎉 Welcome to ${client.guilds.cache.get(
            guildId,
          )} 🎉 \n We are so happy to have you here and hope you enjoy your stay 😊`,
        );
      } else {
        await member.send(client.welcomeMessage);
      }
    } catch (error) {
      console.error(error);
      console.log(
        "❌ There was an error while direct messaging the new member...",
      );
    }

    if (client.autoRoleId != "") {
      try {
        await member.roles.add(client.autoRoleId);
      } catch (error) {
        console.error(error);
        console.log(
          "❌ There was an error while adding the auto role to the new member...",
        );
      }
    } else {
      return;
    }
  },
};
