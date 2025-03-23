const { CommandType } = require("wokcommands");
const { PermissionFlagsBits,ApplicationCommandOptionType } = require("discord.js");


//Slash commands doesnt work, you cannot pass id of commands
module.exports = {
    name: "comdelete",
    aliasses: ["cd"],
    description: "Usuwa komendę",
    guildOnly: true,
    permissions: [PermissionFlagsBits.Administrator],
    type: CommandType.LEGACY,
    minArgs: 1,
    maxArgs: 1,
    expectedArgs: "<id komendy>",

  callback: ({guild, client, args, channel,message,interaction}) => {
  //console.log(args)
    client.application.commands.fetch(args[0])
      .then( (command) => {
  //console.log(`Fetched command ${command.name}`)
    command.delete()
  //console.log(`Deleted command ${command.name}`)
    }).catch(console.error);
    return{
        content: message.reply(`Pomyślnie wyjebano komendę.`),
    }
  },
}