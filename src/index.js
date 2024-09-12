require("dotenv").config();
const { token } = process.env;
const {
  Client,
  Collection,
  GatewayIntentBits,
  PermissionsBitField,
} = require("discord.js");
const fs = require("fs");

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildPresences,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMessageReactions,
  ],
  permissions: [PermissionsBitField.Flags.Administrator],
});

client.commands = new Collection();
client.buttons = new Collection();
client.selectMenus = new Collection();
client.modals = new Collection();
client.commandsArray = [];
client.noLinksChannelArray = [];
client.forbiddenWordArray = [];
client.counterArray = [];
client.color = "76bcff";
client.welcomeMessage = "";
client.autoRoleId = "";

// Passes the client to every handler function
const handlerFiles = fs
  .readdirSync("./src/functions/handlers")
  .filter((file) => file.endsWith(".js"));
for (const file of handlerFiles)
  require(`./functions/handlers/${file}`)(client);

client.handleEvents();
client.handleCommands();
client.handleComponents();
client.login(token);
