const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

let nerea = 0;

module.exports = {
    data: new SlashCommandBuilder()
        .setName("nerea")
        .setDescription(
            "Cuenta las veces que Nerea ha llorado por perder un minion"
        ),

    async execute(interaction, client) {
        const message = await interaction.deferReply({
            fetchReply: true,
        });

        let embedTitle;
        nerea += 1;
        if (nerea == 1) {
            embedTitle = `Nerea ha llorado por perder minions ${nerea} vez... 😒`;
        } else {
            embedTitle = `Nerea ha llorado por perder minions ${nerea} veces... 😒`;
        }

        const embed = new EmbedBuilder()
            .setTitle(embedTitle)
            .setDescription(
                "Es que no last-hitea ni uno la puta mala y eso que cuenta la leyenda que mide 2 metros 😶‍🌫️"
            )
            .setImage(
                "https://static.wikia.nocookie.net/leagueoflegends/images/5/55/Chaos_Minion_Siege_Render.png/revision/latest?cb=20200601050945"
            )
            .setColor(client.color);

        await interaction.editReply({
            embeds: [embed],
        });
    },
};
