const mongoose = require('mongoose')

const reqString = {
    type: String,
    required: true,
}
  
const companiesSchema = mongoose.Schema({
    name: reqString,
    guildId: reqString,
    owner: reqString,
    coins: {
      type: Number,
      required: true,
    },
    members: [String],
})
  
module.exports = mongoose.model('companies', companiesSchema)