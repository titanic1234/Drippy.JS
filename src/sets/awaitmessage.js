const { MessageActionRow, MessageButton, MessageEmbed, Permissions, MessageCollector} = require('discord.js');
const fs = require('fs');

module.exports = {
    name: "awaitmessage",
    description: "Await a Message",
    async execute(client, message) {

        return new Promise(async (resolve, reject) => {

            try {

                const collector = new MessageCollector(message.message.channel, m => m.author.id === message.member.id, {
                    time: 60000
                });


                await collector.on('collect', async (msg) => {
                    collector.stop();
                    resolve(msg);
                });
            } catch (error) {
                console.log(error);
                reject(error);
            }

        });

    }
}