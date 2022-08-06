const {MessageEmbed, Permissions, Client} = require('discord.js');
const fs = require('fs');
const sleep = require('sleep-promise');


module.exports = {
    name: "lb",
    description: "leaderboard",
    async execute(client, message, seite_gewuenscht) {

        fs.readFile(`Server/${message.member.guild.id.toString()}.json`, "utf8", function (err,data) {
            if (err) {
                console.log(err);
            }

            var liste2 = [];
            var liste3 = [];

            var seiten = {};

            var json_data = JSON.parse(data);

            //Für jeden Member auf dem Server
            Object.keys(json_data["user"]).forEach(key => {
                liste2.push(`${json_data.user[key].leveling.xp}`);
                liste3.push(`${json_data.user[key].leveling.xp} : ${json_data.user[key].id} : ${json_data.user[key].leveling.levels}`);
            });

            //Liste sortieren und umdrehen

            function compareNumbers(a, b) { //Funktion von https://developer.mozilla.org/de/docs/Web/JavaScript/Reference/Global_Objects/Array/sort
                return a - b;
            }


            liste2.sort(compareNumbers);

            liste2.reverse();
            var seite = 1;

            if (seite_gewuenscht === undefined) {
                seite_gewuenscht = 1;
            }


            //Für jedes Object in der Liste

            var x = 1;


            for (var w of liste2) {

                for (var i of liste3) {

                    var lp = i.split(" : ");
                    if (lp[0] === w) {
                        var user = client.users.cache.find(user => user.id === lp[1]);
                        if (user === undefined || user === null) continue;


                        if (seite * 10 < x) {
                            seite ++;
                        }

                        if (seiten["seite_"+seite] === undefined) {
                            seiten["seite_"+seite] = []

                        }

                        seiten["seite_"+seite].push(`${x}. <@${user.id}>  • Level ${lp[2]} • XP ${lp[0]}\n`);

                        liste3.splice(liste3.indexOf(i), 1);
                        x++;
                        break

                    }

                }
            }
            console.log(seite);
            console.log(x);
            console.log(seite_gewuenscht);



            const lbEmbed = new MessageEmbed()
                .setTitle(`${message.guild.name} Leaderboard`)
                .setDescription(`This is the leaderboard of the ${message.guild.name} guild. \nCurrent page: ${seite_gewuenscht}`)
                .setColor("#0082ff")
                .addField("⠀", seiten["seite_"+seite_gewuenscht].join(""))
                .setTimestamp()
                .setThumbnail(message.guild.iconURL())



            var buttons;
            var con = false;

            if (Number(seite_gewuenscht) === seite) con = true;

            if (Number(seite_gewuenscht) === 1) {
                buttons = {
                    "type": 1,
                    "components": [
                        {
                            "type": 2,
                            "label": "<- Back",
                            "style": 1,
                            "custom_id": `lb:${Number(seite_gewuenscht) - 1}`,
                            "disabled": true
                        },
                        {
                            "type": 2,
                            "label": "Continue ->",
                            "style": 1,
                            "custom_id": `lb:${Number(seite_gewuenscht) + 1}`,
                            "disabled": con
                        }
                    ]
                }
            } else if (Number(seite_gewuenscht) === seite) {
                buttons = {
                    "type": 1,
                    "components": [
                        {
                            "type": 2,
                            "label": "<- Back",
                            "style": 1,
                            "custom_id": `lb:${Number(seite_gewuenscht) - 1}`
                        },
                        {
                            "type": 2,
                            "label": "Continue ->",
                            "style": 1,
                            "custom_id": `lb:${Number(seite_gewuenscht) + 1}`,
                            "disabled": true
                        }
                    ]
                }
            }
            else {
                buttons = {
                    "type": 1,
                    "components": [
                        {
                            "type": 2,
                            "label": "<- Back",
                            "style": 1,
                            "custom_id": `lb:${Number(seite_gewuenscht) - 1}`
                        },
                        {
                            "type": 2,
                            "label": "Continue ->",
                            "style": 1,
                            "custom_id": `lb:${Number(seite_gewuenscht) + 1}`
                        }
                    ]
                }
            }

            message.reply({
                embeds: [lbEmbed],
                components: [buttons]
            });


        });
    }
}