const { CommandType } = require("wokcommands");
const economy = require('../../misc/economy')
const {EmbedBuilder,ButtonBuilder,ButtonStyle, ActionRowBuilder,ApplicationCommandOptionType, ComponentType} = require('discord.js');

module.exports = {
    name: "blackjack",
    aliasses: ["bj"],
    description: "Rozpoczyna gre w czarnego Jacka",
    guildOnly: true,
    type: CommandType.SLASH,
    minArgs: 1,
    maxArgs: 1,
    options: [
        {
            name: "kasa",
            type: ApplicationCommandOptionType.Number,
            requred: true,
            description: "Za ile kasy grasz",
            minValue: 50
        }
    ],
    callback: async ({interaction,guild,channel,message}) => {
        const kol = ["♣","♦","♥","♠"]
        const kar = ["2","3","4","5","6","7","8","9","10","J","Q","K","A"]

        const used = []
        const player = []
        const dealer = []

        const zak = interaction.options.getNumber("kasa")
        const havedCoins = await economy.getCoins(guild.id, interaction.user.id);

        const hit = new ButtonBuilder().setLabel("Hit").setStyle(ButtonStyle.Primary).setCustomId("Hit")
        const stand = new ButtonBuilder().setLabel("Stand").setStyle(ButtonStyle.Primary).setCustomId("Stand")
        const pickRow = new ActionRowBuilder().addComponents(hit,stand)

        //embed
        const embed = new EmbedBuilder()
        .setTitle("Blackjack")
        .addFields(
            {name: "Twoje karty: ", value: `1`}
        )
        .addFields(
            {name: "Karty dilera: ", value: `2`}
        )

        //check if player is able to play
        if(isNaN(zak)){
            interaction.reply("Nie właściwa liczba pieniędzy")
            return
        }
        if (zak > havedCoins) {
            interaction.reply(`Nie masz ${zak}`);
            return;
        }

        //randomizing cards
        player.push(los())
        player.push(los())

        dealer.push(los())

        embed.setFields(
            {name: "Twoje karty: ", value: player.toString() + `=> ${count(player)}`},
            {name: "Karty dealera", value: dealer.toString() + `=> ${count(dealer)}`}
        )
        // console.log("Player: " + player)
        // console.log("Dealer: " + dealer)
        // console.log("Used: " + used)

        if(count(player)>21) {
            sendEmbed()
            interaction.reply("Przegrywasz")
            return
        }

        //filer allows only author to take part
        const filter = (i) => i.user.id == interaction.user.id

        const r = await interaction.reply({embeds: [embed], components: [pickRow] })
        
        // const message1 = r.message;
        // console.log(r)
        // console.log(message)
        let i = 0;

        const collector = await r.createMessageComponentCollector({ componentType: ComponentType.Button,filter });


        collector.on("collect", (interaction) => {
            if(interaction.customId === "Hit") {
                interaction.deferUpdate().then().catch(console.error)
                player.push(los())
                sendEmbed()

                if(count(player)>21) {
                    interaction.reply("Przegrywasz")
                    collector.stop()
                    return
                }

            } else if (interaction.customId === "Stand") {
                while(count(player) > count(dealer)) {               
                    dealer.push(los())
                    sendEmbed()
                }
                interaction.deferUpdate().then().catch(console.error)
                collector.stop()
            }
            
        })

        collector.on("end", async (collected) => {
            if(collected.size === 0) {
                channel.send(`<@${interaction.user.id}> nic nie wybrał`)
                return
            }
            //win statemts
            if(count(player) === count(dealer) && count(player) <= 21) {
                channel.send(`<@${interaction.user.id}> zaliczyłeś remis.`)
            } else if(count(dealer)>= 22 && count(player)<=21) {
                channel.send(`<@${interaction.user.id}> wygrywa €${zak}.`)
                const newBalance = await economy.addCoins(guild.id,interaction.user.id,zak)
            } else {
                channel.send(`**Diler** wygrywa. <@${interaction.user.id}> przegrywa €${zak}.`)
                const remBalance = await economy.addCoins(guild.id,interaction.user.id,zak *-1)
            }

        })

        function los() {
            const col1 = Math.floor(Math.random() * 4)
            const card1 = Math.floor(Math.random() * 13)
            const res = kol[col1]+kar[card1]

            if(used.includes(res)) {
                los()
            } else {
              //console.log("Dobrano" + res)
                used.push(res)
                return res
            }
        }

        function count(array) {
            let amount = 0;
            for (let index = 0; index < array.length; index++) {
                const card = array[index];
                if (card) {
                    const sliced = card.slice(1);
                    if (sliced === 'A') {
                        amount += 11;
                    } else if (isNaN(parseInt(sliced))) {
                        amount += 10;
                    } else {
                        amount += parseInt(sliced);
                    }
                }
            }
            return amount;
        }

        function sendEmbed(){
            i++;
            //console.log(i)
            embed.setFields(
                {name: "Twoje karty: ", value: player.toString() + `=> ${count(player)}`},
                {name: "Karty dealera", value: dealer.toString() + `=> ${count(dealer)}`}
            )
            if (i>0){
                r.edit({embeds: [embed]})
            } else {
                channel.send({embeds: [embed]})
            }
            
        }
    }
}