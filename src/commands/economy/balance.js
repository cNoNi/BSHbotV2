const { CommandType } = require("wokcommands");
const economy = require('../../misc/economy')
const { EmbedBuilder, ApplicationCommandOptionType } = require('discord.js');

module.exports = {
    name: "balance",
    description: "Sprawdza kase",
    type: CommandType.SLASH,
    guildOnly: true,
    minArgs: 0,
    maxArgs: 1,
    options: [
        {
            name: "użytkownik",
            type: ApplicationCommandOptionType.User,
            description: "Osoba której sprawdzasz konto",
            required: false,
        }
    ],
    callback: async ({message, channel,interaction,guild, args}) => {
        
        if (args.length === 1) {
            let mention = interaction.options.getMember("użytkownik");
            kys(mention)
        } else {
            let mention = interaction.user
            kys(mention)
        }
        async function kys(mention) {
            const target = mention
            const targetID = target.id
    
          //console.log('Target id:', targetID)
    
            const guildId = guild.id
            const userId = target.id
    
            const coins = await economy.getCoins(guildId,userId)
            const embed = new EmbedBuilder()
            // Set the title of the field
            .setTitle("Balans konta")
            // Set the color of the embed
            .setColor(0x6011ba)
            // Set the main content of the embed
            .setDescription(`Patrzysz na konto <@${userId}>`) 
            //.addField("Autor", botAuthor, true)
            .addFields(
                {name: "Pieniądze", value: `€${coins}`}
            );
            //channel.send(`<@${userId}> ma ${coins} €`)

        return{
            content: interaction.reply({embeds: [embed]})
        }
    }

    },
}