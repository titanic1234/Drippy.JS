const { MessageActionRow, MessageButton, MessageEmbed, Permissions} = require('discord.js');
const fs = require('fs');
const sleep = require('sleep-promise');

module.exports = {
    name: "setback",
    description: "Settings Back",
    async execute(client, interaction) {
        fs.readFile(`Server/${interaction.message.member.guild.id.toString()}.json`, "utf8", async function (err,data) {
            if (err) {
                console.log(err);
            }

            var json_data = JSON.parse(data);
            var adminroles = json_data.moderation.roles_admin;
            var modroles = json_data.moderation.roles_mod;
            var modberecht = false;
            var adminberecht = false;

            var ID = interaction.customId
            if (interaction.customId.startsWith("set")) {
                ID = interaction.customId.split(":::")[0];
            }


            for (var i of interaction.message.member._roles) {
                if (interaction.message.guild.ownerId.toString() === interaction.message.member.id.toString()) {
                    adminberecht = true;
                    modberecht = true;
                    break;
                }
                if (interaction.message.member.permissions.has(Permissions.FLAGS.ADMINISTRATOR)) {
                    adminberecht = true;
                    modberecht = true;
                    break;
                }
                if (adminroles.includes(i.toString())) {
                    adminberecht = true;
                    break;
                }
                if (modroles.includes(i.toString())) {
                    modberecht = true;
                    break;
                }
            }

            if (modberecht === false || adminberecht === false) {
                return client.commands.get("permission_error").execute(client, message);
            }



            if (ID === "setBack") {
                client.commands.get("set").execute(client, interaction.message);
                await sleep(500);
                await interaction.message.delete();
            }
            if (ID === "setManageBack") {
                client.sets.get("setbuttonmanage").execute(client, interaction);
            }
            if (ID === "setManageAMBack") {
                client.sets.get("setbuttonmanageam").execute(client, interaction);
            }
            if (ID === "setManageAMICBack") {
                client.sets.get("setbuttonmanageamic").execute(client, interaction);
            }
            if (ID === "setManageAMIRBack") {
                client.sets.get("setbuttonmanageamir").execute(client, interaction);
            }
            if (ID === "setManageAMFWBack") {
                client.sets.get("setbuttonmanageamfw").execute(client, interaction);
            }
            if (ID === "setManageAMFLBack") {
                client.sets.get("setbuttonmanageamfl").execute(client, interaction);
            }
            if (ID === "setManageMJBack") {
                client.sets.get("setbuttonmanagemj").execute(client, interaction);
            }
            if (ID === "setManageMJWMBack") {
                client.sets.get("setbuttonmanagemjwm").execute(client, interaction);
            }
            if (ID === "setManageMJDMBack") {
                client.sets.get("setbuttonmanagemjdm").execute(client, interaction);
            }
            if (ID === "setManageMJRABack") {
                client.sets.get("setbuttonmanagemjra").execute(client, interaction);
            }
            if (ID === "setManageMOBack") {
                client.sets.get("setbuttonmanagemo").execute(client, interaction);
            }
            if (ID === "setManageMOAPBack") {
                client.sets.get("setbuttonmanagemoap").execute(client, interaction);
            }
            if (ID === "setManageMOMPBack") {
                client.sets.get("setbuttonmanagemomp").execute(client, interaction);
            }
        });
    }
}