const { Interaction } = require('discord.js')
const Discord = require('discord.js')
const Command = require('../Structure/Command')
const config = require("../config.json");

module.exports = new Command({
  name: "machineasous",
  description: "Permet de jouer à la machine à sous",
  utilisation: "machineasous",
  permission: "Aucune",
  category: "<:DISCORD_casino:965186012919791627> | Casino",

  async run(bot,message, args, db) {


          /* SPIN ANIMATION (use own or check mine)*/
          const slotemoji = "<a:DISCORD_slot:965554061317394452>";

          /* ITEMS (SLOTS) */

          let items = ['💵','💍','💯', '🎮'];

          let mise = message.user ? args._hoistedOptions[0].value : args[0]
          if(isNaN(mise)) return message.reply({content: "Vous devez entrer uniquement des chiffres ou nombres", ephemeral: true})
			    if(!mise) return message.reply({content: "Veuillez définir la mise", ephemeral: true})

            

          /* RANDOM */
          let $ = items[Math.floor(items.length * Math.random())];
          let $$ = items[Math.floor(items.length * Math.random())];
          let $$$ = items[Math.floor(items.length * Math.random())];

          /* EMBEDS */

          const play = new Discord.MessageEmbed()
              .setTitle("<a:DISCORD_money:965189345378181120> __**Machine à sous**__ <a:DISCORD_money:965189345378181120>")
              .setDescription("\n• "+slotemoji+"  "+slotemoji+"  "+slotemoji+" •" + "\n\n**• "+slotemoji+"  "+slotemoji+"  "+slotemoji+" •**\n\n" + "• "+slotemoji+"  "+slotemoji+"  "+slotemoji+" •\n\n" + `<@${message.user.id}>`)
              .addFields(
                { name: "Mise en jeu", value: `${mise}€`, inline: true }
              )
              .setColor(bot.color)
              .setThumbnail('https://i.imgur.com/xKdUZHo.png')
              .setTimestamp()
              .setFooter({ text: 'Antskyyy Bot', iconURL: 'https://i.imgur.com/DIapvsK.jpg' })	
              .setAuthor({ name: `Antskyyy Bot`, iconURL: `https://i.imgur.com/DIapvsK.jpg` })

          const $1 = new Discord.MessageEmbed()
              .setTitle("<a:DISCORD_money:965189345378181120> __**Machine à sous**__ <a:DISCORD_money:965189345378181120>")
              .setDescription("\n•  🧩  🍐  📺 •" + "\n\n**• "+$+"  "+slotemoji+"  "+slotemoji+" •**\n\n" + "• 🎥  👑  🔰 •\n\n")
              .setColor(bot.color)
              .addFields(
                { name: "Mise en jeu", value: `${mise}€`, inline: true }
              )
              .setThumbnail('https://i.imgur.com/xKdUZHo.png')
              .setTimestamp()
              .setFooter({ text: 'Antskyyy Bot', iconURL: 'https://i.imgur.com/DIapvsK.jpg' })	
              .setAuthor({ name: `Antskyyy Bot`, iconURL: `https://i.imgur.com/DIapvsK.jpg` })
          
          const $2 = new Discord.MessageEmbed()
              .setTitle("<a:DISCORD_money:965189345378181120> __**Machine à sous**__ <a:DISCORD_money:965189345378181120>")
              .setDescription("\n•  🧩  🍐  📺 •" + "\n\n**• "+$+"  "+$$+"  "+slotemoji+" •**\n\n" + "• 🎥  👑  🔰 •\n\n")
              .setColor(bot.color)
              .addFields(
                { name: "Mise en jeu", value: `${mise}€`, inline: true }
              )
              .setTimestamp()
              .setThumbnail('https://i.imgur.com/xKdUZHo.png')
              .setFooter({ text: 'Antskyyy Bot', iconURL: 'https://i.imgur.com/DIapvsK.jpg' })	
              .setAuthor({ name: `Antskyyy Bot`, iconURL: `https://i.imgur.com/DIapvsK.jpg` })
          
          
          const $3 = new Discord.MessageEmbed()
              .setTitle("<a:DISCORD_money:965189345378181120> __**Machine à sous**__ <a:DISCORD_money:965189345378181120>")
              .setDescription("\n•  🧩  🍐  📺 •" + "\n\n" + "~~**• "+$+"  "+$$+"  "+$$$+" •**~~\n\n" + "• 🎥  👑  🔰 •\n\n")
              .setColor(bot.color)
              .addFields(
                { name: "Mise en jeu", value: `${mise}€`, inline: true }
              )
              .setTimestamp()
              .setThumbnail('https://i.imgur.com/xKdUZHo.png')
              .setFooter({ text: 'Antskyyy Bot', iconURL: 'https://i.imgur.com/DIapvsK.jpg' })	
              .setAuthor({ name: `Antskyyy Bot`, iconURL: `https://i.imgur.com/DIapvsK.jpg` })

          /* SPIN THE SLOTS */
          
          db.query(`SELECT * FROM casino WHERE userID = ${message.user.id} AND guildID = ${message.guild.id}`, async (err,req) => {
            
              if(parseInt(req[0].money) < parseInt(mise)) return message.reply({content: "Vous n'avez pas assès d'argent !", ephemeral: true});
                
          

         

          
            const misegagnante = mise * 4

            

            await message.reply({embeds: [play], content: `<@${message.user.id}>`})
            setTimeout(() => {
              message.editReply({embeds: [$1], content: `<@${message.user.id}>`});
            }, 600);
            setTimeout(() => {
              message.editReply({embeds: [$2], content: `<@${message.user.id}>`});
            }, 1200);
            setTimeout(() => {
              message.editReply({embeds: [$3], content: `<@${message.user.id}>`});
            }, 1800);
            
            if($$ !== $ && $$ !== $$$) {
              setTimeout(() => {
                $3.addFields(
                  {name: "État", value: "Tu as perdu !", inline: true},
                  {name:  "Perte", value: `${parseInt(mise)}€`, inline: true},
                  {name: "Ton solde", value: `${parseInt(req[0].money) - parseInt(mise)}€`, inline: true}
                    
                )
                  db.query(`UPDATE casino SET money = '${parseInt(req[0].money) - parseInt(mise)}' WHERE userID = ${message.user.id}`)
                message.editReply({embeds: [$3]})
              }, 2000);
            } else if($ === $$ && $ === $$$) {
            setTimeout(() => {
              $3.addFields(
                {name: "État", value: "Tu as gagné !", inline: true},
                {name:  "Gain", value: `${parseInt(misegagnante)}€`, inline: true},
                {name: "Ton solde", value: `${parseInt(req[0].money) + parseInt(misegagnante)}€`, inline: true}
              )
                 db.query(`UPDATE casino SET money = '${parseInt(req[0].money) - parseInt(mise)}' WHERE userID = ${message.user.id}`)
              db.query(`UPDATE casino SET money = '${parseInt(req[0].money) + parseInt(misegagnante)}' WHERE userID = ${message.user.id}`)
              message.editReply({embeds: [$3]})
            }, 2000);
              
            } else {
              setTimeout(() => {
                $3.addFields(
                  {name: "État", value: "2 slots d'affilés", inline: true},
                  {name:  "Gain", value: `Tu as remboursé ta mise ( qui est de : *${mise}€* )!`, inline: true},
                  {name: "Ton solde", value: `${parseInt(req[0].money)}€`, inline: true}
                )
                message.editReply({embeds: [$3]})    
                   
                }, 2000);  
            }  
          }) 
            
          /* DEDUCT RESULTS */
          // You can add/remove user balance in respective result (if using some currency system)

         
  }  
})