const { CommandType } = require("wokcommands");
const { PermissionFlagsBits, Message } = require("discord.js");

module.exports = {
    name: "comdelete",
    description: "Usuwa komendę",
    guildOnly: true,
    permissions: [PermissionFlagsBits.Administrator],
    type: CommandType.BOTH,
    minArgs: 1,
    maxArgs: 1,
    expectedArgs: "<id komendy>",

  callback: ({guild, client, args, channel,message}) => {
    console.log(args)
    client.application.commands.fetch(args[0]) // id of your command
      .then( (command) => {
    console.log(`Fetched command ${command.name}`)
    // further delete it like so:
    command.delete()
    console.log(`Deleted command ${command.name}`)
    }).catch(console.error);
    return{
        content: message.reply(`Pomyślnie wyjebano komendę.`),
    }
  },
}