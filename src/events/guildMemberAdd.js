const { MessageActionRow, MessageButton, MessageEmbed, Permissions} = require('discord.js');
const fs = require('fs');

module.exports = {
    name: "guildMemberAdd",
    description: "Member Join",
    async execute(client, member, join, guild) {
        try {


            const jsonFilesUser = fs.readdirSync('User/').filter(file => file.endsWith('.json'));

            if (!jsonFilesUser.includes(member.id + ".json")) {
                fs.readFile(`copy_user.json`, "utf-8", async function (err, data) {
                    if (err) {
                        console.log(err);
                    }

                    var json_data_user = JSON.parse(data);

                    json_data_user.id = member.id.toString()

                    fs.writeFile(`User/${member.id}.json`, JSON.stringify(json_data_user), () => {
                    });
                });
            }

            var exists = false;

            var p;

            try {
                p = member.guild.id;
                if (p === null) {
                    p = guild;
                }

            } catch (error) {
                p = guild;
            }


            fs.readFile(`Server/${p}.json`, "utf8", async function (err, data) {
                if (err) {
                    console.log(err);
                }

                const json_data = JSON.parse(data);

                Object.keys(json_data["user"]).forEach(key => {


                    if (json_data.user[key].id === member.id.toString() && exists === false) {
                        exists = true;
                    }
                });

                if (exists === false) {

                    fs.readFile(`copy_member.json`, "utf8", async function (err, data2) {
                        if (err) {
                            console.log(err);
                        }

                        const json_data2 = JSON.parse(data2);

                        json_data.user[member.id.toString()] = json_data2;
                        json_data.user[member.id.toString()].id = member.id.toString()
                        fs.writeFile(`Server/${p}.json`, JSON.stringify(json_data), () => {
                        });

                    });

                }

                if (!join) return;

                var channel = member.guild.channels.cache.get(member.guild.systemChannelId);

                if (json_data.memberjoin.infos.channel !== null) {
                    channel = client.channels.cache.get(json_data.memberjoin.infos.channel.toString());
                } else {
                    channel = client.channels.cache.get(member.guild.systemChannelId.toString());
                }


                if (channel === undefined) {
                    channel = member.guild.channels.cache.get(member.guild.systemChannelId);

                }

                var msg = `${member.user.username}#${member.user.discriminator} has joined the server. It's good to have you here. If you have any questions, please contact the support. Your ${member.guild.name}-Team`;

                if (json_data.memberjoin.message !== null) {
                    msg = `<@${member.id.toString()}> ` + json_data.memberjoin.message.toString();
                }

                var col = "#00ff99";

                if (json_data.memberjoin.infos.color !== null) {
                    col = json_data.memberjoin.infos.color.toString();
                }

                var thumb = member.guild.iconURL();

                if (json_data.memberjoin.infos.thumpnail === false) thumb = null;

                const messageEmbed = new MessageEmbed()
                    .setTitle(member.guild.name.toString())
                    .setDescription(msg.toString())
                    .setColor(col.toString())
                    .setTimestamp()
                    .setThumbnail(thumb)

                const button = {
                    "type": 1,
                    "components": [
                        {
                            "type": 2,
                            "label": "Sent by Drippy",
                            "style": 2,
                            "custom_id": "drippy",
                            "disabled": true
                        }
                    ]
                };


                if (json_data.memberjoin.infos.aktiviert) {
                    try {
                        await channel.send({embeds: [messageEmbed], components: [button]});
                    } catch (err) {
                        console.log(null);
                    }
                }


                try {
                    if (json_data.memberjoin.roles.length > 0) {
                        for (var i of json_data.memberjoin.roles) {
                            var role = member.guild.roles.cache.find(r => r.id === i.toString());
                            await member.roles.add(role);
                        }
                    }
                } catch (err) {
                    try {
                        await member.guild.systemChannel.send(":x: The position of the drippy roll is too low to add all the rolls for new members. :x:");
                    } catch (err) {
                        console.log(null);
                    }

                    console.log(err);
                }

                if (!json_data.memberjoin.member.aktiviert) return;

                var title = json_data.memberjoin.member.title
                var description = json_data.memberjoin.member.description
                var color = json_data.memberjoin.member.color
                var thumbnail = json_data.memberjoin.member.thumbnail

                if (description === null) {
                    description = `Welcome to the ${member.guild.name} sever. Please read the rules carefully first so that there are no problems. We wish you a lot of fun on the server! If you have any questions, please do not hesitate to contact our team. \nKing regards\nYour ${member.guild.name} team`
                }
                if (thumbnail === true) {
                    thumbnail = member.guild.iconURL()
                }

                const memberEmbed = new MessageEmbed()
                    .setTitle(title.toString() + " - " + member.guild.name.toString())
                    .setDescription(description.toString())
                    .setThumbnail(member.guild.iconURL())
                    .setColor(color.toString())
                    .setTimestamp()


                const memberButtons = {
                    "type": 1,
                    "components": [
                        {
                            "type": 2,
                            "label": `Sent from ${member.guild.name} by Drippy`,
                            "style": 2,
                            "custom_id": "memberEmbed",
                            "disabled": true
                        }
                    ]
                }


                await member.send({embeds: [memberEmbed], components: [memberButtons]}).catch(console.error);


            });

        } catch(err) {
            console.log("Ein Error ist bei guildmemberAdd aufgetreten:\n");
            console.error(err);
            console.log("\n\n---------------------------------------\n\n");
            await client.events.get("guildMemberAdd").execute(client, member, true, guild);
        }
    }
}