const Discord = require('discord.js')
const Event = require("../../Structure/Event")
const { MessageEmbed } = require("discord.js");
module.exports = new Event("messageCreate", async (bot, message) => {
  
  if(message.author.bot)return;

  if(message.channel.type === "DM") {
      return message.reply({content: "Hé commence même pas à forcer en MP batard !"}) 
  }
  const db = bot.db;

  

  db.query(`SELECT * FROM blacklist WHERE guildID = ?`, [message.guild.id], async (err, req) => {
    const blacklist = new MessageEmbed()
    .setTitle('<:7936discordstaff:963540123838984283> __Attention__ <:7936discordstaff:963540123838984283>')
    .setAuthor({ name: `Antskyyy Bot`, iconURL: `https://i.imgur.com/DIapvsK.jpg` })
    .setDescription('Tu viens d\'utiliser un mot figurant dans la liste des mots blacklist !\nTu dois faire attention a ton langage.\n\nPour connaitre la liste des mots blacklist tape la commande ``blacklistliste`` dans un salon')
    .setThumbnail(`https://cdn.discordapp.com/avatars/${message.author.id}/${message.author.avatar}.png?size=256`)
    .setTimestamp()
    .setFooter({ text: 'Antskyyy Bot', iconURL: 'https://i.imgur.com/DIapvsK.jpg' })
    .setColor(bot.color)

    const words = req.map(r => r.word)

    for (let i=0; i < req.length; i++){
      if (message.content.toLowerCase().includes(req[i].word) || message.content.toUpperCase().includes(req[0].word)) {
          message.delete()
          message.author.send({embeds: [blacklist]})
      }
    }  
})
  
  

 
  if(message.content.endsWith('quoi')) {
    message.react('963540586302947388')
    message.react('963540586298757190')
    message.react('963540587171160064')
    message.react('963540586646884437')

  } else if(message.content.endsWith('Quoi')) {
    message.react('963540586302947388')
    message.react('963540586298757190')
    message.react('963540587171160064')
    message.react('963540586646884437')

  } else if(message.content.endsWith('Quoi ?!!')) {
    message.react('963540586302947388')
    message.react('963540586298757190')
    message.react('963540587171160064')
    message.react('963540586646884437')

  } else if(message.content.endsWith('QUOI ?')) {
    message.react('963540586302947388')
    message.react('963540586298757190')
    message.react('963540587171160064')
    message.react('963540586646884437')

  } else if(message.content.endsWith('quoi ?')) {
    message.react('963540586302947388')
    message.react('963540586298757190')
    message.react('963540587171160064')
    message.react('963540586646884437')

  } else if(message.content.endsWith('Quoi ?')) {
    message.react('963540586302947388')
    message.react('963540586298757190')
    message.react('963540587171160064')
    message.react('963540586646884437')

  } else if(message.content.endsWith('oui')) {
    message.react('963540586302947388')
    message.react('963540585996767312')

  } else if(message.content.endsWith('non')) {
    message.react('963540585862553611')
    message.react('963540586646884437')
    message.react('963540585996767312')
    message.react('963540586730778695')

  }
 
  db.query(`SELECT * FROM serveur WHERE guildID = ${message.guild.id}`, async (err,req) => {


    if(req.length < 1) {
      let sql = `INSERT INTO serveur (guildID, prefix, captcha, raid) VALUES (${message.guild.id}, '!', 'off', 'off')`
      db.query(sql, function(err) {
        if(err) throw err;
      })

      return message.reply("Attendez que le bot enregistre votre serveur ...")
    }
    
      
    let prefix = req[0].prefix
    let messageArray = message.content.split(" ");
    let command = messageArray[0];
    let args = messageArray.slice(1);
  
    let commandFile = bot.commands.get(command.slice(prefix.length)) 
  
    await bot.function.searchLinks(message)
    await bot.function.searchMentions(message)
    
    db.query(`SELECT * FROM user WHERE userID = ${message.author.id}`, async (err, req) => {

            if(req.length < 1) {

                let sql = `INSERT INTO user (userID, xp, level) VALUES (${message.author.id}, '0', '0')`
                db.query(sql, function(err) {
                    if(err) throw err;
                })

            } else {

                if(!message.content.startsWith(prefix)) {

                    let xp = Math.floor(Math.random() * 24) + 1;
                    let need = (parseInt(req[0].level) + 1) * 1000;

                    db.query(`UPDATE user SET xp = '${parseInt(req[0].xp) + xp}' WHERE userID = ${message.author.id}`)

                    if(parseInt(req[0].xp) >= need) {

                        db.query(`UPDATE user SET level = '${parseInt(req[0].level) + 1}' WHERE userID = ${message.author.id}`)
                        db.query(`UPDATE user SET xp = '${parseInt(req[0].xp) - need}' WHERE userID = ${message.author.id}`)
                        
						if(parseInt(req[0].xp) >= 5000 && parseInt(req[0].level) === 4 ) {
                            let channel2 = bot.channels.cache.get("962730512248610966")
                            let padarole = channel2.guild.roles.cache.get("929130432623165520")
                            let ancienrole = channel2.guild.roles.cache.get('929131018533879808')
                            message.member.roles.add(padarole.id)
                           message.author.send(`WOW Bravo ${message.author}, tu es **passé** niveau 5 ! tu obtiens le rôle **🗡| Jeune padawan** ! 🎇🎈 `)
                        } else if(parseInt(req[0].xp) >= 10000 && parseInt(req[0].level) === 9 ) {
                            let channel2 = bot.channels.cache.get("962730512248610966")
                            let padarole = channel2.guild.roles.cache.get("929130432623165520")
                            let ancienrole = channel2.guild.roles.cache.get('929131018533879808')
                            message.member.roles.add(ancienrole.id)
                            message.member.roles.remove(padarole.id)
                           message.author.send(`INCROYABLE !!! GG ${message.author}, tu es **passé** niveau 10 ! tu obtiens le rôle **🧙‍♂️| L'ancien du village** ! 🎁 Tu fait partie des __pionniers__ du serveur **maintenant** ! 🎊🥳`)
                        } else {
                        	message.author.send(`🎉🎊 Bravo ${message.author}, tu es **passé** niveau \`${parseInt(req[0].level) + 1}\``)
                        }    
                    }

                    if(parseInt(req[0].xp) < 0) {

                        db.query(`UPDATE user SET level = '${parseInt(req[0].level) - 1}' WHERE userID = ${message.author.id}`)
                        db.query(`UPDATE user SET xp = '${(parseInt(req[0].level) * 1000) + parseInt(req[0].xp)}' WHERE userID = ${message.author.id}`)

                        message.author.send(`😭 Dommage ${message.author}, tu es **redescendu** niveau \`${parseInt(req[0].level) - 1}\``)
                    }
                   
                    
                       
                }
            }
    })


    if(message.content.startsWith(`!ban`)) return message.author.send(`❌ Cette commande n'existe pas !\nTeste plutôt ` + "`/ban`"), message.delete()
    if(message.content.startsWith(`!blacklist`)) return message.author.send(`❌ Cette commande n'existe pas !\nTeste plutôt ` + "`/blacklist`"), message.delete()
    if(message.content.startsWith(`!blacklistliste`)) return message.author.send(`❌ Cette commande n'existe pas !\nTeste plutôt ` + "`/blacklistliste`"), message.delete()
    if(message.content.startsWith(`!machineasous`)) return message.author.send(`❌ Cette commande n'existe pas !\nTeste plutôt ` + "`/machineasous`"), message.delete()
    if(message.content.startsWith(`!unban`)) return message.author.send(`❌ Cette commande n'existe pas !\nTeste plutôt ` +  "`/unban`"), message.delete()
    if(message.content.startsWith(`!stop`)) return message.author.send(`❌ Cette commande n'existe pas !\nTeste plutôt ` +  "`/stop`"), message.delete()
    if(message.content.startsWith(`!restart`)) return message.author.send(`❌ Cette commande n'existe pas !\nTeste plutôt ` +  "`/restart`"), message.delete()
    if(message.content.startsWith(`!captcha`)) return message.author.send(`❌ Cette commande n'existe pas !\nTeste plutôt ` +  "`/captcha`"), message.delete()
    if(message.content.startsWith(`!leaderboard`)) return message.author.send(`❌ Cette commande n'existe pas !\nTeste plutôt ` +  "`/leaderboard`"), message.delete()
    if(message.content.startsWith(`!clear`)) return message.author.send(`❌ Cette commande n'existe pas !\nTeste plutôt ` +  "`/clear`"), message.delete()
    if(message.content.startsWith(`!rank`)) return message.author.send(`❌ Cette commande n'existe pas !\nTeste plutôt ` +  "`/rank`"), message.delete()
    if(message.content.startsWith(`!kick`)) return message.author.send(`❌ Cette commande n'existe pas !\nTeste plutôt ` +  "`/kick`"), message.delete()
    if(message.content.startsWith(`!prefix`)) return message.author.send(`❌ Cette commande n'existe pas !\nTeste plutôt ` +  "`/prefix`"), message.delete()
    if(message.content.startsWith(`!infractions`)) return message.author.send(`❌ Cette commande n'existe pas !\nTeste plutôt ` +  "`/infractions`"), message.delete()
    if(message.content.startsWith(`!serverinfo`)) return message.author.send(`❌ Cette commande n'existe pas !\nTeste plutôt ` +  "`/serverinfo`"), message.delete()
    if(message.content.startsWith(`!start`)) return message.author.send(`❌ Cette commande n'existe pas !\nTeste plutôt ` +  "`/start`"), message.delete()
    if(message.content.startsWith(`!ticket`)) return message.author.send(`❌ Cette commande n'existe pas !\nTeste plutôt ` +  "`/ticket`"), message.delete()
    if(message.content.startsWith(`!warn`)) return message.author.send(`❌ Cette commande n'existe pas !\nTeste plutôt ` +  "`/warn`"), message.delete()
    if(message.content.startsWith(`!userinfo`)) return message.author.send(`❌ Cette commande n'existe pas !\nTeste plutôt ` +  "`/userinfo`"), message.delete()
    if(message.content.startsWith(`!mute`)) return message.author.send(`❌ Cette commande n'existe pas !\nTeste plutôt ` +  "`/mute`"), message.delete()
    if(message.content.startsWith(`!unmute`)) return message.author.send(`❌ Cette commande n'existe pas !\nTeste plutôt ` +  "`/unmute`"), message.delete()
    if(message.content.startsWith(`!help`)) return message.author.send(`❌ Cette commande n'existe pas !\nTeste plutôt ` +  "`/help`"), message.delete()
    if(message.content.startsWith(`!8ball`)) return message.author.send(`❌ Cette commande n'existe pas !\nTeste plutôt ` +  "`/8ball`"), message.delete()
    if(message.content.startsWith(`!rouletterusse`)) return message.author.send(`❌ Cette commande n'existe pas !\nTeste plutôt ` +  "`/rouletterusse`"), message.delete()
    if(message.content.startsWith(`!roulette`)) return message.author.send(`❌ Cette commande n'existe pas !\nTeste plutôt ` +  "`/roulette`"), message.delete()
    if(message.content.startsWith(`!role`)) return message.author.send(`❌ Cette commande n'existe pas !\nTeste plutôt ` +  "`/role`"), message.delete()
    if(message.content.startsWith(`!rule`)) return message.author.send(`❌ Cette commande n'existe pas !\nTeste plutôt ` +  "`/rule`"), message.delete()
    if(message.content.startsWith(`!argent`)) return message.author.send(`❌ Cette commande n'existe pas !\nTeste plutôt ` +  "`/argent`"), message.delete()
    if(message.content.startsWith(`!give`)) return message.author.send(`❌ Cette commande n'existe pas !\nTeste plutôt ` +  "`/give`"), message.delete()
    if(message.content.startsWith(`!giveadmin`)) return message.author.send(`❌ Cette commande n'existe pas !\nTeste plutôt ` +  "`/giveadmin`"), message.delete()
    if(message.content.startsWith(`!calin`)) return message.author.send(`❌ Cette commande n'existe pas !\nTeste plutôt ` +  "`/calin`"), message.delete()
    if(message.content.startsWith(`!jojo`)) return message.author.send(`❌ Cette commande n'existe pas !\nTeste plutôt ` +  "`/jojo`"), message.delete()
    if(message.content.startsWith(`!admin`)) return message.author.send(`❌ Cette commande n'existe pas !\nTeste plutôt ` +  "`/admin`"), message.delete()
    if(message.content.startsWith(`!avatar`)) return message.author.send(`❌ Cette commande n'existe pas !\nTeste plutôt ` +  "`/avatar`"), message.delete()
    if(message.content.startsWith(`!antiraid`)) return message.author.send(`❌ Cette commande n'existe pas !\nTeste plutôt ` +  "`/antiraid`"), message.delete()
    if(message.content.startsWith(`!membre`)) return message.author.send(`❌ Cette commande n'existe pas !\nTeste plutôt ` + "`/membre`"), message.delete()
    if(message.content.startsWith(`!ping`)) return message.author.send(`❌ Cette commande n'existe pas !\nTeste plutôt ` + "`/ping`"), message.delete()
    if(message.content.startsWith(`!moderateur`)) return message.author.send(`❌ Cette commande n'existe pas !\nTeste plutôt ` + "`/moderateur`"), message.delete()
    if(message.content.startsWith(`!remove`)) return message.author.send(`❌ Cette commande n'existe pas !\nTeste plutôt ` + "`/remove`"), message.delete()
    if(message.content.startsWith(`!role`)) return message.author.send(`❌ Cette commande n'existe pas !\nTeste plutôt ` + "`/role`"), message.delete()
    if(message.content.startsWith(`!reseaux`)) return message.author.send(`❌ Cette commande n'existe pas !\nTeste plutôt ` + "`/reseaux`"), message.delete()
    if(message.content.startsWith(`!moneyboard`)) return message.author.send(`❌ Cette commande n'existe pas !\nTeste plutôt ` + "`/moneyboard`"), message.delete()
    if(message.content.startsWith(`!botinfo`)) return message.author.send(`❌ Cette commande n'existe pas !\nTeste plutôt ` + "`/botinfo`"), message.delete()
    if(message.content.startsWith(`!jour`)) return message.author.send(`❌ Cette commande n'existe pas !\nTeste plutôt ` + "`/jour`"), message.delete()

    if(!message.content.startsWith(prefix)) return;
    if(!commandFile) return message.author.send(`Cette commande n'existe pas !`) + message.delete()


  
    
     
    commandFile.run(bot, message, args, db)
})})