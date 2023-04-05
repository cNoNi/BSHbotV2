const { Client, IntentsBitField, Partials, ActivityType } = require("discord.js");
const path = require("path");
const WOK = require("wokcommands");
require("dotenv/config");

const client = new Client({
  intents: [
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.DirectMessages,
    IntentsBitField.Flags.MessageContent,
  ],
  partials: [Partials.Channel],
});

client.on("ready", () => {
  console.log("The bot is ready");
  client.user.setActivity('/help', { type: ActivityType.Playing });
  new WOK({
    client,
    mongoUri: process.env.MONGO_URI || "",
    commandsDir: path.join(__dirname, "commands"),
    events: {
      // Where the events are stored
      dir: path.join(__dirname, "events"),
    },
  });
});

client.login(process.env.TOKEN);