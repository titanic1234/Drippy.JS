//Set Button Manage Member Join Welcome Message Reset

const { MessageActionRow, MessageButton, MessageEmbed, Permissions, MessageCollector} = require('discord.js');
const fs = require('fs');

module.exports = {
    name: "setbuttonmanagemjwmr",
    description: "Settings",
    async execute (client, message) {
        try {
            fs.readFile(`Server/${message.message.member.guild.id.toString()}.json`, "utf8", async function (err, data) {
                if (err) {
                    console.log(err);
                }


                var json_data = JSON.parse(data);
                var adminroles = json_data.moderation.roles_admin;
                var modroles = json_data.moderation.roles_mod;
                var modberecht = false;
                var adminberecht = false;


                for (var i of message.message.member._roles) {
                    if (message.message.guild.ownerId.toString() === message.message.member.id.toString()) {
                        adminberecht = true;
                        modberecht = true;
                        break;
                    }
                    if (message.message.member.permissions.has(Permissions.FLAGS.ADMINISTRATOR)) {
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



                json_data.memberjoin.message = null;

                fs.writeFile(`Server/${message.message.member.guild.id.toString()}.json`, JSON.stringify(json_data), () => {});

                const embed = new MessageEmbed()
                    .setTitle("Settings - Management - Member Join - Welcome Message - Reset")
                    .setDescription("The welcome message text has been reset! If you want to continue, just press the Continue button below.")
                    .setTimestamp()
                    .setColor("#00ff0d")

                const button = {
                    "type": 1,
                    "components": [
                        {
                            "type": 2,
                            "label": "Continue",
                            "style": 3,
                            "custom_id": `setManageMJBack:::${message.member.id}`
                        }
                    ]
                };
                await message.message.delete();
                await message.channel.send({embeds: [embed], components: [button]})



            });
        }catch (error) {
            console.log("Error in Reset Welcome Message: " + error.toString());
        }
    }
}