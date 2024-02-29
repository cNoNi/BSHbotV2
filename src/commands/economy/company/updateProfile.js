const { CommandType,  } = require("wokcommands");
const invites = require('../../../misc/invites')
const economy =require("../../../misc/economy")

module.exports = {
    name: "checkInvites",
    description: "Sprawdza listę zaproszeń do firm",
    type: CommandType.SLASH,
    guildOnly: true,

    callback: async ({interaction,guild}) => {
        try {

            const member = interaction.user.id

            //const res = await economy.addCompanytoMember(guild.id,member)
            //const res = await economy.removeCompanyFromMember(guild.id,member)
        } catch (error) {
            console.log(error)
        }

    }
}
