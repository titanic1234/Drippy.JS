const prefix = '!#';
const {MessageEmbed, Permissions, Client} = require('discord.js');
fs = require('fs');

module.exports = {
    name: "leveling",
    description: "Leveling Server Intern",
    async execute (client, message) {

        try {

            var xp = Math.floor(Math.random() * 10) + 20;


            fs.readFile(`Server/${message.member.guild.id.toString()}.json`, "utf8", async function (err,data) {
                if (err) {
                    console.log(err);
                }

                var userid = message.member.id.toString();


                const json_data = JSON.parse(data);

                //Timestap überprüfen
                if (Date.now() - 60000 < json_data.user[userid].leveling.last_message_time) return;


                json_data.user[userid].leveling.message_count ++;
                //old_xp steht für die XP vor der Message
                var old_xp = json_data.user[userid]["leveling"].xp;
                //new_xp steht für die XP nach der Message
                var new_xp = old_xp + xp;
                json_data.user[userid]["leveling"].xp = new_xp;

                //Timestap
                json_data.user[userid].leveling.last_message_time = Date.now()


                if (new_xp < 500) {
                    //Level wir auf 0 gesetzt
                    json_data.user[userid]["leveling"].levels = 0;
                } else {
                    //l steht für Level
                    var l = json_data.user[userid]["leveling"].levels;
                    //richtiges Level wird gesucht durch ausprobieren
                    while (new_xp > Math.pow(l, 2)*500) {
                        l++;
                    }
                    l = l - 1;
                    json_data.user[userid]["leveling"].levels = l;
                }
                fs.writeFile(`Server/${message.member.guild.id.toString()}.json`, JSON.stringify(json_data), () => {});
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
            });

            fs.readFile(`User/${message.author.id.toString()}.json`, "utf8", async function (err,data) {
                if (err) {
                    console.log(err);
                }


                const json_data = JSON.parse(data);

                //Timestap überprüfen
                if (Date.now() - 60000 < json_data.leveling.last_message_time) return;


                json_data.leveling.message_count ++;
                //old_xp steht für die XP vor der Message
                var old_xp = json_data["leveling"].xp;
                //new_xp steht für die XP nach der Message
                var new_xp = old_xp + xp;
                json_data["leveling"].xp = new_xp;

                //Timestap
                json_data.leveling.last_message_time = Date.now();


                if (new_xp < 1000) {
                    //Level wir auf 0 gesetzt
                    json_data["leveling"].levels = 0;
                } else {
                    //l steht für Level
                    var l = json_data["leveling"].levels;
                    //richtiges Level wird gesucht durch ausprobieren
                    while (new_xp > l*1000) {
                        l++;
                    }
                    l = l - 1;
                    json_data["leveling"].levels = l;
                }
                fs.writeFile(`User/${message.author.id.toString()}.json`, JSON.stringify(json_data), () => {});
            });


        } catch (err) {
            //message.channel.send({content: "An error has occurred. Please try again. If the error still occurs, do not hesitate to contact us.", ephemeral: true});

            console.log("Ein Error ist bei leveling aufgetreten:\n");
            console.error(err);
            console.log("\n\n---------------------------------------\n\n");
        }



    }
}