const Discord = require("discord.js")
const Command = require("../Structure/Command");
const { MessageEmbed } = require('discord.js');

module.exports = {
	name: 'remove',
	description: "Permet de retirer de l'argent à quelqu'un",
  category: "<:DISCORD_staff:963896942004412446> | Système",
	async run(bot, message, args, member) { 

    const db = bot.db;

    let user = message.user === undefined ? (message.mentions.users.first() || bot.users.cache.get(args[0])) : bot.users.cache.get(args._hoistedOptions[0].value)
    if(!user) return message.reply({ content: "Aucune personne trouvée !", ephemeral: true})

    if(!message.member.permissions.has(new Discord.Permissions(Discord.Permissions.FLAGS.ADMINISTRATOR))) return message.reply({ content:"Vous n'avez pas la permission requise pour exécuter cette commande !", ephemeral: true})

    let montant = message.user ? (args._hoistedOptions.length > 1 ? args._hoistedOptions[1].value : undefined) : args.slice(1).join(" ");
    if(!montant) return message.reply({content: "Veuillez définir le montant", ephemeral: true})
      
    db.query(`SELECT * FROM casino WHERE userID = ${user.id} AND guildID = ${message.guild.id}`, async (err,req) => {
      db.query(`UPDATE casino SET money = '${parseInt(req[0].money) - parseInt(montant)}' WHERE userID = ${user.id}`)


                const giveadmin = new MessageEmbed()
                giveadmin.setTitle("<a:DISCORD_money:965189345378181120> __**Remove argent**__ <a:DISCORD_money:965189345378181120>")
                giveadmin.setDescription(`<@${message.user.id}> à give ${montant}€ à <@${user.id}>`)

          
              db.query(`SELECT * FROM casino WHERE userID = ${user.id} AND guildID = ${message.guild.id}`, async (err, req) => {

                  giveadmin.setColor(bot.color)
                  giveadmin.setAuthor({ name: `Economie`, iconURL: `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png?size=256` })
                  giveadmin.addField(`Solde actuel du benéficiaire ${user.tag} :`, `${parseInt(req[0].money)}€`)
                  giveadmin.setThumbnail(message.user.displayAvatarURL({ dynamic: true }))
                  giveadmin.setTimestamp()
                  giveadmin.setFooter({ text: 'Antskyyy', iconURL: 'https://i.imgur.com/DIapvsK.jpg' })		
                  message.reply({embeds: [giveadmin], ephemeral: true});
                  bot.channels.cache.get('965297643444121690').send({ embeds: [giveadmin]  })
              })   
    })  
    
        	
    	
	}
}