const { MessageEmbed, Permissions } = require("discord.js");
const fs = require("fs");
const sleep = require("sleep-promise");
const { SlashCommandBuilder } = require("@discordjs/builders")

module.exports = {
    data: new SlashCommandBuilder().setName("help")
        .setDescription("Let the bot help you")
        .setDescriptionLocalizations({
            de: "Lass dir vom Bot helfen"
        })
        .addStringOption(option =>
            option
                .setName("category")
                .setDescription("Choice the category")
                .addChoices(
                    { name: "Moderation", value: "moderation" },
                    { name: "Informations", value: "informations" },
                    { name: "Fun", value: "fun" },
                    { name: "Level", value: "level" }
                ))
        /*
        .addSubcommand(subcommand =>
            subcommand
                .setName("moderation")
                .setDescription("Only Teammember")
                .setDescriptionLocalizations({
                    de: "Nur Teammitglieder"
                }))
        .addSubcommand(subcommand =>
            subcommand
                .setName("general")
                .setDescription("All help options")
                .setDescriptionLocalizations({
                    de: "Alle /help Optionen."
                }))
        .addSubcommand(subcommand =>
            subcommand
                .setName("informations")
                .setNameLocalizations({
                    de: "informationen"
                })
                .setDescription("Get all commands to show you information.")
                .setDescriptionLocalizations({
                    de: "Bekomme alle Befehle um dir Informationen anzeigen zu lassen."
                }))
        .addSubcommand(subcommand =>
            subcommand
                .setName("fun")
                .setDescription("Get all fun commands")
                .setDescriptionLocalizations({
                    de: "Bekomme alle Fun Befehle"
                }))
        .addSubcommand(subcommand =>
            subcommand
                .setName("level")
                .setDescription("Get all level commands")
                .setDescriptionLocalizations({
                    de: "Bekomme alle Level Befehle"
                }))*/,
    async execute(client, interaction) {
        try {
            //var seite = interaction.options.getUser("Page");
            var seite = interaction.options.getString("category")



            if (seite === null || seite === undefined) {
                //language en
                const helpEmbed = new MessageEmbed()

                    .setColor("#3497da")
                    .setTitle("Help")
                    .setDescription("Here you can see the categories into which the help commands are divided." +
                        ` Just do /help [category] to get the commands displayed (categories are separated by hyphens if necessary).` +
                        " If you still have questions, you are welcome to come to our support server. :) https://discord.gg/g6aGe6xymk")
                    .addField("Kategorien:", "-Moderation (only Teammember) \n-Infos \n-Fun \n-Level", false) // -Member Leave -Member Join Bann/Kick/Mute/Warn
                    .setTimestamp();







                await interaction.reply({
                    embeds: [helpEmbed],
                    ephemeral: true
                });

            }


            else if (seite === "moderation") {
                //language en
                const helpEmbed = new MessageEmbed()

                    .setColor("#9b59b5")
                    .setTitle("Help - Moderation")
                    .setTimestamp()
                    .addFields(
                        {name: "⠀", value: "__**Owner**__", inline: false},
                        {name: `/nuke [Channel]`, value: "-> Deletes the specified channel and creates it again (Still under development...)", inline: false},
                        {name: "⠀", value: "__**Admin**__", inline: false},
                        {name: `/ban [Member] [Grund]`, value: "-> Bans a member from the server (ban permissions required)", inline: false},
                        {name: `/kick [Member] [Reason]`, value: "-> Kicks a Member (kick permissions required)", inline: false},
                        {name: "⠀", value: "__**Mod**__", inline: false},
                        {name: `/mute [Member] [Reason] [Zeit in h] (optional)`, value: "-> Mutes a member for a certain period of time (Still under development...)", inline: true},
                        {name: `/unmute [Member]`, value: "-> Unmutes a member (Still under development...)", inline: false},
                        {name: `/warn [Member] [Reason]`, value: "-> Warns a Member", inline: false},
                        {name: `/set [topic] (optional)`, value: "-> Use the dashboard (Still under development...)", inline: false},
                        {name: `/add-xp [amout] [Member]`,value: "-> Adds XP to a member", inline: false}, //Adds XP to a member. (only Mods & Admins)
                        {name: `/remove-xp [amout] [Member]`, value: "-> Removes XP from a member", inline: false} //Removes XP from a member. (only Mods & Admins)
                    );
                await interaction.reply({embeds: [helpEmbed], ephemeral: true});


            } else if (seite === "informations") {
                //language en
                const helpEmbed = new MessageEmbed()

                    .setColor("#9b59b5")
                    .setTitle("Help - Infos")
                    .setTimestamp()
                    .addFields(
                        {name: `/infos`, value: "-> Shows you some info about the bot", inline: false},
                        {name: `/serverinfo`, value: "-> Shows you some info about the server", inline: false},
                        {name: `/userinfo`, value: "-> Still under development...", inline: false}, //Shows you some info about a user
                        {name: `/ping`, value: "-> Answer you with pong", inline: false},
                        {name: `/boost`, value: "-> Shows you the advantages you get when you boost the server.", inline: false}
                    );
                await interaction.reply({embeds: [helpEmbed], ephemeral: true});
            }
            else if (seite === "fun") {
                //language en
                const helpEmbed = new MessageEmbed()

                    .setColor("#9b59b5")
                    .setTitle("Help - Fun")
                    .setTimestamp()
                    .addFields(
                        {name: `/meme`, value: "-> Still under development...", inline: false}, //Show you a random meme
                        {name: `/quiz`, value: "-> Play a quiz!", inline: false},
                        {name: `/game`, value: "-> Play a dice game! `(In progress)`", inline: false}
                    )
                await interaction.reply({embeds: [helpEmbed], ephemeral: true});

            }

            else if (seite === "level") {
                //language en
                const helpEmbed = new MessageEmbed()

                    .setColor("#9b59b5")
                    .setTitle("Help - Leveling")
                    .setTimestamp()
                    .addFields(
                        {name: `/rank [Member] (optional)`, value: "-> Look at all the leveling stuff from you or someone else.", inline: false},
                        {name: `/leaderboard`, value: "-> Shows you the current leaderboard of the server.", inline: false},
                        {name: `/add-xp [amout] [Member]`,value: "-> Adds XP to a member. (only Mods & Admins)", inline: false}, //Adds XP to a member. (only Mods & Admins)
                        {name: `/remove-xp [amout] [Member]`, value: "-> Removes XP from a member. (only Mods & Admins)", inline: false} //Removes XP from a member. (only Mods & Admins)
                    )

                await interaction.reply({embeds: [helpEmbed], ephemeral: true});


                }

        } catch (err) {
            await interaction.channel.send({content: "An error has occurred. Please try again. If the error still occurs, do not hesitate to contact us.", ephemeral: true});

            console.log("Ein Error ist bei /help aufgetreten:\n");
            console.error(err);
            console.log("\n\n---------------------------------------\n\n");
        }


    }

}