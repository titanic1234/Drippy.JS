const { MessageActionRow, MessageButton, MessageEmbed, Permissions} = require('discord.js');
const fs = require('fs');
const sleep = require("sleep-promise");


module.exports = {
    name: "tuningtreffen",
    description: "Settings",
    async execute(client) {
        fs.readFile(`bot_settings.json`, "utf8", async function (err, data) {
            if (err) {
                console.log(err);
            }

            var json_data_bot = JSON.parse(data);

            //var interval01 = setInterval ( tt, 20000);

            function tt() {

                //if (!json_data_bot.tt) {
                //    clearInterval(interval01);
                //    return;
                //}

                console.log("TT Start");

                client.guilds.cache.forEach(async key => {

                    if (!json_data_bot.tt) {
                        //clearInterval(interval01);
                        return;
                    }
                    //console.log(key);
                    const guild = client.guilds.cache.find(guild => guild.id === key.id.toString());

                    await client.events.get("guildCreate").execute(client, guild, false);
                    await sleep(200);

                    if (key.id.toString() === "714829455826354228") {
                        fs.readFile(`Server/${key.id.toString()}.json`, "utf8", async function (err, data) {
                            if (err) {
                                console.log(err);
                            }

                            var json_data = JSON.parse(data);

                            var interval02 = setInterval (phasen, 5000);

                            async function phasen() {
                                if (!json_data_bot.tt) {
                                    clearInterval(interval02);
                                    return;
                                }
                                if (json_data.tt.aktivierung === true) {
                                    if (json_data.tt.aktuelle_phase === 0) {
                                        console.log("Starten...");
                                        json_data.tt.time_next_phase = Date.now() + json_data.tt.distance_s_t;
                                        json_data.tt.aktuelle_phase = 1;
                                        //Muss noch in die Datei geschrieben werden!!!
                                        if (json_data.tt.info_channel_id === null || guild.channels.cache.get(json_data.tt.info_channel_id) === undefined) {
                                            console.log("Test01")
                                            var channel = guild.channels.cache.get(guild.systemChannelId);
                                        }
                                        else {
                                            var channel = guild.channels.cache.get(json_data.tt.info_channel_id.toString());
                                        }

                                        if (channel === undefined) {
                                            json_data.tt.aktivierung = false;
                                            json_data.tt.aktuelle_phase = 0;
                                            const owner = client.users.cache.find(user => user.id === guild.ownerId);
                                            await owner.send("The tuning meeting could be started because no channel for info was set and the community function is not activated!");
                                            clearInterval(interval02);
                                            return;
                                        }

                                        await channel.send("Tuning Treffen Phase 1 wurde gestartet");


                                        var ort = json_data.tt.locations[(Math.random() * json_data.tt.locations.length) | 0];
                                        var fahrzeug = json_data.tt.vehicels[(Math.random() * json_data.tt.vehicels.length) | 0];

                                        await channel.send(`Die Location ist dieses mal: ${ort.toString()}!\nUnd die Fahrzeugklasse ist: ${fahrzeug.toString()}!`);
                                        await channel.send("Die Anmeldung für Tuning Treffen wurde eröffnet!");



                                        fs.writeFile(`Server/${key.id.toString()}.json`, JSON.stringify(json_data), () => {});


                                        clearInterval(interval02);
                                        return;
                                    }

                                    if (json_data.tt.aktuelle_phase === 1) {

                                        console.log("Warten...")

                                        if (Number(json_data.tt.time_next_phase) <= Number(Date.now())) {

                                            if (json_data.tt.anmeldung < 4) {
                                                if (json_data.tt.info_channel_id === null || guild.channels.cache.get(json_data.tt.info_channel_id) === undefined) {
                                                    var channel = guild.channels.cache.get(guild.systemChannelId);
                                                }
                                                else {
                                                    var channel = guild.channels.cache.get(json_data.tt.info_channel_id.toString());
                                                }

                                                await channel.send("Da es zu wenige Teilnehmer gibt, wird die Anmeldung um 24 Stunden verlängert!");
                                                json_data.tt.time_next_phase = Date.now() + json_data.tt.distance_s_t;
                                                //fs.writeFile(`Server/${key.id.toString()}.json`, JSON.stringify(json_data), () => {});

                                                clearInterval(interval02);
                                                return;


                                            }
                                            json_data.tt.time_next_phase = null;
                                            json_data.tt.aktuelle_phase = 2;

                                            fs.writeFile(`Server/${key.id.toString()}.json`, JSON.stringify(json_data), () => {});
                                        }

                                    }

                                    if (json_data.tt.aktuelle_phase === 2) {
                                        console.log("Einteilen")
                                        var teilnehmer = [];
                                        var gruppen_anzahl = 1;
                                        var gruppen_listen = [];


                                        Object.keys(json_data["user"]).forEach(user => {
                                            if (json_data.user[user].fun.tt.teilnamhe === true) teilnehmer.push(json_data.user[user].id.toString()); //TEILNAHHHHHHME!!!
                                        });

                                        console.log(teilnehmer);


                                        var teilnehmerzahl = 10;//Number(teilnehmer.length);
                                        var teilnehmer_pro_gruppe = teilnehmerzahl;

                                        console.log(teilnehmerzahl);

                                        console.log(1000 * (teilnehmerzahl/500));

                                        if (teilnehmerzahl >= 100 && teilnehmerzahl < 1000) {
                                            var teilnehmer_pro_gruppe_gewollt = Number(teilnehmerzahl / 10)
                                        }

                                        if (teilnehmerzahl >= 1000 && teilnehmerzahl < 10000) {
                                            var teilnehmer_pro_gruppe_gewollt = Number(teilnehmerzahl / 50)
                                        }

                                        if (teilnehmerzahl >= 10000) {
                                            var teilnehmer_pro_gruppe_gewollt = Number(teilnehmerzahl / 100)
                                        }



                                        console.log("Function start");




                                        var interval_gruppen_anzahl_herausfinden = setInterval(gruppen_anzah_herausfinden, 1);

                                        async function gruppen_anzah_herausfinden() {
                                            //console.log(teilnehmer_pro_gruppe);
                                            //console.log(gruppen_anzahl);


                                            if (teilnehmer_pro_gruppe < 4 ||
                                                (teilnehmerzahl >= 20 && teilnehmerzahl < 52 && teilnehmer_pro_gruppe < 5) ||
                                                (teilnehmerzahl >= 52 && teilnehmerzahl < 100 && teilnehmer_pro_gruppe < 7) ||
                                                (teilnehmerzahl >= 100 && teilnehmerzahl < 10000 && teilnehmer_pro_gruppe < teilnehmer_pro_gruppe_gewollt) ||
                                                (teilnehmerzahl >= 10000 && teilnehmer_pro_gruppe < teilnehmer_pro_gruppe_gewollt)) {
                                                console.log("Function stop");

                                                gruppen_anzahl --;
                                                clearInterval(interval_gruppen_anzahl_herausfinden);
                                                return;

                                            } else {
                                                //console.log("2");
                                                gruppen_anzahl++;
                                                teilnehmer_pro_gruppe = teilnehmerzahl / gruppen_anzahl;
                                            }
                                        }

                                        if (teilnehmerzahl < 200) {
                                            await sleep(1000 * (teilnehmerzahl/100));
                                        }



                                        else {
                                            await sleep(1500);
                                        }



                                        console.log("Weiter...")
                                        console.log(gruppen_anzahl);


                                        console.log("For Gruppen")
                                        for (let xyz = 1; xyz <= gruppen_anzahl; xyz++) {
                                            console.log(xyz);

                                            json_data.tt.gruppen["gruppe_" + xyz.toString()] = [];



                                        }
                                        //fs.writeFile(`Server/${key.id.toString()}.json`, JSON.stringify(json_data), () => {});


                                        console.log("For teilnehmer")
                                        for (var i of teilnehmer) {


                                        }
                                    }

                                    if (json_data.tt.aktuelle_phase === 3) {

                                    }

                                    if (json_data.tt.aktuelle_phase === 4) {

                                    }

                                    if (json_data.tt.aktuelle_phase === 5) {

                                    }

                                    if (json_data.tt.aktuelle_phase === 6) {

                                    }
                                }
                            }
                        });
                    }

                });

            }

            await tt();
        });

    }
}