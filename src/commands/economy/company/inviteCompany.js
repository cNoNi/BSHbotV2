const { CommandType,  } = require("wokcommands");
const economy = require('../../../misc/economy')
const invites = require('../../../misc/invites')
const { EmbedBuilder, ApplicationCommandOptionType } = require('discord.js');

module.exports = {
    name: "inviteCompany",
    description: "Zaprasza do firmy gracza",
    type: CommandType.SLASH,
    guildOnly: true,
    minArgs: 1,
    maxArgs: 1,
    options: [
        {
            name: "gracz",
            required: true,
            description: 'Nazwa osoby zapraszanej',
            type: ApplicationCommandOptionType.User,
        },
    ],

    callback: async ({interaction,guild}) => {
        try {
            const target = interaction.options.getUser("gracz");
            const owner = interaction.user.id
            
            const res = await economy.playerCompany(guild.id,owner)
            if(res){
                const invited = await invites.createInvite(guild.id,target.id,res)
            } else {
                return{
                    content: interaction.reply("Tylko właściciel może zapraszać.")
                }
            }
            
            return{
                content: interaction.reply("Pomyślnie zaproszono do firmy.")
            }
        } catch (error) {
          //console.log(error)
        }

    }
}
