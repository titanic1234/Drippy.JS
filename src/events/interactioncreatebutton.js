const {Permissions} = require("discord.js");
const sleep = require('sleep-promise');

module.exports = {
    name: "interactionCreateButton",
    async execute(client, interaction) {
        try {
            if (!interaction.isButton()) return;

            //Alles zu Set ab hier
            var ID = interaction.customId
            if (!interaction.customId.startsWith("lb")) {
                var u_id = interaction.customId.split(":::")[1];
                ID = interaction.customId.split(":::")[0];



                if (u_id.toString() !== interaction.user.id.toString()) return client.commands.get("permission_error").execute(client, interaction);
            }
            if (ID.endsWith("Back")) {                               //Back
                client.sets.get("setback").execute(client, interaction);
            }
            if (ID === "setLevel") {                                  //Level
                client.sets.get("setbuttonlevel").execute(client, interaction);
            }
            if (ID === "setFun") {                                    //Fun
                client.sets.get("setbuttonfun").execute(client, interaction);
            }
            if (ID === "setManage") {                                 //Management
                client.sets.get("setbuttonmanage").execute(client, interaction);
            }
            if (ID === "setManageAM") {                               //Management - Automod
                client.sets.get("setbuttonmanageam").execute(client, interaction);
            }
            if (ID === "setManageAMIC") {                             //Management - Automod - Ignored Channels
                client.sets.get("setbuttonmanageamic").execute(client, interaction);
            }
            if (ID === "setManageAMIR") {                             //Management - Automod - Ignored Roles
                client.sets.get("setbuttonmanageamir").execute(client, interaction);
            }
            if (ID === "setManageAMFW") {                             //Management - Automod - Forbidden words
                client.sets.get("setbuttonmanageamfw").execute(client, interaction);
            }
            if (ID === "setManageAMFL") {                             //Management - Automod - Forbidden links
                client.sets.get("setbuttonmanageamfl").execute(client, interaction);
            }
            if (ID === "setManageAMICA") {                             //Management - Automod - Ignored Channels - Add
                client.sets.get("setbuttonmanageamica").execute(client, interaction);
            }
            if (ID === "setManageAMICR") {                             //Management - Automod - Ignored Channels - Remove
                client.sets.get("setbuttonmanageamicr").execute(client, interaction);
            }
            if (ID === "setManageAMICS") {                             //Management - Automod - Ignored Channels - Remove
                client.sets.get("setbuttonmanageamics").execute(client, interaction);
            }
            if (ID === "setManageAMIRA") {                             //Management - Automod - Ignored Roles - Add
                client.sets.get("setbuttonmanageamira").execute(client, interaction);
            }
            if (ID === "setManageAMIRR") {                             //Management - Automod - Ignored Roles - Remove
                client.sets.get("setbuttonmanageamirr").execute(client, interaction);
            }
            if (ID === "setManageAMIRS") {                             //Management - Automod - Ignored Roles - Show
                client.sets.get("setbuttonmanageamirs").execute(client, interaction);
            }
            if (ID === "setManageAMFWS") {                             //Management - Automod - Forbidden words - Show
                client.sets.get("setbuttonmanageamfws").execute(client, interaction);
            }
            if (ID === "setManageAMFWA") {                             //Management - Automod - Forbidden words - Add
                client.sets.get("setbuttonmanageamfwa").execute(client, interaction);
            }
            if (ID === "setManageAMFWR") {                             //Management - Automod - Forbidden words - Remove
                client.sets.get("setbuttonmanageamfwr").execute(client, interaction);
            }
            if (ID === "setManageAMFLS") {                             //Management - Automod - Forbidden links - Show
                client.sets.get("setbuttonmanageamfls").execute(client, interaction);
            }
            if (ID === "setManageAMFLA") {                             //Management - Automod - Forbidden links - Add
                client.sets.get("setbuttonmanageamfla").execute(client, interaction);
            }
            if (ID === "setManageAMFLR") {                             //Management - Automod - Forbidden links - Remove
                client.sets.get("setbuttonmanageamflr").execute(client, interaction);
            }
            if (ID === "setManageAMA") {                               //Management - Automod - Activate
                client.sets.get("setbuttonmanageama").execute(client, interaction);
            }
            if (ID === "setManageAMDA") {                               //Management - Automod - Deactivate
                client.sets.get("setbuttonmanageamda").execute(client, interaction);
            }
            if (ID === "setManageMJ") {                               //Management - Member Join
                client.sets.get("setbuttonmanagemj").execute(client, interaction);
            }
            if (ID === "setManageMJWM") {                               //Management - Member Join
                client.sets.get("setbuttonmanagemjwm").execute(client, interaction);
            }
            if (ID === "setManageMJWMR") {                               //Management - Member Join
                client.sets.get("setbuttonmanagemjwmr").execute(client, interaction);
            }
            if (ID === "setManageMJWME") {                               //Management - Member Join
                client.sets.get("setbuttonmanagemjwme").execute(client, interaction);
            }
            if (ID === "setManageMJWMS") {                               //Management - Member Join
                client.sets.get("setbuttonmanagemjwms").execute(client, interaction);
            }
            if (ID === "setManageMJWMA") {                               //Management - Member Join
                client.sets.get("setbuttonmanagemjwma").execute(client, interaction);
            }
            if (ID === "setManageMJWMDA") {                               //Management - Member Join
                client.sets.get("setbuttonmanagemjwmda").execute(client, interaction);
            }
            if (ID === "setManageMJDM") {                               //Management - Member Join
                client.sets.get("setbuttonmanagemjdm").execute(client, interaction);
            }
            if (ID === "setManageMJDMR") {                               //Management - Member Join
                client.sets.get("setbuttonmanagemjdmr").execute(client, interaction);
            }
            if (ID === "setManageMJDME") {                               //Management - Member Join
                client.sets.get("setbuttonmanagemjdme").execute(client, interaction);
            }
            if (ID === "setManageMJDMS") {                               //Management - Member Join
                client.sets.get("setbuttonmanagemjdms").execute(client, interaction);
            }
            if (ID === "setManageMJDMA") {                               //Management - Member Join
                client.sets.get("setbuttonmanagemjdma").execute(client, interaction);
            }
            if (ID === "setManageMJDMDA") {                               //Management - Member Join
                client.sets.get("setbuttonmanagemjdmda").execute(client, interaction);
            }
            if (ID === "setManageMJRA") {                               //Management - Member Join
                client.sets.get("setbuttonmanagemjra").execute(client, interaction);
            }
            if (ID === "setManageMJRAS") {                               //Management - Member Join
                client.sets.get("setbuttonmanagemjras").execute(client, interaction);
            }
            if (ID === "setManageMJRAA") {                               //Management - Member Join
                client.sets.get("setbuttonmanagemjraa").execute(client, interaction);
            }
            if (ID === "setManageMJRAR") {                               //Management - Member Join
                client.sets.get("setbuttonmanagemjrar").execute(client, interaction);
            }
            if (ID === "setManageMO") {                               //Management - Member Join
                client.sets.get("setbuttonmanagemo").execute(client, interaction);
            }
            if (ID === "setManageMOL") {                               //Management - Member Join
                client.sets.get("setbuttonmanagemol").execute(client, interaction);
            }
            if (ID === "setManageMOAP") {                               //Management - Member Join
                client.sets.get("setbuttonmanagemoap").execute(client, interaction);
            }
            if (ID === "setManageMOMP") {                               //Management - Member Join
                client.sets.get("setbuttonmanagemomp").execute(client, interaction);
            }
            if (ID === "setManageMOAPS") {                               //Management - Member Join
                client.sets.get("setbuttonmanagemoaps").execute(client, interaction);
            }
            if (ID === "setManageMOAPA") {                               //Management - Member Join
                client.sets.get("setbuttonmanagemoapa").execute(client, interaction);
            }
            if (ID === "setManageMOAPR") {                               //Management - Member Join
                client.sets.get("setbuttonmanagemoapr").execute(client, interaction);
            }
            if (ID === "setManageMOMPA") {                               //Management - Member Join
                client.sets.get("setbuttonmanagemompa").execute(client, interaction);
            }
            if (ID === "setManageMOMPR") {                               //Management - Member Join
                client.sets.get("setbuttonmanagemompr").execute(client, interaction);
            }
            if (ID === "setManageMOMPS") {                               //Management - Member Join
                client.sets.get("setbuttonmanagemomps").execute(client, interaction);
            }
            if (ID === "setManageGB") {                               //Management - Member Join
                client.sets.get("setbuttonmanagegb").execute(client, interaction);
            }



            //Alles zu Set bis hier

            //Alles zu Help ab hier

            if (ID === "helpMod") {
                if (interaction.member.permissions.has(Permissions.FLAGS.MANAGE_MESSAGES)) {
                    client.commands.get("help").execute(interaction, ["mod"]);
                } else {
                    client.commands.get("permission_error").execute(client, interaction);
                }
            } if (ID === "helpLevel") {
                client.commands.get("help").execute(interaction, ["level"]);
            } if (ID === "helpInfos") {
                client.commands.get("help").execute(interaction, ["info"]);
            } if (ID === "helpFun") {
                client.commands.get("help").execute(interaction, ["fun"]);
            }


            //Alles zu Help bis hier.
            //Alles zu LB ab hier.
            if (interaction.customId.startsWith("lb")) {
                var x = interaction.customId.split(":");
                client.commands.get("lb").execute(client, interaction.message, x[1].toString())
                await sleep(200);
                await interaction.message.delete();
            }

        } catch(err) {
            console.log("Ein Error ist bei guildmemberAdd aufgetreten:\n");
            console.error(err);
            console.log("\n\n---------------------------------------\n\n");
        }
    }
}