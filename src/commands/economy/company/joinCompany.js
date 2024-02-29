const { CommandType,  } = require("wokcommands");
const invites = require('../../../misc/invites')
const economy = require('../../../misc/economy')
const { ApplicationCommandOptionType } = require('discord.js');

module.exports = {
    name: "joinCompany",
    description: "Pozwala na dołączenie do firmy",
    type: CommandType.SLASH,
    guildOnly: true,
    minArgs: 1,
    maxArgs: 1,
    options: [
        {
            name: "firma",
            required: true,
            description: 'Do której firmy chesz dołączyć',
            type: ApplicationCommandOptionType.String,
        },
    ],

    callback: async ({interaction,guild}) => {
        try {  
            const member = interaction.user.id
            const targetcomp = interaction.options.getString("firma")
            const res = await invites.checkInvites(guild.id,member)
            console.log(res)
            if(res){
                res.forEach(element => {
                    if(element.compName==targetcomp) {
                        if(res.company!=""){
                            economy.removeMemberFromCompany(guild.id,member,targetcomp)
                        }
                        economy.addMember(guild.id,targetcomp,member)
                        economy.addCompanytoMember(guild.id,member,targetcomp)
                        invites.removeInvite(guild.id,member,targetcomp)
                        return true
                    }
                    });
            } else {
                return{
                    content: interaction.reply("Nie masz zaproszenia od takiej firmy")
                }
            }
            return {content: "Pomyślnie dołączono do firmy."}
        } catch (error) {
            console.log(error)
        }

    }
}
