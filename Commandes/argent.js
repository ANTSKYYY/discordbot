const Discord = require("discord.js")
const Command = require("../Structure/Command");
const { MessageEmbed } = require('discord.js');

module.exports = {
	name: 'argent',
	description: "Permet de voir combien d'argent on possède",
  category: "<:DISCORD_casino:965186012919791627> | Casino",
	async run(bot, message, args, member) { 

    const db = bot.db;

    let user = message.user === undefined ? (message.mentions.users.first() || bot.users.cache.get(args[0])) : (args._hoistedOptions.length === 0 ? message.user : bot.users.cache.get(args._hoistedOptions[0].value))
        if(!user) user = message.author;

    db.query(`SELECT * FROM casino WHERE userID = ${user.id} AND guildID = ${message.guild.id}`, async (err,req) => {
    		  const argent = new MessageEmbed()
					.setTitle("<a:DISCORD_money:965189345378181120> __**Economie**__ <a:DISCORD_money:965189345378181120>")
          .addFields(
            {name: "Voici le solde :", value: `${req[0].money}€`}
          )
        	.setColor(bot.color)
					.setAuthor({ name: `Solde de ${user.tag}`, iconURL: `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png?size=256`})
					
          .setThumbnail(user.displayAvatarURL({dynamic: true}))
					.setTimestamp()
        	.setFooter({ text: 'Antskyyy Bot', iconURL: 'https://i.imgur.com/DIapvsK.jpg' })
        	
    	message.reply({embeds: [argent]});
          
    })  
	}
}