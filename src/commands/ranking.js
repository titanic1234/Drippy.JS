const {MessageEmbed, Permissions, Client} = require('discord.js');
fs = require('fs');

module.exports = {
    name: "ranking",
    description: "Erstellt Server ranking",
    async execute (client, message) {

        for (var i of client.guilds.cache) {
            //Öffnet die JSON Datei
            fs.readFile(`Server/${message.member.guild.id.toString()}.json`, "utf8", function (err,data) {
                if (err) {
                    console.log(err);
                }

                var liste3 = [];
                var liste2 = [];


                var json_data = JSON.parse(data);

                //Für jeden Member auf dem Server
                Object.keys(json_data["user"]).forEach(key => {
                    liste3.push(`${json_data.user[key].leveling.xp} : ${json_data.user[key].id}`);
                    liste2.push(`${json_data.user[key].leveling.xp}`);
                });

                //Liste sortieren und umdrehen
                function compareNumbers(a, b) {
                    return a - b;
                }

                liste2.sort(compareNumbers);
                liste2.reverse();


                //Für jedes Object in der Liste

                for (var x of liste2) {
                    for (var i of liste3) {

                        var lp = i.split(" : ");
                        if (lp[0] === x) {
                            json_data.user[lp[1]].leveling.rank = liste2.indexOf(x) + 1;
                        }

                    }
                }

                //Speichers in der JSON File
                fs.writeFile(`Server/${message.member.guild.id.toString()}.json`, JSON.stringify(json_data), () => {});

        });
        }


    }
}