const { CommandType } = require("wokcommands");
const { PermissionFlagsBits,  ApplicationCommandOptionType } = require("discord.js");
const economy = require('../../misc/economy')
module.exports = {
    name: "addmoney",
    aliasses: ["addbal"],
    description: "Dodaje komuś pieniądze",
    type: CommandType.SLASH,
    guildOnly: true,
    permissions: [PermissionFlagsBits.Administrator],
    minArgs: 2,
    maxArgs: 2,
    options: [
        {
            name: 'użytkownik',
            description: 'Użytkownik do wyrzucenia',
            type: ApplicationCommandOptionType.User,
            required: true
        },
        {
            name: 'kasa',
            description: 'Ile dodać pieniędzy',
            type: ApplicationCommandOptionType.Number,
            required: true
        }
    ],
    callback: async ({args, interaction, channel,guild}) => {
        const mention = interaction.options.getMember("użytkownik")
        const kasa = interaction.options.getNumber("kasa")
        if (!mention) {
          interaction.reply('Wskaż użytkownika, któremu chcesz dodać pieniądze.')
          return
        }
    
        if (isNaN(kasa)) {
          interaction.reply('Podaj prawidłową liczbę pieniędzy.')
          return
        }
    
        const userId = mention.id
    
        const newCoins = await economy.addCoins(guild.id, userId, kasa)
    
        interaction.reply(
          `Dodałeś <@${userId}> ${kasa} €. Balans tego użytkownika wynosi ${newCoins} €.`
        )
    },
}