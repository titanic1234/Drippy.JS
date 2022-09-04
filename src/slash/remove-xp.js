const { MessageEmbed, Permissions } = require("discord.js");
const fs = require("fs");
const sleep = require("sleep-promise");
const { SlashCommandBuilder } = require("@discordjs/builders")

module.exports = {
    data: new SlashCommandBuilder().setName("remove-xp").setDescription("Remove XP of a member.").setDescriptionLocalizations({
        de: "Füge einen Mitglied XP hinzu."
    })
        .addNumberOption(option => option.setName("xp").setDescription("Specify the XP number.").setRequired(true))
        .addUserOption(option => option.setName("member").setDescription("Specify the member. If you don't specify one, it applies to you.")),
    async execute(client, interaction) {
        try {
            var member = interaction.options.getUser("member");
            var xp = interaction.options.getNumber("xp");

            if (!member) member = interaction.user;


            fs.readFile(`Server/${interaction.guild.id.toString()}.json`, "utf8", async function (err,data) {
                if (err) {
                    console.log(err);
                }

                var userid = interaction.member.id.toString();


                const json_data = JSON.parse(data);

                var adminroles = json_data.moderation.roles_admin;
                var modroles = json_data.moderation.roles_mod;
                var modberecht = false;
                var adminberecht = false;



                for (var i of interaction.member._roles) {
                    if (interaction.guild.ownerId.toString() === interaction.member.id.toString()) {
                        adminberecht = true;
                        modberecht = true;
                        break;
                    }
                    if (interaction.member.permissions.has(Permissions.FLAGS.ADMINISTRATOR)) {
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
                    return client.commands.get("permission_error").execute(client, interaction);
                }

                //Führt guildMemberAdd aus
                await client.events.get("guildMemberAdd").execute(client, member, false, interaction.guild.id);
                await sleep(200);


                //old_xp steht für die XP vor der Message
                var old_xp = json_data.user[userid]["leveling"].xp;
                //new_xp steht für die XP nach der Message
                var new_xp = Number(old_xp) - Number(xp);
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
                fs.writeFile(`Server/${interaction.guild.id.toString()}.json`, JSON.stringify(json_data), () => {});
                try {
                    if (interaction.guild.id.toString() === "714829455826354228") {
                        if (l >= 5) {
                            var role = interaction.guild.roles.cache.find(r => r.id === "877912969764274196");
                            await interaction.member.roles.add(role);
                        }
                        if (l >= 10) {
                            var role = interaction.guild.roles.cache.find(r => r.id === "877913196760010752");
                            await interaction.member.roles.add(role);
                        }
                        if (l >= 15) {
                            var role = interaction.guild.roles.cache.find(r => r.id === "877913154435309628");
                            await interaction.member.roles.add(role);
                        }
                        if (l >= 20) {
                            var role = interaction.guild.roles.cache.find(r => r.id === "877913447180959744");
                            await interaction.member.roles.add(role);
                        }
                        if (l >= 30) {
                            var role = interaction.guild.roles.cache.find(r => r.id === "877913422715559939");
                            await interaction.member.roles.add(role);
                        }
                        if (l >= 50) {
                            var role = interaction.guild.roles.cache.find(r => r.id === "877913840283688980");
                            await interaction.member.roles.add(role);
                        }
                        if (l >= 100) {
                            var role = interaction.guild.roles.cache.find(r => r.id === "877913831664410695");
                            await interaction.member.roles.add(role);
                        }
                        if (l >= 150) {
                            var role = interaction.guild.roles.cache.find(r => r.id === "928301343003799602");
                            await interaction.member.roles.add(role);
                        }
                    }
                } catch (err) {
                    console.log(err);
                }

                const embed = new MessageEmbed()
                    .setTimestamp()
                    .setTitle("Remove XP")
                    .setDescription(`You have removed ${xp} XP from the user <@${member.id.toString()}>`)
                    .setColor("#c24e4e")

                await interaction.reply({embeds: [embed]});

            });
            await client.commands.get("rank").execute(client, interaction, member.id.toString());

        } catch (err) {
            await interaction.channel.send({content: "An error has occurred. Please try again. If the error still occurs, do not hesitate to contact us.", ephemeral: true});

            console.log("Ein Error ist bei #remove-xp aufgetreten:\n");
            console.error(err);
            console.log("\n\n---------------------------------------\n\n");
        }
    }
}