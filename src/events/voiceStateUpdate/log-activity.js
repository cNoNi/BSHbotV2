const intel = require("../../misc/intel")

const afkChannelId = 923305310171586690n

const activeUsers = new Map();

module.exports = async (oldMember, newMember) => {
    //Clasify what exactly changed

    const userId = newMember.id;
    const now = Date.now();

    //  Check if user changed channel
    if(oldMember.channelId!=newMember.channelId){
        //  Check if user joined channel
        if(oldMember.channelId === null && newMember.channelId !== null) {
            //console.log(newMember.id + " joined channel")
            await intel.userJoined(newMember.id)
            activeUsers.set(userId,now)
            return
        }
        //  Check if user left channel
        if(oldMember.channelId !== null && newMember.channelId === null) {
            //console.log(newMember.id + " left channel")
            if(oldMember.selfDeaf||oldMember.selfMute) return
            //  Get time in seconds
            const time = (now - activeUsers.get(userId))/1000
            await intel.userTime(userId,time)
            activeUsers.delete(userId)
            //Log this info
            return
        }

        //  Check if user left afk
        if(oldMember.channelId === afkChannelId && newMember.channelId !== oldMember.channelId && newMember.channelId!==null) {
            //console.log(newMember.id + " left afk.")
            //Log this info
            activeUsers.set(userId,now)
            return
        }

        //  Check if user joined afk
        if(newMember.channelId === afkChannelId && newMember.channelId !== oldMember.channelId) {
            //console.log(newMember.id + " joined afk.")
            //Log this info
            const time = (now - activeUsers.get(userId))/1000
            await intel.userTime(userId,time)
            activeUsers.delete(userId)
            return
        }

        //console.log(oldMember.id + " changed channel.")
    }

    //  Check mute state
    if(oldMember.selfDeaf != newMember.selfDeaf || oldMember.selfMute != newMember.selfMute){
        if(newMember.selfDeaf || newMember.selfMute) {
            //console.log(newMember.id +" tafk")
            const time = (now - activeUsers.get(userId))/1000
            await intel.userTime(userId,time)
            activeUsers.delete(userId)
            return
        }
        //console.log(newMember.id +" back from tafk")
        activeUsers.set(userId,now)
        return
    }

    //  Check stream state
    if(oldMember.streaming != newMember.streaming && newMember.streaming){
        //console.log(newMember.id + " started stream")
        await intel.userStreamOn(userId)
        return
    }

    //  Check if user turned on camera
    if(oldMember.selfVideo != newMember.selfVideo && newMember.selfVideo){
        intel.userCameraOn(newMember.id)
        return
    }

    //  Check if user's mute state changed
    if((!oldMember.serverDeaf && oldMember.serverDeaf != newMember.serverDeaf) || (!oldMember.serverMute && oldMember.serverMute != newMember.serverMute)){
        //console.log(newMember.id +" has been muted")
        intel.userServerMuted(newMember.id)
        return
    }
};