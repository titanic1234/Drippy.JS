const {MessageEmbed, Permissions, Client} = require('discord.js');


module.exports = {
    name: "sv",
    description: "Get Serverinfos",
    async execute(client, message, args) {

        try {

            const owner = client.users.cache.find(user => user.id === message.guild.ownerId);


            const svinfoEmbed = new MessageEmbed()
                .setColor("#00fdfe")
                .setTitle(message.guild.name)
                .setThumbnail(message.guild.iconURL())
                .addFields(
                    {name: "Owner: ", value: owner.username + "#" + owner.discriminator, inline: false},
                    {name: "Region: ", value: message.guild.preferredLocale.toString(), inline: false},
                    {name: "Membercount: ", value: message.guild.memberCount.toString(), inline: false}
                )
                .setTimestamp()

            await message.reply({embeds: [svinfoEmbed]});

        } catch (err) {
            await message.channel.send({content: "An error has occurred. Please try again. If the error still occurs, do not hesitate to contact us.", ephemeral: true});

            console.log("Ein Error ist bei #serverinfo aufgetreten:\n");
            console.error(err);
            console.log("\n\n---------------------------------------\n\n");
        }
    }

}
