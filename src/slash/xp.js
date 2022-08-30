const { MessageEmbed } = require("discord.js");
const fs = require("fs");
const sleep = require("sleep-promise");
const { SlashCommandBuilder } = require("@discordjs/builders")

module.exports = {
    data: new SlashCommandBuilder().setName("rank").setDescription("See leveling info")//.setDefaultMemberPermissions(Permissions.FLAGS.KICK_MEMBERS | Permissions.FLAGS.BAN_MEMBERS)
        .addUserOption(option => option.setName("member").setDescription("Specify the member")),
    async execute(client, interaction) {
        try {
            var member = interaction.options.getUser("member");

            if (!member) member = interaction.user;


            var guildid = interaction.guild.id;

            //Führt guildMemberAdd aus
            await client.events.get("guildMemberAdd").execute(client, member, false, guildid);
            await sleep(200);


            fs.readFile(`Server/${interaction.member.guild.id.toString()}.json`, "utf8", async function (err,data) {
                if (err) {
                    console.log(err);
                }

                //Holt sich alle Informationen fürs Ranking

                var userid = member.id.toString()

                const json_data = JSON.parse(data);
                const xp = json_data.user[userid].leveling.xp;
                const level = json_data.user[userid].leveling.levels;
                //const xp_level = json_data.user[userid].leveling.xp_level;
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

                await interaction.reply({embeds: [levelEmbed], ephemeral: true});
            });

        } catch (err) {
            await interaction.channel.send({content: "An error has occurred. Please try again. If the error still occurs, do not hesitate to contact us.", ephemeral: true});

            console.log("Ein Error ist bei /rank aufgetreten:\n");
            console.error(err);
            console.log("\n\n---------------------------------------\n\n");
        }
    }
}