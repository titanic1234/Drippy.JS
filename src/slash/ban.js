const { MessageEmbed, Permissions } = require("discord.js");
const fs = require("fs");
const sleep = require("sleep-promise");
const { SlashCommandBuilder } = require("@discordjs/builders")

module.exports = {
    data: new SlashCommandBuilder().setName("ban").setDescription("Ban a member").setDescriptionLocalizations({
        de: "Banne ein Mitglied von dem Server."
    })
        .addUserOption(option => option.setName("member").setDescription("Specify the member").setRequired(true))
        .addStringOption(option => option.setName("reason").setDescription("Specify the reason").setRequired(true)),
    async execute(client, interaction) {
        try {
            var member = interaction.options.getUser("member");
            var reason = interaction.options.getString("reason");


            if (!interaction.member.permissions.has(Permissions.FLAGS.KICK_MEMBERS)) return client.commands.get("permission_error").execute(client, interaction);


            try {

                const exampleEmbed = new MessageEmbed()
                    .setColor('RED')
                    .setTitle(`You were banned from the ${interaction.guild.name.toString()} Guild`)
                    .setDescription(`By ${interaction.user.username}#${interaction.user.discriminator}`)
                    .addFields({name: 'Reason:', value: `${reason}`})
                    .setTimestamp()
                await member.send({ embeds: [exampleEmbed] });
            } catch (err) {
                interaction.channel.send("The user could not be informed about the ban.");
            }
            //interaction.guild.members.ban(member, {reason: reason.toString()});
            const exampleEmbed = new MessageEmbed()
                .setColor('RED')
                .setTitle('Moderation')
                .setDescription(`${member.username}#${member.discriminator} was banned by <@${interaction.user.id}>.`)
                .addFields({name: 'Reason:', value: `${reason}`})
                .setTimestamp()

            interaction.reply({ embeds: [exampleEmbed] });

            await client.events.get("guildCreate").execute(client, interaction.member.guild, false);
            await sleep(200);

            fs.readFile(`Server/${interaction.member.guild.id.toString()}.json`, "utf8", async function (err, data) {
                if (err) {
                    console.log(err);
                }

                await client.events.get("guildMemberAdd").execute(client, member, false, interaction.guild.id.toString());
                await client.events.get("guildMemberAdd").execute(client, interaction.user, false, interaction.guild.id.toString());
                await sleep(500);

                var json_data = JSON.parse(data);
                json_data.user[interaction.member.id.toString()].moderation.ban++; //Dem Moderator wird ein Bann hinzugefügt
                json_data.user[member.id.toString()].vergehen.ban++; //Dem User wird ein Bann hinzugefügt
                fs.writeFile(`Server/${interaction.member.guild.id.toString()}.json`, JSON.stringify(json_data), () => {});
            });
        } catch (err) {
            interaction.channel.send({content: "An error has occurred. Please try again. If the error still occurs, do not hesitate to contact us.", ephemeral: true});

            console.log("Ein Error ist bei /ban aufgetreten:\n");
            console.error(err);
            console.log("\n\n---------------------------------------\n\n");
        }
    }
}