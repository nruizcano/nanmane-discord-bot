require("dotenv").config();
const { guildId, clientId } = process.env;
const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v10");
const fs = require("fs");

module.exports = (client) => {
  client.handleCommands = async () => {
    // Get all of the commands and saves them in the collection and array
    const commandsFolder = fs.readdirSync("./src/commands");
    for (const folder of commandsFolder) {
      const commandsFiles = fs
        .readdirSync(`./src/commands/${folder}`)
        .filter((file) => file.endsWith(".js"));

      const { commands, commandsArray } = client;
      for (const file of commandsFiles) {
        const command = require(`../../commands/${folder}/${file}`);
        commands.set(command.data.name, command);
        commandsArray.push(command.data.toJSON());
        console.log(
          `🛣️ Command ${command.data.name} has passed through the handler.`,
        );
      }
    }

    const rest = new REST({ version: "10" }).setToken(process.env.token);

    try {
      console.log("🔄 Started refreshing application commands.");
      await rest.put(Routes.applicationGuildCommands(clientId, guildId), {
        body: client.commandsArray,
      });

      console.log("✅ Successfully reloaded application commands.");
    } catch (error) {
      console.error(error);
      console.log(
        "❌ There was an error while reloading application commands...",
      );
    }
  };
};
