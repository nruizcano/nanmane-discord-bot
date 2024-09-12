const {
    SlashCommandBuilder,
    EmbedBuilder,
    userMention,
} = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("luismi")
        .setDescription(
            "Luismi te aprueba la barbaridad que acabas de decir/hacer"
        )
        .addStringOption((option) =>
            option
                .setName("culpable")
                .setDescription("¿Quién ha sido?")
                .setRequired(false)
        ),

    async execute(interaction, client) {
        const message = await interaction.deferReply({
            fetchReply: true,
        });

        const culpable = interaction.options.getString("culpable");
        let embedDescription = `Que Dios guarde a ${userMention(
            interaction.user.id
        )} y se olvide de donde 🙏`;
        if (culpable != null) {
            embedDescription = `Que Dios guarde a ${culpable} y se olvide de donde 🙏`;
        }

        const embed = new EmbedBuilder()
            .setTitle("¡Luismi aprueba tu barbaridad! 👏")
            .setDescription(embedDescription)
            .setImage(
                "https://media1.tenor.com/m/C9SwE0VKTD4AAAAC/dungeon-meshi-delicious-in-dungeon.gif"
            )
            .setColor(client.color);

        await interaction.editReply({
            embeds: [embed],
        });
    },
};
