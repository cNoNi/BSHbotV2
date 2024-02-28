const { CommandType,  } = require("wokcommands");
const economy = require('../../../misc/economy')
const { EmbedBuilder, ApplicationCommandOptionType } = require('discord.js');

module.exports = {
    name: "addToCompany",
    description: "Dodaje do firmy gracza",
    type: CommandType.SLASH,
    guildOnly: true,
    minArgs: 2,
    maxArgs: 2,
    options: [
        {
            name: "firma",
            required: true,
            description: 'Nazwa firmy',
            type: ApplicationCommandOptionType.String,
        },
        {
            name: "gracz",
            required: true,
            description: 'Nazwa osoby dodawanej',
            type: ApplicationCommandOptionType.User,
        },
    ],

    callback: async ({interaction,guild}) => {
        try {
            const comp = interaction.options.getString("firma");
            const target = interaction.options.getUser("gracz");
            const owner = interaction.user.id
            
            const q = await economy.getCompany(guild.id,comp)
            if(!q) return {content: interaction.reply("Ta firma nie istnieje.")}
            const a = q.members 

            let x=0
            a.forEach((members) => {
                if(members==target){
                    x=1
                }
            });
            
            if(x===1) return {content: interaction.reply("Gracz jest już w tej firmie.")}
            const w = await economy.addMember(guild.id,comp,target.id) 
            console.log(w)
    
            return{
                content: interaction.reply("Pomyślnie dodano do firmy.")
            }
        } catch (error) {
            console.log(error)
        }

    }
}
