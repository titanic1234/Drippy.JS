const { MessageEmbed, Permissions} = require("discord.js");
const fs = require("fs");

module.exports = {
    name: "kick",
    description: "Dieser Command kickt einen Member!",
    execute(message, args){

        if (!message.member.permissions.has(Permissions.FLAGS.BAN_MEMBERS)) return client.commands.get("permission_error").execute(client, message);

        var member;
        if (args[0] === []) {
            return message.reply("Please enter a user!");
        }
        else {
            try {
                //Versucht die User ID zu bekommen und zu User umzuwandeln
                member = args[0].split("<@").join("").split(">").join("");
                member = client.users.cache.find(user => user.id === member);
                if (member === undefined) {
                    return message.reply("Please enter a valid user!");
                }
            }

            catch (error) {
                //Sonst ist Member = Message Author
                return message.reply("An error has occurred. Please try again and enter a valid user. If the problem persists, please contact us via `#bug [bug]` and specify the bug.");
            }
        }


        if (member) {
            args.splice(args[0], 1);
            try {
                const exampleEmbed = new MessageEmbed()
                    .setColor('RED')
                    .setTitle(`You were kicked from the ${message.guild.name.toString()} Guild`)
                    .setDescription(`By ${message.author.username}#${message.author.discriminator}`)
                    .addFields({name: 'Reason:', value: `${args.join(" ")}`})
                    .setTimestamp()
                member.send({ embeds: [exampleEmbed] });
            } catch (err) {
                message.reply("The user could not be informed about the kick.");
            }
            message.guild.members.kick(member);
            const exampleEmbed = new MessageEmbed()
                .setColor('RED')
                .setTitle('Moderation')
                .setDescription(`${member.username}#${member.discriminator} was kicked by <@${message.member.id}>.`)
                .addFields({name: 'Reason:', value: `${args.join(" ")}`})
                .setTimestamp()

            message.reply({ embeds: [exampleEmbed] });

            fs.readFile(`Server/${message.member.guild.id.toString()}.json`, "utf8", function (err,data) {
                if (err) {
                    console.log(err);
                }

                var json_data = JSON.parse(data);
                json_data.user[message.member.id.toString()].moderation.kick ++; //Dem Moderator wird ein Bann hinzugefügt
                json_data.user[member.id.toString()].vergehen.kick ++; //Dem User wird ein Bann hinzugefügt
                fs.writeFile(`Server/${message.member.guild.id.toString()}.json`, JSON.stringify(json_data), () => {});
            });
        } else {
            const exampleEmbed = new MessageEmbed()
                .setColor('RED')
                .setTitle('Moderation')
                .setDescription("The command was not executed correctly. Please make sure that all information is available.")
                .addFields({name: 'Command:', value: "`#kick @member/id Reason`"})
                .setTimestamp()

            message.channel.send({ embeds: [exampleEmbed] });
        }

    }
}