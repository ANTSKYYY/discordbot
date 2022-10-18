const { channelMention } = require("@discordjs/builders");
const { MessageEmbed } = require("discord.js");
const Discord = require("discord.js")
const Command = require("../Structure/Command")

module.exports = new Command({

  name: 'roulette',
	description: "Permet de jouer a la fameuse roulette de casino !",
  category: "<:DISCORD_casino:965186012919791627> | Casino",
  async run(bot, message, args, db, interaction) {
    const liste = ["1 🔴","2 ⚫","3 🔴","4 ⚫","5 🔴","6 ⚫","7 🔴","8 ⚫","9 🔴","10 ⚫","11 🔴","12 ⚫"];
    const mise = message.user ? args._hoistedOptions[0].value : args[0]
    const numero = Math.floor(Math.random() * liste.length);
    const chiffreperso = Math.floor(Math.random() * liste.length);

    const misewincouleurchiffre = mise * 1
    const misewinchiffreperso = mise * 12
    const misewinchiffreperso2 = mise * 7

    db.query(`SELECT * FROM casino WHERE userID = ${message.user.id} AND guildID = ${message.guild.id}`, async (err,req) => {
                     
                    
                    const btn = new Discord.MessageActionRow().addComponents(new Discord.MessageButton()
                    .setStyle("PRIMARY")
                    .setLabel("Choisir la couleur noire")
                    .setEmoji("⚫")
                    .setCustomId("noire"),

                    new Discord.MessageButton()
                    .setStyle("PRIMARY")
                    .setLabel("Choisir la couleur rouge")
                    .setEmoji("🔴")
                    .setCustomId("rouge"),

                    new Discord.MessageButton()
                    .setStyle("PRIMARY")
                    .setLabel("Choisir un chiffre pair")
                    .setEmoji({name: "DISCORD_two", id:'965624387124486154'})
                    
                    .setCustomId("pair"),

                    
      
                    new Discord.MessageButton()
                    .setStyle("PRIMARY")
                    .setLabel("Choisir un chiffre impair")
                    .setEmoji({name: "DISCORD_one", id:'965624387220955247'})
                    .setCustomId("impair"), 

                    new Discord.MessageButton()
                    .setStyle("PRIMARY")
                    .setLabel("Choisir un chiffre spécial")
                    .setEmoji({name: "5855six", id:'966223345974652968'})
                    .setCustomId("special"))

                    const btnspécial2 = new Discord.MessageActionRow().addComponents(new Discord.MessageButton()
                    .setStyle("PRIMARY")
                    .setLabel("Choisir un chiffre spécial ( Personnalisé )")
                    .setEmoji({name: "5855six", id:'966223345974652968'})
                    .setCustomId("special2"))

                    

                    const btnspécial = new Discord.MessageActionRow().addComponents(new Discord.MessageButton()
                    
                    .setStyle("DANGER")
                    .setLabel("Annuler sa mise")
                    .setEmoji('❎')
                    .setCustomId("cancel"))


                  const embed = new MessageEmbed()
                    .setTitle("<:DISCORD_roulette:965617285597393016> __**Roulette**__ <:DISCORD_roulette:965617285597393016>")
                    .setColor(bot.color)
                    .setFooter({ text: 'Antskyyy Bot', iconURL: 'https://i.imgur.com/DIapvsK.jpg' })
                    .setTimestamp()
                    .setDescription(`Vous avez misé **${mise}** €.\nLe but de la roulette est de tomber sur la bonne couleur ou le bon chiffre.\n<a:zAnim_Arrow_right:963464759078965248> Si vous choississez une couleur ou une catégorie : pair ou impair, et que vous gagnez alors vous remportez **1** fois votre mise.\n<a:zAnim_Arrow_right:963464759078965248> Cependant si vous choisissez un numéro aléatoire entre ` +  "`1 et 12`"  + ` et que vous visez juste , alors vous remportez **12** fois votre mise !\n<a:zAnim_Arrow_right:963464759078965248> Il reste une dernière option cependant , si vous choisissez vous même un chiffre et que vous gagnez , alors vous remportez **7** fois votre mise \n\nVeuillez sélectionner un moyen de paris ! <:DISCORD_roulette:965617285597393016> `)	
                    .setAuthor({ name: `Antskyyy Bot`, iconURL: `https://i.imgur.com/DIapvsK.jpg` })
                    .addFields(
                      {name: "__**Mise**__", value: `${mise}€`, inline: true},
                      
                    )
                    .setThumbnail('https://i.imgur.com/gMjybLu.png')


                    const embedmisenoire = new MessageEmbed()
                    .setTitle("<a:DISCORD_slot:965554061317394452> __**La roulette tourne...**__ <a:DISCORD_slot:965554061317394452>")
                    .setColor(bot.color)
                    .setFooter({ text: 'Antskyyy Bot', iconURL: 'https://i.imgur.com/DIapvsK.jpg' })
                    .setTimestamp()
                    .setDescription(`Vous avez misé **${mise}** €. Vous avez choisi la couleur noire !  \n\n<@${message.user.id}> `)	
                    .setAuthor({ name: `Antskyyy Bot`, iconURL: `https://i.imgur.com/DIapvsK.jpg` })
                    .addFields(
                      {name: "__**Mise**__", value: `${mise}€`, inline: true}
                    )
                    .setThumbnail('https://i.imgur.com/gMjybLu.png')

                    const embedmiserouge = new MessageEmbed()
                    .setTitle("<a:DISCORD_slot:965554061317394452> __**La roulette tourne...**__ <a:DISCORD_slot:965554061317394452>")
                    .setColor(bot.color)
                    .setFooter({ text: 'Antskyyy Bot', iconURL: 'https://i.imgur.com/DIapvsK.jpg' })
                    .setTimestamp()
                    .setDescription(`Vous avez misé **${mise}** €. Vous avez choisi la couleur rouge !  \n\n<@${message.user.id}> `)	
                    .setAuthor({ name: `Antskyyy Bot`, iconURL: `https://i.imgur.com/DIapvsK.jpg` })
                    .addFields(
                      {name: "__**Mise**__", value: `${mise}€`, inline: true}
                    )
                    .setThumbnail('https://i.imgur.com/gMjybLu.png')

                    const embedmisepair = new MessageEmbed()
                    .setTitle("<a:DISCORD_slot:965554061317394452> __**La roulette tourne...**__ <a:DISCORD_slot:965554061317394452>")
                    .setColor(bot.color)
                    .setFooter({ text: 'Antskyyy Bot', iconURL: 'https://i.imgur.com/DIapvsK.jpg' })
                    .setTimestamp()
                    .setDescription(`Vous avez misé **${mise}** €. Vous avez choisi les chiffres pairs !  \n\n<@${message.user.id}> `)	
                    .setAuthor({ name: `Antskyyy Bot`, iconURL: `https://i.imgur.com/DIapvsK.jpg` })
                    .addFields(
                      {name: "__**Mise**__", value: `${mise}€`, inline: true}
                    )
                    .setThumbnail('https://i.imgur.com/gMjybLu.png')

                    const embedmiseimpair = new MessageEmbed()
                    .setTitle("<a:DISCORD_slot:965554061317394452> __**La roulette tourne...**__ <a:DISCORD_slot:965554061317394452>")
                    .setColor(bot.color)
                    .setFooter({ text: 'Antskyyy Bot', iconURL: 'https://i.imgur.com/DIapvsK.jpg' })
                    .setTimestamp()
                    .setDescription(`Vous avez misé **${mise}** €. Vous avez choisi les chiffres impairs !  \n\n<@${message.user.id}> `)	
                    .setAuthor({ name: `Antskyyy Bot`, iconURL: `https://i.imgur.com/DIapvsK.jpg` })
                    
                    .setThumbnail('https://i.imgur.com/gMjybLu.png')


                    const embedmisechiffre = new MessageEmbed()
                    .setTitle("<a:DISCORD_slot:965554061317394452> __**La roulette tourne...**__ <a:DISCORD_slot:965554061317394452>")
                    .setColor(bot.color)
                    .setFooter({ text: 'Antskyyy Bot', iconURL: 'https://i.imgur.com/DIapvsK.jpg' })
                    .setTimestamp()
                    .setDescription(`Vous avez misé **${mise}** €. Vous avez choisi le chiffre ${liste[chiffreperso]} !  \n\n<@${message.user.id}> `)	
                    .setAuthor({ name: `Antskyyy Bot`, iconURL: `https://i.imgur.com/DIapvsK.jpg` })
                    
                    .setThumbnail('https://i.imgur.com/gMjybLu.png')

                    const cancel = new MessageEmbed()
                    .setTitle("<:DISCORD_roulette:965617285597393016> __**La roulette à été arreté !**__ <:DISCORD_roulette:965617285597393016>")
                    .setColor(bot.color)
                    .setFooter({ text: 'Antskyyy Bot', iconURL: 'https://i.imgur.com/DIapvsK.jpg' })
                    .setTimestamp()
                    .setDescription(`Vous avez récupéré vos ${mise}€ !\n\n<@${message.user.id}> `)	
                    .setAuthor({ name: `Antskyyy Bot`, iconURL: `https://i.imgur.com/DIapvsK.jpg` })
                    
                    .setThumbnail('https://i.imgur.com/gMjybLu.png')

                    
                    if(parseInt(req[0].money) < parseInt(mise)) return message.reply({content: "Vous n'avez pas assès d'argent !", ephemeral: true});
                    if(isNaN(mise)) return message.reply({content: "Vous devez entrer uniquement des chiffres ou nombres", ephemeral: true})
                    let msg = await message.reply({embeds: [embed], components: [btn, btnspécial2, btnspécial], content: `<@${message.user.id}>`})
                    let filter = async() => true;

                    msg 


                    
                    

                    const collector = (message.user ? (await message.fetchReply()) : msg).createMessageComponentCollector({filter, time:1200000})
                    let choix;

                    collector.on("collect", async button => {
                      if(button.user.id !== (message.user ? message.user.id : message.author.id)) return button.reply({content: "Vous n'etes pas l'auteur du message !", ephemeral: true })

                      if(button.customId === "cancel") return await collector.stop() + button.reply({content: "La roulette à été arrété ! ✅ ", ephemeral: true})

                    if(button.customId === 'noire') {


                     const btn = new Discord.MessageActionRow().addComponents(new Discord.MessageButton()
                      .setStyle("PRIMARY")
                      .setLabel("Choisir la couleur noire")
                      .setEmoji("⚫")
                      .setDisabled(true)
                      .setCustomId("noire"),
  
                      new Discord.MessageButton()
                      .setStyle("PRIMARY")
                      .setLabel("Choisir la couleur rouge")
                      .setEmoji("🔴")
                      .setDisabled(true)
                      .setCustomId("rouge"),
  
                      new Discord.MessageButton()
                      .setStyle("PRIMARY")
                      .setLabel("Choisir un chiffre pair")
                      .setDisabled(true)
                      .setEmoji({name: "DISCORD_two", id:'965624387124486154'})
                      
                      .setCustomId("pair"),
        
                      new Discord.MessageButton()
                      .setStyle("PRIMARY")
                      .setLabel("Choisir un chiffre impair")
                      .setDisabled(true)
                      .setEmoji({name: "DISCORD_one", id:'965624387220955247'})
                      .setCustomId("impair"),

                      new Discord.MessageButton()
                    .setStyle("PRIMARY")
                    .setLabel("Choisir un chiffre spécial")
                    .setEmoji({name: "5855six", id:'966223345974652968'})
                    .setDisabled(true)
                    .setCustomId("special"))
  
		const btnspécial2 = new Discord.MessageActionRow().addComponents(new Discord.MessageButton()
                    .setStyle("PRIMARY")
                    .setLabel("Choisir un chiffre spécial ( Personnalisé )")
                    .setEmoji({name: "5855six", id:'966223345974652968'})
		    .setDisabled(true)
                    .setCustomId("special2"))
		    

                      const btnspécial = new Discord.MessageActionRow().addComponents(new Discord.MessageButton()
                      
                      .setStyle("DANGER")
                      .setLabel("Annuler sa mise")
                      .setEmoji('❎')
                      .setDisabled(true)
                      .setCustomId("cancel"))


                      db.query(`UPDATE casino SET money = '${parseInt(req[0].money) - parseInt(mise)}' WHERE userID = ${message.user.id}`)
                      message.editReply({embeds: [embedmisenoire], components: [btn, btnspécial2, btnspécial], content: `<@${message.user.id}>`})
                      button.reply({content: "<a:DISCORD_slot:965554061317394452> Suspense... <a:DISCORD_slot:965554061317394452>", ephemeral: true})
                    setTimeout(() => {
                      if(!liste[numero].endsWith('⚫')) {
                        button.editReply({content: `Tu as perdu ! Le chiffre ${liste[numero]} est rouge ! <@${message.user.id}>`, ephemeral: true})
                        embedmisenoire.addFields(
                          {name: "__**Perte**__", value: `${mise}€`, inline: true}, 
                          {name: "__**Nouveau solde**__", value: `${parseInt(req[0].money) - parseInt(mise)}€`, inline: true}
                        )        
                      } else {
                        button.editReply({content: `Tu as gagné ! le chiffre ${liste[numero]} est bien noir ! <@${message.user.id}>`, ephemeral: true})
                        embedmisenoire.addFields(
                          {name: "__**Gain**__", value: `${misewincouleurchiffre}€`, inline: true}  ,
                          {name: "__**Nouveau solde**__", value: `${parseInt(req[0].money) + parseInt(misewincouleurchiffre)}€`, inline: true}
                          )  
                        db.query(`UPDATE casino SET money = '${parseInt(req[0].money) + parseInt(misewincouleurchiffre)}' WHERE userID = ${message.user.id}`)

                      }
                      /* It's a variable that is used to create a new embed. */
                      embedmisenoire.addFields({name: "__**Résultat**__",value: `${liste[numero]}`, inline: true})
                      embedmisenoire.setTitle("<:DISCORD_roulette:965617285597393016> __**La roulette s'arrete !**__ <:DISCORD_roulette:965617285597393016>")
                      message.editReply({embeds: [embedmisenoire], components: [btn, btnspécial2, btnspécial], content: `<@${message.user.id}>`})
                    }, 1800);




                      } else if(button.customId === 'rouge') {

                        const btn = new Discord.MessageActionRow().addComponents(new Discord.MessageButton()
                      .setStyle("PRIMARY")
                      .setLabel("Choisir la couleur noire")
                      .setEmoji("⚫")
                      .setDisabled(true)
                      .setCustomId("noire"),
  
                      new Discord.MessageButton()
                      .setStyle("PRIMARY")
                      .setLabel("Choisir la couleur rouge")
                      .setEmoji("🔴")
                      .setDisabled(true)
                      .setCustomId("rouge"),
  
                      new Discord.MessageButton()
                      .setStyle("PRIMARY")
                      .setLabel("Choisir un chiffre pair")
                      .setDisabled(true)
                      .setEmoji({name: "DISCORD_two", id:'965624387124486154'})
                      
                      .setCustomId("pair"),
        
                      new Discord.MessageButton()
                      .setStyle("PRIMARY")
                      .setLabel("Choisir un chiffre impair")
                      .setDisabled(true)
                      .setEmoji({name: "DISCORD_one", id:'965624387220955247'})
                      .setCustomId("impair"),

                      new Discord.MessageButton()
                    .setStyle("PRIMARY")
                    .setLabel("Choisir un chiffre spécial")
                    .setEmoji({name: "5855six", id:'966223345974652968'})
                    .setDisabled(true)
                    .setCustomId("special"))
  
		const btnspécial2 = new Discord.MessageActionRow().addComponents(new Discord.MessageButton()
                    .setStyle("PRIMARY")
                    .setLabel("Choisir un chiffre spécial ( Personnalisé )")
                    .setEmoji({name: "5855six", id:'966223345974652968'})
		    .setDisabled(true)
                    .setCustomId("special2"))
		    

                      const btnspécial = new Discord.MessageActionRow().addComponents(new Discord.MessageButton()
                      
                      .setStyle("DANGER")
                      .setLabel("Annuler sa mise")
                      .setEmoji('❎')
                      .setDisabled(true)
                      .setCustomId("cancel"))

                        db.query(`UPDATE casino SET money = '${parseInt(req[0].money) - parseInt(mise)}' WHERE userID = ${message.user.id}`)
                        message.editReply({embeds: [embedmiserouge], components: [btn, btnspécial2, btnspécial], content: `<@${message.user.id}>`})
                        button.reply({content: "<a:DISCORD_slot:965554061317394452> Suspense... <a:DISCORD_slot:965554061317394452>", ephemeral: true})
                      setTimeout(() => {
                        if(!liste[numero].endsWith('🔴')) {
                          button.editReply({content: `Tu as perdu ! Le chiffre ${liste[numero]} est noir ! <@${message.user.id}>`, ephemeral: true})
                          embedmiserouge.addFields(
                            {name: "__**Perte**__", value: `${mise}€`, inline: true}, 
                            {name: "__**Nouveau solde**__", value: `${parseInt(req[0].money) - parseInt(mise)}€`, inline: true}
                          )        
                        } else {
                          button.editReply({content: `Tu as gagné ! le chiffre ${liste[numero]} est bien rouge ! <@${message.user.id}>`, ephemeral: true})
                          embedmiserouge.addFields(
                            {name: "__**Gain**__", value: `${misewincouleurchiffre}€`, inline: true}  ,
                            {name: "__**Nouveau solde**__", value: `${parseInt(req[0].money) + parseInt(misewincouleurchiffre)}€`, inline: true}
                            )  
                          db.query(`UPDATE casino SET money = '${parseInt(req[0].money) + parseInt(misewincouleurchiffre)}' WHERE userID = ${message.user.id}`)

                        }
                        /* It's a variable that is used to create a new embed. */
                        embedmiserouge.addFields({name: "__**Résultat**__",value: `${liste[numero]}`, inline: true})
                        embedmiserouge.setTitle("<:DISCORD_roulette:965617285597393016> __**La roulette s'arrete !**__ <:DISCORD_roulette:965617285597393016>")
                        message.editReply({embeds: [embedmiserouge], components: [btn, btnspécial2, btnspécial], content: `<@${message.user.id}>`})
                      }, 1800);






                      } else if(button.customId === 'pair') {


                       const btn = new Discord.MessageActionRow().addComponents(new Discord.MessageButton()
                      .setStyle("PRIMARY")
                      .setLabel("Choisir la couleur noire")
                      .setEmoji("⚫")
                      .setDisabled(true)
                      .setCustomId("noire"),
  
                      new Discord.MessageButton()
                      .setStyle("PRIMARY")
                      .setLabel("Choisir la couleur rouge")
                      .setEmoji("🔴")
                      .setDisabled(true)
                      .setCustomId("rouge"),
  
                      new Discord.MessageButton()
                      .setStyle("PRIMARY")
                      .setLabel("Choisir un chiffre pair")
                      .setDisabled(true)
                      .setEmoji({name: "DISCORD_two", id:'965624387124486154'})
                      
                      .setCustomId("pair"),
        
                      new Discord.MessageButton()
                      .setStyle("PRIMARY")
                      .setLabel("Choisir un chiffre impair")
                      .setDisabled(true)
                      .setEmoji({name: "DISCORD_one", id:'965624387220955247'})
                      .setCustomId("impair"),

                      new Discord.MessageButton()
                    .setStyle("PRIMARY")
                    .setLabel("Choisir un chiffre spécial")
                    .setEmoji({name: "5855six", id:'966223345974652968'})
                    .setDisabled(true)
                    .setCustomId("special"))
  
		const btnspécial2 = new Discord.MessageActionRow().addComponents(new Discord.MessageButton()
                    .setStyle("PRIMARY")
                    .setLabel("Choisir un chiffre spécial ( Personnalisé )")
                    .setEmoji({name: "5855six", id:'966223345974652968'})
		    .setDisabled(true)
                    .setCustomId("special2"))
		    

                      const btnspécial = new Discord.MessageActionRow().addComponents(new Discord.MessageButton()
                      
                      .setStyle("DANGER")
                      .setLabel("Annuler sa mise")
                      .setEmoji('❎')
                      .setDisabled(true)
                      .setCustomId("cancel"))

                        db.query(`UPDATE casino SET money = '${parseInt(req[0].money) - parseInt(mise)}' WHERE userID = ${message.user.id}`)
                        message.editReply({embeds: [embedmisepair], components: [btn, btnspécial2, btnspécial], content: `<@${message.user.id}>`})
                        button.reply({content: "<a:DISCORD_slot:965554061317394452> Suspense... <a:DISCORD_slot:965554061317394452>", ephemeral: true})
                      setTimeout(() => {
                        if(!liste[numero].endsWith('⚫')) {
                          button.editReply({content: `Tu as perdu ! Le chiffre ${liste[numero]} est impair ! <@${message.user.id}> `, ephemeral: true})
                          embedmisepair.addFields(
                            {name: "__**Perte**__", value: `${mise}€`, inline: true}, 
                            {name: "__**Nouveau solde**__", value: `${parseInt(req[0].money) - parseInt(mise)}€`, inline: true}
                          )        
                        } else {
                          button.editReply({content: `Tu as gagné ! le chiffre ${liste[numero]} est bien pair ! <@${message.user.id}>`, ephemeral: true})
                          embedmisepair.addFields(
                            {name: "__**Gain**__", value: `${misewincouleurchiffre}€`, inline: true}  ,
                            {name: "__**Nouveau solde**__", value: `${parseInt(req[0].money) + parseInt(misewincouleurchiffre)}€`, inline: true}
                            )  
                          db.query(`UPDATE casino SET money = '${parseInt(req[0].money) + parseInt(misewincouleurchiffre)}' WHERE userID = ${message.user.id}`)

                        }
                        /* It's a variable that is used to create a new embed. */
                        embedmisepair.addFields({name: "__**Résultat**__",value: `${liste[numero]}`, inline: true})
                        embedmisepair.setTitle("<:DISCORD_roulette:965617285597393016> __**La roulette s'arrete !**__ <:DISCORD_roulette:965617285597393016>")
                        message.editReply({embeds: [embedmisepair], components: [btn, btnspécial2, btnspécial], content: `<@${message.user.id}>`})
                      }, 1800);








                      } else if(button.customId === 'impair') {

                       const btn = new Discord.MessageActionRow().addComponents(new Discord.MessageButton()
                      .setStyle("PRIMARY")
                      .setLabel("Choisir la couleur noire")
                      .setEmoji("⚫")
                      .setDisabled(true)
                      .setCustomId("noire"),
  
                      new Discord.MessageButton()
                      .setStyle("PRIMARY")
                      .setLabel("Choisir la couleur rouge")
                      .setEmoji("🔴")
                      .setDisabled(true)
                      .setCustomId("rouge"),
  
                      new Discord.MessageButton()
                      .setStyle("PRIMARY")
                      .setLabel("Choisir un chiffre pair")
                      .setDisabled(true)
                      .setEmoji({name: "DISCORD_two", id:'965624387124486154'})
                      
                      .setCustomId("pair"),
        
                      new Discord.MessageButton()
                      .setStyle("PRIMARY")
                      .setLabel("Choisir un chiffre impair")
                      .setDisabled(true)
                      .setEmoji({name: "DISCORD_one", id:'965624387220955247'})
                      .setCustomId("impair"),

                      new Discord.MessageButton()
                    .setStyle("PRIMARY")
                    .setLabel("Choisir un chiffre spécial")
                    .setEmoji({name: "5855six", id:'966223345974652968'})
                    .setDisabled(true)
                    .setCustomId("special"))
  
		const btnspécial2 = new Discord.MessageActionRow().addComponents(new Discord.MessageButton()
                    .setStyle("PRIMARY")
                    .setLabel("Choisir un chiffre spécial ( Personnalisé )")
                    .setEmoji({name: "5855six", id:'966223345974652968'})
		    .setDisabled(true)
                    .setCustomId("special2"))
		    

                      const btnspécial = new Discord.MessageActionRow().addComponents(new Discord.MessageButton()
                      
                      .setStyle("DANGER")
                      .setLabel("Annuler sa mise")
                      .setEmoji('❎')
                      .setDisabled(true)
                      .setCustomId("cancel"))

                          db.query(`UPDATE casino SET money = '${parseInt(req[0].money) - parseInt(mise)}' WHERE userID = ${message.user.id}`)
                          message.editReply({embeds: [embedmiseimpair], components: [btn, btnspécial2,btnspécial], content: `<@${message.user.id}>`})
                          button.reply({content: "<a:DISCORD_slot:965554061317394452> Suspense... <a:DISCORD_slot:965554061317394452>", ephemeral: true})
                        setTimeout(() => {
                          if(!liste[numero].endsWith('🔴')) {
                            button.editReply({content: `Tu as perdu ! Le chiffre ${liste[numero]} est pair ! <@${message.user.id}>`, ephemeral: true})
                            embedmiseimpair.addFields(
                              {name: "__**Perte**__", value: `${mise}`, inline: true}, 
                              {name: "__**Nouveau solde**__", value: `${parseInt(req[0].money) - parseInt(mise)}€`, inline: true}
                            )        
                          } else {
                            button.editReply({content: `Tu as gagné ! le chiffre ${liste[numero]} est bien impair ! <@${message.user.id}>`, ephemeral: true})
                            embedmiseimpair.addFields(
                              {name: "__**Gain**__", value: `${misewincouleurchiffre}€`, inline: true}  ,
                              {name: "__**Nouveau solde**__", value: `${parseInt(req[0].money) + parseInt(misewincouleurchiffre)}€`, inline: true}
                              )  
                            db.query(`UPDATE casino SET money = '${parseInt(req[0].money) + parseInt(misewincouleurchiffre)}' WHERE userID = ${message.user.id}`)

                          }
                          /* It's a variable that is used to create a new embed. */
                          embedmiseimpair.addFields({name: "__**Résultat**__",value: `${liste[numero]}`, inline: true})
                          embedmiseimpair.setTitle("<:DISCORD_roulette:965617285597393016> __**La roulette s'arrete !**__ <:DISCORD_roulette:965617285597393016>")
                          message.editReply({embeds: [embedmiseimpair], components: [btn, btnspécial2, btnspécial], content: `<@${message.user.id}>`})
                        }, 1800);
















                      } else if(button.customId === 'special') {
                        
                        const btn = new Discord.MessageActionRow().addComponents(new Discord.MessageButton()
                      .setStyle("PRIMARY")
                      .setLabel("Choisir la couleur noire")
                      .setEmoji("⚫")
                      .setDisabled(true)
                      .setCustomId("noire"),
  
                      new Discord.MessageButton()
                      .setStyle("PRIMARY")
                      .setLabel("Choisir la couleur rouge")
                      .setEmoji("🔴")
                      .setDisabled(true)
                      .setCustomId("rouge"),
  
                      new Discord.MessageButton()
                      .setStyle("PRIMARY")
                      .setLabel("Choisir un chiffre pair")
                      .setDisabled(true)
                      .setEmoji({name: "DISCORD_two", id:'965624387124486154'})
                      
                      .setCustomId("pair"),
        
                      new Discord.MessageButton()
                      .setStyle("PRIMARY")
                      .setLabel("Choisir un chiffre impair")
                      .setDisabled(true)
                      .setEmoji({name: "DISCORD_one", id:'965624387220955247'})
                      .setCustomId("impair"),

                      new Discord.MessageButton()
                    .setStyle("PRIMARY")
                    .setLabel("Choisir un chiffre spécial")
                    .setEmoji({name: "5855six", id:'966223345974652968'})
                    .setDisabled(true)
                    .setCustomId("special"))
  
		const btnspécial2 = new Discord.MessageActionRow().addComponents(new Discord.MessageButton()
                    .setStyle("PRIMARY")
                    .setLabel("Choisir un chiffre spécial ( Personnalisé )")
                    .setEmoji({name: "5855six", id:'966223345974652968'})
		    .setDisabled(true)
                    .setCustomId("special2"))
		    

                      const btnspécial = new Discord.MessageActionRow().addComponents(new Discord.MessageButton()
                      
                      .setStyle("DANGER")
                      .setLabel("Annuler sa mise")
                      .setEmoji('❎')
                      .setDisabled(true)
                      .setCustomId("cancel"))
  
                            db.query(`UPDATE casino SET money = '${parseInt(req[0].money) - parseInt(mise)}' WHERE userID = ${message.user.id}`)
                            message.editReply({embeds: [embedmisechiffre], components: [btn, btnspécial2, btnspécial], content: `<@${message.user.id}>`})
                            button.reply({content: "<a:DISCORD_slot:965554061317394452> Suspense... <a:DISCORD_slot:965554061317394452>", ephemeral: true})
                          setTimeout(() => {
                            if(!liste[chiffreperso].startsWith(`${liste[numero]}`)) {
                              button.editReply({content: `Tu as perdu ! Le chiffre ${liste[chiffreperso]} n'est pas le meme que ${liste[numero]} ! <@${message.user.id}>`, ephemeral: true})
                              embedmisechiffre.addFields(
                                {name: "__**Perte**__", value: `${mise}`, inline: true}, 
                                {name: "__**Nouveau solde**__", value: `${parseInt(req[0].money) - parseInt(mise)}€`, inline: true}
                              )        
                            } else {
                              button.editReply({content: `Tu as gagné ! le chiffre ${liste[chiffreperso]} est égal à ${liste[numero]} ! <@${message.user.id}>`, ephemeral: true})
                              embedmisechiffre.addFields(
                                {name: "__**Gain**__", value: `${misewinchiffreperso}€`, inline: true}  ,
                                {name: "__**Nouveau solde**__", value: `${parseInt(req[0].money) + parseInt(misewinchiffreperso)}€`, inline: true}
                                )  
                              db.query(`UPDATE casino SET money = '${parseInt(req[0].money) + parseInt(misewinchiffreperso)}' WHERE userID = ${message.user.id}`)
  
                            }
                            /* It's a variable that is used to create a new embed. */
                            embedmisechiffre.addFields({name: "__**Résultat**__",value: `${liste[numero]}`, inline: true})
                            embedmisechiffre.setTitle("<:DISCORD_roulette:965617285597393016> __**La roulette s'arrete !**__ <:DISCORD_roulette:965617285597393016>")
                            message.editReply({embeds: [embedmisechiffre], components: [btn, btnspécial2, btnspécial], content: `<@${message.user.id}>`})
                          }, 1800);



                      }  else if(button.customId === 'special2'){




                        const btn = new Discord.MessageActionRow().addComponents(new Discord.MessageButton()
                      .setStyle("PRIMARY")
                      .setLabel("Choisir la couleur noire")
                      .setEmoji("⚫")
                      .setDisabled(true)
                      .setCustomId("noire"),
  
                      new Discord.MessageButton()
                      .setStyle("PRIMARY")
                      .setLabel("Choisir la couleur rouge")
                      .setEmoji("🔴")
                      .setDisabled(true)
                      .setCustomId("rouge"),
  
                      new Discord.MessageButton()
                      .setStyle("PRIMARY")
                      .setLabel("Choisir un chiffre pair")
                      .setDisabled(true)
                      .setEmoji({name: "DISCORD_two", id:'965624387124486154'})
                      
                      .setCustomId("pair"),
        
                      new Discord.MessageButton()
                      .setStyle("PRIMARY")
                      .setLabel("Choisir un chiffre impair")
                      .setDisabled(true)
                      .setEmoji({name: "DISCORD_one", id:'965624387220955247'})
                      .setCustomId("impair"),

                      new Discord.MessageButton()
                      .setStyle("PRIMARY")
                      .setLabel("Choisir un chiffre spécial")
                      .setEmoji({name: "5855six", id:'966223345974652968'})
                      .setDisabled(true)
                      .setCustomId("special"))
		                    
                      const btnspécial2 = new Discord.MessageActionRow().addComponents(new Discord.MessageButton()
                      .setStyle("PRIMARY")
                      .setLabel("Choisir un chiffre spécial ( Personnalisé )")
                      .setEmoji({name: "5855six", id:'966223345974652968'})
                      .setDisabled(true)
                      .setCustomId("special2"))
		    

                      const btnspécial = new Discord.MessageActionRow().addComponents(new Discord.MessageButton()
                      
                      .setStyle("DANGER")
                      .setLabel("Annuler sa mise")
                      .setEmoji('❎')
                      .setDisabled(true)
                      .setCustomId("cancel"))
                        
                      try {
                        let filter1 = m => m.author.id === button.user.id;  
                        let question = await button.reply({ content: "Veuillez indiquer le nombre de votre choix ( de 1 à 12 )", ephemeral: true })
                        let number = await (await message.channel.awaitMessages({ filter: filter1, max: 1, time: 30000, errors: [`time`] })).first()
                        await number.delete() 
                        if(isNaN(number.content)) return button.editReply({ content: "Veuillez indiquer un nombre entre \`1\` et \`12\` inclus !", ephemeral: true })
                        if(parseInt(number.content) < 1 || parseInt(number.content) > 12) return button.editReply({ content: "Veuillez indiquer un nombre entre \`1\` et \`12\` inclus !", ephemeral: true })
                        
                         
                        const embedmisespecial2 = new MessageEmbed()
                        .setTitle("<a:DISCORD_slot:965554061317394452> __**La roulette tourne...**__ <a:DISCORD_slot:965554061317394452>")
                        .setColor(bot.color)
                        .setFooter({ text: 'Antskyyy Bot', iconURL: 'https://i.imgur.com/DIapvsK.jpg' })
                        .setTimestamp()
                        .setDescription(`Vous avez misé **${mise}** €. Vous avez choisi le chiffre ${number.content} !  \n\n<@${message.user.id}> `)	
                        .setAuthor({ name: `Antskyyy Bot`, iconURL: `https://i.imgur.com/DIapvsK.jpg` })
                        
                        .setThumbnail('https://i.imgur.com/gMjybLu.png')



                        button.editReply({content: "<a:DISCORD_slot:965554061317394452> Suspense... <a:DISCORD_slot:965554061317394452>", ephemeral: true})
                        message.editReply({embeds: [embedmisespecial2], components: [btn, btnspécial2, btnspécial], content: `<@${message.user.id}>`})
                        
                        
                        setTimeout(() => {
                          if(!number.content.startsWith(`${liste[numero]}`)) {
                            button.editReply({content: `Tu as perdu ! Le chiffre ${number.content} n'est pas le meme que ${liste[numero]} ! <@${message.user.id}>`, ephemeral: true})
                            embedmisespecial2.addFields(
                              {name: "__**Perte**__", value: `${mise}`, inline: true}, 
                              {name: "__**Nouveau solde**__", value: `${parseInt(req[0].money) - parseInt(mise)}€`, inline: true}
                            )        
                          } else {
                            button.editReply({content: `Tu as gagné ! le chiffre ${number.content} est égal à ${liste[numero]} ! <@${message.user.id}>`, ephemeral: true})
                            embedmisespecial2.addFields(
                              {name: "__**Gain**__", value: `${misewinchiffreperso2}€`, inline: true}  ,
                              {name: "__**Nouveau solde**__", value: `${parseInt(req[0].money) + parseInt(misewinchiffreperso2)}€`, inline: true}
                              )  
                            db.query(`UPDATE casino SET money = '${parseInt(req[0].money) + parseInt(misewinchiffreperso2)}' WHERE userID = ${message.user.id}`)

                          }
                          /* It's a variable that is used to create a new embed. */
                          embedmisespecial2.addFields({name: "__**Résultat**__",value: `${liste[numero]}`, inline: true})
                          embedmisespecial2.setTitle("<:DISCORD_roulette:965617285597393016> __**La roulette s'arrete !**__ <:DISCORD_roulette:965617285597393016>")
                          message.editReply({embeds: [embedmisespecial2], components: [btn, btnspécial2, btnspécial], content: `<@${message.user.id}>`})
                        }, 1800);  
                      } catch (err){
                        button.editReply({ content: "Vous avez mis trop de temps pour répondre à la question !", ephemeral: true })
                        return message.editReply({embeds: [cancel], ephemeral: true, components: [btn, btnspécial2, btnspécial], content: `<@${message.user.id}>`})
                      } 
                      }
                    
                    })
                    collector.on("end", async () => {
                      
                      const btn = new Discord.MessageActionRow().addComponents(new Discord.MessageButton()
                      .setStyle("PRIMARY")
                      .setLabel("Choisir la couleur noire")
                      .setEmoji("⚫")
                      .setDisabled(true)
                      .setCustomId("noire"),
  
                      new Discord.MessageButton()
                      .setStyle("PRIMARY")
                      .setLabel("Choisir la couleur rouge")
                      .setEmoji("🔴")
                      .setDisabled(true)
                      .setCustomId("rouge"),
  
                      new Discord.MessageButton()
                      .setStyle("PRIMARY")
                      .setLabel("Choisir un chiffre pair")
                      .setDisabled(true)
                      .setEmoji({name: "DISCORD_two", id:'965624387124486154'})
                      
                      .setCustomId("pair"),
        
                      new Discord.MessageButton()
                      .setStyle("PRIMARY")
                      .setLabel("Choisir un chiffre impair")
                      .setDisabled(true)
                      .setEmoji({name: "DISCORD_one", id:'965624387220955247'})
                      .setCustomId("impair"),

                      new Discord.MessageButton()
                    .setStyle("PRIMARY")
                    .setLabel("Choisir un chiffre spécial")
                    .setEmoji({name: "5855six", id:'966223345974652968'})
                    .setDisabled(true)
                    .setCustomId("special"))
  
		const btnspécial2 = new Discord.MessageActionRow().addComponents(new Discord.MessageButton()
                    .setStyle("PRIMARY")
                    .setLabel("Choisir un chiffre spécial ( Personnalisé )")
                    .setEmoji({name: "5855six", id:'966223345974652968'})
		    .setDisabled(true)
                    .setCustomId("special2"))
		    

                      const btnspécial = new Discord.MessageActionRow().addComponents(new Discord.MessageButton()
                      
                      .setStyle("DANGER")
                      .setLabel("Annuler sa mise")
                      .setEmoji('❎')
                      .setDisabled(true)
                      .setCustomId("cancel"))

                      message.editReply({embeds: [cancel], ephemeral: true, components: [btn, btnspécial2, btnspécial], content: `<@${message.user.id}>`})

                      
                    })
                    
        
    })  
  }  
})


