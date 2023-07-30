const { CommandType } = require("wokcommands");
const {ButtonBuilder,ButtonStyle, ActionRowBuilder,ApplicationCommandOptionType, ComponentType,EmbedBuilder } = require('discord.js');
const economy = require('../../misc/economy')

module.exports = {
    name: "roulette",
    description: "ruletka",
    type: CommandType.LEGACY,
    guildOnly: true,
    callback: async ({interaction, client,message,channel}) => {

        const red = new ButtonBuilder().setLabel("Red").setStyle(ButtonStyle.Primary).setCustomId("Czerwony")
        const black = new ButtonBuilder().setLabel("Black").setStyle(ButtonStyle.Primary).setCustomId("Czarny")
        const white = new ButtonBuilder().setLabel("White").setStyle(ButtonStyle.Primary).setCustomId("Biały")

        const btnRow = new ActionRowBuilder().addComponents(red,black)

        const r = await message.reply({content :"KYS", components: [btnRow] })

        // const filter = (i) => i.user.id == message.author.id

        const collector = r.createMessageComponentCollector({ componentType: ComponentType.Button, time: 20000, max: 36 });

        const wyg = Math.floor(Math.random() * 37)

        collector.on('collect', (interaction) => {
            // if(interaction.customId === "red"){
            //     message.reply("red")
            // } else if (interaction.customId === "black") {
            //     message.reply("black")}
            const wyb = interaction.customId
	    interaction.reply(`<@${interaction.user.id}> wybrał ${wyb}`)
        })
        let wygr = "Wygrywają : \n\n"
        let prz = "Przegrani : \n\n"
        collector.on('end', (collected) => {
            console.log(wyg, ' ', getColorEuropeanRoulette(wyg))
            //console.log(collected);
            let nag = `Wygrywa **${wyg} ${getColorEuropeanRoulette(wyg)}** \n\n`
            collected.forEach((interaction) => {
                if (interaction.customId === getColorEuropeanRoulette(wyg)){
                    console.log(interaction.user.id,"/",interaction.customId, "\n")
                    wygr += `<@${interaction.user.id}> \n`
                } else {
                    console.log(interaction.user.id,"/",interaction.customId, "\n")
                    prz += `<@${interaction.user.id}> \n`
                } 

                
                return{
                    content: channel.send(nag+wygr+prz)
                }            
            })

        })


        function getColorEuropeanRoulette(number) {
            if (number === 0) {
              return 'Biały';
            } else if ((number >= 1 && number <= 10) || (number >= 19 && number <= 28)) {
              return number % 2 === 1 ? 'Czerwony' : 'Czarny';
            } else if ((number >= 11 && number <= 18) || (number >= 29 && number <= 36)) {
              return number % 2 === 0 ? 'Czerwony' : 'Czarny';
            } else {
              throw new Error('Invalid number. Must be between 0 and 36.');
            }
        }
    },
}
