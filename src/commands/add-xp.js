const {MessageEmbed, Permissions, Client, MessageActionRow, MessageButton} = require('discord.js');


module.exports = {
    name: 'add-xp',
    description: 'Add XP to a Member',
    async execute(client, message, args) {
        try {
            var xp = args[0]
            var member = message.member

            if (args[1] === []) {
            } else {
                try {
                    //Versucht die User ID zu bekommen und zu User umzuwandeln
                    args[1] = args[1].split("<@").join("").split(">").join("");
                    message.member = message.guild.member.cache.find(user => user.id === member[0]);
                    if (message.member === undefined) {
                        message.member = member;
                    }
                }

                catch(error) {
                    //Sonst ist Message Member = Member
                    message.member = member;
                }
            }


            fs.readFile(`Server/${message.guild.id.toString()}.json`, "utf8", async function (err,data) {
                if (err) {
                    console.log(err);
                }

                var userid = message.member.id.toString();


                const json_data = JSON.parse(data);

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

                if (adminberecht === false) {
                    return client.commands.get("permission_error").execute(client, message);
                }


                //old_xp steht für die XP vor der Message
                var old_xp = json_data.user[userid]["leveling"].xp;
                //new_xp steht für die XP nach der Message
                var new_xp = Number(old_xp) + Number(xp);
                json_data.user[userid]["leveling"].xp = new_xp;

                //Timestap
                json_data.user[userid].leveling.last_message_time = Date.now()


                if (new_xp < 1000) {
                    //Level wir auf 0 gesetzt
                    json_data.user[userid]["leveling"].levels = 0;
                } else {
                    //l steht für Level
                    var l = json_data.user[userid]["leveling"].levels;
                    //richtiges Level wird gesucht durch ausprobieren
                    while (new_xp > l*1000) {
                        l++;
                        //if (message.guild.id.toString() === "714829455826354228") {
                        //    if (l > 2) {

                        //    }
                        //}
                    }
                    l = l - 1;
                    json_data.user[userid]["leveling"].levels = l;
                }
                fs.writeFile(`Server/${message.guild.id.toString()}.json`, JSON.stringify(json_data), () => {});
                try {
                    if (message.guild.id.toString() === "714829455826354228") {
                        if (l >= 5) {
                            var role = message.guild.roles.cache.find(r => r.id === "877912969764274196");
                            await message.member.roles.add(role);
                        }
                        if (l >= 10) {
                            var role = message.guild.roles.cache.find(r => r.id === "877913196760010752");
                            await message.member.roles.add(role);
                        }
                        if (l >= 15) {
                            var role = message.guild.roles.cache.find(r => r.id === "877913154435309628");
                            await message.member.roles.add(role);
                        }
                        if (l >= 20) {
                            var role = message.guild.roles.cache.find(r => r.id === "877913447180959744");
                            await message.member.roles.add(role);
                        }
                        if (l >= 30) {
                            var role = message.guild.roles.cache.find(r => r.id === "877913422715559939");
                            await message.member.roles.add(role);
                        }
                        if (l >= 50) {
                            var role = message.guild.roles.cache.find(r => r.id === "877913840283688980");
                            await message.member.roles.add(role);
                        }
                        if (l >= 100) {
                            var role = message.guild.roles.cache.find(r => r.id === "877913831664410695");
                            await message.member.roles.add(role);
                        }
                        if (l >= 150) {
                            var role = message.guild.roles.cache.find(r => r.id === "928301343003799602");
                            await message.member.roles.add(role);
                        }
                    }
                } catch (err) {
                    console.log(err);
                }


                const embed = new MessageEmbed()
                    .setTimestamp()
                    .setTitle("Add XP")
                    .setDescription(`You have added ${xp} XP to the user <@${message.member.id.toString()}>`)
                    .setColor("#5bc24e")

                await message.reply({embeds: [embed]});

                await client.commands.get("rank").execute(client, message, message.member.id.toString());
            });

        } catch (err) {
            await message.channel.send({content: "An error has occurred. Please try again. If the error still occurs, do not hesitate to contact us.", ephemeral: true});

            console.log("Ein Error ist bei #add-xp aufgetreten:\n");
            console.error(err);
            console.log("\n\n---------------------------------------\n\n");
        }
    }
}