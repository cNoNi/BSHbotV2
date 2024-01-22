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
            description: '?',
            type: ApplicationCommandOptionType.String,
            required: true
        }
    ],
    callback: ({interaction}) => {

        function getRandomInt(min, max) {
            min = Math.ceil(min);
            max = Math.floor(max);
            return Math.floor(Math.random() * (max - min)) + min;
        }
        function makeid(length) {
            let result = '';
            const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
            const charactersLength = characters.length;
            let counter = 0;
            while (counter < length) {
              result += characters.charAt(Math.floor(Math.random() * charactersLength));
              counter += 1;
            }
            return result;
        }
        return createHash('sha256')
        .update(interaction.options.getString("string"))
        .update(createHash("sha256")
        .update(makeid(getRandomInt(3,12), 'utf-8'))
        .digest('hex'))
        .digest('hex')

    },
}