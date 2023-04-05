const { CommandType, CooldownTypes } = require("wokcommands");
const economy = require('../../misc/economy')
const { EmbedBuilder } = require('discord.js');

module.exports = {
    name: "crime",
    description: "Wiele zyskasz bądź wiele stracisz",
    type: CommandType.SLASH,
    guildOnly: true,
    cooldowns: {
        type: CooldownTypes.perUser,
        duration: "5 m",
      },

    callback: async ({interaction, guild}) => {
        let work = interaction.user
        const target = work

        const guildId = guild.id
        const userId = target.id
        

        function getRandomInt(min, max) {
            min = Math.ceil(min);
            max = Math.floor(max);
            return Math.floor(Math.random() * (max - min)) + min;
        }
        const poss = getRandomInt(-1000, 3000)
        while (poss == 0) {
            const poss = getRandomInt(-600, 3200)
        }

        const newCoins = await economy.addCoins(guildId, userId, poss)

        if (poss <= -1) {
            returns(0xff0000, poss, "Straciłeś",newCoins)
        } else {
            returns(0x00ff00, poss, "Ukradłeś", newCoins)
        }

        function returns(col, poss, odp, newc) {
            const embed = new EmbedBuilder()
            .setTitle("Kradzież")
            .setColor(col)
            .setDescription(`${odp} €${poss}, masz teraz €${newc}`)
            return{
                content: interaction.reply({embeds: [embed]})
            }
        }
    }
}