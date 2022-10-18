const { Interaction } = require('discord.js')
const Discord = require('discord.js')
const Command = require('../Structure/Command')

module.exports = new Command({

  name: "ping",
  description: "Permet de connaitre la latence du bot",
  utilisation: "ping",
  permission: "Aucune",
  category: "<:DISCORD_ticket:963890159726755850> | Information",
  
  async run(bot,message, args, db) {

    const startTimedb = Date.now()

    db.query(`SELECT * FROM serveur WHERE guildID = ${message.guild.id}`, async (err, req) =>{
      
      const endTimedb = Date.now()

      const startTime = Date.now()
        await message.reply({content: `En cours...`, ephemeral: true}).then(async msg => {
          const endTime = Date.now()
      
          try {
            await msg.edit(`\`Latence du bot\` : ${endTime - startTime}ms\n\`Latence de l'API de Discord\` : ${bot.ws.ping}ms\n\`Latence de la base de données\`: ${endTimedb - startTimedb}ms`)
          } catch(err) {
            await message.editReply(`\`Latence du bot\` : ${endTime - startTime}ms\n\`Latence de l'API de Discord\` : ${bot.ws.ping}ms\n\`Latence de la base de données\`: ${endTimedb - startTimedb}ms`)
          }
        })
    })

    
  }
})