const Discord = require("discord.js")
const Command = require("../Structure/Command");
const { MessageEmbed } = require('discord.js');
const moment = require('moment');

const tick = '<:DISCORD_cross:963466511324950558>'
const cd = '<:DISCORD_check:963466510242832544>'
module.exports = {
	name: 'shop',
	description: "Permet d'envoyer l'embed du shop",
  category: "<:DISCORD_staff:963896942004412446> | Système",
	async run(bot, message, args, db) {



    db.query(`SELECT * FROM serveur WHERE guildID = ${message.guild.id} `, async (err,req) => {

      if(req[0].shop === 'on'){
            const btn = new Discord.MessageActionRow().addComponents(new Discord.MessageButton()
            .setStyle("PRIMARY")
            .setLabel("| Tape ta meilleure game")
            .setEmoji("🎮")
            .setCustomId("game12345"),  
            
            new Discord.MessageButton()
            .setStyle("PRIMARY")
            .setLabel("| Gagne une dédicace")
            .setEmoji("💬")
            .setCustomId("dedi12345"), 
            
        
            new Discord.MessageButton()
            .setStyle("PRIMARY")
            .setLabel("| Gagne un role sur le serveur")
            .setEmoji("🔰")
            .setCustomId("role12345"))
    
    
            const BASE = new MessageEmbed()
            .setColor(bot.color)
            .setTitle('🛒 __**Boutique du serveur **__ 🛒')
            .setAuthor({ name: 'Antskyyy Bot', iconURL: bot.user.displayAvatarURL({dynamic: true}), url: 'https://discord.gg/u8gsYrsg' })
            .setDescription(`Bienvenue dans la boutique du serveur !\nDans cette dernière tu pourras dépenser à foison tout ton argent 💳 ! \nAinsi , voici ce que signifie chaque bouton ci-dessous !\n\n<a:zAnim_Arrow_right:963464759078965248> 🎮 | Tape ta meilleure game avec Antskyyy !\n\n<a:zAnim_Arrow_right:963464759078965248> 💬 | Gagne une dédicace dans la prochaine vidéo <:zelenskykappa:971772701259731035>\n\n<a:zAnim_Arrow_right:963464759078965248> 🔰 | Gagne un role sur le serveur ( avec le nom que tu souhaite ! )`)
            .setThumbnail(`https://cdn.discordapp.com/avatars/${message.user.id}/${message.user.avatar}.png?size=256`)
            .setImage('https://i.imgur.com/L88HdKP.png')
            .setFooter({ text: 'Antskyyy Bot', iconURL: bot.user.displayAvatarURL({dynamic: true})}) 
    
            if(!message.member.permissions.has(new Discord.Permissions(Discord.Permissions.FLAGS.BAN_MEMBERS))) return message.reply({ content:"Vous n'avez pas la permission requise pour exécuter cette commande !", ephemeral: true})
            message.channel.send({embeds: [BASE], components: [btn]})
      } else {
        return message.reply({ content: "La boutique du serveur est désactivé", ephemeral: true })
      }
    })  
    
    

  }   
}