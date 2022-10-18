const Discord = require("discord.js")
const Command = require("../Structure/Command");
const { MessageEmbed } = require('discord.js');

module.exports = {
	name: 'give',
	description: "Permet de donner de ton argent à un autre joueur",
  category: "<:DISCORD_casino:965186012919791627> | Casino",
	async run(bot, message, args, member) { 

    const db = bot.db;
		
			let user = message.user === undefined ? (message.mentions.users.first() || bot.users.cache.get(args[0])) : bot.users.cache.get(args._hoistedOptions[0].value)
			if(!user) return message.reply({ content: "Aucune personne trouvée !", ephemeral: true})
			
			let montant = message.user ? (args._hoistedOptions.length > 1 ? args._hoistedOptions[1].value : undefined) : args.slice(1).join(" ");
			if(isNaN(montant)) return message.reply({content: "Vous devez entrer uniquement des chiffres ou nombres", ephemeral: true})
			if(!montant) return message.reply({content: "Veuillez définir le montant", ephemeral: true})
			db.query(`SELECT * FROM casino WHERE userID = ${message.user.id} AND guildID = ${message.guild.id}`, async (err,req) => {
				if(parseInt(req[0].money) < parseInt(montant)) {
					
						return message.reply({content: "Vous n'avez pas assès d'argent !", ephemeral: true})
				} else {
					db.query(`SELECT * FROM casino WHERE userID = ${message.user.id} AND guildID = ${message.guild.id}`, async (err,req) => {
							db.query(`UPDATE casino SET money = '${parseInt(req[0].money) - parseInt(montant)}' WHERE userID = ${message.user.id}`)
							db.query(`SELECT * FROM casino WHERE userID = ${user.id} AND guildID = ${message.guild.id}`, async (err,req) => {
								db.query(`UPDATE casino SET money = '${parseInt(req[0].money) + parseInt(montant)}' WHERE userID = ${user.id}`)
							})	
						})
				}				
			})

			const give = new MessageEmbed()



        give.setTitle("<a:DISCORD_money:965189345378181120> __**Virement**__ <a:DISCORD_money:965189345378181120>")
        give.setDescription(`<@${message.user.id}> à donné ${montant}€ à <@${user.id}>`)

        
            db.query(`SELECT * FROM casino WHERE userID = ${user.id} AND guildID = ${message.guild.id}`, async (err, req) => {

                give.setColor(bot.color)
                give.setAuthor({ name: `Economie`, iconURL: `https://cdn.discordapp.com/avatars/${message.user.id}/${message.user.avatar}.png?size=256` })
                give.addField(`Solde actuel du benéficiaire ${user.tag} :`, `${parseInt(req[0].money) + parseInt(montant)}€`)
                give.setThumbnail(message.user.displayAvatarURL({ dynamic: true }))
                give.setTimestamp()
                give.setFooter({ text: 'Antskyyy', iconURL: 'https://i.imgur.com/DIapvsK.jpg' })				

			message.reply({embeds: [give]});
			bot.channels.cache.get('965297643444121690').send({ embeds: [give]  })
			})
									
								
        	
    
						
						
					
				
				

			 
	

		

	
        	
    
	}
}