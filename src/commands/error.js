const {MessageEmbed, Permissions, MessageActionRow, MessageButton, Client} = require('discord.js');
fs = require('fs');


module.exports = {
    name: "permission_error",
    description: "Permission Error Embed wird gesendet",
    async execute (client, message) {
        try {

            const errorEmbed = new MessageEmbed()
                .setColor("#ff0000")
                .setTitle("ERROR!")
                .setDescription("You don´t have the permissions to do that!")
                .setTimestamp()


            return message.reply({embeds: [errorEmbed], ephemeral: true});
        } catch (err) {
            //await message.channel.send({content: "An error has occurred. Please try again. If the error still occurs, do not hesitate to contact us.", ephemeral: true});

            console.log("Ein Error ist bei error aufgetreten:\n");
            console.error(err);
            console.log("\n\n---------------------------------------\n\n");
        }

    }
}