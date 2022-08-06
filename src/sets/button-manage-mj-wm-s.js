//Set Button Manage Member Join Welcome Message Reset

const { MessageActionRow, MessageButton, MessageEmbed, Permissions, MessageCollector} = require('discord.js');
const fs = require('fs');

module.exports = {
    name: "setbuttonmanagemjwms",
    description: "Settings",
    async execute (client, message) {
        try {
            await fs.readFile(`Server/${message.message.member.guild.id.toString()}.json`, "utf8", async function (err, data) {
                if (err) {
                    console.log(err);
                }

                //console.log(message);

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

                if (modberecht === false) {
                    return client.commands.get("permission_error").execute(client, message);
                }

                var text = json_data.memberjoin.message;
                const member = message.member;

                if (json_data.memberjoin.message === null) text = `${member.user.username}#${member.user.discriminator} has joined the server. It's good to have you here. If you have any questions, please contact the support. Your ${member.guild.name}-Team`;

                const embed = new MessageEmbed()
                    .setTitle("Settings - Management - Member Join - Welcome Message - Show")
                    .setDescription(`This is the current text:\n\n${text.toString()}\n\n If you want to go back, just press the Back button below.`)
                    .setTimestamp()
                    .setColor("#00ff0d")

                const button = {
                    "type": 1,
                    "components": [
                        {
                            "type": 2,
                            "label": "Back",
                            "style": 4,
                            "custom_id": `setManageMJWMBack:::${message.member.id}`
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