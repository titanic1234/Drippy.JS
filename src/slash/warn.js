const { MessageEmbed, Permissions } = require("discord.js");
const fs = require("fs");
const sleep = require("sleep-promise");
const { SlashCommandBuilder } = require("@discordjs/builders")

module.exports = {
    data: new SlashCommandBuilder().setName("warn").setDescription("Warn a member")//.setDefaultMemberPermissions(Permissions.FLAGS.KICK_MEMBERS | Permissions.FLAGS.BAN_MEMBERS)
        .addUserOption(option => option.setName("member").setDescription("Specify the member").setRequired(true))
        .addStringOption(option => option.setName("reason").setDescription("Specify the reason").setRequired(true)),
    async execute(client, interaction) {
        try {
            var member = interaction.options.getUser("member");
            var reason = interaction.options.getString("reason");


            await client.events.get("guildCreate").execute(client, interaction.member.guild, false);
            await sleep(200);

            fs.readFile(`Server/${interaction.member.guild.id.toString()}.json`, "utf8", async function (err, data) {
                if (err) {
                    console.log(err);
                }

                var json_data = JSON.parse(data);
                var adminroles = json_data.moderation.roles_admin;
                var modroles = json_data.moderation.roles_mod;
                var modberecht = false;
                var adminberecht = false;


                for (var i of interaction.member._roles) {
                    if (interaction.member.guild.ownerId.toString() === interaction.member.id.toString()) {
                        adminberecht = true;
                        modberecht = true;
                        break;
                    }
                    if (interaction.member.permissions.has(Permissions.FLAGS.KICK_MEMBERS)) {
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

                if (modberecht === false) {
                    return client.commands.get("permission_error").execute(client, interaction);
                }





                try {
                    const exampleEmbed = new MessageEmbed()
                        .setColor('RED')
                        .setTitle(`You were warned on the ${interaction.guild.name.toString()} Guild`)
                        .setDescription(`By ${interaction.user.username}#${interaction.user.discriminator}`)
                        .addFields({name: 'Reason:', value: `${reason}`})
                        .setTimestamp()
                    await member.send({embeds: [exampleEmbed]});
                } catch (err) {
                    interaction.channel.send("The user could not be informed about the warn.");
                }
                //message.guild.members.ban(member, {reason: args.join(" ")});
                const exampleEmbed = new MessageEmbed()
                    .setColor('RED')
                    .setTitle('Moderation')
                    .setDescription(`${member.username}#${member.discriminator} was warned by <@${interaction.member.id}>.`)
                    .addFields({name: 'Reason:', value: `${reason}`})
                    .setTimestamp()

                interaction.reply({ embeds: [exampleEmbed] });


                await client.events.get("guildMemberAdd").execute(client, member, false, interaction.guild.id.toString());
                await client.events.get("guildMemberAdd").execute(client, interaction.user, false, interaction.guild.id.toString());
                await sleep(500);



                let id = json_data.user[member.id.toString()].vergehen.warns.length + 1;

                //reason = reason.split("").push(`::..~!!=warn=!!~..::${id.toString()}`).join("");

                reason = (reason.toString() + `::..~!!=warn=!!~..::${id.toString()}`).toString()

                //args.push(`::..~!!=warn=!!~..::${id.toString()}`);


                json_data.user[interaction.member.id.toString()].moderation.warn++; //Dem Moderator wird ein Bann hinzugefügt
                json_data.user[member.id.toString()].vergehen.warn++; //Dem User wird ein Bann hinzugefügt
                json_data.user[member.id.toString()].vergehen.warns.push(reason); //Der Grund wird hinzugefügt
                fs.writeFile(`Server/${interaction.guild.id.toString()}.json`, JSON.stringify(json_data), () => {});

            })


        } catch (err) {
            interaction.channel.send({content: "An error has occurred. Please try again. If the error still occurs, do not hesitate to contact us.", ephemeral: true});

            console.log("Ein Error ist bei /warn aufgetreten:\n");
            console.error(err);
            console.log("\n\n---------------------------------------\n\n");


        }
    }
}