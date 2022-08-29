const { MessageActionRow, MessageButton, MessageEmbed, Permissions} = require('discord.js');
const fs = require('fs');

module.exports = {
    name: "bugans",
    description: "Bug Report Antwort",
    async execute (client, message, args) {

        try {


            const ids = ["690582774641328168", "675723273937354775","716394389211185213"];
            if (!ids.includes(message.member.id.toString())) {
                client.commands.get("permission_error").execute(client, message);
                return;
            }
            const user = client.users.cache.find(user => user.id === args[0].toString());
            if (user === undefined || user === null) return message.reply("Der angegebene User existiert nicht");
            args.splice(0, 1);

            if (args.length === 0) return message.reply("Bitte gebe eine Antwort an!");

            const bugEmbed = new MessageEmbed()
                .setTitle("Response to your Bug Report")
                .setDescription("This is the Drippy Team's response to your bug:\n" + args.join(" "))
                .setTimestamp()
                .setColor("#225781")
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
            }


            await user.send({embeds: [bugEmbed], components: [button]});
            await message.reply("Die Antwort wurde erfolgreich gesendet");
        } catch (err) {
            await message.channel.send({content: "An error has occurred. Please try again. If the error still occurs, do not hesitate to contact us.", ephemeral: true});

            console.log("Ein Error ist bei #bug-ans aufgetreten:\n");
            console.error(err);
            console.log("\n\n---------------------------------------\n\n");
        }
    }
}