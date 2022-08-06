const { MessageActionRow, MessageButton, MessageEmbed, Permissions} = require('discord.js');
const fs = require('fs');

module.exports = {
    name: "setbuttonmanagemol",
    description: "Settings",
    async execute (client, message) {
        fs.readFile(`Server/${message.message.member.guild.id.toString()}.json`, "utf8", async function (err,data) {
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

            if (adminberecht === false) {
                return client.commands.get("permission_error").execute(client, message);
            }

            var dis = true;

            if (json_data.serverinfo.language.toString() !== "en") dis = false;


            const setManageEmbed = new MessageEmbed()
                .setTitle("Settings - Management - Moderation - Language")
                .setDescription("Select the language you want to set for the server here. The default language is English. More languages will be added in the future.\n\n")
                .setColor("#003cff")
                .setFields(
                    {name: "The current language is:", value: "English"},
                    {name: "\n\nINFO", value: "More functions will be add channed. More detailed information on the individual functions can be obtained with #help"}
                )
                .setTimestamp()
                .setThumbnail(message.guild.iconURL())

            const buttonsManage = {
                "type": 1,
                "components": [
                    {
                        "type": 2,
                        "label": "English",
                        "style": 1,
                        "custom_id": `setManageMOLEN:::${message.member.id}`,
                        "disabled": dis
                    },
                    {
                        "type": 2,
                        "label": "Deutsch",
                        "style": 1,
                        "custom_id": `setManageMOLDE:::${message.member.id}`,
                        "disabled": true
                    },
                    {
                        "type": 2,
                        "label": "Back",
                        "style": 4,
                        "custom_id": `setManageMOBack:::${message.member.id}`
                    }
                ]
            };




            await message.message.delete();
            await message.channel.send({embeds: [setManageEmbed], ephemeral: true, components: [buttonsManage]});



        });
    }
}