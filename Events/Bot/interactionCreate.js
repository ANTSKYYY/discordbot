const transcript = require("discord-html-transcripts")
const Discord = require('discord.js')
const Event = require("../../Structure/Event")
const SlashCommand = require('../../Structure/SlashCommand')
const { MessageEmbed } = require('discord.js');
const Client = require('../../Structure/Client');
const messageCreate = require('./messageCreate');
const date = require('date-and-time');
const fs = require('fs');
const rss = require('rss-converter');
const config = require('../../config.json');
const roulette = require('../../Commandes/roulette');
const { ButtonComponent } = require("@discordjs/builders");
module.exports = new Event("interactionCreate", async (bot, interaction, message, member) => {
  const db = bot.db;

  
  if(interaction.isCommand()) {
    
    const command = bot.commands.get(interaction.commandName)
    
    

    command.run(bot, interaction, interaction.options, bot.db)
  }


  

    if(interaction.customId === "menu") {
      let channel2 = bot.channels.cache.get("962730512248610966")
      let giveawayrole = channel2.guild.roles.cache.get("962731174051070002")
      let eventrole = channel2.guild.roles.cache.get("962730856135401493")
      let youtuberole = channel2.guild.roles.cache.get("962730639851925564")
      let patchrole = channel2.guild.roles.cache.get("969750182445072394")

      for(let i = 0; i < interaction.values.length; i++) {
          if(interaction.values[i] === "giveaway") interaction.member.roles.add(giveawayrole.id)
          if(interaction.values[i] === "event") interaction.member.roles.add(eventrole.id)
          if(interaction.values[i] === "youtube") interaction.member.roles.add(youtuberole.id)
          if(interaction.values[i] === "patch") interaction.member.roles.add(patchrole.id)
      }

      if(interaction.member.roles.cache.has(giveawayrole.id) && !interaction.values.includes("giveaway"))interaction.member.roles.remove(giveawayrole.id)
      if(interaction.member.roles.cache.has(eventrole.id) && !interaction.values.includes("event")) interaction.member.roles.remove(eventrole.id)
      if(interaction.member.roles.cache.has(youtuberole.id) && !interaction.values.includes("youtube")) interaction.member.roles.remove(youtuberole.id)
      if(interaction.member.roles.cache.has(patchrole.id) && !interaction.values.includes("patch")) interaction.member.roles.remove(patchrole.id)

      interaction.reply({content: "Vos r??les ont ??t?? modifi??s !", ephemeral: true})
    
    
    }      



    
    

  
  if(interaction.isButton()) {

    
   
    db.query(`SELECT * FROM user WHERE userID = '${interaction.member.id}'`, async (err, req) => {       
        if(interaction.customId === "rule") {
           
          if(req.length < 1){
              return interaction.reply({content: "<:2498discordcross:963466511324950558> Vous n'etes pas enregistr?? sur le serveur !", ephemeral: true})
          } else if(req[0].rule == null || req[0].rule === '')  {
              
              let channel = bot.channels.cache.get("906191168285597771")
              let acceptrole = channel.guild.roles.cache.get("906194727337066577")
              interaction.member.roles.add(acceptrole.id)
              await interaction.reply({content: `<:5040discordcheck:963466510242832544> Vous avez accept?? le reglement avec succ??s !`, ephemeral: true})
              db.query(`UPDATE user SET rule = 'yes' WHERE userID = ${interaction.user.id}`)
              db.query(`SELECT * FROM casino WHERE userID = ${interaction.member.id}`, async (err,req) => {


                if(req.length < 1) {
                  let sql2 = `INSERT INTO casino (userID, guildID, money) VALUES (${interaction.member.id}, ${interaction.guild.id}, '100')`
                  db.query(sql2, function(err) {
                    if(err) throw err;
                  })
        
                } 
              })   
            
          } else if(req[0].rule === "yes"){
            await interaction.reply({content: `<:2498discordcross:963466511324950558> Vous avez d??ja accept?? le reglement !`, ephemeral: true})
            

            
          }    
            
        
      }     
    })  

    

    if(interaction.customId === "ticket") {
      
        let channel = await interaction.guild.channels.create(`??????ticket-${interaction.user.username}`, {type: "GUILD_TEXT"})
        await channel.setParent(interaction.channel.parentId)

        await channel.permissionOverwrites.create(interaction.user, {
            SEND_MESSAGES: true,
            EMBED_LINKS: true,
            VIEW_CHANNEL: true,
            READ_MESSAGE_HISTORY: true
        })
        await channel.permissionOverwrites.create(interaction.guild.roles.everyone, {
            SEND_MESSAGES: false,
            EMBED_LINKS: false,
            VIEW_CHANNEL: false,
            READ_MESSAGE_HISTORY: false
        })

        await interaction.reply({content: `Votre ticket a ??t?? cr???? avec succ??s ${channel} !`, ephemeral: true})
        var d = new Date,
    dformat = [d.getHours(),
    d.getMinutes(),].join(':');
        let Embed4 = new Discord.MessageEmbed()
      .setColor(bot.color)
      .setAuthor({ name: 'Antskyyy Bot', iconURL: 'https://i.imgur.com/DIapvsK.jpg', url: 'https://discord.gg/u8gsYrsg' })
      .setTitle("__**<:7936discordstaff:963540123838984283> Nouveau ticket Ouvert !**__")
      .setDescription(`__**Emplacement :**__  ${channel}\n__**Heure :**__  ${dformat}`)
      .setThumbnail(interaction.user.displayAvatarURL({dynamic: true}))
      .setTimestamp()
      .setFooter({text: bot.user.tag, iconURL: bot.user.displayAvatarURL({dynamic: true})})

      try {
        bot.channels.cache.get('963842626681983048').send({ embeds: [Embed4]  })
      } catch (err) {}
        

        let Embed = new Discord.MessageEmbed()
        .setColor(bot.color)
        .setTitle("Ticket cr????")
        .setAuthor({ name: 'Antskyyy Bot', iconURL: 'https://i.imgur.com/DIapvsK.jpg', url: 'https://discord.gg/u8gsYrsg' })
        .setDescription(`${interaction.user.tag} , Salut ! Merci de **d??tailler** au mieux ta question ou ton probleme\nAfin de **faciliter** les travails des mod??rateurs`)
        .setThumbnail(interaction.user.displayAvatarURL({dynamic: true}))
        .setTimestamp()
        .setFooter({text: bot.user.tag, iconURL: bot.user.displayAvatarURL({dynamic: true})})

        const btn = new Discord.MessageActionRow().addComponents(new Discord.MessageButton()
        .setStyle("DANGER")
        .setEmoji("????")
        .setLabel("Fermer le ticket")
        .setCustomId("close"),
    
        )

        await channel.send({embeds: [Embed], components: [btn]})
    }

    if(interaction.customId === "transcript") {
      let Embed3 = new Discord.MessageEmbed()
      .setAuthor({ name: 'Antskyyy Bot', iconURL: 'https://i.imgur.com/DIapvsK.jpg', url: 'https://discord.gg/u8gsYrsg' })
      .setColor(bot.color)
      .setTitle("__**<:7936discordstaff:963540123838984283> Transcript Envoy?? !**__")
      .setDescription("Transcript envoy?? avec succ??s ! Ici : <#963842626681983048> ")
      .setThumbnail(interaction.user.displayAvatarURL({dynamic: true}))
      .setTimestamp()
      .setImage("https://i.imgur.com/aQywUiq.png")
      .setFooter({text: bot.user.tag, iconURL: bot.user.displayAvatarURL({dynamic: true})})
        await interaction.user.send({embeds: [Embed3]})
        await bot.channels.cache.get("963842626681983048").send({content: `Transcript de ${interaction.message.embeds[0].description.split(" ")[0]}`, files: [await transcript.createTranscript(interaction.channel)]})
        
        
    }

    if(interaction.customId ===  "dedi12345"){
        db.query(`SELECT * FROM casino WHERE userID = ${interaction.user.id} `, async (err,req) => {
          	if(req[0].money < 1500){
                return interaction.reply({content: "<:ADiscord_Croix:963466511324950558> Vous n'avez pas ass??s d'argent !", ephemeral: true})
            } else {
            db.query(`UPDATE casino SET money  = ${parseInt(req[0].money) - parseInt('1500')} WHERE userID = ${interaction.user.id}`)
      
      interaction.reply({ content: "<:ADiscord_Check:963466510242832544> Ta d??dicace ?? bien ??t?? **prise** en compte ! __Regarde bien__ les prochaines **vid??os** pour la voir !", ephemeral: true })
      interaction.user.send("Vous avez ??t?? d??bit?? de `1500` ??? pour `Demande de d??dicace`")
      let Embed = new Discord.MessageEmbed()
      .setColor(bot.color)
      .setTitle(`???? __**Nouvelle d??dicace !**__ ????`)
      .setDescription(`**<@${interaction.user.id}> ?? demand??** une d??dicace !\nRappelle-toi de la faire dans la prochaine vid??o ! `)
      .setTimestamp()
      .setThumbnail(`https://cdn.discordapp.com/avatars/${interaction.user.id}/${interaction.user.avatar}.png?size=256`)
      .setFooter({text: `${bot.user.username}`, iconURL: bot.user.displayAvatarURL({dynamic: true})})

      bot.channels.cache.get('971779599992234134').send({ embeds: [Embed], content: "<@709330933878095887>"  })
            }
       })     
    } 

    if(interaction.customId === "game12345"){
      db.query(`SELECT * FROM casino WHERE userID = ${interaction.user.id} `, async (err,req) => {
          	if(req[0].money < 2000){
                return interaction.reply({content: "<:ADiscord_Croix:963466511324950558> Vous n'avez pas ass??s d'argent !", ephemeral: true})
                
            } else {
            db.query(`UPDATE casino SET money  = ${parseInt(req[0].money) - parseInt('2000')} WHERE userID = ${interaction.user.id}`)
      
      interaction.reply({ content: "<:ADiscord_Check:963466510242832544> Ta game ?? bien ??t?? **prise** en compte ! __Attend__ que <@709330933878095887> te **Mp** !", ephemeral: true })
        interaction.user.send("Vous avez ??t?? d??bit?? de `2000` ??? pour `Demande de game`")
      let Embed = new Discord.MessageEmbed()
      .setColor(bot.color)
      .setTitle(`???? __**Nouvelle demande de Game !**__ ????`)
      .setDescription(`**<@${interaction.user.id}> ?? demand??** une game !\nVa le dm <@709330933878095887> ! `)
      .setTimestamp()
      .setThumbnail(`https://cdn.discordapp.com/avatars/${interaction.user.id}/${interaction.user.avatar}.png?size=256`)
      .setFooter({text: `${bot.user.username}`, iconURL: bot.user.displayAvatarURL({dynamic: true})})
      

      bot.channels.cache.get('971785499008196619').send({ embeds: [Embed], content: "<@709330933878095887>"  })
      }    
          }) 
    }

    if(interaction.customId === "role12345"){

      db.query(`SELECT * FROM user WHERE userID = ${interaction.user.id} `, async (err,req) => {
        if(req[0].roleshop === '0'){
          

          try {
            db.query(`SELECT * FROM casino WHERE userID = ${interaction.user.id} `, async (err,req) => {
                if(req[0].money < 10000){
                    return interaction.reply({content: "<:ADiscord_Croix:963466511324950558> Vous n'avez pas ass??s d'argent !", ephemeral: true})
                } else {
                  db.query(`UPDATE casino SET money  = ${parseInt(req[0].money) - parseInt('1000')} WHERE userID = ${interaction.user.id}`)
                  interaction.user.send("Vous avez ??t?? d??bit?? de `10000` ??? pour `Cr??ation de r??le personnalis??`")
                  
                
            
                  let filter1 = m => m.author.id === interaction.user.id;  
                  let question = await interaction.reply({ content: "<:ADiscord_Check:963466510242832544> Veuillez indiquer le nom de votre r??le !", ephemeral: true })
                  let rolename = await (await bot.channels.cache.get('971767277286486127').awaitMessages({ filter: filter1, max: 1, time: 30000, errors: [`time`] })).first()
                  if(rolename.content.length > 100) {
                    rolename.delete()
                    return interaction.editReply({ content: "<:ADiscord_Croix:963466511324950558> Votre role ne peut pas faire plus de 100 lettres" })
                  }
                  await rolename.delete()  
                
                
                  
                  let channel2 = bot.channels.cache.get("962730512248610966")
                  channel2.guild.roles.create({
                    name: `???? | ${rolename.content}`,
                    color: 'YELLOW',
                    reason: 'Role cr??e automatiquement par le bot ( Voir le shop )',
                    position: '17',
                    hoist: true
                  })
                  interaction.editReply({ content: "<:ADiscord_Check:963466510242832544> Votre r??le se cr??e , patiente 5 secondes..." })
                  setTimeout(() => {
                    let role = interaction.guild.roles.cache.find(role => role.name === `???? | ${rolename.content}`);
                    interaction.member.roles.add(`${role.id}`)
                    db.query(`UPDATE user SET roleshop  = '1' WHERE userID = ${interaction.user.id}`)
                    interaction.editReply({ content: `<:ADiscord_Check:963466510242832544> Votre role ?? bien ??t?? cr??e ! <@&${role.id}>` })
                  }, 5000)  
                }  
              })     

          } catch (err) {
              
            return interaction.editReply({ content: "<:ADiscord_Croix:963466511324950558> Vous avez mis trop de temps ?? r??pondre ou une erreur est survenue ! Veuillez r??-essayer" })
          }
        } else {
          interaction.reply({ content: "Vous avez d??ja achet?? un role ! Vous ne pouvez pas en acheter plusieurs !\nSi vous avez fait une erreur lors de la cr??ation de votre r??le , Veuillez Contacter <@709330933878095887>", ephemeral: true })
        }
       
      })  
      
    }

    if(interaction.customId === "recomp"){
      db.query(`SELECT * FROM casino WHERE userID = ${interaction.user.id} AND guildID = ${interaction.guild.id}`, async (err,req) => { 
        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        today = dd

        var month = new Date();
        var mm = String(month.getMonth() + 1).padStart(2, '0'); //January is 0!

        month = mm

        var year = new Date();
        var yyyy = year.getFullYear();


        year = yyyy

        
  
        let max = 100;
        let min = 20;
        let range = max - min + 1;
  
        let recompense = Math.floor(Math.random() * range) + min;
        
        if(req[0].jour == parseInt(today) && req[0].mois != parseInt(month) && req[0].year != parseInt(year)){
          const accept = new MessageEmbed()
          .setColor(bot.color)
          .setTitle('???? __**R??compense quotidienne**__ ????')
          
          .setAuthor({ name: 'Antskyyy Bot', iconURL: 'https://i.imgur.com/DIapvsK.jpg', url: 'https://discord.gg/u8gsYrsg' })
          .setDescription(`<:DISCORD_check:963466510242832544> Tu viens de recuperer ta r??compense quotidienne ! Reviens demain !`)
          .setThumbnail(`https://cdn.discordapp.com/avatars/${interaction.user.id}/${interaction.user.avatar}.png?size=256`)
          .setTimestamp()
          .addFields(
            {name: "Gain", value: `${recompense}`},
            {name: "Ton Nouveau solde", value: `${parseInt(req[0].money) + parseInt(recompense)}`}
          )
          
          .setFooter({ text: 'Antskyyy Bot', iconURL: 'https://i.imgur.com/DIapvsK.jpg'})
          interaction.reply({embeds: [accept], content: `<@${interaction.user.id}>`,ephemeral: true})
          db.query(`UPDATE casino SET jour = '${parseInt(today)}' WHERE userID = ${interaction.user.id}`),
          db.query(`UPDATE casino SET mois = '${parseInt(month)}' WHERE userID = ${interaction.user.id}`),
          db.query(`UPDATE casino SET year = '${parseInt(year)}' WHERE userID = ${interaction.user.id}`),
          db.query(`UPDATE casino SET money = '${parseInt(req[0].money) + parseInt(recompense)}' WHERE userID = ${interaction.user.id}`)
  
        } else if(req[0].jour == parseInt(today) && req[0].mois == parseInt(month) && req[0].year == parseInt(year)){
          interaction.reply({content: `<:DISCORD_cross:963466511324950558> Tu as d??ja recuperer ta r??compense quotidienne <@${interaction.user.id}> !`, ephemeral: true})
        } else {
          const accept2 = new MessageEmbed()
          .setColor(bot.color)
          .setTitle('???? __**R??compense quotidienne**__ ????')
          
          .setAuthor({ name: 'Antskyyy Bot', iconURL: 'https://i.imgur.com/DIapvsK.jpg', url: 'https://discord.gg/u8gsYrsg' })
          .setDescription(`<:DISCORD_check:963466510242832544> Tu viens de recuperer ta r??compense quotidienne ! Reviens demain !`)
          .setThumbnail(`https://cdn.discordapp.com/avatars/${interaction.user.id}/${interaction.user.avatar}.png?size=256`)
          .setTimestamp()
          .addFields(
            {name: "Gain", value: `${recompense}`},
            {name: "Ton Nouveau solde", value: `${parseInt(req[0].money) + parseInt(recompense)}`}
          )
          .setFooter({ text: 'Antskyyy Bot', iconURL: 'https://i.imgur.com/DIapvsK.jpg'})
          interaction.reply({embeds: [accept2], content: `<@${interaction.user.id}>`,ephemeral: true})
          db.query(`UPDATE casino SET jour = '${parseInt(today)}' WHERE userID = ${interaction.user.id}`),
          db.query(`UPDATE casino SET mois = '${parseInt(month)}' WHERE userID = ${interaction.user.id}`),
          db.query(`UPDATE casino SET year = '${parseInt(year)}' WHERE userID = ${interaction.user.id}`),
          db.query(`UPDATE casino SET money = '${parseInt(req[0].money) + parseInt(recompense)}' WHERE userID = ${interaction.user.id}`)
        }
      })  
    }

    if(interaction.customId === "close") {

      let Embed2 = new Discord.MessageEmbed()
      .setColor(bot.color)
      .setAuthor({ name: 'Antskyyy Bot', iconURL: 'https://i.imgur.com/DIapvsK.jpg', url: 'https://discord.gg/u8gsYrsg' })
      .setTitle("__**<:7936discordstaff:963540123838984283> Ticket Supprim?? !**__")
      .setDescription("<@" + `${interaction.user.id}` + ">" + ` a supprim?? votre ticket ! `)
      .setThumbnail("https://i.imgur.com/aQywUiq.png")
      .setTimestamp()
      .setFooter({text: bot.user.tag, iconURL: bot.user.displayAvatarURL({dynamic: true})})

      let Embed6 = new Discord.MessageEmbed()
      .setAuthor({ name: 'Antskyyy Bot', iconURL: 'https://i.imgur.com/DIapvsK.jpg', url: 'https://discord.gg/u8gsYrsg' })
      .setColor(bot.color)
      .setTitle("__**<:7936discordstaff:963540123838984283> Ticket Supprim?? !**__")
      .setDescription("Vous avez supprim?? votre ticket avec succ??s !")
      .setThumbnail("https://i.imgur.com/aQywUiq.png")
      .setTimestamp()
      .setFooter({text: bot.user.tag, iconURL: bot.user.displayAvatarURL({dynamic: true})})

      var d = new Date,
    dformat = [d.getHours(),
    d.getMinutes(),].join(':');
        let Embed5 = new Discord.MessageEmbed()
      .setColor(bot.color)
      .setTitle("__**<:7936discordstaff:963540123838984283> Nouveau ticket Ferm?? !**__")
      .setDescription(`__**Par :**__ <@` + `${interaction.user.id}>\n__**Heure :**__  ${dformat}\n__**Transcript :**__ ???? Juste au dessus !`)
      .setThumbnail(interaction.user.displayAvatarURL({dynamic: true}))
      .setTimestamp()


      try {
        bot.channels.cache.get('963842626681983048').send({ embeds: [Embed5], files:[await transcript.createTranscript(interaction.channel)]  })
      } catch (err) {}
        let user = interaction.guild.members.cache.find(m => m.user.username === interaction.message.embeds[0].description.split(" ")[0].split("#")[0] && m.user.discriminator === interaction.message.embeds[0].description.split(" ")[0].split("#")[1]).user;
        if(user.id === interaction.user.id) {
          await interaction.channel.delete()
          await user.send({embeds: [Embed6]})
        } else {
          try {await user.send({embeds: [Embed2]})} catch (err) {}
          await interaction.channel.delete()
        }
    }







    












    if(interaction.customId.startsWith("giveaway_")) {

      let ID = interaction.customId.split("_")[1];

      const db = bot.db;
      db.query(`SELECT * FROM participants WHERE ID = '${interaction.user.id} ${ID}'`, async (err, req) => {

          if(req.length < 1) {

              let sql = `INSERT INTO participants (ID, giveawayID, userID) VALUES ('${interaction.user.id} ${ID}', '${ID}', '${interaction.user.id}')`
              db.query(sql, function(err) {
                  if(err) throw err;
              })

              await interaction.reply({content: `Vous participez avec succ??s au concours \`${ID}\` !`, ephemeral: true})

          } else {

              db.query(`DELETE FROM participants WHERE ID = '${interaction.user.id} ${ID}'`)

              await interaction.reply({content: `Vous retirez votre participation avec succ??s au concours \`${ID}\` !`, ephemeral: true})
          }
      })
    }
  }  
})