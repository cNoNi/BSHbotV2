const intel =require("../../misc/intel")

module.exports = async (message, instance) => {
    const cytaty_id = 926108266352754708
    //const cytaty_id = 923343591437398036
    if(message.channelId=cytaty_id){
        await intel.newQuote(message.content,message.author.id)
    }

};
