const { MessageActionRow, MessageButton, MessageEmbed, Permissions} = require('discord.js');
const fs = require('fs');

module.exports = {
    name: "alert",
    description: "Alert",
    async execute (client, message, server, args) {
        const ids = ["690582774641328168", "675723273937354775","716394389211185213"];
        if (!ids.includes(message.member.id.toString())) {
            client.commands.get("permission_error").execute(client, message);
            return;
        }

        const guild2 = client.guilds.cache.find(guild => guild.id === "865934977270546462");
        if (server === "all") {

            client.guilds.cache.forEach(async key => {
                const guild = client.guilds.cache.find(guild => guild.id === key.id);
                if (key.publicUpdatesChannelId === null) {
                    var channel = client.users.cache.find(user => user.id === key.ownerId);
                }
                else {
                    var channel = guild.channels.cache.get(key.publicUpdatesChannelId);
                }

                const embed = new MessageEmbed()
                    .setTitle("The Drippy Team announces:")
                    .setDescription(args.join(" ").toString())
                    .setColor("#00b7ff")
                    .setTimestamp()
                    .setThumbnail(guild2.iconURL())
                    .setAuthor("Drippy Team - " + message.author.username.toString())

                try {
                    await channel.send({embeds: [embed]});
                } catch (err) {
                    console.log(err);
                }

            });

        }
        else {
            const guild = client.guilds.cache.find(guild => guild.id === server.toString());
            if (guild === null || guild === undefined) {
                return message.channel.send("Der Server konnte nicht gefunden werden");
            }
            if (guild.publicUpdatesChannelId === null) {
                var channel = client.users.cache.find(user => user.id === guild.ownerId);
            }
            else {
                var channel = guild.channels.cache.get(guild.publicUpdatesChannelId);
            }

            const embed = new MessageEmbed()
                .setTitle("The Drippy Team announces for this server:")
                .setDescription(args.join(" ").toString())
                .setColor("#00b7ff")
                .setTimestamp()
                .setThumbnail(guild2.iconURL())
                .setAuthor("Drippy Team - " + message.author.username.toString())
            try {
                await channel.send({embeds: [embed]});
            } catch (err) {
                console.log(err);
            }
        }

        await message.reply("Die Bekanntmachung wurde erfolgreich gesendet");
    }
}