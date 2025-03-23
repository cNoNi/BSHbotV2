const pool = require("./database")
module.exports.userJoined = async (user_id) => {
    try {
        await pool.query("INSERT INTO vc_joins (user_id) VALUES ($1) ON CONFLICT (user_id,joined_date) DO NOTHING;",[user_id])
    } catch (error) {
        console.log("Error with db: insert into vc_joins.")
    }
}

module.exports.userCameraOn = async (user_id) => {
    try {
        await pool.query("INSERT INTO camera_toggles (user_id) VALUES ($1) ON CONFLICT (user_id, toggle_date) DO UPDATE SET toggle_count = camera_toggles.toggle_count + 1;",[user_id])
    } catch (error) {
        console.log("Error with db: insert into camera_toggles.")
    }
}

module.exports.userServerMuted = async (user_id) => {
    try {
        await pool.query("INSERT INTO vc_server_muted (user_id) VALUES ($1) ON CONFLICT (user_id, mute_date) DO UPDATE SET mute_count = vc_server_muted.mute_count + 1;",[user_id])
    } catch (error) {
        console.log("Error with db: insert into vc_server_muted.")
    }
}

module.exports.userStreamOn = async (user_id) => {
    try {
        await pool.query("INSERT INTO stream_toggles (user_id) VALUES ($1) ON CONFLICT (user_id, stream_date) DO UPDATE SET stream_count = stream_toggles.stream_count + 1;",[user_id])
    } catch (error) {
        console.log("Error with db: insert into stream_toggles.")
    }
}

module.exports.userTime = async (user_id,time) => {
    try {
        await pool.query("INSERT INTO vc_time_spent (user_id,time_count) VALUES ($1,$2) ON CONFLICT (user_id, time_date) DO UPDATE SET time_count = vc_time_spent.time_count + $2;",[user_id,Math.round(time)])
    } catch (error) {
        console.log("Error with db: insert into vc_time_spent.")
    }
}