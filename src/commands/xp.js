const {MessageEmbed, Permissions, Client, GuildMember} = require('discord.js');
const sleep = require("sleep-promise");
fs = require('fs');

module.exports = {
    name: "rank",
    description: "XP Abfrage",
    async execute (client, message, member) {
        try {


            //Überprüft Member
            if (member === undefined) {
                member = message.user;
            } else {
                try {
                    //Versucht die User ID zu bekommen und zu User umzuwandeln
                    member = member.split("<@").join("").split(">").join("");
                    member = client.users.cache.find(user => user.id === member);
                    if (member === undefined) {
                        member = message.author;
                    }
                }

                catch(error) {
                    //Sonst ist Member = Message Author
                    member = message.author;
                }
            }


            var guildid = message.guild.id

            //Führt guildMemberAdd aus
            await client.events.get("guildMemberAdd").execute(client, member, false, guildid);
            await sleep(200);


            fs.readFile(`Server/${message.member.guild.id.toString()}.json`, "utf8", async function (err,data) {
                if (err) {
                    console.log(err);
                }

                //Hohlt sich alle Infos fürs Ranking

                var userid = member.id.toString()

                const json_data = JSON.parse(data);
                const xp = json_data.user[userid].leveling.xp;
                const level = json_data.user[userid].leveling.levels;
                const xp_level = json_data.user[userid].leveling.xp_level;
                const message_count = json_data.user[userid].leveling.message_count;
                const rank = json_data.user[userid].leveling.rank;



                //embed

                const levelEmbed = new MessageEmbed()
                    .setColor("#29507a")
                    .setTimestamp()
                    .setTitle(`${member.username} - Level`)
                    .setDescription("Here you can see information about your current level and your total XP as well as the XP of your current level.")
                    .addFields(
                        {name: `Your current level: `, value: `${level}`},
                        {name: "Your current xp: ", value: `${xp}`},
                        {name: "This is how much XP you still need until the next level: ", value: "Still to come..."},
                        {name: "Your number of messages written: ", value: `${message_count}`},
                        {name: "Your current rank: ", value: `${rank}`}
                    )

                await message.channel.send({embeds: [levelEmbed]});
            });

        } catch (err) {
            await message.channel.send({content: "An error has occurred. Please try again. If the error still occurs, do not hesitate to contact us.", ephemeral: true});

            console.log("Ein Error ist bei #rank aufgetreten:\n");
            console.error(err);
            console.log("\n\n---------------------------------------\n\n");
        }
    }
}