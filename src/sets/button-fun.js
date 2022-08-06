const { MessageActionRow, MessageButton, MessageEmbed, Permissions} = require('discord.js');
const fs = require('fs');
const sleep = require('sleep-promise');

module.exports = {
    name: "setbuttonfun",
    description: "Settings für Fun Button",
    async execute (client, message) {
        console.log("Fun");
        console.log(message);

        fs.readFile(`Server/${message.member.guild.id.toString()}.json`, "utf8", async function (err,data) {
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



            const setFunEmbed = new MessageEmbed()
                .setTitle("Settings - Fun")
                .setDescription("This allows you to set everything for the individual functions of the Drippy Bot:")
                .setColor("#003cff")
                .setFields(
                    {name: "Tuning meeting", value: "Button: Tuning Meeting"},
                    {name: "Quiz", value: "Button: Quiz"},
                    {name: "Other Fun", value: "Button: Other Fun"},
                    {name: "\n\nINFO", value: "More functions will be added. More detailed information on the individual functions can be obtained with #help"}
                )
                .setTimestamp()
                .setThumbnail(message.guild.iconURL())

            const buttonsFun = {
                "type": 1,
                "components": [
                    {
                        "type": 2,
                        "label": "Tuning Meeting",
                        "style": 1,
                        "custom_id": `setFunTT:::${message.member.id}`
                    },
                    {
                        "type": 2,
                        "label": "Quiz",
                        "style": 1,
                        "custom_id": `setFunQuiz:::${message.member.id}`
                    },
                    {
                        "type": 2,
                        "label": "Other Fun",
                        "style": 1,
                        "custom_id": `setFunOF:::${message.member.id}`
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
            await message.channel.send({embeds: [setFunEmbed], ephemeral: true, components: [buttonsFun]});

            /*await message.reply("Antwort").then(msg => {
                msg.delete({ timeout: 5 time unitl delete in milliseconds});
            });
            */
        });
    }
}