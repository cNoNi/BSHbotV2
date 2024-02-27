const { CommandType,  } = require("wokcommands");
const economy = require('../../../misc/economy')
const { EmbedBuilder, ApplicationCommandOptionType } = require('discord.js');

module.exports = {
    name: "createCompany",
    description: "Tworzy nową firmę",
    type: CommandType.SLASH,
    guildOnly: true,
    minArgs: 1,
    maxArgs: 1,
    options: [
        {
            name: "firma",
            required: true,
            description: 'Nazwa firmy',
            type: ApplicationCommandOptionType.String,
        },
    ],

    callback: async ({interaction,guild}) => {
        const target = interaction.options.getString("firma");
        const owner = interaction.user.id

        const compare = await economy.getCompany(guild.id,target)
        if(compare){
            return{
                content: interaction.reply("Firma o podanej nazwie już istnieje.")
            } 
        }
        const w = await economy.createCompany(guild.id,target,owner) 
        
        const embed = new EmbedBuilder()
        .setTitle("Stworzono firmę")
        .setColor(0x00ff00)
        .setDescription(`Firma ${target} została utworzona.`)
        
        return{
            content: interaction.reply({embeds:[embed]})
        }
    }
}
