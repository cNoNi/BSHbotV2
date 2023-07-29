const { CommandType } = require("wokcommands");
const { EmbedBuilder } = require('discord.js');
const { PermissionFlagsBits,  ApplicationCommandOptionType } = require("discord.js");
// const channel = ['1117434789960618035']

module.exports = {
  name: "prop",
  description: "Wysyła na kanał #propozycje-mc twoją propozycję.",
  minArgs: 2,
  maxArgs: 2,
  guildOnly: true,
  type: CommandType.SLASH,
  options: [
    {
        name: 'propozycja',
        description: 'Co proponujesz (krótko)',
        type: ApplicationCommandOptionType.String,
        maxLength: 14,
        minLength: 1,
        required: true
    },
    {
        name: 'dlaczego',
        description: 'Czemu tak chcesz?',
        type: ApplicationCommandOptionType.String,
        minLength: 1,
        required: true
    }
],
  // Invoked when a user runs the ping command
  callback: ({client,interaction}) => {
    const propo = interaction.options.getString('propozycja');
    const pow = interaction.options.getString("dlaczego")
    const exampleEmbed = new EmbedBuilder()
      .setColor(0xffc741)
      .setTitle(propo)
      .addFields(
        {name: "Dlaczego?", value: pow}
      );
    const channel = client.channels.cache.get('1117446065726165043');

    channel.send({ embeds: [exampleEmbed] }).then(sentMessage => {
        sentMessage.react("✔")
        sentMessage.react("❌")
    })
    return{
      content: client.users.send(`${interaction.member.id}`, 'Pomyślnie złożono propozycje')   
    }

  },
}