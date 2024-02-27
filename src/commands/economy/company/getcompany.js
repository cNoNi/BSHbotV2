const { CommandType,  } = require("wokcommands");
const economy = require('../../../misc/economy')
const { EmbedBuilder, ApplicationCommandOptionType } = require('discord.js');

module.exports = {
    name: "getCompany",
    description: "Wyświetla informacje o firmie",
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

    callback: async ({interaction, args,guild}) => {

        const target = interaction.options.getString("firma");
        const w = await economy.getCompany(guild.id,target)
        if(!w){
            return{
                content: interaction.reply("Firma o podanej nazwie nie istnieje.")
            }
        }
        console.log(w)
        const embed = new EmbedBuilder()
        .setTitle("Informacje o firmie")
        .setColor(0x00ff00)
        .setFields(
            {name: "Właściciel", value: `<@${w.owner}>`},
            {name: "Liczba członków", value: `${w.members.length}`},
        )
        
        return{
            content: interaction.reply({embeds: [embed]})
        }
    }
}
