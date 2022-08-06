const { MessageActionRow, MessageButton, MessageEmbed, Permissions} = require('discord.js');
const fs = require('fs');

module.exports = {
    name: "bug",
    description: "Bug Report",
    async execute (client, message, args) {
        const channel2 = client.channels.cache.get("899379299256250438");
        const bugworkEmbed = new MessageEmbed()
            .setTitle("Bug Report Drippy")
            .setDescription("Thank you for your bug report. We will make sure that the bug is fixed as soon as possible.\nYou will receive an answer from the Drippy Team via DM soon.")
            .setColor("#225781")
            .setTimestamp()
            .setThumbnail(message.guild.iconURL())

        const bugerrEmbed = new MessageEmbed()
            .setTitle("Bug Report Drippy")
            .setDescription(":x: Please specify the bug :x:")
            .setColor("#225781")
            .setTimestamp()
            .setThumbnail(message.guild.iconURL())

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

        try {
            if (args[0].toString === "") {
                return message.reply({embeds: [bugerrEmbed], components: [button]});
            } else {
                await message.reply({embeds: [bugworkEmbed], components: [button]});
            }
        } catch (error) {
            return message.reply({embeds: [bugerrEmbed], components: [button]});
        }

        const bugrepEmbed = new MessageEmbed()
            .setColor("#225781")
            .setTimestamp()
            .setTitle("Bug Report Drippy")
            .setDescription("Es gab einen Bugreport")
            .setThumbnail(message.guild.iconURL())
            .addFields([
                {name: message.author.username.toString() + "#" + message.author.discriminator.toString(), value: "ID: " + message.author.id.toString()},
                {name: message.member.guild.name.toString(), value: "ID: " + message.member.guild.id.toString()},
                {name: "Bug:", value: args.join(" ")}
            ])

        return channel2.send({embeds: [bugrepEmbed], components: [button]});
    }
}