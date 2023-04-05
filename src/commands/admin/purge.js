const { CommandType } = require("wokcommands");
const { PermissionFlagsBits,  ApplicationCommandOptionType, ChannelType } = require("discord.js");

module.exports = {
    name: "purge",
    guildOnly: true,
    description: "Czyści cały kanał",
    type: CommandType.BOTH,
    permissions: [PermissionFlagsBits.Administrator],

    callback: async ({channel,guild}) => {
        const chName = channel.name
        const chPosition = channel.position
        const chType = channel.type
        const chParent = channel.parent
        await channel.delete();

        const newChannel = await guild.channels.create({
            name: chName,
            type: chType,
            parent: chParent,
            position: chPosition,
          });

    }
}