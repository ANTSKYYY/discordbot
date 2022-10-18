const Discord = require('discord.js');
const srp = require('somerandompackage');
const Command = require('../Structure/Command')

module.exports = new Command({
  name: "jojo",
    description: "Cette commande est une jojo ref ?",
    utilisation: "jojo",
    category: "<a:DISCORD_jeux:965003658343362641> | Fun",

    async run(bot,message, args, db) {

      
                var jojos = await srp.jojo();
            
                const embed = new Discord.MessageEmbed()
                .setImage(jojos)
                .setColor(bot.color)
                return message.reply({embeds: [embed]})

    }  
})      


