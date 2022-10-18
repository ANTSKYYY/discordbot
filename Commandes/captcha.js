const Discord = require('discord.js')
const Command = require('../Structure/Command')


module.exports = new Command({

  name: "captcha",
  description: "Permet d'activer ou non le captcha",
  utilisation: "captcha",
  permission: Discord.Permissions.FLAGS.ADMINISTRATOR,
  category: "<:DISCORD_staff:963896942004412446> | Système",

  async run(bot, message, args, db) {


    db.query(`SELECT * FROM serveur WHERE guildID = ${message.guild.id}`, async (err, req) => {
      if(!message.member.permissions.has(new Discord.Permissions(Discord.Permissions.FLAGS.ADMINISTRATOR))) return message.reply({ content:"Vous n'avez pas la permission requise pour exécuter cette commande !", ephemeral: true})    
      if(req.length < 1) return;


      let choice = message.user ? args._hoistedOptions[0].value : args[0]
      let channel = message.user ? args._hoistedOptions[1].value : args[1]
        

      if(choice === "on" && req[0].captcha === "off") {
        db.query(`UPDATE serveur SET captcha_channel = ${channel} WHERE guildID = ${message.guild.id}`)
        message.reply({content: "Le captcha à été activé dans le salon : <#" + `${channel}>`, ephemeral: true})
        db.query(`UPDATE serveur SET captcha = 'on' WHERE guildID = ${message.guild.id}`) 
      } else if(choice === "on" && req[0].captcha === "on") {
        message.reply({content: "Le captcha est déja activé ! ", ephemeral: true})
      } else if (choice === "off" && req[0].captcha === "on"){
        message.reply({content: "Le captcha à bien été désactivé", ephemeral: true})
        db.query(`UPDATE serveur SET captcha = 'off' WHERE guildID = ${message.guild.id}`) 
        db.query(`UPDATE serveur SET captcha_channel = '' WHERE guildID = ${message.guild.id}`) 
      } else if (choice === "off" && req[0].captcha === "off"){
        message.reply({content: "Le captcha est déja désactivé ! ", ephemeral: true})
      }


      

    })
  }
})