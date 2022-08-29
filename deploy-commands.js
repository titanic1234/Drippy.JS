const { REST } = require('@discordjs/rest');
const { Routes } = require("discord-api-types/v9");
//const { token } = require('./config.json');
const fs = require('node:fs');
require('dotenv').config();

const commands = [];
const commandFiles = fs.readdirSync('./src/slash/').filter(file => file.endsWith('.js'));

// Place your client and guild ids here


for (const file of commandFiles) {
    const command = require(`./src/slash/${file}`);
    commands.push(command.data.toJSON());
}

const rest = new REST({ version: '10' }).setToken(process.env.Discord_Bot_Token);

(async () => {
    try {
        console.log('Started refreshing application (/) commands.');

        await rest.put(
            Routes.applicationGuildCommands(process.env.DISCORD_BOT_APPLICATION_ID, process.env.VA_GUILD_ID),
            { body: commands },
        );

        console.log('Successfully reloaded application (/) commands.');
    } catch (error) {
        console.error(error);
    }
})();



/*

require('dotenv').config();
const fs = require('fs');
const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v9");

const commands = [];

const commandFiles = fs.readdirSync('./src/slash/').filter(file => file.endsWith('.js'));


for(const file of commandFiles){
    const command = require(`./src/slash/${file}`);
    commands.push(command.data.toJSON());
}


const restClient = new REST({version: "10"}).setToken(process.env.Discord_Bot_Token);

restClient.put(Routes.applicationGuildCommands(process.env.DISCORD_BOT_APPLICATION_ID, process.env.VA_GUILD_ID),
    {body: commands})
.then(() => console.log("Sucessfully registerd commands"))
.catch(console.error)

*/
