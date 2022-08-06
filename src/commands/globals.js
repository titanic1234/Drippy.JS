const { MessageActionRow, MessageButton, MessageEmbed, Permissions} = require('discord.js');
const fs = require('fs');

module.exports = {
    name: "globalbann",
    description: "Bug Report Antwort",
    async execute (client, message, user, args) {
        const ids = ["690582774641328168", "675723273937354775","716394389211185213"];
        if (!ids.includes(message.member.id.toString())) {
            client.commands.get("permission_error").execute(client, message);
            return;
        }
        try {
            //Versucht die User ID zu bekommen und zu User umzuwandeln
            user = user.split("<@").join("").split(">").join("");
            user = client.users.cache.find(user => user.id === user);

        }

        catch(error) {
            message.reply("Der angegebene User wird nicht gefunden.")
        }


        var menu =
            {
                "type": 1,
                "components": [
                    {
                        "type": 3,
                        "custom_id": "class_select_1",
                        "options":[
                            {
                                "label": "Rogue",
                                "value": "rogue",
                                "description": "Sneak n stab",
                                "emoji": {
                                    "name": "rogue",
                                    "id": "625891304148303894"
                                }
                            },
                            {
                                "label": "Mage",
                                "value": "mage",
                                "description": "Turn 'em into a sheep",
                                "emoji": {
                                    "name": "mage",
                                    "id": "625891304081063986"
                                }
                            },
                            {
                                "label": "Priest",
                                "value": "priest",
                                "description": "You get heals when I'm done doing damage",
                                "emoji": {
                                    "name": "priest",
                                    "id": "625891303795982337"
                                }
                            }
                        ],
                        "placeholder": "Choose a class",
                        "min_values": 1,
                        "max_values": 3
                    }
                ]
            }


        await message.reply({components: [menu]});



    }
}