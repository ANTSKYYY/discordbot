const Discord = require("discord.js")
const ms = require("ms")
const Command = require("../Structure/Command")

module.exports = new Command({

  name: "moneyboard",
  description: "Permet de voir les joueurs ayant le plus d'argent sur le serveur",
  category: "<:DISCORD_casino:965186012919791627> | Casino",

  async run(bot, message, args, db) {
 

        db.query(`SELECT * FROM casino WHERE guildID = '${message.guild.id}' ORDER BY money + 0 DESC `, async (err, casino) => {


                                let description = "";

                                let newEmbed = new Discord.MessageEmbed()

                                .setColor(bot.color)

                                .setThumbnail(`https://cdn.discordapp.com/avatars/${bot.user.id}/${bot.user.avatar}.png?size=256`)

                                .setTitle(`__**<a:DISCORD_money:965189345378181120> Tableau des 5 joueurs les plus riches ! <a:DISCORD_money:965189345378181120>**__\n\n`)

                                .setTimestamp()

                                .setAuthor({ name: 'Antskyyy Bot', iconURL: 'https://i.imgur.com/DIapvsK.jpg', url: 'https://discord.gg/u8gsYrsg' })

                                .setFooter({ text: 'Antskyyy Bot', iconURL: 'https://i.imgur.com/DIapvsK.jpg' });

                                for(let i = 0; i < 5; i++) {
                                    description += `**__Joueur n°${i+1} :__**\n\n> **Pseudo** : ${bot.users.cache.get(casino[i].userID)}\n> **Argent** : ${casino[i].money}€\n\n`;
                                }

                                newEmbed.setDescription(description)

                                if(message.user) await message.reply({embeds: [newEmbed]})
                                
                                else await msg.reply({embeds: [newEmbed]})
                              
                              })
                            }
})  