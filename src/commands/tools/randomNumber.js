const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("randomnumber")
    .setDescription(
      "Gives a random number, while being able to set up a minimum and maximum value.",
    )
    .addIntegerOption((option) =>
      option
        .setName("minimum")
        .setDescription("Set a minimum value for the random number.")
        .setRequired(false),
    )
    .addIntegerOption((option) =>
      option
        .setName("maximum")
        .setDescription("Set a maximum value for the random number.")
        .setRequired(false),
    ),

  async execute(interaction, client) {
    const minimum = interaction.options.getInteger("minimum");
    const maximum = interaction.options.getInteger("maximum");
    
    let randomNumber;
    let embedDescription = "";

    if (minimum && maximum) {
      // If both minimum and maximum are provided
      if (minimum > maximum) {
        await interaction.reply({
          content: "❌ Minimum and maximum value not valid!",
          ephemeral: true
        });
        return;
      }
      randomNumber =
        Math.floor(Math.random() * (maximum - minimum + 1)) + minimum;
        embedDescription = `The number being ≥ ${minimum} and ≤ ${maximum}`;
    } else if (minimum) {
      // If only minimum is provided
      randomNumber =
        Math.floor(Math.random() * (Number.MAX_SAFE_INTEGER - minimum + 1)) +
        minimum;
        embedDescription = `The number being ≥ ${minimum}`;
    } else if (maximum) {
      // If only maximum is provided
      randomNumber = Math.floor(Math.random() * (maximum + 1));
      embedDescription = `The number being ≤ ${maximum}`;
    } else {
      // If neither is provided, generate any positive random number
      randomNumber = Math.floor(Math.random() * Number.MAX_SAFE_INTEGER);
      embedDescription = "No minimum and maximum values were provided.";
    }

    const embed = new EmbedBuilder()
      .setTitle(`${randomNumber}`)
      .setDescription(embedDescription)
      .setThumbnail("https://cdn.dribbble.com/users/670149/screenshots/4648336/dice2.gif")
      .setColor(client.color);

    const embedReply = await interaction.reply({
      embeds: [embed],
    });
  },
};
