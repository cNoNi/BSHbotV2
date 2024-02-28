const mongoose = require('mongoose')
const reqString = {
    type: String,
    required: true,
}
  
const inviteSchema = mongoose.Schema({
    guildId: reqString,
    userId: reqString,
    compName: reqString
})
  
module.exports = mongoose.model('invites', inviteSchema)