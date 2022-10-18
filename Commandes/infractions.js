const Discord = require("discord.js")
const Command = require("../Structure/Command")
const { MessageEmbed } = require('discord.js')
const date = require('date-and-time');

module.exports = new Command({

    name: "infractions",
    description: "Permet de voir les infractions d'une personne",
    utilisation: "[membre]",
    alias: ["infractions", "infraction"],
    permission: Discord.Permissions.FLAGS.MANAGE_MESSAGES,
    category: "<:DISCORD_shield:963891927797870672> | Modération",
    
    async run(bot, message, args, db, member) {

      let user = message.user === undefined ? (message.mentions.users.first() || bot.users.cache.get(args[0])) : bot.users.cache.get(args._hoistedOptions[0].value)
      if(!user) return message.reply({ content: "Aucune personne trouvée !", ephemeral: true})
      
      if(!message.member.permissions.has(new Discord.Permissions(Discord.Permissions.FLAGS.MANAGE_MESSAGES))) return message.reply({ content:"Vous n'avez pas la permission requise pour exécuter cette commande !", ephemeral: true})

      db.query(`SELECT * FROM infractions WHERE userID = ${user.id}`, async (err, req) => {
        let i = 0
        
        if(req.length < 1){
            return message.reply({content: "Cet utilisateur n'est pas enregistré !", ephemeral: true })
        }
        
        if(parseInt(req[i].bans) <= 0) {
          req[i].bans = "`Aucun 🤏`"
        } 
        if(parseInt(req[i].mutes) <= 0) {
          req[i].mutes = "`Aucun 🤏`"
        } 
        if(parseInt(req[i].warns) <= 0) {
          req[i].warns = "`Aucun 🤏`"
        } 
          const infraction = new MessageEmbed()
          .setColor(bot.color)
          .setTitle("__**📃 Infractions 📃**__")
          .setURL('https://discord.gg/u8gsYrsg')

          .setAuthor({ name: 'Antskyyy Bot', iconURL: 'https://i.imgur.com/DIapvsK.jpg', url: 'https://discord.gg/u8gsYrsg' })
          .setThumbnail(`https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png?size=256`)
          
          .setImage(`https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png?size=256`)
          .addFields(
            { name: `- **Bans** de ce joueur :`, value: "`" + `${req[i].bans}` + "`" },
            { name: `- **Kicks** de ce joueur :`, value: "`" + `${req[i].kicks}` + "`"  },
            { name: `- **Warns** de ce joueur :`, value: "`" +  `${req[i].warns}` + "`"},
            { name: `- **Mutes** de ce joueur :`, value: "`" + `${req[i].mutes}` + "`"}
          )
          .setDescription("__**Voici les infractions enregistrées de <@" + `${user.id}` + ">**__")
          .setTimestamp()
          .setFooter({ text: 'Antskyyy Bot', iconURL: 'https://i.imgur.com/DIapvsK.jpg' })
          
          message.reply({ embeds: [infraction], ephemeral: true  })
      })
    }  
})    