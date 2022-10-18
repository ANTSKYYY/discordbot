const Discord = require("discord.js")
const Command = require("../Structure/Command");
const { MessageEmbed } = require('discord.js');
const { set } = require("quick.db");

module.exports = {
	name: 'avatar',
	description: "Envoie l'avatar de l'auteur ou de la personne mentionné",
  category: "<:DISCORD_ticket:963890159726755850> | Information",
	async run(bot, message, args) { 
		let user;
		if(message.user ? args._hoistedOptions.length >= 1 : args.length >= 1) {
				user = message.user ? await bot.users.fetch(args._hoistedOptions[0].value) : (message.mentions.users.first() || await bot.users.fetch(args[0]))
				if(!user) return message.reply("Aucune personne trouvée !")
		} else user = message.user ? message.user : message.author;
      
    		  const avatarEmbed = new MessageEmbed()
					.setTitle("Voici l'avatar ! ")

        	.setColor(bot.color)
					.setAuthor({ name: 'Antskyyy Bot', iconURL: 'https://i.imgur.com/DIapvsK.jpg', url: 'https://discord.gg/u8gsYrsg' })
					
          .setImage(user.displayAvatarURL({dynamic: true}))
					.setTimestamp()
        	.setFooter({ text: 'Antskyyy Bot', iconURL: 'https://i.imgur.com/DIapvsK.jpg' })
        	
    	message.reply({embeds: [avatarEmbed]});
	}
}