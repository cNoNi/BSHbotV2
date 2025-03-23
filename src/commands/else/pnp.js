const { CommandType,CooldownTypes } = require(`wokcommands`);
const {ButtonBuilder,ButtonStyle, ActionRowBuilder,ApplicationCommandOptionType, ComponentType,EmbedBuilder} = require('discord.js');

module.exports = {
    name: "pnp",
    description: "Wysyła wiadomość, każdy kto kliknie przycisk zostaje dodany do losowania",
    aliasses: ["vs"],
    guildOnly: true,
    type: CommandType.SLASH,
    callback: async ({interaction,channel,message}) => {
        const team1 = []
        const team2 = []

        const glos = new ButtonBuilder().setLabel("Weź udział").setStyle(ButtonStyle.Primary).setCustomId("Glos")
        const pickRow = new ActionRowBuilder().addComponents(glos)

        const embed = new EmbedBuilder().setTitle(`5v5 Losowanie teamów`).addFields(
            {name: `Team 1`, value: ` `},
            {name: `Team 2`, value: ` `},
        )
        .setFooter({text: `Kliknij przycisk poniżej by oddać głos`})
    
        const filter = (i) => i.user.id == interaction.user.id

        const r = await interaction.reply({embeds: [embed], components: [pickRow] })
        const collector = await r.createMessageComponentCollector({ componentType: ComponentType.Button,time: 10_000});

        collector.on("collect", (interaction) => {
            interaction.reply("Dodano do losowania")
        })

        collector.on("end", async (collected) => {
            collected.forEach(interaction => {
              //console.log(interaction.user.username)
                var team = Math.random() < 0.5;
              //console.log(team)
                if(team){
                    if(team1.length>=5){
                        team2.push(interaction.user.username)
                    }else{
                        team1.push(interaction.user.username)
                    }
                } else {
                    if(team2.length>=5){
                        team1.push(interaction.user.username)
                    }else{
                        team2.push(interaction.user.username)
                    }
                }
              //console.log(team1.length,team2.length)

                if(team1.length<=0) {
                    team1.push("Placeholder 1")
                } else if(team2.length<=0) {
                    team2.push("Placeholder 2")
                }

                //console.log(team1,team2)
                embed.setFields(
                    {name: `Team 1`, value: `${team1.toString()}` },
                    {name: `Team 2`, value: `${team2.toString()}` }
                )
                r.edit({embeds: [embed]})
              //console.log(team1,team2)
            });
        })
    }
}
