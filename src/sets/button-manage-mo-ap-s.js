//Set Button Manage Automod Ignorde Channels Show

const { MessageActionRow, MessageButton, MessageEmbed, Permissions, MessageCollector} = require('discord.js');
const fs = require('fs');

module.exports = {
    name: "setbuttonmanagemoaps",
    description: "Settings",
    async execute (client, message) {
        try {
            await fs.readFile(`Server/${message.message.member.guild.id.toString()}.json`, "utf8", async function (err, data) {
                if (err) {
                    console.log(err);
                }


                var json_data = JSON.parse(data);



                if (message.message.guild.ownerId.toString() === message.message.member.id.toString()) {
                    return client.commands.get("permission_error").execute(client, message);
                }


                var channels = [];
                for (var p of json_data.moderation.roles_admin) {
                    channels.push(`<@&${p.toString()}> ID: ${p.toString()}`);
                }
                if (channels.length === 0) {
                    channels = ["There are no admin roles yet."];
                }
                const setManageEmbed = new MessageEmbed()
                    .setTitle("Settings - Management - Moderation - Admin Roles - Show")
                    .setDescription("⠀")
                    .setColor("#003cff")
                    .setFields(
                        {
                            name: "These are all admin roles", value: "⠀\n" + channels.join("\n")
                        },
                        {
                            name: "\n\nINFO",
                            value: "More functions will be add channed. More detailed information on the individual functions can be obtained with #help"
                        }
                    )
                    .setTimestamp()
                    .setThumbnail(message.message.guild.iconURL())


                const buttons = {
                    "type": 1,
                    "components": [
                        {
                            "type": 2,
                            "label": "Back",
                            "style": 4,
                            "custom_id": `setManageMOAPBack:::${message.member.id}`
                        }
                    ]
                };


                await message.message.delete();
                await message.channel.send({embeds: [setManageEmbed], components: [buttons]});

            });
        }catch (error) {
            console.log("Error in Add Admin roles: " + error.toString());
        }
    }
}