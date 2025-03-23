const { CommandType,  } = require("wokcommands");
const economy = require('../../misc/economy')
const { EmbedBuilder, ApplicationCommandOptionType } = require('discord.js');

module.exports = {
    name: "givemoney",
    description: "Przekazuje wybraniej osobie kase",
    type: CommandType.SLASH,
    guildOnly: true,
    minArgs: 2,
    maxArgs: 2,
    options: [
        {
            name: "uzytkownik",
            required: true,
            description: 'Komu przekazac pieniadze',
            type: ApplicationCommandOptionType.User,
        },
        {
            name: "kasa",
            required: true,
            description: 'Ile przekazac pieniedzy',
            type: ApplicationCommandOptionType.Number,
        }
    ],

    callback: async ({interaction, args,guild}) => {

        const target = interaction.options.getUser("uzytkownik");
      //console.log(target.id)

        const coinsToGive = interaction.options.getNumber("kasa");
        if (isNaN(coinsToGive) || coinsToGive < 0){
            interaction.reply("Nie poprawna wartość to przekazania")
            return
        }

        const havedCoins = await economy.getCoins(guild.id, interaction.user.id)

        if (coinsToGive > havedCoins){
            interaction.reply(`Nie masz ${coinsToGive}`)
            return
        }

        const remaningCoins = await economy.addCoins(
            guild.id,
            interaction.user.id,
            coinsToGive * -1
        )

        const newBalance = await economy.addCoins(
            guild.id,
            target.id,
            coinsToGive
        )
        
        const embed = new EmbedBuilder()
        .setTitle("Przelew")
        .setColor(0x00ff00)
        .setDescription(`<@${interaction.user.id}> €${coinsToGive} ===> <@${target.id}>`)
        
        return{
            content: interaction.reply({embeds: [embed]})
        }
    }
}
