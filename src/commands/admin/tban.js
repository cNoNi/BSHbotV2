const { CommandType } = require("wokcommands");
const { PermissionFlagsBits,  ApplicationCommandOptionType } = require("discord.js");
module.exports = {
    name: "tban",
    description: "Wyrzuca użytkownika na określony czas",
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
            name: 'czas',
            description: 'Czas wyrzucenia w sekundach',
            type: ApplicationCommandOptionType.Number,
            required: true
        }
    ],
    callback: ({args, interaction, channel}) => {
        const member = interaction.options.getMember("użytkownik");
        const time = interaction.options.getNumber("czas");
        member.timeout(args[1] *60 *1000)
        return({
            content: `Pomyślnie wyrzucono ${'<@'+member.id+'>'} na ${time} minut`, 
        })
    },
}