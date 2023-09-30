const fs = require("fs");

module.exports = (message, instance) => {
    try {    
        //console.log(message.author.username)
        const path = __dirname + '../../../data/log.json'

        let existingData = [];
        if (fs.existsSync(path)) {
        const existingJson = fs.readFileSync(path, 'utf-8');
        existingData = JSON.parse(existingJson);
        }
        
        let data = {
            "user": message.author.username,
            "id": message.author.id,
            "channel":message.channelId,
            "timestamp": message.createdTimestamp,
            "content": message.content
        }

        if (!Array.isArray(existingData)) {
            existingData = [existingData];
        }

        existingData.push(data); 

        const jsonString = JSON.stringify(existingData, null, 2);
        fs.writeFileSync(path, jsonString, function (err) {
            console.log("Done")
        });
    } catch (error) {
        console.error(error.message);
    }
};