const { EmbedBuilder } = require('discord.js');
const { CommandType } = require("wokcommands");
const intel = require("../../misc/intel")

module.exports = {
  name: "who-was-online",
  description: "Sprawdza ile osób bylo dzis na kanale.",
  guildOnly: true,
  type: CommandType.SLASH,

  callback: async ({interaction}) => {

    const number = await intel.usersOnline()
    let color=0x00ff00

    const embed = new EmbedBuilder()
    .setTitle("Online")

    if(number===-1) {
        color =0xff0000
        embed.setDescription("Nikt dzisij nie był online.")
    } else{
        embed.addFields(
            {name:"Osoby dzisiaj online",value: number}
        )
    }

    embed.setColor(color)

    interaction.reply({embeds: [embed]})
  }}