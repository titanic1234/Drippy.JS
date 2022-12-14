const {MessageEmbed, Permissions, Client} = require('discord.js');


module.exports = {
    name: "info",
    description: "Get Infos about Drippy",
    async execute(client, message) {
        try {

            const infoEmbed = new MessageEmbed()
                .setColor("#1f8a4c")
                .setTitle("Info")
                .setDescription("Here are a few bot infos")
                .addFields(
                    {name: "Name", value: "Drippy#5683", inline: false},
                    {name: "Number of servers: ", value: "Count: " + client.guilds.cache.size, inline: false},
                    {name: "Developer: ", value: "ItIzYe#7590,\nR.M.S Titanic#7956,\nCanadianAgent | Jury#9388", inline: false},
                    {name: "Version: ", value: "1.0.0 Beta", inline: false},
                    {name: "Last Update: ", value: "05.01.2022", inline: false},
                    {name: "Bug Report", value: `Bugs can be reported via #bug [bug].`, inline: false}
                )
                .setTimestamp()



            await message.reply({embeds: [infoEmbed]});

        } catch (err) {
            await message.channel.send({content: "An error has occurred. Please try again. If the error still occurs, do not hesitate to contact us.", ephemeral: true});

            console.log("Ein Error ist bei #infos aufgetreten:\n");
            console.error(err);
            console.log("\n\n---------------------------------------\n\n");
        }


    }
}


