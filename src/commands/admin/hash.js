const { CommandType } = require("wokcommands");
const { PermissionFlagsBits,  ApplicationCommandOptionType } = require("discord.js");
const {createHash} = require('crypto')

module.exports = {
    name: "hash",
    description: "?",
    type: CommandType.SLASH,
    guildOnly: true,
    permissions: [PermissionFlagsBits.Administrator],
    minArgs: 1,
    maxArgs: 1,
    options: [
        {
            name: 'string',
            description: 'Użytkownik do zbanowania',
            type: ApplicationCommandOptionType.String,
            required: true
        }
    ],
    callback: ({interaction, channel}) => {

        function getRandomInt(min, max) {
            min = Math.ceil(min);
            max = Math.floor(max);
            return Math.floor(Math.random() * (max - min)) + min;
        }

        return createHash('sha256').update(interaction.options.getString("string")).update(createHash("sha256").update(toString(getRandomInt(0,10000), 'utf-8')).digest('hex')).digest('hex')

    },
}