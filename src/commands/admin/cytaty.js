const { CommandType } = require("wokcommands");
const { PermissionFlagsBits} = require("discord.js");
const fs = require('fs');
module.exports = {
    name: "cytaty",
    description: "Zapisuje wszystkie cytaty do bazy danych",
    type: CommandType.SLASH,
    guildOnly: true,
    permissions: [PermissionFlagsBits.Administrator],

    callback: async ({client,}) => {
        const channelId = '926108266352754708'
        const messageLimit = 100
        try {
            const channel = await client.channels.fetch(channelId);
            const messages = await channel.messages.fetch({ limit: messageLimit });
            const messageArray = Array.from(messages.values());
            const formattedMessages = messageArray.map(m => `${m.author.username}: ${m.content}`);
            const chatHistory = formattedMessages.join('\n');
            fs.writeFile('cytaty.txt', chatHistory, function (err) {
                if (err) throw err;
              //console.log('Zapisano cytaty do pliku');
            });
            return {
                content: "Zapisano wszystkie cytaty",
            }
        } catch (error) {
            console.error(error);
        }
    },
}