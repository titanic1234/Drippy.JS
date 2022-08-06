const { MessageActionRow, MessageButton, MessageEmbed, Permissions} = require('discord.js');
const fs = require('fs');

module.exports = {
    name: "setbuttonmanageam",
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
                .setTitle("Settings - Management - Automod")
                .setDescription("What exactly do you want to set? Just click the button below.")
                .setColor("#003cff")
                .setFields(
                    {name: "Ignored channels", value: "Button: Ignored channels"},
                    {name: "Ignored roles", value: "Button: Ignored roles"},
                    {name: "Ignored links", value: "Button: Ignored links"},
                    {name: "Forbidden words", value: "Button: Forbidden words"},
                    {name: "Forbidden links", value: "Button: Forbidden links"},
                    {name: "\n\nINFO", value: "More functions will be add channed. More detailed information on the individual functions can be obtained with #help"}
                )
                .setTimestamp()
                .setThumbnail(message.guild.iconURL())

            const buttonsManage = {
                "type": 1,
                "components": [
                    {
                        "type": 2,
                        "label": "Ignored channels",
                        "style": 1,
                        "custom_id": `setManageAMIC:::${message.member.id}`
                    },
                    {
                        "type": 2,
                        "label": "Ignored roles",
                        "style": 1,
                        "custom_id": `setManageAMIR:::${message.member.id}`
                    },
                    {
                        "type": 2,
                        "label": "Forbidden words",
                        "style": 1,
                        "custom_id": `setManageAMFW:::${message.member.id}`
                    },
                    {
                        "type": 2,
                        "label": "Forbidden links",
                        "style": 1,
                        "custom_id": `setManageAMFL:::${message.member.id}`
                    }
                ]
            };

            var aktbutton;

            if (json_data.automod.infos.aktiviert) {
                aktbutton = {
                    "type": 1,
                    "components": [
                        {
                            "type": 2,
                            "label": "Deactivate Automod",
                            "style": 4,
                            "custom_id": `setManageAMDA:::${message.member.id}`
                        }
                    ]
                }
            } else {
                aktbutton = {
                    "type": 1,
                    "components": [
                        {
                            "type": 2,
                            "label": "Activate Automod",
                            "style": 3,
                            "custom_id": `setManageAMA:::${message.member.id}`
                        }
                    ]
                }
            }

            const babutton = {
                "type": 1,
                "components": [
                    {
                        "type": 2,
                        "label": "Back",
                        "style": 4,
                        "custom_id": `setManageBack:::${message.member.id}`
                    }
                ]
            }


            await message.message.delete();
            await message.channel.send({embeds: [setManageEmbed], ephemeral: true, components: [buttonsManage, aktbutton, babutton]});



        });
    }
}