const { MessageActionRow, MessageButton, MessageEmbed, Permissions} = require('discord.js');
const fs = require('fs');

module.exports = {
    name: "setbuttonmanage",
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
                .setTitle("Settings - Management")
                .setDescription("This allows you to set everything for the individual functions of the Drippy Bot:")
                .setColor("#003cff")
                .setFields(
                    {name: "Moderation", value: "Button: Moderation"},
                    {name: "Automod", value: "Button: Automod"},
                    {name: "Member Join", value: "Button: Member Join"},
                    {name: "Global-Bann", value: "Button: Global-Bann"},
                    {name: "\n\nINFO", value: "More functions will be added. More detailed information on the individual functions can be obtained with #help"}
                )
                .setTimestamp()
                .setThumbnail(message.guild.iconURL())

            const buttonsManage = {
                "type": 1,
                    "components": [{
                        "type": 2,
                        "label": "Moderation",
                        "style": 1,
                        "custom_id": `setManageMO:::${message.member.id}`,
                        "disabled": false
                    },
                    {
                        "type": 2,
                        "label": "Automod",
                        "style": 1,
                        "custom_id": `setManageAM:::${message.member.id}`
                    },
                    {
                        "type": 2,
                        "label": "Member Join",
                        "style": 1,
                        "custom_id": `setManageMJ:::${message.member.id}`
                    },
                    {
                        "type": 2,
                        "label": "Global-Bann",
                        "style": 1,
                        "custom_id": `setManageGB:::${message.member.id}`,
                        "disabled": true
                    },
                    {
                        "type": 2,
                        "label": "Back",
                        "style": 4,
                        "custom_id": `setBack:::${message.member.id}`
                    }
                ]
            };



            await message.message.delete();
            await message.channel.send({embeds: [setManageEmbed], ephemeral: true, components: [buttonsManage]});


        });
    }
}