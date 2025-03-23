const { CommandType } = require("wokcommands");
const { EmbedBuilder,Collection } = require('discord.js');
const { readdirSync } = require("fs")
const ascii = require("ascii-table");

const table = new ascii().setHeading("Command", "Load status")
module.exports = {
  name: "help",
  description: "Wysyła wiadomość z wszystkimi dostępnymi komendami",
  type: CommandType.BOTH,

  // Invoked when a user runs the ping command
  callback: ({channel,client,interaction}) => {
    const wyp = []
    client.commands = new Collection()
    // Cooldowns Collection
  
    const exampleEmbed = new EmbedBuilder()
    .setColor(0x0099FF)
    .setTitle('/Help')
    .addFields(
      {name: "Ekonomia", value: " "}
    )
    

    const commandFiles = readdirSync(__dirname + "/../../commands/economy/").filter((file) =>
    file.endsWith(".js"),
  )

  for (const file of commandFiles) {
    const command = require(__dirname + `/../../commands/economy/${file}`)

  //console.log(command.name)
    if (command.name) {
    //console.log(command.description)
      client.commands.set(command.name, command)
      table.addRow(file, "✔")
      exampleEmbed.addFields(
        {name: " ", value: `**${command.name}**` +" "+ command.description})
    //console.log(commandFiles)
    } else {
      table.addRow(file, "❌  -> brakuję 'nazwy'!")
      continue
    }
  }

  //console.log(table.toString())


    return{
      content: interaction.reply({ embeds: [exampleEmbed] }),
    }

  },
}