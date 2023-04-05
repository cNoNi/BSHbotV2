const { CommandType } = require("wokcommands");
const { EmbedBuilder } = require('discord.js');

module.exports = {
  name: "help",
  description: "Odsyła wszystkie dostępne komendy",
  
  type: CommandType.BOTH,

  // Invoked when a user runs the ping command
  callback: ({channel}) => {

    const exampleEmbed = new EmbedBuilder()
      .setColor(0x0099FF)
      .setTitle('.Help')
      .addFields(
        {name: "Komendy", value: "1\n2"}
      );
    return{
      content: channel.send({ embeds: [exampleEmbed] }),
    }

  },
}