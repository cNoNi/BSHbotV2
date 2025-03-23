const { random } = require('chance-percent');
const { CommandType } = require("wokcommands");
const { PermissionFlagsBits,  ApplicationCommandOptionType } = require("discord.js");
const { EmbedBuilder } = require('discord.js');
const {createHash} = require('crypto')

module.exports = {
    name: "chance",
    description: "?",
    type: CommandType.SLASH,
    guildOnly: true,
    permissions: [PermissionFlagsBits.Administrator],
    callback: ({interaction}) => {
        function getH(){
            function getRandomInt(min, max) {
                min = Math.ceil(min);
                max = Math.floor(max);
                return Math.floor(Math.random() * (max - min)) + min;
            }
            function makeid(length) {
                let result = '';
                const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
                const charactersLength = characters.length;
                let counter = 0;
                while (counter < length) {
                  result += characters.charAt(Math.floor(Math.random() * charactersLength));
                  counter += 1;
                }
                return result;
            }
            return createHash('sha256')
            .update(makeid(getRandomInt(3,12)))
            .update(createHash("sha256")
            .update(makeid(getRandomInt(3,12), 'utf-8'))
            .digest('hex'))
            .digest('hex')
        }

        const options = [
            {value: 1, percentage: 50},
            {value: 2, percentage: 30},
            {value: 3, percentage: 20},
        ]
        const value = random(options);

        const res = getH();
      //console.log(res)
        const shit = []
        for (let i = 0; i < 4*4; i=i+4) {
          //console.log(i)
            shit.push(`#${res[i]+res[i++]+res[i+2]+res[i+3]}`)
            
        }
        //console.log(shit)
        const embed = new EmbedBuilder()
        .setTitle("Chest")
        .addFields(
            {name: "result", value: res}
            )
        return {content: interaction.reply(value.toString())}
    }}
