const { CommandType } = require("wokcommands");
const { PermissionFlagsBits,  ApplicationCommandOptionType } = require("discord.js");

module.exports = {
    name: "clear",
    guildOnly: true,
    description: "Czyści wiadomości",
    type: CommandType.SLASH,
    permissions: [PermissionFlagsBits.Administrator],
    minArgs: 1,
    maxArgs: 1,
    options: [
        {
            name: 'liczba',
            description: 'Ile usunąć wiadomości',
            type: ApplicationCommandOptionType.Number,
            required: true,
            minValue: 1,
            maxValue: 100,
        }
    ],
    
    callback: async ({interaction, channel}) => {
        const count = interaction.options.getNumber("liczba");
        if (count > 100 || count < 1) {
            return({
                content: `Poprawny argument dla usuwanych wiadomości to taki od 1 do 100`, 
            })
        }
        await channel.bulkDelete(count, true);
        return({
            content: `Pomyślnie usunięto ${count} wiadomości.'}`, 
        })
    }
}