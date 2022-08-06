const { MessageEmbed, Client, Permissions } = require("discord.js");
const fs = require("fs");

module.exports = {
    name: 'ban',
    description: 'Dieser Command bannt einen Member!',
    execute(client, message, args){
        if (!message.member.permissions.has(Permissions.FLAGS.BAN_MEMBERS)) return client.commands.get("permission_error").execute(client, message);

        var member;
        if (args[0] === []) {
            return message.reply("Bitte gebe einen User an!");
        }
         else {
            try {
                //Versucht die User ID zu bekommen und zu User umzuwandeln
                member = args[0].split("<@").join("").split(">").join("");
                member = client.users.cache.find(user => user.id === member);
                if (member === undefined) {
                    return message.reply("Bite gebe einen gültigen User an!");
                }
            }

            catch(error) {
                //Sonst ist Member = Message Author
                return message.reply("Es ist ein Fehler aufgetreten. Bitte probiere es erneut und gebe einen gültigen User an. Wenn das Problem weiterhin besteht kontaktiere uns bitte via `#bug [bug]` und gebe den Bug an.");
            }
        }


        if(member){
            args.splice(args[0], 1);
            const memberTarget = message.guild.members.cache.get(member.id);
            try {
                const exampleEmbed = new MessageEmbed()
                    .setColor('RED')
                    .setTitle(`You were banned from the ${message.guild.name.toString()}`)
                    .setDescription(`By ${message.author.username}#${message.author.discriminator}`)
                    .addFields({name: 'Reason:', value: `${args.join(" ")}`})
                    .setTimestamp()
                member.send({ embeds: [exampleEmbed] });
            }catch (err) {
                message.reply("Der User konnte nicht über den Bann informiert werden.")
            }
            message.guild.members.ban(member, {reason: args.join(" ")});
            const exampleEmbed = new MessageEmbed()
                .setColor('RED')
                .setTitle('Moderation')
                .setDescription(`${member.username}#${member.discriminator} wurde gebannt.`)
                .addFields({name: 'Grund:', value: `${args.join(" ")}`})
                .setTimestamp()
            
            message.reply({ embeds: [exampleEmbed] });

            fs.readFile(`Server/${message.member.guild.id.toString()}.json`, "utf8", function (err,data) {
                if (err) {
                    console.log(err);
                }

                var json_data = JSON.parse(data);
                json_data.user[message.member.id.toString()].moderation.ban ++;
                json_data.user[member.id.toString()].vergehen.ban ++;
                fs.writeFile(`Server/${message.member.guild.id.toString()}.json`, JSON.stringify(json_data), () => {});
            });
        } else{
            const exampleEmbed = new MessageEmbed()
                .setColor('RED')
                .setTitle('Moderation')
                .setDescription("Der Command wurde nicht richtig ausgeführt. Bitte achte darauf, dass alle Angaben vorhanden sind.")
                .addFields({name: 'Command:', value: "`#ban @member/id grund`"})
                .setTimestamp()
            
            message.channel.send({ embeds: [exampleEmbed] });
        }
    }
}