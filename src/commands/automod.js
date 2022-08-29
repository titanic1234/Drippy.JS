const {MessageEmbed, Permissions, Client} = require('discord.js');
fs = require('fs');


module.exports = {
    name: "automod",
    description: "Automod",
    async execute (client, message) {
        try {
            fs.readFile(`Server/${message.member.guild.id.toString()}.json`, "utf8", async function (err,data) {
                if (err) {
                    console.log(err);
                }

                //console.log(data);
                const json_data = JSON.parse(data);
                if (!json_data.automod.infos.aktiviert) {
                    return;
                }
                const ignored_channels = json_data.automod.ignoredchannels;
                const ignored_roles = json_data.automod.ignoredroles;
                const woerter = json_data.automod.wörter;
                const links = json_data.automod.links;


                var woerds = message.content.toLowerCase().split(" ");
                var link = message.content.split(" ").join("").split("/");

                if (ignored_channels.includes(message.channel.id)) {
                    return;
                }

                for (let i = 0; i < message.member._roles.length; i++) {
                    if (ignored_roles.includes(message.member._roles[i])) {
                        return;
                    }

                }

                for (let i = 0; i < woerds.length; i++) {
                    if (woerter.includes(woerds[i])) {
                        await message.reply({content: ":x: These words are not allowed here! :x:", ephemeral: true});
                        await message.delete();
                        return 1;
                    }
                }


                for (let i = 0; i < link.length; i++) {
                    if (links.includes(link[i])) {
                        await message.reply({content: ":x: These link are not allowed here! :x:", ephemeral: true});
                        await message.delete();
                        return 1;
                    }
                }
            });
        } catch (err) {
            //await message.channel.send({content: "An error has occurred. Please try again. If the error still occurs, do not hesitate to contact us.", ephemeral: true});

            console.log("Ein Error ist bei automod aufgetreten:\n");
            console.error(err);
            console.log("\n\n---------------------------------------\n\n");
        }

    }
}


/*
Alle Nachrichtenteile werden überprüft.
Alle Rollen werden überprüft, ob sie ignoriert werden sollen.
Entsprechender Kanal wird überprüft, ob er ignoriert werden soll.
Ein-/Ausschalten
Alles über JSON File gesteuert.
 */