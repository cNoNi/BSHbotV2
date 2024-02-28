const mongoose = require('mongoose')
const reqString = {
    type: String,
    required: true,
}
  
const profileSchema = mongoose.Schema({
    guildId: reqString,
    userId: reqString,
    coins: {
      type: Number,
      required: true,
    },
    company: {
      type: String,
      required: false,
    }
})
  
module.exports = mongoose.model('profiles', profileSchema)