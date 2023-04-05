const mongoose = require('mongoose')
const profileSchema = require("../schema/profile.schema")

const coinsCache = {}


module.exports = (client) => {}

module.exports.addCoins = async (guildId, userId, coins) => {
      try {
        console.log('Running findOneAndUpdate()')
  
        const result = await profileSchema.findOneAndUpdate(
          {
            guildId,
            userId,
          },
          {
            guildId,
            userId,
            $inc: {
              coins,
            },
          },
          {
            upsert: true,
            new: true,
          }
        )
  
        console.log('RESULT:', result)
  
        coinsCache[`${guildId}-${userId}`] = result.coins
  
        return result.coins
      } finally {
      }
    
  }
  
module.exports.getCoins = async (guildId, userId) => {
        try{
            console.log('Running findOne')

            const result = await profileSchema.findOne({
                guildId,
                userId
            })

            console.log('Result:', result)

            let coins = 0
            if (result) {
                coins = result.coins
            } else {
                console.log('Inserting a document')
                await new profileSchema({
                    guildId,
                    userId,
                    coins
                }).save()
            }

            return coins
        }finally{
        }
}

module.exports.removeCoins = async (guildId, userId, coins) => {
        try{
            console.log('Running findOne')

            const result = await profileSchema.findOne({
                guildId,
                userId
            })

            console.log('Result:', result)

            let newCoins = 0
            if (result) {
                newCoins = result.coins - coins
                if (newCoins < 0) {
                    newCoins = 0
                }
                await profileSchema.findOneAndUpdate({
                    guildId,
                    userId
                }, {
                    guildId,
                    userId,
                    coins: newCoins
                })
            } else { 
                console.log('Inserting a document')
                await new profileSchema({
                    guildId,
                    userId,
                    coins
                }).save()
            }

            return newCoins
        }finally{
        }
}