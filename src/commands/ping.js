const {MessageEmbed} = require("discord.js");
module.exports = {
    name: 'ping',
    description: 'Gibt Latenz zurück',
    async execute(client, message, args){

        try {

            const pingEmbed = new MessageEmbed()
                .setColor("#fd5833")
                .setTitle("Pong!")
                .setDescription(`${client.latency * 1000} ms`)

            await message.reply({embeds: [pingEmbed]});

        } catch (err) {
            await message.channel.send({content: "An error has occurred. Please try again. If the error still occurs, do not hesitate to contact us.", ephemeral: true});

            console.log("Ein Error ist bei #ping aufgetreten:\n");
            console.error(err);
            console.log("\n\n---------------------------------------\n\n");
        }

    }
}

