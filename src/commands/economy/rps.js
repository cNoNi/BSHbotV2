const { CommandType,CooldownTypes } = require("wokcommands");
const {ButtonBuilder,ButtonStyle, ActionRowBuilder,ApplicationCommandOptionType, ComponentType,EmbedBuilder} = require('discord.js');
const economy = require('../../misc/economy')

module.exports = {
    name: "pkn",
    aliases: ['rps'],
    description: "Papier kamień nożyce",
    type: CommandType.SLASH,
    guildOnly: true,
    cooldowns: {
        type: CooldownTypes.perGuild,
        duration: "10 s",
    },
    minArgs: 3,
    maxArgs: 3,
    options: [
        {
            name: "kasa",
            required: true,
            description: 'Wartość zakładu',
            type: ApplicationCommandOptionType.Number,
            minValue: 0
        },
        {
            name: "gracz",
            required: true,
            description: "Przeciwnik",
            type: ApplicationCommandOptionType.User,
        },
        {
            name: "wyb",
            required: true,
            description: "Wybór",
            type: ApplicationCommandOptionType.String
        }
    ],

    callback: async ({interaction, client,message,channel,guild,user}) => {
        const awyb = ["papier","kamien","nozyce"]
        const przec = interaction.options.getMember("gracz")
        const wyb1 = interaction.options.getString("wyb")
        const zak = interaction.options.getNumber("kasa")
        const embed = new EmbedBuilder().setTitle("Papier kamień nożyce")

        const player1 = interaction.user
        const coinStartPlayer1 = await economy.getCoins(guild.id, interaction.user.id);

        if (isNaN(zak)) {
            await interaction.reply("Niepoprawna wartość do przekazania");
            return;
        }

        if (zak > coinStartPlayer1) {
            await interaction.reply(`Nie masz ${zak}`);
            return;
        }
        //console.log(coinStartPlayer1)
        if(przec.user.bot){
            interaction.reply("Nie można zagrać z botem")
            return
        }

        if(!awyb.includes(wyb1)) {
            interaction.reply("Nie poprawny wybór. Wybierz: ***papier,kamien lub nozyce*** bez polskich znaków.")
            return
        }

        const papier = new ButtonBuilder().setLabel("Papier").setStyle(ButtonStyle.Primary).setCustomId("papier")
        const kamien = new ButtonBuilder().setLabel("Kamień").setStyle(ButtonStyle.Primary).setCustomId("kamien")
        const nozyce = new ButtonBuilder().setLabel("Nożyce").setStyle(ButtonStyle.Primary).setCustomId("nozyce")

        const pickRow = new ActionRowBuilder().addComponents(papier,kamien,nozyce)
        const r = await interaction.reply({embeds: [embed], components: [pickRow] })

        const filter = (i) => i.user.id == przec.user.id
        const collector = r.createMessageComponentCollector({ componentType: ComponentType.Button, time: 20_000, max: 1, filter });
        collector.on('collect', async (interaction) => {
            //const wyb2 = interaction.customId;
            const coinStartPlayer2 = await economy.getCoins(guild.id, interaction.user.id);
            if (zak > coinStartPlayer2) {
                await interaction.reply(`Nie masz ${zak}`);
                return;
            }
        })
        collector.on('end', async (collected) => {
            collected.forEach((interaction) => {
                wyb2=interaction.customId
            });
            //console.log("the end")
            if(collected.size === 0) {
                channel.send(`<@${przec.user.id}> nic nie wybrał`)
                return
            }
            console.log(collected + "\n\n" + wyb2)
            if(wyb1===wyb2){
                interaction.reply("Remis")
                return
            } else if(wyb1 === "papier" && wyb2 === "kamien") {
                interaction.reply("Pierwszy gracz wygrywa")
                win(player1,przec)
                return
            } else if(wyb1 === "kamien" && wyb2 === "papier"){
                interaction.reply("Drugi gracz wygrywa")
                win(przec,player1)
                return
            } else if(wyb1 === "papier" && wyb2 === "nozyce"){
                interaction.reply("Drugi gracz wygrywa")
                win(przec,player1)
                return
            } else if(wyb1 === "nozyce" && wyb2 === "papier"){
                interaction.reply("Pierwszy gracz wygrywa")
                win(player1,przec)
                return
            } else if(wyb1 === "kamien" && wyb2 === "nozyce"){
                interaction.reply("Pierwszy gracz wygyrywa")
                win(player1,przec)
                return
            } else if(wyb1 === "nozyce" && wyb2 === "kamien"){
                interaction.reply("Drugi gracz wygyrywa")
                win(przec,player1)
                return
            }
        })

        function win(winner, loser) {
            const newBalance = economy.addCoins(
                guild.id,
                winner.user.id,
                zak 
            )
            const remaningCoins = economy.addCoins(
                guild.id,
                loser.user.id,
                zak * -1
            )
        }
    }
}
