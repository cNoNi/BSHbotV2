const { CommandType,  } = require("wokcommands");
const invites = require('../../../misc/invites')
const { EmbedBuilder } = require('discord.js');

module.exports = {
    name: "checkInvites",
    description: "Sprawdza listę zaproszeń do firm",
    type: CommandType.SLASH,
    guildOnly: true,

    callback: async ({interaction,guild}) => {
        try {
            const embed = new EmbedBuilder()
            .setTitle("Zaproszenia")
            .setColor(0x00ff00)
            
            const member = interaction.user.id

            const res = await invites.checkInvites(guild.id,member)

            if(res){
                res.forEach((element) => {
                    embed.addFields({name: `Masz zaproszenie od ${element.compName}`, value: `Napisz /join ${element.compName} aby dołączyć` })
                });
            } else {
                return{
                    content: interaction.reply("Nie masz żadnych zaproszeń.")
                }
            }

            return{
                content: interaction.reply({embeds: [embed]})
            }
        } catch (error) {
            console.log(error)
        }

    }
}
