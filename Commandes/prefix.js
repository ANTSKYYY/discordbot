const Discord = require('discord.js')
const Command = require('../Structure/Command')

module.exports = new Command({

  name: "prefix",
  description: "Permet de changer le prefix du bot",
  utilisation: "prefix",
  permission: Discord.Permissions.FLAGS.ADMINISTRATOR,
  category: "<:DISCORD_staff:963896942004412446> | Système",
  
  async run(bot,message, args, db) {
    
    db.query(`SELECT * FROM serveur WHERE guildID = ${message.guild.id}`, async (err, req) => {


      try {

        let prefix = args[0] || args._hoistedOptions[0].value 
        if(!message.member.permissions.has(new Discord.Permissions(Discord.Permissions.FLAGS.ADMINISTRATOR))) return message.reply({ content:"Vous n'avez pas la permission requise pour exécuter cette commande !", ephemeral: true})
        if(!prefix) {
          message.delete()
          return message.channel.send({ content: "❌ Veuillez indiquer un préfix !", ephemeral:true}).then(async mess => setTimeout(async () => {mess.delete()}, 3000))
        }
        const ancienprefix = req[0].prefix;

        db.query(`UPDATE serveur SET prefix = '${prefix}' WHERE guildID = ${message.guild.id}`)

        message.reply({content: `✅ Prefix bien changé de \`${ancienprefix}\` à \`${prefix}\` ! `,  ephemeral: true})
      } catch (err) {
        message.delete()
        return message.channel.send({ content: "❌ Veuillez indiquer un préfix !", ephemeral:true}).then(async mess => setTimeout(async () => {mess.delete()}, 3000))

      }
    })
  }
})