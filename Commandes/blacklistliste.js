const Discord = require("discord.js")
const Command = require("../Structure/Command");
const { MessageEmbed } = require('discord.js');

module.exports = {
	name: 'blacklistliste',
	description: "Permet de voir les mots interdits sur le serveur  ",
  category: "<:DISCORD_shield:963891927797870672> | Modération",
	async run(bot, message, args, member) { 

    const db = bot.db;

    

    
    
    let user = message.author
 


    db.query(`SELECT * FROM blacklist WHERE guildID = ?`, [message.guild.id], async (err, req) => {

                const words = req.map(r => r.word);

                const liste = new MessageEmbed()
                    .setTitle("📃 __**Les mots blacklists  sur le serveur !**__ 📃")
                    .setColor(bot.color)
                    .setFooter({ text: 'Antskyyy Bot', iconURL: 'https://i.imgur.com/DIapvsK.jpg' })
                    .setTimestamp()
                    .addFields(
                      {name: "La liste des mots interdits :", value: "`" + words + "`"}
                    )	
                    .setAuthor({ name: `Antskyyy Bot`, iconURL: `https://i.imgur.com/DIapvsK.jpg` })
                    
                    .setThumbnail(`https://cdn.discordapp.com/avatars/${bot.user.id}/${bot.user.avatar}.png?size=256`)
                    return message.reply({embeds: [liste], ephemeral: true});
                
               
              
            })          
	}
}