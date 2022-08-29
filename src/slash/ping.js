const {MessageEmbed, Permissions} = require("discord.js");
const {SlashCommandBuilder} = require("@discordjs/builders")
module.exports = {
    data: new SlashCommandBuilder().setName("ping").setDescription("pong!"),
    async execute(client, interaction){

        const pingEmbed = new MessageEmbed()
            .setColor("#2d7991")
            .setTitle("Ping!")
            .setDescription(`Pong!`)

        await interaction.reply({embeds: [pingEmbed], ephemeral: true});

    }
}