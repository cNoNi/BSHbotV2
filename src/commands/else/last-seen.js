const { EmbedBuilder, ApplicationCommandOptionType, userMention } = require('discord.js');
const { CommandType } = require("wokcommands");
const intel = require("../../misc/intel");
const {formatDistanceStrict} = require("date-fns")
const {pl} = require("date-fns/locale")
module.exports = {
  name: "last-seen",
  description: "Sprawdza kiedy użytkownik był ostatni raz na kanale. Wartość orientacyjna",
  guildOnly: true,
  type: CommandType.SLASH,
  minArgs: 1,
  maxArgs:1,
  options: [
    {
        name:"uzytkownik",
        required: true,
        description: "Kogo sprawdzic",
        type: ApplicationCommandOptionType.User,
    },
  ],
  callback: async ({interaction}) => {
    const target = interaction.options.getUser("uzytkownik")
    const targetId = target.id

    const date = new Date

    const embed = new EmbedBuilder()
    .setTitle("Ostatnio online")

    const lastOnlineTimestamp = await intel.lastOnline(targetId)

    if(isNaN(lastOnlineTimestamp)){
      embed.setDescription(`${target} byl ostatnio widziany chuj wie ile temu.`)
    } else{
      const dist = formatDistanceStrict(lastOnlineTimestamp,date,{locale: pl})
      embed.setDescription(`${target} byl ostatnio online ${dist} temu.`)
    }
    interaction.reply({embeds: [embed]})
  }}