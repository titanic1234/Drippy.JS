const { MessageActionRow, MessageButton, MessageEmbed, Permissions} = require('discord.js');
const fs = require('fs');

module.exports = {
    name: "setbuttonmanagemo",
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

            var dis_a = true;
            var dis_m = true;


            for (var i of message.member._roles) {
                if (message.guild.ownerId.toString() === message.member.id.toString()) {
                    adminberecht = true;
                    modberecht = true;
                    dis_a = false;
                    dis_m = false;
                    break;
                }
                if (message.member.permissions.has(Permissions.FLAGS.ADMINISTRATOR)) {
                    adminberecht = true;
                    modberecht = true;
                    dis_m = false;
                    break;
                }
                if (adminroles.includes(i.toString())) {
                    adminberecht = true;
                    dis_m = false;
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
                .setTitle("Settings - Management - Moderation")
                .setDescription("What exactly do you want to set? Just click the button below.")
                .setColor("#003cff")
                .setFields(
                    {name: "Admin permissions for roles", value: "Button: Admin Roles"},
                    {name: "Mod permissions for roles", value: "Button: Mod Roles"},
                    {name: "Guild language", value: "Button: Language"},
                    {name: "\n\nINFO", value: "More functions will be add channed. More detailed information on the individual functions can be obtained with #help"}
                )
                .setTimestamp()
                .setThumbnail(message.guild.iconURL())



            const buttonsManage = {
                "type": 1,
                "components": [
                    {
                        "type": 2,
                        "label": "Admin Roles",
                        "style": 4,
                        "custom_id": `setManageMOAP:::${message.member.id}`,
                        "disabled": dis_a
                    },
                    {
                        "type": 2,
                        "label": "Mod Roles",
                        "style": 3,
                        "custom_id": `setManageMOMP:::${message.member.id}`,
                        "disabled": dis_m
                    },
                    {
                        "type": 2,
                        "label": "Language",
                        "style": 1,
                        "custom_id": `setManageMOL:::${message.member.id}`
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