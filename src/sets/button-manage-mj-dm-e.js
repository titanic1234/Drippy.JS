//Set Button Manage Member Join Welcome Message Reset

const { MessageActionRow, MessageButton, MessageEmbed, Permissions, MessageCollector} = require('discord.js');
const fs = require('fs');

module.exports = {
    name: "setbuttonmanagemjdme",
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


                var text = json_data.memberjoin.member.description;
                const member = message.member;

                if (json_data.memberjoin.member.description === null) text = `Welcome to the ${member.guild.name} sever. Please read the rules carefully first so that there are no problems. We wish you a lot of fun on the server! If you have any questions, please do not hesitate to contact our team. \nKing regards\nYour ${member.guild.name} team`;

                const embed2 = new MessageEmbed()
                    .setTitle("Settings - Management - Member Join - Directly Message - Edit")
                    .setDescription(`This is the current text:\n\n${text.toString()}\n\n You can simply write the new text for the message in the chat and then confirm it.\nTo mention the user who is joint, simply write "@" at this point.(comming soon)\nIf you want to end the command, just write "stop".`)
                    .setTimestamp()
                    .setColor("#00ff0d")

                const button = {
                    "type": 1,
                    "components": [
                        {
                            "type": 2,
                            "label": "Back",
                            "style": 4,
                            "custom_id": `setManageMJDMBack:::${message.member.id}`
                        }
                    ]
                };



                await message.message.delete();
                await message.channel.send({embeds: [embed2], components: [button]})


                var cmd = true;
                var save_msg = null;
                var embed;
                var falsch = 0;


                while (cmd) {
                    embed = new MessageEmbed()
                        .setTitle("Settings - Management - Member Join - Directly Message - Edit")
                        .setDescription("We could not understand this message. If you want to cancel the command, please enter \"stop\". ")
                        .setTimestamp()
                        .setColor("#ff0000")

                    const msg = await client.sets.get("awaitmessage").execute(client, message)

                    if (msg.author.id === client.id) continue;
                    if (msg.author.bot) continue;
                    if (message.user.id !== msg.author.id) continue;

                    if (msg.toString() === "n") {
                        save_msg = null;
                        embed = new MessageEmbed()
                            .setTitle("Settings - Management - Member Join - Directly Message - Edit")
                            .setDescription("The text was not saved. Please specify a channel again.")
                            .setTimestamp()
                            .setColor("#ff0000")
                    }
                    else if (msg.toString() === "y" && save_msg != null) {
                        json_data.memberjoin.member.description = save_msg.toString();
                        fs.writeFile(`Server/${message.message.member.guild.id.toString()}.json`, JSON.stringify(json_data), () => {
                        });
                        cmd = false;
                        embed = new MessageEmbed()
                            .setTitle("Settings - Management - Member Join - Directly Message - Edit")
                            .setDescription("The text has been saved! If you want to continue, just press the Continue button below.")
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
                        return msg.reply({embeds: [embed], components: [button]})
                    }
                    else if (msg.toString() === "stop") {
                        cmd = false;
                        embed = new MessageEmbed()
                            .setTitle("Settings - Management - Member Join - Directly Message - Edit")
                            .setDescription("The command was stoped.")
                            .setTimestamp()
                            .setColor("#00a7ff")
                    }
                    else if (falsch >= 5) {
                        cmd = false;
                        embed = new MessageEmbed()
                            .setTitle("Settings - Management - Member Join - Directly Message - Edit")
                            .setDescription("Too many unrecognisable messages were written. Please run the command again.")
                            .setTimestamp()
                            .setColor("#ff0000")
                    }
                    else if (save_msg === null) {

                        save_msg = msg;
                        embed = new MessageEmbed()
                            .setTitle("Settings - Management - Member Join - Directly Message - Edit")
                            .setDescription("Do you want to save this text? If yes, please enter \"y\" now. If not, please enter \"n\" now.")
                            .setTimestamp()
                            .setColor("#ffec00")


                    }
                    else {
                        falsch ++;
                    }

                    msg.reply({embeds: [embed]});

                }



            });
        }catch (error) {
            console.log("Error in Reset Directly Message: " + error.toString());
        }
    }
}