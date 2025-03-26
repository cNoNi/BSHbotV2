const { Pool } = require("pg");
require("dotenv/config");

const pool = new Pool({
  user: process.env.PG_USER,
  host: process.env.PG_HOST,
  database: process.env.PG_DATABASE,
  password: process.env.PG_PASSWORD,
  port: process.env.PG_PORT,
});

pool.connect()
    .then(async () => {
        console.log("Connected to PostgreSQL")
        //  Create tables if not exists
        await pool.query("CREATE TABLE IF NOT EXISTS vc_joins (id SERIAL PRIMARY KEY,user_id BIGINT NOT NULL,joined_at TIMESTAMP NOT NULL DEFAULT NOW(),joined_date DATE GENERATED ALWAYS AS (joined_at::DATE) STORED,UNIQUE (user_id, joined_date));")
        await pool.query("CREATE TABLE IF NOT EXISTS camera_toggles (user_id BIGINT NOT NULL,toggle_date DATE NOT NULL DEFAULT CURRENT_DATE,toggle_count INTEGER NOT NULL DEFAULT 1,PRIMARY KEY (user_id, toggle_date));")
        await pool.query("CREATE TABLE IF NOT EXISTS vc_server_muted (user_id BIGINT NOT NULL,mute_date DATE NOT NULL DEFAULT CURRENT_DATE,mute_count INTEGER NOT NULL DEFAULT 1,PRIMARY KEY (user_id, mute_date));")
        await pool.query("CREATE TABLE IF NOT EXISTS stream_toggles (user_id BIGINT NOT NULL,stream_date DATE NOT NULL DEFAULT CURRENT_DATE,stream_count INTEGER NOT NULL DEFAULT 1,PRIMARY KEY (user_id, stream_date));")
        await pool.query("CREATE TABLE IF NOT EXISTS vc_time_spent (user_id BIGINT NOT NULL,time_date DATE NOT NULL DEFAULT CURRENT_DATE,time_count INTEGER NOT NULL DEFAULT 0,PRIMARY KEY (user_id, time_date));")
        await pool.query("create table if not exists quotes (content text not null,author bigint not null,archive_date date not null default current_date);")
    }).catch(err => console.error("PostgreSQL connection error:", err));

module.exports = pool;
