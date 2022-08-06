//Set Button Manage Automod Forbidden Words Add

const { MessageActionRow, MessageButton, MessageEmbed, Permissions, MessageCollector} = require('discord.js');
const fs = require('fs');

module.exports = {
    name: "setbuttonmanageamfwa",
    description: "Settings",
    async execute (client, message) {
        try {
            await fs.readFile(`Server/${message.message.member.guild.id.toString()}.json`, "utf8", async function (err, data) {
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


                var cmd = true;
                var channels = [];
                for (var p of json_data.automod.wörter) {
                    channels.push(`- ${p.toString()}`);
                }
                if (channels.length === 0) {
                    channels = ["There are no forbidden words yet."];
                }
                const setManageEmbed = new MessageEmbed()
                    .setTitle("Settings - Management - Automod - Forbidden words - Add")
                    .setDescription("Please write now in the chat which word you want to add. You can end the command by entering \"stop\".")
                    .setColor("#003cff")
                    .setFields(
                        {
                            name: "These are all forbidden words", value: "⠀\n" + channels.join("\n")
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
                            "custom_id": `setManageAMFWBack:::${message.member.id}`
                        }
                    ]
                };


                await message.message.delete();
                await message.channel.send({embeds: [setManageEmbed], components: [buttons]});

                var role;
                var save_role = null;
                var msg2;
                var embed;
                var falsch = 0;


                while (cmd) {
                    embed = new MessageEmbed()
                        .setTitle("Settings - Management - Automod - Forbidden words - Add")
                        .setDescription("We could not understand this message. If you want to cancel the command, please enter \"stop\". ")
                        .setTimestamp()
                        .setColor("#ff0000")


                    const msg = await client.sets.get("awaitmessage").execute(client, message)

                    if (msg.author.id === client.id) continue;
                    if (msg.author.bot) continue;
                    if (message.user.id !== msg.author.id) continue;

                    role = msg.content.toString();


                    if (msg.toString() === "n") {
                        save_role = null;
                        embed = new MessageEmbed()
                            .setTitle("Settings - Management - Automod - Forbidden words - Add")
                            .setDescription("The word is not added. Please specify a role again.")
                            .setTimestamp()
                            .setColor("#ff0000")
                    }
                    else if (msg.toString() === "y" && save_role != null) {
                        json_data.automod.wörter.push(save_role.toString());
                        fs.writeFile(`Server/${message.message.member.guild.id.toString()}.json`, JSON.stringify(json_data), () => {
                        });
                        cmd = false;
                        embed = new MessageEmbed()
                            .setTitle("Settings - Management - Automod - Forbidden words - Add")
                            .setDescription("The word was added! If you want to continue, just press the Continue button below.")
                            .setTimestamp()
                            .setColor("#00ff0d")

                        const button = {
                            "type": 1,
                            "components": [
                                {
                                    "type": 2,
                                    "label": "Continue",
                                    "style": 3,
                                    "custom_id": `setManageAMBack:::${message.member.id}`
                                }
                            ]
                        };
                        return msg.reply({embeds: [embed], components: [button]})

                    }
                    else if (msg.toString() === "stop") {
                        cmd = false;
                        embed = new MessageEmbed()
                            .setTitle("Settings - Management - Automod - Forbidden words - Add")
                            .setDescription("The command was stoped.")
                            .setTimestamp()
                            .setColor("#00a7ff")
                    }
                    else if (role != null && save_role === null) {
                        if (!json_data.automod.wörter.includes(role.toString())) {
                            save_role = role;
                            embed = new MessageEmbed()
                                .setTitle("Settings - Management - Automod - Forbidden words - Add")
                                .setDescription("Would you like to add this word? If yes, please enter \"y\" now. If not, please enter \"n\" now.")
                                .setTimestamp()
                                .setColor("#ffec00")
                        } else {
                            embed = new MessageEmbed()
                                .setTitle("Settings - Management - Automod - Forbidden words - Add")
                                .setDescription(":x:This word has already been added to the list!:x:")
                                .setTimestamp()
                                .setColor("#ff0000")
                        }

                    }
                    else if (falsch >= 5) {
                        cmd = false;
                        embed = new MessageEmbed()
                            .setTitle("Settings - Management - Automod - Forbidden words - Add")
                            .setDescription("Too many unrecognisable messages were written. Please run the command again.")
                            .setTimestamp()
                            .setColor("#ff0000")
                    }
                    else {
                        falsch ++;
                    }

                    msg.reply({embeds: [embed]});

                }
            });
        }catch (error) {
            console.log("Error in Add Forbidden words: " + error.toString());
        }
    }
}