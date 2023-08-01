const { CommandType,CooldownTypes } = require("wokcommands");
const {ButtonBuilder,ButtonStyle, ActionRowBuilder,ApplicationCommandOptionType, ComponentType} = require('discord.js');
const economy = require('../../misc/economy')

module.exports = {
    name: "roulette",
    aliases: ['roul'],
    description: "ruletka",
    type: CommandType.SLASH,
    guildOnly: true,
    cooldowns: {
        type: CooldownTypes.perGuild,
        duration: "30 s",
    },
    minArgs: 1,
    maxArgs: 1,
    options: [
        {
            name: "kasa",
            required: true,
            description: 'Wartość zakładu',
            type: ApplicationCommandOptionType.Number,
            minValue: 50
        },
    ],

    callback: async ({interaction, client,message,channel,guild}) => {
        const wzak = interaction.options.getNumber("kasa")

        const red = new ButtonBuilder().setLabel("Red").setStyle(ButtonStyle.Primary).setCustomId("Czerwony")
        const black = new ButtonBuilder().setLabel("Black").setStyle(ButtonStyle.Primary).setCustomId("Czarny")
        const white = new ButtonBuilder().setLabel("White").setStyle(ButtonStyle.Primary).setCustomId("Biały")

        const even = new ButtonBuilder().setLabel("Parzyste").setStyle(ButtonStyle.Primary).setCustomId("0")
        const odd = new ButtonBuilder().setLabel("Nieparzyste").setStyle(ButtonStyle.Primary).setCustomId("1")

        const pickRow = new ActionRowBuilder().addComponents(red,black,white)
        const pick2Row = new ActionRowBuilder().addComponents(even,odd)

        const r = await interaction.reply({content :`Rozpoczeła się gra w ruletkę, stawka to €${wzak}`, components: [pickRow,pick2Row] })

        // const filter = (i) => i.user.id == message.author.id

        const collector = r.createMessageComponentCollector({ componentType: ComponentType.Button, time: 20000, max: 36 });

        const wyg = Math.floor(Math.random() * 37)

        // await collector.on('collect', async (interaction) => {
        //     console.log(interaction.user)
        //         const wyb = interaction.customId
        //         const havedCoins = economy.getCoins(guild.id, interaction.user.id)
        //         if (isNaN(wzak)){
        //             await interaction.reply("Nie poprawna wartość to przekazania")
        //             return
        //         }
        
        //         if (wzak > havedCoins){
        //             interaction.reply(`Nie masz ${wzak}`)
        //             return
        //         }



	    //     interaction.reply(`<@${interaction.user.id}> wybrał ${wyb}`)
        // })
        const stoppedUsers = [];
        collector.on('collect', async (interaction) => {
            //console.log(interaction.user);
            const wyb = interaction.customId;
            const havedCoins = await economy.getCoins(guild.id, interaction.user.id);
        
            if (isNaN(wzak)) {
              await interaction.reply("Niepoprawna wartość zakładu");
              stoppedUsers.push(interaction.user.id); // Add user to the stoppedUsers list
              return;
            }
            console.log("\n\n Pieniądze pos " + havedCoins + " Wys zakładu " + wzak)
            if (wzak > havedCoins) {
              await interaction.reply(`Nie masz ${wzak}`);
              stoppedUsers.push(interaction.user.id); // Add user to the stoppedUsers list
              return;
            }
        
            await interaction.reply(`<@${interaction.user.id}> wybrał ${wyb}`);
          });

        let wygr = "Wygrywają : \n\n"
        let prz = "Przegrani : \n\n"

        await collector.on('end', (collected) => {

            console.log(wyg, ' ', getColorEuropeanRoulette(wyg))

            //console.log(collected);

            let nag = `Wygrywa **${wyg} ${getColorEuropeanRoulette(wyg)}** \n\n`

            collected.forEach((interaction) => {
                console.log(stoppedUsers)
                if (stoppedUsers.includes(interaction.user.id)) {
                    return; // Ignore interactions from users in the stoppedUsers list
                  }
                if (interaction.customId === getColorEuropeanRoulette(wyg) || wyg%2===parseInt(interaction.customId)){
                    console.log(interaction.user.id,"/",interaction.customId, "\n")
                    wygr += `<@${interaction.user.id}> \n`
                    const newBalance = economy.addCoins(
                        guild.id,
                        interaction.user.id,
                        wzak *2
                    )
                } else {
                    console.log(interaction.user.id,"/",interaction.customId, "\n")
                    prz += `<@${interaction.user.id}> \n`
                    const remaningCoins = economy.addCoins(
                        guild.id,
                        interaction.user.id,
                        wzak * -1
                    )
                } 

          
            })
            return{
                content: channel.send(nag+wygr+prz)
            }  

        })

        function getColorEuropeanRoulette(number) {
            if (number === 0) {
              return 'Biały';
            } else if ((number >= 1 && number <= 10) || (number >= 19 && number <= 28)) {
              return number % 2 === 1 ? 'Czerwony' : 'Czarny';
            } else if ((number >= 11 && number <= 18) || (number >= 29 && number <= 36)) {
              return number % 2 === 0 ? 'Czerwony' : 'Czarny';
            } else {
              throw new Error('Nieprawidłowy number');
            }
        }
    },
}
