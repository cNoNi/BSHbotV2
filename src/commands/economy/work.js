const { CommandType, CooldownTypes } = require("wokcommands");
const economy = require('../../misc/economy')
const { EmbedBuilder } = require('discord.js');

module.exports = {
    name: "work",
    description: "Zawsze zarobisz",
    type: CommandType.SLASH,
    guildOnly: true,
    cooldowns: {
        type: CooldownTypes.perUser,
        duration: "1 m",
      },

    callback: async ({interaction, guild}) => {
        let work = interaction.user
        const target = work
        const targetID = target.id

        console.log('Target id:', targetID)

        const guildId = guild.id
        const userId = target.id

        const coins = Math.floor(Math.random() * 250) + 50;

        const newCoins = await economy.addCoins(guildId, userId, coins)

        returns(coins,newCoins)

        function returns( poss, newc) {
            const embed = new EmbedBuilder()
            .setTitle("Praca")
            .setColor(0x00ff00)
            .setDescription(`Zarobiłeś €${poss}, masz teraz €${newc}`)
            return{
                content: interaction.reply({embeds: [embed]})
            }
        }
    }
}