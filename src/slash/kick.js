const { MessageEmbed, Permissions } = require("discord.js");
const fs = require("fs");
const sleep = require("sleep-promise");
const { SlashCommandBuilder } = require("@discordjs/builders")

module.exports = {
    data: new SlashCommandBuilder().setName("kick").setDescription("Kick a member")//.setDefaultMemberPermissions(Permissions.FLAGS.KICK_MEMBERS | Permissions.FLAGS.BAN_MEMBERS)
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
                    .setTitle(`You were kicked from the ${interaction.guild.name.toString()} Guild`)
                    .setDescription(`By ${interaction.user.username}#${interaction.user.discriminator}`)
                    .addFields({name: 'Reason:', value: `${reason}`})
                    .setTimestamp()
                await member.send({embeds: [exampleEmbed]});
            } catch (err) {
                interaction.channel.send("The user could not be informed about the kick.");
            }
            //interaction.guild.members.kick(member);
            const exampleEmbed = new MessageEmbed()
                .setColor('RED')
                .setTitle('Moderation')
                .setDescription(`${member.username}#${member.discriminator} was kicked by <@${interaction.user.id}>.`)
                .addFields({name: 'Reason:', value: `${reason}`})
                .setTimestamp()

            interaction.reply({embeds: [exampleEmbed]});

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
                json_data.user[interaction.member.id.toString()].moderation.kick++; //Dem Moderator wird ein Kick hinzugefügt
                json_data.user[member.id.toString()].vergehen.kick++; //Dem User wird ein Kick hinzugefügt
                fs.writeFile(`Server/${interaction.member.guild.id.toString()}.json`, JSON.stringify(json_data), () => {
                });
            });
        } catch (err) {
            interaction.channel.send({content: "An error has occurred. Please try again. If the error still occurs, do not hesitate to contact us.", ephemeral: true});

            console.log("Ein Error ist bei /kick aufgetreten:\n");
            console.error(err);
            console.log("\n\n---------------------------------------\n\n");


        }
    }
}