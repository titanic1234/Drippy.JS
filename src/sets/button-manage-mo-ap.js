//Set Button Manage Automod Ignorde Roles

const { MessageActionRow, MessageButton, MessageEmbed, Permissions} = require('discord.js');
const fs = require('fs');

module.exports = {
    name: "setbuttonmanagemoap",
    description: "Settings",
    async execute (client, message) {
        fs.readFile(`Server/${message.message.member.guild.id.toString()}.json`, "utf8", async function (err, data) {
            if (err) {
                console.log(err);
            }

            var json_data = JSON.parse(data);
            var dis = false;


            if (json_data.moderation.roles_admin.length === 0) dis = true;



            if (message.message.guild.ownerId.toString() === message.message.member.id.toString()) {
                return client.commands.get("permission_error").execute(client, message);
            }


            const setManageEmbed = new MessageEmbed()
                .setTitle("Settings - Management - Moderation - Admin Roles")
                .setDescription("What exactly do you want to set? Just click the button below.")
                .setColor("#003cff")
                .setFields(
                    {name: "Add a Admin role", value: "Button: Add"},
                    {name: "Remove a Admin role", value: "Button: Remove"},
                    {name: "Show all Admin roles", value: "Button: Show"},
                    {
                        name: "\n\nINFO",
                        value: "More functions will be add channed. More detailed information on the individual functions can be obtained with #help"
                    }
                )
                .setTimestamp()
                .setThumbnail(message.message.guild.iconURL())

            const buttonsManage = {
                "type": 1,
                "components": [
                    {
                        "type": 2,
                        "label": "Add",
                        "style": 1,
                        "custom_id": `setManageMOAPA:::${message.member.id}`
                    },
                    {
                        "type": 2,
                        "label": "Remove",
                        "style": 1,
                        "custom_id": `setManageMOAPR:::${message.member.id}`,
                        "disabled": dis
                    },
                    {
                        "type": 2,
                        "label": "Show",
                        "style": 1,
                        "custom_id": `setManageMOAPS:::${message.member.id}`
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