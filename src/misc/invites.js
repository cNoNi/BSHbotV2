const mongoose = require('mongoose')

const inviteSchema = require("../schema/invite.schema")
const economy = require("./economy")

module.exports.createInvite = async (guildId,userId,compName) => {
    try {
        const result = await inviteSchema.create(
            {
                guildId,
                userId,
                compName
            }
        )
        console.log(result)
    } catch (error) {
        console.log(error)
    }
}

module.exports.checkInvites = async (guildId,userId) =>{
    try {
        const result = await inviteSchema.find(
            {
                guildId,
                userId,
            }
        ).exec()
        if(result){
            return result
        } else {
            return false
        }
    } catch (error) {
        console.log(error)
    }
}

module.exports.removeInvite = async (guildId,userId,compName) => {
    try{
        const result = await inviteSchema.findOneAndDelete({
            guildId,
            userId,
            compName
        })
    } catch(error){

    }
} 