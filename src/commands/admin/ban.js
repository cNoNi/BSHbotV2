const { CommandType } = require("wokcommands");
const { PermissionFlagsBits,  ApplicationCommandOptionType } = require("discord.js");
module.exports = {
    name: "ban",
    description: "Banuje osobe",
    type: CommandType.SLASH,
    guildOnly: true,
    permissions: [PermissionFlagsBits.Administrator],
    minArgs: 1,
    maxArgs: 1,
    options: [
        {
            name: 'użytkownik',
            description: 'Użytkownik do zbanowania',
            type: ApplicationCommandOptionType.User,
            required: true
        }
    ],
    callback: ({interaction, channel}) => {
        const member = interaction.options.getUser("użytkownik");
        member.ban()
        return({
            content: `Pomyślnie zbanowano ${'<@'+member.id+'>'}`, 
        })

    },
}