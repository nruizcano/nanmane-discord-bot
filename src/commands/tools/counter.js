const {
  SlashCommandBuilder,
  EmbedBuilder,
  StringSelectMenuBuilder,
  StringSelectMenuOptionBuilder,
  ActionRowBuilder,
} = require("discord.js");

const { Counter } = require("../../classes/Counter");
let counter;

module.exports = {
  data: new SlashCommandBuilder()
    .setName("counter")
    .setDescription(
      "Sets up a counter.",
    )
    .addStringOption((option) =>
      option
        .setName("name")
        .setDescription("Give the counter a name.")
        .setRequired(true),
    )
    .addStringOption((option) =>
      option
        .setName("unit")
        .setDescription("What's the unit?")
        .setRequired(false),
    ),

  async execute(interaction, client) {
    await interaction.deferReply({
      fetchReply: true,
    });

    const counterName = interaction.options.getString("name").toUpperCase();
    const unit = interaction.options.getString("unit");
    
    let embedTitle = "";
    let embedDescription = "";

    let foundCounter = client.counterArray.find(
      (counter) => counter.getName() === counterName,
    );

    if (foundCounter) {
      // The counter already exists, so update their details
      counter = foundCounter;
      if (unit) {
        // Update unit if provided
        counter.setUNit(unit);
      }
      embedTitle = `${counter.getName()}`;
      embedDescription = `${counter.getDetails()}`;
    } else {
      // Create a new counter & add insert it into the array
      counter = new Counter(counterName, unit || null);
      client.counterArray.push(counter);
      embedTitle = `The counter ${counter.getName()} has been created!`;
      embedDescription = `Starting at ${counter.getValue()}`;
    }

    const embed = new EmbedBuilder()
      .setTitle(embedTitle)
      .setDescription(embedDescription)
      .setThumbnail("https://gifdb.com/images/high/anime-writing-down-notes-5jof80xsptf9lzpl.gif")
      .setColor(client.color);

    // Tools to interact with the counter
    const selectMenu = new StringSelectMenuBuilder()
      .setCustomId("counter")
      .setMinValues(1)
      .setMaxValues(1)
      .addOptions(
        new StringSelectMenuOptionBuilder({
          label: "Increase value",
          value: "increase",
        }),
        new StringSelectMenuOptionBuilder({
          label: "Decrease value",
          value: "decrease",
        }),
        new StringSelectMenuOptionBuilder({
          label: "Enter custom value",
          value: "value",
        }),
        new StringSelectMenuOptionBuilder({
          label: "Change unit",
          value: "unit",
        }),
        new StringSelectMenuOptionBuilder({
          label: "Restart counter",
          value: "restart",
        }),
        new StringSelectMenuOptionBuilder({
          label: "Delete counter",
          value: "delete",
        }),
      );

    const embedSelectMenuReply = interaction.editReply({
      embeds: [embed],
      components: [new ActionRowBuilder().addComponents(selectMenu)]
    });
  },

  getCounter: () => counter,
};
