module.exports = {
    name: 'clear',
    description: 'Löscht Nachrichten',
    async execute(message, args){
        try {
            if(!args[0]) return message.reply('Bitte gebe an wieviele Nachrichten gelöscht werden sollen');
            if(isNaN(args[0])) return message.reply('Bitte gib eine echte Nummer an');

            if(args[0] > 100) return message.reply('Du kannst nicht mehr als 100 Nachrichten gleichzeitig löschen');
            if(args[0] < 1) return message.reply('Du musst mindestens eine Nachricht löschen');

            args[0]++;
            await message.channel.messages.fetch({limit: args[0]}).then(messages =>{
                message.channel.bulkDelete(messages)
            })

        } catch (err) {
            await message.channel.send({content: "An error has occurred. Please try again. If the error still occurs, do not hesitate to contact us.", ephemeral: true});

            console.log("Ein Error ist bei #clear aufgetreten:\n");
            console.error(err);
            console.log("\n\n---------------------------------------\n\n");
        }
    }
}