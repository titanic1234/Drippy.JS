const { MessageActionRow, MessageButton, MessageEmbed, Permissions} = require('discord.js');
const fs = require('fs');

module.exports = {
    name: "setbuttonlevel",
    description: "Settings für Level Button",
    async execute (client, message) {
        console.log("Level");
        fs.readFile(`Server/${message.member.guild.id.toString()}.json`, "utf8", async function (err,data) {
            if (err) {
                console.log(err);
            }

            var json_data = JSON.parse(data);
            var adminroles = json_data.moderation.roles_admin;
            var modroles = json_data.moderation.roles_mod;
            var modberecht = false;
            var adminberecht = false;


            for (var i of message.member._roles) {
                if (message.guild.ownerId.toString() === message.member.id.toString()) {
                    adminberecht = true;
                    modberecht = true;
                    break;
                }
                if (message.member.permissions.has(Permissions.FLAGS.ADMINISTRATOR)) {
                    adminberecht = true;
                    modberecht = true;
                    break;
                }
                if (adminroles.includes(i.toString())) {
                    adminberecht = true;
                    break;
                }
                if (modroles.includes(i.toString())) {
                    modberecht = true;
                    break;
                }
            }

            if (modberecht === false) {
                return client.commands.get("permission_error").execute(client, message);
            }


            const setLevelEmbed = new MessageEmbed()
                .setTitle("Settings - Level")
                .setDescription("This allows you to set everything for the individual functions of the Drippy Bot:")
                .setColor("#003cff")
                .setFields(
                    {name: "Level", value: "Button: Level"},
                    {name: "Tuning meeting", value: "Button: Fun"},
                    {name: "Quiz", value: "Button: Fun"},
                    {name: "Other Fun", value: "Button: Fun"},
                    {name: "Moderation", value: "Button: Management"},
                    {name: "Automod", value: "Button: Management"},
                    {name: "Member Join", value: "Button: Management"},
                    {name: "Global-Bann", value: "Button: Management"},
                    {name: "\n\nINFO", value: "More functions will be added. More detailed information on the individual functions can be obtained with #help"}
                )
                .setTimestamp()
                .setThumbnail(message.guild.iconURL())

            const buttonslevel = {
                "type": 1,
                "components": [
                    {
                        "type": 2,
                        "label": "Level",
                        "style": 1,
                        "custom_id": `setLevel:::${message.member.id}`
                    },
                    {
                        "type": 2,
                        "label": "Fun",
                        "style": 1,
                        "custom_id": `setFun:::${message.member.id}`
                    },
                    {
                        "type": 2,
                        "label": "Management",
                        "style": 1,
                        "custom_id": `setManage:::${message.member.id}`
                    },
                    {
                        "type": 2,
                        "label": "Back",
                        "style": 4,
                        "custom_id": `setBack:::${message.member.id}`
                    }
                ]
            }




            await message.message.delete();
            await message.channel.send({embeds: [setLevelEmbed], ephemeral: true, components: [buttonslevel]});
        });

    }
}