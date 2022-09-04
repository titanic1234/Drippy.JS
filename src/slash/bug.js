const { MessageEmbed, Permissions } = require("discord.js");
const fs = require("fs");
const sleep = require("sleep-promise");
const { SlashCommandBuilder } = require("@discordjs/builders")

module.exports = {
    data: new SlashCommandBuilder().setName("bug").setDescription("Report a bug").setDescriptionLocalizations({
        de: "Informiere uns über einen gefunden Bug (Fehler)"
    })
        .addStringOption(option => option.setName("report").setDescription("Specify the bug").setRequired(true)),
    async execute(client, interaction) {
        try {
            var report = interaction.options.getString("report");


            const channel2 = client.channels.cache.get("899379299256250438");
            const bugworkEmbed = new MessageEmbed()
                .setTitle("Bug Report Drippy")
                .setDescription("Thank you for your bug report. We will make sure that the bug is fixed as soon as possible.\nYou will receive an answer from the Drippy Team via DM soon.")
                .setColor("#225781")
                .setTimestamp()
                .setThumbnail(interaction.guild.iconURL())


            const button = {
                "type": 1,
                "components": [
                    {
                        "type": 2,
                        "label": "Sent by Drippy",
                        "style": 2,
                        "custom_id": "drippy",
                        "disabled": true
                    }
                ]
            };



            await interaction.reply({embeds: [bugworkEmbed], components: [button], ephemeral: true});


            const bugrepEmbed = new MessageEmbed()
                .setColor("#225781")
                .setTimestamp()
                .setTitle("Bug Report Drippy")
                .setDescription("Es gab einen Bugreport")
                .setThumbnail(interaction.guild.iconURL())
                .addFields([
                    {name: interaction.user.username.toString() + "#" + interaction.user.discriminator.toString(), value: "ID: " + interaction.user.id.toString()},
                    {name: interaction.guild.name.toString(), value: "ID: " + interaction.guild.id.toString()},
                    {name: "Bug:", value: report.toString()}
                ])

            return channel2.send({embeds: [bugrepEmbed], components: [button]});
        } catch (err) {
            await interaction.channel.send({content: "An error has occurred. Please try again. If the error still occurs, do not hesitate to contact us.", ephemeral: true});

            console.log("Ein Error ist bei /bug aufgetreten:\n");
            console.error(err);
            console.log("\n\n---------------------------------------\n\n");
        }
    }
}