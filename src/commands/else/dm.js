const { CommandType } = require("wokcommands");
const { ApplicationCommandOptionType } = require("discord.js");
module.exports = {
    name: "dm",
    description: "Wysyła dm do kogoś",
    type: CommandType.SLASH,
    guildOnly: true,
    minArgs: 2,
    maxArgs: 2,
    options: [
        {
            name: 'użytkownik',
            description: "Użytkownik do zdmowania",
            type: ApplicationCommandOptionType.User,
            required: true
        },
        {
            name: 'tekst',
            description: "Tekst",
            type: ApplicationCommandOptionType.String,
            required: true
        }
    ],
    callback: async ({interaction, client}) => {
        const userId = interaction.options.getUser("użytkownik")
        const tekst = interaction.options.getString("tekst")
        const user = await client.users.fetch(userId);
        user.send(tekst)
        return({
            content: `Pomyślnie wysłano wiadomość do ${'<@'+userId+'>'} o treści ${tekst}`, 
        })

    },
}