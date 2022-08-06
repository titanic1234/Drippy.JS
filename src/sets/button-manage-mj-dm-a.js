const { MessageActionRow, MessageButton, MessageEmbed, Permissions} = require('discord.js');
const fs = require('fs');

module.exports = {
    name: "setbuttonmanagemjdma",
    description: "Settings",
    async execute(client, message) {
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

            json_data.memberjoin.member.aktiviert = true;
            fs.writeFile(`Server/${message.message.member.guild.id.toString()}.json`, JSON.stringify(json_data), () => {});


            const embed = new MessageEmbed()
                .setTitle("Set - Management - Member Join - Directly Message - Activate")
                .setDescription("Directly Message was successfully activated.")
                .setColor("#00ff04")
                .setThumbnail(message.guild.iconURL())
                .setTimestamp()

            message.reply({embeds: [embed]});

        });
    }
}