const { MessageActionRow, MessageButton, MessageEmbed, Permissions} = require('discord.js');
const fs = require('fs');

module.exports = {
    name: "setbuttonmanagemj",
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

            if (modberecht === false) {
                return client.commands.get("permission_error").execute(client, message);
            }


            const setManageEmbed = new MessageEmbed()
                .setTitle("Settings - Management - Member Join")
                .setDescription("What exactly do you want to set? Just click the button below.")
                .setColor("#003cff")
                .setFields(
                    {name: "Welcome message", value: "Button: Welcome message"},
                    {name: "DM Welcome message", value: "Button: DM Welcome message"},
                    {name: "Auto role add", value: "Button: Auto Role add"},
                    {name: "\n\nINFO", value: "More functions will be add channed. More detailed information on the individual functions can be obtained with #help"}
                )
                .setTimestamp()
                .setThumbnail(message.guild.iconURL())

            const buttonsManage = {
                "type": 1,
                "components": [
                    {
                        "type": 2,
                        "label": "Welcome message",
                        "style": 1,
                        "custom_id": `setManageMJWM:::${message.member.id}`
                    },
                    {
                        "type": 2,
                        "label": "DM Welcome message",
                        "style": 1,
                        "custom_id": `setManageMJDM:::${message.member.id}`
                    },
                    {
                        "type": 2,
                        "label": "Auto Role add",
                        "style": 1,
                        "custom_id": `setManageMJRA:::${message.member.id}`
                    },
                    {
                        "type": 2,
                        "label": "Back",
                        "style": 4,
                        "custom_id": `setManageBack:::${message.member.id}`
                    }
                ]
            };




            await message.message.delete();
            await message.channel.send({embeds: [setManageEmbed], ephemeral: true, components: [buttonsManage]});



        });
    }
}