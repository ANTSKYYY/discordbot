const Discord = require('discord.js');
const superagent = require('superagent');
const Command = require("../Structure/Command")


module.exports = new Command({

    name: "calin",
    description: "Permet de diffuser de l'amour autour de soi",
    utilisation: "calin",
    category: "<a:DISCORD_jeux:965003658343362641> | Fun",

    
    async run(bot, message, args, db) {
        let user = message.user === undefined ? (message.mentions.users.first() || bot.users.cache.get(args[0])) : bot.users.cache.get(args._hoistedOptions[0].value)
        if(!user) return message.reply({ content: "Aucune personne trouvée !", ephemeral: true})
        const { body } = await superagent
        .get("https://nekos.life/api/v2/img/hug");
    
        if (user) { const 
            embed = new Discord.MessageEmbed()
                .setColor(bot.color)
                .setFooter({ text: 'Antskyyy Bot', iconURL: 'https://i.imgur.com/DIapvsK.jpg' })	
                .setAuthor({ name: `Antskyyy Bot`, iconURL: `https://i.imgur.com/DIapvsK.jpg` })	
                .setTitle(`__**Calins**__`)
                .setDescription(`**<@${message.user.id}>** fait un calin à **<@${user.id}>** !`)
                .setThumbnail(message.user.displayAvatarURL({ dynamic: true }))
                .setImage(body.url) 
        message.reply({embeds: [embed]})
        } else message.reply(`Tu dois mentionner quelqu'un !`)
    }

})

