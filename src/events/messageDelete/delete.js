const { EmbedBuilder } = require('discord.js');
module.exports = (message, instance) => {
  // console.log(message.content)
  const logsChannel = message.guild.channels.cache.find(
    (channel) => channel.name === 'dziennik'
  );

  if (!logsChannel) {
    return;
  }

  const exampleEmbed = new EmbedBuilder()
    .setColor(0xff0000)
    .setTitle('Message Deleted')
    .addFields(
      { name: 'Author', value: message.author.tag, inline: true },
      { name: 'Channel', value: message.channel.name, inline: true },
      { name: 'Message', value: message.content }
    );

  logsChannel.send({ embeds: [exampleEmbed] });
};
