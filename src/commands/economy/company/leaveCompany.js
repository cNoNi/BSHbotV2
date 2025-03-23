const { CommandType,  } = require("wokcommands");
const invites = require('../../../misc/invites')
const economy =require("../../../misc/economy")

module.exports = {
    name: "leaveCompany",
    description: "Opuszczasz firmę",
    type: CommandType.SLASH,
    guildOnly: true,

    callback: async ({interaction,guild}) => {
        try {

            const member = interaction.user.id

            const memberinfo = await economy.playerCompany(guild.id,member)

            if(memberinfo){
                const res = await economy.removeCompanyFromMember(guild.id,member)
                const res2 = await economy.removeMemberFromCompany(guild.id,member,"w")
            } else {
                return {content: `Nie możesz wyjść z firmy.`}
            }


        } catch (error) {
          //console.log(error)
        }

    }
}
