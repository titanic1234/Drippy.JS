const { MessageEmbed, Permissions } = require("discord.js");
const fs = require("fs");
const sleep = require("sleep-promise");

module.exports = {
    name: 'warn',
    description: 'Dieser Command warnt einen Member!',
    execute(client, message, args) {

        fs.readFile(`Server/${message.message.member.guild.id.toString()}.json`, "utf8", async function (err, data) {
            if (err) {
                console.log(err);
            }

            var json_data = JSON.parse(data);
            var adminroles = json_data.moderation.roles_admin;
            var modroles = json_data.moderation.roles_mod;
            var modberecht = false;
            var adminberecht = false;


            for (var i of message.message.member._roles) {
                if (message.message.guild.ownerId.toString() === message.message.member.id.toString()) {
                    adminberecht = true;
                    modberecht = true;
                    break;
                }
                if (message.message.member.permissions.has(Permissions.FLAGS.KICK_MEMBERS)) {
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
                return client.commands.get("permission_error").execute(client, message);
            }

            var member;
            if (args.length === 0) {
                return message.reply("Please enter a user!");
            } else {
                try {
                    //Versucht die User ID zu bekommen und zu User umzuwandeln
                    member = args[0].split("<@").join("").split(">").join("");
                    member = message.guild.members.cache.find(user => user.id === member);

                    if (member === undefined) {
                        return message.reply("Please enter a valid user!");
                    }
                } catch (error) {
                    //Sonst ist Member = Message Author
                    return message.reply("An error has occurred. Please try again and enter a valid user. If the problem persists, please contact us via `#bug [bug]` and specify the bug.");
                }
            }


            if (member) {
                console.log(args);
                args.splice(args[1], 1);
                console.log(args);
                if (args.length === 0) {
                    return message.reply("A reason must be given!")
                }
                try {
                    const exampleEmbed = new MessageEmbed()
                        .setColor('RED')
                        .setTitle(`You were warned on the ${message.guild.name.toString()} Guild`)
                        .setDescription(`By ${message.author.username}#${message.author.discriminator}`)
                        .addFields({name: 'Reason:', value: `${args.join(" ")}`})
                        .setTimestamp()
                    await member.send({embeds: [exampleEmbed]});
                } catch (err) {
                    message.reply("The user could not be informed about the warn.");
                }
                //message.guild.members.ban(member, {reason: args.join(" ")});
                const exampleEmbed = new MessageEmbed()
                    .setColor('RED')
                    .setTitle('Moderation')
                    .setDescription(`${member.username}#${member.discriminator} was warned by <@${message.member.id}>.`)
                    .addFields({name: 'Reason:', value: `${args.join(" ")}`})
                    .setTimestamp()

                message.reply({embeds: [exampleEmbed]});

                console.log(member);

                await client.events.get("guildMemberAdd").execute(client, member, false, message.guild.id.toString());
                await sleep(300);



                let id = json_data.user[member.id.toString()].vergehen.warns.length + 1;

                args.push(`::..~!!=warn=!!~..::${id.toString()}`);


                json_data.user[message.member.id.toString()].moderation.warn++; //Dem Moderator wird ein Bann hinzugefügt
                json_data.user[member.id.toString()].vergehen.warn++; //Dem User wird ein Bann hinzugefügt
                json_data.user[member.id.toString()].vergehen.warns.push(args.join(" ")); //Der Grund wird hinzugefügt
                fs.writeFile(`Server/${message.guild.id.toString()}.json`, JSON.stringify(json_data), () => {});
            } else {
                const exampleEmbed = new MessageEmbed()
                    .setColor('RED')
                    .setTitle('Moderation')
                    .setDescription("The command was not executed correctly. Please make sure that all information is available.")
                    .addFields({name: 'Command:', value: "`#warn @member/id Reason`"})
                    .setTimestamp()

                message.channel.send({embeds: [exampleEmbed]});
            }
        });
    }
}